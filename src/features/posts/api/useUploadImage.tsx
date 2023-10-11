import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { storage } from "src/firebaseconfig";

export const useUploadImage = () => {
  const [url, setUrl] = useState("");
  return async (file: File) => {
    if (file) {
      const imageRef = ref(storage, `images/${file.name}`);
      uploadBytes(imageRef, file).then(
        (): Promise<void> => getDownloadURL(imageRef).then(setUrl)
      );
    }
    return url;
  };
};
