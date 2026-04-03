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
import { supabase } from '../utils/supabase';

const THUMB_BASE = 'https://image.thum.io/get/width/600/crop/338/';

function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);
  const thumbUrl = project.url
    ? `${THUMB_BASE}${project.url}`
    : null;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 'none',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(139,115,85,0.18)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* 16:9 썸네일 */}
      <Box sx={{ position: 'relative', paddingTop: '56.25%', bgcolor: 'action.hover', overflow: 'hidden' }}>
        {thumbUrl && !imgError ? (
          <CardMedia
            component="img"
            image={thumbUrl}
            alt={project.title}
            onError={() => setImgError(true)}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'action.selected',
            }}
          >
            <Typography variant="caption" color="text.disabled">
              No Preview
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom noWrap>
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
            mb: 2,
            minHeight: '2.8em',
          }}
        >
          {project.description}
        </Typography>

        {/* 기술 스택 뱃지 */}
        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
          {(project.tech_stack || []).map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                fontSize: '0.7rem',
                height: 22,
                bgcolor: 'secondary.light',
                color: 'text.primary',
                fontWeight: 500,
                mb: 0.5,
              }}
            />
          ))}
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
        {project.url && (
          <Button
            size="small"
            variant="contained"
            endIcon={<OpenInNewIcon fontSize="small" />}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontSize: '0.75rem', fontWeight: 600 }}
          >
            View Details
          </Button>
        )}
        {project.github_url && (
          <Button
            size="small"
            variant="outlined"
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontSize: '0.75rem' }}
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
    <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
      <Skeleton variant="rectangular" sx={{ paddingTop: '56.25%' }} />
      <CardContent>
        <Skeleton variant="text" width="60%" height={28} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" sx={{ mb: 1.5 }} />
        <Stack direction="row" spacing={0.75}>
          <Skeleton variant="rounded" width={56} height={22} />
          <Skeleton variant="rounded" width={48} height={22} />
          <Skeleton variant="rounded" width={64} height={22} />
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Skeleton variant="rounded" width={100} height={30} />
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

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          color="text.primary"
          sx={{ mb: 1 }}
        >
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          제가 작업한 프로젝트들을 소개합니다.
        </Typography>

        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <ProjectCardSkeleton />
                </Grid>
              ))
            : projects.length === 0
            ? (
                <Grid item xs={12}>
                  <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ py: 8 }}>
                    아직 등록된 프로젝트가 없습니다.
                  </Typography>
                </Grid>
              )
            : projects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProjectsPage;
