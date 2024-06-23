import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import moment from "moment";
import { URL } from "../Url";

const TodoEditTask = () => {
  const [cookies] = useCookies(["userid"]);
  const navigate = useNavigate();
  const params = useParams();
  const [appointment, setAppointment] = useState(null); // Initialize with null to handle loading state

  useEffect(() => {
    axios
      .get(`${URL}/view-task/${params.id}`)
      .then((res) => {
        setAppointment(res.data); // Set fetched data to state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setAppointment({}); // Handle error state
      });
  }, [params.id]);

  const formik = useFormik({
    initialValues: {
      Appointment_Id: appointment ? appointment.Appointment_Id : "",
      Title: appointment ? appointment.Title : "",
      Description: appointment ? appointment.Description : "",
      Date: appointment ? moment(appointment.Date).format("YYYY-MM-DD") : "",
      UserId: cookies["userid"] || "",
    },
    enableReinitialize: true, // Reinitialize form when state updates
    onSubmit: (task) => {
      axios
        .put(`${URL}/edit-task/${params.id}`, task)
        .then(() => {
          alert("Edited Successfully");
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error updating task:", error);
          alert("Failed to edit task");
        });
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="bg-light p-4 m-3 border border-dark">
        <h3 className="text-center text-danger">Edit Details</h3>
        <form onSubmit={formik.handleSubmit}>
          <dl>
            <dt>Appointment_Id</dt>
            <dd>
              <input
                type="number"
                value={formik.values.Appointment_Id}
                name="Appointment_Id"
                onChange={formik.handleChange}
                className="form-control"
              />
            </dd>
            <dt>Title</dt>
            <dd>
              <input
                type="text"
                value={formik.values.Title}
                name="Title"
                onChange={formik.handleChange}
                className="form-control"
              />
            </dd>
            <dt>Description</dt>
            <dd>
              <textarea
                rows="4"
                cols="40"
                value={formik.values.Description}
                name="Description"
                onChange={formik.handleChange}
                className="form-control"
              ></textarea>
            </dd>
            <dt>Date</dt>
            <dd>
              <input
                type="date"
                name="Date"
                value={formik.values.Date}
                onChange={formik.handleChange}
                className="form-control"
              />
            </dd>
          </dl>
          <Link to="/dashboard">
            <button className="btn btn-danger m-2" type="button">
              Cancel
            </button>
          </Link>
          <button className="btn btn-success m-2" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoEditTask;
