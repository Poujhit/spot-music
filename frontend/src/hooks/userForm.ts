/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

export interface IHandleChangeOptions {
  regex?: RegExp;
  errorMessage?: string;
  setValueOnlyAfterValidation?: boolean;
  required?: boolean;
  requiredMessage?: string;
  validate?: (value: string) => boolean;
  formatter?: (value: string) => string;
}

export interface IUseFormOptions {
  debugging?: boolean;
}

const DEFAULT_ERROR_MESSAGE = 'Invalid Value';
const DEFAULT_REQUIRED_MESSAGE = 'This field is required';

const useForm = (
  initialFormState: any = {},
  options: IUseFormOptions = {
    debugging: true,
  }
) => {
  const [form, setForm] = useState<any>({ ...initialFormState });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    initForm();
  }, [initialFormState._id]);

  useEffect(() => {
    if (options.debugging) console.log({ form, errors });
  }, [form]);

  const setAllErrors = (errors: any) => setErrors({ ...errors });

  const setError = (key: string, error: string) =>
    setErrors({ ...errors, [key]: error });

  const initForm = () => {
    setForm({ ...initialFormState });
    setErrors({});
  };

  const setFields = (fields: any) => {
    setForm((prev: any) => ({ ...prev, ...fields }));
  };

  const initNewFormState = (newFormState: any) => {
    setForm({ ...newFormState });
  };

  const clearForm = () => {
    setForm({});
    setErrors({});
  };

  const valueSetter = (
    key: string,
    value: any,
    options?: IHandleChangeOptions
  ) => {
    let message = '';
    let isValid = false;
    if (value) {
      isValid = options?.validate
        ? options.validate(value)
        : options?.regex?.test(value) ?? true;
      message = isValid ? '' : options?.errorMessage || DEFAULT_ERROR_MESSAGE;
    } else {
      if (options?.required)
        message = options?.requiredMessage || DEFAULT_REQUIRED_MESSAGE;
      else isValid = true;
    }

    const formattedValue = options?.formatter
      ? options.formatter(value)
      : value;
    if (options?.setValueOnlyAfterValidation) {
      if (isValid) {
        setForm({ ...form, [key]: formattedValue });
      }
      setErrors({ ...errors, [key]: message });
    } else {
      setForm({ ...form, [key]: formattedValue });
      setErrors({ ...errors, [key]: isValid ? '' : message });
    }
  };

  const handleTextBox =
    (key: string, options?: IHandleChangeOptions) => (e: any) => {
      const value: string = e.target.value;
      valueSetter(key, value, options);
    };

  const handleDropDown = (key: string) => (e: any) => {
    setForm((prevValue: any) => ({ ...prevValue, [key]: e }));
    setErrors({ ...errors, [key]: '' });
  };

  const handleDropDownWithName = (key: string) => (e: any) => {
    setForm({ ...form, [key]: e?.name ?? '' });
    setErrors({ ...errors, [key]: '' });
  };

  const handleDropDownWithId = (key: string) => (e: any) => {
    setForm({ ...form, [key]: e?.id ?? '' });
    setErrors({ ...errors, [key]: '' });
  };

  const handleCheckbox = (key: string) => () => {
    setForm({ ...form, [key]: !form[key] });
    // setErrors({ ...errors, [key]: "" });
  };

  return {
    form,
    initForm,
    clearForm,
    handleTextBox,
    handleDropDown,
    handleCheckbox,
    handleDropDownWithName,
    handleDropDownWithId,
    setFields,
    errors,
    setAllErrors,
    setError,
    initNewFormState,
  };
};

export default useForm;
