const locale = 'ru';

const getDate = (unixTime: number) => {
  const currentDate = new Date(unixTime * 1000);
  const date = currentDate.toLocaleDateString(locale);
  const time = currentDate.toLocaleTimeString(locale);

  return { date, time };
};

export default getDate;
