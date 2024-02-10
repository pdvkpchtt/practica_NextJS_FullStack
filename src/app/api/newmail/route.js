import { checkAndChange } from "../../../server/actions/changeEmail/checkAndChange";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const isVerified = await checkAndChange(token, email);

  if (isVerified?.status === "good")
    return Response.redirect(`${process.env.NEXTAUTH_URL}/profile/edit`, 302);

  return Response.redirect(`${process.env.NEXTAUTH_URL}/_not_found`, 302);
}
