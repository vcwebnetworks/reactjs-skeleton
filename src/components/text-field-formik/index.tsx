import React, { Ref, useCallback, useMemo } from 'react';

import { useField } from 'formik';

import TextField, { TextFieldExternalRef, TextFieldProps } from '../text-field';

type Props = TextFieldProps & {
  ref?: Ref<TextFieldExternalRef>;
  name: string;
};

const TextFieldWithFormik: React.ForwardRefRenderFunction<
  TextFieldExternalRef,
  Props
> = ({ name, onChange, onBlur, ...rest }, ref) => {
  const [field, meta] = useField(name);

  const errorMessage = useMemo(() => {
    if (meta.touched && meta.error) {
      return meta.error;
    }

    return null;
  }, [meta.error, meta.touched]);

  const handleOnChange = useCallback(
    async event => {
      if (typeof onChange === 'function') {
        await onChange(event);
      }

      return field.onChange(event);
    },
    [field, onChange],
  );

  const handleOnBlur = useCallback(
    async event => {
      if (typeof onBlur === 'function') {
        await onBlur(event);
      }

      return field.onBlur(event);
    },
    [field, onBlur],
  );

  return (
    <TextField
      {...rest}
      ref={ref}
      error={errorMessage}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      value={field.value}
      name={field.name}
      checked={field.checked}
      multiple={field.multiple}
    />
  );
};

export default React.forwardRef(TextFieldWithFormik);
