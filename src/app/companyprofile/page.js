import { redirect } from "next/navigation";
import { getFirstCompany } from "../../server/actions/company/getFirstCompany";

const CompanyPage = async () => {
  const check = await getFirstCompany();

  if (!check) return redirect("/profile");

  return redirect(`/companyprofile/${check}`);
};

export default CompanyPage;
