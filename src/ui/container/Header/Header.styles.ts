import styled from 'styled-components';

const HeaderStyles = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .info-panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: -webkit-fill-available;
    padding: 10px;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  .title-portal {
    font-weight: 700;
    border: 1px solid ${({ theme }) => theme.color};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 10px 10px;
  }
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .new-message-icon {
    cursor: pointer;
    animation: blink 1s infinite;
  }
  .text {
    margin: 0;
    padding: 0;
  }
  .date-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      padding: 0;
      margin: 0;
    }
  }

  .user-data {
    padding: 0 10px;
    font-weight: 700;
  }

  .user-icon {
    color: ${({ theme }) => theme.color};
    border-color: transparent;
  }

  .button {
    color: ${({ theme }) => theme.color};
    border-color: ${({ theme }) => theme.color};
  }
  .new-message {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 30px;
    border-radius: ${({ theme }) => theme.borderRadius};
    overflow: hidden;
  }
`;

export default HeaderStyles;
