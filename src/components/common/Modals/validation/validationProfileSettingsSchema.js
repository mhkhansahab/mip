import * as yup from "yup";

const schema = yup.object().shape({
    email: yup.string().email().required("Required field"),
    password: yup.string().required("Required field"),
    newPassword: yup.string().required("Required field"),
    confirmNewPassword: yup.string().required("Required field"),

    creatdOn: yup.date().default(function () {
        return new Date()
    })
})

export default schema;