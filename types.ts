export type UserType = {
  name: string;
  id: number;
  image: string;
  projectData: WeekDataType[];
};

export type WeekDataType = {
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

export enum TimePeriod {
  Week = 0,
  Month = 1,
}

export type ProjectMinutesType = {
  name: string;
  value: any;
  color: any;
  trueColor: any;
}[];
