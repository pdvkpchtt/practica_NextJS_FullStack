"use client";

// import NoPitchesModal from "components/messenger/NoPitchesModal";
import { useState } from "react";

const Hii = () => {
  const [state, setstate] = useState(false);

  return (
    <div className="mt-[100px]">
      <button onClick={() => setstate(true)}>sdads</button>
      {/* <NoPitchesModal modalState={state} setModalState={setstate} /> */}
    </div>
  );
};

export default Hii;
