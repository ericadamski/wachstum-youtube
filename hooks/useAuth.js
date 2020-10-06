import useSWR from "swr";
import Router from "next/router";
import Cookie from "js-cookie";

export default function useAuth(initialData) {
  const { data: user } = useSWR(
    "/api/user",
    async (route) => {
      const authRequest = await fetch(route, {
        header: {
          authorization: Cookie.get("_wsp"),
        },
      });

      if (authRequest.ok) {
        return authRequest.json();
      } else {
        Cookie.remove("_wsp");
      }
    },
    { initialData }
  );

  return {
    ...user,
    logout() {
      Cookie.remove("_wsp");
    },
  };
}
