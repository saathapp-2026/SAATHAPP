import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Phone,
  MessagesSquare,
  ArrowRight,
  X,
  Send,
  CheckCircle2,
} from "lucide-react";

const contacts = [
  {
    type: "chat",
    title: "Live Chat",
    desc: "Chat instantly with our customer support specialists for immediate assistance.",
    icon: MessageCircle,
    action: "Start Chat",
    colorClass: "bg-[#16A34A]/[0.08] text-[#16A34A] border border-[#16A34A]/[0.15]",
  },
  {
    type: "email",
    title: "Email Support",
    desc: "Send us an email and receive a detailed response within 24 hours.",
    icon: Mail,
    action: "Send Email",
    colorClass: "bg-[#3B82F6]/[0.08] text-[#3B82F6] border border-[#3B82F6]/[0.15]",
  },
  {
    type: "phone",
    title: "Phone Support",
    desc: "Speak directly with our experienced customer care executives.",
    icon: Phone,
    action: "Call Helpline",
    colorClass: "bg-[#8B5CF6]/[0.08] text-[#8B5CF6] border border-[#8B5CF6]/[0.15]",
  },
  {
    type: "whatsapp",
    title: "WhatsApp",
    desc: "Connect with us on WhatsApp for quick updates and instant support.",
    icon: MessagesSquare,
    action: "Open WhatsApp",
    colorClass: "bg-[#0D9488]/[0.08] text-[#0D9488] border border-[#0D9488]/[0.15]",
  },
];

function ContactSupport() {
  const [activeModal, setActiveModal] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hello! 👋 Welcome to SAATH Support. How can we help you today?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleContactClick = (item) => {
    if (item.type === "chat") {
      setActiveModal("chat");
    } else if (item.type === "email") {
      window.location.href = "mailto:support@saathapp.in?subject=Help%20Request%20-%20SAATH%20App";
    } else if (item.type === "phone") {
      window.location.href = "tel:+919128842027";
    } else if (item.type === "whatsapp") {
      window.open("https://wa.me/919128842027?text=Hi%20SAATH%20Support,%20I%20need%20assistance.", "_blank");
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const userText = inputMessage;
    setChatMessages(prev => [...prev, { sender: "user", text: userText }]);
    setInputMessage("");

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: "bot", text: `Thank you for your message! Our agent will assist you shortly regarding "${userText}".` }
      ]);
    }, 1000);
  };

  return (
    <section id="contact" className="py-[80px] bg-[#F8FAFC] border-t border-[#EEF2F7]">
      <div className="saas-container">
        
        {/* Centered Section Heading (800px max width, 48px heading) */}
        <div className="text-center max-w-[700px] mx-auto mb-[40px]">
          <span className="text-[14px] font-[700] uppercase tracking-[4px] text-[#16A34A] block mb-2">
            DIRECT CHANNELS
          </span>

          <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-[700] text-[#0F172A] tracking-tight leading-tight">
            We're Here To Help
          </h2>

          <p className="mt-3 text-[18px] font-[400] text-[#64748B] leading-[1.7]">
            Choose your preferred channel to get in touch directly with our support team.
          </p>
        </div>

        {/* 4-Column Grid on Desktop (gap-[32px]) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
          {contacts.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="
                  group
                  bg-white
                  border border-[#EEF2F7]
                  rounded-[20px]
                  p-[28px]
                  shadow-[0_4px_18px_rgba(15,23,42,.05)]
                  transition-all duration-250 ease-out
                  hover:-translate-y-1
                  hover:shadow-[0_14px_36px_rgba(15,23,42,.1)]
                  hover:border-[#16A34A]
                  flex flex-col justify-between
                  h-full
                "
              >
                <div>
                  {/* Soft Pastel Circle Icon Badge (40x40px, 18px icon, strokeWidth 1.8) */}
                  <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center flex-shrink-0 mb-[18px] transition-transform duration-250 ease-out group-hover:scale-[1.03] ${item.colorClass}`}>
                    <Icon size={18} strokeWidth={1.8} />
                  </div>

                  {/* Card Title (20px, Bold 700, mb-[14px] = 14px gap to description) */}
                  <h3 className="text-[20px] font-[700] text-[#0F172A] mb-[14px] leading-[1.25]">
                    {item.title}
                  </h3>

                  {/* Description (16px, Regular 400, leading-[1.7], mb-[22px] = 22px gap to button) */}
                  <p className="text-[16px] font-[400] text-[#64748B] leading-[1.7] mb-[22px]">
                    {item.desc}
                  </p>
                </div>

                {/* Primary Button (Height: 52px, Radius: 14px, Font: 600) */}
                <button
                  onClick={() => handleContactClick(item)}
                  className="
                    h-[52px] w-full
                    flex items-center justify-center gap-2
                    rounded-[14px]
                    bg-[#16A34A]
                    text-white text-[16px] font-[600]
                    shadow-[0_4px_14px_rgba(22,163,74,.25)]
                    hover:bg-[#15803D]
                    hover:shadow-[0_6px_20px_rgba(22,163,74,.35)]
                    hover:-translate-y-0.5
                    active:translate-y-0
                    transition-all duration-300
                  "
                >
                  <span>{item.action}</span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Live Chat Modal Simulation */}
      <AnimatePresence>
        {activeModal === "chat" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="
                relative w-full max-w-lg
                h-[540px] flex flex-col
                rounded-[20px] border border-[#E2E8F0]
                bg-white shadow-2xl overflow-hidden
              "
            >
              {/* Modal Header */}
              <div className="bg-[#00A651] p-5 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <MessageCircle size={20} />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-300 border-2 border-[#00A651]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[18px]">SAATH Live Support</h3>
                    <span className="text-[13px] text-emerald-100 flex items-center gap-1">
                      <CheckCircle2 size={12} /> Agent Online
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="rounded-full p-1.5 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`
                        max-w-[80%] rounded-[14px] px-4 py-2.5 text-[14px] font-normal shadow-sm
                        ${
                          msg.sender === "user"
                            ? "bg-[#00A651] text-white rounded-br-none"
                            : "bg-white text-[#0F172A] border border-[#E2E8F0] rounded-bl-none"
                        }
                      `}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Form */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-[#E2E8F0] bg-white flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 rounded-[10px] border border-[#E2E8F0] px-4 py-2.5 text-[14px] outline-none focus:border-[#00A651]"
                />
                <button
                  type="submit"
                  className="transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:outline-none h-[42px] px-4 rounded-[10px] bg-[#00A651] text-white hover:bg-[#008f44] transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ContactSupport;
