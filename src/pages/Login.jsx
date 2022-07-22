import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../contexts";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    let newForm = { ...form };
    newForm[e.target.name] = e.target.value;
    setForm(newForm);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const handleLogin = async () => {
      try {
        await login(form);
        toast.success("Logged in successfully!");
        navigate("/");
      } catch (error) {
        console.log("error caught in Register page");
        console.log(error);
        const {
          response: { data },
        } = error;
        console.log(data);
        if (data && data.msg) {
          setError(data.msg);
        }
      }
      setButtonsDisabled(false);
    };
    setButtonsDisabled(true);
    setError("");
    if (form.email === "") {
      setError("Please enter email address");
      setButtonsDisabled(false);
      return false;
    }
    if (form.password === "") {
      setError("Please enter password");
      setButtonsDisabled(false);

      return false;
    }
    handleLogin();
  };
  return (
    <div id="login-page" className="page">
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h5 className="text-center">Login</h5>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={form.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <small id="emailHelp" className="form-text text-muted">
            {error}
          </small>
          <button
            type="submit"
            className="btn btn-success"
            disabled={buttonsDisabled}
          >
            {buttonsDisabled ? "Please wait..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
