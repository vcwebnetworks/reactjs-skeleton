import React, { useCallback, useMemo, useState } from 'react';

type SubmitCallback<T> = (
  event: React.FormEvent<HTMLFormElement>,
  values: T,
) => Promise<void>;

export interface IUseFormValuesResponse<T> {
  formValues: T;
  setFormValues: React.Dispatch<React.SetStateAction<T>>;
  loadingFormValues: boolean;
  setLoadingFormValues: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeFormValues: (event: any) => void;
  handleSubmitFormValues: (
    callback: SubmitCallback<T>,
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
  handleClearFormValues: (allowed?: string[]) => void;
}

export function useFormValues<T>(initialState: T): IUseFormValuesResponse<T> {
  const [formValues, setFormValues] = useState<T>({ ...initialState });
  const [loadingFormValues, setLoadingFormValues] = useState<boolean>(false);

  const handleChangeFormValues = useCallback(event => {
    let type = event?.target?.type ?? null;
    let value = event?.target?.value ?? '';
    let name = event?.target?.name ?? null;

    if (event?.type === 'customSelect') {
      type = 'select';
      name = event?.name;
      value = event?.value;
    }

    if (type === 'file') {
      const files = event?.target?.files ?? [];
      value = files.length === 1 ? files[0] : files;
    } else if (['radio', 'checkbox'].includes(type)) {
      value = event?.target?.checked ?? false;
    }

    setFormValues(oldValues => ({ ...oldValues, [name]: value }));
  }, []);

  const handleClearFormValues = useCallback(
    (allowed?: string[]) => {
      const newState = { ...initialState };

      if (Array.isArray(allowed)) {
        allowed.forEach(allow => {
          newState[allow] = formValues[allow];
        });
      }

      setFormValues(newState);
    },
    [formValues, initialState],
  );

  const handleSubmitFormValues = useCallback(
    (callback: SubmitCallback<T>) => async (
      event: React.FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();
      event.persist();

      try {
        setLoadingFormValues(true);
        await callback(event, formValues);
      } finally {
        setLoadingFormValues(false);
      }
    },
    [formValues],
  );

  return useMemo(
    () => ({
      formValues,
      setFormValues,
      loadingFormValues,
      setLoadingFormValues,
      handleChangeFormValues,
      handleSubmitFormValues,
      handleClearFormValues,
    }),
    [
      formValues,
      loadingFormValues,
      handleClearFormValues,
      handleChangeFormValues,
      handleSubmitFormValues,
    ],
  );
}
