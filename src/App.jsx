import { useState, useEffect, useRef } from "react";
import { Calendar, Clock, Users, DollarSign, Mail, BarChart3, ChevronRight, Plus, Search, Bell, Settings, Star, TrendingUp, CheckCircle, XCircle, Edit, Trash2, Send, Eye, Phone, MapPin, Heart, Sparkles, ArrowLeft, Filter, MoreVertical, X, Check, ChevronLeft, ChevronDown, Image, MessageSquare, ExternalLink, Music, MailOpen, Globe, Zap, Brain, Briefcase, Rocket, ArrowRight, Menu, Award, Lightbulb, CreditCard, ShieldCheck, Link2, RefreshCw, Loader2 } from "lucide-react";

// ============================================================
// TINA MARIA — Life Coach, Hypnotherapist & Digital Innovator
// ============================================================

// ---------- GLOSSGENIUS-INSPIRED THEME ----------
const theme = {
  bg: "#FAFAF8",
  card: "#FFFFFF",
  primary: "#1D1D1D",
  primaryLight: "#F0F0EE",
  primaryDark: "#000000",
  accent: "#7B9E89",
  accentLight: "#EDF5F1",
  accentMid: "#A8C5B2",
  warm: "#C4A882",
  warmLight: "#FBF6F0",
  text: "#1D1D1D",
  textLight: "#7A7A7A",
  textMuted: "#ADADAD",
  border: "#E8E8E5",
  success: "#7B9E89",
  successLight: "#EDF5F1",
  warning: "#D4A843",
  warningLight: "#FDF6E7",
  danger: "#C0695A",
  dangerLight: "#F8E8E5",
  sidebar: "#1D1D1D",
  sidebarText: "#999999",
  sidebarActive: "#FFFFFF",
  hero: "#EDF5F1",
};

// ---------- SERVICES DATA ----------
const SERVICES = [
  { id: 1, name: "Life Coaching Session", duration: 60, price: 150, category: "Inner Mastery", color: "#7B9E89", emoji: "🌟", desc: "Personalized one-on-one sessions to clarify goals, overcome obstacles, and create a life that lights you up." },
  { id: 2, name: "Hypnotherapy Session", duration: 75, price: 200, category: "Inner Mastery", color: "#8B7EC7", emoji: "🧠", desc: "Unlock the power of your subconscious mind to release limiting beliefs and rewire patterns for success." },
  { id: 3, name: "Business Coaching", duration: 60, price: 125, category: "Outer Growth", color: "#C4A882", emoji: "💼", desc: "Foundational guidance on business strategy, digital presence, and launching your vision." },
  { id: 4, name: "Digital Solutions Consult", duration: 90, price: 250, category: "Outer Growth", color: "#5B8FA8", emoji: "🚀", desc: "From concept to launch — custom digital tools, platforms, and booking systems." },
  { id: 5, name: "Discovery Call", duration: 30, price: 0, category: "Getting Started", color: "#D4A843", emoji: "✨", desc: "Complimentary strategy session to explore your goals and map your personalized roadmap." },
  { id: 6, name: "Intensive VIP Day", duration: 360, price: 997, category: "Premium", color: "#1D1D1D", emoji: "⚡", desc: "Full day immersive coaching, hypnotherapy, and strategy session for rapid transformation." },
  { id: 7, name: "Mindset Breakthrough Package", duration: 60, price: 500, category: "Inner Mastery", color: "#7B9E89", emoji: "💎", desc: "4-session package combining coaching and hypnotherapy for deep, lasting change." },
  { id: 8, name: "Website & App Build", duration: 120, price: 0, category: "Outer Growth", color: "#5B8FA8", emoji: "💻", desc: "Custom website or app creation using AI technology. Custom pricing based on scope." },
];

// ---------- CLIENTS DATA ----------
const CLIENTS_DATA = [
  { id: 1, name: "Rachel Torres", email: "rachel.t@email.com", phone: "(555) 234-5678", avatar: "RT", joined: "2025-06-15", visits: 18, totalSpent: 3200, lastVisit: "2026-02-08", notes: "Working through career transition. Responds well to visualization techniques. Currently in 4-session mindset package.", upcomingAppt: "Feb 14, 2:00 PM", favorite: true, tags: ["VIP", "Coaching"], type: "Life Coaching" },
  { id: 2, name: "Marcus Chen", email: "marcus.c@email.com", phone: "(555) 345-6789", avatar: "MC", joined: "2025-08-20", visits: 12, totalSpent: 2400, lastVisit: "2026-02-05", notes: "Entrepreneur launching a wellness brand. Combines business coaching with mindset work. Very motivated.", upcomingAppt: "Feb 15, 10:00 AM", favorite: true, tags: ["Regular", "Business"], type: "Business Coaching" },
  { id: 3, name: "Sophia Adams", email: "sophia.a@email.com", phone: "(555) 456-7890", avatar: "SA", joined: "2025-09-10", visits: 10, totalSpent: 2000, lastVisit: "2026-01-28", notes: "Hypnotherapy for anxiety and limiting beliefs around money. Making excellent progress. Interested in Zoey Zest music.", upcomingAppt: null, favorite: false, tags: ["Hypnotherapy"], type: "Hypnotherapy" },
  { id: 4, name: "David Park", email: "david.p@email.com", phone: "(555) 567-8901", avatar: "DP", joined: "2025-11-05", visits: 6, totalSpent: 1500, lastVisit: "2026-02-10", notes: "Tech founder needing digital solutions for his startup. Also doing coaching for work-life balance.", upcomingAppt: "Feb 18, 11:00 AM", favorite: false, tags: ["Digital", "Coaching"], type: "Digital Solutions" },
  { id: 5, name: "Jasmine Williams", email: "jasmine.w@email.com", phone: "(555) 678-9012", avatar: "JW", joined: "2025-12-12", visits: 4, totalSpent: 600, lastVisit: "2026-02-01", notes: "New to coaching. Exploring goals and purpose. Signed up for Snail Mail Club. Very enthusiastic.", upcomingAppt: "Feb 20, 3:00 PM", favorite: false, tags: ["New"], type: "Life Coaching" },
  { id: 6, name: "Alyssa Monroe", email: "alyssa.m@email.com", phone: "(555) 789-0123", avatar: "AM", joined: "2026-01-08", visits: 3, totalSpent: 375, lastVisit: "2026-01-22", notes: "Business coaching client looking to launch her first online course. Needs help with platform selection.", upcomingAppt: null, favorite: false, tags: ["Business", "New"], type: "Business Coaching" },
  { id: 7, name: "Lauren Mitchell", email: "lauren.m@email.com", phone: "(555) 890-1234", avatar: "LM", joined: "2026-01-15", visits: 2, totalSpent: 400, lastVisit: "2026-02-09", notes: "Referred by Rachel. Interested in hypnotherapy for public speaking anxiety. Very open to the process.", upcomingAppt: "Feb 16, 1:00 PM", favorite: false, tags: ["Referral", "Hypnotherapy"], type: "Hypnotherapy" },
  { id: 8, name: "Nina Patel", email: "nina.p@email.com", phone: "(555) 901-2345", avatar: "NP", joined: "2026-02-01", visits: 1, totalSpent: 0, lastVisit: "2026-02-01", notes: "Discovery call completed. Very excited to start. Interested in VIP Intensive Day.", upcomingAppt: null, favorite: false, tags: ["New", "Lead"], type: "Discovery" },
];

// ---------- APPOINTMENTS GENERATOR ----------
const generateAppointments = () => {
  const appts = [];
  const times = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM"];
  const statuses = ["confirmed","confirmed","confirmed","confirmed","confirmed","pending","completed","completed","completed"];
  const today = new Date(2026, 1, 12);
  for (let d = -3; d <= 7; d++) {
    const date = new Date(today);
    date.setDate(date.getDate() + d);
    const dateStr = date.toISOString().split("T")[0];
    const numAppts = Math.floor(Math.random() * 4) + 2;
    const usedTimes = new Set();
    for (let i = 0; i < numAppts; i++) {
      let t;
      do { t = times[Math.floor(Math.random() * times.length)]; } while (usedTimes.has(t));
      usedTimes.add(t);
      const svc = SERVICES[Math.floor(Math.random() * (SERVICES.length - 1))];
      const client = CLIENTS_DATA[Math.floor(Math.random() * CLIENTS_DATA.length)];
      const status = d < 0 ? "completed" : d === 0 ? statuses[Math.floor(Math.random() * statuses.length)] : (Math.random() > 0.2 ? "confirmed" : "pending");
      appts.push({ id: appts.length + 1, date: dateStr, time: t, client: client.name, clientId: client.id, service: svc.name, serviceId: svc.id, duration: svc.duration, price: svc.price, status, color: svc.color });
    }
  }
  return appts.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
};

// ---------- TRANSACTIONS DATA ----------
const TRANSACTIONS_DATA = [
  { id: 1, date: "2026-02-12", client: "Rachel Torres", service: "Life Coaching Session", amount: 150, tip: 30, total: 180, method: "Card", status: "completed" },
  { id: 2, date: "2026-02-12", client: "Marcus Chen", service: "Business Coaching", amount: 125, tip: 25, total: 150, method: "PayPal", status: "completed" },
  { id: 3, date: "2026-02-11", client: "Sophia Adams", service: "Hypnotherapy Session", amount: 200, tip: 40, total: 240, method: "Card", status: "completed" },
  { id: 4, date: "2026-02-11", client: "Lauren Mitchell", service: "Hypnotherapy Session", amount: 200, tip: 40, total: 240, method: "Card", status: "completed" },
  { id: 5, date: "2026-02-10", client: "David Park", service: "Digital Solutions Consult", amount: 250, tip: 0, total: 250, method: "Invoice", status: "completed" },
  { id: 6, date: "2026-02-10", client: "Rachel Torres", service: "Mindset Breakthrough Package", amount: 500, tip: 0, total: 500, method: "Card", status: "completed" },
  { id: 7, date: "2026-02-09", client: "Jasmine Williams", service: "Life Coaching Session", amount: 150, tip: 25, total: 175, method: "Venmo", status: "completed" },
  { id: 8, date: "2026-02-09", client: "Alyssa Monroe", service: "Business Coaching", amount: 125, tip: 20, total: 145, method: "Card", status: "completed" },
  { id: 9, date: "2026-02-08", client: "Nina Patel", service: "Discovery Call", amount: 0, tip: 0, total: 0, method: "Free", status: "completed" },
  { id: 10, date: "2026-02-08", client: "Marcus Chen", service: "Business Coaching", amount: 125, tip: 25, total: 150, method: "PayPal", status: "completed" },
];

const CAMPAIGNS_DATA = [
  { id: 1, name: "New Year Transformation", type: "Email", status: "sent", sentDate: "2026-01-15", audience: 210, opens: 142, clicks: 58, subject: "2026 is YOUR year — Start your transformation journey today ✨" },
  { id: 2, name: "Zoey Zest New Single", type: "Email", status: "sent", sentDate: "2026-02-01", audience: 340, opens: 278, clicks: 95, subject: "New Zoey Zest track just dropped — Money Magnet Frequency 🎵" },
  { id: 3, name: "Spring Mindset Reset", type: "Email", status: "draft", sentDate: null, audience: 0, opens: 0, clicks: 0, subject: "Spring into your highest self — new group coaching program 🌸" },
  { id: 4, name: "Snail Mail Club Launch", type: "Email", status: "scheduled", sentDate: "2026-02-20", audience: 156, opens: 0, clicks: 0, subject: "Something special is coming to your mailbox — join the Snail Mail Club ✉️" },
  { id: 5, name: "VIP Day Flash Promo", type: "SMS", status: "draft", sentDate: null, audience: 0, opens: 0, clicks: 0, subject: "Limited spots: VIP Intensive Day — Transform in 24 hours" },
];

// ---------- UTILITY FUNCTIONS ----------
const formatCurrency = (n) => n === 0 ? "Free" : `$${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
const formatDate = (str) => { const d = new Date(str + "T00:00:00"); return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); };
const getDayName = (str) => { const d = new Date(str + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "short" }); };

// ============================================================
// MAIN APP COMPONENT
// ============================================================
// ---------- API HELPERS ----------
const API_BASE = "/.netlify/functions";

async function createCheckoutSession(service, customerEmail, customerName, customerPhone) {
  const res = await fetch(`${API_BASE}/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ serviceName: service.name, price: service.price, duration: service.duration, customerEmail, customerName, customerPhone }),
  });
  return res.json();
}

async function sendSMS(to, message) {
  const res = await fetch(`${API_BASE}/send-sms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, message }),
  });
  return res.json();
}

async function sendEmailCampaign(to, subject, html) {
  const res = await fetch(`${API_BASE}/send-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, subject, html }),
  });
  return res.json();
}

