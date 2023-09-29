import styled from 'styled-components';

const AppContainer = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.75px;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  background-color: ${({ theme }) => theme.backrground};
  color: ${({ theme }) => theme.color};

  .toast {
    width: 400px;
  }

  .toast-body {
    font-size: 30px;
    color: #ff9999;
  }
`;

export default AppContainer;
