"use client";

import { useState } from "react";

import ProfileLiked from "../../components/Profile/ProfileLiked";
import NavigationMobile from "../../shared/ui/NavigationMobile";
import CompanyInfo from "./CompanyInfo";
import CompanyLeft from "./CompanyLeft";
import CompanyRight from "./CompanyRight";
import CompanyVacancies from "./CompanyVacancies";

const CompanyProfile = ({ data, getUserFeed, addReaction, role, userId }) => {
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
      component: <CompanyVacancies role={role} id={data.id} userId={userId} />,
    },
    // {
    //   id: 2,
    //   active: false,
    //   name: "Посты и ответы",
    //   component: (
    //     <CompanyPosts
    //       company
    //       getUserFeed={getUserFeed}
    //       addReaction={addReaction}
    //     />
    //   ),
    // },

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
      <CompanyLeft navState={navState[0].active} data={data} />
      <CompanyRight
        handleClick={(value) => handleClick(value)}
        navState={navState}
      />
    </>
  );
};

export default CompanyProfile;
