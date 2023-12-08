import { defineStore } from "pinia";
import { userData } from "~/data/data";

export const useUserStore = defineStore({
  id: "user-Store",
  state: () => {
    return {
      users: userData,
    };
  },
});
