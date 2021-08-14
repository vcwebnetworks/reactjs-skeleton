import styled, { css } from 'styled-components';

type WrapperProps = {
  $open?: boolean;
  $centered?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, $open, $centered }) => css`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: ${theme.color.text}72;
    z-index: 9999;
    cursor: pointer;

    opacity: 0;
    visibility: hidden;
    transition: ${theme.transition.default};

    ${$centered &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}

    ${$open &&
    css`
      opacity: 1;
      visibility: visible;

      ${Content} {
        opacity: 1;
        transform: translateY(0);
        transition: transform 0.3s ease-out 0.2s, opacity 0.3s ease-out 0.2s;
      }
    `}
  `}
`;

export const Content = styled.div`
  ${() => css`
    opacity: 0;
    position: relative;
    transform: translateY(20px);
    transition: transform 0.2s ease-in, opacity 0.2s ease-in;
    cursor: default;
  `}
`;
