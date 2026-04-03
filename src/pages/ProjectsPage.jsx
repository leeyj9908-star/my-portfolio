import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Button,
  Skeleton,
  Stack,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
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
    tech_stack: ['React', 'MUI', 'Supabase', 'Vite'],
    thumbnail: 'https://picsum.photos/seed/portfolio-web/600/338',
    order_index: 2,
  },
];

const CARD_HEIGHT = 380;
const IMG_HEIGHT = 180;
const CONTENT_HEIGHT = CARD_HEIGHT - IMG_HEIGHT - 60; // 60 = CardActions height

function ProjectCard({ project }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const thumbUrl = project.thumbnail
    || (project.url ? `${THUMB_BASE}${project.url}` : null);

  return (
    <Card
      sx={{
        height: CARD_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
        overflow: 'hidden',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(139,115,85,0.2)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* 고정 높이 썸네일 */}
      <Box sx={{ position: 'relative', height: IMG_HEIGHT, flexShrink: 0, bgcolor: 'action.hover' }}>
        {!imgLoaded && !imgError && (
          <Skeleton variant="rectangular" width="100%" height={IMG_HEIGHT} sx={{ position: 'absolute', top: 0, left: 0 }} />
        )}
        {thumbUrl && !imgError ? (
          <CardMedia
            component="img"
            image={thumbUrl}
            alt={project.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            sx={{
              width: '100%',
              height: IMG_HEIGHT,
              objectFit: 'cover',
              display: imgLoaded ? 'block' : 'none',
            }}
          />
        ) : imgError ? (
          <Box sx={{ width: '100%', height: IMG_HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.selected' }}>
            <Typography variant="caption" color="text.disabled">No Preview</Typography>
          </Box>
        ) : null}
      </Box>

      {/* 고정 높이 콘텐츠 */}
      <CardContent sx={{ height: CONTENT_HEIGHT, overflow: 'hidden', pb: '8px !important', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1" fontWeight={700} noWrap sx={{ mb: 0.5 }}>
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1.5,
            lineHeight: 1.5,
            height: '3em',
            flexShrink: 0,
          }}
        >
          {project.description}
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ overflow: 'hidden', maxHeight: 52 }}>
          {(project.tech_stack || []).map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                fontSize: '0.68rem',
                height: 20,
                bgcolor: 'secondary.light',
                color: 'text.primary',
                fontWeight: 500,
                mb: 0.5,
              }}
            />
          ))}
        </Stack>
      </CardContent>

      {/* 하단 버튼 */}
      <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1, mt: 'auto' }}>
        {project.url && (
          <Button
            size="small"
            variant="contained"
            endIcon={<OpenInNewIcon sx={{ fontSize: '14px !important' }} />}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontSize: '0.72rem', fontWeight: 600, py: 0.5 }}
          >
            View Details
          </Button>
        )}
        {project.github_url && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<GitHubIcon sx={{ fontSize: '14px !important' }} />}
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontSize: '0.72rem', py: 0.5 }}
          >
            GitHub
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

function ProjectCardSkeleton() {
  return (
    <Card sx={{ height: CARD_HEIGHT, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none', overflow: 'hidden' }}>
      <Skeleton variant="rectangular" width="100%" height={IMG_HEIGHT} />
      <CardContent>
        <Skeleton variant="text" width="55%" height={26} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="75%" sx={{ mb: 1.5 }} />
        <Stack direction="row" spacing={0.5}>
          <Skeleton variant="rounded" width={58} height={20} />
          <Skeleton variant="rounded" width={46} height={20} />
          <Skeleton variant="rounded" width={66} height={20} />
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Skeleton variant="rounded" width={96} height={28} />
        <Skeleton variant="rounded" width={72} height={28} />
      </CardActions>
    </Card>
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
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          제가 작업한 프로젝트들을 소개합니다.
        </Typography>

        <Grid container spacing={3} alignItems="stretch">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: 'flex' }}>
                  <ProjectCardSkeleton />
                </Grid>
              ))
            : projects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id} sx={{ display: 'flex' }}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProjectsPage;
