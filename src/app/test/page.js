import { writeFile } from "fs/promises";
import { join } from "path";
import { uploadAvatar } from "../../server/actions/uploadAvatar";

export default function ServerUploadPage() {
  return (
    <main className="mt-[100px]">
      <h1>React Server Component: Upload</h1>
      <form action={uploadAvatar}>
        <input type="file" name="file" />
        <input type="submit" value="Upload" />
      </form>
    </main>
  );
}
