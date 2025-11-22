"use client";

import { deleteCookie, getCookie } from "cookies-next/client";

import { useEffect } from "react";
import useAccountStore from "@/stores/base/account-store";

export function useAccount() {
  const account = useAccountStore((state) => state.account);

  const storeLogin = useAccountStore((store) => store.login);
  const storeLogout = useAccountStore((store) => store.logout);

  useEffect(() => {
    const cookie = getCookie("user-account");
    if (cookie === undefined) return;

    const cookieAccount = JSON.parse(cookie);
    storeLogin(cookieAccount);
  }, [storeLogin]);

  function logout() {
    if (account === null) return;

    deleteCookie("user-account");
    deleteCookie("user-token");

    storeLogout();
  }

  return {
    account,
    logout,
  };
}
