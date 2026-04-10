import { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const initialData = {
  basicInfo: {
    name: '이은주',
    education: 'School of Visual Arts',
    major: '디자인전공',
    experience: '신입',
    photo: '',
  },
  sections: [
    {
      id: 'dev-story',
      title: '나의 개발 스토리',
      content: '[개발을 시작하게 된 계기나 경험을 작성해주세요]',
      showInHome: true,
    },
    {
      id: 'philosophy',
      title: '개발 철학',
      content: '[개발할 때 중요하게 생각하는 가치나 원칙을 작성해주세요]',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      content: '[취미, 관심사 등 개인적인 내용을 작성해주세요]',
      showInHome: false,
    },
  ],
};

/**
 * BasicInfoCard 컴포넌트
 *
 * Props:
 * @param {object} basicInfo - 기본 정보 객체 (name, education, major, experience, photo) [Required]
 * @param {function} onPhotoChange - 프로필 사진 변경 핸들러 [Required]
 *
 * Example usage:
 * <BasicInfoCard basicInfo={data.basicInfo} onPhotoChange={handlePhotoChange} />
 */
function BasicInfoCard({ basicInfo, onPhotoChange }) {
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onPhotoChange(ev.target.result);
    reader.readAsDataURL(file);
  };

  const infoItems = [
    { label: '학교', value: basicInfo.education },
    { label: '전공', value: basicInfo.major },
    { label: '경력', value: basicInfo.experience },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'secondary.light',
        borderRadius: 3,
        mb: 4,
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems='center'>
          {/* 프로필 사진 영역 */}
          <Grid size={{ xs: 12, sm: 'auto' }} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <Avatar
                src={basicInfo.photo || undefined}
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'secondary.light',
                  cursor: 'pointer',
                  border: '3px solid',
                  borderColor: 'primary.light',
                  '&:hover .upload-overlay': { opacity: 1 },
                }}
                onClick={handleAvatarClick}
              >
                {!basicInfo.photo && (
                  <AddPhotoAlternateIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                )}
              </Avatar>
              {/* 호버 오버레이 */}
              <Box
                className='upload-overlay'
                onClick={handleAvatarClick}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  bgcolor: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  cursor: 'pointer',
                }}
              >
                <AddPhotoAlternateIcon sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                hidden
                onChange={handleFileChange}
              />
            </Box>
          </Grid>

          {/* 기본 정보 텍스트 */}
          <Grid size={{ xs: 12, sm: 'grow' }}>
            <Typography
              variant='h4'
              fontWeight={700}
              color='primary.dark'
              sx={{ mb: 1.5, textAlign: { xs: 'center', sm: 'left' } }}
            >
              {basicInfo.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              {infoItems.map((item) => (
                <Chip
                  key={item.label}
                  label={`${item.label}: ${item.value}`}
                  variant='outlined'
                  size='small'
                  sx={{
                    borderColor: 'primary.light',
                    color: 'text.primary',
                    fontWeight: 500,
                    fontSize: '0.8rem',
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

/**
 * SectionAccordion 컴포넌트
 *
 * Props:
 * @param {object} section - 섹션 데이터 (id, title, content, showInHome) [Required]
 * @param {boolean} isExpanded - 현재 펼침 상태 [Required]
 * @param {function} onChange - 펼침/닫힘 토글 핸들러 [Required]
 *
 * Example usage:
 * <SectionAccordion section={section} isExpanded={true} onChange={handleChange} />
 */
function SectionAccordion({ section, isExpanded, onChange }) {
  return (
    <Accordion
      expanded={isExpanded}
      onChange={onChange}
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'secondary.light',
        borderRadius: '12px !important',
        mb: 2,
        '&:before': { display: 'none' },
        '&.Mui-expanded': {
          borderColor: 'primary.main',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
        sx={{
          px: { xs: 2.5, md: 3 },
          py: 1,
          borderRadius: 3,
          '&.Mui-expanded': {
            borderBottom: '1px solid',
            borderColor: 'secondary.light',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
          <Typography variant='h6' color='primary.dark' fontWeight={600}>
            {section.title}
          </Typography>
          {section.showInHome && (
            <Chip
              icon={<HomeIcon sx={{ fontSize: '14px !important' }} />}
              label='홈 표시'
              size='small'
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                fontSize: '0.7rem',
                height: 22,
                '& .MuiChip-icon': { color: 'white' },
              }}
            />
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ px: { xs: 2.5, md: 3 }, py: 2.5 }}>
        <Box
          sx={{
            fontSize: '0.95rem',
            color: 'text.secondary',
            lineHeight: 1.8,
          }}
        >
          {section.content}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

/**
 * AboutPage 컴포넌트
 * About Me 탭 페이지 - 기본 정보 및 개발 스토리/철학/개인 이야기 섹션 포함
 */
function AboutPage() {
  const [aboutMeData, setAboutMeData] = useState(initialData);
  const [expandedId, setExpandedId] = useState('dev-story');

  const handlePhotoChange = (photoUrl) => {
    setAboutMeData((prev) => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, photo: photoUrl },
    }));
  };

  const handleAccordionChange = (id) => (_e, isExpanded) => {
    setExpandedId(isExpanded ? id : false);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 5, md: 8 } }}>
      <Container maxWidth='md'>
        {/* 페이지 제목 */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant='h3' fontWeight={700} color='primary' gutterBottom>
            About Me
          </Typography>
          <Divider
            sx={{
              width: 60,
              mx: 'auto',
              borderWidth: 2,
              borderColor: 'primary.main',
              borderRadius: 1,
            }}
          />
        </Box>

        {/* 기본 정보 카드 */}
        <BasicInfoCard
          basicInfo={aboutMeData.basicInfo}
          onPhotoChange={handlePhotoChange}
        />

        {/* 콘텐츠 섹션 (아코디언) */}
        <Box>
          <Typography
            variant='h5'
            fontWeight={600}
            color='text.primary'
            sx={{ mb: 2.5 }}
          >
            더 알아보기
          </Typography>
          {aboutMeData.sections.map((section) => (
            <SectionAccordion
              key={section.id}
              section={section}
              isExpanded={expandedId === section.id}
              onChange={handleAccordionChange(section.id)}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default AboutPage;
