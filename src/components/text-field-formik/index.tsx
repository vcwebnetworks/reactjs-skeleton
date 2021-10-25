import React, { Ref, useMemo } from 'react';

import { useField } from 'formik';

import TextField, { TextFieldExternalRef, TextFieldProps } from '../text-field';

type Props = TextFieldProps & {
  ref?: Ref<TextFieldExternalRef>;
  name: string;
};

const TextFieldWithFormik: React.ForwardRefRenderFunction<
  TextFieldExternalRef,
  Props
> = ({ name, ...rest }, ref) => {
  const [field, meta] = useField(String(name));

  const errorMessage = useMemo(() => {
    if (meta.touched && meta.error) {
      return meta.error;
    }

    return undefined;
  }, [meta.error, meta.touched]);

  return <TextField {...rest} {...field} ref={ref} error={errorMessage} />;
};

export default React.forwardRef(TextFieldWithFormik);
