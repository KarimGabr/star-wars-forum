const formRequiredValidation = (form_values, required_values) => {
  let errors = { required: {} };

  required_values.forEach((value) => {
    if (
      (typeof value !== "object" && !form_values[value]) ||
      (Array.isArray(form_values[value]) && form_values[value].length === 0)
    ) {
      errors.required[value] = true;
    } else if (
      typeof value === "object" &&
      form_values[Object.keys(value)[0]].length > 0
    ) {
      let objKey = Object.keys(value)[0];
      errors.required[objKey] = [];

      form_values[objKey].forEach((el, index) => {
        value[objKey].forEach((itemValue) => {
          if (!el[itemValue]) {
            let _error = errors.required[objKey].find(
              (err) => err.index === index
            );
            if (_error) {
              _error[itemValue] = true;
              errors.required[objKey].splice(index, 1, _error);
            } else {
              errors.required[objKey].push({ index, [itemValue]: true });
            }
          }
        });
      });

      errors.required[objKey].length === 0 && delete errors.required[objKey];
    }
  });

  Object.keys(errors.required).length === 0 && delete errors.required;

  return errors;
};

export default formRequiredValidation;
