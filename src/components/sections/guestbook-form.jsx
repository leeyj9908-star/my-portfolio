import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { supabase } from '../../utils/supabase';

/**
 * GuestbookForm 컴포넌트
 * 방명록 입력 폼을 제공합니다.
 *
 * Props:
 * @param {function} onSuccess - 방명록 등록 성공 시 호출되는 콜백 [Optional]
 *
 * Example usage:
 * <GuestbookForm onSuccess={() => refetch()} />
 */
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
      setForm({
        name: '',
        content: '',
        affiliation: '',
        is_affiliation_public: true,
        contact_info: '',
        is_contact_public: true,
      });
      setTimeout(() => setSuccess(false), 3000);
      onSuccess?.();
    }
  };

  return (
    <Box component='form' noValidate>
      <Typography variant='h6' fontWeight={700} gutterBottom>
        방명록 남기기
      </Typography>

      {error && <Alert severity='error' sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity='success' sx={{ mb: 2 }}>방명록이 등록되었습니다!</Alert>}

      <TextField
        fullWidth
        label='이름 (공백이면 익명으로 표시)'
        value={form.name}
        onChange={handleChange('name')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        required
        label='방명록 내용'
        multiline
        rows={3}
        value={form.content}
        onChange={handleChange('content')}
        sx={{ mb: 2 }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          label='소속/직업 (선택)'
          value={form.affiliation}
          onChange={handleChange('affiliation')}
        />
        <FormControlLabel
          control={
            <Switch
              checked={form.is_affiliation_public}
              onChange={handleToggle('is_affiliation_public')}
            />
          }
          label={form.is_affiliation_public ? '공개' : '비공개'}
          sx={{ minWidth: 90, ml: 0 }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <TextField
          fullWidth
          label='연락처 (선택)'
          value={form.contact_info}
          onChange={handleChange('contact_info')}
        />
        <FormControlLabel
          control={
            <Switch
              checked={form.is_contact_public}
              onChange={handleToggle('is_contact_public')}
            />
          }
          label={form.is_contact_public ? '공개' : '비공개'}
          sx={{ minWidth: 90, ml: 0 }}
        />
      </Box>

      <Button
        variant='contained'
        onClick={handleSubmit}
        disabled={loading}
        fullWidth
        size='large'
        startIcon={loading ? <CircularProgress size={18} color='inherit' /> : null}
      >
        {loading ? '등록 중...' : '방명록 남기기'}
      </Button>
    </Box>
  );
}

export default GuestbookForm;
