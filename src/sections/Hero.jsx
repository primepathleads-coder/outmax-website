import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { companyInfo } from "../data/companyData";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `We act as an extension of your team,
handling customer care, performance marketing,
and digital platforms so you can scale profitably`;

  return (
    <section id="home" className="relative flex flex-col justify-end min-h-screen pt-24 sm:pt-28">
      {/* 3D Canvas Background with Planet */}
      <figure
        className="absolute inset-0 -z-50 pointer-events-auto"
        style={{ width: "100%", height: "100vh" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.6} />
          <Float speed={0.6} rotationIntensity={0.8} floatIntensity={1}>
            <Planet scale={isMobile ? 0.65 : 0.95} />
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2.5}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={1.8}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2.2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>

      {/* Main Animated Title & Slogan with Stylish Cursive Body Text */}
      <AnimatedHeaderSection
        subTitle={"Business Process Outsourcing · Performance Marketing · Digital Solutions"}
        title={"OUTMAX\u00A0SERVICES"}
        text={text}
        textColor={"text-black"}
        isScriptText={true}
      />

      {/* Action Buttons & Verified Credibility Strip */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 pb-8 sm:pb-12 z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-wider font-semibold bg-black text-white hover:bg-gold hover:text-black transition-all duration-300 shadow-md group"
          >
            <span>Discuss Your Requirements</span>
            <Icon icon="lucide:arrow-right" className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-wider font-semibold bg-white/90 hover:bg-white text-black border border-black/20 transition-all duration-300 shadow-sm"
          >
            <span>Explore 11 Services</span>
          </Link>
        </div>

        {/* Real Metrics Micro-Banner */}
        <div className="flex items-center gap-6 text-xs text-black/70 border-l-2 border-gold pl-4 py-1">
          <div>
            <div className="font-bold text-black text-sm tracking-tight">$1.88M+ Spend</div>
            <div className="text-[11px] text-black/60">462 Meta Campaigns</div>
          </div>
          <div className="h-6 w-px bg-black/15" />
          <div>
            <div className="font-bold text-black text-sm tracking-tight">$59K+ AFD</div>
            <div className="text-[11px] text-black/60">System1 RAMP Verified</div>
          </div>
          <div className="h-6 w-px bg-black/15" />
          <div className="hidden sm:block">
            <div className="font-bold text-black text-sm tracking-tight">8M+ Sends</div>
            <div className="text-[11px] text-black/60">12.59% CTOR Record</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
