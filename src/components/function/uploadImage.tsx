import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

export async function uploadImage(file: File, path: string) {
  const storage = getStorage();
  const storageRef = ref(storage, path);
  const upload = uploadBytesResumable(storageRef, file);

  upload.on("state_changed", (error) => {
    console.log(error);
  });
}

