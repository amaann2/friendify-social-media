export function getTimeDifference(date) {
  const currentDate = new Date();
  const postDate = new Date(date);
  const timeDifference = currentDate.getTime() - postDate.getTime();
  const secondDifference = Math.floor(timeDifference / 1000);
  const minuteDifference = Math.floor(secondDifference / 60);
  const hoursDifference = Math.floor(minuteDifference / 60);
  const dayDifference = Math.floor(hoursDifference / 24);

  if (dayDifference > 0) {
    return `${dayDifference}d `;
  } else if (hoursDifference > 0) {
    return `${hoursDifference}h `;
  } else if (minuteDifference > 0) {
    return `${minuteDifference}m `;
  } else {
    return `just now`;
  }
}
