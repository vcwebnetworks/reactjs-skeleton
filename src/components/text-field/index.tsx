import React, {
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { maskValue, unmask } from '~/utils';

import * as S from './styles';

export type TextFieldProps = JSX.IntrinsicElements['input'] & {
  mask?: string;
  label?: string;
  small?: boolean;
  error?: string;
  replace?: {
    to: string | RegExp;
    from?: string;
  };
};

export interface TextFieldExternalRef {
  focus(): void;

  getValue(): string;

  clearValue(): void;
}

const TextField: ForwardRefRenderFunction<
  TextFieldExternalRef,
  TextFieldProps
> = (
  { mask, error, label, replace, onChange, placeholder, small, ...rest },
  ref,
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword] = useState(false);

  const parsePlaceholder = useMemo(() => {
    if (placeholder) {
      return placeholder;
    }

    if (mask) {
      return mask.replace(/#/g, '_');
    }

    return '';
  }, [mask, placeholder]);

  const handleOnChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (replace) {
        event.currentTarget.value = event.currentTarget.value.replace(
          replace.to,
          replace?.from ?? '',
        );
      }

      if (mask) {
        const unmaskedValue = unmask(event.currentTarget.value);
        event.currentTarget.value = maskValue(unmaskedValue, mask);
      }

      if (typeof onChange === 'function') {
        await onChange(event);
      }
    },
    [mask, onChange, replace],
  );

  // const toggleShowPassword = useCallback(() => {
  //   setShowPassword(old => !old);
  // }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },

    getValue() {
      return inputRef.current!.value;
    },

    clearValue() {
      inputRef.current!.value = '';
      inputRef.current!.defaultValue = '';
    },
  }));

  useEffect(() => {
    if (!rest.defaultValue) {
      return;
    }

    inputRef.current!.value = rest.defaultValue as string;
  }, [rest.defaultValue]);

  return (
    <S.Wrapper $small={small} $error={Boolean(error)}>
      {label && <label htmlFor={rest.id}>{label}</label>}

      <input
        ref={inputRef}
        onChange={handleOnChange}
        placeholder={parsePlaceholder}
        {...rest}
        type={showPassword ? 'text' : rest.type}
      />

      {error && <p className="error">{error}</p>}
    </S.Wrapper>
  );
};

export default React.forwardRef(TextField);
