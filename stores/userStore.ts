import { defineStore } from "pinia";
import type { UserType } from "~/types";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const users = ref([] as UserType[]);

    const getCurrentUser = (userId: number) => {
      return users.value.find((user) => user.id === userId);
    };

    const addUser = (newUser: UserType) => {
      users.value.push(newUser);
    };

    const updateUsername = (userId: number, newName: string) => {
      const user = users.value.find((user) => user.id === userId);
      if (user) {
        user.name = newName;
      } else {
        console.error("User not found with ID:", userId);
      }
    };
    return { users, getCurrentUser, updateUsername, addUser };
  },
  {
    persist: true,
  }
);
