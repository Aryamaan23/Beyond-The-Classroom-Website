// Static content data for Beyond the Classroom website

export const highlights = [
  {
    icon: 'globe',
    title: 'On-Ground Impact',
    description: 'Hands-on projects and upskilling workshops that bridge the gap between education and employability'
  },
  {
    icon: 'users',
    title: 'Leadership Development',
    description: 'Dialogues, summits, and mentorship programs crafted to nurture the next generation of ethical, resilient, and impact-driven leaders'
  },
  {
    icon: 'megaphone',
    title: 'Youth Voice',
    description: 'A platform to amplify youth stories through podcasts, interviews, media features, and digital content — enabling young changemakers to influence conversations across India'
  }
];

export const collaborations = [
  {
    id: 'collaborations-row-1',
    logoRow: [
      {
        name: 'Government of Rajasthan',
        logo: '/images/collaborations/government-of-rajasthan.png',
        url: 'https://rajasthan.gov.in',
      },
      {
        name: 'Udayan Care',
        logo: '/images/collaborations/udayan-care.png',
        url: 'https://udayancare.org',
      },
      {
        name: 'Young Minds',
        logo: '/images/collaborations/young-minds.png',
        url: '',
      },
      {
        name: 'Break The Ice',
        logo: '/images/collaborations/break-the-ice.png',
        url: '',
      },
      {
        name: 'Public Policy India',
        logo: '/images/collaborations/public-policy-india.png',
        url: 'https://www.linkedin.com/company/public-policy-india/',
      },
      {
        name: '180 Degrees Consulting',
        logo: '/images/collaborations/180-degrees-consulting.png',
        url: 'https://180dc.org/',
      },
    ],
  },
  {
    id: 'vandana-niti-row',
    rowLogos: [
      {
        logo: '/images/collaborations/vandana-child-care-trust.png',
        alt: 'Vandana Child Care Trust, Prayagraj',
        label: 'Vandana Child Care Trust',
        url: '',
      },
      {
        logo: '/images/collaborations/niti-aim-acic-partners.png',
        alt: 'NITI Aayog, Atal Innovation Mission, and ACIC SGTU',
        label: 'NITI Aayog · AIM · ACIC SGTU',
        url: 'https://www.niti.gov.in',
        span: 'wide' as const,
      },
    ],
  },
];

export const newsletterConfig = {
  /** Substack embed URL, e.g. https://yourpublication.substack.com/embed — set via VITE_SUBSTACK_EMBED_URL */
  substackEmbedUrl: import.meta.env.VITE_SUBSTACK_EMBED_URL || '',
  /** Public Substack / newsletter page — set via VITE_SUBSTACK_PROFILE_URL */
  substackProfileUrl: import.meta.env.VITE_SUBSTACK_PROFILE_URL || '',
};

export const partnerVision = {
  heading: 'Partner With Us',
  subheading: 'Our Vision',
  vision: 'We envision strategic partnerships with government bodies and UN agencies to scale youth leadership, governance exposure, and capacity building across India.',
  description: 'Beyond the Classroom seeks to collaborate with ministries, state governments, district administrations, UN agencies, and multilateral institutions to co-design and deliver programmes that build institutional capacity and empower young people at the grassroots.',
  partnershipTypes: [
    {
      title: 'Government Bodies',
      description: 'State governments, district administrations, and panchayati raj institutions for policy-aligned youth engagement and governance exposure.',
    },
    {
      title: 'UN & Multilateral Agencies',
      description: 'UN entities, development banks, and international organisations for programme design, funding, and scaling best practices.',
    },
    {
      title: 'NGOs & Foundations',
      description: 'Non-profits and philanthropic organisations aligned with youth development, education, and sustainable development goals.',
    },
  ],
};

