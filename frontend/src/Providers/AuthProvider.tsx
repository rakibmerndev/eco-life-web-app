import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";

import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import toast from "react-hot-toast";

//* interfaces
interface AuthInfo {
  loading: boolean;
  createUser: (email: string, password: string) => void;
  signInUser: (email: string, password: string) => void;
  signOutUser: () => void;
  updateUser: (name: string, photo: string) => void;
  googleSignIn: () => void;
  sendResetPasswordEmail: (email: string) => void;
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

// ? default auth info

const defaultAuthInfo: AuthInfo = {
  loading: false,
  user: null,
  createUser: () => {},
  signInUser: () => {},
  signOutUser: () => {},
  updateUser: () => {},
  googleSignIn: () => {},
  sendResetPasswordEmail: () => {},
};

// ? create context

export const AuthContext = createContext<AuthInfo>(defaultAuthInfo);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const AuthProvider: FC<AuthProviderProps> = ({ children }): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  //? create user with email and password

  const createUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signup successful!");

      const currentUser = auth.currentUser;

      if (currentUser) {
        await sendEmailVerification(currentUser);
        toast.success("Verification email sent!");
      }
    } catch (error) {
      setLoading(true);
      if (error instanceof Error) {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          toast.error("Email already in use!");
        }
      }
    }
  };

  // ?  sign in user with email and password

  const signInUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      toast.success("Login successful!");
    } catch (error) {
      setLoading(true);
      if (error instanceof Error) {
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          toast.error("invalid credential!");
        }
      }
    }
  };

  //? sign out current user

  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast.success("Logout successful!");
    } catch (error) {
      setLoading(true);
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  //? update current user

  const updateUser = async (name: string, photo: string) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(error.message);
      }
    }
  };

  // sign in with google

  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        toast.success("Login successful!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  // ? send reset password email

  const sendResetPasswordEmail = async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset password email sent!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.log(error.message);
      }
    }
  };

  //? onAuthStateChanged

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        console.log(currentUser);
      } else {
        setUser(null);
        setLoading(true);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    loading,
    createUser,
    signInUser,
    signOutUser,
    updateUser,
    user,
    googleSignIn,
    sendResetPasswordEmail,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
