"use client";

import { useState, createContext } from "react";

import OfftopIcon from "../../shared/icons/feed/OfftopIcon.svg";
import EducationIcon from "../../shared/icons/feed/EducationIcon.svg";
import ForYouIcon from "../../shared/icons/feed/ForYouIcon.svg";

export const ModalContext = createContext();

const ModalContextWrap = ({ children }) => {
  const [modalCreatePost, setModalCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [navState, setNavState] = useState([
    {
      id: 0,
      active: true,
      name: "для вас",
      icon: ForYouIcon,
      route: "/feed/foryou",
    },
    {
      id: 1,
      active: false,
      name: "образование",
      icon: EducationIcon,
      route: "/feed/education",
    },
    {
      id: 2,
      active: false,
      name: "офтоп",
      icon: OfftopIcon,
      route: "/feed/offtop",
    },
  ]);

  return (
    <ModalContext.Provider
      value={{
        modalCreatePost,
        setModalCreatePost,
        posts,
        setPosts,
        navState,
        setNavState,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextWrap;
