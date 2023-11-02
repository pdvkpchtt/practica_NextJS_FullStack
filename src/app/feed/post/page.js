import { redirect } from "next/navigation";

const page = () => {
  redirect("/_not_found");
};

export default page;
