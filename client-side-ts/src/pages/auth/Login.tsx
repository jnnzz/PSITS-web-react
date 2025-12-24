import LoginForm, { type LoginCredentials } from '@/components/auth/LoginForm';

export default function Login() {
  const handleLogin = (_values: LoginCredentials) => {
    // insert login here
  };

  return (
    <div className="w-screen h-screen bg-gray-300 flex flex-row">
      <div className="w-full md:w-1/2 bg-white flex justify-center items-center">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
