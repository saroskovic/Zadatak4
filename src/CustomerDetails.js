import React, { useState } from "react";
import { Formik } from 'formik'
import './CustomerDetails.css';
import { customerYupSchema, toStandardTime } from "./validationTools";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker'
import { useHistory } from "react-router-dom";


const CustomerDetails = ({ startingMode, customer, action }) => {
    const [mode, setMode] = useState(startingMode);
    const history = useHistory();
    let message = "";
    let inputProps = {}
    let hideID = false;
    if(mode === "view") {
        message = `Pregled ${customer.authors} ${customer.title}`;
        inputProps = { readOnly: true };
    }else if(mode === "edit") {
        message = `Izmena ${customer.authors} ${customer.title}`;
    }else if(mode === "create"){
        message = "Dodavanje nove knjige";
        hideID = true;
    }
    return <div className="formContent">
        <h3>{message}</h3>
        <Formik
            initialValues={customer}
            validationSchema={customerYupSchema}
            onSubmit={(values, {setSubmitting}) => {
                const rez = action(values);
                setSubmitting(false);
                history.go(-1);                
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                validateField,
                isSubmitting
            }) => (
            <form onSubmit={handleSubmit}>                
                {hideID || <TextField
                    fullWidth
                    margin="normal"
                    name="id"
                    label="Id"
                    value={values.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.id && Boolean(errors.id)}
                    helperText={touched.id && errors.id}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                />}
                <TextField
                    fullWidth
                    margin="normal"
                    name="authors"
                    label="Autori"
                    value={values.authors}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.authors && Boolean(errors.authors)}
                    helperText={touched.authors && errors.authors}
                    variant="outlined"
                    InputProps={inputProps}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    name="title"
                    label="Naslov"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    variant="outlined"
                    InputProps={inputProps}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    name="genre"
                    label="Žanr"
                    value={values.genre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.genre && Boolean(errors.genre)}
                    helperText={touched.genre && errors.genre}
                    variant="outlined"
                    InputProps={inputProps}
                />

            <DatePicker
                    margin="normal"
                    name="publishDate"
                    label="Datum izdavanja:"
                    value={values.publishDate}
                    readOnly={inputProps.readOnly ? true : false}
                    onChange={(e) => {
                        setFieldValue("publishDate", toStandardTime(e));
                        setFieldTouched("publishDate", true, true);
                        validateField("publishDate");
                    }}
                    onBlur={handleBlur}                    
                    renderInput={(params) => <TextField {...params}/>}
                />
                <span>
                    {(touched.publishDate && Boolean(errors.publishDate)) ? errors.publishDate : ""}
                </span><br/>
                <TextField
                    fullWidth
                    margin="normal"
                    name="isbn"
                    label="ISBN"
                    value={values.isbn}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.isbn && Boolean(errors.isbn)}
                    helperText={touched.isbn && errors.isbn}
                    multiline
                    maxRows={4}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    margin="normal"
                    name="rating"
                    label="Ocena"
                    value={values.rating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.rating && Boolean(errors.rating)}
                    helperText={touched.rating && errors.rating}
                    variant="outlined"
                    InputProps={inputProps}
                />

                {
                    (mode === "view") ? "" : <Button disabled={isSubmitting} 
                        color="primary" variant="contained" fullWidth type="submit">Snimi</Button>
                }
            </form>
            )}
            
        </Formik>        
    </div>
};

CustomerDetails.defaultProps = {
    customer: { "id": null, authors: "", title: "", genre: "", publishDate: "", isbn: "", rating: ""},
    startingMode: "view"
}

export default CustomerDetails;