import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required("Missing"),
    email: yup.string().email("Enter a valid email..!").required("Missing"),
    pass: yup.string().min(5, "Password must be at least 5 characters").required("Missing"),
    conPass: yup.string()
        .oneOf([yup.ref("pass"), null], "Oops..! Password does not match")
        .required("Missing")
});

export default schema;