export const founderMessages = [
  {
    name: 'Harsimran Passi',
    role: 'Founder & Director',
    photo: '/images/team/harsimran-passi.png',
    message: 'Beyond the Classroom started with a simple belief: that every young person has the potential to lead — they just need the right exposure, skills, and community. What began in college classrooms has grown into a movement touching lives across districts, panchayats, and institutions. Our mission is to bridge the gap between ambition and opportunity, and we are just getting started.',
  },
  {
    name: 'Aparajita Jha',
    role: 'Co-founder',
    photo: '/images/team/aparajita-jha.png',
    message: 'As co-founder, I believe in creating spaces where young people can discover their voice and purpose. Beyond the Classroom is more than a programme — it is a community where ambition meets opportunity, and every participant becomes a part of something larger than themselves.',
  },
  {
    name: 'Aryamaan Pandey',
    role: 'Executive Director',
    photo: '/images/team/aryamaan-pandey.png',
    message: 'Leadership isn’t built in conference rooms — it’s forged on the ground. Our work at Beyond the Classroom is about creating pathways for young people who have the drive but lack the structured exposure. Together with our partners and communities, we are building India’s next generation of grounded, policy-aware, action-oriented leaders.',
  },
];

export const mentors = [
  {
    name: 'Public Policy India',
    role: 'Knowledge Partner',
    logo: '/images/collaborations/public-policy-india.png',
    description:
      'Mentorship and policy-learning support for students exploring public systems, governance, and civic leadership.',
    url: 'https://www.linkedin.com/company/public-policy-india/',
  },
  {
    name: '180 Degrees Consulting',
    role: 'Impact Consulting Mentor',
    logo: '/images/collaborations/180-degrees-consulting.png',
    description:
      'Structured consulting exposure and practical problem-solving pathways for youth entering impact careers.',
    url: 'https://180dc.org/',
  },
];

export const impactMetrics = {
  livesTouched: 1500,
  workshops: 30,
  partners: 30,
  programs: 4,
  sdgsFocused: 3
};

export const teamMembers = [
  {
    name: 'Priya Sharma',
    role: 'Founder & Director',
    photo: '/images/team/member-1.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    name: 'Rahul Verma',
    role: 'Program Manager',
    photo: '/images/team/member-2.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    name: 'Ananya Gupta',
    role: 'Community Lead',
    photo: '/images/team/member-3.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    name: 'Arjun Patel',
    role: 'Partnerships Coordinator',
    photo: '/images/team/member-4.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com'
    }
  }
];

export const timelineEvents = [
  {
    date: '2020',
    title: 'The Beginning',
    description: 'Started with small community projects focused on education and skill development in Delhi NCR.',
    image: '/images/timeline/event-1.jpg'
  },
  {
    date: '2021',
    title: 'Expanding Reach',
    description: 'Launched women empowerment initiatives and digital literacy programs, touching 500+ lives.',
    image: '/images/timeline/event-2.jpg'
  },
  {
    date: '2022',
    title: 'Fellowship Ecosystem',
    description: 'Introduced structured fellowship programs and mentorship opportunities for emerging leaders.',
    image: '/images/timeline/event-3.jpg'
  },
  {
    date: '2023',
    title: 'Strategic Partnerships',
    description: 'Formed partnerships with 20+ organizations to amplify impact and create sustainable change.',
    image: '/images/timeline/event-4.jpg'
  }
];

export const projects = [
  {
    id: '1',
    title: 'Financial Literacy',
    category: 'education' as const,
    image: '/images/projects/financial-literacy.png',
    impactSummary: 'Workshops on different types of investment, savings, and financial planning for youth'
  },
  {
    id: '2',
    title: 'Digital Literacy',
    category: 'education' as const,
    image: '/images/projects/digital-literacy.png',
    impactSummary: 'Empowerment grows when opportunity is made accessible for all through technology'
  },
  {
    id: '3',
    title: 'Civic & Public Policy',
    category: 'leadership' as const,
    image: '/images/projects/civic-public-policy.png',
    impactSummary: 'Shedding light on existing but less talked about policies that affect youth'
  },
  {
    id: '4',
    title: 'Women\'s Health & Hygiene',
    category: 'women' as const,
    image: '/images/projects/womens-health-hygiene.png',
    impactSummary: 'Awareness programs on health, hygiene, and government schemes offering support for women'
  },
  {
    id: '5',
    title: 'Career Readiness Bootcamp',
    category: 'education' as const,
    image: '/images/projects/career-readiness-bootcamp.png',
    impactSummary: 'Helping young people discover pathways, build resumes, and prepare for interviews'
  },
  {
    id: '6',
    title: 'Youth Leadership Circles',
    category: 'leadership' as const,
    image: '/images/projects/youth-leadership-circles.png',
    impactSummary: 'Small-group leadership labs fostering problem-solving, clarity, and public leadership'
  }
];

