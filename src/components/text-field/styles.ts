import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ $small?: boolean; $error?: boolean }>`
  ${({ theme, $small, $error }) => css`
    input,
    textarea,
    select {
      display: block;
      position: relative;
      width: 100%;
      font-size: ${$small ? '1.2' : '1.4'}rem;
      font-weight: ${theme.font.weight.regular};
      background: #f6f6f6;
      border-radius: 0.5rem;
      padding: ${$small ? '1' : '1.2'}rem ${$small ? '1.2' : '1.4'}rem;
      border: 0.1rem solid ${$error ? theme.color.error : '#F6F6F6'};
      transition: ${theme.transition.default};

      &::placeholder {
        color: #4d4d4d;
      }

      &:focus {
        border-color: #4d4d4d;
      }
    }

    label {
      font-size: 1.4rem;
      font-weight: ${theme.font.weight.regular};
      color: ${theme.color[$error ? 'error' : 'primary']};
      margin-bottom: 0.5rem;
      display: block;
    }

    .error {
      font-size: 1.2rem;
      margin-top: 0.2rem;
      color: ${theme.color.error};
    }
  `}
`;
