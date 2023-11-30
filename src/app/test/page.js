"use server";

import { getConnctionsCount } from "../../server/actions/connections/getConnctionsCount";
import TestComp from "./TestComp";

const Hii = async () => {
  const connectionsCount = await getConnctionsCount();

  return (
    <div className="mt-[100px]">
      <TestComp posts={connectionsCount} />
      {/* <NoPitchesModal modalState={state} setModalState={setstate} /> */}
    </div>
  );
};

export default Hii;
