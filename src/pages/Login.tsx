import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleContinue = () => {
    login();
    navigate("/", { replace: true });
  };

  return (
    <div className="login">
      <div className="login__card">
        <div className="login__emoji">🌶️</div>
        <h1>Thali</h1>
        <p>Indian-home-kitchen recipes for a life with no time to decide what to cook.</p>
        <button type="button" className="login__button" onClick={handleContinue}>
          Continue
        </button>
        <p className="login__note">Placeholder login — logs you in as a test user.</p>
      </div>
    </div>
  );
}
