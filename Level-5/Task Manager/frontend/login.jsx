import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from "react-router-dom";
import schema from './schema';
import styles from './Login.module.css';


function Login() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            pass: "",
            conPass: "",
        },
        validationSchema: schema,
        onSubmit: () => {
            navigate("/task");
        },
    });

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <form onSubmit={formik.handleSubmit}>
                    <label>Name:</label>
                    <input
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        id="name"
                        onBlur={formik.handleBlur}
                        placeholder="Enter your name"
                        className={formik.errors.name && formik.touched.name ? styles.inputError : ''}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <p className={styles.errorMessage}>{formik.errors.name}</p>
                    )}

                    <label>Email:</label>
                    <input
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        id="email"
                        onBlur={formik.handleBlur}
                        placeholder="Enter your E-mail"
                        className={formik.errors.email && formik.touched.email ? styles.inputError : ''}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <p className={styles.errorMessage}>{formik.errors.email}</p>
                    )}

                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.pass}
                        id="pass"
                        onBlur={formik.handleBlur}
                        placeholder="Enter a strong password"
                        className={formik.errors.pass && formik.touched.pass ? styles.inputError : ''}
                    />
                    {formik.errors.pass && formik.touched.pass && (
                        <p className={styles.errorMessage}>{formik.errors.pass}</p>
                    )}

                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.conPass}
                        id="conPass"
                        onBlur={formik.handleBlur}
                        placeholder="Confirm your password"
                        className={formik.errors.conPass && formik.touched.conPass ? styles.inputError : ''}
                    />
                    {formik.errors.conPass && formik.touched.conPass && (
                        <p className={styles.errorMessage}>{formik.errors.conPass}</p>
                    )}

                    <button type="submit" className={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
