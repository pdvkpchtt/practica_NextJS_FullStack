"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import MobileHeader from "../../shared/ui/MobileHeader";
import EditLeft from "./EditLeft";
import EditRight from "./EditRight";

const EditProfile = ({
  data,
  updateProfileData,
  skills,
  userId,
  educationLevelData,
}) => {
  const router = useRouter();

  const [dataToUpdate, setDataToUpdate] = useState(data);

  return (
    <>
      <EditLeft
        data={data}
        setDataToUpdate={setDataToUpdate}
        dataToUpdate={dataToUpdate}
      />
      <EditRight
        userId={userId}
        skills={skills}
        data={data}
        educationLevelData={educationLevelData}
        setDataToUpdate={setDataToUpdate}
        dataToUpdate={dataToUpdate}
        updateProfileData={updateProfileData}
      />
    </>
  );
};

export default EditProfile;
