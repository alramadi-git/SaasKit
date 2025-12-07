import { create } from "zustand";

import { tNullable } from "@/types/nullish";
import { tAdminModel } from "@/models/[admin]/admin";

type tUseAccountStore = {
  account: tNullable<tAdminModel>;
  login: (account: tAdminModel) => void;
  logout: () => void;
};
const useAccountStore = create<tUseAccountStore>((set, get) => {
  const account = null;

  function login(account: tAdminModel) {
    if (get().account) return;

    set({ account });
  }

  function logout() {
    if (!get().account) return;

    set({ account: null });
  }

  return {
    account,
    login,
    logout,
  };
});

export default useAccountStore;
