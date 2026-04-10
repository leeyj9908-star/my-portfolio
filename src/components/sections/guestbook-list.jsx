import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';

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

  useEffect(() => { fetchEntries(); }, [refreshKey]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });

  const revealKey = (entryId, field) => `${entryId}_${field}`;

  const handleLockClick = (entryId, field) => {
    setDialog({ open: true, entryId, field });
    setPasswordInput('');
    setPasswordError(false);
  };

  const handleDialogClose = () => setDialog({ open: false, entryId: null, field: null });

  const handlePasswordSubmit = () => {
    if (passwordInput === '1234') {
      setRevealed((prev) => ({ ...prev, [revealKey(dialog.entryId, dialog.field)]: true }));
      handleDialogClose();
    } else {
      setPasswordError(true);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-base-content mb-4">
        방명록 목록 ({entries.length}개)
      </h3>

      {loading && (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-md text-secondary" />
        </div>
      )}

      {!loading && entries.length === 0 && (
        <p className="text-base-content/40 text-sm py-4">
          아직 방명록이 없습니다. 첫 번째로 남겨보세요!
        </p>
      )}

      {entries.map((entry) => (
        <div key={entry.id} className="card bg-base-200 border border-white/10 mb-3 p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="font-bold text-sm text-base-content">{entry.name || '익명'}</span>
            <span className="text-xs text-base-content/40">{formatDate(entry.created_at)}</span>
          </div>
          <p className="text-sm text-base-content/80 whitespace-pre-wrap mb-3">{entry.content}</p>
          <div className="flex flex-wrap gap-2">
            {entry.affiliation && (
              entry.is_affiliation_public || revealed[revealKey(entry.id, 'affiliation')] ? (
                <span className="badge badge-outline badge-sm border-white/20">{entry.affiliation}</span>
              ) : (
                <button
                  onClick={() => handleLockClick(entry.id, 'affiliation')}
                  className="badge badge-outline badge-sm border-white/20 text-base-content/40 cursor-pointer hover:border-primary/40"
                >
                  🔒 소속/직업 비공개
                </button>
              )
            )}
            {entry.contact_info && (
              entry.is_contact_public || revealed[revealKey(entry.id, 'contact')] ? (
                <span className="badge badge-secondary badge-outline badge-sm">{entry.contact_info}</span>
              ) : (
                <button
                  onClick={() => handleLockClick(entry.id, 'contact')}
                  className="badge badge-secondary badge-outline badge-sm cursor-pointer opacity-40 hover:opacity-100"
                >
                  🔒 연락처 비공개
                </button>
              )
            )}
          </div>
        </div>
      ))}

      {/* Password Dialog */}
      {dialog.open && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-200 border border-white/10">
            <h3 className="font-bold text-lg mb-2">비공개 정보 확인</h3>
            <p className="text-sm text-base-content/60 mb-4">
              비밀번호를 입력하면 비공개 정보를 확인할 수 있습니다.
            </p>
            <input
              type="password"
              className={`input input-bordered w-full bg-base-300 border-white/10 text-base-content ${passwordError ? 'input-error' : ''}`}
              placeholder="비밀번호"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(false); }}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              autoFocus
            />
            {passwordError && (
              <p className="text-error text-xs mt-1">비밀번호가 틀렸습니다.</p>
            )}
            <div className="modal-action mt-4">
              <button className="btn btn-ghost btn-sm" onClick={handleDialogClose}>취소</button>
              <button className="btn btn-primary btn-sm" onClick={handlePasswordSubmit}>확인</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={handleDialogClose} />
        </div>
      )}
    </div>
  );
}

export default GuestbookList;
