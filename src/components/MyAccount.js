import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab'
import Toast from 'react-bootstrap/Toast'
import yourhandle from 'countrycitystatejson'
import Header from './Header';

const accountSchema = Yup.object().shape({
    firstname: Yup.string()
        .required("First name is required")
        .matches(/^[A-Za-z]+$/, "Alphabets only"),
    lastname: Yup.string()
        .required("Last name is required")
        .matches(/^[A-Za-z]+$/, "Alphabets only"),
    date: Yup.date()
        .required('DOB is required'),
    address: Yup.string()
        .optional(),
    mobile: Yup.string()
        .required("Mbile is required")
        .matches(/^[1-9]{1}[0-9]{9}$/, 'Please provide valid mobile number'),
    country: Yup.string()
        .required("Country is required"),
    state: Yup.string()
        .required("State is required")
});

let allCountries = yourhandle.getCountries();

const initialValues = {
};

const MyAccount = () => {
    const [show, setShow] = useState(false);
    const [phonecode, setPhoneCode] = useState('-');
    const [shortName, setShortCode] = useState([]);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={accountSchema}
            onSubmit={(values) => {
                console.log(values);
                setShow(true);
            }}
        >
            {(formik) => {
                const { errors, values, touched, isValid, dirty, handleChange, handleBlur } = formik;
                return (
                    <div className="container">
                        <Header />
                        <div className="myaccountContainer">
                            <Form>

                                <h1>My Account</h1>
                                <div className="inline">
                                    <div className="form-row">
                                        <label htmlFor="firstname">First name</label>
                                        <Field
                                            validateOnBlur
                                            validateOnChange
                                            name="firstname"
                                            render={({ field, form }) => (
                                                <TextField
                                                    name={"firstname"}
                                                    error={
                                                        Boolean(errors.firstname && touched.firstname)
                                                    }
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={
                                                        errors.firstname &&
                                                        touched.firstname &&
                                                        String(errors.firstname)
                                                    }
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="form-row">
                                        <label htmlFor="lastname">Last name</label>
                                        <Field
                                            validateOnBlur
                                            validateOnChange
                                            name="lastname"
                                            render={({ field, form }) => (
                                                <TextField
                                                    name={"lastname"}
                                                    error={
                                                        Boolean(errors.lastname && touched.lastname)
                                                    }
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={
                                                        errors.lastname &&
                                                        touched.lastname &&
                                                        String(errors.lastname)
                                                    }
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <label htmlFor="date">DOB</label>
                                    <Field
                                        validateOnBlur
                                        validateOnChange
                                        name="date"
                                        render={({ field, form }) => (
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DatePicker
                                                    name={"date"}
                                                    clearable
                                                    autoOk
                                                    disableToolbar
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    value={values.date}
                                                    error={
                                                        Boolean(errors.date && touched.date)
                                                    }
                                                    onChange={(value) => form.setFieldValue(field.name, value, true)}
                                                    onBlur={handleBlur}
                                                    helperText={
                                                        errors.date &&
                                                        touched.date &&
                                                        String(errors.date)
                                                    }
                                                    className="datepicker"
                                                />
                                            </MuiPickersUtilsProvider>
                                        )}
                                    />
                                </div>
                                <div className="form-row">
                                    <label htmlFor="address">Address</label>
                                    <Field
                                        validateOnBlur
                                        validateOnChange
                                        name="address"
                                        render={({ field, form }) => (
                                            <TextField
                                                name={"address"}
                                                error={
                                                    Boolean(errors.address && touched.address)
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={
                                                    errors.address &&
                                                    touched.address &&
                                                    String(errors.address)
                                                }
                                                className="address"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </div>

                                <label htmlFor="mobile" className="label">Mobile (Country code auto populated)</label>
                                <div className="inline mt">
                                    <div className="form-row code">
                                        <Field
                                            validateOnBlur
                                            validateOnChange
                                            name="phonecode"
                                            render={({ field, form }) => (
                                                <TextField
                                                    name={"phonecode"}
                                                    value={phonecode}
                                                    disabled
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="form-row mobile">
                                        <Field
                                            validateOnBlur
                                            validateOnChange
                                            name="mobile"
                                            render={({ field, form }) => (
                                                <TextField
                                                    name={"mobile"}
                                                    type={"tel"}
                                                    error={
                                                        Boolean(errors.mobile && touched.mobile)
                                                    }
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={
                                                        errors.mobile &&
                                                        touched.mobile &&
                                                        String(errors.mobile)
                                                    }
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="inline">
                                    <div className="form-row loc">
                                        <label htmlFor="country">Country</label>
                                        <Field
                                            validateOnBlur
                                            validateOnChange
                                            name="country"
                                            render={({ field, form }) => (
                                                <Autocomplete

                                                    options={allCountries}
                                                    getOptionLabel={(option) => option.name}
                                                    renderInput={(params) => <TextField
                                                        name="country"
                                                        {...params}
                                                        variant="outlined"
                                                        helperText={
                                                            errors.country &&
                                                            touched.country &&
                                                            String(errors.country)
                                                        }
                                                        error={
                                                            Boolean(errors.country && touched.country)
                                                        }
                                                    />}
                                                    onChange={(e, value) => { form.setFieldValue('phonecode', value.phone, true); setPhoneCode(value.phone); setShortCode(value.shortName); form.setFieldValue(field.name, value.name, true) }}
                                                    onBlur={handleBlur}
                                                    
                                                    disableClearable

                                                />
                                            )}
                                        />
                                    </div>

                                    <div className="form-row loc">
                                        <label htmlFor="state">State</label>
                                        <Field
                                            validateOnBlur
                                            validateOnChange
                                            name="state"
                                            render={({ field, form }) => (
                                                <Autocomplete
                                                    name={"state"}
                                                    options={yourhandle.getStatesByShort(shortName) || []}
                                                    getOptionLabel={(option) => option}
                                                    renderInput={(params) => <TextField
                                                        name={"state"}
                                                        {...params} variant="outlined" 
                                                    helperText={
                                                        errors.state &&
                                                        touched.state &&
                                                        String(errors.state)
                                                    }
                                                    error={
                                                        Boolean(errors.state && touched.state)
                                                    }/>}
                                                    onChange={(e, value) => form.setFieldValue(field.name, value, true)}
                                                    onBlur={handleBlur}
                                                    disableClearable
                                                    className={'autocomplete'}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={!(dirty && isValid) ? "disabled-btn button" : " button"}
                                    disabled={!(dirty && isValid)}
                                >
                                    Save
                            </button>
                            </Form>
                        </div>
                        <Toast onClose={() => setShow(false)} show={show} className="toast">
                            <Toast.Header>
                                <strong className="mr-auto">My Account Data</strong>
                            </Toast.Header>
                            <Toast.Body>
                                {Object.keys({...values, ...{phonecode:phonecode}}).map(item => {
                                    // debugger
                                    return <p>{item}:{String(values[item])}</p>
                                }
                                )}
                            </Toast.Body>
                        </Toast>
                    </div>

                );
            }}
        </Formik>
    );
};

export default MyAccount;
