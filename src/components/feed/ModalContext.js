"use client";

import { useState, createContext } from "react";

import OfftopIcon from "../../shared/icons/feed/OfftopIcon";
import ForYouIcon from "../../shared/icons/feed/ForYouIcon";
import FutureIcon from "../../shared/icons/feed/FutureIcon";

export const ModalContext = createContext();

const ModalContextWrap = ({ children, connectionsCount }) => {
  const [modalCreatePost, setModalCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [navState, setNavState] = useState(
    connectionsCount === 0
      ? [
          {
            id: 1,
            active: true,
            name: "yes future!",
            icon: <FutureIcon />,
            route: "/feed/yesfuture",
          },
          {
            id: 2,
            active: false,
            name: "офтоп",
            icon: <OfftopIcon />,
            route: "/feed/offtop",
          },
        ]
      : [
          {
            id: 0,
            active: true,
            name: "для вас",
            icon: <ForYouIcon />,
            route: "/feed/foryou",
          },
          {
            id: 1,
            active: false,
            name: "yes future!",
            icon: <FutureIcon />,
            route: "/feed/yesfuture",
          },
          {
            id: 2,
            active: false,
            name: "офтоп",
            icon: <OfftopIcon />,
            route: "/feed/offtop",
          },
        ]
  );

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
