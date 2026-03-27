import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { supabase } from '../../utils/supabase';

/**
 * GuestbookList 컴포넌트
 * Supabase에서 방명록 목록을 불러와 표시합니다.
 * 비공개 항목은 비밀번호 입력 후 열람 가능합니다.
 *
 * Props:
 * @param {number} refreshKey - 값이 변경될 때마다 목록을 재조회합니다 [Optional, 기본값: 0]
 *
 * Example usage:
 * <GuestbookList refreshKey={refreshKey} />
 */
function GuestbookList({ refreshKey = 0 }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState({});
  const [dialog, setDialog] = useState({ open: false, entryId: null, field: null });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const fetchEntries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    setEntries(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, [refreshKey]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

  const revealKey = (entryId, field) => `${entryId}_${field}`;

  const handleLockClick = (entryId, field) => {
    setDialog({ open: true, entryId, field });
    setPasswordInput('');
    setPasswordError(false);
  };

  const handleDialogClose = () => {
    setDialog({ open: false, entryId: null, field: null });
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === '1234') {
      setRevealed((prev) => ({
        ...prev,
        [revealKey(dialog.entryId, dialog.field)]: true,
      }));
      handleDialogClose();
    } else {
      setPasswordError(true);
    }
  };

  return (
    <Box>
      <Typography variant='h6' fontWeight={700} gutterBottom>
        방명록 목록 ({entries.length}개)
      </Typography>

      {loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && entries.length === 0 && (
        <Typography variant='body2' color='text.secondary' sx={{ py: 2 }}>
          아직 방명록이 없습니다. 첫 번째로 남겨보세요!
        </Typography>
      )}

      {entries.map((entry) => (
        <Card key={entry.id} sx={{ mb: 2 }} elevation={1}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 1,
              }}
            >
              <Typography fontWeight={700}>{entry.name || '익명'}</Typography>
              <Typography variant='caption' color='text.secondary'>
                {formatDate(entry.created_at)}
              </Typography>
            </Box>

            <Typography variant='body1' sx={{ mb: 1.5, whiteSpace: 'pre-wrap' }}>
              {entry.content}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {entry.affiliation && (
                entry.is_affiliation_public ||
                revealed[revealKey(entry.id, 'affiliation')] ? (
                  <Chip label={entry.affiliation} size='small' variant='outlined' />
                ) : (
                  <Chip
                    icon={<LockIcon />}
                    label='소속/직업 비공개'
                    size='small'
                    variant='outlined'
                    onClick={() => handleLockClick(entry.id, 'affiliation')}
                    sx={{ cursor: 'pointer' }}
                  />
                )
              )}

              {entry.contact_info && (
                entry.is_contact_public ||
                revealed[revealKey(entry.id, 'contact')] ? (
                  <Chip
                    label={entry.contact_info}
                    size='small'
                    variant='outlined'
                    color='primary'
                  />
                ) : (
                  <Chip
                    icon={<LockIcon />}
                    label='연락처 비공개'
                    size='small'
                    variant='outlined'
                    color='primary'
                    onClick={() => handleLockClick(entry.id, 'contact')}
                    sx={{ cursor: 'pointer' }}
                  />
                )
              )}
            </Box>
          </CardContent>
        </Card>
      ))}

      <Dialog open={dialog.open} onClose={handleDialogClose} maxWidth='xs' fullWidth>
        <DialogTitle>비공개 정보 확인</DialogTitle>
        <DialogContent>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
            비밀번호를 입력하면 비공개 정보를 확인할 수 있습니다.
          </Typography>
          <TextField
            fullWidth
            type='password'
            label='비밀번호'
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
              setPasswordError(false);
            }}
            error={passwordError}
            helperText={passwordError ? '비밀번호가 틀렸습니다.' : ''}
            onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>취소</Button>
          <Button variant='contained' onClick={handlePasswordSubmit}>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default GuestbookList;
