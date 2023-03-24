import "./css/login.css";
import { useMutation, gql } from "@apollo/client";
import { LoginQ } from "../Queries/mutations";
import { useRef } from "react";

export default function Login() {
  const [loginMutation, { data, error, loading }] = useMutation(LoginQ, {
    errorPolicy: "all",
  });
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await loginMutation({
      variables: {
        email: emailInput.current?.value,
        password: passwordInput.current?.value,
      },
    });
  };

  if (data) {
    console.log(data);
  } else if (error) {
    console.log(error);
  }

  return (
    <div className="containerFull">
      <div className="loginBlock">
        <h1 className="heading-primary">Login Form</h1>
        <form className="loginForm" onSubmit={handleLogin}>
          <div className="formGroup">
            <label className="inputTitle" htmlFor="">
              Email
            </label>
            <input
              type="email"
              ref={emailInput}
              required
              placeholder="Write your Email"
              name="email"
            />
          </div>
          <div className="formGroup">
            <label className="inputTitle" htmlFor="">
              Password
            </label>
            <input
              ref={passwordInput}
              type="password"
              required
              name="password"
            />
          </div>
          <button type="submit">Login</button>
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
