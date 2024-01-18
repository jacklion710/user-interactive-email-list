"use client";
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import Login from "@/components/Login";
import Opt from "@/components/Opt";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (user) {
    return <Opt user={user} onLogout={() => signOut(auth)} />;
  } else {
    return <Login />;
  }
}
