"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import MobileHeader from "../../shared/ui/MobileHeader";
import EditLeft from "./EditLeft";
import EditRight from "./EditRight";

const EditProfile = ({
  data,
  dataToCompare,
  updateProfileData,
  skills,
  userId,
  educationLevelData,
}) => {
  const router = useRouter();

  const [dataToUpdate, setDataToUpdate] = useState(data);

  // validation
  const [status, setStatus] = useState(null);
  // validation

  console.log(dataToUpdate, "dataToUpdate");

  return (
    <>
      <EditLeft
        data={data}
        setDataToUpdate={setDataToUpdate}
        dataToUpdate={dataToUpdate}
        status={status}
        setStatus={setStatus}
      />
      <EditRight
        userId={userId}
        skills={skills}
        data={data}
        dataToCompare={dataToCompare}
        educationLevelData={educationLevelData}
        setDataToUpdate={setDataToUpdate}
        dataToUpdate={dataToUpdate}
        updateProfileData={updateProfileData}
        status={status}
        setStatus={setStatus}
      />
    </>
  );
};

export default EditProfile;
