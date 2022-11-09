import axios from "axios";
import { baseUrl } from "BaseUrl/BaseUrl";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import ReactPaginate from "react-paginate";

interface doctorResponse {
  id: number;
  name: string;
  category: string;
  hos_name: string;
}

const Admin = () => {
  const [appointments, setAppointments] = useState<any>();
  const [patient, setPatient] = useState<any>();
  const [selected, setSelected] = React.useState<Date>();
  const [Time, setTime] = React.useState<string>();
  const [date, setDate] = React.useState<string>();
  const [doctorId, setDdoctorId] = React.useState<number>();
  const [showModal, setShowModal] = React.useState(false);
  const [showView, setShowView] = React.useState(false);
  const [timesection, setTimesection] = React.useState(false);
  const [data, setData] = React.useState<doctorResponse[]>();
  const [pageCount, setPageCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [toatlPost, setTotalPost] = useState<number>(0);
  const [appointmentID, setAppointmentID] = useState<any>();
  const [patientName, setPatientName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [editPatientID, setEditPatientID] = useState<number>();
  const [status, setStaus] = useState<any>();

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

  const fetchPatient = async () => {
    await axios
      .get(`${baseUrl}/singlepatient`, {
        params: { patient_id: editPatientID },
      })
      .then((response) => {
        console.log("res", response);
        setPatient(response.data.data);
      });
  };

  console.log("appointments", appointments);
  console.log("pATIENT", patient);

  // const todayDate = new Date()
  const handleDate = (e: any) => {
    setSelected(e);
    console.log(`${e.getDate()}-${e.getMonth()}-${e.getFullYear()}`);
    setDate(`${e.getDate()}-${e.getMonth()}-${e.getFullYear()}`);
  };

  const handlePageClick = (event: any) => {
    console.log("handlePageClick", event.selected);
    setOffset((event.selected * limit) % toatlPost);
  };

  const fetchAppoint = async (
    limit: number,
    offset: number,
    patientName: string,
    contact: string,
    appointmentID: number,
    status:any
  ) => {
    await axios
      .get(`${baseUrl}/allappointment`, {
        params: {
          limit: limit,
          offset: offset,
          appointmentID: appointmentID,
          patientName: patientName,
          contact: contact,
          status
        },
      })
      .then((response) => {
        console.log(response);
        setAppointments(response.data.data ?? []);
        setPageCount(Math.ceil(response.data.totalCount / limit));
        setTotalPost(response.data.totalCount);
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

  const handlepatient = (patientID: number) => {
    console.log("pppppppiiiiiiid", patientID);
    setShowView(true);
    const fiValue = appointments.find(
      (value: any) => value.patient_id === patientID
    );
    setEditPatientID(fiValue.patient_id);
    console.log("ertyui", fiValue);
  };
  const handleSearch = () => {
    if (patientName) {
      const result: any = appointments?.filter(({ patient_name }: any) =>
        patient_name.toLowerCase().includes(patientName?.toLowerCase())
      );
      if (result.length > 0) {
        setAppointments(result);
        setPatientName(" ");
      } else {
        setAppointments([]);
      }
    } else if (contact) {
      const result: any = appointments?.filter(({ contact_no }: any) =>
        contact_no.includes(contact)
      );
      if (result.length > 0) {
        setAppointments(result);
      } else {
        setAppointments([]);
      }
    } else if (appointmentID) {
      const result: any = appointments?.filter(({ appointment_id }: any) =>
        appointment_id.includes(appointmentID)
      );
      if (result.length > 0) {
        setAppointments(result);
      } else {
        setAppointments([]);
      }
    }
  };

  console.log(appointments);
  useEffect(() => {
    fetchAppoint(limit, offset, patientName, contact, appointmentID,status);
  }, [offset, patientName, contact, appointmentID,status]);

  useEffect(() => {
    fetchPatient();
  }, [showView]);

  return (
    <div>
      <div className="flex h-screen">
        <div className="px-4 py-2 bg-gray-200 bg-indigo-600 lg:w-1/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline w-8 h-8 text-white lg:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <div className="hidden lg:block">
            <div className="my-2 mb-6">
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <ul>
              <li className="mb-6">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" className="p-1 focus:outline-none">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                      >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    name="search"
                    className="w-full px-4 py-2 pl-12 rounded shadow outline-none"
                    placeholder="Search..."
                  />
                </div>
              </li>

              <li className="mb-2 bg-gray-800 rounded shadow">
                <a className="inline-block w-full h-full px-3 py-2 font-bold text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-6 h-6 mr-2 -mt-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Appointments
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full px-4 py-2 bg-gray-200 lg:w-full">
          <div className="container mx-auto mt-12">
            <div className="flex w-full items-end gap-4">
              <div>
                <label>patient name</label> <br />
                <input
                  placeholder="Patient Name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
              <div>
                <label>Contact Number</label> <br />
                <input
                  placeholder="Contact Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div>
                <label>Appointment ID</label> <br />
                <input
                  type="number"
                  placeholder="Appointment ID"
                  value={appointmentID}
                  onChange={(e) => setAppointmentID(e.target.value)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700"></label>
                <select
                  onChange={(e) => setStaus(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">None</option>
                  <option value="0">Done</option>
                  <option value="1">Cancel</option>

                </select>
              </div>
              {/* <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 pt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={handleSearch}
              >
                search
              </button> */}
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Appointment ID
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Doctor Name
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Patient Name
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Contact NO
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        date
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        time
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Status
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Edit
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Delete
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {appointments?.length == 0 ? (
                      <h1>No Data Found</h1>
                    ) : (
                      appointments?.map((cat: any, index: number) => (
                        <tr>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                            {cat.appointment_id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {cat.doctor_name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {cat.patient_name}
                            <button
                              onClick={() => handlepatient(cat.patient_id)}
                              className="text-sm font-medium text-right whitespace-nowrap text-green-500 hover:text-green-700"
                            >
                              ( View )
                            </button>
                          </td>
                          {showView ? (
                            <>
                              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                  {/*content*/}
                                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                      <h3 className="text-3xl font-semibold">
                                        Patient Details
                                      </h3>
                                      <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowView(false)}
                                      >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                          ×
                                        </span>
                                      </button>
                                    </div>
                                    {/*body*/}
                                    {patient &&
                                      patient?.map(
                                        (cat: any, index: number) => (
                                          <div>
                                            <div className="flex p-5 ">
                                              <div className="w-full overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                                                <form>
                                                  <div>
                                                    <label
                                                      htmlFor="name"
                                                      className="block text-sm font-medium text-gray-700 undefined"
                                                    >
                                                      Name
                                                    </label>
                                                    <div className="flex flex-col items-start">
                                                      <div className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                                        {cat?.name}
                                                      </div>
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
                                                      <div className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                                        {cat?.email}
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="mt-4">
                                                    <label className="block text-sm font-medium text-gray-700 undefined">
                                                      Contact Number
                                                    </label>
                                                    <div className="flex flex-col items-start">
                                                      <div className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                                        {cat?.contact_no}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </form>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}

                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                      <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {
                                          setShowView(false);
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
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {cat.contact_no}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {cat.date}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {cat.time}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {cat.status == 1 ? "Cancel" : "Done"}
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
                      ))
                    )}
                  </tbody>
                </table>
                {appointments && appointments?.length > 0 && (
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={(event) => handlePageClick(event)}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    //   renderOnZeroPageCount={null}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"active"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
