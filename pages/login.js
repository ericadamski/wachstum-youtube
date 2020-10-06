import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Router from "next/router";
import Cookie from "js-cookie";
import Input from "../components/Input";
import Field from "../components/Field";
import Label from "../components/Label";
import Button from "../components/Button";

const SignupSchema = (isSignUp) =>
  Yup.object().shape({
    name: isSignUp && Yup.string().min(2, "too short").required("required"),
    email: Yup.string().email("not valid").required("required"),
    password: Yup.string().min(6, "too short").required("required"),
  });

export default (props) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (values, context) => {
    const request = await fetch("/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        isSignUp,
      }),
    });

    context.setSubmitting(false);

    if (request.ok) {
      const token = await request.text();

      Cookie.set("_wsp", token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      process.browser && Router.push("/");
    } else {
      // errors!
      const error = await request.text();

      context.setErrors({
        general:
          error ||
          "There was a problem authenticating you with that email and password combination.",
      });
    }
  };

  return (
    <>
      <div className="page">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema(isSignUp)}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            touched,
            values,
            isSubmitting,
            isValid,
            getFieldProps,
          }) => (
            <Form>
              <div className="form">
                {isSignUp && (
                  <Field>
                    <Label htmlFor="name" error={touched.name && errors.name}>
                      👩‍💻 Name
                    </Label>
                    <Input
                      name="name"
                      id="name"
                      type="text"
                      {...getFieldProps("name")}
                    />
                  </Field>
                )}
                <Field>
                  <Label htmlFor="email" error={touched.email && errors.email}>
                    ✉️ Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    {...getFieldProps("email")}
                  />
                </Field>
                <Field>
                  <Label
                    htmlFor="password"
                    error={touched.password && errors.password}
                  >
                    🔑 Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    {...getFieldProps("password")}
                  />
                </Field>
                <Button
                  disabled={isSubmitting || !isValid}
                  loading={isSubmitting}
                >
                  {isSignUp ? "Sign up" : "Log in"}
                </Button>
                <p className="error">{errors?.general}</p>{" "}
              </div>
            </Form>
          )}
        </Formik>
        <p className="log-in-prompt">
          {isSignUp ? "Have" : "Need"} an account?
          <span className="small">
            Click below, fill out the form, et vola!
          </span>
        </p>
        <Button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Log in" : "Sign up"}
        </Button>
      </div>
      <style jsx>{`
        .error {
          text-align: center;
          color: var(--error);
        }

        .page {
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .log-in-prompt {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 0.25rem;
        }

        .log-in-prompt > .small {
          font-size: 0.75rem;
          opacity: 0.6;
        }

        .form {
          display: flex;
          flex-direction: column;
          width: 300px;
        }

        .form > :global(.field),
        .form > :global(.btn) {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  );
};
