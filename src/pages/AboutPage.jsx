import { Box, Typography, Container } from '@mui/material';

function AboutPage() {
  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', bgcolor: 'background.default' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom color="primary">
          About Me
        </Typography>
        <Typography variant="body1" color="text.secondary">
          About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default AboutPage;
