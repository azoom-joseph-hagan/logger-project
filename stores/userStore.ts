import { defineStore } from "pinia";
import {
  TimePeriod,
  type UserType,
  type ProjectDayPercentageType,
} from "~/types";

export const useUserStore = defineStore(
  "userStoreNew",
  () => {
    // state
    const users = ref<UserType[]>([]);
    const currentUser = ref<UserType | null>(null);
    const viewMode = ref<TimePeriod>(TimePeriod.Week);
    const lastUsedDate = ref("");

    //user data
    const getUserFromId = (userId: number) => {
      return users.value.find((user) => user.id === userId);
    };

    // IN CASE OF RESET
    // const setCurrentUser = (user: number) => {
    //   currentUser.value = user;
    // };

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
    const getCurrentDay = (userId: number, date: string) => {
      const user = getUserFromId(userId);
      return user?.projectData.find((day) => day.date === date);
    };

    const getDailyTotalMins = (userId: number, date: string) => {
      const day = getCurrentDay(userId, date);
      if (day) {
        return day.totalLoggedTimeMins;
      }
    };

    const getDailyTrackedMins = (userId: number, date: string) => {
      const day = getCurrentDay(userId, date);
      if (day) {
        return day.totalTrackedTimeMins;
      }
    };

    // project data
    const pushProjectData = (
      userId: number,
      date: string,
      projectData: ProjectDayPercentageType
    ) => {
      const day = getCurrentDay(userId, date);

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
      date: string,
      projectName: string
    ) => {
      const day = getCurrentDay(userId, date);
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

    // view mode
    const getViewMode = () => {
      return viewMode.value;
    };

    const updateViewMode = (newMode: TimePeriod) => {
      viewMode.value = newMode;
    };

    //date
    const getLastUsedDate = () => {
      return lastUsedDate.value;
    };

    const setLastUsedDate = (date: string) => {
      lastUsedDate.value = date;
    };

    return {
      users,
      currentUser,
      viewMode,
      lastUsedDate,
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
      getViewMode,
      updateViewMode,
      getLastUsedDate,
      setLastUsedDate,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
