"use client";

import { useState } from "react";

import NavigationMobile from "../../shared/ui/NavigationMobile";
import Left from "./Left";
import Right from "./Right";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfileLiked from "../../components/Profile/ProfileLiked";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import ProfileBookmarks from "../../components/Profile/ProfileBookmarks";

const Profile = ({
  data,
  getUserFeed,
  addReaction,
  userId,
  pitchesFirst,
  superPitchesFirst,
}) => {
  console.log("client profile", data);
  const [navState, setNavState] = useState([
    {
      id: 0,
      active: true,
      name: "Информация",
      component: <ProfileInfo data={data} />,
    },
    {
      id: 1,
      active: false,
      name: "Посты и ответы",
      component: (
        <ProfilePosts getUserFeed={getUserFeed} addReaction={addReaction} />
      ),
    },
    {
      id: 2,
      active: false,
      name: "Избранное",
      component: <ProfileBookmarks userId={userId} />,
    },

    {
      id: 3,
      active: false,
      name: "Оценено",
      component: <ProfileLiked addReaction={addReaction} />,
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
        layoutId="mobile"
      />
      <Left
        navState={navState[0].active}
        data={data}
        pitchesFirst={pitchesFirst}
        superPitchesFirst={superPitchesFirst}
      />
      <Right handleClick={(value) => handleClick(value)} navState={navState} />
    </>
  );
};

export default Profile;
