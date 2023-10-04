const requiredErrorMessage = 'Поле должно быть заполненно';

const localPath = {
  news: '/',
  writeNews: '/write-news',
  signIn: '/sign-in',
  signUn: '/sign-up',
  profile: '/profile',
};

const baseUrl = 'http://localhost:4000/api';

const socketUrl = 'http://localhost:4000';

export default {
  requiredErrorMessage,
  localPath,
  baseUrl,
  socketUrl,
};
