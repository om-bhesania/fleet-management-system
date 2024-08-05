import { Formik, Field, Form, ErrorMessage } from "formik";

const LoginForm = () => (
  <>
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <label htmlFor="Email">Email</label>
        <Field id="email" name="email" />
        <ErrorMessage component="a" name="email" />
        <label htmlFor="Email">Password</label>
        <Field id="password" name="password" />
        <ErrorMessage component="a" name="password" />
        <div className="mt-8">
          <button type="submit">Login</button>
        </div>
      </Form>
    </Formik>
  </>
);

export default LoginForm;
