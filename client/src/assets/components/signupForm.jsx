import { style } from "./statics/formStyle";
import { useSignup } from "../../../hooks/useSignup";
import { useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { signup, isLoading, error, success } = useSignup();
  const {
    label,
    input,
    submit,
    altSubmit,
    form,
    title,
    errorStyle,
    successStyle,
  } = style();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await signup(formData);
    setFormData({ username: "", email: "", password: "" });
    e.target.reset();
  };

  return (
    <>
      <form className={form} onSubmit={submitHandler}>
        <div>
          <h1 className={title}>Signup</h1>
        </div>
        <div>
          <label htmlFor="username" className={label}>
            Username:
          </label>
          <input
            type="text"
            name="username"
            onChange={changeHandler}
            placeholder="Enter your username"
            className={input}
          />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email:
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className={input}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="password" className={label}>
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className={input}
            onChange={changeHandler}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Signup"
            className={submit}
            disabled={isLoading}
          />
        </div>
        <div>
          <button className={altSubmit} disabled={isLoading}>
            Login
          </button>
        </div>
        {success && <div className={successStyle}>{success}</div>}
        {error && <div className={errorStyle}>{error}</div>}
      </form>
    </>
  );
};

export default SignupForm;
