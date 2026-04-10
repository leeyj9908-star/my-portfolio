import { useState } from 'react';
import { supabase } from '../../utils/supabase';

function GuestbookForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    content: '',
    affiliation: '',
    is_affiliation_public: true,
    contact_info: '',
    is_contact_public: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleToggle = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.checked }));
  };

  const handleSubmit = async () => {
    if (!form.content.trim()) {
      setError('방명록 내용을 입력해주세요.');
      return;
    }
    setLoading(true);
    setError('');

    const { error: err } = await supabase.from('guestbook').insert([
      {
        name: form.name.trim() || null,
        content: form.content.trim(),
        affiliation: form.affiliation.trim() || null,
        is_affiliation_public: form.is_affiliation_public,
        contact_info: form.contact_info.trim() || null,
        is_contact_public: form.is_contact_public,
      },
    ]);

    setLoading(false);

    if (err) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    } else {
      setSuccess(true);
      setForm({ name: '', content: '', affiliation: '', is_affiliation_public: true, contact_info: '', is_contact_public: true });
      setTimeout(() => setSuccess(false), 3000);
      onSuccess?.();
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-base-content mb-4">방명록 남기기</h3>

      {error && (
        <div className="alert alert-error mb-3 text-sm py-2">{error}</div>
      )}
      {success && (
        <div className="alert alert-success mb-3 text-sm py-2">방명록이 등록되었습니다!</div>
      )}

      <fieldset className="fieldset mb-3">
        <legend className="fieldset-legend text-xs text-base-content/50">이름 (공백이면 익명으로 표시)</legend>
        <input
          type="text"
          className="input input-bordered w-full bg-base-200 border-white/10 text-base-content"
          value={form.name}
          onChange={handleChange('name')}
        />
      </fieldset>

      <fieldset className="fieldset mb-3">
        <legend className="fieldset-legend text-xs text-base-content/50">방명록 내용 *</legend>
        <textarea
          className="textarea textarea-bordered w-full bg-base-200 border-white/10 text-base-content h-24"
          value={form.content}
          onChange={handleChange('content')}
        />
      </fieldset>

      <div className="flex gap-2 items-end mb-3">
        <fieldset className="fieldset flex-1">
          <legend className="fieldset-legend text-xs text-base-content/50">소속/직업 (선택)</legend>
          <input
            type="text"
            className="input input-bordered w-full bg-base-200 border-white/10 text-base-content"
            value={form.affiliation}
            onChange={handleChange('affiliation')}
          />
        </fieldset>
        <label className="flex items-center gap-1 pb-2 cursor-pointer whitespace-nowrap text-xs text-base-content/60">
          <input
            type="checkbox"
            className="toggle toggle-xs toggle-secondary"
            checked={form.is_affiliation_public}
            onChange={handleToggle('is_affiliation_public')}
          />
          {form.is_affiliation_public ? '공개' : '비공개'}
        </label>
      </div>

      <div className="flex gap-2 items-end mb-5">
        <fieldset className="fieldset flex-1">
          <legend className="fieldset-legend text-xs text-base-content/50">연락처 (선택)</legend>
          <input
            type="text"
            className="input input-bordered w-full bg-base-200 border-white/10 text-base-content"
            value={form.contact_info}
            onChange={handleChange('contact_info')}
          />
        </fieldset>
        <label className="flex items-center gap-1 pb-2 cursor-pointer whitespace-nowrap text-xs text-base-content/60">
          <input
            type="checkbox"
            className="toggle toggle-xs toggle-secondary"
            checked={form.is_contact_public}
            onChange={handleToggle('is_contact_public')}
          />
          {form.is_contact_public ? '공개' : '비공개'}
        </label>
      </div>

      <button
        className="btn btn-primary w-full"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <span className="loading loading-spinner loading-sm" /> : null}
        {loading ? '등록 중...' : '방명록 남기기'}
      </button>
    </div>
  );
}

export default GuestbookForm;
