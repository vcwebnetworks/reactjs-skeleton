import React, { useCallback, useMemo } from 'react';

import { formatMask, unmask } from '~/utils';

import * as S from './styles';

type FormInputProps = JSX.IntrinsicElements['input'] & {
  mask?: string;
  label?: string;
  small?: boolean;
  replace?: {
    to: string | RegExp;
    from?: string;
  };
};

const FormInput = ({
  mask,
  label,
  replace,
  onChange,
  placeholder,
  small,
  ...rest
}: FormInputProps) => {
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
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (replace) {
        event.currentTarget.value = event.currentTarget.value.replace(
          replace.to,
          replace?.from ?? '',
        );
      }

      if (mask) {
        const unmaskedValue = unmask(event.currentTarget.value);
        event.currentTarget.value = formatMask(unmaskedValue, mask);
      }

      if (typeof onChange === 'function') {
        onChange(event);
      }
    },
    [mask, onChange, replace],
  );

  return (
    <S.Wrapper $small={small}>
      {label && <label htmlFor={rest.id}>{label}</label>}

      <input
        {...rest}
        onChange={handleOnChange}
        placeholder={parsePlaceholder}
      />
    </S.Wrapper>
  );
};

export default React.memo(FormInput);
