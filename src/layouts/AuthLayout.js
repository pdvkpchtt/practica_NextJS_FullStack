import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getServSession } from "../app/api/auth/[...nextauth]/route";
import { finishRegistration } from "../server/actions/finishRegistration";
import { checkInvite } from "../server/actions/hr/checkInvite";

const AuthLayout = async ({ children }) => {
  const session = await getServSession();
  const headersList = headers();
  const fullUrl = headersList.get("x-invoke-path") || "";

  const urlForParams = headersList?.get("referer") || "http://testhr/";
  const { searchParams } = new URL(urlForParams);
  const paramsEmail = searchParams.get("email");
  const paramsToken = searchParams.get("hrtoken");
  console.log(urlForParams, paramsEmail, paramsToken, "asasasassasawwww");

  if (paramsEmail) console.log(!["/auth/verify", "/auth"].includes(fullUrl));

  if (!session?.user?.id && fullUrl === "/") {
    return redirect("/landing");
  }
  if (
    !session?.user?.id &&
    !["/auth/verify", "/auth", "/landing", "/"].includes(fullUrl)
  ) {
    return redirect("/auth");
  }
  if (
    !session?.user?.role &&
    !["/auth/verify", "/auth", "/auth/role", "/landing"].includes(fullUrl)
  ) {
    if (!paramsEmail || !paramsToken) return redirect("/auth/role");
    else {
      const res = await checkInvite(paramsToken, paramsEmail);
      if (res.status === false) return redirect("/auth/role");

      await finishRegistration("new_hr", res.company);
      return redirect("profile");
    }
  }

  // if (
  //   session?.user?.role === "hr_no_nickname" &&
  //   fullUrl !== "/companyprofile/edit"
  // )
  //   return redirect("/companyprofile/edit");

  if (
    session?.user?.role &&
    ["/auth/role", "/auth", "/", ""].includes(fullUrl)
  ) {
    if (
      session?.user?.role === "hr_no_nickname" &&
      fullUrl !== "/companyprofile/edit"
    )
      return redirect("/companyprofile/edit");

    return redirect("/feed");
  }
  if (["/", ""].includes(fullUrl)) return redirect("/feed");

  // company
  // if (session?.user?.role === "company" && fullUrl === "/profile") {
  //   return redirect("/companyprofile");
  // }
  // if (session?.user?.role === "company" && fullUrl === "/profile/edit") {
  //   return redirect("/companyprofile/edit");
  // }
  // if (session?.user?.role === "student" && fullUrl === "/companyprofile") {
  //   return redirect("/profile");
  // }

  if (
    session?.user?.role === "student" &&
    fullUrl.includes("/companyprofile") &&
    fullUrl.includes("/edit")
  ) {
    return redirect("/profile/edit");
  }
  if (session?.user?.role === "student" && fullUrl.includes("/createvacancy")) {
    return redirect("/profile");
  }
  if (fullUrl === "/search") {
    return redirect("/search/vacancies");
  }
  //   if (
  //     session?.user?.role === "company" &&
  //     !session?.user?.companyName &&
  //     fullUrl !== "/companyprofile/edit"
  //   ) {
  //     return redirect("/companyprofile/edit");
  //   }
  // company

  return <div className={"auth w-full "}>{children}</div>;
};

export default AuthLayout;