export const articles = [
  {
    id: '1',
    title: 'Building Tomorrow\'s Leaders Today',
    thumbnail: '/images/media/article-1.jpg',
    excerpt: 'How Beyond the Classroom is reshaping youth leadership through experiential learning and community engagement.',
    url: 'https://example.com/article-1',
    publishDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Empowering Women Through Grassroots Action',
    thumbnail: '/images/media/article-2.jpg',
    excerpt: 'A deep dive into our women empowerment initiatives and their transformative impact on local communities.',
    url: 'https://example.com/article-2',
    publishDate: '2024-02-20'
  },
  {
    id: '3',
    title: 'The Power of Youth Voice in Social Change',
    thumbnail: '/images/media/article-3.jpg',
    excerpt: 'Exploring how young changemakers are driving meaningful conversations and creating lasting impact.',
    url: 'https://example.com/article-3',
    publishDate: '2024-03-10'
  },
  {
    id: '4',
    title: 'Sustainability Starts at the Grassroots',
    thumbnail: '/images/media/article-4.jpg',
    excerpt: 'Our approach to environmental education and sustainable community development.',
    url: 'https://example.com/article-4',
    publishDate: '2024-04-05'
  },
  {
    id: '5',
    title: 'From Classroom to Community Impact',
    thumbnail: '/images/media/article-5.jpg',
    excerpt: 'Success stories from our fellowship programs and the leaders they\'ve created.',
    url: 'https://example.com/article-5',
    publishDate: '2024-05-12'
  },
  {
    id: '6',
    title: 'Digital Literacy: Bridging the Gap',
    thumbnail: '/images/media/article-6.jpg',
    excerpt: 'How our digital literacy programs are opening new opportunities for underserved communities.',
    url: 'https://example.com/article-6',
    publishDate: '2024-06-18'
  }
];

export const podcastEpisodes = [
  {
    title: 'Episode 1: The Journey Begins',
    description: 'Our founder shares the inspiration behind Beyond the Classroom and the vision for creating a self-sustaining leadership ecosystem.',
    embedUrl: 'https://open.spotify.com/embed/episode/example1',
    publishDate: '2024-01-10'
  },
  {
    title: 'Episode 2: Women Leading Change',
    description: 'Conversations with women leaders who are breaking barriers and creating impact in their communities.',
    embedUrl: 'https://open.spotify.com/embed/episode/example2',
    publishDate: '2024-02-15'
  },
  {
    title: 'Episode 3: Youth Voices Matter',
    description: 'Young changemakers discuss their projects, challenges, and the future they\'re building.',
    embedUrl: 'https://open.spotify.com/embed/episode/example3',
    publishDate: '2024-03-20'
  },
  {
    title: 'Episode 4: Sustainable Solutions',
    description: 'Exploring innovative approaches to environmental challenges through grassroots action.',
    embedUrl: 'https://open.spotify.com/embed/episode/example4',
    publishDate: '2024-04-25'
  }
];

