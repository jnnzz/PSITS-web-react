import { Lightbulb, HeartHandshake, Award, Bell, Code2, Users2, BookOpen, Calendar, Trophy } from "lucide-react";
import Dennis from '../assets/Faculty/15.png';
import Jia from '../assets/Faculty/16.png';
import Tadlip from '../assets/Core Officers 2025/1.png';
import Tuyor from '../assets/Core Officers 2025/2.png';
import Alon from '../assets/Core Officers 2025/3.png';
import Español from '../assets/Core Officers 2025/5.png';
import Peresores from '../assets/Core Officers 2025/6.png';
import Laygan from '../assets/Core Officers 2025/7.png';
import Penera from '../assets/Core Officers 2025/9.png';
import Postrero from '../assets/Core Officers 2025/8.png';
import Cabunilas from '../assets/Core Officers 2025/10.png';
import Laurito from '../assets/Core Officers 2025/13.png';
import Rallos from '../assets/Core Officers 2025/12.png';
import Villanueva from '../assets/Core Officers 2025/14.png';

import Genabio from '../assets/Development Team 2025/28.png';
import Napisa from '../assets/Development Team 2025/19.png';
import Dilao from '../assets/Development Team 2025/17.png';
import Igot from '../assets/Development Team 2025/18.png';
import Alin from '../assets/Development Team 2025/20.png';
import Barral from '../assets/Development Team 2025/22.png';
import Laroco from '../assets/Development Team 2025/21.png';
import Albeos from '../assets/Development Team 2025/23.png';

import Orientation from '../assets/orientation2025/1.jpg';
import ICT from '../assets/ict-congress/1.jpg';
import Blockchain from '../assets/cbc/1.jpg';
import CCSDays from '../assets/awarding/1.jpg';
import Nihonggo from '../assets/nihonggo/1.jpg';
import EmbeddedSystems from '../assets/embedded/1.jpg';
import UCCCSCares from '../assets/embedded/1.jpg';
import UCIntramurals from '../assets/intramurals/1.jpg';
import CCSAcquaintance from '../assets/akwe/CCS 4 (28).jpg';

// --- Home Banner Data ---
export const homeBannerData = {
  title: {
    normal: "Empowering",
    highlight: "future IT Professionals"
  },
  description: "We are a community of like-minded individuals who are passionate about technology and committed to making a difference in the world.",
  buttons: {
    primary: "Join Now",
    secondary: "Learn More"
  },
  image: {
    alt: "Hero Banner"
  }
};

// --- Core Values Data ---
export const coreValuesData = [
  {
    title: "Innovation",
    keywords: "Visionary • Leadership • Change",
    icon: Lightbulb,
  },
  {
    title: "Initiative",
    keywords: "Wit • Practicality • Ingenuity",
    icon: HeartHandshake,
  },
  {
    title: "Service",
    keywords: "Industry • Loyalty • Courtesy",
    icon: Award,
  },
];

// --- Get Involved Data ---
export const getInvolvedData = {
  header: {
    subtitle: "Join the Community",
    titlePrefix: "Get",
    titleSuffix: "Involved",
    description: "Learning, collaborating, and connecting within the organization. Join our community and shape the future of technology together.",
    memberCount: "500+"
  },
  cards: [
    {
      title: "Announcements",
      description: "Don't miss out! Stay updated on PSITS-hosted workshops, hackathons, and more events. Follow us for more details!",
      icon: Bell,
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop",
      className: "h-full"
    },
    {
      title: "Collaborations",
      description: "Unleash your potential! Aspiring Developers, collaborate with us on cutting-edge projects on GitHub.",
      icon: Code2,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
      className: "h-full"
    },
    {
      title: "Social Connections",
      description: "Build friendships, find mentors, and grow your network. Connect with like-minded peers and future colleagues!",
      icon: Users2,
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2032&auto=format&fit=crop",
      className: "h-full"
    },
    {
      title: "Events & Activities",
      description: "From hackathons to seminars, participate in exciting events that sharpen your skills and expand your horizons.",
      icon: Calendar,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      className: "h-full"
    },
    {
      title: "Learning Resources",
      description: "Access exclusive tutorials, study materials, and guides curated by fellow students and industry professionals.",
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop",
      className: "h-full"
    },
    {
      title: "Competitions",
      description: "Challenge yourself in coding contests, UI/UX battles, and tech quizzes. Showcase your talents and win prizes!",
      icon: Trophy,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop",
      className: "h-full"
    }
  ]
};

