import React, { useState } from 'react';
import { Github, Play, X, ExternalLink } from 'lucide-react';
import ProjectCarousel from './ProjectCarousel';

interface Project {
  id: string;
  title: string;
  imageFolder: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  video?: string;
  images: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getGoogleDriveId = (url: string) => {
    const regExp = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  return (
    <>
      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-primary/5 group flex flex-col h-full">
        {/* Pass only images to carousel, video is handled by modal */}
        <ProjectCarousel images={project.images} title={project.title} />
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-slate-400 text-sm mb-4 h-20 overflow-hidden line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs font-medium bg-slate-800 text-primary rounded border border-slate-700">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-auto">
            {project.github && project.github !== "" && project.github !== "#" && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 py-2 text-center text-sm font-medium border border-slate-700 rounded-lg hover:bg-slate-800 text-white transition-colors"
                title="Ver código en GitHub"
              >
                <Github size={20} />
              </a>
            )}
            
            {project.video && project.video !== "" && (
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center justify-center gap-2 flex-1 py-2 text-center text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                <Play size={20} />
                <span>Video</span>
              </button>
            )}

            {project.demo && project.demo !== "" && project.demo !== "#" && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 py-2 text-center text-sm font-medium bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors"
              >
                <ExternalLink size={20} />
                <span>Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && project.video && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsVideoModalOpen(false)}>
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">{project.title} - Video</h3>
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="relative aspect-video w-full bg-black">
              {getYoutubeId(project.video) ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYoutubeId(project.video)}?autoplay=1`}
                  title={project.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              ) : getGoogleDriveId(project.video) ? (
                <iframe
                  src={`https://drive.google.com/file/d/${getGoogleDriveId(project.video)}/preview`}
                  width="100%"
                  height="100%"
                  title={project.title}
                  frameBorder="0"
                  allow="autoplay"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              ) : (
                <video 
                  src={project.video} 
                  controls 
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Tu navegador no soporta el elemento de video.
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
