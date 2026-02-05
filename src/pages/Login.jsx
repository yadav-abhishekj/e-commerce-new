import useAuthContext from "../hooks/useAuth";

export default function Login() {
  const { dispatch } = useAuthContext();

  const handleLogin = () => {
    dispatch({
      type: "LOGIN",
      payload: {
        token: "fake-jwt-token",
        user: {
          id: 1,
          name: "Abhi",
          email: "abhi@test.com",
        },
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-2xl"
      >
        Simulate Login
      </button>
    </div>
  );
}
