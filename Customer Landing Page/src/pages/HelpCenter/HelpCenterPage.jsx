import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HelpCategories from "./components/HelpCategories";
import PopularArticles from "./components/PopularArticles";
import FAQ from "./components/FAQ";
import ContactSupport from "./components/ContactSupport";
import ReportIssue from "./components/ReportIssue";
import StillNeedHelp from "./components/StillNeedHelp";
import Footer from "../../components/Footer";

export default function HelpCenterPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* Sub-header Bar Below Navbar with Back Button & Breadcrumb */}
      <div className="bg-white border-b border-[#E2E8F0] py-3.5 px-4 sm:px-8 shadow-xs">
        <div className="saas-container flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="
              inline-flex items-center gap-2
              h-[40px] px-4.5
              rounded-[12px]
              bg-[#ECFDF3]
              text-[#16A34A]
              border border-[#A7F3D0]/70
              text-[14px] font-[600]
              shadow-xs
              hover:bg-[#16A34A] hover:text-white
              hover:shadow-[0_4px_14px_rgba(22,163,74,.25)]
              hover:-translate-y-0.5
              active:translate-y-0
              transition-all duration-200
            "
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>

          {/* Breadcrumb Indicator */}
          <div className="flex items-center gap-2 text-[14px] font-medium text-[#64748B]">
            <Link to="/" className="inline-flex items-center gap-1.5 hover:text-[#16A34A] transition-colors">
              <Home size={15} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="text-[#94A3B8]" />
            <span className="text-[#0F172A] font-[600]">Help Center</span>
          </div>
        </div>
      </div>

      <Hero />
      <HelpCategories />
      <PopularArticles />
      <FAQ />
      <ContactSupport />
      <ReportIssue />
      <StillNeedHelp />
      <Footer />
    </div>
  );
}
