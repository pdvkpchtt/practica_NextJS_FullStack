import { getAllSkills } from "../../server/actions/getAllSkills";
import { getPeoples } from "../../server/actions/getPeoples";
import CustomLoader from "../../shared/ui/CustomLoader";

const SearchPage = () => {
  return (
    <div className="overflow-y-auto [@media(pointer:coarse)]:mt-[77px] flex items-center justify-center [@media(hover)]:max-h-[calc(100vh-230px)] h-full">
      <CustomLoader />
    </div>
  );
};

export default SearchPage;
