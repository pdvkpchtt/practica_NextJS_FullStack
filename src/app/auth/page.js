import AuthForm from "../../components/auth/AuthForm";
import AuthText from "../../components/auth/AuthText";

const AuthPage = (req) => {
  const hrtoken = req.searchParams?.hrtoken;
  const company = req.searchParams?.company;

  return (
    <div className="h-full  [@media(hover)]:items-center flex flex-row gap-[20px] w-full [@media(pointer:coarse)]:p-[12px] [@media(pointer:coarse)]:flex-col [@media(pointer:coarse)]:justify-center justify-between">
      <AuthText />

      <AuthForm hrtoken={hrtoken} company={company} />
    </div>
  );
};

export default AuthPage;
