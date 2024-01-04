import { style } from "./statics/formStyle";
import { useState } from "react";
import { useLogin } from "../../../hooks/useLogin";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoading, error, success } = useLogin();
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
    await login(formData);
    setFormData({
      email: "",
      password: "",
    });
    e.target.reset();
  };
  return (
    <>
      <form className={form} onSubmit={submitHandler}>
        <div>
          <h1 className={title}>Login</h1>
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email:
          </label>
          <input
            type="text"
            name="email"
            onChange={changeHandler}
            placeholder="Enter your email"
            className={input}
          />
        </div>
        <div>
          <label htmlFor="password" className={label}>
            Password:
          </label>
          <input
            onChange={changeHandler}
            name="password"
            type="password"
            placeholder="Enter your password"
            className={input}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Login"
            className={submit}
            disabled={isLoading}
          />
        </div>
        <div>
          <button className={altSubmit} disabled={isLoading}>
            Signup
          </button>
        </div>
        {success && <div className={successStyle}>{success}</div>}
        {error && <div className={errorStyle}>{error}</div>}
      </form>
    </>
  );
};

export default LoginForm;
