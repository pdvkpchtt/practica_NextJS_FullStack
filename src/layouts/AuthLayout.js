import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getServSession } from "../app/api/auth/[...nextauth]/route";
import { finishRegistration } from "server/actions/finishRegistration";

const AuthLayout = async ({ children }) => {
  const session = await getServSession();
  const headersList = headers();
  const fullUrl = headersList.get("x-invoke-path") || "";

  const urlForParams = headersList?.get("referer") || "http://testhr/";
  console.log(urlForParams, "asasasassasawwww");
  const { searchParams } = new URL(urlForParams);
  const company = searchParams.get("company");
  const hrtoken = searchParams.get("hrtoken");
  console.log(company, hrtoken, "fa2ag");

  console.log(!["/auth/verify", "/auth"].includes(fullUrl));

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
    if (company === null) return redirect("/auth/role");
    else {
      await finishRegistration("new_hr", company);
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
