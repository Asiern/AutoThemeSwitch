export interface ITime {
  hours: number;
  minutes: number;
  seconds: number;
}

//Compares 2 times and returns true if equal
export function equals(t1: ITime, t2: ITime) {
  if (t1.hours !== t2.hours) {
    return false;
  }
  if (t1.minutes !== t2.minutes) {
    return false;
  }
  if (t1.seconds !== t2.seconds) {
    return false;
  }
  return true;
}

export function isBetween(start: ITime, end: ITime, current: ITime) {
  //Given time is between start and end
  if (
    convertToHours(start) < convertToHours(current) &&
    convertToHours(current) < convertToHours(end)
  ) {
    return true;
  }
  //TODO isBetween
  return false;
}

export function getRemainingTime(t: ITime) {
  const date = new Date();
  const currentTime: ITime = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
  //TODO calculate remaining time properly
  return (t.hours-currentTime.hours)*3600 + (t.minutes-currentTime.minutes)*60 +(t.seconds-currentTime.seconds);
}

function convertToHours({hours,minutes,seconds}: ITime) {
  return hours + minutes / 60 + seconds/3600;
}
