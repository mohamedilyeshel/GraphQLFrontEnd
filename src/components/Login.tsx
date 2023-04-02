import "./css/login.css";
import { useMutation } from "@apollo/client";
import { LoginQ } from "../Queries/mutations";
import { useRef } from "react";
import ErrorComponent from "./sharedComponents/ErrorComponent";

export default function Login() {
  const [loginMutation, { data, loading }] = useMutation(LoginQ);

  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    loginMutation({
      variables: {
        email: emailInput.current?.value,
        password: passwordInput.current?.value,
      },
    }).catch((err) => {
      console.log(err);
    });
  };

  if (data) {
    console.log(data);
  }

  return (
    <div className="containerFull">
      <div className="loginBlock">
        <h1 className="heading-primary">Login Form</h1>
        {data?.login && (
          <ErrorComponent
            message={data.login.errors?.message || "Logged in Successfuly"}
            isNotError={!data?.login.errors}
          />
        )}
        <form className="loginForm" onSubmit={handleLogin}>
          <div className="formGroup">
            <label className="inputTitle" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              ref={emailInput}
              required
              placeholder="Write your Email"
              id="email"
            />
          </div>
          <div className="formGroup">
            <label className="inputTitle" htmlFor="password">
              Password
            </label>
            <input ref={passwordInput} type="password" required id="password" />
          </div>
          <button type="submit" disabled={loading}>
            Login
          </button>
        </form>
        <div className="dontHaveAccount">
          <p>
            Not a member? <span>Signup now</span>
          </p>
        </div>
      </div>
    </div>
  );
}
