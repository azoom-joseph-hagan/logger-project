export type NewUserType = {
  name: string;
  id: number;
  image: string;
  projectData: NewWeekDataType[];
};

export type NewWeekDataType = {
  date: string;
  day: string;
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
  trueColor: string;
};

export type ProjectDayPercentageType = {
  mins: number;
  project: string;
  color: string;
  trueColor: string;
};

export type TempDailyDataType = {
  date: string;
  day: string;
  percentageTrackedTime: number;
  totalLoggedTimeMins: number;
  totalTrackedTimeMins: number;
};

export enum TimePeriod {
  Week = 0,
  Month = 1,
}
