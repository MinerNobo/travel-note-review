import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { API_BASE_URL } from '@/constants';
import { useNavigate } from '@tanstack/react-router';
import { Loader2, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AccessDeniedAlert } from './AccessDeniedAlert';
import './LoginForm.scss';

interface Inputs {
  username: string;
  password: string;
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('用户名或密码错误');
        } else {
          setError('登录失败，请稍后重试');
        }
        setIsLoading(false);
        return;
      }

      const result = await response.json();

      if (result.user.role === 'USER') {
        setIsModalOpen(true);
        return;
      }
      localStorage.setItem('access_token', result.access_token);
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('isLoggedIn', '1');
      navigate({ to: '/' });
    } catch (e) {
      setError('网络错误，请检查服务器或网络连接');
      console.log(`登录错误 ${JSON.stringify(e)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-bg">
      <Card className="login-card">
        <CardHeader>
          <div className="login-logo">
            <ShieldCheck size={36} />
            <span className="login-title">游记审核系统</span>
          </div>
          <CardTitle className="login-title-main">登录系统</CardTitle>
          <CardDescription>
            请输入账号密码，<span className="login-warning">仅限审核者或管理员登录</span>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="login-form-group">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                placeholder="请输入用户名"
                autoComplete="username"
                {...register('username', { required: true })}
              />
            </div>
            <div className="login-form-group">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                autoComplete="current-password"
                {...register('password', { required: true })}
              />
            </div>
            {error && <div className="login-error">{error}</div>}
          </CardContent>
          <CardFooter>
            <Button className="login-btn" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="login-loading" />
                  登录中...
                </>
              ) : (
                '登录'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      {isModalOpen && (
        <AccessDeniedAlert
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
