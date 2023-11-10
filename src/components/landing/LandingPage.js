import LandingGearsComponents from "./LandingGearsComponents";
import WTF from "./WTF";

const LandingPage = () => {
  return (
    <div className="w-full h-[500vh] flex flex-col">
      <WTF />
      {/* потом убрать */}
      <div className="fixed z-[-1] left-0 top-0 bg-[#f6f6f8] w-full h-full" />
      {/* потом убрать */}
      {/* <LandingGearsComponents /> */}

      {/* <div className="h-full flex-col flex gap-[20px] mt-[100vh]">
        {[...Array(50)].map((i, key) => (
          <div className="text-black">key</div>
        ))}
      </div> */}
    </div>
  );
};

export default LandingPage;
