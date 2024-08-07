import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PatientList from "./PatientList";

function Profile() {
  const [user, setUser] = useState({});
  const [showContent, setShowContent] = useState(false);
  const { id } = useParams();
  const role = useSelector((state) => state.role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/user/getUser/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setUser(response.data.data);
        console.log("user=", response.data.data);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };
    fetchData();
  }, [id]);

  const toggleContent = () => {
    setShowContent((prevShowContent) => !prevShowContent);
  };

  return (
    <div>
      {/* First Component */}
      <div className="card card-side bg-base-100 shadow-xl w-1/2 m-auto">
        <figure>
          <img
            src="https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg"
            alt="User"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title font-bold text-4xl">{user.name}</h2>
          <p className="font-bold">Role: {user.role}</p>
          {user.role === "doctor" && (
            <>
              <h1 className="font-bold text-2xl">
                Speciality: {user.speciality}
              </h1>
              <button
                className="btn rounded-md bg-slate-200"
                onClick={toggleContent}
              >
                {showContent ? "Hide Patient Info" : "Show Patient Info"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Second Component - Conditional Content */}
      {showContent && (
        <div className="m-auto w-1/2 mt-4 bg-slate-100 p-4 rounded-md shadow-md">
          <PatientList />
        </div>
      )}
    </div>
  );
}

export default Profile;
