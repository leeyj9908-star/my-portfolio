import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AboutSection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={700} gutterBottom color="text.primary">
          About Me 섹션
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 520, mx: 'auto' }}>
          여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/about')}>
          더 알아보기
        </Button>
      </Container>
    </Box>
  );
}

export default AboutSection;
