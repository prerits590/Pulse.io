"use client";
import { useEffect } from "react";
import { auth } from "../../../../libs/firebase";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          // Redirect to the login page if the user is not authenticated
          router.replace("/");
        }
      });

      // Cleanup the subscription when the component is unmounted
      return () => unsubscribe();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
