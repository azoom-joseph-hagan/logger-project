import { defineStore } from "pinia";
import { userData } from "~/data/data";

export const useUserStore = defineStore({
  id: "user-Store",
  state: () => {
    return {
      users: userData,
    };
  },
  getters: {
    nameAndId(state) {
      return `${state.users[0].name} ${state.users[0].id}`;
    },
  },
  actions: {
    updateUsername(userId: number, newName: string) {
      const user = this.users.find((user) => user.id === userId);
      if (user) {
        user.name = newName;
      }
    },
  },
});
