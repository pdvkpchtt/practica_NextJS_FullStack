"use server";

import { getServSession } from "app/api/auth/[...nextauth]/route";
import { getPostsWithAlgoritm } from "server/actions/getPostsWithAlgoritm";
import TestComp from "./TestComp";

const Hii = async () => {
  const session = await getServSession();
  const posts = await getPostsWithAlgoritm(session.user.id);
  console.log(posts, "fuckll");

  return (
    <div className="mt-[100px]">
      <TestComp posts={posts} />
      {/* <NoPitchesModal modalState={state} setModalState={setstate} /> */}
    </div>
  );
};

export default Hii;
