import { Box, Typography, Container } from '@mui/material';

function ContactSection() {
  return (
    <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Contact 섹션
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.85, maxWidth: 520, mx: 'auto' }}>
          여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default ContactSection;
