import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PhoneAndEmailAddress = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [Data, setData] = useState("");
  const [Data1, setData1] = useState("");
  const [image, setImage] = useState("");

  let name, value;
  const [user, setUser] = useState({
    email: "",
    emergencyNo: "",
    loanEnquiryNo: "",
    technicalHelpNo: "",
    fraudComplaintNo: "",
    newOffersNo: "",
    dateOfFormSubmission: "",
  });
  const UserDetails = async () => {
    try {
      const res = await fetch("/api/userProfile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      setData(data);

      if (!res === 200) {
        throw new Error(`Error during retreive data - ${Error}`);
      }

      if (!res === 200) {
        throw new Error(`Error during retreive data - ${Error}`);
      }
    } catch (err) {
      console.log(`Error during catch of User's Data -  ${err}`);
    }
  };
  useEffect(() => {
    UserDetails();
  }, []);

  const SocialMediaAPIData = async () => {
    try {
      const res = await fetch("/api/phoneAndEmailAPI", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      setData1(data);

      if (!res === 200) {
        throw new Error(`Error during retreive data - ${Error}`);
      }

      if (!res === 200) {
        throw new Error(`Error during retreive data - ${Error}`);
      }
    } catch (err) {
      console.log(`Error during catch of User's Data -  ${err}`);
    }
  };
  useEffect(() => {
    SocialMediaAPIData();
  }, []);

  const inputHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    if (Data1.length > 0) {
      setUser({
        email: Data1[0].email,
        emergencyNo: Data1[0].emergencyNo,
        loanEnquiryNo: Data1[0].loanEnquiryNo,
        technicalHelpNo: Data1[0].technicalHelpNo,
        fraudComplaintNo: Data1[0].fraudComplaintNo,
        newOffersNo: Data1[0].newOffersNo,

      });
    }
  }, [Data1]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var bodyFormData = new FormData();

    bodyFormData.append("email", user.email);
    bodyFormData.append("emergencyNo", user.emergencyNo);
    bodyFormData.append("loanEnquiryNo", user.loanEnquiryNo);
    bodyFormData.append("technicalHelpNo", user.technicalHelpNo);
    bodyFormData.append("fraudComplaintNo", user.fraudComplaintNo);
    bodyFormData.append("newOffersNo", user.newOffersNo);
  

    try {
      const response = await axios.post(
        "/api/changephoneAndEmail",

        bodyFormData,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Email And Phone No.s Changed Successfully");

      // request successful, refresh the page

      window.location.reload();
    } catch (error) {
      //handle error

      console.log(error);
    }
  };
  if (Data.userType !== "Admin") {
    return <div></div>;
  }

  return (
    <>
      <div
        className="addLocation"
        style={{
          // zIndex: "20",
          width: "100%",
          // margin: "7% auto",
          marginTop: "2rem",
          // position: "absolute",
          textAlign: "left",
        }}
      >
        <div
          className="container"
          style={{ backgroundColor: "#808080", marginTop: "1rem" }}
        >
          <div className="row justify-content-center">
            <div
              className="col-lg-12"
              style={{
                paddingTop: "0.5rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingBottom: "3rem",
                borderRadius: "5px",
              }}
            >
              <h3
                className="text-center"
                style={{ marginBottom: "1rem", color: "white" }}
              >
                Site Email And Phone No.s
              </h3>
              <div
                className="innerDiv container"
                style={{
                  backgroundColor: "white",
                  padding: "4rem 5rem 2rem 1rem",
                  borderRadius: "5px",
                }}
              >
                <div className="row">
                  <div className="col-12 col-lg-3 mt-2 ">
                    <h6 style={{ marginBottom: "2.7rem", fontSize: "1rem" }}>
                       Email  :
                    </h6>
                    <h6 style={{ marginBottom: "2.7rem", fontSize: "1rem" }}>
                     Emergency No.  :
                    </h6>
                    <h6 style={{ marginBottom: "2.7rem", fontSize: "1rem" }}>
                    Loan Enquiry No.  :
                    </h6>
                    <h6 style={{ marginBottom: "2.7rem", fontSize: "1rem" }}>
                      Technical Help No.  :
                    </h6>

                    <h6 style={{ marginBottom: "2.7rem", fontSize: "1rem" }}>
                      Fraud Complaint No.  :
                    </h6>
                    <h6 style={{ marginBottom: "2.7rem", fontSize: "1rem" }}>
                      New Offers No.  :
                    </h6>
                   
                 
                    
                  </div>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="email"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder=""
                      className="form-control mb-4"
                      value={user.email}
                    />

                   <input
                      type="number"
                      name="emergencyNo"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder=""
                      className="form-control mb-4"
                      value={user.emergencyNo}
                    />

                   <input
                      type="number"
                      name="loanEnquiryNo"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder=""
                      className="form-control mb-4"
                      value={user.loanEnquiryNo}
                    />
                    <input
                      type="number"
                      name="technicalHelpNo"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder=""
                      className="form-control mb-4"
                      value={user.technicalHelpNo}
                    />
                    <input
                      type="number"
                      name="fraudComplaintNo"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder=""
                      className="form-control mb-4"
                      value={user.fraudComplaintNo}
                    />

                    <input
                      type="number"
                      name="newOffersNo"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder=""
                      className="form-control mb-4"
                      value={user.newOffersNo}
                    />

                    <br />
                    <button
                      className="btn  me-4"
                      style={{ background: "#4681f4", color: "white" }}
                      onClick={handleSubmit}
                    >
                      {" "}
                      Submit
                    </button>
                    <button
                      className="btn"
                      style={{ background: "#dd7973", color: "white" }}
                      type="reset"
                    >
                      {" "}
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhoneAndEmailAddress;
