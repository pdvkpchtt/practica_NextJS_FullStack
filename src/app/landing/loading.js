import TextLogo from "../../components/landing/TextLogo";

const LoadingLanding = () => {
  return (
    <div className="fixed left-0 top-0 bg-[#fff] h-[100vh] w-[100vw]">
      <TextLogo style="fixed top-[calc(50vh-7.5vh)] left-[calc(50vw-7.5vh)]" />
    </div>
  );
};

export default LoadingLanding;
