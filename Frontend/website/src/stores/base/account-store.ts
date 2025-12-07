import { create } from "zustand";

import { tNullable } from "@/types/nullish";
import { tUserModel } from "@/models/[base]/user";

type tUseAccountStore = {
  account: tNullable<tUserModel>;
  login: (account: tUserModel) => void;
  logout: () => void;
};
const useAccountStore = create<tUseAccountStore>((set, get) => {
  const account = null;

  function login(account: tUserModel) {
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
