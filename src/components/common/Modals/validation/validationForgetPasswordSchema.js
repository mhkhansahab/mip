import * as yup from "yup";

const schema = yup.object().shape({
    code: yup.string().required("Required field"),

    creatdOn: yup.date().default(function () {
        return new Date()
    })
})

export default schema;