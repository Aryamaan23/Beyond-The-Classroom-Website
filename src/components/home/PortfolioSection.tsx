import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button, LazyImage } from '../common';
import { projects as fallbackProjects } from '../../data/content';
import { useProjects } from '../../hooks/useGoogleDriveContent';

type ProjectCategory = 'all' | 'education' | 'women' | 'sustainability' | 'leadership';

interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  image: string;
  impactSummary: string;
}

const categories: { value: ProjectCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'education', label: 'Education' },
  { value: 'women', label: 'Women' },
  { value: 'sustainability', label: 'Sustainability' },
  { value: 'leadership', label: 'Leadership' },
];


function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Fetch projects from Google Drive with fallback to static data
  const { data: fetchedProjects, loading, error } = useProjects(fallbackProjects);
  
  // Ensure we always have projects to display - use fallback if Google Drive returns empty
  const projects = fetchedProjects.length > 0 ? fetchedProjects : fallbackProjects;

  // Debug logging
  console.log('PortfolioSection Debug:', {
    fetchedProjects: fetchedProjects.length,
    fallbackProjects: fallbackProjects.length,
    finalProjects: projects.length,
    loading,
    error,
    categories: projects.map(p => p.category)
  });

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const handleProjectClick = (project: Project) => {
    console.log('Project clicked:', project);
    const projectIndex = filteredProjects.findIndex(p => p.id === project.id);
    setCurrentProjectIndex(projectIndex);
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    const nextIndex = (currentProjectIndex + 1) % filteredProjects.length;
    setCurrentProjectIndex(nextIndex);
    setSelectedProject(filteredProjects[nextIndex]);
  };

  const handlePrevProject = () => {
    const prevIndex = currentProjectIndex === 0 ? filteredProjects.length - 1 : currentProjectIndex - 1;
    setCurrentProjectIndex(prevIndex);
    setSelectedProject(filteredProjects[prevIndex]);
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-secondary font-semibold text-sm tracking-wider uppercase mb-3">Grassroots Impact</span>
          <h2 id="projects-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Our Projects
            {loading && <span className="text-sm font-normal text-gray-500 ml-2">(Loading...)</span>}
          </h2>
          <div className="w-16 h-1 bg-secondary rounded-full mx-auto mb-4" aria-hidden="true" />
        </div>
        <p className="text-sm sm:text-base text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
          Explore our grassroots initiatives making real impact in communities
          {error && <span className="block text-red-500 text-xs mt-1">Using cached content</span>}
        </p>

        {/* Filter Buttons */}
        <div 
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              aria-pressed={selectedCategory === category.value}
              aria-label={`Filter by ${category.label}`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Project Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          role="list"
          aria-label="Project cards"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              role="listitem"
              style={{
                animation: `fadeInUp 400ms ease-out ${index * 50}ms both`,
              }}
            >
              <ProjectCard project={project} onClick={() => handleProjectClick(project)} />
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <>
            {console.log('Rendering modal for:', selectedProject)}
            <ProjectModal 
              project={selectedProject} 
              onClose={handleCloseModal}
              onNext={handleNextProject}
              onPrev={handlePrevProject}
              currentIndex={currentProjectIndex}
              totalProjects={filteredProjects.length}
            />
          </>
        )}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <article 
      className="group relative bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover border border-gray-100 hover:border-primary/10 transition-all duration-300 ease-out transform hover:scale-[1.02] cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${project.title}`}
    >
      {/* Project Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <LazyImage
          src={project.image}
          alt={`${project.title} - ${project.impactSummary}`}
          className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        
        {/* Hover Overlay */}
        <div 
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-white text-lg font-semibold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">View Details</span>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm">
          {project.impactSummary}
        </p>
      </div>
    </article>
  );
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalProjects: number;
}

function ProjectModal({ project, onClose, onNext, onPrev, currentIndex, totalProjects }: ProjectModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const modalContent = (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden rounded-t-lg bg-slate-50">
          {/* Navigation Arrows */}
          {totalProjects > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Previous project"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Next project"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close project details"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain p-4 sm:p-6"
          />
        </div>

        {/* Project Details */}
        <div className="p-6 sm:p-8">
          {/* Project Counter */}
          {totalProjects > 1 && (
            <div className="text-center mb-4">
              <span className="text-sm text-gray-500">
                {currentIndex + 1} of {totalProjects} projects
              </span>
            </div>
          )}

          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full capitalize">
              {project.category}
            </span>
          </div>

          <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {project.title}
          </h2>

          <div className="prose prose-lg max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Impact Summary</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {project.impactSummary}
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">About This Project</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              This initiative is part of our commitment to creating grassroots impact through community-driven programs. 
              We work directly with local communities to identify needs and develop sustainable solutions that create 
              lasting change.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Involved</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Interested in participating or learning more about this project? We welcome volunteers, partners, 
              and supporters who share our vision for community empowerment and social impact.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" href="/contact">
              Join This Project
            </Button>
            <Button variant="outline" size="lg" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default PortfolioSection;
