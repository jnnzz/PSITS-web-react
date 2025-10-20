import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import president from "../assets/Core Officers 2025/1.png";
import viceInternal from "../assets/Core Officers 2025/2.png";
import viceExternal from "../assets/Core Officers 2025/3.png";
import secretary from "../assets/Core Officers 2025/4.png";
import auditor from "../assets/Core Officers 2025/6.png";
import treasurer from "../assets/Core Officers 2025/7.png";
import assistantTreasurer from "../assets/Core Officers 2025/5.png";
import pio from "../assets/Core Officers 2025/8.png";
import pro from "../assets/Core Officers 2025/10.png";
import firstRep from "../assets/Core Officers 2025/11.png";
import secondRep from "../assets/Core Officers 2025/13.png";
import thirdRep from "../assets/Core Officers 2025/12.png";
import fourthRep from "../assets/Core Officers 2025/14.png";
import chiefVol from "../assets/Core Officers 2025/9.png";
import Carousel from "../components/Carousel/Carousel";
import dennis from "../assets/Faculty/15.png";
import barral from "../assets/Faculty/34.png";
import jia from "../assets/Faculty/16.png";
import beans from "../assets/Development Team 2025/18.png";
import driane from "../assets/Development Team 2025/17.png";
// import jims from "../assets/Development Team 2025/28.png";
import marianne from "../assets/Development Team 2025/19.png";
import ram from "../assets/Development Team 2025/20.png";
import jan from "../assets/Development Team 2025/21.png";
import jacinth from "../assets/Development Team 2025/22.png";
import arvin from "../assets/Development Team 2025/23.png";

const faculty = [
  { name: "Dennis Durano", image: dennis, role: "Advisor" },
  { name: "Jia Nova Montecino", image: jia, role: "Advisor" },
];

const teamMembers = [
  // {
  //   name: "Anton James Genabio",
  //   image: jims,
  //   role: "Lead / Backend Developer",
  // },
  { name: "Marianne Joy Ybrado Napisa", image: marianne, role: "Project Manager" },
  { name: "Ralph Adriane Dilao", image: driane, role: "Lead Developer" },
  { name: "Arvin Albeos", image: arvin, role: "Quality And Assurance" },
  { name: "Vince Datanagan", image: beans, role: "Fullstack Developer" },
  { name: "Jan Lorenz Laroco", image: jan, role: "Frontend Developer" },
  { name: "Jacinth Cedric Barral", image: jacinth, role: "Backend Developer" },
  { name: "Ram Riley Alin", image: ram, role: "Backend Developer" },

];

const officersAndReps = [
  { role: "President", name: "Marlou Tadlip", image: president },
  {
    role: "Vice President Internal",
    name: "Clint Louie Tuyor",
    image: viceInternal,
  },
  {
    role: "Vice President External",
    name: "Ralph Theodore Alon",
    image: viceExternal,
  },
  { role: "Secretary", name: "Sainth Anneshka N. Cuico", image: secretary },
  { role: "Auditor", name: "Riza Mae Peresores", image: auditor },
  { role: "Treasurer", name: "Daisy Lyn Laygan", image: treasurer },
  {
    role: "Asst. Treasurer",
    name: "Khrysha Espanol",
    image: assistantTreasurer,
  },
  { role: "P.I.O", name: "Angela Postrero", image: pio },
  { role: "P.R.O", name: "Vince Bryant Cabunilas", image: pro },
  { role: "Chief Volunteer", name: "Kisses Penera", image: chiefVol },
  { role: "1st Year Rep", name: "Bryle De Luna", image: firstRep },
  { role: "2nd Year Rep", name: "Lee Vincent Laurito", image: secondRep },
  { role: "3rd Year Rep", name: "Christ Hanzen Rallos", image: thirdRep },
  { role: "4th Year Rep", name: "Princess Villanueva", image: fourthRep },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState("Advisors");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
    setCarouselIndex(0);
  }, []);

  const handleCarouselIndexChange = useCallback((newIndex) => {
    setCarouselIndex(newIndex);
  }, []);

  const tabContent = {
    Advisors: (
      <Carousel
        members={faculty}
        isActive={activeTab === "Advisors"}
        onIndexChange={handleCarouselIndexChange}
        currentIndex={carouselIndex}
      />
    ),
    Officers: (
      <Carousel
        members={officersAndReps}
        isActive={activeTab === "Officers"}
        onIndexChange={handleCarouselIndexChange}
        currentIndex={carouselIndex}
      />
    ),
    Developers: (
      <Carousel
        members={teamMembers}
        isActive={activeTab === "Developers"}
        onIndexChange={handleCarouselIndexChange}
        currentIndex={carouselIndex}
      />
    ),
  };

  return (
    <div className="bg-gradient-to-b from-primary min-h-main relative overflow-hidden">
      <div className="text-center">
        <ul className="absolute z-30 pt-20 left-1/2 transform -translate-x-1/2 flex justify-center space-x-4 text-white">
          {["Advisors", "Officers", "Developers"].map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer p-2 text-base sm:text-sm md:text-base transition-all duration-300 ease-in-out ${
                activeTab === tab ? "font-bold border-b-2 border-primary" : ""
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>

        <div className="relative -top-2/4 translate-y-2/4">
          <AnimatePresence>
            <motion.section
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {tabContent[activeTab] || <div>No content available</div>}
            </motion.section>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Community;
