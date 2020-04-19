import * as Yup from 'yup';

export default async function SchemaValidation(schema, data, formRef) {
  try {
    // Remove all previous errors
    formRef.current.setErrors({});

    await schema.validate(data, {
      abortEarly: false,
    });
    // Validation passed
    return true;
  } catch (err) {
    const validationErrors = {};
    if (err instanceof Yup.ValidationError) {
      err.inner.forEach(error => {
        validationErrors[error.path] = error.message;
      });
      formRef.current.setErrors(validationErrors);
      return false;
    }
  }
}
