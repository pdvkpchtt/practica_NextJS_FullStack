"use client";

import Right from "../../components/Profile/Right";
import { useState } from "react";

import NavigationMobile from "../../shared/ui/NavigationMobile";
import OthersLeft from "./OthersLeft";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfileLiked from "../../components/Profile/ProfileLiked";
import ProfilePosts from "../../components/Profile/ProfilePosts";

const OthersProfileWithNav = ({
  data,
  getUserFeed,
  addReaction,
  otherId,
  ifChatExist,
  pitchesFirst,
  superPitchesFirst,
}) => {
  console.log("client other profile", data);
  const [navState, setNavState] = useState([
    {
      id: 0,
      active: true,
      name: "Информация",
      component: <ProfileInfo others data={data} />,
    },
    {
      id: 1,
      active: false,
      name: "Посты",
      component: (
        <ProfilePosts
          others
          getUserFeed={getUserFeed}
          addReaction={addReaction}
        />
      ),
    },
    {
      id: 2,
      active: false,
      name: "Оценено",
      component: (
        <ProfileLiked otherId={otherId} others addReaction={addReaction} />
      ),
    },
  ]);

  const handleClick = (value) => {
    setNavState(value);
  };

  return (
    <>
      <NavigationMobile
        navState={navState}
        useState={(value) => handleClick(value)}
        layoutId="mobileothers"
      />
      <OthersLeft
        navState={navState[0].active}
        data={data}
        ifChatExist={ifChatExist}
        pitchesFirst={pitchesFirst}
        superPitchesFirst={superPitchesFirst}
      />
      <Right
        handleClick={(value) => handleClick(value)}
        navState={navState}
        data={data}
        getUserFeed={getUserFeed}
        addReaction={addReaction}
      />
    </>
  );
};

export default OthersProfileWithNav;
