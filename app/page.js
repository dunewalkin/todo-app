"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
   const router = useRouter();

   useEffect(() => {
      const checkAuth = async () => {
         try {
         const res = await fetch('/api/user', {
            method: 'GET',
            credentials: 'include', 
         });

         if (res.ok) {
            router.push('/tasks');
         } else {
            router.push('/login');
         }
         } catch (error) {
         console.error("Error checking authentication:", error);
         router.push('/login'); 
         }
      };

      checkAuth();
   }, [router]);

   return <p>Redirecting...</p>; 
};

export default Home;