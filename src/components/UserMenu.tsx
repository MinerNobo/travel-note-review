import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { BASE_URL, API_BASE_URL } from '@/constants';
import './UserMenu.scss';
import { useNavigate } from '@tanstack/react-router';

export function UserMenu() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const username = user?.username || '用户';
  const avatarUrl = `${BASE_URL}${user?.avatarUrl}` || '';

  const handleLogout = async () => {
    const token = localStorage.getItem('access_token');
    try {
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (e) {
      console.log(`登出时出错 ${JSON.stringify(e)}`);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      navigate({ to: '/login' });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="user-avatar-btn" variant="ghost">
          <span className="user-avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" />
            ) : (
              <span className="user-avatar-fallback">{username[0]}</span>
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="user-menu-content" align="end">
        <div className="user-menu-username">{username}</div>
        <DropdownMenuItem className="user-menu-logout" onClick={handleLogout}>
          <LogOut className="logout-icon" />
          退出登录
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
