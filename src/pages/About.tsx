import { MissionVision, Timeline, TeamSection } from '../components/about';
import { PageTransition } from '../components/common';

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

const teamMembers = [
  {
    name: "Harsimran Passi",
    role: "Founder & Director",
    photo: "/images/team/harsimran-passi.png",
    socialLinks: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com"
    }
  },
  {
    name: "Aparajita Jha",
    role: "Co-founder",
    photo: "/images/team/aparajita-jha.png",
    socialLinks: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  },
  {
    name: "Aryamaan Pandey",
    role: "Executive Director",
    photo: "/images/team/aryamaan-pandey.png",
    socialLinks: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    name: "Krishna Mishra",
    role: "Marketing Director",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    socialLinks: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  }
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
        
        <TeamSection fallbackMembers={teamMembers} />
      </div>
    </PageTransition>
  );
}

export default About;
