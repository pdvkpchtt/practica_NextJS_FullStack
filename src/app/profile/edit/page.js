import EditProfile from "../../../components/Edit/EditProfile";
import { getServSession } from "../../api/auth/[...nextauth]/route";
import { getProfile } from "../../../server/actions/getProfile";
import { updateProfile } from "../../../server/actions/updateProfile";
import { getAllSkills } from "../../../server/actions/getAllSkills";
import { getEducationLevel } from "../../../server/actions/search/getEducationLevel";

const EditPage = async () => {
  const session = await getServSession();

  const data = await getProfile({
    userId: session.user.id,
  });
  const skills = await getAllSkills();
  const educationLevelData = await getEducationLevel();

  console.log("profile", data);

  async function updateProfileData(data) {
    "use server";
    const session = await getServSession();
    console.log("edit data", data);
    const res = await updateProfile({ userId: session.user.id, data: data });

    return res;
  }

  return (
    <EditProfile
      data={data}
      educationLevelData={educationLevelData}
      skills={skills}
      updateProfileData={updateProfileData}
    />
  );
};

export default EditPage;
