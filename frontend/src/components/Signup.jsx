import React from "react";
import styles from "../styles/signup.module.scss";
import { useFormik } from "formik";
import { formFields } from "@/constants";
import { useState } from "react";

const Signup = () => {
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  // Construct the dynamic URL using environment variables
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = "/signup";
  const url = `${baseURL}${endpoint}`;

  const initialValues = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    profile_pic: null,
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      setIsLoading(true);

      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      fetch(url, {
        method: "POST",
        body: formData,
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((data) => {
            setIsSubmited(true);
          });
        } else {
          r.json().then((err) => setError(err.error));
        }
      });
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFieldValue("profile_pic", file);
  };
  return (
    <div className={styles.container}>
      <h3>Create an Account</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.textInput}>
          {formFields.map((field) => {
            if (field.name === "profile_pic") {
              return (
                <div className={styles.field} key={field.name}>
                  <label htmlFor={field.name}>{field.label} :</label>
                  <input
                    type={field.type}
                    id={field.name}
                    onChange={(event) => handleFileChange(event, setFieldValue)}
                  />
                </div>
              );
            }
            return (
              <div className={styles.field} key={field.name}>
                <label htmlFor={field.name}>{field.label} :</label>
                <input
                  type={field.type}
                  placeholder={field.label}
                  id={field.name}
                  autoComplete="off"
                  value={values[field.name]}
                  onChange={handleChange}
                />
              </div>
            );
          })}
        </div>
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
        {isSubmited ? (
          <p>
            Account is created successfully. You will be directed to the sign in
            page
          </p>
        ) : null}
      </form>
    </div>
  );
};

export default Signup;
