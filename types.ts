export type UserType = {
  name: string;
  id: number;
  image: string;
  weekData: WeekDataType[][];
};

export type WeekDataType = {
  day: string;
  date: string;
  totalLoggedTimeMins: number;
  totalTrackedTimeMins: number;
  percentageTrackedTime: number;
  trackedProjects: TrackedProjectsType[];
};

export type TrackedProjectsType = {
  project: string;
  mins: number;
  percent: number;
  color: string;
};

export type ProjectDayPercentageType = {
  mins: number;
  percent: number;
  project: string;
  color: string;
};
