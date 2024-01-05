import * as React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import formBanner from "../../banner/form-banner-1.jpg";
import "../../styles/form.css";
import * as Yup from 'yup';
import { Link } from "react-router-dom";



interface FormValues {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
}

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('First name is required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    role: Yup.string().required("Please select role")
});


const Registeration: React.FC<{}> = () => {

    const HandleSubmitForm = (Values: FormValues) => {

        const PostFormData = async () => {
            const data = await fetch("http://localhost:3001/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Values)
            });
            const formData = data.json();
            console.log(formData, "user data ");
        }
        PostFormData();

    }

    const initialValues: FormValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
    };
    return (
        <div className="container-fluid form-body">
            <div className="row user-form">
                <div className="col-md-6 form-size form-banner">
                    <div className="form-banner">
                        <img className="img-fluid form-image" src={formBanner} alt="loading" />
                    </div>
                </div>
                <div className="col-md-4 form-size">
                    <div className="main-form">
                        <h1>Signup Form</h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={SignupSchema}
                            onSubmit={HandleSubmitForm}
                        >

                            {({ errors, touched }) => (

                                <Form className="signup-form">
                                    <div className="form-field" >
                                        <label htmlFor="firstName">First Name</label>
                                        <Field id="firstName" name="firstName" placeholder="" />
                                        {errors.firstName && touched.firstName ? (<div className="error-text">{errors.firstName}</div>) : null}
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="lastName">Last Name</label>
                                        <Field id="lastName" name="lastName" placeholder="" />
                                        {errors.lastName && touched.lastName ? (<div className="error-text">{errors.lastName}</div>) : null}
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="email">Email</label>
                                        <Field id="email" name="email" placeholder="" type="email" />
                                        {errors.email && touched.email ? (<div className="error-text">{errors.email}</div>) : null}
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="password">Password</label>
                                        <Field id="password" name="password" placeholder="" />
                                        {errors.password && touched.password ? (<div className="error-text">{errors.password}</div>) : null}
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="password">Password</label>
                                        <Field name="role" as="select">
                                            <option value="">Select role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="User">User</option>
                                        </Field>
                                        {errors.role && touched.role ? (<div className="error-text">{errors.role}</div>) : null}
                                    </div>

                                    <button type="submit" className="btn form-btn">Submit</button>

                                    <div className="sign-up-link">
                                        <p>
                                            Already a member?
                                            <span>
                                                <Link to="/"> Login</Link>
                                            </span>
                                        </p>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registeration;
