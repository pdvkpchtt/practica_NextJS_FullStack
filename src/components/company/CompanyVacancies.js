"use client";

import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import VacancyCard from "../../shared/ui/VacancyCard";
import { fetchCompanyVacancies } from "../../server/actions/company/fetchCompanyVacancies";
import TextMain from "../../shared/Text/TextMain ";
import Card from "../../shared/ui/Card";
import CustomLoader from "../../shared/ui/CustomLoader";
import { LayoutGroup } from "framer-motion";

const CompanyVacancies = ({ id, others = false, role, userId }) => {
  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);

  const getUsers = async (cursor) => {
    console.log("fetching");
    if (loading) return;
    setLoading(true);
    const data = await fetchCompanyVacancies(id, cursor);
    console.log("client vacancies", data);
    if (cursor.length) {
      setUsers([...users, ...data.data]);
    } else {
      setUsers(data.data);
    }
    setCursor(data.cursor);
    setHasNextPage(data.hasNextPage);
    setLoading(false);
  };

  useEffect(() => {
    setCursor("");
    getUsers("");
  }, [fetchCompanyVacancies]);

  return (
    <>
      {!users ? (
        <div className="w-full flex justify-center items-center h-full">
          <CustomLoader diameter={36} />
        </div>
      ) : users?.length === 0 ? (
        <Card style={"flex justify-center"} padding={16}>
          <div className="items-center flex flex-col gap-[24px] justify-center w-full text-center ">
            <TextMain
              text={`У компании пока нет вакансий`}
              style="text-[14px] font-medium leading-[18px] tracking-[-0.013em]"
            />
          </div>
        </Card>
      ) : (
        <>
          <LayoutGroup id="compvac">
            {users.map((item, key) => (
              <VacancyCard role={role} key={key} item={item} userId={userId} />
            ))}
          </LayoutGroup>
          {hasNextPage ? (
            <Waypoint
              onEnter={async () => {
                console.log("Enter waypoint");
                await getUsers(cursor);
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

export default CompanyVacancies;
