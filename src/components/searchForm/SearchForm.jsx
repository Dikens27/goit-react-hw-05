import css from './SearchForm.module.css';
import { IoIosSearch } from 'react-icons/io';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';

const searchSchema = yup.object().shape({
  query: yup.string().min(1, 'Too Short!').max(50, 'Too Long!'),
});

export default function SearchForm({ onSearch }) {
  const handleSubmit = (values, actions) => {
    onSearch(values.query);
    if (!values.query) {
      toast.error('Please enter a search query');
    }
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={handleSubmit}
      validationSchema={searchSchema}
    >
      <Form className={css.form}>
        <button className={css.button} type="submit">
          <IoIosSearch />
        </button>
        <Field
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search film"
          name="query"
        />
      </Form>
    </Formik>
  );
}
