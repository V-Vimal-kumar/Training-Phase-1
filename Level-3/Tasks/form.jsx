import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import scheme from "./index";

function MyForm() {
    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                pass: "",
                conPass: "",
            }}
            validationSchema={scheme}
            onSubmit={() => {
                console.log("Form submitted");
            }}
        >
            {({ errors, touched }) => (
                <div className="container">
                    <div className="form-box">
                        <Form> 
                            <label>Name:</label>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className={errors.name && touched.name ? "input-error" : ""}
                            />
                            <ErrorMessage name="name" component="p" className="error-message" />

                            <label>Email:</label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter your E-mail"
                                className={errors.email && touched.email ? "input-error" : ""}
                            />
                            <ErrorMessage name="email" component="p" className="error-message" />

                            <label>Password:</label>
                            <Field
                                type="password"
                                name="pass"
                                placeholder="Enter a strong password"
                                className={errors.pass && touched.pass ? "input-error" : ""}
                            />
                            <ErrorMessage name="pass" component="p" className="error-message" />

                            <label>Confirm Password:</label>
                            <Field
                                type="password"
                                name="conPass"
                                placeholder="Confirm your password"
                                className={errors.conPass && touched.conPass ? "input-error" : ""}
                            />
                            <ErrorMessage name="conPass" component="p" className="error-message" />

                            <button type="submit">Submit</button>
                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default MyForm;
