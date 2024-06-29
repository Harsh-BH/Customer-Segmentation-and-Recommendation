import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Ensure the path is correct
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await incrementWebVisits(user.uid); // Increment web visits on login
    return userCredential;
  };

  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Initialize user document
    await setDoc(doc(db, "customers", user.uid), {
      id: user.uid,
      email: user.email,
      year_birth: "",
      education: "",
      marital_status: "",
      income: "",
      kidhome: "",
      teenhome: "",
      dt_customer: new Date().toISOString(),
      recency: "",
      complain: "",
      purchases: {
        wines: 0,
        fruits: 0,
        meat: 0,
        fish: 0,
        sweets: 0,
        gold: 0,
      },
      promotion: {
        NumDealsPurchases: 0,
        AcceptedCmp1: 0,
        AcceptedCmp2: 0,
        AcceptedCmp3: 0,
        AcceptedCmp4: 0,
        AcceptedCmp5: 0,
        Response: 0,
      },
      place: {
        NumWebPurchases: 0,
        NumCatalogPurchases: 0,
        NumStorePurchases: 0,
        NumWebVisitsMonth: 1, // Initialize with 1 visit
      },
    });

    return userCredential;
  };

  const logout = () => {
    return signOut(auth);
  };

  const incrementWebVisits = async (uid) => {
    const docRef = doc(db, "customers", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const currentVisits = docSnap.data().place.NumWebVisitsMonth || 0;
      await updateDoc(docRef, {
        "place.NumWebVisitsMonth": currentVisits + 1,
      });
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
