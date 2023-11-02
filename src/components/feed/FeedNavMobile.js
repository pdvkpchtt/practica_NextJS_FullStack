"use client";

import { useContext } from "react";
import { usePathname } from "next/navigation";

import NavigationMobile from "../../shared/ui/NavigationMobile";
import { ModalContext } from "./ModalContext";

const FeedNavMobile = () => {
  const pathname = usePathname();

  const { navState, setNavState } = useContext(ModalContext);

  if (!pathname.includes("/feed/post"))
    return (
      <NavigationMobile
        withNav
        withLogo
        navState={navState}
        useState={(value) => setNavState(value)}
        layoutId="feedmobile"
      />
    );
};

export default FeedNavMobile;
