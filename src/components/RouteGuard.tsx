import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/Auth/AuthProvider";

export { RouteGuard };

function RouteGuard({ children }: any) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { fetchCurrentUser, currentUser } = useAuth();

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/signin"];
    const adminPaths = ["/uploads"];
    const path = url.split("?")[0];
    const res = await fetchCurrentUser();
    const user = res.data.getSignedInUser;
    console.log(user);
    if (
      (!user && !publicPaths.includes(path)) ||
      (adminPaths.includes(path) && user?.role !== "Admin")
    ) {
      setAuthorized(false);
      router.push("/signin");
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
