import styled from 'styled-components';

export default styled.div`
  width: -webkit-fill-available;
  .select__label {
    margin-bottom: 5px;
  }

  .select {
    &__control {
      box-shadow: none;
      border-radius: 0;
      transition: none;

      color: ${({ theme }) => theme.color};
      border: 1px solid ${({ theme }) => theme.color};
      background-color: transparent;

      &--is-focused {
        border-color: ${({ theme }) => theme.color} !important;
      }

      &--menu-is-open {
        border-color: ${({ theme }) => theme.color} !important;
        box-shadow: inset 0 0 0 1px ${({ theme }) => theme.color};
      }
    }

    &__single-value {
      color: ${({ theme }) => theme.color};
    }

    &__input {
      color: ${({ theme }) => theme.color};
    }

    &__input-container {
      color: inherit;
    }

    &__placeholder {
      top: unset;
    }

    &__indicator-separator {
      border-color: ${({ theme }) => theme.color};
    }

    &__indicator,
    &__clear-indicator {
      svg {
        fill: ${({ theme }) => theme.color};
        cursor: pointer;
      }
    }

    &__error-message {
      color: ${({ theme }) => theme.color};
      margin-bottom: 10px;
    }

    &__menu {
      background-color: ${({ theme }) => theme.backrground};
      color: ${({ theme }) => theme.color};
    }

    &__menu-notice--no-options {
      background-color: ${({ theme }) => theme.backrground};
      color: ${({ theme }) => theme.color};
    }

    &__option {
      &:active {
        background-color: ${({ theme }) => theme.backrground};
      }

      &--is-focused {
        color: ${({ theme }) => theme.color};
        background-color: ${({ theme }) => theme.backrground};
      }

      &--is-selected {
        color: ${({ theme }) => theme.color};
        background-color: ${({ theme }) => theme.backrground};
      }
    }

    &__multi-value {
      color: ${({ theme }) => theme.color};
      background-color: ${({ theme }) => theme.backrground};
      border-radius: 0;

      &__remove {
        cursor: pointer;
        border-radius: 0;

        :hover {
          color: ${({ theme }) => theme.color};
          background-color: ${({ theme }) => theme.backrground};
        }

        :active {
          background-color: ${({ theme }) => theme.backrground};
        }
      }
    }
  }
`;
