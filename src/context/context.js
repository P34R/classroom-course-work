import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from '../lib/firebase';

const AddContext = createContext();

export function useMyContext(){
    return useContext(AddContext);
}

export function ContextProvider({children}) {
    const [createClassDialog,setCreateClassDialog] = useState(false);
    const [joinClassDialog,setJoinClassDialog] = useState(false);
    const [loggedIn,setLoggedIn] = useState(null);
    const [loggedInMail,setLoggedInMail] = useState(null);
    const login=()=>{
        auth.signInWithPopup(provider)
    };

    const logout =()=>{
        auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            setLoggedInMail(authUser.email);
            setLoggedIn(authUser);
          } else {
            setLoggedInMail(null);
            setLoggedIn(null);
          }
        });
    
        return () => unsubscribe();
      }, []);
    const value={
        createClassDialog,
        setCreateClassDialog,
        joinClassDialog,
        setJoinClassDialog,
        login,
        logout,
        loggedIn,
        loggedInMail,
    };
    return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
}