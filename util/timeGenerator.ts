export const calcPercentage = (partialValue, totalValue, truncate = false) => {
  if (!partialValue) return 0;
  const value = ((partialValue / totalValue) * 100).toFixed(1);
  return truncate ? Math.floor(value) : value;
};

export const generateTime = (value, totalTime) => {
  if (!value) return null;
  const generators = [fromNum, fromTime, fromColonNonationTime];
  if (totalTime) {
    generators.push(fromPercentage);
  }
  for (const generate of generators) {
    const time = generate(value.replace(/\s+/g, ""), totalTime);
    if (time) return time;
  }
};

const fromNum = (value, totalTime) => {
  if (!/^(\d+\.?\d*?)$/.test(value)) return null;
  const time = Number(value);
  const percentage = calcPercentage(time, totalTime);
  return { time, percentage };
};

const fromTime = (value, totalTime) => {
  if (!/^((\d+\.?\d*?)(h|m))+$/gi.test(value)) return null;
  const hoursMatch = value.match(/\d+\.?\d*?h/g);
  const hours = hoursMatch
    ? hoursMatch.map((x) => Number(x.substr(0, x.length - 1)))
    : [];
  const minutesMatch = value.match(/\d+\.?\d*?m/g);
  const minutes = minutesMatch
    ? minutesMatch.map((x) => Number(x.substr(0, x.length - 1)))
    : [];
  const time = hours
    .map((x) => x * 60)
    .concat(minutes)
    .reduce((sum, m) => sum + m, 0);
  const percentage = calcPercentage(time, totalTime);
  return { time, percentage };
};

const fromColonNonationTime = (value, totalTime) => {
  const match = /^(\d{1,2}):(\d{1,2})?$/.exec(value);
  if (!match) return null;
  const time = Number(match[1]) * 60 + Number(match[2] || 0);
  const percentage = calcPercentage(time, totalTime);
  return { time, percentage };
};

const fromPercentage = (value, totalTime) => {
  const match = /^(\d+\.?\d*?)%$/.exec(value);
  if (!match) return null;
  const percentage = Number(match[1]);
  const time = Math.floor((percentage / 100) * totalTime);
  return { time, percentage };
};
