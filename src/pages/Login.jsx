import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuth";
import { useModal } from "../context/ModalContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { openModal } = useModal();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginSuccess = await login(
        event.target.email.value,
        event.target.password.value,
      );
      if (loginSuccess) {
        navigate("/products");
      }
    } catch (error) {
      console.log({
        error,
        message: error?.response?.data?.message,
        error_status: error.status,
      });
      openModal({
        title: "Login Failed",
        message:
          error?.response?.data?.message ||
          "Invalid credentials. Please try again.",
        primaryText: "OK",
      });
    }
  };

  return (
    <>
      <form className="p-6" onSubmit={handleLogin}>
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <label className="block mb-2">
          email:
          <input
            type="email"
            className="ml-2 p-1 border rounded"
            placeholder="Enter email"
            name="email"
            required
            defaultValue="johnd@yopmail.com"
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            className="ml-2 p-1 border rounded"
            placeholder="Enter password"
            name="password"
            required
            defaultValue="Asd123!@#"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-2xl"
        >
          Login
        </button>
      </form>

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Test Credentials</h2>
        <p className="text-gray-700">
          Use the following credentials to log in:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Username: johnd@yopmail.com</li>
          <li>Password: Asd123!@#</li>
        </ul>
      </div>
    </>
  );
}
