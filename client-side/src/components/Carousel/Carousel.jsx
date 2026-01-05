import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

// CarouselCard Component
const CarouselCard = ({ member, position, isActive, onDragStart, onDragEnd, onClick }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardWidth = windowWidth < 640 ? 250 : windowWidth < 1024 ? 240 : 270;
  const cardHeight = windowWidth < 640 ? 330 : windowWidth < 1024 ? 330 : 370;
  
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 cursor-pointer "
      style={{
        width: cardWidth,
        height: cardHeight,
        originX: 0.5,
        originY: 0.5,
      }}
      initial={false}
      animate={{
        x: position.x - (cardWidth / 2),
        y: -(cardHeight / 2),
        scale: position.scale,
        zIndex: position.zIndex,
        opacity: position.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      // dragElastic={0.2}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      whileHover={isActive ? { scale: position.scale * 1.05 } : {}}
    >
      <div className={`w-full h-full rounded-2xl overflow-hidden shadow-xl transition-shadow duration-300 ${
        isActive ? 'shadow-2xl ring-2 ring-blue-400' : 'shadow-lg'
      }`}>
        <div className="relative w-full h-full bg-transparent">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            draggable="false"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Main Carousel Component
const Carousel = ({ members, isActive = true, onIndexChange, currentIndex }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardWidth = windowWidth < 640 ? 180 : windowWidth < 1024 ? 220 : 250;
  const cardSpacing = windowWidth < 640 ? 5 : 10;

  // Auto-play functionality
  useEffect(() => {
    if (!isActive || isDragging) return;

    const interval = setInterval(() => {
      onIndexChange((currentIndex + 1) % members.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isActive, members.length, onIndexChange, isDragging, windowWidth]);


  // Calculate position with improved spacing and visibility
  const calculatePosition = useCallback((index) => {
    const totalCards = members.length;
    let offset = index - currentIndex;

    // Normalize offset to be within -half to +half of total cards
    if (offset > totalCards / 2) offset -= totalCards;
    if (offset < -totalCards / 2) offset += totalCards;

    const absOffset = Math.abs(offset);
    
    if (offset === 0) {
      return { 
        x: 0, 
        scale: 1, 
        zIndex: totalCards,
        opacity: 1
      };
    } else if (absOffset === 1) {
      return { 
        x: offset * (cardWidth + cardSpacing), 
        scale: 0.85, 
        zIndex: totalCards - 1,
        opacity: 0.9
      };
    } else if (absOffset === 2) {
      return { 
        x: offset * (cardWidth + cardSpacing * 0.8), 
        scale: 0.7, 
        zIndex: totalCards - 2,
        opacity: 0.6
      };
    } else {
      return { 
        x: offset * (cardWidth + cardSpacing * 0.6), 
        scale: 0.5, 
        zIndex: 0,
        opacity: 0.3
      };
    }
  }, [currentIndex, members.length, cardWidth, cardSpacing]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    if (!isActive) return;

    const { offset, velocity } = info;
    const swipeThreshold = 50;

    if (offset.x > swipeThreshold || velocity.x > 0.3) {
      onIndexChange((currentIndex - 1 + members.length) % members.length);
    } else if (offset.x < -swipeThreshold || velocity.x < -0.3) {
      onIndexChange((currentIndex + 1) % members.length);
    }
  };

  const handleCardClick = useCallback((index) => {
    if (index !== currentIndex && !isDragging) {
      onIndexChange(index);
    }
  }, [currentIndex, isDragging, onIndexChange]);

  // Memoize cards array for better performance
  const cards = useMemo(() => {
    return members.map((member, index) => {
      const position = calculatePosition(index);
      return (
        <CarouselCard
          key={index}
          member={member}
          position={position}
          isActive={index === currentIndex}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={() => handleCardClick(index)}
        />
      );
    });
  }, [members, calculatePosition, currentIndex,  handleCardClick]);

  return (
    <div className="relative w-full px-4 sm:px-8 lg:px-0 max-w-4xl mx-auto">
      {/* Carousel Container */}
      <div className="relative w-full h-80 sm:h-96 overflow-visible" role="region" aria-label="Team member carousel">
        {cards}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-6 sm:mt-10">
        {members.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#4398AC] w-6 sm:w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => onIndexChange((currentIndex - 1 + members.length) % members.length)}
        className="absolute left-2 md:left-4 lg:-left-12 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-20"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-[#4398AC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => onIndexChange((currentIndex + 1) % members.length)}
        className="absolute right-2 md:right-4 lg:-right-12 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-110 z-20"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-[#4398AC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;