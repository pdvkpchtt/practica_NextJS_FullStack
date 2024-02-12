"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import NavigationMobile from "../../shared/ui/NavigationMobile";
import Left from "./Left";
import Right from "./Right";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfileLiked from "../../components/Profile/ProfileLiked";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import ProfileBookmarks from "../../components/Profile/ProfileBookmarks";
import useWindowDimensions from "./useWindowDimensions";

const Profile = ({
  data,
  getUserFeed,
  addReaction,
  userId,
  pitchesFirst,
  superPitchesFirst,
  role
}) => {
  const searchParams = useSearchParams();
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
      window.scrollY > ref?.current?.clientHeight - height + 24 + 87 &&
      trigger === true
    )
      setOpacity(true);
    else setOpacity(false);
  };

  if (typeof window !== "undefined")
    window.addEventListener("scroll", changeOpacity);

  console.log("client profile", data, searchParams.get("contacts"));
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
      name: "Посты",
      component: (
        <ProfilePosts
          getUserFeed={getUserFeed}
          addReaction={addReaction}
          userId={userId}
        />
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
      component: <ProfileLiked addReaction={addReaction} userId={userId} />,
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
        trigger={trigger}
        refElement={ref}
        opacity={opacity}
        searchParams={
          searchParams.get("contacts") !== null
            ? searchParams.get("contacts")
            : false
        }
        navState={navState[0].active}
        data={data}
        pitchesFirst={pitchesFirst}
        superPitchesFirst={superPitchesFirst}
      />
      <Right
        trigger={trigger}
        opacity={opacity}
        handleClick={(value) => handleClick(value)}
        navState={navState}
      />
    </>
  );
};

export default Profile;
