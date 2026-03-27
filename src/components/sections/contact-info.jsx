import { Box, Typography, IconButton, Link } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

/**
 * ContactInfo 컴포넌트
 * 포트폴리오 소유자의 연락처 정보와 SNS 링크를 표시합니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ContactInfo />
 */
function ContactInfo() {
  const contacts = [
    { icon: <PhoneIcon fontSize='small' />, label: '010-0000-0000', href: 'tel:01000000000' },
    { icon: <EmailIcon fontSize='small' />, label: 'example@email.com', href: 'mailto:example@email.com' },
  ];

  const sns = [
    { icon: <InstagramIcon />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <LinkedInIcon />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <GitHubIcon />, href: 'https://github.com/leeyj9908-star', label: 'GitHub' },
  ];

  return (
    <Box>
      <Typography variant='h5' fontWeight={700} gutterBottom>
        Contact Me
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
        언제든지 연락 주세요!
      </Typography>

      {contacts.map((contact) => (
        <Box
          key={contact.label}
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}
        >
          <Box sx={{ color: 'primary.main' }}>{contact.icon}</Box>
          <Link
            href={contact.href}
            underline='hover'
            color='text.primary'
            variant='body2'
          >
            {contact.label}
          </Link>
        </Box>
      ))}

      <Box sx={{ display: 'flex', gap: 0.5, mt: 3 }}>
        {sns.map((s) => (
          <IconButton
            key={s.label}
            component='a'
            href={s.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={s.label}
            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
          >
            {s.icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}

export default ContactInfo;
