import AuthForm from "../../components/auth/AuthForm";
import AuthText from "../../components/auth/AuthText";

const AuthPage = () => {
  return (
    <div className="h-full  [@media(hover)]:items-center flex flex-row gap-[20px] w-full [@media(pointer:coarse)]:p-[12px] [@media(pointer:coarse)]:flex-col justify-between [@media(pointer:coarse)]:justify-start">
      <AuthText />

      <AuthForm />
    </div>
  );
};

export default AuthPage;
