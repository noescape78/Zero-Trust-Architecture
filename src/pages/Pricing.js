import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Layout from "../components/Layout";
import { CheckCircle2, ArrowLeft } from "lucide-react";

const PricingCard = ({ plan, highlight }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-[580px] w-full max-w-[340px] rounded-[2.5rem] p-8 border flex flex-col transition-all duration-200 ${
        highlight 
          ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_60px_rgba(79,70,229,0.3)]' 
          : 'bg-zinc-900/60 border-white/5 shadow-2xl'
      }`}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="flex flex-col h-full">
        <h3 className={`text-xs font-black uppercase tracking-[0.3em] mb-4 ${highlight ? 'text-white' : 'text-zinc-500'}`}>
          {plan.name}
        </h3>
        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-6xl font-black">{plan.price}</span>
          <span className="text-sm opacity-40 font-medium ml-1">/month</span>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <ul className="space-y-4">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-zinc-300">
                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${highlight ? 'text-white' : 'text-indigo-500'}`} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <button className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] ${
            highlight 
              ? 'bg-white text-indigo-600 hover:bg-zinc-100 shadow-xl' 
              : 'bg-zinc-100 text-black hover:bg-white shadow-lg shadow-white/5'
          }`}>
            {plan.button}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function Pricing() {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      name: "Starter",
      price: "$0",
      features: [
        "5GB Encrypted Storage",
        "Zero-Knowledge Protocol",
        "Standard Speed Uploads",
        "Email Support",
        "Mobile App Access"
      ],
      button: "Claim Now",
      highlight: false
    },
    {
      name: "Professional",
      price: "$12",
      features: [
        "50GB Secure Storage",
        "Priority CDN Edge",
        "10GB Max File Size",
        "Detailed Audit Logs",
        "24/7 Dedicated Support",
        "Custom Expiry Links",
        "Password Protected Shares"
      ],
      button: "Get Pro Access",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited Storage",
        "Dedicated Server Nodes",
        "SSO & SAML Integration",
        "Compliance Reporting",
        "White-label Branding",
        "99.99% Guaranteed SLA",
        "Personal Account Manager"
      ],
      button: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-[#010101] text-white selection:bg-indigo-500 relative overflow-hidden flex flex-col pt-24 pb-20 px-6">
        
        {/* Abstract Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <button 
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-xs font-black uppercase tracking-[0.2em] mb-12"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Return Home
          </button>

          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-none">
              Simple plans. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">No compromises.</span>
            </h1>
            <p className="text-zinc-500 text-base md:text-lg font-light leading-relaxed">
              Choose the tier that fits your data sovereignty needs. Every plan includes our industry-standard encryption protocols.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {pricingPlans.map((plan, i) => (
              <PricingCard key={i} plan={plan} highlight={plan.highlight} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
