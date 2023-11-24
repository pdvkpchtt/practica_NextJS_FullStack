"use client";

import { useEffect, useState } from "react";
import useInterval from "use-interval";

import { getPitchesCount } from "../../server/actions/pitches/getPitchesCount";
import { getProfileByChatId } from "../../server/actions/messenger/getProfileByChatId";
import ChatsPanel from "./ChatsPanel";
import MessengerRight from "./MessengerRight";

const ChatParent = ({ chatId, user_id }) => {
  const [profileData, setProfileData] = useState(null);
  const [pitchesState, setpitchesState] = useState(null);
  const [superpitchesState, setsuperpitchesState] = useState(null);

  const getUserInfoHandler = async () => {
    console.log("test chat info");
    const data = await getProfileByChatId(user_id, chatId);
    console.log(data, "client chat profile");

    const pitches = await getPitchesCount();
    const superpitches = await getPitchesCount("superpitch");
    setpitchesState(pitches);
    setsuperpitchesState(superpitches);
    setProfileData(data);
  };

  const [delay, setDelay] = useState(2000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      getUserInfoHandler();
    },
    isRunning ? delay : null
  );

  useEffect(() => {
    getUserInfoHandler();
  }, []);

  return (
    <>
      <ChatsPanel chatId={chatId} user_id={user_id} profileData={profileData} />
      <MessengerRight
        profileData={profileData}
        pitchesState={pitchesState}
        superpitchesState={superpitchesState}
      />
    </>
  );
};

export default ChatParent;
