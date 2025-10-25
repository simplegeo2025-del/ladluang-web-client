// src/pages/AuthGoogleCallback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleExchangeService } from '../services/auth.service';
import { setToken } from '../utils/localStorage';
import useUserStore from '../store/user.store';
import LoadingScreen from '../components/common/LoadingScreen';

export default function AuthGoogleCallback() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (!code) {
        navigate('/login', { replace: true });
        return;
    }

    googleExchangeService(code)
      .then(async data => {
        setToken(data.accessToken);
        setUser(data.user);
        navigate("/reports", { replace: true });
      })
      .catch(err => {
        console.error('login failed:', err);
        navigate('/login', { replace: true });
      });
  }, []);

  return <LoadingScreen message="กำลังเข้าสู่ระบบด้วย Google..." />;
}
