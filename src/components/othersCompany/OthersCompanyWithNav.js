"use client";

import Right from "../../components/Profile/Right";
import { useState } from "react";

import NavigationMobile from "../../shared/ui/NavigationMobile";
import OthersCompanyLeft from "./OthersCompanyLeft";
import CompanyInfo from "../../components/company/CompanyInfo";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import ProfileLiked from "../../components/Profile/ProfileLiked";
import CompanyVacancies from "../../components/company/CompanyVacancies";

const OthersCompanyWithNav = ({
  data,
  getUserFeed,
  addReaction,
  otherId,
  userId,
  role,
}) => {
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
        <CompanyVacancies role={role} others id={data.id} userId={userId} />
      ),
    },
    // {
    //   id: 2,
    //   active: false,
    //   name: "Посты и ответы",
    //   component: (
    //     <ProfilePosts
    //       company
    //       others
    //       getUserFeed={getUserFeed}
    //       addReaction={addReaction}
    //     />
    //   ),
    // },
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
      <OthersCompanyLeft navState={navState[0].active} data={data} />
      <Right handleClick={(value) => handleClick(value)} navState={navState} />
    </>
  );
};

export default OthersCompanyWithNav;
