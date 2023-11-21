"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  const pathname = usePathname();
  // ${
  //   !isSearch
  //     ? ""
  //     : "pt-[24px] pb-[0px] [@media(pointer:coarse)]:py-[0px]"
  // }
  // ${!isHideBottomNav && "[@media(pointer:coarse)]:mb-[0]"}
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div
        className={`
        ${
          pathname.includes("/feed") ||
          (pathname.includes("/profile") && !pathname.includes("/edit")) ||
          (pathname.includes("/companyprofile") &&
            !pathname.includes("/edit") &&
            !pathname.includes("/createvacancy"))
            ? "h-full"
            : "h-[calc(100vh-62px)]"
        }
        ${pathname.includes("/search") ? "py-[0px]" : "py-[24px] "}
        ${
          (pathname === "/companyprofile/createvacancy" ||
            pathname.includes("/vacancy/")) &&
          "h-full [@media(hover)]:py-[0px]"
        }
        ${
          pathname === "/companyprofile/edit" ||
          (pathname === "/profile/edit" && "h-full")
        }
        [@media(pointer:coarse)]:h-[100vh]
        flex flex-col justify-start
        max-w-[1012px] [@media(hover)]:min-w-[1012px] [@media(pointer:coarse)]:max-w-[500px] mx-auto 
        px-[16px] [@media(pointer:coarse)]:py-0 [@media(pointer:coarse)]:px-0
        items-start [@media(pointer:coarse)]:items-center            
       `}
      >
        {children}
      </div>

      <ToastContainer
        containerId={"forCopy"}
        toastClassName={() =>
          "relative flex rounded-[20px] text-[16px] font-medium leading-[19px] tracking-[-0.24px] select-none [@media(pointer:coarse)]:rounded-[0px] shadow h-[50px] p-1 justify-between overflow-hidden cursor-pointer bg-[#fff] text-[#2c2c2c] dark:bg-[#212122] dark:text-white"
        }
        limit={1}
      />
    </ThemeProvider>
  );
};

export default Layout;
