import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
const Login = () => {
  let navigate = useNavigate();

  const [data, setData] = useState<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: any) => {
    e.preventDefault();
    let resValue: any;
    await axios
      .post(`http://localhost:8000/api/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        setData(response.data);

        resValue = response.data;
      });
    console.log("date", data);
    console.log(resValue.status);
    if (resValue.status === 200) {
      localStorage.setItem("userID", resValue.data.id);
      localStorage.setItem("role", resValue.data.role);
      localStorage.setItem("userEmail", resValue.data.email);
      console.log(resValue.data.id);

      localStorage.setItem("userInfo", JSON.stringify(resValue.data));
      var json = JSON.parse(localStorage.userInfo);
      console.log(json.email);
      if (resValue.data.role == 1) {
        navigate("/admin");
      }else{
        navigate("/");
      }
    } else {
      // Failed Message
      swal({
        text: "Email Or Password Is Incorrect",
        title: "Login Failed",
        icon: "error",
      });
    }
  };
  return (
    <div>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Sign in
            {data?.message}
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                value={email}
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                value={password}
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button
                onClick={(e) => login(e)}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Login
              </button>
              <Link to="/signup">
                <a className="text-sm text-gray-600 underline hover:text-gray-900">
                  Want to register?
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
