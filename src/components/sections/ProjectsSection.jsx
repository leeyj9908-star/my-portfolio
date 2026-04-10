import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../utils/supabase';
import StatefulButton from '../StatefulButton';

/**
 * AutoHighlightText — 뷰포트 진입 시 자동으로 좌→우 하이라이트 스윕 + 무한 shimmer
 */
function AutoHighlightText({ children }) {
  return (
    <span className="relative inline-block">
      {/* 뷰포트 진입 시 언더라인 스윕 (한 번) */}
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-0 h-[3px] rounded-full"
        style={{ background: 'linear-gradient(90deg, #ffffff, #6AA8D4)' }}
        initial={{ width: '0%' }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {/* 무한 shimmer */}
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-0 h-[3px] w-1/3 rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }}
        animate={{ x: ['-100%', '400%'] }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
      />
      {/* 텍스트 배경 글로우 (뷰포트 진입 시) */}
      <motion.span
        aria-hidden
        className="absolute -inset-x-2 -inset-y-1 rounded-lg pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(106,168,212,0.18), transparent 70%)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

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
    is_featured: true,
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
    is_featured: true,
  },
];

function FeaturedCard({ project }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const thumbUrl = project.thumbnail || (project.url ? `${THUMB_BASE}${project.url}` : null);

  return (
    <div className="card bg-base-200 border border-white/10 hover:-translate-y-1 hover:border-secondary/40 transition-all duration-300 overflow-hidden h-[340px] flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-[168px] flex-shrink-0 bg-base-300">
        {!imgLoaded && !imgError && (
          <div className="skeleton w-full h-full absolute inset-0" />
        )}
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
      <div className="card-body p-4 flex flex-col flex-1 overflow-hidden">
        <h3 className="card-title text-sm font-bold text-base-content truncate">{project.title}</h3>
        <p className="text-xs text-base-content/50 line-clamp-2 mb-2">{project.description}</p>
        <div className="flex flex-wrap gap-1 overflow-hidden max-h-[40px]">
          {(project.tech_stack || []).slice(0, 4).map((tech) => (
            <span key={tech} className="badge badge-outline badge-xs text-secondary border-secondary/30">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_featured', true)
        .order('order_index', { ascending: true })
        .limit(3);

      if (!error && data && data.length > 0) {
        setFeatured(data);
      } else {
        setFeatured(FALLBACK_PROJECTS);
      }
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  return (
    <section className="bg-base-200 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3">
            <AutoHighlightText>
              <span className="bg-gradient-to-r from-[#FFFFFF] to-[#6AA8D4] bg-clip-text text-transparent">
                Projects
              </span>
            </AutoHighlightText>
          </h2>
          <p className="text-base-content/50">대표 프로젝트를 소개합니다.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card bg-base-200 border border-white/10 h-[340px]">
                  <div className="skeleton w-full h-[168px]" />
                  <div className="card-body p-4 gap-2">
                    <div className="skeleton h-4 w-3/5" />
                    <div className="skeleton h-3 w-full" />
                    <div className="skeleton h-3 w-4/5" />
                  </div>
                </div>
              ))
            : featured.map((project) => (
                <FeaturedCard key={project.id} project={project} />
              ))}
        </div>

        <div className="flex justify-center">
          <StatefulButton onClick={() => navigate('/projects')}>
            전체 보기
          </StatefulButton>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
