import { useState } from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import ContactInfo from './contact-info';
import GuestbookForm from './guestbook-form';
import GuestbookList from './guestbook-list';

function ContactSection() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Box sx={{ bgcolor: 'background.default', py: { xs: 6, md: 10 } }}>
      <Container maxWidth='lg'>
        <Typography
          variant='h4'
          fontWeight={700}
          textAlign='center'
          gutterBottom
          sx={{ mb: { xs: 4, md: 6 } }}
        >
          Contact & 방명록
        </Typography>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ContactInfo />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <GuestbookForm onSuccess={() => setRefreshKey((k) => k + 1)} />
            <Divider sx={{ my: 4 }} />
            <GuestbookList refreshKey={refreshKey} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactSection;
