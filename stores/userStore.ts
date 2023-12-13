import { defineStore } from "pinia";
import type { ProjectDayPercentageType, UserType } from "~/types";

export const useUserStore = defineStore(
  "userStore",
  () => {
    // state
    const users = ref<UserType[]>([]);
    const currentUser = ref<UserType | null>(null);

    //user data
    const getUserFromId = (userId: number) => {
      return users.value.find((user) => user.id === userId);
    };

    const setCurrentUser = (id: number) => {
      const current = getUserFromId(id);
      if (current) {
        currentUser.value = current;
      }
    };

    const getCurrentUser = () => {
      return currentUser.value;
    };

    const getAllUsers = () => {
      return users.value;
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

    //day data
    const getCurrentDay = (userId: number, weekId: number, dayId: number) => {
      const user = getUserFromId(userId);
      const week = user?.weekData[weekId];
      const day = week && week[dayId];
      return day;
    };

    const getDailyTotalMins = (
      userId: number,
      weekId: number,
      dayId: number
    ) => {
      const day = getCurrentDay(userId, weekId, dayId);
      if (day) {
        return day.totalLoggedTimeMins;
      }
    };

    const getDailyTrackedMins = (
      userId: number,
      weekId: number,
      dayId: number
    ) => {
      const day = getCurrentDay(userId, weekId, dayId);
      if (day) {
        return day.totalTrackedTimeMins;
      }
    };

    // project data
    const pushProjectData = (
      userId: number,
      weekId: number,
      dayId: number,
      projectData: ProjectDayPercentageType
    ) => {
      const day = getCurrentDay(userId, weekId, dayId);

      if (day) {
        day.totalTrackedTimeMins = day.totalTrackedTimeMins + projectData.mins;

        const newPercent = +(
          (projectData.mins / day.totalLoggedTimeMins) *
          100
        );

        day.percentageTrackedTime = day.percentageTrackedTime + newPercent;

        const index = day?.trackedProjects.findIndex(
          (p) => p.project === projectData.project
        );
        if (index !== -1) {
          day.trackedProjects[index!] = {
            ...day.trackedProjects[index!],
            mins: day.trackedProjects[index!].mins + projectData.mins,
            percent: day.trackedProjects[index!].percent + newPercent,
          };
        } else {
          day?.trackedProjects.push({ ...projectData, percent: newPercent });
        }
      }
    };

    const deleteProjectData = (
      userId: number,
      weekId: number,
      dayId: number,
      projectName: string
    ) => {
      const day = getCurrentDay(userId, weekId, dayId);
      if (!day) {
        console.log("Day not found");
        return;
      }
      const index = day.trackedProjects.findIndex(
        (p) => p.project === projectName
      );
      if (index !== -1) {
        day.totalTrackedTimeMins =
          day.totalTrackedTimeMins - day.trackedProjects[index].mins;
        day.percentageTrackedTime =
          day.percentageTrackedTime - day.trackedProjects[index].percent;
        day.trackedProjects.splice(index, 1);
      } else {
        console.log(`Project ${projectName} not found`);
      }
    };

    return {
      users,
      currentUser,
      setCurrentUser,
      getCurrentUser,
      getUserFromId,
      getAllUsers,
      updateUsername,
      addUser,
      getCurrentDay,
      getDailyTotalMins,
      getDailyTrackedMins,
      pushProjectData,
      deleteProjectData,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
