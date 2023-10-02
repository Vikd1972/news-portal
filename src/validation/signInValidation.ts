import { object, string } from 'yup';

type SchemaSignInType = {
  email?: string;
  password?: string;
};

const signInValidation = object().shape({
  email: string().email('must be a valid email').required('Required email'),
  password: string().min(3, 'must be at least 3 characters long').required('Required password'),
}) as SchemaSignInType;

export default signInValidation;
