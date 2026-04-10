import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const THUMB_BASE = 'https://image.thum.io/get/width/600/crop/338/';

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'ARTSPACE',
    description: '아티스트를 위한 공간 대여 플랫폼. 갤러리·스튜디오·야외 공간을 검색하고 예약할 수 있는 모바일 웹앱.',
    url: 'https://leeyj9908-star.github.io/artspace/',
    github_url: 'https://github.com/leeyj9908-star/artspace',
    tech_stack: ['Next.js', 'TypeScript', 'Supabase', 'GitHub Pages'],
    thumbnail: 'https://picsum.photos/seed/artspace-gallery/600/338',
    order_index: 1,
  },
  {
    id: 2,
    title: 'my-portfolio',
    description: '개인 포트폴리오 웹사이트. 프로젝트 소개, 기술 스택, 방명록 기능을 포함한 SPA.',
    url: 'https://leeyj9908-star.github.io/my-portfolio/',
    github_url: 'https://github.com/leeyj9908-star/my-portfolio',
    tech_stack: ['React', 'daisyUI', 'Supabase', 'Vite'],
    thumbnail: 'https://picsum.photos/seed/portfolio-web/600/338',
    order_index: 2,
  },
];

const CARD_HEIGHT = 380;
const IMG_HEIGHT = 180;

function ProjectCard({ project }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const thumbUrl = project.thumbnail || (project.url ? `${THUMB_BASE}${project.url}` : null);

  return (
    <div className="card bg-base-200 border border-white/10 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col" style={{ height: CARD_HEIGHT }}>
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 bg-base-300" style={{ height: IMG_HEIGHT }}>
        {!imgLoaded && !imgError && <div className="skeleton w-full h-full absolute inset-0" />}
        {thumbUrl && !imgError ? (
          <img
            src={thumbUrl}
            alt={project.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover ${imgLoaded ? 'block' : 'hidden'}`}
          />
        ) : imgError ? (
          <div className="w-full h-full flex items-center justify-center text-base-content/30 text-sm">
            No Preview
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="card-body p-4 flex-1 flex flex-col overflow-hidden">
        <h3 className="font-bold text-base-content truncate">{project.title}</h3>
        <p className="text-sm text-base-content/50 line-clamp-2 mb-2 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1 overflow-hidden max-h-[44px] mb-3">
          {(project.tech_stack || []).map((tech) => (
            <span key={tech} className="badge badge-outline badge-xs border-secondary/30 text-secondary">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-xs flex-1"
            >
              View Details ↗
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-xs border-white/20 text-base-content hover:bg-white/10"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="card bg-base-200 border border-white/10 overflow-hidden" style={{ height: CARD_HEIGHT }}>
      <div className="skeleton w-full" style={{ height: IMG_HEIGHT }} />
      <div className="card-body p-4 gap-3">
        <div className="skeleton h-5 w-3/5" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-4/5" />
        <div className="flex gap-1">
          <div className="skeleton h-4 w-16 rounded-full" />
          <div className="skeleton h-4 w-12 rounded-full" />
        </div>
        <div className="flex gap-2 mt-auto">
          <div className="skeleton h-7 w-full" />
          <div className="skeleton h-7 w-20" />
        </div>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data && data.length > 0) {
        setProjects(data);
      } else {
        setProjects(FALLBACK_PROJECTS);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-base-100 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-[#FFFFFF] to-[#6AA8D4] bg-clip-text text-transparent">
            Projects
          </span>
        </h1>
        <p className="text-base-content/50 mb-10">제가 작업한 프로젝트들을 소개합니다.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)
            : projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