// --- Goal Section Data ---
export const goalSectionData = {
  title: "Goals",
  subtitle: "What we strive to achieve",
  goals: [
    {
      title: "Ethical Development",
      description: "Promotes scholarly endeavors for the promotion of moral, social, cultural, and environmental interests."
    },
    {
      title: "Career",
      description: "Meets the demands of the industry in terms of technical, personal and interpersonal skills."
    },
    {
      title: "Resource Optimization",
      description: "Optimizes the use of appropriate and advanced resources and services."
    },
    {
      title: "Research",
      description: "Conducts intellectual, technological and significant researches in computing."
    }
  ]
};

// --- Institutional Identity Data ---
export interface UCData {
  title: string;
  subtitle: string;
  stats: { value: string; label: string; }[];
  mission: string;
  vision: string;
}

export interface CCSData {
  title: string;
  subtitle: string;
  mission: string;
  vision: {
    intro: string;
    points: string[];
  };
}

export interface InstitutionalIdentityData {
  uc: UCData;
  ccs: CCSData;
}

export const institutionalIdentityData: InstitutionalIdentityData = {
  uc: {
    title: "University of Cebu",
    subtitle: "Mission & Vision",
    stats: [
      { value: "60,000+", label: "students" },
      { value: "1964", label: "founded" },
      { value: "9", label: "departments" }
    ],
    mission: "The University offers affordable and quality education responsive to the demands of local and international communities.",
    vision: "Democratize quality education. Be the visionary and industry leader. Give hope and transform lives."
  },
  ccs: {
    title: "College of Computer Studies",
    subtitle: "Mission & Vision",
    mission: "We envision being the hub of quality, globally-competitive and socially-responsive information technology education.",
    vision: {
      intro: "We commit to continuously:",
      points: [
        "Offer relevant programs that mold well-rounded computing professionals",
        "Engage in accreditation and quality standards;",
        "Facilitate in building an IT-enabled nation."
      ]
    }
  }
};

// --- Dean's Message Data ---
export const deansMessageData = {
  header: {
    subtitle: "Leadership",
    title: "Dean's Message"
  },
  paragraphs: [
    "As the Dean of our esteemed college, we're thrilled to have you here. I am committed to fostering a supportive and dynamic learning environment where you can thrive.",
    "Explore the many opportunities available, from internships to hackathons, to gain valuable real-world experience and develop your skills. We encourage active participation and collaboration – your voice matters!",
    "We're here to help you succeed in this ever-evolving field. Best wishes for an amazing academic journey!"
  ],
  signature: {
    name: "Mr. Neil Basabe",
    role: "Dean - UC Main CSS"
  }
};

// --- Upcoming Events Data ---
export const upcomingEventsData = {
  header: {
    title: "Upcoming Events",
    year: "2026"
  },
  events: [
    {
      id: 1,
      title: "Acquaintance Party",
      date: "11 August - 5:00 PM",
      location: "SM Seaside City Cebu",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "CCS Days",
      date: "25 February - 8:00 AM",
      location: "University of Cebu - Main Campus",
      image: "https://images.unsplash.com/photo-1540575861501-7ce0e22022f9?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "UC Intramurals",
      date: "12 March - 7:00 AM",
      location: "University of Cebu - Main Campus",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Programming Competition",
      date: "15 April - 9:00 AM",
      location: "CCS Laboratory",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    }
  ]
};

