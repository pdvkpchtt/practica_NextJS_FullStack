import CreateCompany from "../../../components/createcompany/CreateCompany";
import { getBigCities } from "../../../server/actions/company/getBigCities";
import {
  getCompanyEmployee,
  getCompanyIndustries,
} from "../../../server/actions/company/getCompanyIndustries";

const CreateCompanyPage = async () => {
  const itemsForDD = await getCompanyIndustries();
  const itemsForDD2 = await getCompanyEmployee();
  const itemsForDD3 = await getBigCities();

  return (
    <CreateCompany
      itemsForDD={itemsForDD}
      itemsForDD2={itemsForDD2}
      itemsForDD3={itemsForDD3}
    />
  );
};

export default CreateCompanyPage;
