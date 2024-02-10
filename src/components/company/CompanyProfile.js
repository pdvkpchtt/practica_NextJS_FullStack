"use client";

import { useLayoutEffect, useRef, useState } from "react";

import useWindowDimensions from "../../components/Profile/useWindowDimensions";
import ProfileLiked from "../../components/Profile/ProfileLiked";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import NavigationMobile from "../../shared/ui/NavigationMobile";
import CompanyInfo from "./CompanyInfo";
import CompanyLeft from "./CompanyLeft";
import CompanyRight from "./CompanyRight";
import CompanyVacancies from "./CompanyVacancies";

const CompanyProfile = ({ data, getUserFeed, addReaction, role, userId }) => {
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

  const [navState, setNavState] = useState([
    {
      id: 0,
      active: true,
      name: data.isStartap ? "О стартапе" : "О компании",
      component: <CompanyInfo data={data} />,
    },
    {
      id: 1,
      active: false,
      name: "Вакансии",
      component: (
        <CompanyVacancies
          role={role}
          id={data.id}
          username={data.username}
          userId={userId}
        />
      ),
    },
    {
      id: 2,
      active: false,
      name: "Посты",
      component: (
        <ProfilePosts
          company
          getUserFeed={getUserFeed}
          addReaction={addReaction}
        />
      ),
    },

    // {
    //   id: 2,
    //   active: false,
    //   name: "Оценено",
    //   component: <ProfileLiked company addReaction={addReaction} />,
    // },
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
      <CompanyLeft
        navState={navState[0].active}
        data={data}
        trigger={trigger}
        refElement={ref}
        opacity={opacity}
      />
      <CompanyRight
        trigger={trigger}
        opacity={opacity}
        handleClick={(value) => handleClick(value)}
        navState={navState}
      />
    </>
  );
};

export default CompanyProfile;
