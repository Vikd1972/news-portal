import styled from 'styled-components';

const ListWrapper = styled.div`
  width: auto;  
  padding: 10px;
  display: flex;
  flex-direction: column; 
  gap: 20px;
  .item-news {
    padding: 15px;
    border: 1px solid ${({ theme }) => theme.color};
    border-radius: ${({ theme }) => theme.borderRadius};
  }
`;

export default ListWrapper;