// --- Past Events Data ---
export const pastEventsData = {
  header: {
    title: "Past Events",
    year: "2025"
  },
  events: [
    {
      id: 1,
      title: "CCS Orientation 2025",
      location: "University of Cebu Main Campus",
      date: { month: "August", day: "20" },
      description: "The College of Computer Studies (CCS) at the University of Cebu Main Campus warmly welcomed its new batch of students during the CCS Orientation 2025 held on August 20, 2025. The event was designed to introduce freshmen to the college's programs, faculty, and student organizations.",
      image: Orientation,
    },
    {
      id: 2,
      title: "11th ICT Congress 2025",
      location: "SM Seaside City Cebu",
      date: { month: "April", day: "12" },
      description: "The 11th ICT Congress 2025 at SM Seaside City Cebu was a landmark event that brought together IT enthusiasts, professionals, and students from across the region. The congress featured a series of keynote speeches, panel discussions, and workshops focused on the latest trends and innovations in information and communication technology.",
      image: ICT,
    },
    {
      id: 3,
      title: "CCS Days",
      location: "University of Cebu Main Campus",
      date: { month: "February", day: "12" },
      description: "CCS Days at the University of Cebu Main Campus was a vibrant celebration of technology, creativity, and community spirit. The event spanned several days and featured a variety of activities including coding competitions, hackathons, tech talks, and exhibitions showcasing student projects.",
      image: CCSDays,
    },
    {
      id: 4,
      title: "Cebu Blockchain Conference 2025",
      location: "IEC Convention Center Cebu",
      date: { month: "January", day: "17" },
      description: "The Cebu Blockchain Conference 2025 held at the IEC Convention Center Cebu was a groundbreaking event that delved into the transformative potential of blockchain technology. The conference attracted industry leaders, developers, entrepreneurs, and enthusiasts eager to explore the applications and implications of blockchain across various sectors.",
      image: Blockchain,
    },
    {
      id: 5,
      title: "Nihonggo Culminating Activity 2024",
      location: "University of Cebu Main Campus",
      date: { month: "December", day: "17" },
      description: "The Nihonggo Culminating Activity 2024 at the University of Cebu Main Campus was a festive event that marked the conclusion of the Nihonggo language program for the year. The activity showcased the progress and achievements of students who had been studying the Japanese language and culture throughout the semester.",
      image: Nihonggo,
    },
    {
      id: 6,
      title: "Embedded Systems and IOT Project Exhibit 2024",
      location: "University of Cebu Main Campus",
      date: { month: "November", day: "17" },
      description: "The Embedded Systems and IoT Project Exhibit 2024 at the University of Cebu Main Campus was an exciting event that highlighted the innovative projects developed by students in the fields of embedded systems and the Internet of Things (IoT). The exhibit provided a platform for students to showcase their creativity, technical skills, and problem-solving abilities.",
      image: EmbeddedSystems,
    },
    {
      id: 7,
      title: "UC CCS Cares and Internship 2024",
      location: "University of Cebu Main Campus",
      date: { month: "November", day: "17" },
      description: "The UC CCS Cares and Internship 2024 program at the University of Cebu Main Campus was a commendable initiative that combined community service with practical work experience for students. The program aimed to foster a sense of social responsibility among students while providing them with valuable insights into their future careers.",
      image: UCCCSCares,
    },
    {
      id: 8,
      title: "UC Intramurals",
      location: "University of Cebu Main Campus",
      date: { month: "November", day: "20" },
      description: "The UC Intramurals at the University of Cebu Main Campus was a lively event that brought together students from various departments to compete in a range of sports and recreational activities. The intramurals fostered camaraderie, sportsmanship, and school spirit among participants and spectators alike.",
      image: UCIntramurals,
    },
    {
      id: 9,
      title: "CCS Acquaintance Party 2024",
      location: "SM Seaside City Cebu",
      date: { month: "November", day: "16" },
      description: "On November 16, 2024, the CCS Acquaintance Party brought together students, faculty, and alumni at SM Seaside City Cebu for a night inspired by the timeless allure of the Old Money theme. The event was a celebration of camaraderie, elegance, and the rich heritage of the College of Computer Studies (CCS) community.",
      image: CCSAcquaintance,
    },

  ]
};
// --- Organization Section Data ---
export interface Member {
  name: string;
  role: string;
  image: string;
  socials?: { email?: string; github?: string; };
}

export interface OrganizationTab {
  id: string;
  label: string;
  title: string;
  description: string;
  content: string;
  image: string;
  advisors: Member[];
  officers: Member[];
  developers: Member[];
  volunteers: Member[];
}

export interface OrganizationSectionData {
  header: {
    subtitle: string;
    title: {
      normal: string;
      highlight: string;
    };
  };
  tabs: OrganizationTab[];
}

