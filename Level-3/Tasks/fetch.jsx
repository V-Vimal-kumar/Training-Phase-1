import { useFormik } from 'formik';
import React from 'react';
import scheme from './index';

function Form() {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            pass: "",
            conPass: "",
        },
        validationSchema: scheme,
        onSubmit: () => {
            console.log("Form submitted");
        },
    });

    return (
        <div className="container"> 
            <div className="form-box"> 
                <form onSubmit={formik.handleSubmit}>
                    <label>Name:</label>
                    <input
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        id="name"
                        onBlur={formik.handleBlur}
                        placeholder="Enter your name"
                        className={formik.errors.name && formik.touched.name ? 'input-error' : ''}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <p className="error-message">{formik.errors.name}</p>
                    )}

                    <label>Email:</label>
                    <input
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        id="email"
                        onBlur={formik.handleBlur}
                        placeholder="Enter your E-mail"
                        className={formik.errors.email && formik.touched.email ? 'input-error' : ''}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <p className="error-message">{formik.errors.email}</p>
                    )}

                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.pass}
                        id="pass"
                        onBlur={formik.handleBlur}
                        placeholder="Enter a strong password"
                        className={formik.errors.pass && formik.touched.pass ? 'input-error' : ''}
                    />
                    {formik.errors.pass && formik.touched.pass && (
                        <p className="error-message">{formik.errors.pass}</p>
                    )}

                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.conPass}
                        id="conPass"
                        onBlur={formik.handleBlur}
                        placeholder="Confirm your password"
                        className={formik.errors.conPass && formik.touched.conPass ? 'input-error' : ''}
                    />
                    {formik.errors.conPass && formik.touched.conPass && (
                        <p className="error-message">{formik.errors.conPass}</p>
                    )}

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Form;