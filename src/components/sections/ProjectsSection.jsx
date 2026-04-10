import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  Skeleton,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabase';

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
    tech_stack: ['React', 'MUI', 'Supabase', 'Vite'],
    thumbnail: 'https://picsum.photos/seed/portfolio-web/600/338',
    order_index: 2,
    is_featured: true,
  },
];

const CARD_HEIGHT = 340;
const IMG_HEIGHT = 168;

function FeaturedCard({ project }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const thumbUrl = project.thumbnail || (project.url ? `${THUMB_BASE}${project.url}` : null);

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
          boxShadow: '0 8px 32px rgba(106,168,212,0.2)',
          transform: 'translateY(-4px)',
        },
      }}
    >
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
            sx={{ width: '100%', height: IMG_HEIGHT, objectFit: 'cover', display: imgLoaded ? 'block' : 'none' }}
          />
        ) : imgError ? (
          <Box sx={{ width: '100%', height: IMG_HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.selected' }}>
            <Typography variant="caption" color="text.disabled">No Preview</Typography>
          </Box>
        ) : null}
      </Box>
      <CardContent sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle1" fontWeight={700} noWrap sx={{ mb: 0.5 }}>
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '3em', lineHeight: 1.5 }}>
          {project.description}
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ overflow: 'hidden', maxHeight: 44 }}>
          {(project.tech_stack || []).slice(0, 4).map((tech) => (
            <Chip key={tech} label={tech} size="small" sx={{ fontSize: '0.68rem', height: 20, bgcolor: 'secondary.light', fontWeight: 500, mb: 0.5 }} />
          ))}
        </Stack>
      </CardContent>
    </Card>
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
    <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} gutterBottom color="text.primary">
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
          대표 프로젝트를 소개합니다.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                    <Skeleton variant="rectangular" sx={{ paddingTop: '56.25%' }} />
                    <CardContent>
                      <Skeleton variant="text" width="60%" height={28} />
                      <Skeleton variant="text" width="100%" />
                      <Skeleton variant="text" width="80%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : featured.length === 0
            ? (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.disabled" textAlign="center" sx={{ py: 4 }}>
                    프로젝트를 준비 중입니다.
                  </Typography>
                </Grid>
              )
            : featured.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id} sx={{ display: 'flex' }}>
                  <FeaturedCard project={project} />
                </Grid>
              ))}
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/projects')}
            sx={{ px: 5 }}
          >
            전체 보기
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
