import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../contexts";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const navigate = useNavigate();
  const { register } = useContext(UserContext);

  const handleChange = (e) => {
    let newForm = { ...form };
    newForm[e.target.name] = e.target.value;
    setForm(newForm);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const handleRegister = async () => {
      try {
        const newForm = { ...form };
        newForm.name = newForm.name.trim();
        newForm.email = newForm.email.trim();
        await register({ ...newForm });
        toast.success("Account created successfully!");
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
    if (form.name === "") {
      setError("Please enter name");
      setButtonsDisabled(false);
      return false;
    }
    if (/^[a-zA-Z ]*$/.test(form.name.trim()) === false) {
      setError("Name must contaon only alphabets and spaces");
      setButtonsDisabled(false);
      return false;
    }
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
    if (form.password.length < 8) {
      setError("Password should be minimum 8 characters long");
      setButtonsDisabled(false);
      return false;
    }
    handleRegister();
  };
  return (
    <div id="register-page" className="page">
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h5 className="text-center">Register</h5>
          <div className="form-group">
            <label htmlFor="email">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              name="name"
              value={form.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
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
          <small className="form-text text-muted">{error}</small>
          <button
            type="submit"
            className="btn btn-success"
            disabled={buttonsDisabled}
          >
            {buttonsDisabled ? "Please wait..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
