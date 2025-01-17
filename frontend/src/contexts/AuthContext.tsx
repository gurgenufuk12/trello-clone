import React, { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { User } from "../types/User";
import { acceptBoardInvite } from "../services/InviteService";

interface AuthContextType {
  user: User | null;
  userProfile: User | null;

  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const db = getFirestore();

  const fetchUserProfile = async (id: string) => {
    const userDoc = await getDoc(doc(db, "users", id));
    if (userDoc.exists()) {
      setUserProfile(userDoc.data() as User);
    } else {
      setUserProfile(null);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({
          id: currentUser.uid,
          fullName: currentUser.displayName || "",
          email: currentUser.email || "",
          boards: [],
          boardRoles: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await fetchUserProfile(currentUser.uid);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await fetchUserProfile(result.user.uid);
      setUser({
        id: result.user.uid,
        fullName: result.user.displayName || "",
        email: result.user.email || "",
        boards: [],
        boardRoles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUserProfile: User = {
        id: result.user.uid,
        fullName: result.user.displayName || "",
        email: result.user.email || "",
        boards: [],
        boardRoles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, "users", result.user.uid), newUserProfile);

      // Handle pending invite
      const pendingInvite = localStorage.getItem("pendingInvite");
      if (pendingInvite) {
        const { inviteId, boardId } = JSON.parse(pendingInvite);
        await acceptBoardInvite(inviteId, result.user.uid);
        localStorage.removeItem("pendingInvite");
        window.location.href = `/board/${boardId}`;
      }

      setUser(newUserProfile);
      setUserProfile(newUserProfile);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ userProfile, user, loading, logout, login, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
