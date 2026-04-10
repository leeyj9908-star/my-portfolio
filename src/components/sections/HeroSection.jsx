import { Box, Typography } from '@mui/material';
import { GRADIENT } from '../../theme';

function HeroSection() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(160deg, #0F0D0A 0%, #0A0F18 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        px: 4,
        textAlign: 'center',
      }}
    >
      <Typography
        variant='h3'
        fontWeight={700}
        gutterBottom
        sx={{
          background: GRADIENT,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Hero 섹션
      </Typography>
      <Typography variant='body1' sx={{ opacity: 0.6, maxWidth: 560, mx: 'auto' }}>
        여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
      </Typography>
    </Box>
  );
}

export default HeroSection;
