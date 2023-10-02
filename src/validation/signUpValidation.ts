import { object, string } from 'yup';

type SchemaSignUpType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const signUpValidation = object().shape({
  firstName: string(),
  lastName: string(),
  email: string().email('must be a valid email').required('Required email'),
  password: string().min(3, 'must be at least 3 characters long').required('Required password'),
  confirmPassword: string().min(3, 'must be at least 3 characters long').required('Required confirm password'),
}) as SchemaSignUpType;

export default signUpValidation;
