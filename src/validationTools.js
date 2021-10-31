import * as yup from 'yup';
import { DateTime } from 'luxon';


export const customerYupSchema = yup.object().shape({
    id: yup.mixed().nullable(true).default(null),
    authors: yup.string().ensure().required("Mora se uneti bar jedan autor"),
    title: yup.string().ensure().required("Mora se uneti naslov knjige"),
    genre: yup.string().ensure().required("Mora se uneti žanr knjige"),
    publishDate: yup.date().max(DateTime.now(), "Ne može datum skoriji od danas"),
    isbn: yup.number().required("Mora se uneti ISBN broj"),
    rating: yup.number().required("Ocena mora biti decimalni broj")
});

export const toStandardTime = (time) => {
    return time.toFormat("y-MM-dd");
}