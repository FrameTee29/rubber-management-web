import { KeyLocalStorage } from "@constants/keyLocalStorage";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";

type TProps = {
  pageProps: {};
};

type AccessTokenDecode = {
  exp: number;
};

const withAuth = (WrappedComponent: any) => {
  const isTokenExpired = (exp: number) => {
    return Date.now() >= Number(exp) * 1000;
  };
  return (props: TProps) => {
    if (typeof window !== "undefined") {
      const router = useRouter();

      const accessToken = localStorage.getItem(KeyLocalStorage.accessToken);
      if (!accessToken) {
        router.push("/auth/signin");
        return null;
      }

      const accessTokenDecode: AccessTokenDecode = jwtDecode(accessToken);
      if (isTokenExpired(accessTokenDecode.exp)) {
        router.push("/auth/signin");
        return null;
      }

      if (
        !isTokenExpired(accessTokenDecode.exp) &&
        (router.pathname === "/auth/signin" ||
          router.pathname === "/auth/signup")
      ) {
        router.push("/");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
