// import * as yup from 'yup';

// const scheme = yup.object().shape({
//     name: yup.string().required("Missing"),
//     email: yup.string().email("Enter a valid email..!").required("Missing"),
//     pass: yup.string().min(5, "Password must be at least 5 characters").required("Missing"),
//     conPass: yup.string()
//         .oneOf([yup.ref("pass"), null], "Oops..! Password does not match")
//         .required("Missing")
// });

// export default scheme;


import * as yup from "yup";

const scheme = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Enter a valid email..!").required("Email is required"),
    pass: yup.string()
        .min(5, "Password must be at least 5 characters")
        .required("Password is required"),
    conPass: yup.string()
        .oneOf([yup.ref("pass")], "Oops..! Password does not match")
        .required("Confirm Password is required"),
});

export default scheme;
