import styled from 'styled-components';

const HeaderStyles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .title {
    padding: 0 10px;
  }

  .text {
    margin: 0;
    padding: 0;
  }

  .date-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .user-data {
    padding: 0 10px;
    font-weight: 700;
  }
`;

export default HeaderStyles;
