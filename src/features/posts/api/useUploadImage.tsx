import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { storage } from "src/firebaseconfig";

export const useUploadImage = () => {
  let url: string;
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(false);
  return async (file: File) => {
    const imageRef = ref(storage, `images/${file.name}`);
    try {
      setLoading(true);
      await uploadBytes(imageRef, file);
      await getDownloadURL(imageRef).then((res) => {
        url = res;
      });
    } catch (error) {
      setError(error);
      setLoading(false);
      return { url, error, loading };
    } finally {
      setLoading(false);
    }
    return { url, error };
  };
};
