export function secondsToTime(seconds) {
  const minutes = (seconds / (60)).toFixed(1);
  const hours = (seconds / (60 * 60)).toFixed(1);
  const days = (seconds / (60 * 60 * 24)).toFixed(1);
  if (seconds < 60) return `${seconds} Sec`;
  if (minutes < 60) return `${minutes} Min`;
  if (hours < 24) return `${hours} Hrs`;
  return `${days} Days`;
}

// https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
export function secondToHHMMSS(time) {
  const secNum = parseInt(time, 10); // don't forget the second param
  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - (hours * 3600)) / 60);
  let seconds = secNum - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = `0${hours}`; }
  if (minutes < 10) { minutes = `0${minutes}`; }
  if (seconds < 10) { seconds = `0${seconds}`; }
  return `${hours}:${minutes}:${seconds}`;
}
