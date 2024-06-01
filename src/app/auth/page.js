import AuthForm from "../../components/auth/AuthForm";
import AuthText from "../../components/auth/AuthText";

const AuthPage = (req) => {
  const email = req.searchParams?.email;
  const hrtoken = req.searchParams?.hrtoken;

  return (
    <div className="h-full  [@media(hover)]:items-center flex flex-row gap-[20px] w-full [@media(pointer:coarse)]:p-[12px] [@media(pointer:coarse)]:flex-col [@media(pointer:coarse)]:justify-center justify-between">
      <AuthText />

      <AuthForm email={email} hrtoken={hrtoken} />
    </div>
  );
};

export default AuthPage;
