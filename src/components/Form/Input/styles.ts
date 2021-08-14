import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ $small?: boolean }>`
  ${({ theme, $small }) => css`
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
      border: 0.2rem solid #f6f6f6;
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
      color: ${theme.color.primary};
      margin-bottom: 0.5rem;
      display: block;
    }
  `}
`;
