"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Trash2, Download, Search, Lock, Key, Eye, EyeOff, 
  Mail, Phone, User, Calendar, MessageSquare, AlertCircle
} from "lucide-react";
import BackgroundElements from "@/components/BackgroundElements";
import CustomCursor from "@/components/CustomCursor";
import RobotAI from "@/components/mascot/RobotAI";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status?: "new" | "contacted" | "closed";
  timestamp: string;
}

export default function AdminControlDeck() {
  const [hasAccess, setHasAccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  // Leads State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadSearchTerm, setLeadSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // On mount check admin session & localStorage leads
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("admin_session");
    if (sessionToken === "authenticated") {
      setHasAccess(true);
    }

    const storedLeads = localStorage.getItem("leads");
    if (storedLeads) {
      try {
        setLeads(JSON.parse(storedLeads));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@fz.com" && password === "Fz@2026") {
      sessionStorage.setItem("admin_session", "authenticated");
      setHasAccess(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid credentials! Authentication failed.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    setHasAccess(false);
  };

  const handleDeleteLead = (id: number) => {
    if (window.confirm("Are you sure you want to delete this customer enquiry lead?")) {
      const updated = leads.filter((l) => l.id !== id);
      setLeads(updated);
      localStorage.setItem("leads", JSON.stringify(updated));
      if (selectedLead?.id === id) {
        setSelectedLead(null);
      }
    }
  };

  const handleUpdateLeadStatus = (id: number, newStatus: "new" | "contacted" | "closed") => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    setLeads(updated);
    localStorage.setItem("leads", JSON.stringify(updated));
    if (selectedLead?.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ["ID", "Name", "Email", "Phone", "Service", "Status", "Message", "Timestamp"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone || ""}"`,
      `"${l.service || ""}"`,
      `"${l.status || "new"}"`,
      `"${l.message.replace(/"/g, '""')}"`,
      `"${l.timestamp}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `first_zone_customer_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(leadSearchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(leadSearchTerm.toLowerCase()) ||
      l.message.toLowerCase().includes(leadSearchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || (l.status || "new") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Dashboard Stats
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => !l.status || l.status === "new").length;
  const contactedLeads = leads.filter((l) => l.status === "contacted").length;
  const closedLeads = leads.filter((l) => l.status === "closed").length;

  return (
    <div className="relative w-full min-h-screen text-foreground selection:bg-primary-blue selection:text-bg-yellow bg-custom-bg text-custom-fg p-4 sm:p-8 lg:p-12 flex flex-col justify-center items-center select-none">
      <BackgroundElements />
      <CustomCursor />

      <div className="w-full max-w-6xl relative z-10">
        <AnimatePresence mode="wait">
          {!hasAccess ? (
            /* Secure Login Panel */
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : { opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="max-w-md mx-auto glassmorphism p-8 rounded-3xl shadow-2xl border-2 border-primary-blue/30 text-center"
            >
              <div className="flex justify-center mb-4">
                <RobotAI className="w-20 h-20" />
              </div>
              <h2 className="text-2xl font-black text-foreground tracking-tight mb-1">
                Admin Control Deck
              </h2>
              <p className="text-xs font-semibold text-foreground/75 mb-6">
                Enter your credentials to access Lead Management
              </p>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold flex items-center justify-center gap-2">
                  <AlertCircle size={14} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-foreground/70 mb-1 block">
                    Admin Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@fz.com"
                      className="w-full px-4 py-3 rounded-2xl glassmorphism border border-primary-blue/20 text-xs font-bold text-foreground focus:outline-none focus:border-primary-blue pl-10"
                    />
                    <Lock size={16} className="absolute left-3.5 top-3.5 text-foreground/50" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-foreground/70 mb-1 block">
                    Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-2xl glassmorphism border border-primary-blue/20 text-xs font-bold text-foreground focus:outline-none focus:border-primary-blue pl-10 pr-10"
                    />
                    <Key size={16} className="absolute left-3.5 top-3.5 text-foreground/50" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-foreground/50 hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-primary-blue text-bg-yellow font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-primary-blue/40 transition-all border border-primary-blue"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Authenticate Session
                </motion.button>
              </form>

              <div className="mt-6">
                <a
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-blue dark:text-accent-blue hover:underline"
                >
                  <ArrowLeft size={14} />
                  <span>Return to Agency Landing</span>
                </a>
              </div>
            </motion.div>
          ) : (
            /* Lead Management Dashboard */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {/* Dashboard Header Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 glassmorphism p-6 rounded-3xl border-2 border-primary-blue/20 shadow-xl">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-primary-blue text-bg-yellow dark:bg-accent-blue dark:text-slate-900 px-3 py-1 rounded-full">
                      📍 EXECUTIVE CONTROL PANEL
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-foreground">
                    Lead Management & Enquiries
                  </h1>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href="/"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl glassmorphism border border-primary-blue/15 text-xs font-bold text-foreground hover:bg-primary-blue/10 transition-colors"
                  >
                    <ArrowLeft size={14} />
                    <span>Website</span>
                  </a>

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-black hover:bg-red-500/20 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Statistics Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="p-5 rounded-2xl glassmorphism-card border border-primary-blue/15 shadow text-center">
                  <span className="text-2xl sm:text-3xl font-black text-foreground">{totalLeads}</span>
                  <p className="text-[10px] font-black uppercase tracking-wider text-foreground/60 mt-1">Total Enquiries</p>
                </div>

                <div className="p-5 rounded-2xl glassmorphism-card border border-blue-500/20 bg-blue-500/5 shadow text-center">
                  <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">{newLeads}</span>
                  <p className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-1">New Leads</p>
                </div>

                <div className="p-5 rounded-2xl glassmorphism-card border border-amber-500/20 bg-amber-500/5 shadow text-center">
                  <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">{contactedLeads}</span>
                  <p className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-1">In Progress</p>
                </div>

                <div className="p-5 rounded-2xl glassmorphism-card border border-emerald-500/20 bg-emerald-500/5 shadow text-center">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">{closedLeads}</span>
                  <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mt-1">Closed Deals</p>
                </div>
              </div>

              {/* Lead Management Action & Search Bar */}
              <div className="glassmorphism p-6 sm:p-8 rounded-3xl border-2 border-primary-blue/20 shadow-xl mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                  {/* Search Input */}
                  <div className="relative w-full md:w-80">
                    <input
                      type="text"
                      value={leadSearchTerm}
                      onChange={(e) => setLeadSearchTerm(e.target.value)}
                      placeholder="Search lead by name, email, query..."
                      className="w-full px-4 py-2.5 rounded-2xl glassmorphism border border-primary-blue/15 text-xs font-bold text-foreground focus:outline-none pl-9"
                    />
                    <Search size={14} className="absolute left-3 top-3 text-foreground/50" />
                  </div>

                  {/* Filter & Export Bar */}
                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3.5 py-2 rounded-xl glassmorphism border border-primary-blue/15 text-xs font-bold text-foreground bg-transparent focus:outline-none"
                    >
                      <option value="all" className="dark:bg-slate-800">All Statuses</option>
                      <option value="new" className="dark:bg-slate-800">New Leads</option>
                      <option value="contacted" className="dark:bg-slate-800">In Progress</option>
                      <option value="closed" className="dark:bg-slate-800">Closed</option>
                    </select>

                    <button
                      onClick={handleExportCSV}
                      disabled={leads.length === 0}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-blue text-bg-yellow font-black text-xs uppercase tracking-wider shadow border border-primary-blue disabled:opacity-50"
                    >
                      <Download size={14} />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Leads Table List */}
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-16">
                    <MessageSquare size={32} className="text-foreground/40 mx-auto mb-3" />
                    <h3 className="font-extrabold text-foreground text-sm">No Customer Enquiries Found</h3>
                    <p className="text-xs text-foreground/60 font-semibold mt-1">
                      New contact form submissions submitted on your landing page will populate here automatically.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className={`p-5 rounded-2xl glassmorphism-card border transition-all ${
                          selectedLead?.id === lead.id
                            ? "border-primary-blue shadow-lg ring-2 ring-primary-blue/20"
                            : "border-primary-blue/10 hover:border-primary-blue/30"
                        }`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-black text-foreground text-sm flex items-center gap-1.5">
                                <User size={14} className="text-primary-blue" />
                                {lead.name}
                              </h3>

                              <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                lead.status === "closed"
                                  ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                                  : lead.status === "contacted"
                                  ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                                  : "bg-blue-500/15 text-blue-500 border border-blue-500/30"
                              }`}>
                                {lead.status || "new"}
                              </span>
                            </div>

                            <div className="flex items-center gap-4 text-xs font-bold text-foreground/75 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Mail size={12} className="text-primary-blue" />
                                <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                              </span>

                              {lead.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone size={12} className="text-emerald-500" />
                                  <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                                </span>
                              )}

                              <span className="flex items-center gap-1 text-[11px] text-foreground/50">
                                <Calendar size={12} />
                                {lead.timestamp}
                              </span>
                            </div>
                          </div>

                          {/* Quick Action Controls */}
                          <div className="flex items-center gap-2 self-end md:self-center">
                            <select
                              value={lead.status || "new"}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                              className="px-3 py-1.5 rounded-xl glassmorphism border border-primary-blue/20 text-xs font-black text-foreground bg-transparent focus:outline-none"
                            >
                              <option value="new" className="dark:bg-slate-800">New</option>
                              <option value="contacted" className="dark:bg-slate-800">In Progress</option>
                              <option value="closed" className="dark:bg-slate-800">Closed Deal</option>
                            </select>

                            <button
                              onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}
                              className="p-2 rounded-xl bg-primary-blue/10 text-primary-blue hover:bg-primary-blue/20"
                              title="View Full Message"
                            >
                              <Eye size={16} />
                            </button>

                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20"
                              title="Delete Lead"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Expandable Lead Message View */}
                        {selectedLead?.id === lead.id && (
                          <div className="mt-4 pt-4 border-t border-primary-blue/10 bg-primary-blue/5 p-4 rounded-xl">
                            <h4 className="text-[10px] font-black uppercase tracking-wider text-primary-blue mb-1">
                              Customer Inquiry Message:
                            </h4>
                            <p className="text-xs font-semibold text-foreground leading-relaxed whitespace-pre-wrap">
                              {lead.message}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
