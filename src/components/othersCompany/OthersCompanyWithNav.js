"use client";

import Right from "../../components/Profile/Right";
import { useLayoutEffect, useRef, useState } from "react";

import NavigationMobile from "../../shared/ui/NavigationMobile";
import OthersCompanyLeft from "./OthersCompanyLeft";
import CompanyInfo from "../../components/company/CompanyInfo";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import ProfileLiked from "../../components/Profile/ProfileLiked";
import CompanyVacancies from "../../components/company/CompanyVacancies";
import useWindowDimensions from "../../components/Profile/useWindowDimensions";

const OthersCompanyWithNav = ({
  data,
  getUserFeed,
  addReaction,
  otherId,
  userId,
  role,
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

  const [navState, setNavState] = useState([
    {
      id: 0,
      active: true,
      name: data.isStartap ? "О стартапе" : "О компании",
      component: <CompanyInfo others data={data} />,
    },
    {
      id: 1,
      active: false,
      name: "Вакансии",
      component: (
        <CompanyVacancies
          role={role}
          others
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
          others
          getUserFeed={getUserFeed}
          addReaction={addReaction}
        />
      ),
    },
    // {
    //   id: 2,
    //   active: false,
    //   name: "Оценено",
    //   component: (
    //     <ProfileLiked otherId={otherId} others addReaction={addReaction} />
    //   ),
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
        layoutId="mobileothers"
      />
      <OthersCompanyLeft
        navState={navState[0].active}
        data={data}
        trigger={trigger}
        refElement={ref}
        opacity={opacity}
      />
      <Right
        handleClick={(value) => handleClick(value)}
        navState={navState}
        trigger={trigger}
        opacity={opacity}
      />
    </>
  );
};

export default OthersCompanyWithNav;
