import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProjectsSection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={700} gutterBottom color="text.primary">
          Projects 섹션
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 520, mx: 'auto' }}>
          여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/projects')}>
          더 보기
        </Button>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
