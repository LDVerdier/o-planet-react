// Function to slice the titles equally for all dumps so they are all the same sizes
// eslint-disable-next-line import/prefer-default-export
export function strTruncate(str, num) {
  if (str.lenght <= num) {
    return str;
  }
  return (`${str.slice(0, num)}...`);
}

export const getDayMonthYear = (dateString) => {
  const dateAsArray = dateString.split('T');
  const formattedDate = dateAsArray[0]
    .split('-')
    .reverse()
    .join('/');
  return formattedDate;
};

export const formatDate = (dateString) => {
  // convert the provided date to a timestamp (number of milliseconds since 01/01/1970)
  const timeStamp = Date.parse(dateString);

  // convert it back to a javascript Date object format
  const formattedDate = new Date(timeStamp);

  // return the date to string

  return formattedDate.toLocaleDateString();
};

export const getTimeOfDay = (dateString) => {
  const dateAsArray = dateString.split('T');
  const formattedDayTime = dateAsArray[1]
    .substr(0, 5)
    .replace(':', 'h');
  return formattedDayTime;
};

// export const getTimeOfDay = (dateString) => {
//   // convert the provided date to a timestamp (number of milliseconds since 01/01/1970)
//   const timeStamp = Date.parse(dateString);

//   // convert it back to a javascript Date object format
//   const formattedDate = new Date(timeStamp);

//   let hours = (formattedDate.getHours()).toString(10);
//   if (hours.length === 1) {
//     hours = `0${hours}`;
//   }
//   let minutes = (formattedDate.getMinutes()).toString(10);
//   if (minutes.length === 1) {
//     minutes = `0${minutes}`;
//   }
//   // return the time of day as 16h30 format
//   return `${hours}h${minutes}`;
// };
export const getDayAndTime = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString(10);
  if (month.length === 1) {
    month = `0${month}`;
  }
  let day = (date.getDate()).toString(10);
  if (day.length === 1) {
    day = `0${day}`;
  }
  let hour = (date.getHours()).toString(10);
  if (hour.length === 1) {
    hour = `0${hour}`;
  }
  let minutes = (date.getMinutes()).toString(10);
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  const formattedDate = `${year}-${month}-${day} ${hour}:${minutes}`;

  return formattedDate;
};
