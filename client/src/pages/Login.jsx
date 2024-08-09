import axios from "../services/axiosInstance";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios({
        method: "POST",
        url: "api/users/login",
        data: {
          email,
          password,
        },
      });

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "An Error Occurred",
        text: error.response?.data?.message || "Please try again.",
      });
    }
  };

  useEffect(() => {
    async function handleCredentialResponse(response) {
      try {
        const { data } = await axios({
          method: "post",
          url: "/google-login",
          headers: {
            google_token: response.credential,
          },
        });

        localStorage.setItem("access_token", data.access_token);
        navigate("dashboard");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "An Error Occurred",
          text: error.response?.data?.message || "Please try again.",
        });
      }
    }

    google.accounts.id.initialize({
      client_id:
        "914092917679-rtvfu1ah4qbvlvechebnmaokjn66t6gc.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <div id="buttonDiv" className="flex justify-center"></div>
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