async function calendarAction(action, body) {
  const opts = { method: body ? "POST" : "GET", headers: { "Content-Type": "application/json" } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API_BASE}/google-calendar?action=${action}`, opts);
  return res.json();
}

// ============================================================
// BOOKING VIEW — Instagram /book page with Stripe Checkout
// ============================================================
function BookingView() {
  const [selectedService, setSelectedService] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "canceled" | null
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("canceled") === "true") { setStatus("canceled"); return; }
    if (params.get("success") === "true") {
      setStatus("success");
      // Send confirmation email + SMS
      const savedBooking = sessionStorage.getItem("tm_booking");
      if (savedBooking) {
        try {
          const booking = JSON.parse(savedBooking);
          fetch(`${API_BASE}/booking-confirmation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerName: booking.customerName,
              customerEmail: booking.customerEmail,
              customerPhone: booking.customerPhone,
              serviceName: booking.serviceName,
              price: booking.price,
              duration: booking.duration,
              sessionId: params.get("session_id") || "",
            }),
          }).catch(err => console.error("Confirmation send error:", err));
          sessionStorage.removeItem("tm_booking");
        } catch (e) { console.error("Parse booking error:", e); }
      }
    }
  }, []);

  const bookableServices = SERVICES.filter(s => s.price > 0 || s.id === 5); // Include Discovery Call

  const handleCheckout = async () => {
    if (!selectedService) return;
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      alert("Please enter your name, email, and phone number.");
      return;
    }
    setLoading(true);
    // Save booking info so we can send confirmation after Stripe redirect
    sessionStorage.setItem("tm_booking", JSON.stringify({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      serviceName: selectedService.name,
      price: selectedService.price,
      duration: selectedService.duration,
    }));
    try {
      const data = await createCheckoutSession(selectedService, customerEmail, customerName, customerPhone);
      if (data.free) {
        // For free calls, send confirmation directly
        fetch(`${API_BASE}/booking-confirmation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: customerName.trim(),
            customerEmail: customerEmail.trim(),
            customerPhone: customerPhone.trim(),
            serviceName: selectedService.name,
            price: 0,
            duration: selectedService.duration,
            sessionId: "",
          }),
        }).catch(err => console.error("Confirmation error:", err));
        setStatus("success");
        setLoading(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Connection error. Please try again.");
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", background: `linear-gradient(180deg, ${theme.accentLight} 0%, white 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: theme.successLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <CheckCircle size={40} color={theme.success} />
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: theme.primary, margin: "0 0 12px" }}>You're Booked!</h1>
          <p style={{ fontSize: 17, color: theme.textLight, lineHeight: 1.7, margin: "0 0 8px" }}>Your session is confirmed. I'll send you an email with all the details and a calendar invite shortly.</p>
          <p style={{ fontSize: 15, color: theme.accent, fontWeight: 600, margin: "0 0 32px" }}>I can't wait to work with you!</p>
          <a href="/" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 50, background: theme.primary, color: "white", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Back to TinaMaria.com</a>
        </div>
      </div>
    );
  }

  if (status === "canceled") {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", background: `linear-gradient(180deg, ${theme.warmLight} 0%, white 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <span style={{ fontSize: 48, display: "block", marginBottom: 20 }}>💛</span>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: theme.primary, margin: "0 0 12px" }}>No worries!</h1>
          <p style={{ fontSize: 17, color: theme.textLight, lineHeight: 1.7, margin: "0 0 32px" }}>Your checkout was canceled. No charges were made. When you're ready, I'm here.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => { setStatus(null); window.history.replaceState({}, "", "/book"); }} style={{ padding: "14px 32px", borderRadius: 50, border: "none", background: theme.primary, color: "white", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Try Again</button>
            <a href="/" style={{ padding: "14px 32px", borderRadius: 50, border: `2px solid ${theme.border}`, background: "white", color: theme.text, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Back to Home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", background: theme.bg }}>
      {/* Booking Nav */}
      <nav className="tm-booking-nav" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 40px", background: "white", borderBottom: `1px solid ${theme.border}` }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, borderRadius: 50, background: `linear-gradient(135deg, ${theme.accent}, ${theme.warm})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={16} color="white" />
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, color: theme.primary }}>TinaMaria</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: theme.accent }}>
          <ShieldCheck size={16} /> <span style={{ fontSize: 13, fontWeight: 500 }}>Secure checkout powered by Stripe</span>
        </div>
      </nav>

      <div className="tm-booking-content" style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 className="tm-booking-title" style={{ fontSize: 36, fontWeight: 700, color: theme.primary, margin: "0 0 12px", letterSpacing: "-0.5px" }}>Book a Session with Tina Maria</h1>
          <p style={{ fontSize: 17, color: theme.textLight, margin: 0, lineHeight: 1.6 }}>Choose your service, enter your info, and you're all set. Simple as that.</p>
        </div>

        {/* Step 1: Choose Service */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: theme.primary, margin: "0 0 20px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 28, height: 28, borderRadius: "50%", background: theme.accent, color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>1</span>
            Choose Your Session
          </h2>
          <div className="tm-booking-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {bookableServices.map(svc => {
              const isSelected = selectedService?.id === svc.id;
              const isHovered = hoveredId === svc.id;
              return (
                <div key={svc.id} onClick={() => setSelectedService(svc)}
                  onMouseEnter={() => setHoveredId(svc.id)} onMouseLeave={() => setHoveredId(null)}
                  style={{ background: isSelected ? theme.accentLight : "white", border: `2px solid ${isSelected ? theme.accent : isHovered ? theme.accent + "50" : theme.border}`, borderRadius: 14, padding: "20px 22px", cursor: "pointer", transition: "all 0.2s", transform: isHovered ? "translateY(-2px)" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 24 }}>{svc.emoji}</span>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: theme.primary }}>{svc.name}</div>
                        <div style={{ fontSize: 13, color: theme.textLight }}>{svc.duration} min</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: svc.price === 0 ? theme.accent : theme.primary }}>{formatCurrency(svc.price)}</div>
                  </div>
                  <p style={{ fontSize: 13, color: theme.textLight, lineHeight: 1.5, margin: 0 }}>{svc.desc}</p>
                  {isSelected && <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, color: theme.accent, fontSize: 13, fontWeight: 600 }}><CheckCircle size={14} /> Selected</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Your Info */}
        {selectedService && (
          <div style={{ marginBottom: 40, animation: "fadeIn 0.3s ease" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: theme.primary, margin: "0 0 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: "50%", background: theme.accent, color: "white", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>2</span>
              Your Information
            </h2>
            <div style={{ background: "white", borderRadius: 14, border: `1px solid ${theme.border}`, padding: 28 }}>
              <div className="tm-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 6 }}>Your Name</label>
                  <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Jane Smith" style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 15, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 6 }}>Email Address</label>
                  <input value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} type="email" placeholder="jane@email.com" style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 15, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 6 }}>Phone Number</label>
                <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} type="tel" placeholder="(555) 123-4567" style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 15, outline: "none", boxSizing: "border-box" }} />
                <span style={{ fontSize: 12, color: theme.textMuted, marginTop: 4, display: "block" }}>We'll send you a text confirmation and session reminder</span>
              </div>

              {/* Order summary */}
              <div style={{ background: theme.bg, borderRadius: 10, padding: "18px 20px", marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 15, color: theme.text }}>{selectedService.emoji} {selectedService.name}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: theme.primary }}>{formatCurrency(selectedService.price)}</span>
                </div>
                <div style={{ fontSize: 13, color: theme.textLight }}>{selectedService.duration}-minute session with Tina Maria</div>
              </div>

              <button onClick={handleCheckout} disabled={loading} style={{ width: "100%", padding: "16px", borderRadius: 50, border: "none", background: loading ? theme.textMuted : theme.primary, color: "white", fontSize: 16, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s" }}>
                {loading ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Processing...</> :
                  selectedService.price === 0 ? <><Calendar size={18} /> Book Free Discovery Call</> :
                  <><CreditCard size={18} /> Pay {formatCurrency(selectedService.price)} & Book</>}
              </button>
              {selectedService.price > 0 && <p style={{ textAlign: "center", fontSize: 12, color: theme.textMuted, marginTop: 10 }}>You'll be redirected to Stripe's secure checkout</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- ADMIN PASSWORD GATE ----------
function AdminLoginGate({ onAuthenticated }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${API_BASE}/admin-auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.authenticated) {
        sessionStorage.setItem("tm_admin", "true");
        onAuthenticated();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", background: `linear-gradient(180deg, ${theme.bg} 0%, white 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.accent}, ${theme.warm})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <ShieldCheck size={28} color="white" />
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: theme.primary, margin: "0 0 8px" }}>Admin Access</h1>
        <p style={{ fontSize: 15, color: theme.textLight, margin: "0 0 32px" }}>Enter your password to access the dashboard.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false); }}
            placeholder="Enter password"
            autoFocus
            style={{ width: "100%", padding: "14px 18px", borderRadius: 12, border: `2px solid ${error ? theme.danger : theme.border}`, fontSize: 16, outline: "none", boxSizing: "border-box", marginBottom: 16, textAlign: "center", letterSpacing: 2 }}
          />
          {error && <p style={{ fontSize: 13, color: theme.danger, margin: "0 0 12px" }}>Incorrect password. Try again.</p>}
          <button type="submit" disabled={loading || !password} style={{ width: "100%", padding: "14px", borderRadius: 50, border: "none", background: loading ? theme.textMuted : theme.primary, color: "white", fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Checking..." : "Enter Dashboard"}
          </button>
        </form>
        <a href="/" style={{ display: "inline-block", marginTop: 20, fontSize: 13, color: theme.textLight, textDecoration: "none" }}>Back to website</a>
      </div>
    </div>
  );
}

