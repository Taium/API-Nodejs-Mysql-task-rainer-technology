import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Signup = () => {
  let navigate = useNavigate();

  const [data, setData] = useState<any>("");
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [contact, setContact] = useState<any>();
  const [password, setPassword] = useState("");
  console.log(email, password, contact);

  const signup = async (e: any) => {
    e.preventDefault();
    let resValue;
    await axios
      .post(`http://localhost:8000/api/register`, {
        name: name,
        email: email,
        password: password,
        contact_no: contact,
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
        alert(response.data.message);
      });
  };
  return (
    <>
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div>
            <a href="/">
              <h3 className="text-4xl font-bold text-purple-600">
                Patient Registration
              </h3>
              {data?.message}
            </a>
          </div>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
            <form>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    name="name"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    value={email}
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Contact Number
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    value={contact}
                    placeholder="Contact"
                    name="contact"
                    onChange={(e) => setContact(e.target.value)}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end mt-4">
                <a
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  href="#"
                >
                  Already registered?
                </a>
                <button
                  onClick={(e) => signup(e)}
                  type="submit"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
