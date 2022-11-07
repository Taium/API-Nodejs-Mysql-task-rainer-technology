import axios from "axios";
import { baseUrl } from "BaseUrl/BaseUrl";
import React, { useEffect, useState } from "react";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface doctorResponse {
  id: number;
  name: string;
  category: string;
  hos_name: string;
}

const Appointment = () => {
  const [selected, setSelected] = React.useState<Date>();
  const [Time, setTime] = React.useState<string>();
  const [date, setDate] = React.useState<string>();
  const [doctorId, setDdoctorId] = React.useState<number>();
  const [showModal, setShowModal] = React.useState(false);
  const [timesection, setTimesection] = React.useState(false);
  const [data, setData] = React.useState<doctorResponse[]>();
  const disabledDays = [
    new Date(2022, 10, 10),
    new Date(2022, 10, 12),
    new Date(2022, 10, 20),
    { from: new Date(2022, 4, 18), to: new Date(2022, 4, 29) },
  ];
  const patient_id = localStorage.getItem("userID");
  const handleClick = async (time: string) => {
    setTime(time);
    const confirm = window.confirm(
      `Are you sure your time is  :${time} and date : ${date}`
    );
    if (confirm) {
      await axios
        .post(`${baseUrl}/addappointment`, {
          time: time,
          date: date,
          doctor_id: doctorId,
          patient_id: patient_id,
        })
        .then((response) => {
          console.log(response);
          alert(response.data.message);
        });
      // time:Time , date:date , doctor_id:doctorId,patient_id:patient_id
    }
  };

  console.log(Time);
  console.log(date);
  console.log(doctorId);
  console.log(patient_id);

  const fetchDoctor = async () => {
    await axios.get(`http://localhost:8000/api/doctor`).then((response) => {
      console.log("res", response);
      setData(response.data.data);
    });
  };

  console.log(data);
  useEffect(() => {
    fetchDoctor();
  }, []);

  // const todayDate = new Date()
  const handleDate = (e: any) => {
    setSelected(e)
    console.log(`${e.getDate()}-${e.getMonth()}-${e.getFullYear()}`);
    setDate(`${e.getDate()}-${e.getMonth()}-${e.getFullYear()}`);
  };
  return (
    <div>
      <div className="text-center   pt-5">
        <h1 className=" text-xl font-semibold"> Select Your Appointments </h1>
        <p>"todayDate"</p>
      </div>

      <div className=" hero min-h-screen container mx-auto">
        <div className="grid gap-2 lg:grid-cols-4">
          {data &&
            data.length > 0 &&
            data?.map((items: doctorResponse, key) => (
              <div
                className="w-full rounded-lg shadow-md lg:max-w-sm"
                key={key}
              >
                {/* <img
                className="object-cover w-full h-28"
                src={items.img}
                alt="image"
              /> */}
                <div className="p-4">
                  <h4 className="text-xl font-semibold text-blue-600">
                    {items.name}
                  </h4>
                  <h6>{items.category}</h6>
                  <p>{items.hos_name}</p>
                  
                  <button
                    className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow"
                    onClick={() => {
                      setDdoctorId(items.id);
                      setShowModal(true);
                    }}
                  >
                    book now
                  </button>
                  {showModal ? (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                              <h3 className="text-3xl font-semibold">
                                Appointment processing
                              </h3>
                              <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                              >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                  ×
                                </span>
                              </button>
                            </div>
                            {/*body*/}
                            {!timesection ? (
                              <div className="relative p-6 flex-auto">
                                <DayPicker
                                  mode="single"
                                  selected={selected}
                                  onSelect={(e) => handleDate(e)}
                                  disabled={disabledDays}
                                />
                                <button
                                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setTimesection(true)}
                                >
                                  Select a Time
                                </button>
                              </div>
                            ) : (
                              <div className="relative p-6 flex-auto">
                                <h3>Choose Time Slot</h3>
                                <div className="mt-3 text-center grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-2 ">
                                  <button
                                    onClick={() => handleClick("8:00-8:20")}
                                    className=" h-10 rounded bg-blue-200 col-span-1 hover:bg-blue-400"
                                  >
                                    {" "}
                                    8:00-8:20
                                  </button>
                                  <button
                                    onClick={() => handleClick("8:20-8:20")}
                                    className=" h-10 rounded bg-blue-200 col-span-1 hover:bg-blue-400"
                                  >
                                    8:20-8:40
                                  </button>
                                  <button
                                    onClick={() => handleClick("8:40-9:00")}
                                    className=" h-10 rounded bg-blue-200 col-span-1 hover:bg-blue-400"
                                  >
                                    8:40-9:00
                                  </button>
                                  <button
                                    onClick={() => handleClick("9:00-9:20")}
                                    className=" h-10 rounded bg-blue-200 col-span-1 hover:bg-blue-400"
                                  >
                                    9:00-9:20
                                  </button>
                                  <button
                                    onClick={() => handleClick("9:20-9:40")}
                                    className=" h-10 rounded bg-blue-200 col-span-1 hover:bg-blue-400"
                                  >
                                    9:20-9:40
                                  </button>
                                </div>
                                <button
                                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  // onClick={ handleprint }
                                >
                                  submit
                                </button>
                              </div>
                            )}
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                  setTimesection(false);
                                  setShowModal(false);
                                }}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  ) : null}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
