import { defineStore } from "pinia";
import { userData } from "~/data/data";

export const useUserStore = defineStore(
  "userStore",
  () => {
    // const users = ref(userData);
    const users = ref([
      { name: "Jack", id: 1 },
      { name: "Jim", id: 2 },
      { name: "Bill", id: 3 },
    ]);

    const getCurrentUser = (userId: number) => {
      return users.value.find((user) => user.id === userId);
    };

    const updateUsername = (userId: number, newName: string) => {
      const user = users.value.find((user) => user.id === userId);
      if (user) {
        user.name = newName;
      }
    };
    return { users, getCurrentUser, updateUsername };
  },
  {
    persist: true,
  }
);
