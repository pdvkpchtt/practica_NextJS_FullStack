"use client";

import { useContext, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import { SearchNavContext } from "./SearchNavContext";
import CustomLoader from "../../shared/ui/CustomLoader";
import { fetchVacancies } from "../../server/actions/company/fetchVacancies";
import VacancyCard from "../../shared/ui/VacancyCard";
import Card from "../../shared/ui/Card";
import TextMain from "shared/Text/TextMain ";

const Vacancies = ({ session }) => {
  const { updateVacancies } = useContext(SearchNavContext);

  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [vacs, setVacs] = useState([]);

  const getVacs = async (cursor) => {
    console.log("fetching");
    // if (loading) return;
    setLoading(true);
    const data = await fetchVacancies(cursor, updateVacancies);
    console.log("client vacancies", data);
    if (cursor.length) {
      setVacs([...vacs, ...data.data]);
    } else {
      setVacs(data.data);
    }
    setCursor(data.cursor);
    setHasNextPage(data.hasNextPage);
    setLoading(false);
  };

  useEffect(() => {
    setCursor("");
    getVacs("");
  }, [updateVacancies?.startFiltering, updateVacancies?.input]);

  useEffect(() => {
    if (updateVacancies?.startFiltering) {
      setCursor("");
      getVacs("");
    }
  }, [fetchVacancies, updateVacancies]);

  return (
    <>
      {!vacs ? (
        <div className="w-full flex justify-center items-center h-full">
          <CustomLoader diameter={36} />
        </div>
      ) : vacs.length === 0 &&
        (updateVacancies?.startFiltering ||
          updateVacancies?.input?.length > 0) ? (
        <Card padding={12}>
          <TextMain text="Ничего не найдено" />
        </Card>
      ) : (
        <>
          {vacs.map((item, key) => (
            <VacancyCard
              role={session.user.role}
              userId={session.user.id}
              key={key}
              item={item}
            />
          ))}
          {hasNextPage ? (
            <Waypoint
              onEnter={async () => {
                console.log("Enter waypoint");
                await getVacs(cursor);
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

export default Vacancies;
