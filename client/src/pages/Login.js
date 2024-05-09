import { useState } from "react";
import "../style/loginStyle.css"
import { useLogin } from "../context/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, isLoading, error} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password); 
    console.log(email, password);
  };

  return (
    <form className="Login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <input
        type="email"
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>LogIn</button>
      {error && <div>{error}</div>}
    </form>
  );
};
export default Login
