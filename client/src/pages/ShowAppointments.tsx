import axios from "axios";
import { baseUrl } from "BaseUrl/BaseUrl";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";

interface doctorResponse {
  id: number;
  name: string;
  category: string;
  hos_name: string;
}

const ShowAppointments = () => {
  const [appointments, setAppointments] = useState<any>();
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
        .post(`${baseUrl}/updateappointment`, {
          time: time,
          date: date,
          doctor_id: doctorId,
          patient_id: patient_id,
        })
        .then((response) => {
          console.log(response);
          alert(response.data.data.message);
        });
      // time:Time , date:date , doctor_id:doctorId,patient_id:patient_id
    }
  };

  const handleDOctorId = (id: number) => {
    setShowModal(true);
    const filterValue = appointments.find(
      (value: any) => value.doctor_id === id
    );
    setDdoctorId(filterValue.doctor_id);
  };

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
    setSelected(e);
    console.log(`${e.getDate()}-${e.getMonth()}-${e.getFullYear()}`);
    setDate(`${e.getDate()}-${e.getMonth()}-${e.getFullYear()}`);
  };

  const fetchAppoint = async () => {
    await axios
      .post(`${baseUrl}/singleappointment`, {
        patient_id: patient_id,
      })
      .then((response) => {
        console.log(response);
        setAppointments(response.data.data);
        if (response.data.data.message) {
          alert(response.data.data.message);
        }
      });
    // await axios.get(`http://localhost:8000/api/singleappointment`,
    // {patient_id: patient_id}).then((response) => {
    //   console.log("res", response);
    //   setAppointments(response.data.data);
    // });
  };

  console.log(appointments);
  useEffect(() => {
    fetchAppoint();
  }, []);
  return (
    <div>
      <div className="grid place-items-center">
        <h1 className="text-gray-900 font-bold text-3xl mt-10 underline decoration-purple-500 decoration-4 underline-offset-8 mb-4">
          Your appointments
        </h1>
      </div>
      <div className="grid place-items-end"></div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Index
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Doctor Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Time
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Reshidule
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      cancel
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments &&
                    appointments?.map((cat: any, index: number) => (
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {cat.doctor_id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {cat.date}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {cat.time}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <button
                            className="text-green-500 hover:text-green-700"
                            onClick={() => handleDOctorId(cat.doctor_id)}
                          >
                            Re-shedule
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
                                            onClick={() =>
                                              handleClick("8:00-8:20")
                                            }
                                            className=" h-10 rounded bg-blue-200 col-span-1 hover:bg-blue-400"
                                          >
                                            {" "}
                                            8:00-8:20
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleClick("8:20-8:20")
                                            }
                                            className=" h-10 rounded bg-blue-200 col-span-1 hover:bg-blue-400"
                                          >
                                            8:20-8:40
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleClick("8:40-9:00")
                                            }
                                            className=" h-10 rounded bg-blue-200 col-span-1 hover:bg-blue-400"
                                          >
                                            8:40-9:00
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleClick("9:00-9:20")
                                            }
                                            className=" h-10 rounded bg-blue-200 col-span-1 hover:bg-blue-400"
                                          >
                                            9:00-9:20
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleClick("9:20-9:40")
                                            }
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
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <a className="text-red-500 hover:text-red-700">
                            cancel
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowAppointments;