export const programs = [
  {
    title: 'Dholpur Drive and District Immersion',
    description:
      'An intensive district-level learning programme that places youth in real governance and community contexts across Dholpur. Participants engage with local institutions and convert field observations into practical action plans.',
    image: '/images/programs/dholpur-drive/01.png',
    ctaText: 'Explore Immersion',
    ctaLink: '/programs/dholpur-drive',
    features: [
      'District Office and Panchayat Exposure',
      'Field Problem Mapping and Documentation',
      'Community Conversations with Stakeholders',
      'Policy Observation and Reflection Notes',
      'Action Plan Presentation and Feedback'
    ]
  },
  {
    title: 'Bharat Yuva Capacity Building Programme',
    description:
      'A flagship capacity-building pathway by Beyond the Classroom in collaboration with ACIC-SGT University and Government partners. The programme develops policy-aware, grounded, and execution-focused youth leaders.',
    image: '/images/programs/bharat-yuva-2026-1.png',
    ctaText: 'View Programme',
    ctaLink: '/programs/bharat-yuva-2026',
    features: [
      'Governance and Public Policy Foundations',
      'District Administration and Systems Exposure',
      'Leadership and Communication Labs',
      'Grassroots Problem Solving Simulations',
      'Mentoring by Practitioners and Experts'
    ]
  },
  {
    title: 'Udayan Care Initiative',
    description:
      'A focused initiative designed with Udayan Care to strengthen youth readiness through mentorship, life-skills, and career-direction support. The programme emphasizes confidence, continuity, and long-term pathways.',
    image: '/images/programs/udayan-care/01.png',
    ctaText: 'Know More',
    ctaLink: '/programs/udayan-care-initiative',
    features: [
      'Mentorship and Personal Guidance',
      'Career and Employability Readiness',
      'Life Skills and Decision-Making Support',
      'Leadership Orientation Workshops',
      'Community Participation and Reflection'
    ]
  },
  {
    title: '180 Degrees Consulting SRMIST KTR Chennai Summit',
    description:
      'A summit-led leadership and consulting exposure initiative in Chennai, designed to connect youth with problem-solving frameworks, impact consulting perspectives, and collaborative action.',
    image: '/images/programs/180dc-chennai/01.png',
    ctaText: 'Know More',
    ctaLink: '/programs/180dc-chennai-summit',
    features: [
      'Summit Sessions with Practitioners',
      'Youth Consulting and Case Discussions',
      'Cross-Campus Collaboration and Networking',
      'Leadership and Public Impact Dialogues',
      'Action-Oriented Learning for Changemakers'
    ]
  },
];

export const missionStatement = 'Empower young people and women to turn their ideas into meaningful, lasting change through confidence, skills, and opportunities.';

export const visionStatement = 'We believe in a world where every young person and woman — no matter their background — has the confidence, skills, and opportunities to create change that truly matters.';

export const organizationDescription = 'At Beyond the Classroom, we see education not just as what\'s taught, but what\'s lived — confidence, skills, and opportunities that prepare students for life. As a nonprofit organization, we work to empower students across India with the tools they need to thrive in school, work, and life. Through initiatives like workshops, camps, and digital learning platforms, we aim to equip the next generation of changemakers with employability skills, critical thinking, and self-belief.';

export const heroTagline = 'Empowering youth with confidence, skills, and opportunities that prepare students for life beyond textbooks.';

export const problemStatement = {
  title: 'The Problem We\'re Solving',
  subtitle: 'India Doesn\'t Have a Talent Gap — It has a Skills Gap',
  statistic: '80% of Indian graduates are unemployable',
  source: 'India Skills Report, 2024',
  currentEducation: 'Schools focus on rote learning, not real-world problem solving.',
  whatNeeded: 'Skill-holders with employability skills and critical thinking.'
};

export const sdgFocus = [
  {
    number: 4,
    title: 'Quality Education',
    description: 'Ensuring inclusive and equitable quality education for all'
  },
  {
    number: 5,
    title: 'Gender Equality',
    description: 'Empowering women and promoting gender equality'
  },
  {
    number: 10,
    title: 'Reduced Inequalities',
    description: 'Reducing inequality within and among communities'
  }
];
