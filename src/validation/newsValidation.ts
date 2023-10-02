import * as Yup from 'yup';
import requiredErrorMessage from '../utils/constant';

const newsValidation = Yup.object().shape({
  title: Yup.string().trim()
    .required(requiredErrorMessage)
    .min(3, 'Название слишком короткое')
    .max(255, 'Название слишком длинное'),
  content: Yup.string(),
  dateOfPublication: Yup.date(),
  topics: Yup.array(),
});

export default newsValidation;