export const organizationSectionData: OrganizationSectionData = {
  header: {
    subtitle: "The heartbeat of digital innovation",
    title: {
      normal: "Our",
      highlight: "Organization"
    },
  },
  tabs: [
    {
      id: "psits",
      label: "PSITS",
      title: "Philippine Society of I.T. Students",
      description: "The primary student organization for Information Technology students, focusing on technical excellence and professional development.",
      content: "PSITS serves as the umbrella organization for all IT students, providing a platform for growth, collaboration, and innovation through various technical workshops, seminars, and networking events.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
      advisors: [
        {
          name: "Engr. Dennis Durano",
          role: "PSITS Adviser",
          image: Dennis,
          socials: { email: "jane@example.com" }
        },
        {
          name: "Jia Nova B. Montecino",
          role: "PSITS Adviser",
          image: Jia,
          socials: { email: "jane@example.com" }
        }
      ],
      officers: [
        {
          name: "Marlou Tadlip",
          role: "President",
          image: Tadlip,
          socials: { email: "jacinth@example.com", github: "jacinth" }
        },
        {
          name: "Clint Louie Tuyor",
          role: "Vice President Internal",
          image: Tuyor,
          socials: { email: "james@example.com", github: "james" }
        },
        {
          name: "Ralph Theodore Alon",
          role: "Vice President External",
          image: Alon,
          socials: { email: "jacinth@example.com", github: "jacinth" }
        },
        {
          name: "James Doe",
          role: "Secretary",
          image: Alon,
          socials: { email: "james@example.com", github: "james" }
        },
        {
          name: "Khrysha Español",
          role: "Assistant Treasurer",
          image: Español,
          socials: { email: "jacinth@example.com", github: "jacinth" }
        },
        {
          name: "Raiza Mae Peresores",
          role: "Auditor",
          image: Peresores,
          socials: { email: "james@example.com", github: "james" }
        },
        {
          name: "Daisy Lyn Laygan",
          role: "Treasurer",
          image: Laygan,
          socials: { email: "jacinth@example.com", github: "jacinth" }
        },
        {
          name: "Kisses Peñera",
          role: "Chief Volunteer",
          image: Penera,
          socials: { email: "jacinth@example.com", github: "jacinth" }
        },
        {
          name: "Angela Postrero",
          role: "Public Information Officer",
          image: Postrero,
          socials: { email: "jacinth@example.com", github: "jacinth" }
        },
        {
          name: "Vince Bryant Cabunilas",
          role: "Public Relations Officer",
          image: Cabunilas,
          socials: { email: "jacinth@example.com", github: "jacinth" }
        },
        {
          name: "Jamaica Esgana",
          role: "First Year Representative",
          image: Penera,
          socials: { email: "jacinth@example.com", github: "jacinth" }
        },
        {
          name: "Lee Vincent Laurito",
          role: "Second Year Representative",
          image: Laurito,
          socials: { email: "jacinth@example.com", github: "jacinth" }
        },
        {
          name: "Christ Hanzen Rallos",
          role: "Third Year Representative",
          image: Rallos,
          socials: { email: "jacinth@example.com", github: "jacinth" }
        },
        {
          name: "Princess Villanueva",
          role: "Fourth Year Representative",
          image: Villanueva,
          socials: { email: "jacinth@example.com", github: "jacinth" }
        },
      ],
      developers: [
        {
          name: "Anton James Genabio",
          role: "Former Head Developer",
          image: Genabio,
          socials: { github: "johnsmith" }
        },
        {
          name: "Marriane Joy Napisa",
          role: "Project Manager",
          image: Napisa,
          socials: { github: "johnsmith" }
        },
        {
          name: "Ralph Adriane Dilao",
          role: "Lead Developer",
          image: Dilao,
          socials: { github: "johnsmith" }
        },
        {
          name: "Vince Clave Igot",
          role: "Fullstack Developer",
          image: Igot,
          socials: { github: "johnsmith" }
        },
        {
          name: "Ram Riley Alin",
          role: "Backend Developer",
          image: Alin,
          socials: { github: "johnsmith" }
        },
        {
          name: "Jacinth Cedric Barral",
          role: "Backend Developer",
          image: Barral,
          socials: { github: "johnsmith" }
        },
        {
          name: "Jan Lorenz Laroco",
          role: "Frontend Developer",
          image: Laroco,
          socials: { github: "johnsmith" }
        },
        {
          name: "Froilan Kim Edem",
          role: "Fullstack Developer",
          image: Barral,
          socials: { github: "johnsmith" }
        },
        {
          name: "Arvin Albeos",
          role: "Quality Assurance",
          image: Albeos,
          socials: { github: "johnsmith" }
        },
        {
          name: "Luke Harvey Umpad",
          role: "UI/UX Designer",
          image: Barral,
          socials: { github: "johnsmith" }
        },
      ],
      volunteers: [
        {
          name: "Alice Johnson",
          role: "Event Volunteer",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1974&auto=format&fit=crop",
        }
      ]
    }
  ]
};

