"use client";

import Right from "../../components/Profile/Right";
import { useLayoutEffect, useRef, useState } from "react";

import NavigationMobile from "../../shared/ui/NavigationMobile";
import OthersLeft from "./OthersLeft";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfileLiked from "../../components/Profile/ProfileLiked";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import useWindowDimensions from "../../components/Profile/useWindowDimensions";

const OthersProfileWithNav = ({
  isFirstTime,
  data,
  getUserFeed,
  addReaction,
  otherId,
  userId,
  ifChatExist,
  pitchesFirst,
  superPitchesFirst,
}) => {
  const { height, width } = useWindowDimensions();
  const ref = useRef(null);

  const [opacity, setOpacity] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== "undefined")
      setTrigger(height - ref?.current?.clientHeight < 86);
  }, [height]);

  const changeOpacity = () => {
    if (
      window.scrollY > ref?.current?.clientHeight - height + 24 + 86 &&
      trigger === true
    )
      setOpacity(true);
    else setOpacity(false);
  };

  if (typeof window !== "undefined")
    window.addEventListener("scroll", changeOpacity);

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
        <ProfileLiked
          otherId={otherId}
          others
          addReaction={addReaction}
          userId={userId}
        />
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
        trigger={trigger}
        refElement={ref}
        opacity={opacity}
        isFirstTime={isFirstTime}
        navState={navState[0].active}
        data={data}
        ifChatExist={ifChatExist}
        pitchesFirst={pitchesFirst}
        superPitchesFirst={superPitchesFirst}
      />
      <Right
        trigger={trigger}
        opacity={opacity}
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
