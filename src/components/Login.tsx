import "./css/login.css";
import { useMutation } from "@apollo/client";
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

    const value = await loginMutation({
      variables: {
        email: emailInput.current?.value,
        password: passwordInput.current?.value,
      },
      onError: ({ graphQLErrors, networkError }) => {
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      },
    });

    console.log(value);
  };

  if (error) {
    console.log(error.graphQLErrors);
  }

  if (data) {
    console.log(data);
  }

  return (
    <div className="containerFull">
      <div className="loginBlock">
        <h1 className="heading-primary">Login Form</h1>
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
