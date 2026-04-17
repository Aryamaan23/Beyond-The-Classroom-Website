import { MissionVision, Timeline, TeamSection, type TeamMember } from '../components/about';
import { PageTransition } from '../components/common';
import { ORG_INSTAGRAM, ORG_LINKEDIN, linkedinSearchUrl } from '../data/teamSocialDefaults';

// Actual organizational content
const missionData = {
  mission: "To build a community of young changemakers and empowered women by providing access to skills, mentorship, and opportunities that create grassroots impact and long-term transformation.",
  vision: "To create a self-sustaining leadership ecosystem where young people and women from diverse backgrounds are empowered with the skills, networks, and opportunities to create transformative impact — locally and globally.",
  description: "Beyond the Classroom is a youth-led movement shaping India's next generation of leaders. We work at the intersection of education, leadership, and community development. Through workshops, fellowships, and storytelling platforms, we create spaces where young people and women can learn, lead, and thrive."
};

const timelineEvents = [
  {
    date: "The Beginning",
    title: "College Classrooms",
    description: "What started as a small initiative in college classrooms focused on experiential learning and community engagement.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
  },
  {
    date: "Growth",
    title: "Building the Fellowship Ecosystem",
    description: "Launched structured fellowship programs, masterclasses, and mentorship opportunities for emerging leaders.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop"
  },
  {
    date: "Partnerships",
    title: "Strategic Collaborations",
    description: "Formed partnerships with NGOs, foundations, and educational institutions to amplify our impact.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
  },
  {
    date: "Today",
    title: "National Movement",
    description: "Grown into a national movement impacting 1500+ lives across schools, colleges, and rural communities.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
  }
];

/** Replace `linkedinSearchUrl(...)` results with each person’s `/in/...` URL when you have them. */
const teamMembers: TeamMember[] = [
  {
    name: 'Harsimran Passi',
    role: 'Founder & Managing Director',
    photo: '/images/team/harsimran-passi.png',
    socialLinks: {
      linkedin: ORG_LINKEDIN,
      instagram: ORG_INSTAGRAM,
    },
  },
  {
    name: 'Aparajita Jha',
    role: 'Co-Founder',
    photo: '/images/team/aparajita-jha.png',
    socialLinks: {
      linkedin: linkedinSearchUrl('Aparajita Jha'),
      instagram: ORG_INSTAGRAM,
    },
  },
  {
    name: 'Aryamaan Pandey',
    role: 'Executive Director',
    photo: '/images/team/aryamaan-pandey.png',
    socialLinks: {
      linkedin: linkedinSearchUrl('Aryamaan Pandey'),
      instagram: ORG_INSTAGRAM,
    },
  },
  {
    name: 'Noyal Jonnalagadda',
    role: 'Chief Technology Officer',
    photo: '/images/team/noyal-jonnalagadda.png',
    socialLinks: {
      linkedin: linkedinSearchUrl('Noyal Jonnalagadda'),
      instagram: ORG_INSTAGRAM,
    },
  },
  {
    name: 'Krishna Mishra',
    role: 'Marketing Lead',
    photo: '/images/team/krishna-mishra.png',
    socialLinks: {
      linkedin: linkedinSearchUrl('Krishna Mishra'),
      instagram: ORG_INSTAGRAM,
    },
  },
  {
    name: 'Utkarsh Gupta',
    role: "Founder's Office",
    photo: '/images/team/utkarsh-gupta.png',
    socialLinks: {
      linkedin: linkedinSearchUrl('Utkarsh Gupta'),
      instagram: ORG_INSTAGRAM,
    },
  },
  {
    name: 'Tanuj Samaddar',
    role: 'State Program Lead (Delhi)',
    photo: '/images/team/tanuj-samaddar.png',
    socialLinks: {
      linkedin: linkedinSearchUrl('Tanuj Samaddar'),
      instagram: ORG_INSTAGRAM,
    },
  },
  {
    name: 'Sahanasri Ashok',
    role: 'State Program Lead (Tamil Nadu)',
    photo: '/images/team/sahanasri-ashok.png',
    socialLinks: {
      linkedin: linkedinSearchUrl('Sahanasri Ashok'),
      instagram: ORG_INSTAGRAM,
    },
  },
  {
    name: 'Meetangi Juneja',
    role: 'Social Media Lead',
    photo: '/images/team/meetangi-juneja.png',
    socialLinks: {
      linkedin: linkedinSearchUrl('Meetangi Juneja'),
      instagram: ORG_INSTAGRAM,
    },
  },
];

function About() {
  return (
    <PageTransition>
      <div className="About">
        <MissionVision 
          logo="/images/logo.png"
          mission={missionData.mission}
          vision={missionData.vision}
          description={missionData.description}
        />

        <Timeline events={timelineEvents} />
        
        <TeamSection members={teamMembers} />
      </div>
    </PageTransition>
  );
}

export default About;
