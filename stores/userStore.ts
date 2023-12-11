import { defineStore } from "pinia";
import type { ProjectDayPercentageType, UserType } from "~/types";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const users = ref<UserType[]>([]);

    const getCurrentUser = (userId: number) => {
      return users.value.find((user) => user.id === userId);
    };

    const getCurrentDay = (userId: number, weekId: number, dayId: number) => {
      const user = getCurrentUser(userId);
      const week = user?.weekData[weekId];
      const day = week && week[dayId];
      return day;
    };

    const addUser = (newUser: UserType) => {
      users.value.push(newUser);
    };

    const pushProjectData = (
      userId: number,
      weekId: number,
      dayId: number,
      projectData: ProjectDayPercentageType
    ) => {
      const day = getCurrentDay(userId, weekId, dayId);
      day?.trackedProjects.push(projectData);
    };

    const updateUsername = (userId: number, newName: string) => {
      const user = users.value.find((user) => user.id === userId);
      if (user) {
        user.name = newName;
      } else {
        console.error("User not found with ID:", userId);
      }
    };
    return {
      users,
      getCurrentUser,
      updateUsername,
      addUser,
      getCurrentDay,
      pushProjectData,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
