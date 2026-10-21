import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";

export const teamMembers = [
  {
    id: "1",
    name: "Dr. Azhar Munir",
    role: "Chief Technology Officer & Board Member",
    image: "/images/executives/azhar.png",
    intro:
      "Spearheading technological innovation and scalable architecture. Dr. Munir ensures Outmax operational infrastructure remains at the bleeding edge of global tech standards.",
    emails: ["azhar@outmaxservices.com"],
  },
  {
    id: "2",
    name: "Abdul Moiz Khan",
    role: "Managing Director",
    image: "/images/team/moiz-khan.png",
    intro:
      "A relentless force in business development and strategy, Abdul Moiz Khan spearheads operational expansion with surgical precision.",
    emails: ["abdulmoizkhan@outmaxservices.com"],
  },
  {
    id: "3",
    name: "Moiz Rehman",
    role: "Technical & Affiliate Lead",
    image: "/images/team/moiz-rehman.png",
    intro:
      "The mastermind behind our technical infrastructure and affiliate operations. Moiz architects scalable systems that drive compounding revenue.",
    emails: ["moizrehman@outmaxservices.com", "affiliates@outmaxservices.com"],
  },
  {
    id: "4",
    name: "Aizaz",
    role: "Lead Creative",
    image: "/images/team/aizaz.png",
    intro:
      "Our lead creative and product visionary. Aizaz transforms complex challenges into elegant, high-converting digital experiences.",
    emails: ["aizaz@outmaxservices.com"],
  },
  {
    id: "5",
    name: "Ahsan",
    role: "Sales & Partner Acquisition",
    image: "/images/team/ahsan.png",
    intro:
      "Driving aggressive sales and partner acquisition. Ahsan ensures every client engagement maximizes ROI and market penetration.",
    emails: ["ahsan@outmaxservices.com"],
  },
  {
    id: "6",
    name: "Omar",
    role: "Marketing Engineering",
    image: "/images/team/omar.png",
    intro:
      "The tactical engine of our marketing division. Omar engineers growth campaigns that consistently crush acquisition targets.",
    emails: ["omar@outmaxservices.com"],
  },
  {
    id: "7",
    name: "Hussain Munir",
    role: "Full-Stack Engineer",
    image: "/images/team/hussain.png",
    intro:
      "Full-Stack Engineer with a foundation in Computer Engineering from GIKI. Specializes in bridging the gap between hardware-level precision and modern, high-performance digital experiences. From architecting event-driven disaster response platforms to developing real-time applications for community safety, focused on building scalable systems that solve tangible problems with high-efficiency code.",
    github: "https://github.com/hussainmunir1908",
    linkedin: "https://linkedin.com/in/hussainmunir1908",
    emails: ["hussain@outmaxservices.com"],
  },
];

export const TeamShowcase = ({ members = teamMembers }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <>
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-14 select-none w-full max-w-full lg:max-w-5xl mx-auto py-8 px-4 md:px-6 overflow-x-hidden">
        {/* Left: photo grid */}
        <div className="flex gap-2 md:gap-3 flex-shrink-0 overflow-x-auto pb-1 md:pb-0">
          {/* Column 1 */}
          <div className="flex flex-col gap-2 md:gap-3">
            {col1.map((member) => (
              <div
                key={member.id}
                className={`w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px] cursor-pointer flex-shrink-0 transition-opacity duration-300 ${
                  hoveredId !== null && hoveredId !== member.id ? "opacity-40" : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedMember(member)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-contain object-bottom transition-all duration-500 drop-shadow-xl"
                />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-2 md:gap-3 mt-[48px] sm:mt-[56px] md:mt-[68px]">
            {col2.map((member) => (
              <div
                key={member.id}
                className={`w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px] cursor-pointer flex-shrink-0 transition-opacity duration-300 ${
                  hoveredId !== null && hoveredId !== member.id ? "opacity-40" : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedMember(member)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-contain object-bottom transition-all duration-500 drop-shadow-xl"
                />
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-2 md:gap-3 mt-[22px] sm:mt-[26px] md:mt-[32px]">
            {col3.map((member) => (
              <div
                key={member.id}
                className={`w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px] cursor-pointer flex-shrink-0 transition-opacity duration-300 ${
                  hoveredId !== null && hoveredId !== member.id ? "opacity-40" : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedMember(member)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-contain object-bottom transition-all duration-500 drop-shadow-xl"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: member name list with stylish cursive font */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-5 pt-0 md:pt-2 flex-1 w-full justify-center">
          {members.map((member) => {
            const isActive = hoveredId === member.id;
            return (
              <div
                key={member.id}
                className={`cursor-pointer transition-opacity duration-300 ${
                  hoveredId !== null && !isActive ? "opacity-40" : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedMember(member)}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-3 rounded-none flex-shrink-0 transition-all duration-300 ${
                      isActive ? "bg-gold w-6" : "bg-white/20 w-4"
                    }`}
                  />
                  <span
                    className={`text-2xl md:text-3xl lg:text-4xl leading-none transition-colors duration-300 font-script ${
                      isActive ? "text-white" : "text-white/60"
                    }`}
                  >
                    {member.name}
                  </span>
                </div>
                <p className="mt-1.5 pl-[34px] text-[10px] md:text-xs font-mono font-medium uppercase tracking-[0.2em] text-gold">
                  {member.role}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal / Card Expansion for Selected Member */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0d0d11] border border-white/10 max-w-2xl w-full p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-lg"
              >
                ✕
              </button>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 flex items-end justify-center overflow-visible">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-contain object-bottom drop-shadow-xl"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-script text-4xl sm:text-5xl md:text-6xl text-white mb-2 leading-none">
                    {selectedMember.name}
                  </h3>
                  <p className="font-mono text-gold text-xs tracking-widest uppercase mb-6">
                    {selectedMember.role}
                  </p>

                  <p className="text-white/80 font-normal text-base leading-relaxed mb-6">
                    {selectedMember.intro}
                  </p>

                  <div className="flex flex-col gap-2.5 mb-6">
                    {selectedMember.emails.map((email, idx) => (
                      <a
                        key={idx}
                        href={`mailto:${email}`}
                        className="flex items-center gap-2 text-xs text-white/90 hover:text-gold transition-colors font-mono"
                      >
                        <Icon icon="solar:letter-bold" className="text-gold size-4" />
                        <span>{email}</span>
                      </a>
                    ))}
                    {selectedMember.github && (
                      <a
                        href={selectedMember.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-white/90 hover:text-gold transition-colors font-mono"
                      >
                        <Icon icon="mdi:github" className="text-gold size-4" />
                        <span>{selectedMember.github.replace("https://", "")}</span>
                      </a>
                    )}
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs text-white/90 hover:text-gold transition-colors font-mono"
                      >
                        <Icon icon="mdi:linkedin" className="text-gold size-4" />
                        <span>{selectedMember.linkedin.replace("https://", "")}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TeamShowcase;
