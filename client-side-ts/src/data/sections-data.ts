import {
  Lightbulb,
  HeartHandshake,
  Award,
  Bell,
  Code2,
  Users2,
} from 'lucide-react';

// --- Home Banner Data ---
export const homeBannerData = {
  title: {
    normal: 'Empowering',
    highlight: 'future IT Professionals',
  },
  description:
    'We are a community of like-minded individuals who are passionate about technology and committed to making a difference in the world.',
  buttons: {
    primary: 'Join Now',
    secondary: 'Learn More',
  },
  image: {
    alt: 'Hero Banner',
  },
};

// --- Core Values Data ---
export const coreValuesData = [
  {
    title: 'Innovation',
    keywords: 'Visionary • Leadership • Change',
    icon: Lightbulb,
  },
  {
    title: 'Initiative',
    keywords: 'Wit • Practicality • Ingenuity',
    icon: HeartHandshake,
  },
  {
    title: 'Service',
    keywords: 'Industry • Loyalty • Courtesy',
    icon: Award,
  },
];

// --- Get Involved Data ---
export const getInvolvedData = {
  header: {
    subtitle: 'Join the Community',
    titlePrefix: 'Get',
    titleSuffix: 'Involved',
    description:
      'Learning, collaborating, and connecting within the organization. Join our community and shape the future of technology together.',
    memberCount: '500+',
  },
  cards: [
    {
      title: 'Announcements',
      description:
        "Don't miss out! Stay updated on PSITS-hosted workshops, hackathons, and more events. Follow us for more details!",
      icon: Bell,
      className: 'h-full',
    },
    {
      title: 'Collaborations',
      description:
        'Unleash your potential! Aspiring Developers, collaborate with us on cutting-edge projects on GitHub.',
      icon: Code2,
      className: 'h-full',
    },
    {
      title: 'Social Connections',
      description:
        'Build friendships, find mentors, and grow your network. Connect with like-minded peers and future colleagues!',
      icon: Users2,
      className: 'sm:col-span-2',
    },
  ],
};

// --- Goal Section Data ---
export const goalSectionData = {
  title: 'Goals',
  subtitle: 'What we strive to achieve',
};

// --- Institutional Identity Data ---
export interface UCData {
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
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
    title: 'University of Cebu',
    subtitle: 'Mission & Vision',
    stats: [
      { value: '60,000+', label: 'students' },
      { value: '1964', label: 'founded' },
      { value: '9', label: 'departments' },
    ],
    mission:
      'The University offers affordable and quality education responsive to the demands of local and international communities.',
    vision:
      'Democratize quality education. Be the visionary and industry leader. Give hope and transform lives.',
  },
  ccs: {
    title: 'College of Computer Studies',
    subtitle: 'Mission & Vision',
    mission:
      'We envision being the hub of quality, globally-competitive and socially-responsive information technology education.',
    vision: {
      intro: 'We commit to continuously:',
      points: [
        'Offer relevant programs that mold well-rounded computing professionals',
        'Engage in accreditation and quality standards;',
        'Facilitate in building an IT-enabled nation.',
      ],
    },
  },
};

// --- Dean's Message Data ---
export const deansMessageData = {
  header: {
    subtitle: 'Leadership',
    title: "Dean's Message",
  },
  paragraphs: [
    "As the Dean of our esteemed college, we're thrilled to have you here. I am committed to fostering a supportive and dynamic learning environment where you can thrive.",
    'Explore the many opportunities available, from internships to hackathons, to gain valuable real-world experience and develop your skills. We encourage active participation and collaboration – your voice matters!',
    "We're here to help you succeed in this ever-evolving field. Best wishes for an amazing academic journey!",
  ],
  signature: {
    name: 'Mr. Neil Basabe',
    role: 'Dean - UC Main CSS',
  },
};

// --- Upcoming Events Data ---
export const upcomingEventsData = {
  header: {
    title: 'Upcoming Events',
    year: '2026',
  },
  events: [
    {
      id: 1,
      title: 'Acquaintance Party',
      date: '11 August - 5:00 PM',
      location: 'SM Seaside City Cebu',
      image:
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'CCS Days',
      date: '25 February - 8:00 AM',
      location: 'University of Cebu - Main Campus',
      image:
        'https://images.unsplash.com/photo-1540575861501-7ce0e22022f9?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'UC Intramurals',
      date: '12 March - 7:00 AM',
      location: 'University of Cebu - Main Campus',
      image:
        'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'Programming Competition',
      date: '15 April - 9:00 AM',
      location: 'CCS Laboratory',
      image:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    },
  ],
};

// --- Past Events Data ---
export const pastEventsData = {
  header: {
    title: 'Past Events',
    year: '2024',
  },
  events: [
    {
      id: 1,
      title: '60th Year of UC Intramurals',
      location: 'University of Cebu Main Campus',
      date: { month: 'November', day: '20' },
      description:
        'One of the most awaited events of every UCLan is the annual celebration of Intramurals, and this year is no other. An event where all college departments battle each other to stand above the rest; an event that allows UCLanians to showcase their talents and skills...',
      image:
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'CCS Acquaintance Party: A Night of Elegance',
      location: 'SM Seaside City Cebu',
      date: { month: 'November', day: '16' },
      description:
        'On November 16, 2024, the CCS Acquaintance Party brought together students, faculty, and alumni at SM Seaside City Cebu for a night inspired by the timeless allure of the Old Money theme.',
      image:
        'https://images.unsplash.com/photo-1540575861501-7ce0e22022f9?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 3,
      title: '10th ICT Congress',
      location: 'SM Seaside City Cebu',
      date: { month: 'April', day: '12' },
      description:
        "At the 10th ICT Congress 2024, UC CCS students took over SM Seaside's Sky Hall with pure energy, coding battles, groundbreaking ideas, and next-level Tech talks. The day was packed with powerful discussions on AI, cybersecurity, digital transformation, and the...",
      image:
        'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2069&auto=format&fit=crop',
    },
  ],
};
// --- Organization Section Data ---
export interface Member {
  name: string;
  role: string;
  image: string;
  socials?: { email?: string; github?: string };
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
    subtitle: 'The heartbeat of digital innovation',
    title: {
      normal: 'Our',
      highlight: 'Organization',
    },
  },
  tabs: [
    {
      id: 'psits',
      label: 'PSITS',
      title: 'Philippine Society of I.T. Students',
      description:
        'The primary student organization for Information Technology students, focusing on technical excellence and professional development.',
      content:
        'PSITS serves as the umbrella organization for all IT students, providing a platform for growth, collaboration, and innovation through various technical workshops, seminars, and networking events.',
      image:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
      advisors: [
        {
          name: 'Dr. Jane Doe',
          role: 'Chief Advisor',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
          socials: { email: 'jane@example.com' },
        },
      ],
      officers: [
        {
          name: 'Jacinth Cedric Barral',
          role: 'President',
          image:
            'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop',
          socials: { email: 'jacinth@example.com', github: 'jacinth' },
        },
        {
          name: 'James Doe',
          role: 'Vice President',
          image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
          socials: { email: 'james@example.com', github: 'james' },
        },
      ],
      developers: [
        {
          name: 'John Smith',
          role: 'Lead Developer',
          image:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
          socials: { github: 'johnsmith' },
        },
      ],
      volunteers: [
        {
          name: 'Alice Johnson',
          role: 'Event Volunteer',
          image:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1974&auto=format&fit=crop',
        },
      ],
    },
  ],
};
