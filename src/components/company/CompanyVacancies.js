"use client";

import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import VacancyCard from "../../shared/ui/VacancyCard";
import { fetchCompanyVacancies } from "../../server/actions/company/fetchCompanyVacancies";
import TextMain from "../../shared/Text/TextMain ";
import Card from "../../shared/ui/Card";
import CustomLoader from "../../shared/ui/CustomLoader";
import { LayoutGroup } from "framer-motion";
import Image from "next/image";

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
          <div className="[@media(pointer:coarse)]:items-center [@media(pointer:coarse)]:justify-center flex flex-col gap-[24px]  w-full text-start ">
            {others === false && (
              <div className="w-full flex justify-center items-center">
                <Image
                  src={"/TwoGuys1post.png"}
                  quality={100}
                  unoptimized
                  className="h-[300px] w-fit"
                  width={1620}
                  height={2160}
                />
              </div>
            )}
            <TextMain
              text={"У компании поа нет вакансий"}
              style="text-[16px] font-medium leading-[19px] tracking-[-0.24px]"
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