export default function TinaMariaApp() {
  // URL-based routing: /book shows BookingView directly
  const [view, setView] = useState(() => {
    const path = window.location.pathname;
    if (path === "/book" || path === "/book/") return "booking";
    return "website";
  });
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => sessionStorage.getItem("tm_admin") === "true");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [appointments] = useState(generateAppointments);
  const [clients, setClients] = useState(CLIENTS_DATA);
  const [transactions] = useState(TRANSACTIONS_DATA);
  const [campaigns] = useState(CAMPAIGNS_DATA);
  const [showNewApptModal, setShowNewApptModal] = useState(false);
  const [showClientDetail, setShowClientDetail] = useState(null);
  const [selectedDate, setSelectedDate] = useState("2026-02-12");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/book" || path === "/book/") setView("booking");
      else setView("website");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (view === "booking") {
    return <BookingView />;
  }

  if (view === "website") {
    return <WebsiteView onOpenAdmin={() => setView("admin")} />;
  }

  // Admin password gate
  if (view === "admin" && !adminAuthenticated) {
    return <AdminLoginGate onAuthenticated={() => setAdminAuthenticated(true)} />;
  }

  const notifications = [
    { id: 1, text: "Rachel Torres confirmed her coaching session for Feb 14", time: "2 min ago", read: false },
    { id: 2, text: "New discovery call request from Nina Patel", time: "15 min ago", read: false },
    { id: 3, text: "Payment of $240 received from Sophia Adams", time: "1 hr ago", read: true },
    { id: 4, text: "Zoey Zest campaign reached 278 opens!", time: "2 days ago", read: true },
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "clients", label: "Clients", icon: Users },
    { id: "payments", label: "Payments", icon: DollarSign },
    { id: "marketing", label: "Marketing", icon: Mail },
    { id: "services", label: "Services", icon: Sparkles },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="tm-admin-layout" style={{ display: "flex", height: "100vh", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: theme.bg, color: theme.text, overflow: "hidden" }}>
      {/* SIDEBAR */}
      <aside className="tm-sidebar" style={{ width: sidebarCollapsed ? 72 : 240, background: theme.sidebar, display: "flex", flexDirection: "column", transition: "width 0.3s ease", flexShrink: 0, overflow: "hidden" }}>
        <div className="tm-sidebar-logo" style={{ padding: sidebarCollapsed ? "24px 12px" : "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentMid})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sparkles size={18} color="white" />
            </div>
            {!sidebarCollapsed && <span style={{ fontSize: 17, fontWeight: 700, color: "white", letterSpacing: "-0.3px", whiteSpace: "nowrap" }}>Tina Maria</span>}
          </div>
        </div>
        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: sidebarCollapsed ? "12px" : "10px 14px", marginBottom: 2, borderRadius: 10, border: "none", cursor: "pointer", background: active ? "rgba(123,158,137,0.2)" : "transparent", color: active ? theme.sidebarActive : theme.sidebarText, transition: "all 0.2s", justifyContent: sidebarCollapsed ? "center" : "flex-start", fontSize: 14, fontWeight: active ? 600 : 400 }}>
                <Icon size={20} />
                {!sidebarCollapsed && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
              </button>
            );
          })}
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "12px 6px" }} />
          <button onClick={() => setView("website")} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: sidebarCollapsed ? "12px" : "10px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: "transparent", color: theme.sidebarText, fontSize: 14, justifyContent: sidebarCollapsed ? "center" : "flex-start" }}>
            <Globe size={20} />
            {!sidebarCollapsed && <span>View Website</span>}
          </button>
        </nav>
        {!sidebarCollapsed && (
          <div className="tm-sidebar-profile" style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.accent}, ${theme.warm})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 600 }}>TM</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Tina Maria</div>
                <div style={{ fontSize: 11, color: theme.sidebarText }}>Life Coach & Hypnotherapist</div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="tm-admin-main" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header className="tm-admin-header" style={{ height: 64, background: theme.card, borderBottom: `1px solid ${theme.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{activeTab === "dashboard" ? "Welcome back, Tina ✨" : navItems.find(n => n.id === activeTab)?.label}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ position: "relative" }}>
              <button onClick={() => { setSearchOpen(!searchOpen); setNotifOpen(false); }} style={{ width: 38, height: 38, borderRadius: 10, border: `1px solid ${theme.border}`, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: theme.textLight }}>
                <Search size={18} />
              </button>
              {searchOpen && (
                <div style={{ position: "absolute", top: 46, right: 0, width: 320, background: "white", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: `1px solid ${theme.border}`, padding: 12, zIndex: 100 }}>
                  <input autoFocus placeholder="Search clients, services..." style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${theme.border}`, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              )}
            </div>
            <div style={{ position: "relative" }}>
              <button onClick={() => { setNotifOpen(!notifOpen); setSearchOpen(false); }} style={{ width: 38, height: 38, borderRadius: 10, border: `1px solid ${theme.border}`, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: theme.textLight, position: "relative" }}>
                <Bell size={18} />
                <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: theme.accent }} />
              </button>
              {notifOpen && (
                <div style={{ position: "absolute", top: 46, right: 0, width: 360, background: "white", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: `1px solid ${theme.border}`, zIndex: 100, overflow: "hidden" }}>
                  <div style={{ padding: "14px 16px", borderBottom: `1px solid ${theme.border}`, fontWeight: 600, fontSize: 14 }}>Notifications</div>
                  {notifications.map(n => (
                    <div key={n.id} style={{ padding: "12px 16px", borderBottom: `1px solid ${theme.border}`, background: n.read ? "white" : theme.accentLight, cursor: "pointer" }}>
                      <div style={{ fontSize: 13, lineHeight: 1.5 }}>{n.text}</div>
                      <div style={{ fontSize: 11, color: theme.textLight, marginTop: 4 }}>{n.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => setShowNewApptModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 10, border: "none", background: theme.primary, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              <Plus size={16} /> New Booking
            </button>
          </div>
        </header>

        <div className="tm-admin-body" style={{ flex: 1, overflow: "auto", padding: 28 }} onClick={() => { setSearchOpen(false); setNotifOpen(false); }}>
          {activeTab === "dashboard" && <DashboardView appointments={appointments} transactions={transactions} clients={clients} selectedDate={selectedDate} onViewClient={setShowClientDetail} />}
          {activeTab === "calendar" && <CalendarView appointments={appointments} selectedDate={selectedDate} setSelectedDate={setSelectedDate} onNewAppt={() => setShowNewApptModal(true)} />}
          {activeTab === "clients" && <ClientsView clients={clients} setClients={setClients} onViewClient={setShowClientDetail} />}
          {activeTab === "payments" && <PaymentsView transactions={transactions} />}
          {activeTab === "marketing" && <MarketingView campaigns={campaigns} clients={clients} />}
          {activeTab === "services" && <ServicesView />}
          {activeTab === "settings" && <SettingsView />}
        </div>
      </main>

      {showNewApptModal && <NewAppointmentModal onClose={() => setShowNewApptModal(false)} clients={clients} />}
      {showClientDetail !== null && <ClientDetailModal client={clients.find(c => c.id === showClientDetail)} onClose={() => setShowClientDetail(null)} appointments={appointments} transactions={transactions} />}
    </div>
  );
}

// ============================================================
// WEBSITE VIEW — PUBLIC-FACING LANDING PAGE
// ============================================================
function WebsiteView({ onOpenAdmin }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activePost, setActivePost] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  // ---- BLOG DATA ----
  const blogPosts = [
    {
      id: 1,
      category: "Money Mindset",
      tag: "MONEY MINDSET",
      tagColor: theme.accent,
      date: "Feb 10, 2026",
      readTime: "5 min read",
      title: "The Biggest Money Block Women Over 40 Don't Even Know They Have",
      preview: "You know that little voice that says 'Who am I to charge for this?' or 'I should just be grateful for what I have'? Yeah, we need to talk about her...",
      content: `Let me tell you something that changed everything for me.\n\nFor years, I had this sneaky little belief running in the background of my brain like bad software. It whispered things like "Money is hard to make," "Rich people are greedy," and my personal favorite — "Who do you think you are?"\n\nSound familiar?\n\nHere's the thing — most women our age grew up hearing messages about money that were never actually ours. They came from our parents, our culture, our teachers, our first bosses. And we absorbed them like sponges without ever questioning whether they were TRUE.\n\nThe #1 money block I see in my coaching clients? The belief that wanting more money makes you selfish or ungrateful.\n\nLet me be really clear about this: Wanting financial abundance is not greedy. It's not selfish. It's not "too much." Wanting to build something that creates income while you sleep? That's called being SMART.\n\nHere's what I know to be true after years of coaching incredible women through their money stuff:\n\n• Money is energy. It flows toward clarity and away from confusion.\n• Your relationship with money mirrors your relationship with your own worth.\n• You cannot out-earn your self-image. (Read that again.)\n• The women who build the most wealth are the ones who heal their money stories first.\n\nSo how do you start shifting this? Three things:\n\n1. Notice the story. Next time you feel weird about money — charging for your services, investing in yourself, even checking your bank account — pause and ask: "Whose voice is that?"\n\n2. Replace it. Not with toxic positivity, but with something that feels TRUE and better. Instead of "money is hard," try "money is flowing to me in ways I haven't discovered yet."\n\n3. Take one bold money action this week. Raise a price. Send that invoice. Open that savings account. Action rewires belief faster than affirmations alone.\n\nYour next chapter is supposed to include financial freedom, babe. Not "just getting by."\n\nReady to dig into your money blocks with me? Let's chat. The discovery call is free and we'll get real about what's been holding you back.`,
    },
    {
      id: 2,
      category: "Manifestation",
      tag: "MANIFESTATION",
      tagColor: "#8B7EC7",
      date: "Feb 5, 2026",
      readTime: "6 min read",
      title: "Manifestation Isn't Magic — It's a Strategy (And You're Already Doing It)",
      preview: "If I hear one more person say 'just think positive!' I might scream. Here's what manifestation actually looks like when you're building a business after 40...",
      content: `Okay, real talk.\n\nI love manifestation. I teach it. I live it. But can we please retire the version of manifestation that's just "think happy thoughts and a Birkin bag will appear on your doorstep"?\n\nBecause that's not how this works. And honestly? That version of manifestation has done a lot of damage to women who tried it, "failed," and then decided the whole thing was nonsense.\n\nHere's what manifestation ACTUALLY is: It's getting crystal clear on what you want, believing — truly, in your bones — that it's possible for you, and then taking aligned action toward it.\n\nRead that last part again. ALIGNED ACTION.\n\nManifesting your online business isn't sitting on the couch visualizing money. It's:\n\n• Getting clear on who you want to help and what problem you solve\n• Showing up online even when you feel awkward about it\n• Investing in the tools, coaching, and skills you need\n• Making decisions from your future self, not your current fears\n• Trusting the process even when you can't see the full staircase\n\nI built my entire coaching practice and digital business this way. I built PlanMyPartyPal.com this way. I created Zoey Zest music this way. Every single one started with a vision, followed by real, sometimes messy, action.\n\nHere's the part nobody talks about: Manifestation gets BETTER as you get older. Why? Because you know yourself. You've lived enough life to know what you actually want — not what Instagram tells you to want. You've developed resilience, wisdom, and the beautiful ability to just not care what people think anymore.\n\nTHAT is your superpower at this stage of life.\n\nSo if you've been sitting on a business idea, a creative project, a "what if" that keeps nagging at you — that's not random. That's your intuition telling you it's time.\n\nThe universe doesn't give you desires without giving you the ability to fulfill them. But it does require you to take the first step.\n\nWhat's one tiny step you could take this week toward that thing you keep thinking about? Send me a message. I'd love to hear about it.`,
    },
    {
      id: 3,
      category: "Digital Marketing",
      tag: "DIGITAL MARKETING",
      tagColor: "#5B8FA8",
      date: "Jan 28, 2026",
      readTime: "7 min read",
      title: "Digital Marketing Should Be Fun — Here's How to Stop Overthinking It",
      preview: "Raise your hand if you've spent more time stressing about what to post than actually posting. I see you. Here's the thing — it doesn't have to be this hard...",
      content: `Can I be honest with you for a second?\n\nDigital marketing is not supposed to make you cry into your coffee at 11pm while you try to figure out what hashtags to use.\n\nIt's supposed to be FUN.\n\nI know, I know — that sounds crazy when you're staring at a blank Instagram caption wondering if you should use a professional headshot or a selfie (use the selfie, by the way — people want to see the real you).\n\nBut here's what I've learned from building my own online presence AND helping my clients build theirs: The moment marketing starts feeling like a chore, you're doing it wrong.\n\nSo let's fix that. Here's my no-stress approach to digital marketing that actually works:\n\n1. TALK LIKE A HUMAN\nForget the corporate speak. Forget the "leverage your synergies" nonsense. Write your posts like you're texting your best friend about something you're excited about. That's it. That's the whole strategy.\n\n2. YOU ONLY NEED ONE PLATFORM (seriously)\nYou do NOT need to be on TikTok, Instagram, YouTube, Pinterest, LinkedIn, Facebook, X, Threads, and whatever new app launched this morning. Pick the ONE place where your people hang out and go all in. For most women building coaching or service businesses? Instagram or Facebook. Done.\n\n3. SHARE YOUR STORY, NOT JUST YOUR SERVICES\nPeople buy from people they trust. They trust people whose stories they relate to. You know what's relatable? Starting over at 45. Learning new technology and laughing at yourself. Being passionate about something everyone else thinks is "too late" for you. That stuff is GOLD.\n\n4. DONE IS BETTER THAN PERFECT\nThat post you've been editing for three days? Post it. That website you've been tweaking? Launch it. That email to your list that you keep rewriting? Send it. Perfection is just procrastination in a fancy outfit.\n\n5. USE AI TO MAKE IT EASIER\nHere's a secret — I use AI tools to help me create content, build websites, and streamline my marketing. Not because I'm lazy, but because I'm smart. Technology is here to help us work smarter. There is ZERO shame in using every tool available to you.\n\nThe women who win at digital marketing aren't the ones with the fanciest graphics or the most followers. They're the ones who show up consistently, share authentically, and treat it like a conversation — not a performance.\n\nYou've got decades of wisdom, experience, and personality. That IS your marketing strategy.\n\nNeed help getting started? That's literally what I do. Let's hop on a free discovery call and figure out your game plan together.`,
    },
    {
      id: 4,
      category: "Money Mindset",
      tag: "MONEY MINDSET",
      tagColor: theme.accent,
      date: "Jan 20, 2026",
      readTime: "4 min read",
      title: "Why 'Passive Income' Isn't Passive (But It's Still 1000% Worth It)",
      preview: "Every guru online makes it sound like you set up a digital product and money rains from the sky. Let me tell you what it actually takes — and why it's still the best decision I ever made...",
      content: `Let's bust a myth right now.\n\nThere is no such thing as truly "passive" income. Whoever coined that phrase owes us all an apology.\n\nBut before you close this tab — there IS such a thing as leveraged income. And that, my friend, is the real game-changer.\n\nHere's the difference:\n\nPassive income (the myth): Create a thing once, never touch it again, wake up to money in your account forever.\n\nLeveraged income (the reality): Create a thing once, promote it consistently, refine it over time, and earn from it repeatedly without trading more hours for dollars.\n\nSee the difference? One is a fairy tale. The other is a business strategy.\n\nHere's what leveraged income actually looks like for women starting online businesses:\n\n• A digital course you create once and sell on repeat\n• An ebook or guide that solves a specific problem\n• A membership community with monthly recurring revenue\n• Templates, planners, or tools people can download\n• A booking system that runs while you're at brunch\n\nI built my digital solutions practice exactly this way. Every website I build, every app I create, every system I set up — it continues to work and generate value long after the initial build.\n\nThe key that nobody tells you? The FIRST time takes the longest. Your first digital product will take you way longer than you think. Your first launch will feel clunky. Your first sales page will make you cringe later.\n\nAND THAT'S OKAY.\n\nBecause the second time? Faster. The third time? Even faster. And by the fifth or sixth? You've got a system. You've got confidence. You've got INCOME.\n\nThe women who build real wealth online are not the ones who did it perfectly. They're the ones who did it ANYWAY.\n\nSo what's your leveraged income idea? What do you know, what have you experienced, what can you teach that someone else would happily pay for?\n\nI promise you — it's something. And I'd love to help you figure it out.`,
    },
    {
      id: 5,
      category: "Manifestation",
      tag: "MANIFESTATION",
      tagColor: "#8B7EC7",
      date: "Jan 12, 2026",
      readTime: "5 min read",
      title: "The 5-Minute Morning Ritual That Changed My Entire Business",
      preview: "I'm not going to tell you to wake up at 5am and do a 2-hour routine. This takes five minutes and it works. Here's exactly what I do...",
      content: `I used to think successful people had some secret morning routine that involved crystals, journaling for an hour, cold plunges, and meditating on a mountain.\n\nThen I realized I'm a real person with a real life and I just need something that WORKS.\n\nSo here's my 5-minute morning ritual that has genuinely transformed my business, my mindset, and honestly my whole vibe:\n\nMinute 1: GRATITUDE DUMP\nBefore I even get out of bed, I think of three specific things I'm grateful for. Not generic stuff like "my health." Specific things like "that client who sent me the sweetest message yesterday" or "the fact that my website got 47 visitors while I slept." Specific gratitude trains your brain to look for more good things.\n\nMinute 2: FUTURE SELF CHECK-IN\nI close my eyes and picture the version of me who already has what I'm working toward. What is she wearing? How does she carry herself? What does her day look like? This isn't woo-woo — this is visualization, and it's the same technique Olympic athletes use.\n\nMinute 3: ONE INTENTION\nI pick ONE thing that matters most today. Not a to-do list of 47 items. One thing. "Today I will finish my sales page." "Today I will reach out to 3 potential clients." "Today I will record that video I've been avoiding." One clear intention.\n\nMinute 4: AFFIRMATION ON REPEAT\nI have one core affirmation I repeat for 60 seconds. Mine changes over time but right now it's: "Everything I touch turns to gold because I bring my whole self to everything I do." Find one that makes you feel something. If it doesn't give you a little buzz, it's not the right one.\n\nMinute 5: MUSIC\nI play a Zoey Zest track (yes, I'm biased!) or any song that makes me feel powerful, abundant, and ready to go. Music shifts your energy faster than anything else.\n\nThat's it. Five minutes. No crystals required (although I do love a good crystal).\n\nThe magic isn't in any one of these steps. It's in the consistency. It's in telling your brain, every single morning, "We're doing big things today."\n\nTry it for one week. Just seven days. And then tell me what shifted. I bet you'll be surprised.`,
    },
    {
      id: 6,
      category: "Digital Marketing",
      tag: "DIGITAL MARKETING",
      tagColor: "#5B8FA8",
      date: "Jan 5, 2026",
      readTime: "6 min read",
      title: "You Don't Need 10K Followers to Make Money Online (Here's Proof)",
      preview: "I'm so tired of the 'grow your following first' advice. Some of my most successful clients have tiny audiences and big bank accounts. Here's how...",
      content: `Let me say this louder for the people in the back:\n\nYOU DO NOT NEED A HUGE FOLLOWING TO BUILD A PROFITABLE ONLINE BUSINESS.\n\nThere. I said it. And I have the receipts to prove it.\n\nI've watched women with 300 Instagram followers launch $5,000 coaching programs. I've seen someone with a 200-person email list sell out a digital course. One of my clients made her first $10K month with literally 87 followers.\n\nHow? Because they focused on CONNECTION, not numbers.\n\nHere's the math that changes everything:\n\nLet's say you have 500 followers. If just 2% of them buy a $97 digital product, that's 10 sales = $970. Do that every month? That's nearly $12,000 a year from a "tiny" audience. Now imagine you also have a coaching offer at $500. You only need 2 clients a month to add another $12,000.\n\nThat's $24,000 a year from 500 followers and a solid offer. And we haven't even talked about scaling yet.\n\nThe key is what I call the TRUST TRIFECTA:\n\n1. Be genuinely helpful. Share tips, stories, and insights that actually help people. Not fluff. Real value.\n\n2. Be consistently visible. You don't need to post three times a day. But you do need to show up regularly so people remember you exist.\n\n3. Have a clear offer. What do you sell? Who is it for? What problem does it solve? If you can't answer those in one sentence, we need to work on that.\n\nThe biggest mistake I see women make? They spend months (or years!) trying to "build their audience" before they ever sell anything. Meanwhile, someone with a fraction of their followers is out there making sales because she had the courage to make an offer.\n\nYou don't need to go viral. You don't need a blue checkmark. You don't need to dance on Reels (unless you want to — then by all means, dance!).\n\nYou need a message, an offer, and the willingness to share it with the people who are already paying attention.\n\nThat's it. That's the whole secret.\n\nReady to build your offer and stop waiting for some magical follower count? Let's talk. I'll help you get your first (or next) paying client.`,
    },
  ];

  // ---- NAV ----
  const NavBar = () => (
    <nav className="tm-nav" style={{ position: "sticky", top: 0, zIndex: 1000, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${theme.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", cursor: "pointer" }}>
          <div style={{ width: 38, height: 38, borderRadius: 50, background: `linear-gradient(135deg, ${theme.accent}, ${theme.warm})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={18} color="white" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, color: theme.primary, letterSpacing: "-0.5px" }}>TinaMaria</span>
        </a>
        <div className="tm-nav-links" style={{ display: "flex", gap: 24 }}>
          {["About", "Services", "Course", "Work", "Blog", "Creative", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: 14, color: theme.textLight, textDecoration: "none", fontWeight: 500, cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = theme.primary} onMouseLeave={e => e.target.style.color = theme.textLight}>{item}</a>
          ))}
        </div>
      </div>
      <div className="tm-nav-actions" style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button className="tm-mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} style={{ width: 38, height: 38, borderRadius: 8, border: `1px solid ${theme.border}`, background: "white", cursor: "pointer", display: "none", alignItems: "center", justifyContent: "center" }}>
          <Menu size={20} color={theme.text} />
        </button>
        <button className="tm-admin-btn" onClick={onOpenAdmin} style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${theme.border}`, background: "transparent", color: theme.textLight, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Admin</button>
        <a className="tm-book-btn" href="/book" style={{ padding: "10px 24px", borderRadius: 50, border: "none", background: theme.primary, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", textDecoration: "none" }} onMouseEnter={e => { e.target.style.background = "#333"; e.target.style.transform = "translateY(-1px)"; }} onMouseLeave={e => { e.target.style.background = theme.primary; e.target.style.transform = "translateY(0)"; }}>Book Now</a>
      </div>
      {mobileMenu && (
        <div className="tm-mobile-menu" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "white", zIndex: 2000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0, overflow: "auto" }}>
          <button onClick={() => setMobileMenu(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", zIndex: 2001, padding: 8 }}><X size={28} color={theme.text} /></button>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "20px 0" }}>
            {["About", "Services", "Course", "Work", "Blog", "Creative", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} style={{ fontSize: 18, fontWeight: 500, color: theme.text, textDecoration: "none", padding: "12px 40px", borderRadius: 10, width: "100%", textAlign: "center", transition: "background 0.2s" }}>{item}</a>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", paddingTop: 16, borderTop: `1px solid ${theme.border}`, width: "80%" }}>
            <a href="/book" onClick={() => setMobileMenu(false)} style={{ padding: "14px 40px", borderRadius: 50, background: theme.primary, color: "white", fontSize: 15, fontWeight: 600, textDecoration: "none", textAlign: "center", width: "100%" }}>Book Now</a>
            <button onClick={() => { onOpenAdmin(); setMobileMenu(false); }} style={{ padding: "10px 24px", borderRadius: 8, border: `1px solid ${theme.border}`, background: "transparent", color: theme.textLight, fontSize: 13, cursor: "pointer" }}>Admin Dashboard</button>
          </div>
        </div>
      )}
    </nav>
  );

  // ---- HERO ----
  // Hibiscus flower SVG — 5 wide overlapping petals with central stamen, scattered at various sizes/rotations
  const hibiscusPetal = "M0,-8 C-18,-42 -48,-58 -42,-38 C-38,-22 -22,-10 0,-8Z";
  const leafSvg = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'><defs><g id='hb'><path d='M0,-10 C-8,-30 -30,-52 -40,-42 C-50,-32 -38,-12 -10,-4 C-4,-2 -2,-6 0,-10Z' fill='#7B9E89'/><path d='M0,-10 C8,-30 30,-52 40,-42 C50,-32 38,-12 10,-4 C4,-2 2,-6 0,-10Z' fill='#7B9E89'/><path d='M-10,0 C-30,8 -52,30 -42,40 C-32,50 -12,38 -4,10 C-2,4 -6,2 -10,0Z' fill='#7B9E89'/><path d='M10,0 C30,8 52,30 42,40 C32,50 12,38 4,10 C2,4 6,2 10,0Z' fill='#7B9E89'/><path d='M0,10 C-8,30 -18,52 -6,50 C6,48 8,28 2,12 C1,8 0,9 0,10Z' fill='#7B9E89'/><circle cx='0' cy='0' r='5' fill='#C4A882'/><line x1='0' y1='-2' x2='0' y2='-58' stroke='#C4A882' stroke-width='1.2'/><circle cx='0' cy='-58' r='2.5' fill='#C4A882'/><circle cx='-3' cy='-52' r='1.8' fill='#C4A882'/><circle cx='3' cy='-52' r='1.8' fill='#C4A882'/></g></defs><g opacity='0.14'><use href='#hb' transform='translate(100,120) rotate(-15) scale(1.1)'/><use href='#hb' transform='translate(680,80) rotate(25) scale(0.8)'/><use href='#hb' transform='translate(380,340) rotate(40) scale(1.2)'/><use href='#hb' transform='translate(60,550) rotate(-30) scale(0.9)'/><use href='#hb' transform='translate(720,480) rotate(55) scale(0.75)'/><use href='#hb' transform='translate(300,700) rotate(-5) scale(1.0)'/><use href='#hb' transform='translate(550,650) rotate(70) scale(0.65)'/></g></svg>`)}")`;
  const HeroSection = () => (
    <section id="home" className="tm-hero tm-section" style={{ background: `linear-gradient(180deg, ${theme.accentLight} 0%, white 100%)`, padding: "100px 40px 80px", position: "relative", overflow: "hidden" }}>
      {/* Subtle hibiscus texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: leafSvg, backgroundSize: "800px 800px", backgroundRepeat: "repeat", pointerEvents: "none" }} />
      <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div className="tm-hero-pill" style={{ display: "inline-block", background: "white", border: `1px solid ${theme.border}`, borderRadius: 50, padding: "8px 20px", fontSize: 14, color: theme.accent, fontWeight: 600, marginBottom: 28 }}>Life Coach · Hypnotherapist · Digital Marketing · Zoey Zest</div>
        <h1 style={{ fontSize: 52, fontWeight: 700, color: theme.primary, lineHeight: 1.15, margin: "0 0 24px", letterSpacing: "-1.5px" }}>Life is supposed to be <span className="tm-fun" style={{ fontFamily: "'Caveat', cursive", fontSize: 68, color: theme.accent, fontWeight: 700, display: "inline-block", transform: "rotate(-2deg)", position: "relative" }}>fun<span style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 6, background: `${theme.accent}25`, borderRadius: 3 }} /></span>.<br/>Building your business should be too.</h1>
        <p className="tm-hero-sub" style={{ fontSize: 19, color: theme.textLight, lineHeight: 1.7, margin: "0 auto 20px", maxWidth: 640 }}>Hey, I'm Tina Maria. I help women in their 40s, 50s, and 60s start the online businesses they've been dreaming about — with the mindset, strategy, and tech support to actually make it happen.</p>
        <p className="tm-hero-sub2" style={{ fontSize: 17, color: theme.text, lineHeight: 1.7, margin: "0 auto 36px", maxWidth: 580, fontWeight: 500 }}>No overwhelm. No jargon. Just real guidance from someone who gets it.</p>
        <div className="tm-hero-btns" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/book" style={{ padding: "16px 36px", borderRadius: 50, border: "none", background: theme.primary, color: "white", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all 0.3s", textDecoration: "none", display: "inline-block" }} onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }} onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>Book a Free Discovery Call</a>
          <a href="#about" style={{ padding: "16px 36px", borderRadius: 50, border: `2px solid ${theme.border}`, background: "white", color: theme.text, fontSize: 16, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "inline-block", transition: "all 0.2s" }} onMouseEnter={e => e.target.style.borderColor = theme.accent} onMouseLeave={e => e.target.style.borderColor = theme.border}>Get to Know Me</a>
        </div>
      </div>
    </section>
  );

  // ---- "I GET IT" SECTION ----
  const EmpathySection = () => (
    <section className="tm-section" style={{ background: "white", padding: "80px 40px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 className="tm-section-title" style={{ fontSize: 38, fontWeight: 700, color: theme.primary, textAlign: "center", margin: "0 0 20px", letterSpacing: "-0.5px" }}>Sound like you?</h2>
        <p style={{ fontSize: 17, color: theme.textLight, textAlign: "center", margin: "0 auto 48px", maxWidth: 600, lineHeight: 1.7 }}>If any of these hit home, you're in exactly the right place.</p>
        <div className="tm-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {[
            { emoji: "🤔", text: "You've got a business idea (or twelve) but have no clue where to start" },
            { emoji: "😤", text: "Technology makes you want to throw your laptop out the window" },
            { emoji: "💭", text: "You keep telling yourself 'someday' but someday never comes" },
            { emoji: "😬", text: "You've spent money on courses that collected dust" },
            { emoji: "🙋‍♀️", text: "You feel like you missed the boat on this whole online thing" },
            { emoji: "💪", text: "Deep down you KNOW you're meant for more" },
          ].map((item, i) => (
            <div key={i} className="tm-empathy-card" style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", borderRadius: 14, background: i === 5 ? theme.accentLight : theme.bg, border: `1px solid ${i === 5 ? theme.accent + "40" : theme.border}`, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{item.emoji}</span>
              <span style={{ fontSize: 16, color: theme.text, fontWeight: i === 5 ? 600 : 400, lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 18, color: theme.accent, textAlign: "center", marginTop: 40, fontWeight: 600 }}>Good news? You haven't missed anything. Your timing is perfect.</p>
      </div>
    </section>
  );

  // ---- ABOUT ----
  const AboutSection = () => (
    <section id="about" className="tm-section" style={{ background: theme.accentLight, padding: "80px 40px" }}>
      <div className="tm-about-grid" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div className="tm-about-avatar" style={{ width: 100, height: 100, borderRadius: 50, background: `linear-gradient(135deg, ${theme.accent}, ${theme.warm})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
            <span style={{ fontSize: 44 }}>👋</span>
          </div>
          <h2 style={{ fontSize: 38, fontWeight: 700, color: theme.primary, margin: "0 0 8px", letterSpacing: "-0.5px" }}>Hey, I'm Tina Maria.</h2>
          <p style={{ fontSize: 17, color: theme.accent, fontWeight: 600, margin: "0 0 24px" }}>Life Coach · Hypnotherapist · Digital Nerd · Music Maker</p>
        </div>
        <div style={{ fontSize: 16, color: theme.text, lineHeight: 1.85, display: "flex", flexDirection: "column", gap: 18 }}>
          <p style={{ margin: 0 }}>I'm going to tell you something nobody else will: <strong>you are not too old, too late, or too behind.</strong> You're actually right on time.</p>
          <p style={{ margin: 0 }}>I've spent years helping women just like you — smart, capable, amazing women who felt stuck — build businesses that light them up from the inside out. As a certified Life Coach and Hypnotherapist, I help you clear out the mental clutter first. Then we build.</p>
          <p style={{ margin: 0 }}>But here's what makes me different: <strong>I don't just coach you on your business — I can literally build it for you.</strong> Websites, apps, booking systems, digital products — I've done it all. I built PlanMyPartyPal.com from scratch. I created a luxury booking system for an esthetician. I make music as Zoey Zest.</p>
          <p style={{ margin: 0 }}>I use the same mindset tools to create in the digital world that I teach my clients. When you understand how to manifest in your mind, you can build anything — including the online business you've been dreaming about.</p>
          <p style={{ margin: 0, fontStyle: "italic", color: theme.accent, fontWeight: 500 }}>Your next chapter is going to be your best one. Let's write it together.</p>
        </div>
      </div>
    </section>
  );

  // ---- SERVICES ----
  const ServicesSection = () => (
    <section id="services" className="tm-section" style={{ background: "white", padding: "80px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 className="tm-section-title" style={{ fontSize: 38, fontWeight: 700, color: theme.primary, margin: "0 0 16px", letterSpacing: "-0.5px" }}>Here's How I Can Help</h2>
          <p style={{ fontSize: 17, color: theme.textLight, margin: 0, maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>Whether you need mindset work, business guidance, tech help, or all three — I've got you covered.</p>
        </div>
        <div className="tm-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {[
            { emoji: "🌟", title: "Life Coaching", subtitle: "Clear the blocks. Find your fire.", desc: "Feeling stuck? Lost? Like there's got to be MORE? One-on-one coaching to help you get clear on what you actually want and start going after it. We'll work on your confidence, your goals, and that little voice that keeps saying 'you can't.'", price: "From $150/session", color: theme.accent },
            { emoji: "🧠", title: "Hypnotherapy", subtitle: "Rewire your brain for success.", desc: "This is where the deep transformation happens. We'll work with your subconscious mind to release the beliefs that have been quietly running the show — the money blocks, the self-doubt, the 'I'm not enough' stories. Life-changing stuff.", price: "From $200/session", color: "#8B7EC7" },
            { emoji: "💼", title: "Business Coaching", subtitle: "From dream to actual business.", desc: "You've got the idea. Maybe you've got several. What you need is someone to help you pick the right one, create a plan, and actually get it off the ground. I'll walk you through everything — no jargon, no overwhelm, lots of 'you've got this.'", price: "From $125/session", color: theme.warm },
            { emoji: "🚀", title: "Digital Solutions", subtitle: "I'll build it for you. Seriously.", desc: "Need a website? An app? A booking system? A digital product? I build beautiful, functional tech using AI — so it's faster and more affordable than you'd think. Recent builds include PlanMyPartyPal.com and a luxury esthetician booking platform.", price: "Custom pricing", color: "#5B8FA8" },
          ].map(svc => {
            const isH = hoveredCard === svc.title;
            return (
              <div key={svc.title} style={{ background: theme.card, border: `1px solid ${isH ? svc.color + "60" : theme.border}`, borderRadius: 16, padding: "32px 28px", transition: "all 0.3s", transform: isH ? "translateY(-4px)" : "none", boxShadow: isH ? `0 12px 32px ${svc.color}18` : "0 2px 8px rgba(0,0,0,0.03)", cursor: "pointer" }} onMouseEnter={() => setHoveredCard(svc.title)} onMouseLeave={() => setHoveredCard(null)}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <span style={{ fontSize: 36 }}>{svc.emoji}</span>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: theme.primary }}>{svc.title}</div>
                    <div style={{ fontSize: 14, color: svc.color, fontWeight: 600 }}>{svc.subtitle}</div>
                  </div>
                </div>
                <p style={{ fontSize: 15, color: theme.textLight, lineHeight: 1.7, margin: "0 0 20px" }}>{svc.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: svc.color }}>{svc.price}</span>
                  <a href="/book" style={{ padding: "10px 22px", borderRadius: 50, border: "none", background: theme.primary, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", textDecoration: "none" }} onMouseEnter={e => e.target.style.background = "#333"} onMouseLeave={e => e.target.style.background = theme.primary}>Book Now</a>
                </div>
              </div>
            );
          })}
        </div>
        {/* VIP callout */}
        <div className="tm-vip" style={{ marginTop: 28, background: `linear-gradient(135deg, ${theme.primary}, #333)`, borderRadius: 16, padding: "32px 36px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 28 }}>⚡</span>
              <span style={{ fontSize: 22, fontWeight: 700 }}>VIP Intensive Day</span>
            </div>
            <p style={{ fontSize: 15, opacity: 0.85, margin: 0, maxWidth: 500, lineHeight: 1.6 }}>Want it all at once? A full day together — coaching, hypnotherapy, business strategy, and digital setup. You'll walk away completely transformed with a real plan in your hands.</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>$997</div>
            <a href="/book" style={{ padding: "12px 28px", borderRadius: 50, border: "2px solid white", background: "transparent", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", textDecoration: "none", display: "inline-block" }} onMouseEnter={e => { e.target.style.background = "white"; e.target.style.color = theme.primary; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "white"; }}>Book Your Day</a>
          </div>
        </div>
      </div>
    </section>
  );

  // ---- SWC COURSE BANNER ----
  const CourseBanner = () => (
    <section id="course" className="tm-section" style={{ background: "white", padding: "60px 40px" }}>
      <div className="tm-course" style={{ maxWidth: 1000, margin: "0 auto", background: `linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)`, borderRadius: 20, padding: "44px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 40, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(123,158,137,0.12)" }} />
        <div style={{ position: "absolute", bottom: -30, left: -30, width: 140, height: 140, borderRadius: "50%", background: "rgba(196,168,130,0.1)" }} />
        <div style={{ position: "relative", zIndex: 1, flex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", borderRadius: 50, padding: "6px 16px", marginBottom: 16 }}>
            <Rocket size={14} color="#C4A882" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#C4A882", letterSpacing: "0.5px", textTransform: "uppercase" }}>Featured Course</span>
          </div>
          <h3 style={{ fontSize: 28, fontWeight: 700, color: "white", margin: "0 0 12px", lineHeight: 1.3 }}>Get Started with Digital Marketing</h3>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", margin: "0 0 8px", lineHeight: 1.6 }}>SWC (Selling With Confidence) is a full course that teaches you <strong style={{ color: "white" }}>all things digital marketing with social media</strong> — from setting up your profiles to creating content that converts. No fluff, no tech overwhelm. Just step-by-step guidance you can actually follow.</p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: "0 0 24px", lineHeight: 1.6 }}>Perfect for women who are ready to stop scrolling and start building. This is the exact system I use and teach my clients.</p>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <a href="https://beacons.ai/tinamariatok" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 50, border: "none", background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentMid})`, color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", textDecoration: "none", transition: "all 0.3s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(123,158,137,0.4)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <Zap size={16} /> Enroll in SWC Now
            </a>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>at beacons.ai/tinamariatok</span>
          </div>
        </div>
        <div className="tm-course-icon" style={{ position: "relative", zIndex: 1, textAlign: "center", flexShrink: 0 }}>
          <div style={{ width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.15)" }}>
            <span style={{ fontSize: 52 }}>📱</span>
          </div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 12 }}>
            {["Social", "Content", "Sales"].map(t => (
              <span key={t} style={{ padding: "3px 10px", borderRadius: 50, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // ---- FREE CALL BANNER ----
  const DiscoveryBanner = () => (
    <section className="tm-section tm-discovery" style={{ background: theme.warmLight, padding: "56px 40px", textAlign: "center" }}>
      <div style={{ maxWidth: 650, margin: "0 auto" }}>
        <span style={{ fontSize: 32 }}>✨</span>
        <h3 style={{ fontSize: 26, fontWeight: 700, color: theme.primary, margin: "12px 0 12px" }}>Not sure where to start? That's okay.</h3>
        <p style={{ fontSize: 16, color: theme.textLight, lineHeight: 1.7, margin: "0 0 24px" }}>Book a free discovery call and let's figure it out together. No pressure, no pitch — just a real conversation about where you are and where you want to go.</p>
        <a href="/book" style={{ padding: "14px 32px", borderRadius: 50, border: "none", background: theme.primary, color: "white", fontSize: 15, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>Grab Your Free Call</a>
      </div>
    </section>
  );

  // ---- WORK / PORTFOLIO ----
  const WorkSection = () => (
    <section id="work" className="tm-section" style={{ background: theme.accentLight, padding: "80px 40px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 className="tm-section-title" style={{ fontSize: 38, fontWeight: 700, color: theme.primary, margin: "0 0 12px", letterSpacing: "-0.5px" }}>Things I've Built</h2>
          <p style={{ fontSize: 17, color: theme.textLight, margin: 0, lineHeight: 1.6 }}>I don't just talk about building things — I actually do it. Here's the proof.</p>
        </div>
        <div style={{ display: "grid", gap: 24 }}>
          {[
            { emoji: "🚀", title: "PlanMyPartyPal.com", vision: "Nobody should spend more time stressing about a party than enjoying it. I built an app that handles the logistics so you can focus on the fun.", build: "A full web application that manages guest lists, timelines, budgets, and vendor coordination. Built with AI tools, designed for real people.", cta: "Visit PlanMyPartyPal.com", link: "https://www.planmypartypal.com", result: null },
            { emoji: "💅", title: "Luxury Esthetician Booking System", vision: "A talented esthetician was drowning in scheduling DMs and missed appointments. She needed a digital front desk that matched her brand.", build: "A gorgeous, mobile-first booking site with automated scheduling, deposits, intake forms, and follow-up emails.", cta: "Let's Build Yours", link: "/book", result: "40% less admin time. More bookings. Happier clients. And she finally took a vacation." },
          ].map(project => (
            <div key={project.title} style={{ background: "white", borderRadius: 16, padding: "36px 32px", border: `1px solid ${theme.border}`, transition: "all 0.3s" }} onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.06)"} onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <span style={{ fontSize: 32 }}>{project.emoji}</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: theme.primary, margin: 0 }}>{project.title}</h3>
              </div>
              <div className="tm-work-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: theme.accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>The Vision</div>
                  <p style={{ fontSize: 15, color: theme.text, lineHeight: 1.7, margin: 0 }}>{project.vision}</p>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: theme.accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>The Build</div>
                  <p style={{ fontSize: 15, color: theme.text, lineHeight: 1.7, margin: 0 }}>{project.build}</p>
                </div>
              </div>
              {project.result && <p style={{ fontSize: 15, color: theme.accent, fontWeight: 600, margin: "0 0 24px", background: theme.accentLight, padding: "12px 16px", borderRadius: 10, lineHeight: 1.5 }}>📊 {project.result}</p>}
              <a href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 50, border: "none", background: theme.primary, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>{project.cta} <ArrowRight size={16} /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // ---- BLOG ----
  const BlogSection = () => (
    <section id="blog" className="tm-section" style={{ background: "white", padding: "80px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 className="tm-section-title" style={{ fontSize: 38, fontWeight: 700, color: theme.primary, margin: "0 0 12px", letterSpacing: "-0.5px" }}>The Blog</h2>
          <p style={{ fontSize: 17, color: theme.textLight, margin: 0, lineHeight: 1.6 }}>Real talk about money, mindset, manifestation, and building your thing online.</p>
        </div>
        {activePost ? (
          <div>
            <button onClick={() => setActivePost(null)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 0", background: "none", border: "none", color: theme.accent, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 24 }}><ArrowLeft size={16} /> Back to all posts</button>
            <article className="tm-blog-article" style={{ maxWidth: 720, margin: "0 auto" }}>
              <span style={{ display: "inline-block", background: activePost.tagColor + "18", color: activePost.tagColor, padding: "4px 14px", borderRadius: 50, fontSize: 12, fontWeight: 700, letterSpacing: "0.5px", marginBottom: 16 }}>{activePost.tag}</span>
              <h1 style={{ fontSize: 36, fontWeight: 700, color: theme.primary, margin: "0 0 12px", lineHeight: 1.25, letterSpacing: "-0.5px" }}>{activePost.title}</h1>
              <p style={{ fontSize: 14, color: theme.textLight, margin: "0 0 36px" }}>{activePost.date} · {activePost.readTime}</p>
              <div style={{ fontSize: 17, color: theme.text, lineHeight: 1.85, whiteSpace: "pre-line" }}>{activePost.content}</div>
              <div style={{ marginTop: 48, padding: "32px", background: theme.accentLight, borderRadius: 16, textAlign: "center" }}>
                <p style={{ fontSize: 18, fontWeight: 600, color: theme.primary, margin: "0 0 12px" }}>Ready to make moves?</p>
                <p style={{ fontSize: 15, color: theme.textLight, margin: "0 0 20px" }}>Let's hop on a free discovery call and figure out your next step together.</p>
                <a href="/book" style={{ padding: "12px 28px", borderRadius: 50, border: "none", background: theme.primary, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "none", display: "inline-block" }}>Book Free Call</a>
              </div>
            </article>
          </div>
        ) : (
          <div className="tm-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {blogPosts.map(post => (
              <div key={post.id} onClick={() => setActivePost(post)} style={{ background: theme.card, border: `1px solid ${hoveredCard === `post-${post.id}` ? theme.accent + "50" : theme.border}`, borderRadius: 16, padding: "28px 24px", cursor: "pointer", transition: "all 0.3s", transform: hoveredCard === `post-${post.id}` ? "translateY(-4px)" : "none", boxShadow: hoveredCard === `post-${post.id}` ? "0 8px 24px rgba(0,0,0,0.06)" : "none" }} onMouseEnter={() => setHoveredCard(`post-${post.id}`)} onMouseLeave={() => setHoveredCard(null)}>
                <span style={{ display: "inline-block", background: post.tagColor + "18", color: post.tagColor, padding: "3px 12px", borderRadius: 50, fontSize: 11, fontWeight: 700, letterSpacing: "0.5px", marginBottom: 14 }}>{post.tag}</span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: theme.primary, margin: "0 0 10px", lineHeight: 1.35 }}>{post.title}</h3>
                <p style={{ fontSize: 14, color: theme.textLight, lineHeight: 1.6, margin: "0 0 16px" }}>{post.preview}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: theme.textMuted }}>{post.date}</span>
                  <span style={{ fontSize: 13, color: theme.accent, fontWeight: 600 }}>Read more →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  // ---- CREATIVE ----
  const CreativeSection = () => {
    const linkBtnStyle = (color) => ({ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 50, border: `1px solid ${color}30`, background: color + "10", color: color, fontSize: 12, fontWeight: 600, textDecoration: "none", cursor: "pointer", transition: "all 0.2s" });
    return (
    <section id="creative" className="tm-section" style={{ background: theme.bg, padding: "80px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 className="tm-section-title" style={{ fontSize: 38, fontWeight: 700, color: theme.primary, margin: "0 0 12px", letterSpacing: "-0.5px" }}>The Fun Stuff</h2>
          <p style={{ fontSize: 17, color: theme.textLight, margin: 0, lineHeight: 1.6 }}>Because life isn't just about business (but these are pretty great for business too).</p>
        </div>

        <div className="tm-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 24 }}>
          {/* ZOEY ZEST */}
          <div style={{ background: "white", border: `1px solid ${hoveredCard === "zoey" ? theme.accent + "50" : theme.border}`, borderRadius: 16, padding: "32px 28px", transition: "all 0.3s", transform: hoveredCard === "zoey" ? "translateY(-4px)" : "none", boxShadow: hoveredCard === "zoey" ? `0 8px 24px ${theme.accent}15` : "none" }} onMouseEnter={() => setHoveredCard("zoey")} onMouseLeave={() => setHoveredCard(null)}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 40 }}>🎵</span>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: theme.primary, margin: 0 }}>Zoey Zest Music</h3>
                <a href="https://zoeyzest.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: theme.accent, fontWeight: 600, textDecoration: "none" }}>zoeyzest.com</a>
              </div>
            </div>
            <p style={{ fontSize: 15, color: theme.textLight, lineHeight: 1.7, margin: "0 0 20px" }}>My alter ego makes uplifting tracks about money magnetism, positive mindset, and stepping into your power. Think of it as a playlist for your next chapter. Pop it on while you work, manifest, or dance around your kitchen.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <a href="https://music.youtube.com/channel/UCoYhQcPR-7n4hls4vmBgT6w" target="_blank" rel="noopener noreferrer" style={linkBtnStyle("#FF0000")} onMouseEnter={e => { e.currentTarget.style.background = "#FF0000"; e.currentTarget.style.color = "white"; }} onMouseLeave={e => { e.currentTarget.style.background = "#FF000010"; e.currentTarget.style.color = "#FF0000"; }}>
                <ExternalLink size={12} /> YouTube Music
              </a>
              <a href="https://open.spotify.com/artist/2Fxxt8ODSUv5c6ot8S1IQt" target="_blank" rel="noopener noreferrer" style={linkBtnStyle("#1DB954")} onMouseEnter={e => { e.currentTarget.style.background = "#1DB954"; e.currentTarget.style.color = "white"; }} onMouseLeave={e => { e.currentTarget.style.background = "#1DB95410"; e.currentTarget.style.color = "#1DB954"; }}>
                <ExternalLink size={12} /> Spotify
              </a>
              <a href="https://music.apple.com/us/artist/zoey-zest/1837222176" target="_blank" rel="noopener noreferrer" style={linkBtnStyle("#FC3C44")} onMouseEnter={e => { e.currentTarget.style.background = "#FC3C44"; e.currentTarget.style.color = "white"; }} onMouseLeave={e => { e.currentTarget.style.background = "#FC3C4410"; e.currentTarget.style.color = "#FC3C44"; }}>
                <ExternalLink size={12} /> Apple Music
              </a>
              <a href="https://zoeyzest.com" target="_blank" rel="noopener noreferrer" style={linkBtnStyle(theme.accent)} onMouseEnter={e => { e.currentTarget.style.background = theme.accent; e.currentTarget.style.color = "white"; }} onMouseLeave={e => { e.currentTarget.style.background = theme.accent + "10"; e.currentTarget.style.color = theme.accent; }}>
                <Globe size={12} /> zoeyzest.com
              </a>
            </div>
          </div>

          {/* SNAIL MAIL CLUB */}
          <div style={{ background: "white", border: `1px solid ${hoveredCard === "snail" ? theme.warm + "50" : theme.border}`, borderRadius: 16, padding: "32px 28px", transition: "all 0.3s", transform: hoveredCard === "snail" ? "translateY(-4px)" : "none", boxShadow: hoveredCard === "snail" ? `0 8px 24px ${theme.warm}15` : "none" }} onMouseEnter={() => setHoveredCard("snail")} onMouseLeave={() => setHoveredCard(null)}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 40 }}>✉️</span>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: theme.primary, margin: 0 }}>Snail Mail Club</h3>
                <span style={{ fontSize: 13, color: theme.warm, fontWeight: 600 }}>$12/month · Delivered to your door</span>
              </div>
            </div>
            <p style={{ fontSize: 15, color: theme.textLight, lineHeight: 1.7, margin: "0 0 20px" }}>Remember when getting mail was exciting? This is that. A heartfelt monthly subscription bringing handwritten inspiration, affirmations, and little surprises straight to your mailbox. Because some things are better on paper.</p>
            <button onClick={async () => {
              try {
                const res = await fetch(`${API_BASE}/create-subscription`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ productName: "Snail Mail Club", priceAmount: 12 }),
                });
                const data = await res.json();
                if (data.url) window.location.href = data.url;
                else alert("Something went wrong. Please try again.");
              } catch (err) { console.error(err); alert("Connection error. Please try again."); }
            }} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 50, border: "none", background: theme.warm, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px " + theme.warm + "40"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <MailOpen size={16} /> Join the Club — $12/mo
            </button>
          </div>
        </div>

        <div className="tm-grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {/* 1000 NO'S BOOK */}
          <div style={{ background: "white", border: `1px solid ${hoveredCard === "book" ? "#8B7EC7" + "50" : theme.border}`, borderRadius: 16, padding: "32px 28px", transition: "all 0.3s", transform: hoveredCard === "book" ? "translateY(-4px)" : "none", boxShadow: hoveredCard === "book" ? "0 8px 24px rgba(139,126,199,0.12)" : "none" }} onMouseEnter={() => setHoveredCard("book")} onMouseLeave={() => setHoveredCard(null)}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 40 }}>📖</span>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: theme.primary, margin: 0 }}>1000 No's</h3>
                <span style={{ fontSize: 13, color: "#8B7EC7", fontWeight: 600 }}>My book · Available on Amazon</span>
              </div>
            </div>
            <p style={{ fontSize: 15, color: theme.textLight, lineHeight: 1.7, margin: "0 0 20px" }}>Every successful person has a collection of "no's" behind them. This book is about embracing rejection, building resilience, and turning every closed door into fuel for your next chapter. If you've ever been told "no" and let it stop you — this one's for you.</p>
            <a href="https://amzn.to/3MjSIbH" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 50, border: "none", background: "#8B7EC7", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "none", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(139,126,199,0.35)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <ExternalLink size={16} /> Get It on Amazon
            </a>
          </div>

          {/* WEBSITES & APPS */}
          <div style={{ background: "white", border: `1px solid ${hoveredCard === "webapps" ? "#5B8FA8" + "50" : theme.border}`, borderRadius: 16, padding: "32px 28px", transition: "all 0.3s", transform: hoveredCard === "webapps" ? "translateY(-4px)" : "none", boxShadow: hoveredCard === "webapps" ? "0 8px 24px rgba(91,143,168,0.12)" : "none" }} onMouseEnter={() => setHoveredCard("webapps")} onMouseLeave={() => setHoveredCard(null)}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 40 }}>💻</span>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: theme.primary, margin: 0 }}>Websites & Apps</h3>
                <span style={{ fontSize: 13, color: "#5B8FA8", fontWeight: 600 }}>Built with AI · Custom projects</span>
              </div>
            </div>
            <p style={{ fontSize: 15, color: theme.textLight, lineHeight: 1.7, margin: "0 0 20px" }}>I build beautiful, functional digital experiences using AI. Whether you need a personal brand site, a booking platform, or a full-scale app — I can make it happen faster and more affordably than you'd expect.</p>
            <a href="#work" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 50, border: "none", background: "#5B8FA8", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", textDecoration: "none", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(91,143,168,0.35)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <ArrowRight size={16} /> See My Work
            </a>
          </div>
        </div>
      </div>
    </section>
    );
  };

  // ---- FINAL CTA ----
  const FinalCTASection = () => (
    <section id="contact" className="tm-section tm-final-cta" style={{ background: `linear-gradient(135deg, ${theme.primary}, #2a2a2a)`, color: "white", padding: "80px 40px", textAlign: "center" }}>
      <div style={{ maxWidth: 660, margin: "0 auto" }}>
        <span style={{ fontSize: 40, display: "block", marginBottom: 20 }}>💛</span>
        <h2 style={{ fontSize: 38, fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.5px" }}>Your next chapter starts with one conversation.</h2>
        <p style={{ fontSize: 17, opacity: 0.9, margin: "0 0 16px", lineHeight: 1.7 }}>Book a free discovery call and let's figure out exactly what you need — whether that's mindset work, business coaching, a website, or just someone who believes in you (I already do).</p>
        <p style={{ fontSize: 15, opacity: 0.7, margin: "0 0 32px", lineHeight: 1.6 }}>No sales pitch. No pressure. Just two women having a real conversation about what's possible for you.</p>
        <a href="/book" style={{ padding: "16px 40px", borderRadius: 50, border: "none", background: "white", color: theme.primary, fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "all 0.3s", marginBottom: 20, textDecoration: "none", display: "inline-block" }} onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)"; }} onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>Book Your Free Discovery Call</a>
        <p style={{ fontSize: 15, opacity: 0.7, margin: 0 }}>Prefer email? Say hi at <a href="mailto:hello@tinamaria.com" style={{ color: "white", fontWeight: 600 }}>hello@tinamaria.com</a></p>
      </div>
    </section>
  );

  // ---- FOOTER ----
  const Footer = () => (
    <footer className="tm-footer" style={{ background: theme.bg, borderTop: `1px solid ${theme.border}`, padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 50, background: `linear-gradient(135deg, ${theme.accent}, ${theme.warm})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={12} color="white" /></div>
        <span style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>TinaMaria</span>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: theme.textLight }}>© 2026 Tina Maria · Life Coach · Hypnotherapist · Digital Innovator · Creator of Zoey Zest</p>
    </footer>
  );

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: "white", color: theme.text, overflowX: "hidden", minHeight: "100vh" }}>
      <NavBar />
      <HeroSection />
      <EmpathySection />
      <AboutSection />
      <ServicesSection />
      <CourseBanner />
      <DiscoveryBanner />
      <WorkSection />
      <BlogSection />
      <CreativeSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}

// ============================================================
// DASHBOARD VIEW
// ============================================================
function DashboardView({ appointments, transactions, clients, selectedDate }) {
  const todayAppts = appointments.filter(a => a.date === selectedDate);
  const todayRevenue = transactions.filter(t => t.date === selectedDate).reduce((s, t) => s + t.total, 0);
  const weekRevenue = transactions.reduce((s, t) => s + t.total, 0);
  const pendingAppts = todayAppts.filter(a => a.status === "pending").length;

  const stats = [
    { label: "Today's Revenue", value: formatCurrency(todayRevenue), change: "+15%", icon: DollarSign, color: theme.success, bg: theme.successLight },
    { label: "This Week", value: formatCurrency(weekRevenue), change: "+12%", icon: TrendingUp, color: theme.accent, bg: theme.accentLight },
    { label: "Today's Sessions", value: todayAppts.length, change: `${pendingAppts} pending`, icon: Calendar, color: theme.warm, bg: theme.warmLight },
    { label: "Total Clients", value: clients.length, change: "+3 this month", icon: Users, color: theme.warning, bg: theme.warningLight },
  ];

  const revenueByDay = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(2026, 1, 12);
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().split("T")[0];
    const dayRev = transactions.filter(t => t.date === ds).reduce((s, t) => s + t.total, 0);
    revenueByDay.push({ day: getDayName(ds), amount: dayRev || Math.floor(Math.random() * 400 + 150), date: ds });
  }
  const maxRev = Math.max(...revenueByDay.map(r => r.amount));

  return (
    <div>
      <div className="tm-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 28 }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} style={{ background: theme.card, borderRadius: 16, padding: "22px 24px", border: `1px solid ${theme.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={20} color={s.color} />
                </div>
                <span style={{ fontSize: 12, color: s.color, fontWeight: 600, background: s.bg, padding: "4px 10px", borderRadius: 20 }}>{s.change}</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 700 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: theme.textLight, marginTop: 4 }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="tm-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Revenue Chart */}
        <div style={{ background: theme.card, borderRadius: 16, padding: 24, border: `1px solid ${theme.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Revenue This Week</h3>
            <span style={{ fontSize: 22, fontWeight: 700, color: theme.accent }}>{formatCurrency(revenueByDay.reduce((s, r) => s + r.amount, 0))}</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160 }}>
            {revenueByDay.map((r, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: theme.textLight }}>{formatCurrency(r.amount)}</span>
                <div style={{ width: "100%", height: `${(r.amount / maxRev) * 120}px`, borderRadius: 8, background: r.date === selectedDate ? theme.accent : theme.accentLight, transition: "height 0.4s ease" }} />
                <span style={{ fontSize: 12, color: r.date === selectedDate ? theme.accent : theme.textLight, fontWeight: r.date === selectedDate ? 600 : 400 }}>{r.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div style={{ background: theme.card, borderRadius: 16, padding: 24, border: `1px solid ${theme.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Today's Schedule</h3>
            <span style={{ fontSize: 13, color: theme.textLight }}>{todayAppts.length} sessions</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 260, overflowY: "auto" }}>
            {todayAppts.length === 0 && <div style={{ padding: 24, textAlign: "center", color: theme.textLight }}>No sessions today</div>}
            {todayAppts.slice(0, 6).map((a) => (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 12, background: theme.bg, border: `1px solid ${theme.border}` }}>
                <div style={{ width: 4, height: 40, borderRadius: 2, background: a.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.client}</div>
                  <div style={{ fontSize: 12, color: theme.textLight }}>{a.service}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{a.time}</div>
                  <StatusBadge status={a.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Clients */}
        <div style={{ background: theme.card, borderRadius: 16, padding: 24, border: `1px solid ${theme.border}` }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 600 }}>Recent Clients</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {clients.slice(0, 5).map(c => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.accent}, ${theme.warm})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>{c.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: theme.textLight }}>{c.type} · Last: {formatDate(c.lastVisit)}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.accent }}>{formatCurrency(c.totalSpent)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Services */}
        <div style={{ background: theme.card, borderRadius: 16, padding: 24, border: `1px solid ${theme.border}` }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 600 }}>Popular Services</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SERVICES.filter(s => s.price > 0).slice(0, 5).map((s, i) => {
              const bookings = Math.floor(Math.random() * 15 + 3);
              return (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: theme.textLight, width: 20, textAlign: "center" }}>{i + 1}</span>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{s.name}</div>
                  </div>
                  <div style={{ fontSize: 13, color: theme.textLight }}>{bookings} bookings</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{formatCurrency(s.price)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CALENDAR VIEW
// ============================================================
function CalendarView({ appointments, selectedDate, setSelectedDate, onNewAppt }) {
  const [viewMode, setViewMode] = useState("day");
  const [calStatus, setCalStatus] = useState(null); // null | "checking" | {connected:true,...} | {error:...}
  const [syncing, setSyncing] = useState(false);
  const dayAppts = appointments.filter(a => a.date === selectedDate);
  const hours = Array.from({ length: 12 }, (_, i) => i + 8);

  // Check Google Calendar connection status on mount
  useEffect(() => {
    setCalStatus("checking");
    calendarAction("status").then(data => setCalStatus(data)).catch(() => setCalStatus({ error: "Not connected" }));
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const data = await calendarAction("list");
      if (data.events) {
        alert(`Synced! Found ${data.events.length} upcoming events on Google Calendar.`);
      }
    } catch (err) { console.error(err); }
    setSyncing(false);
  };

  const handleConnect = async () => {
    try {
      const data = await calendarAction("auth");
      if (data.authUrl) window.open(data.authUrl, "_blank");
    } catch (err) { alert("Error starting Google auth. Check your Google Cloud credentials."); }
  };

  const weekDates = [];
  const sd = new Date(selectedDate + "T00:00:00");
  const dayOfWeek = sd.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  for (let i = 0; i < 7; i++) {
    const d = new Date(sd);
    d.setDate(sd.getDate() + mondayOffset + i);
    weekDates.push(d.toISOString().split("T")[0]);
  }

  const navigateDate = (dir) => {
    const d = new Date(selectedDate + "T00:00:00");
    d.setDate(d.getDate() + (viewMode === "day" ? dir : dir * 7));
    setSelectedDate(d.toISOString().split("T")[0]);
  };

  return (
    <div>
      {/* Google Calendar Sync Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderRadius: 10, background: calStatus?.connected ? theme.accentLight : theme.warmLight, marginBottom: 16, border: `1px solid ${calStatus?.connected ? theme.accent + "30" : theme.warm + "30"}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Calendar size={16} color={calStatus?.connected ? theme.accent : theme.warm} />
          {calStatus === "checking" && <span style={{ fontSize: 13, color: theme.textLight }}>Checking Google Calendar...</span>}
          {calStatus?.connected && <span style={{ fontSize: 13, fontWeight: 600, color: theme.accent }}>Google Calendar synced · {calStatus.email || "hello@tinamaria.com"}</span>}
          {calStatus?.error && <span style={{ fontSize: 13, fontWeight: 600, color: theme.warm }}>Google Calendar not connected</span>}
          {!calStatus && <span style={{ fontSize: 13, color: theme.textLight }}>Google Calendar</span>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {calStatus?.connected ? (
            <button onClick={handleSync} disabled={syncing} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: "none", background: theme.accent, color: "white", fontSize: 12, fontWeight: 600, cursor: syncing ? "not-allowed" : "pointer" }}>
              <RefreshCw size={12} style={syncing ? { animation: "spin 1s linear infinite" } : {}} /> {syncing ? "Syncing..." : "Sync Now"}
            </button>
          ) : calStatus?.error ? (
            <button onClick={handleConnect} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: "none", background: theme.warm, color: "white", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              <Link2 size={12} /> Connect Calendar
            </button>
          ) : null}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => navigateDate(-1)} style={{ ...btnStyle, width: 36, height: 36, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronLeft size={18} /></button>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, minWidth: 200, textAlign: "center" }}>
            {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </h2>
          <button onClick={() => navigateDate(1)} style={{ ...btnStyle, width: 36, height: 36, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={18} /></button>
          <button onClick={() => setSelectedDate(new Date().toISOString().split("T")[0])} style={{ ...btnStyle, fontSize: 13 }}>Today</button>
        </div>
        <div style={{ display: "flex", gap: 4, background: theme.bg, borderRadius: 10, padding: 3, border: `1px solid ${theme.border}` }}>
          {["day", "week"].map(v => (
            <button key={v} onClick={() => setViewMode(v)} style={{ padding: "6px 16px", borderRadius: 8, border: "none", background: viewMode === v ? theme.card : "transparent", fontSize: 13, fontWeight: viewMode === v ? 600 : 400, cursor: "pointer", boxShadow: viewMode === v ? "0 1px 3px rgba(0,0,0,0.08)" : "none", textTransform: "capitalize", color: theme.text }}>{v}</button>
          ))}
        </div>
      </div>

      {viewMode === "day" && (
        <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
          <div style={{ maxHeight: "calc(100vh - 240px)", overflowY: "auto" }}>
            {hours.map(h => {
              const hourStr = h > 12 ? `${h - 12}:00 PM` : h === 12 ? "12:00 PM" : `${h}:00 AM`;
              const hourAppts = dayAppts.filter(a => {
                const aHour = parseInt(a.time);
                const isPM = a.time.includes("PM");
                const a24 = isPM && aHour !== 12 ? aHour + 12 : (!isPM && aHour === 12 ? 0 : aHour);
                return a24 === h;
              });
              return (
                <div key={h} style={{ display: "flex", minHeight: 72, borderBottom: `1px solid ${theme.border}` }}>
                  <div style={{ width: 90, padding: "12px 16px", fontSize: 13, color: theme.textLight, borderRight: `1px solid ${theme.border}`, flexShrink: 0 }}>{hourStr}</div>
                  <div style={{ flex: 1, padding: "8px 16px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {hourAppts.map(a => (
                      <div key={a.id} style={{ padding: "8px 14px", borderRadius: 10, background: a.color + "20", borderLeft: `4px solid ${a.color}`, fontSize: 13, cursor: "pointer" }}>
                        <div style={{ fontWeight: 600 }}>{a.client}</div>
                        <div style={{ color: theme.textLight, fontSize: 12 }}>{a.service} · {a.time} · {a.duration} min</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === "week" && (
        <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: `1px solid ${theme.border}` }}>
            {weekDates.map(wd => {
              const d = new Date(wd + "T00:00:00");
              const isToday = wd === "2026-02-12";
              const isSelected = wd === selectedDate;
              return (
                <div key={wd} onClick={() => { setSelectedDate(wd); setViewMode("day"); }} style={{ padding: "14px 12px", textAlign: "center", borderRight: `1px solid ${theme.border}`, cursor: "pointer", background: isSelected ? theme.accentLight : "transparent" }}>
                  <div style={{ fontSize: 12, color: theme.textLight, marginBottom: 4 }}>{d.toLocaleDateString("en-US", { weekday: "short" })}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: isToday ? theme.accent : theme.text, width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", background: isToday ? theme.accentLight : "transparent" }}>{d.getDate()}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
            {weekDates.map(wd => {
              const dayA = appointments.filter(a => a.date === wd);
              return (
                <div key={wd} style={{ borderRight: `1px solid ${theme.border}`, padding: 8, minHeight: 300 }}>
                  {dayA.map(a => (
                    <div key={a.id} style={{ padding: "6px 8px", borderRadius: 8, background: a.color + "20", borderLeft: `3px solid ${a.color}`, fontSize: 11, marginBottom: 6, cursor: "pointer" }}>
                      <div style={{ fontWeight: 600 }}>{a.time}</div>
                      <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.client}</div>
                      <div style={{ color: theme.textLight, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.service}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// CLIENTS VIEW
// ============================================================
function ClientsView({ clients, setClients, onViewClient }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = clients.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    if (filter === "coaching") return matchSearch && c.type.includes("Coaching") || c.type === "Life Coaching";
    if (filter === "hypnotherapy") return matchSearch && c.type === "Hypnotherapy";
    if (filter === "business") return matchSearch && (c.type === "Business Coaching" || c.type === "Digital Solutions");
    if (filter === "new") return matchSearch && c.tags.includes("New");
    return matchSearch;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: theme.textLight }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..." style={{ padding: "10px 14px 10px 36px", borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 14, width: 280, outline: "none", background: theme.card }} />
          </div>
          <div style={{ display: "flex", gap: 4, background: theme.bg, borderRadius: 10, padding: 3, border: `1px solid ${theme.border}` }}>
            {[{k:"all",l:"All"},{k:"coaching",l:"Coaching"},{k:"hypnotherapy",l:"Hypnotherapy"},{k:"business",l:"Business"},{k:"new",l:"New"}].map(f => (
              <button key={f.k} onClick={() => setFilter(f.k)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: filter === f.k ? theme.card : "transparent", fontSize: 12, fontWeight: filter === f.k ? 600 : 400, cursor: "pointer", boxShadow: filter === f.k ? "0 1px 3px rgba(0,0,0,0.08)" : "none", color: theme.text }}>{f.l}</button>
            ))}
          </div>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, border: "none", background: theme.primary, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={16} /> Add Client
        </button>
      </div>

      <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${theme.border}` }}>
              {["Client", "Type", "Contact", "Visits", "Total Spent", "Last Visit", "Tags", ""].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: theme.textLight, textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} onClick={() => onViewClient(c.id)} style={{ borderBottom: `1px solid ${theme.border}`, cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = theme.bg} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.accent}, ${theme.warm})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 600 }}>{c.avatar}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: theme.textLight }}>Since {formatDate(c.joined)}</div>
                    </div>
                    {c.favorite && <Star size={14} color={theme.warning} fill={theme.warning} />}
                  </div>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: theme.textLight }}>{c.type}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 13 }}>{c.email}</div>
                  <div style={{ fontSize: 12, color: theme.textLight }}>{c.phone}</div>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600 }}>{c.visits}</td>
                <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, color: theme.accent }}>{formatCurrency(c.totalSpent)}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: theme.textLight }}>{formatDate(c.lastVisit)}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {c.tags.map(t => (
                      <span key={t} style={{ padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: t === "VIP" ? theme.warningLight : t === "New" ? theme.successLight : t === "Lead" ? theme.warmLight : theme.accentLight, color: t === "VIP" ? theme.warning : t === "New" ? theme.success : t === "Lead" ? theme.warm : theme.accent }}>{t}</span>
                    ))}
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}><ChevronRight size={16} color={theme.textLight} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// PAYMENTS VIEW
// ============================================================
function PaymentsView({ transactions }) {
  const totalRevenue = transactions.reduce((s, t) => s + t.amount, 0);
  const totalTips = transactions.reduce((s, t) => s + t.tip, 0);
  const avgTransaction = transactions.filter(t => t.amount > 0).length > 0 ? Math.round(totalRevenue / transactions.filter(t => t.amount > 0).length) : 0;
  const byMethod = {};
  transactions.filter(t => t.total > 0).forEach(t => { byMethod[t.method] = (byMethod[t.method] || 0) + t.total; });

  return (
    <div>
      <div className="tm-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 28 }}>
        {[
          { label: "Total Revenue", value: formatCurrency(totalRevenue), icon: DollarSign, color: theme.success, bg: theme.successLight },
          { label: "Tips / Bonuses", value: formatCurrency(totalTips), icon: Heart, color: theme.accent, bg: theme.accentLight },
          { label: "Avg Session Value", value: formatCurrency(avgTransaction), icon: TrendingUp, color: theme.warm, bg: theme.warmLight },
          { label: "Transactions", value: transactions.filter(t => t.total > 0).length, icon: CheckCircle, color: theme.warning, bg: theme.warningLight },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} style={{ background: theme.card, borderRadius: 16, padding: "22px 24px", border: `1px solid ${theme.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={20} color={s.color} />
                </div>
                <span style={{ fontSize: 13, color: theme.textLight }}>{s.label}</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 700 }}>{s.value}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${theme.border}` }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Transaction History</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${theme.border}` }}>
                {["Date", "Client", "Service", "Amount", "Tip", "Total", "Method"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: theme.textLight, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                  <td style={{ padding: "12px 16px", fontSize: 13 }}>{formatDate(t.date)}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600 }}>{t.client}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: theme.textLight }}>{t.service}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13 }}>{formatCurrency(t.amount)}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: theme.success }}>{t.tip > 0 ? `+${formatCurrency(t.tip)}` : "—"}</td>
                  <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 700 }}>{formatCurrency(t.total)}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: theme.bg, border: `1px solid ${theme.border}` }}>{t.method}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: theme.card, borderRadius: 16, padding: 24, border: `1px solid ${theme.border}` }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 600 }}>Payment Methods</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {Object.entries(byMethod).map(([method, amount], i) => {
              const totalAll = Object.values(byMethod).reduce((s, v) => s + v, 0);
              const pct = Math.round((amount / totalAll) * 100);
              const colors = [theme.accent, theme.warm, theme.success, theme.warning];
              return (
                <div key={method}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{method}</span>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{formatCurrency(amount)} ({pct}%)</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: theme.bg }}>
                    <div style={{ height: "100%", width: `${pct}%`, borderRadius: 4, background: colors[i % colors.length], transition: "width 0.5s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 32 }}>
            <h4 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 600, color: theme.textLight }}>Quick Actions</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Send Invoice", "Issue Refund", "Export Report"].map(action => (
                <button key={action} style={{ ...btnStyle, width: "100%", justifyContent: "space-between", display: "flex", alignItems: "center" }}>
                  {action} <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MARKETING VIEW
// ============================================================
function MarketingView({ campaigns, clients }) {
  const [activeSubTab, setActiveSubTab] = useState("campaigns");
  const [showComposer, setShowComposer] = useState(false);
  const [composerTo, setComposerTo] = useState("");
  const [composerSubject, setComposerSubject] = useState("");
  const [composerBody, setComposerBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);

  const handleSendEmail = async () => {
    if (!composerTo || !composerSubject || !composerBody) { alert("Please fill in all fields."); return; }
    setSending(true);
    setSendResult(null);
    try {
      const recipients = composerTo.split(",").map(e => e.trim()).filter(Boolean);
      const htmlBody = composerBody.split("\n").map(p => `<p style="margin:0 0 12px;line-height:1.7;font-family:sans-serif;font-size:16px;color:#333">${p}</p>`).join("");
      const html = `<div style="max-width:600px;margin:0 auto;padding:32px"><div style="text-align:center;margin-bottom:24px"><strong style="font-size:20px;color:#1D1D1D">Tina Maria</strong></div>${htmlBody}<div style="margin-top:32px;padding-top:20px;border-top:1px solid #eee;text-align:center;font-size:12px;color:#999">Sent with love from TinaMaria.com</div></div>`;
      const data = await sendEmailCampaign(recipients, composerSubject, html);
      if (data.success) {
        setSendResult("sent");
        setTimeout(() => { setShowComposer(false); setSendResult(null); setComposerTo(""); setComposerSubject(""); setComposerBody(""); }, 2000);
      } else {
        setSendResult("error");
      }
    } catch (err) { console.error(err); setSendResult("error"); }
    setSending(false);
  };

  return (
    <div>
      {/* Email Composer Modal */}
      {showComposer && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} onClick={() => setShowComposer(false)} />
          <div style={{ position: "relative", width: 600, background: "white", borderRadius: 16, padding: 32, boxShadow: "0 16px 48px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Compose Email via Resend</h3>
              <button onClick={() => setShowComposer(false)} style={{ background: "none", border: "none", cursor: "pointer", color: theme.textLight }}><X size={20} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: theme.text, display: "block", marginBottom: 4 }}>To (comma-separated emails)</label>
                <input value={composerTo} onChange={e => setComposerTo(e.target.value)} placeholder="client1@email.com, client2@email.com" style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${theme.border}`, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                <button onClick={() => setComposerTo(clients.map(c => c.email).join(", "))} style={{ marginTop: 4, background: "none", border: "none", color: theme.accent, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>+ Add all clients ({clients.length})</button>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: theme.text, display: "block", marginBottom: 4 }}>Subject</label>
                <input value={composerSubject} onChange={e => setComposerSubject(e.target.value)} placeholder="Your subject line..." style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${theme.border}`, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: theme.text, display: "block", marginBottom: 4 }}>Message</label>
                <textarea value={composerBody} onChange={e => setComposerBody(e.target.value)} placeholder="Write your email content..." rows={8} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${theme.border}`, fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
              </div>
              {sendResult === "sent" && <div style={{ padding: "10px 14px", borderRadius: 8, background: theme.successLight, color: theme.success, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}><CheckCircle size={16} /> Email sent successfully!</div>}
              {sendResult === "error" && <div style={{ padding: "10px 14px", borderRadius: 8, background: theme.dangerLight, color: theme.danger, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}><XCircle size={16} /> Failed to send. Check your Resend API key.</div>}
              <button onClick={handleSendEmail} disabled={sending} style={{ padding: "12px", borderRadius: 10, border: "none", background: sending ? theme.textMuted : theme.accent, color: "white", fontSize: 15, fontWeight: 700, cursor: sending ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {sending ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending...</> : <><Send size={16} /> Send via Resend</>}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 4, background: theme.bg, borderRadius: 10, padding: 3, border: `1px solid ${theme.border}`, marginBottom: 24, width: "fit-content" }}>
        {[{k:"campaigns",l:"Campaigns"},{k:"compose",l:"✉️ Compose"},{k:"templates",l:"Templates"},{k:"analytics",l:"Analytics"}].map(t => (
          <button key={t.k} onClick={() => t.k === "compose" ? setShowComposer(true) : setActiveSubTab(t.k)} style={{ padding: "8px 20px", borderRadius: 8, border: "none", background: activeSubTab === t.k ? theme.card : "transparent", fontSize: 13, fontWeight: activeSubTab === t.k ? 600 : 400, cursor: "pointer", boxShadow: activeSubTab === t.k ? "0 1px 3px rgba(0,0,0,0.08)" : "none", color: t.k === "compose" ? theme.accent : theme.text }}>{t.l}</button>
        ))}
      </div>

      {/* Resend connection status */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "8px 14px", borderRadius: 8, background: theme.accentLight, width: "fit-content" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: theme.accent }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: theme.accent }}>Resend Connected</span>
        <span style={{ fontSize: 12, color: theme.textLight }}>· hello@tinamaria.com</span>
      </div>

      {activeSubTab === "campaigns" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Your Campaigns</h3>
            <button onClick={() => setShowComposer(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, border: "none", background: theme.primary, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              <Plus size={16} /> New Campaign
            </button>
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            {campaigns.map(c => (
              <div key={c.id} style={{ background: theme.card, borderRadius: 16, padding: "20px 24px", border: `1px solid ${theme.border}`, display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: c.type === "Email" ? theme.accentLight : theme.warmLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {c.type === "Email" ? <Mail size={22} color={theme.accent} /> : <MessageSquare size={22} color={theme.warm} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{c.name}</span>
                    <CampaignStatusBadge status={c.status} />
                  </div>
                  <div style={{ fontSize: 13, color: theme.textLight }}>{c.subject}</div>
                </div>
                {c.status === "sent" && (
                  <div style={{ display: "flex", gap: 24 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{c.audience}</div>
                      <div style={{ fontSize: 11, color: theme.textLight }}>Sent</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: theme.accent }}>{Math.round(c.opens / c.audience * 100)}%</div>
                      <div style={{ fontSize: 11, color: theme.textLight }}>Opens</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: theme.warm }}>{Math.round(c.clicks / c.audience * 100)}%</div>
                      <div style={{ fontSize: 11, color: theme.textLight }}>Clicks</div>
                    </div>
                  </div>
                )}
                <div style={{ display: "flex", gap: 6 }}>
                  {c.status === "draft" && <button onClick={() => { setComposerSubject(c.subject); setShowComposer(true); }} style={{ ...btnStyle, padding: "8px 14px", background: theme.accent, color: "white", border: "none" }}><Send size={14} /> Send</button>}
                  <button style={{ ...btnStyle, padding: "8px 16px" }}>
                    {c.status === "draft" ? "Edit" : c.status === "scheduled" ? "View" : "Details"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === "templates" && (
        <div>
          <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 600 }}>Campaign Templates</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { name: "Welcome to Your Journey", desc: "Greet new clients with a warm welcome and a free discovery call offer", icon: Heart, color: theme.accent },
              { name: "Session Reminder", desc: "Reduce no-shows with automated reminders 24 hours before sessions", icon: Clock, color: theme.warm },
              { name: "We Miss You", desc: "Win back clients who haven't booked in 60+ days", icon: Users, color: theme.success },
              { name: "Mindset Monday", desc: "Weekly mindset tips and affirmations to keep clients engaged", icon: Brain, color: theme.warning },
              { name: "Zoey Zest New Release", desc: "Announce new music tracks and connect with your creative audience", icon: Music, color: theme.accent },
              { name: "Snail Mail Club Invite", desc: "Promote the snail mail subscription to your email list", icon: MailOpen, color: theme.warm },
            ].map((t, i) => {
              const Icon = t.icon;
              return (
                <div key={i} style={{ background: theme.card, borderRadius: 16, padding: 24, border: `1px solid ${theme.border}`, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"} onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: t.color + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Icon size={24} color={t.color} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: theme.textLight, lineHeight: 1.5 }}>{t.desc}</div>
                  <button style={{ ...btnStyle, marginTop: 16, fontSize: 13, width: "100%", justifyContent: "center", display: "flex", background: t.color + "12", color: t.color, border: `1px solid ${t.color}30` }}>Use Template</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeSubTab === "analytics" && (
        <div>
          <h3 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 600 }}>Marketing Analytics</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 24 }}>
            {[
              { label: "Total Campaigns", value: campaigns.length, color: theme.accent },
              { label: "Avg Open Rate", value: "68%", color: theme.success },
              { label: "Avg Click Rate", value: "28%", color: theme.warm },
            ].map((s, i) => (
              <div key={i} style={{ background: theme.card, borderRadius: 16, padding: "22px 24px", border: `1px solid ${theme.border}`, textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: theme.textLight }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: theme.card, borderRadius: 16, padding: 24, border: `1px solid ${theme.border}` }}>
            <h4 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>Campaign Performance Over Time</h4>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 200 }}>
              {["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"].map((m, i) => {
                const openRate = [55, 60, 65, 62, 70, 68][i];
                const clickRate = [20, 24, 28, 25, 30, 28][i];
                return (
                  <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 160 }}>
                      <div style={{ width: 20, height: `${openRate * 2.2}px`, borderRadius: "6px 6px 0 0", background: theme.accentLight }} />
                      <div style={{ width: 20, height: `${clickRate * 2.2}px`, borderRadius: "6px 6px 0 0", background: theme.warmLight }} />
                    </div>
                    <span style={{ fontSize: 12, color: theme.textLight }}>{m}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: theme.accentLight }} /> Open Rate
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: theme.warmLight }} /> Click Rate
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SERVICES VIEW
// ============================================================
function ServicesView() {
  const categories = [...new Set(SERVICES.map(s => s.category))];
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = activeCategory === "all" ? SERVICES : SERVICES.filter(s => s.category === activeCategory);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 4, background: theme.bg, borderRadius: 10, padding: 3, border: `1px solid ${theme.border}`, flexWrap: "wrap" }}>
          <button onClick={() => setActiveCategory("all")} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: activeCategory === "all" ? theme.card : "transparent", fontSize: 12, fontWeight: activeCategory === "all" ? 600 : 400, cursor: "pointer", boxShadow: activeCategory === "all" ? "0 1px 3px rgba(0,0,0,0.08)" : "none", color: theme.text }}>All</button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: activeCategory === cat ? theme.card : "transparent", fontSize: 12, fontWeight: activeCategory === cat ? 600 : 400, cursor: "pointer", boxShadow: activeCategory === cat ? "0 1px 3px rgba(0,0,0,0.08)" : "none", color: theme.text }}>{cat}</button>
          ))}
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, border: "none", background: theme.primary, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {filtered.map(s => (
          <div key={s.id} style={{ background: theme.card, borderRadius: 16, padding: "20px 24px", border: `1px solid ${theme.border}`, borderTop: `4px solid ${s.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{s.name}</div>
                <span style={{ fontSize: 12, color: theme.textLight, background: theme.bg, padding: "2px 10px", borderRadius: 20 }}>{s.category}</span>
              </div>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: theme.textLight }}><MoreVertical size={18} /></button>
            </div>
            <p style={{ fontSize: 13, color: theme.textLight, lineHeight: 1.5, margin: "12px 0 16px" }}>{s.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: theme.textLight }}>
                <Clock size={14} /> {s.duration} min
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: theme.accent }}>{s.price === 0 ? "Free" : formatCurrency(s.price)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SETTINGS VIEW
// ============================================================
function SettingsView() {
  const [activeSection, setActiveSection] = useState("business");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24 }}>
      <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, padding: 12, alignSelf: "flex-start" }}>
        {[{k:"business",l:"Business Info"},{k:"schedule",l:"Working Hours"},{k:"booking",l:"Booking Settings"},{k:"notifications",l:"Notifications"},{k:"billing",l:"Billing & Plan"}].map(s => (
          <button key={s.k} onClick={() => setActiveSection(s.k)} style={{ display: "block", width: "100%", padding: "10px 14px", borderRadius: 10, border: "none", background: activeSection === s.k ? theme.accentLight : "transparent", color: activeSection === s.k ? theme.accent : theme.text, fontSize: 14, fontWeight: activeSection === s.k ? 600 : 400, cursor: "pointer", textAlign: "left", marginBottom: 2 }}>{s.l}</button>
        ))}
      </div>
      <div style={{ background: theme.card, borderRadius: 16, border: `1px solid ${theme.border}`, padding: 32 }}>
        {activeSection === "business" && (
          <div>
            <h3 style={{ margin: "0 0 24px", fontSize: 18, fontWeight: 600 }}>Business Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[{l:"Business Name",v:"Tina Maria Coaching"},{l:"Owner",v:"Tina Maria"},{l:"Email",v:"hello@tinamaria.com"},{l:"Phone",v:"(555) 123-4567"},{l:"Website",v:"www.tinamaria.com"},{l:"Instagram",v:"@tinamaria"},{l:"Specialties",v:"Life Coaching, Hypnotherapy, Digital Solutions"},{l:"Zoey Zest",v:"@zoeyzest"},{l:"Google Review Link",v:"https://g.page/r/tinamaria-reviews"}].map((f, i) => (
                <div key={i}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: theme.textLight, marginBottom: 6 }}>{f.l}</label>
                  <input defaultValue={f.v} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
            </div>
            <button style={{ marginTop: 24, padding: "12px 32px", borderRadius: 10, border: "none", background: theme.primary, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Save Changes</button>
          </div>
        )}
        {activeSection === "schedule" && (
          <div>
            <h3 style={{ margin: "0 0 24px", fontSize: 18, fontWeight: 600 }}>Working Hours</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((day, i) => (
                <div key={day} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", borderRadius: 12, background: theme.bg }}>
                  <span style={{ width: 100, fontSize: 14, fontWeight: 500 }}>{day}</span>
                  {i < 5 ? (
                    <>
                      <select defaultValue="9:00 AM" style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${theme.border}`, fontSize: 13 }}>
                        {["8:00 AM","9:00 AM","10:00 AM"].map(t => <option key={t}>{t}</option>)}
                      </select>
                      <span style={{ color: theme.textLight }}>to</span>
                      <select defaultValue="5:00 PM" style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${theme.border}`, fontSize: 13 }}>
                        {["4:00 PM","5:00 PM","6:00 PM","7:00 PM"].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </>
                  ) : i === 5 ? (
                    <>
                      <select defaultValue="10:00 AM" style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${theme.border}`, fontSize: 13 }}>
                        {["9:00 AM","10:00 AM","11:00 AM"].map(t => <option key={t}>{t}</option>)}
                      </select>
                      <span style={{ color: theme.textLight }}>to</span>
                      <select defaultValue="2:00 PM" style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${theme.border}`, fontSize: 13 }}>
                        {["1:00 PM","2:00 PM","3:00 PM"].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </>
                  ) : (
                    <span style={{ fontSize: 13, color: theme.textLight, fontStyle: "italic" }}>Closed</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeSection === "booking" && (
          <div>
            <h3 style={{ margin: "0 0 24px", fontSize: 18, fontWeight: 600 }}>Booking Settings</h3>
            {[
              { label: "Allow online booking", desc: "Clients can book through your website", default: true },
              { label: "Require deposit", desc: "Charge a deposit when booking premium sessions", default: false },
              { label: "Auto-confirm bookings", desc: "Automatically confirm new session requests", default: true },
              { label: "Send reminders", desc: "Automatic session reminders 24h before", default: true },
              { label: "Allow cancellations", desc: "Clients can cancel up to 24 hours before", default: true },
              { label: "Discovery calls auto-approve", desc: "Auto-approve free discovery call bookings", default: true },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: i < 5 ? `1px solid ${theme.border}` : "none" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: theme.textLight }}>{s.desc}</div>
                </div>
                <ToggleSwitch defaultOn={s.default} />
              </div>
            ))}
          </div>
        )}
        {activeSection === "notifications" && (
          <div>
            <h3 style={{ margin: "0 0 24px", fontSize: 18, fontWeight: 600 }}>Notification Preferences</h3>
            {[
              { label: "New booking alerts", desc: "Get notified when someone books a session", default: true },
              { label: "Cancellation alerts", desc: "Get notified of cancellations", default: true },
              { label: "Payment received", desc: "Notification when payment is processed", default: true },
              { label: "Discovery call requests", desc: "Immediate alert for new discovery calls", default: true },
              { label: "Daily summary", desc: "Receive a daily business summary email", default: false },
              { label: "Marketing reports", desc: "Weekly campaign performance reports", default: true },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: i < 5 ? `1px solid ${theme.border}` : "none" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: theme.textLight }}>{s.desc}</div>
                </div>
                <ToggleSwitch defaultOn={s.default} />
              </div>
            ))}
          </div>
        )}
        {activeSection === "billing" && (
          <div>
            <h3 style={{ margin: "0 0 24px", fontSize: 18, fontWeight: 600 }}>Billing & Plan</h3>
            <div style={{ background: `linear-gradient(135deg, ${theme.accent}15, ${theme.warm}15)`, borderRadius: 16, padding: 24, border: `1px solid ${theme.accent}30`, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: theme.accent, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>Current Plan</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>Professional Plan</div>
                  <div style={{ fontSize: 14, color: theme.textLight, marginTop: 4 }}>$59/month · Renews Mar 12, 2026</div>
                </div>
                <button style={{ padding: "10px 24px", borderRadius: 10, border: `2px solid ${theme.accent}`, background: "transparent", color: theme.accent, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Manage Plan</button>
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Plan Features</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {["Unlimited bookings", "Client management", "Payment processing", "Email & SMS campaigns", "Custom booking website", "Session notes & files", "Discovery call scheduler", "Analytics dashboard", "Priority support", "Marketing templates"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                  <CheckCircle size={16} color={theme.success} /> {f}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MODALS
// ============================================================
function NewAppointmentModal({ onClose, clients }) {
  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("2026-02-14");
  const [selectedTime, setSelectedTime] = useState(null);
  const times = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div style={{ width: 520, maxHeight: "85vh", background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>New Session</h2>
            <div style={{ fontSize: 13, color: theme.textLight, marginTop: 2 }}>Step {step} of 3</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: theme.textLight }}><X size={20} /></button>
        </div>
        <div style={{ display: "flex", gap: 4, padding: "0 24px", paddingTop: 16 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? theme.accent : theme.border, transition: "background 0.3s" }} />
          ))}
        </div>
        <div style={{ padding: 24, maxHeight: "60vh", overflowY: "auto" }}>
          {step === 1 && (
            <div>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>Select Client</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {clients.map(c => (
                  <div key={c.id} onClick={() => setSelectedClient(c.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, border: `2px solid ${selectedClient === c.id ? theme.accent : theme.border}`, cursor: "pointer", background: selectedClient === c.id ? theme.accentLight : "white", transition: "all 0.2s" }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.accent}, ${theme.warm})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 600 }}>{c.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: theme.textLight }}>{c.type}</div>
                    </div>
                    {selectedClient === c.id && <Check size={20} color={theme.accent} />}
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>Select Service</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {SERVICES.map(s => (
                  <div key={s.id} onClick={() => setSelectedService(s.id)} style={{ padding: "14px 16px", borderRadius: 12, border: `2px solid ${selectedService === s.id ? theme.accent : theme.border}`, cursor: "pointer", background: selectedService === s.id ? theme.accentLight : "white", transition: "all 0.2s" }}>
                    <div style={{ fontSize: 20, marginBottom: 6 }}>{s.emoji}</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                      <span style={{ fontSize: 12, color: theme.textLight }}>{s.duration} min</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: theme.accent }}>{s.price === 0 ? "Free" : formatCurrency(s.price)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600 }}>Select Date & Time</h3>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: theme.textLight, marginBottom: 6 }}>Date</label>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{ padding: "10px 14px", borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 14, width: "100%", boxSizing: "border-box" }} />
              </div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: theme.textLight, marginBottom: 6 }}>Time</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {times.map(t => (
                  <button key={t} onClick={() => setSelectedTime(t)} style={{ padding: "10px", borderRadius: 10, border: `2px solid ${selectedTime === t ? theme.accent : theme.border}`, background: selectedTime === t ? theme.accentLight : "white", fontSize: 13, fontWeight: selectedTime === t ? 600 : 400, cursor: "pointer", color: theme.text }}>{t}</button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between" }}>
          {step > 1 ? <button onClick={() => setStep(step - 1)} style={{ ...btnStyle }}>Back</button> : <div />}
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} disabled={(step === 1 && !selectedClient) || (step === 2 && !selectedService)} style={{ padding: "10px 28px", borderRadius: 10, border: "none", background: theme.primary, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", opacity: (step === 1 && !selectedClient) || (step === 2 && !selectedService) ? 0.5 : 1 }}>Continue</button>
          ) : (
            <button onClick={onClose} disabled={!selectedTime} style={{ padding: "10px 28px", borderRadius: 10, border: "none", background: theme.primary, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", opacity: !selectedTime ? 0.5 : 1 }}>Book Session</button>
          )}
        </div>
      </div>
    </div>
  );
}

function ClientDetailModal({ client, onClose, appointments, transactions }) {
  if (!client) return null;
  const clientAppts = appointments.filter(a => a.clientId === client.id).slice(0, 8);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "flex-end", zIndex: 1000, backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div style={{ width: 480, height: "100%", background: "white", boxShadow: "-8px 0 32px rgba(0,0,0,0.15)", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "24px", borderBottom: `1px solid ${theme.border}`, position: "sticky", top: 0, background: "white", zIndex: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.accent}, ${theme.warm})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 20, fontWeight: 700 }}>{client.avatar}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{client.name}</h2>
                  {client.favorite && <Star size={16} color={theme.warning} fill={theme.warning} />}
                </div>
                <div style={{ fontSize: 13, color: theme.textLight, marginTop: 2 }}>{client.type} · Since {formatDate(client.joined)}</div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: theme.textLight }}><X size={20} /></button>
          </div>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Visits", value: client.visits },
              { label: "Total Spent", value: formatCurrency(client.totalSpent) },
              { label: "Avg Spend", value: client.visits > 0 ? formatCurrency(Math.round(client.totalSpent / client.visits)) : "$0" },
            ].map((s, i) => (
              <div key={i} style={{ background: theme.bg, borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: theme.accent }}>{s.value}</div>
                <div style={{ fontSize: 12, color: theme.textLight, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: theme.textLight, textTransform: "uppercase", letterSpacing: "0.5px" }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}><Mail size={16} color={theme.textLight} /> {client.email}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}><Phone size={16} color={theme.textLight} /> {client.phone}</div>
            </div>
          </div>

          {client.tags.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: theme.textLight, textTransform: "uppercase", letterSpacing: "0.5px" }}>Tags</h4>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {client.tags.map(t => (
                  <span key={t} style={{ padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: t === "VIP" ? theme.warningLight : t === "New" ? theme.successLight : t === "Lead" ? theme.warmLight : theme.accentLight, color: t === "VIP" ? theme.warning : t === "New" ? theme.success : t === "Lead" ? theme.warm : theme.accent }}>{t}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: theme.textLight, textTransform: "uppercase", letterSpacing: "0.5px" }}>Notes</h4>
            <div style={{ background: theme.bg, borderRadius: 12, padding: 16, fontSize: 14, lineHeight: 1.6, color: theme.text }}>{client.notes}</div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600, color: theme.textLight, textTransform: "uppercase", letterSpacing: "0.5px" }}>Sessions</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {clientAppts.length === 0 && <div style={{ fontSize: 13, color: theme.textLight }}>No sessions found</div>}
              {clientAppts.map(a => (
                <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: theme.bg }}>
                  <div style={{ width: 4, height: 32, borderRadius: 2, background: a.color }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{a.service}</div>
                    <div style={{ fontSize: 12, color: theme.textLight }}>{formatDate(a.date)} · {a.time}</div>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button style={{ ...btnStyle, justifyContent: "center", display: "flex", gap: 6, alignItems: "center", padding: "12px", background: theme.accentLight, color: theme.accent, border: `1px solid ${theme.accent}30` }}>
              <Calendar size={16} /> Book Session
            </button>
            <button style={{ ...btnStyle, justifyContent: "center", display: "flex", gap: 6, alignItems: "center", padding: "12px", background: theme.warmLight, color: theme.warm, border: `1px solid ${theme.warm}30` }}>
              <Send size={16} /> Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SHARED COMPONENTS
// ============================================================
function StatusBadge({ status }) {
  const styles = {
    confirmed: { bg: theme.successLight, color: theme.success },
    pending: { bg: theme.warningLight, color: theme.warning },
    completed: { bg: theme.accentLight, color: theme.accent },
    cancelled: { bg: theme.dangerLight, color: theme.danger },
  };
  const s = styles[status] || styles.pending;
  return <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color, textTransform: "capitalize" }}>{status}</span>;
}

function CampaignStatusBadge({ status }) {
  const styles = {
    sent: { bg: theme.successLight, color: theme.success },
    draft: { bg: theme.bg, color: theme.textLight },
    scheduled: { bg: theme.accentLight, color: theme.accent },
  };
  const s = styles[status] || styles.draft;
  return <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color, textTransform: "capitalize" }}>{status}</span>;
}

function ToggleSwitch({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(!on)} style={{ width: 44, height: 24, borderRadius: 12, border: "none", background: on ? theme.accent : theme.border, cursor: "pointer", position: "relative", transition: "background 0.3s", flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: on ? 23 : 3, transition: "left 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
    </button>
  );
}

// ---------- SHARED STYLES ----------
const btnStyle = {
  padding: "8px 18px",
  borderRadius: 10,
  border: `1px solid ${theme.border}`,
  background: theme.card,
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  color: theme.text,
};
