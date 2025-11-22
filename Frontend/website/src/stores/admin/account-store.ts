import { create } from "zustand";

import { tNullable } from "@/types/nullish";
import { tAdminModel } from "@/models/[admin]/admin";

type tUseAccountStore = {
  account: tNullable<tAdminModel>;
  login: (account: tAdminModel) => void;
  logout: () => void;
};
const useAccountStore = create<tUseAccountStore>((set, get) => {
  return {
    account: null,

    login: (account: tAdminModel) => {
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
