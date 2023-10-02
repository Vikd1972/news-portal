import styled from 'styled-components';

const SignUpWrapper = styled.div`
margin-top: 20px;
display: flex;
flex-direction: row;
.login {
  display: flex;
  flex-direction: column;
}
.login__name {
  font-size: 40px;
  font-weight: 700;
  line-height: 60px;
  display: flex;
  flex-direction: row;
}
.login__name-toggle {
  margin-left: 5px;
  cursor: pointer;
  text-decoration: none;
  color: #008888;
}
.login__form {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.task-item p {
  margin: 0;
  padding: 0;
}
.button-item {
  margin-top: 50px;
  width: 100%;
  color: ${({ theme }) => theme.color};
  border-color: ${({ theme }) => theme.color};
}
.toast {
  width: 400px;
}
.toast-body {
  font-family: 'Poppins', sans-serif;
  font-size: 30px;
  color: #ff9999;
}
`;

export default SignUpWrapper;
