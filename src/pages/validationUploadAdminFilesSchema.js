import * as yup from "yup";

const schema = yup.object().shape({
  files: yup.array()
  .nullable()
  .required('VALIDATION_FIELD_REQUIRED'),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});

export default schema;
