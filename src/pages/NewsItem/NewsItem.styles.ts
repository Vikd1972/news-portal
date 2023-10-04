import styled from 'styled-components';

const NewsItemWrapper = styled.div`
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.color};
  border-radius: ${({ theme }) => theme.borderRadius};
  .personal-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    font-weight: 700;
  }
  .header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .button-container {
    display: flex;
    flex-direction: column;
    gap: 10px;  
  }
  .button {
    width: 160pxs;
    color: ${({ theme }) => theme.color};
    border-color: ${({ theme }) => theme.color};
  }
`;

export default NewsItemWrapper;
