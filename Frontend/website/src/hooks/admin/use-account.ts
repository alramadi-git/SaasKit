"use client";

import { deleteCookie, getCookie } from "cookies-next/client";

import { useEffect } from "react";
import useAccountStore from "@/stores/admin/account-store";

export function useAccount() {
  const account = useAccountStore((state) => state.account);

  const login = useAccountStore((store) => store.login);
  const logout = useAccountStore((store) => store.logout);

  useEffect(() => {
    const cookie = getCookie("admin-account");
    if (cookie === undefined) return;

    const cookieAccount = JSON.parse(cookie);
    login(cookieAccount);
  }, [login]);

  function _logout() {
    if (account === null) return;

    deleteCookie("admin-account");
    deleteCookie("admin-token");

    logout();
  }

  return {
    account,
    logout: _logout,
  };
}
