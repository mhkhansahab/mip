import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Required field"),
    price: yup.number().required("Required field"),
    rarity: yup.string().required("Required field"),
    loot_tokens: yup.string().required("Required field"),

    creatdOn: yup.date().default(function () {
        return new Date()
    })
})

export default schema;