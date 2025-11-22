"use client";

import { deleteCookie, getCookie } from "cookies-next/client";

import { useEffect } from "react";
import useAccountStore from "@/stores/admin/account-store";

export function useAccount() {
  const account = useAccountStore((state) => state.account);

  const storeLogin = useAccountStore((store) => store.login);
  const storeLogout = useAccountStore((store) => store.logout);

  useEffect(() => {
    const cookie = getCookie("admin-account");
    storeLogin({
      uuid: "550e8400-e29b-41d4-a716-446655440000",
      avatar: {
        url: "https://i.pravatar.ccss/150?img=3",
      },
      username: "john doe",
      dateOfBirth: "1990-05-15",
      email: "john.doe@example.com",
      updatedAt: "2025-11-22T12:34:56Z",
      createdAt: "2023-03-01T08:00:00Z",
    });
    if (cookie === undefined) return;

    const cookieAccount = JSON.parse(cookie);
    storeLogin(cookieAccount);
  }, [storeLogin]);

  function logout() {
    if (account === null) return;

    deleteCookie("admin-account");
    deleteCookie("admin-token");

    storeLogout();
  }

  return {
    account,
    logout,
  };
}
