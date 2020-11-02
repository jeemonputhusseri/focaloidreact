import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";
import axios from 'axios'
import { useHistory, useLocation } from 'react-router-dom'

const signInSchema = Yup.object().shape({
  username: Yup.string().email('Username must be a valid email').required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars min")
    .max(12, "Password is too long - should be 12 chars max")
    .matches(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, "Atleast one special charector required")
});

const initialValues = {
  username: "",
  password: ""
};


const Login = (props) => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  function validateUserData(values) {
    const { username, password } = values;
    debugger
    var self = this;
    axios({
      url: './users.json',
      method: 'GET'
    }).then(res => {
      let validuser = 0;
      res.data.map(item => {
        if (item.username == username && item.password == password) {
          validuser++
          setlogin(true, item.username, item.fullname)
        }

      })
      if (validuser == 0) {
        setlogin(false)
      }
    })

  }





  function setlogin(status, username, fullname) {
    if (status) {
      localStorage.setItem('username', username);
      localStorage.setItem('fullname', fullname);
      history.replace(from);


    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('fullname');
      alert('Login failed')
    }
  }


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        console.log(values);
        validateUserData(values)
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="containerLogin">
            <Form>
              <h1>Login</h1>
              <div className="form-row">
                <label htmlFor="username">Username</label>
                <Field
                  type="username"
                  name="username"
                  id="username"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <ErrorMessage name="username" component="span" className="error" />
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn button" : "button"}
                disabled={!(dirty && isValid)}
              >
                Login
              </button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
