"use client";

import { useEffect, useState } from "react";
import useInterval from "use-interval";

import { getProfileByChatId } from "../../server/actions/messenger/getProfileByChatId";
import ChatsPanel from "./ChatsPanel";
import MessengerRight from "./MessengerRight";

const ChatParent = ({ chatId, user_id }) => {
  const [profileData, setProfileData] = useState(null);

  const getUserInfoHandler = async () => {
    console.log("test chat info");
    const data = await getProfileByChatId(user_id, chatId);
    console.log(data, "client chat profile");
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
      <ChatsPanel chatId={chatId} user_id={user_id} />
      <MessengerRight profileData={profileData} />
    </>
  );
};

export default ChatParent;
