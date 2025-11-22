import { create } from "zustand";

import { tNullable } from "@/types/nullish";
import { tUserModel } from "@/models/[base]/user";

type tUseAccountStore = {
  account: tNullable<tUserModel>;
  login: (account: tUserModel) => void;
  logout: () => void;
};
const useAccountStore = create<tUseAccountStore>((set, get) => {
  return {
    account: null,

    login: (account: tUserModel) => {
      if (get().account) return;

      set({ account });
    },
    logout: () => {
      if (!get().account) return;

      set({ account: null });
    },
  };
});

export default useAccountStore;
