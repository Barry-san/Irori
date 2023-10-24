import { db } from "src/firebaseconfig";
import { setDoc, getDoc, doc } from "firebase/firestore";

export const bookMarkPost = (postId: string, uid: string) => {
  getDoc(doc(db, `bookmarks/${uid}`))
    .then((data) => {
      const bookmarks = { bookmarks: [data.data, postId] };
      setDoc(doc(db, `bookmarks/${uid}`), bookmarks).then(alert);
    })
    .catch((err) => {
      console.log(err);
    });
};
