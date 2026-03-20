import { Box, Typography, Container } from '@mui/material';

function ProjectsPage() {
  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', bgcolor: 'background.default' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom color="secondary">
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default ProjectsPage;
