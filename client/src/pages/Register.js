import { useState } from "react";
import { useRegister } from "../context/useRegister";
import "../style/registerStyle.css"

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {register, isLoading, error} = useRegister()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    await register(email, password)
  };

  return (
    <form className="Register" onSubmit={handleSubmit}>
      <h3>Register</h3>
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
      <button disabled={isLoading}>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default Register
