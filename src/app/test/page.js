"use server";

import TestComp from "./TestComp";

const Hii = async () => {
  return (
    <div className="mt-[100px]">
      <TestComp />
      {/* <NoPitchesModal modalState={state} setModalState={setstate} /> */}
    </div>
  );
};

export default Hii;
