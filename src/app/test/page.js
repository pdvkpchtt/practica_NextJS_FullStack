"use client";
import UpploadAvatarModal from "components/edit/UpploadAvatarModal";
import { useState } from "react";
import { uploadAvatar } from "../../server/actions/uploadAvatar";

export default function ServerUploadPage() {
  const [open, srtOpan] = useState(false);

  return (
    <main className="mt-[100px]">
      <UpploadAvatarModal handleClose={() => srtOpan(false)} isOpen={open} />

      <button onClick={() => srtOpan(true)}>asdads</button>

      <form action={uploadAvatar}>
        <input type="file" name="file" />
        <input type="submit" value="Upload" />
      </form>
    </main>
  );
}
