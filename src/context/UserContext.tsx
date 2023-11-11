import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "src/firebaseconfig";

type user = {
  uid: string;
  displayName: string | null;
};

type UserContextProps = {
  children: React.ReactNode;
};

const UserContext = createContext<user | null>(null);
const userInStorage = localStorage.getItem("user");

export default function UserContextProvider({ children }: UserContextProps) {
  const user = userInStorage ? (JSON.parse(userInStorage) as user) : null;
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setCurrentUser({ uid: u.uid, displayName: u.displayName });
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
};
