import styled from 'styled-components';

const WriteNewsWrapper = styled.div`
  width: auto;  
  padding: 10px;
  display: flex;
  flex-direction: column; 
  gap: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .task-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    .quill {
      width: 100%;
    }
    .ql-editor {
      min-height: 200px;
    }
  }
  .button-grioup {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
  }
  .button-item {
    width: 180px;
    color: ${({ theme }) => theme.color};
    border-color: ${({ theme }) => theme.color};
  }
`;

export default WriteNewsWrapper;
