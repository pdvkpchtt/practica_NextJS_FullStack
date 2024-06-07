import FiltersWrap from "../../components/search/FiltersWrap";
import SearchNav from "../../components/search/SearchNav";
import SearchNavContextWrap from "../../components/search/SearchNavContext";

const SearchLayout = ({ children }) => {
  return (
    <div className="flex flex-row [@media(hover)]:mt-[62px] gap-[16px] w-full h-full">
      <SearchNavContextWrap>
        <div className={`max-w-[704px] w-full h-full`}>
          <SearchNav />
          {children}
        </div>
        <FiltersWrap />
      </SearchNavContextWrap>
    </div>
  );
};

export default SearchLayout;
