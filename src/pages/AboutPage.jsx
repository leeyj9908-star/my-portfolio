import { useState, useRef } from 'react';

const initialData = {
  basicInfo: {
    name: 'EUNJU LEE',
    education: 'School of Visual Arts',
    major: '디자인전공',
    experience: '신입',
    photo: '',
  },
  sections: [
    { id: 'dev-story', title: '나의 개발 스토리', content: '[개발을 시작하게 된 계기나 경험을 작성해주세요]', showInHome: true },
    { id: 'philosophy', title: '개발 철학', content: '[개발할 때 중요하게 생각하는 가치나 원칙을 작성해주세요]', showInHome: true },
    { id: 'personal', title: '개인적인 이야기', content: '[취미, 관심사 등 개인적인 내용을 작성해주세요]', showInHome: false },
  ],
};

function BasicInfoCard({ basicInfo, onPhotoChange }) {
  const fileInputRef = useRef(null);

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
    <div className="card bg-base-200 border border-white/10 mb-8">
      <div className="card-body p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6">
          {/* Avatar */}
          <div
            className="relative cursor-pointer group flex-shrink-0"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="avatar">
              <div className="w-28 h-28 rounded-full bg-base-300 border-2 border-primary/30 overflow-hidden flex items-center justify-center">
                {basicInfo.photo ? (
                  <img src={basicInfo.photo} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl text-primary/40">+</span>
                )}
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs">사진 변경</span>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
          </div>

          {/* Info */}
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-base-content mb-3">{basicInfo.name}</h2>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {infoItems.map((item) => (
                <span key={item.label} className="badge badge-outline border-white/20 text-base-content/70 font-medium">
                  {item.label}: {item.value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionCollapse({ section, isOpen, onToggle }) {
  return (
    <div
      className={`collapse collapse-arrow bg-base-200 border mb-3 transition-all ${
        isOpen ? 'border-secondary/40' : 'border-white/10'
      }`}
    >
      <input type="radio" name="about-accordion" checked={isOpen} onChange={onToggle} />
      <div className="collapse-title font-semibold flex items-center gap-2">
        {section.title}
        {section.showInHome && (
          <span className="badge badge-secondary badge-xs">홈 표시</span>
        )}
      </div>
      <div className="collapse-content">
        <p className="text-base-content/60 leading-relaxed">{section.content}</p>
      </div>
    </div>
  );
}

function AboutPage() {
  const [aboutMeData, setAboutMeData] = useState(initialData);
  const [openId, setOpenId] = useState('dev-story');

  const handlePhotoChange = (photoUrl) => {
    setAboutMeData((prev) => ({ ...prev, basicInfo: { ...prev.basicInfo, photo: photoUrl } }));
  };

  return (
    <div className="min-h-screen bg-base-100 py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-[#FFFFFF] to-[#6AA8D4] bg-clip-text text-transparent">
              About Me
            </span>
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#FFFFFF] to-[#6AA8D4] mx-auto rounded-full" />
        </div>

        {/* Basic Info Card */}
        <BasicInfoCard basicInfo={aboutMeData.basicInfo} onPhotoChange={handlePhotoChange} />

        {/* Sections */}
        <h2 className="text-xl font-semibold text-base-content mb-4">더 알아보기</h2>
        {aboutMeData.sections.map((section) => (
          <SectionCollapse
            key={section.id}
            section={section}
            isOpen={openId === section.id}
            onToggle={() => setOpenId(openId === section.id ? null : section.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default AboutPage;
