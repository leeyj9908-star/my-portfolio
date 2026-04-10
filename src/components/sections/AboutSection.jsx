import { useNavigate } from 'react-router-dom';

function AboutSection() {
  const navigate = useNavigate();

  return (
    <section id="about" className="bg-base-200 py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-[#D4C5A9] to-[#6AA8D4] bg-clip-text text-transparent">
            About Me
          </span>
        </h2>
        <p className="text-base-content/50 text-sm mb-8">섹션</p>
        <p className="text-base-content/70 text-lg max-w-xl mx-auto mb-10">
          여기는 About Me 섹션입니다. 간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
        </p>
        <button
          onClick={() => navigate('/about')}
          className="btn btn-secondary"
        >
          더 알아보기
        </button>
      </div>
    </section>
  );
}

export default AboutSection;
