"use client";

import { useState, useEffect, useContext } from "react";
import { Waypoint } from "react-waypoint";

import CustomLoader from "../../shared/ui/CustomLoader";
import { fetchCompanies } from "../../server/actions/company/fetchCompanies";
import CompanyCard from "../../shared/ui/CompanyCard";
import { SearchNavContext } from "./SearchNavContext";
import Card from "../../shared/ui/Card";
import TextMain from "../../shared/Text/TextMain ";

const Companies = () => {
  const { updateCompanies } = useContext(SearchNavContext);

  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  const getComps = async (cursor) => {
    console.log("fetching");
    // if (loading) return;
    setLoading(true);
    const data = await fetchCompanies(cursor, updateCompanies);
    console.log("client companies", data);
    if (cursor.length) {
      setCompanies([...companies, ...data.data]);
    } else {
      setCompanies(data.data);
    }
    setCursor(data.cursor);
    setHasNextPage(data.hasNextPage);
    setLoading(false);
  };

  useEffect(() => {
    setCursor("");
    getComps("");
  }, [updateCompanies?.startFiltering, updateCompanies?.input]);

  useEffect(() => {
    if (updateCompanies?.startFiltering) {
      setCursor("");
      getComps("");
    }
  }, [fetchCompanies, updateCompanies]);

  return (
    <>
      {!companies ? (
        <div className="w-full flex justify-center items-center h-full">
          <CustomLoader diameter={36} />
        </div>
      ) : companies.length === 0 &&
        (updateCompanies?.startFiltering ||
          updateCompanies?.input?.length > 0) ? (
        <Card padding={12}>
          <TextMain text="Ничего не найдено" />
        </Card>
      ) : (
        <>
          {companies.map((item, key) => (
            <CompanyCard key={key} item={item} />
          ))}
          {hasNextPage ? (
            <Waypoint
              onEnter={async () => {
                console.log("Enter waypoint");
                await getComps(cursor);
              }}
              topOffset="50px"
            >
              <div className="w-full flex justify-center items-center h-full">
                <CustomLoader diameter={36} />
              </div>
            </Waypoint>
          ) : null}
        </>
      )}
    </>
  );
};

export default Companies;
