import { Box, Typography } from '@mui/material';

function HeroSection() {
  return (
    <Box sx={{
      bgcolor: 'primary.main',
      color: 'white',
      py: { xs: 8, md: 12 },
      px: 4,
      textAlign: 'center',
    }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Hero 섹션
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.85, maxWidth: 560, mx: 'auto' }}>
        여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
      </Typography>
    </Box>
  );
}

export default HeroSection;
