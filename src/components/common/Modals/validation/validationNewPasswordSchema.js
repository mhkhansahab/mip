import * as yup from "yup";

const schema = yup.object().shape({
    newPassword: yup.string().required("Required field"),
    confirmNewPassword: yup.string().required("Required field"),

    creatdOn: yup.date().default(function () {
        return new Date()
    })
})

export default schema;