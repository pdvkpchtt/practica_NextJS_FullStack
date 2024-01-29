import { updateCompanyProfile } from "../../../../server/actions/company/updateCompanyProfile";
import { getServSession } from "../../../api/auth/[...nextauth]/route";
import { getCompanyProfile } from "../../../../server/actions/company/getCompanyProfile";
import EditCompany from "../../../../components/companyedit/EditCompany";
import {
  getCompanyEmployee,
  getCompanyIndustries,
} from "../../../../server/actions/company/getCompanyIndustries";
import { getBigCities } from "../../../../server/actions/company/getBigCities";
import { getCompany } from "../../../../server/actions/company/getCompany";

const CompanyEditPage = async ({ params: { id } }) => {
  const session = await getServSession();

  const data = await getCompany({
    companyId: id,
  });
  const itemsForDD = await getCompanyIndustries();
  const itemsForDD2 = await getCompanyEmployee();
  const itemsForDD3 = await getBigCities();

  console.log("company", data);

  async function updateCompanyData(updData) {
    "use server";
    const session = await getServSession();
    console.log("edit data", updData);
    const res = await updateCompanyProfile({
      userId: session.user.id,
      data: updData,
      companyId: data?.id,
    });

    return res;
  }

  return (
    <EditCompany
      itemsForDD={itemsForDD}
      itemsForDD2={itemsForDD2}
      itemsForDD3={itemsForDD3}
      data={data}
      dataToCompare={data}
      updateCompanyData={updateCompanyData}
      userId={session.user.id}
    />
  );
};

export default CompanyEditPage;
