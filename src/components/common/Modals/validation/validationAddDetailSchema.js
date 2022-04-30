import * as yup from "yup";

const schema = yup.object().shape({
    detail: yup.number().required("Required field"),
    procent: yup.number().required("Required field"),

    creatdOn: yup.date().default(function () {
        return new Date()
    })
})

export default schema;
