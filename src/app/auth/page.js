import AuthForm from "../../components/auth/AuthForm";
import AuthText from "../../components/auth/AuthText";

const AuthPage = async (req) => {
  const email = req.searchParams?.email;
  const hrtoken = req.searchParams?.hrtoken;
  const referal = req.searchParams?.referal;
  const type = req.searchParams?.type;

  return (
    <div className="h-full  [@media(hover)]:items-center flex flex-row gap-[20px] w-full [@media(pointer:coarse)]:p-[12px] [@media(pointer:coarse)]:flex-col [@media(pointer:coarse)]:justify-center justify-between">
      <AuthText />

      <AuthForm email={email} hrtoken={hrtoken} referal={referal} type={type} />
    </div>
  );
};

export default AuthPage;
