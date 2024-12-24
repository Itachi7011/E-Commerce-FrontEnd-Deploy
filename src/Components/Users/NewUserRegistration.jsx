import { useState, useEffect } from "react";
import axios from "axios";

const RequestNewSavingAccount = () => {
  let name, value;
  const [user, setUser] = useState("");

  const [userImage, setImage1] = useState("");
  const [data, setData] = useState({
    userType: "",
    accountStatus: "",
    email: "",
    name: "",
    gender: "",
    dateOfBirth: "",
    phoneNo: "",
    qualification: "",
    country: "",
    state: "",
    district: "",
    location: "",
    dateOfFormSubmission: "",
    password: "",
    cpassword: "",
  });
  const UserDetails = async () => {
    try {
      const res = await fetch("/api/empProfile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      setUser(data);

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

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var bodyFormData = new FormData();
    bodyFormData.append("userType", data.userType);
    bodyFormData.append("gender", data.gender);

    bodyFormData.append("email", data.email);
    bodyFormData.append("firstName", data.firstName);
    bodyFormData.append("lastName", data.lastName);

    bodyFormData.append("dateOfBirth", data.dateOfBirth);
    bodyFormData.append("phoneNo", data.phoneNo);
    bodyFormData.append("country", data.country);
    bodyFormData.append("state", data.state);
    bodyFormData.append("district", data.district);
    bodyFormData.append("location", data.location);
    bodyFormData.append("dateOfFormSubmission", new Date());

    bodyFormData.append("password", data.password);
    bodyFormData.append("cpassword", data.cpassword);

    bodyFormData.append("userImage", userImage);

    try {
      console.log(bodyFormData);
      await axios.post(
        "/api/newUserRegistration",

        bodyFormData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("New User Added Successfully");

      window.location.reload();
    } catch (error) {
      //handle error

      console.log(error);
    }
  };

  return (
    <>
      <div className="main-body1">
        <div className="nav-btn mt-4">
          <h2
            style={{
              color: "white",
              background: "#367588",
              padding: "1rem",
              borderRadius: "10px",
              margin: "0.5rem 3.5rem",
              marginTop: "-2rem",
              textAlign: "center",
            }}
          >
            {" "}
            New Account Form :{" "}
          </h2>
        </div>
        <div className="registrationForm">
          <form method="POST">
            <div className="mb-3 formDivRegistraion text_input_container">
              {" "}
              <label className="form-label">User Type : </label>
              <select
                onChange={handleInput}
                name="userType"
                className="form formInputRegistraion text_input_forms"
                value={user.userType}
              >
                <option value="">-- Please Select --</option>
                <option value="Customer">Customer</option>
                <option value="Seller">Seller</option>
              </select>
            </div>

            <div className="mb-3 formDivRegistraion text_input_container">
              {" "}
              <label className="form-label">First Name : </label>
              <input
                autoComplete="off"
                onChange={handleInput}
                type="text"
                className="form formInputRegistraion text_input_forms"
                id="exampleFormControlInput1"
                name="firstName"
                placeholder=""
              />
            </div>

            <div className="mb-3 formDivRegistraion text_input_container">
              {" "}
              <label className="form-label">Last Name : </label>
              <input
                autoComplete="off"
                onChange={handleInput}
                type="text"
                className="form formInputRegistraion text_input_forms"
                id="exampleFormControlInput1"
                name="lastName"
                placeholder=""
              />
            </div>
            <div className="mb-3 formDivRegistraion text_input_container">
              {" "}
              <label className="form-label">Email : </label>
              <input
                autoComplete="off"
                onChange={handleInput}
                type="text"
                className="form formInputRegistraion text_input_forms"
                id="exampleFormControlInput1"
                name="email"
                placeholder="Official Email Id only"
              />
            </div>

            {/* Hidden Scale Input Value : */}
            <input
              type="hidden"
              name="accountType"
              value="saving"
              placeholder=""
            />

            {/* Hidden Account Number Input Value : */}
            <input
              type="hidden"
              name="accountNumber"
              value={Number(50)}
              placeholder=""
            />

            {/* Hidden Account Amount Value : */}
            <input type="hidden" name="totalAmount" value="0" placeholder="" />

            <div className="mb-3 formDivRegistraion text_input_container">
              {" "}
              <label className="form-label">Gender : </label>
              <select
                onChange={handleInput}
                name="gender"
                className="form formInputRegistraion text_input_forms"
                value={user.userType}
              >
                <option value="">-- Please Select --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="mb-3 formDivRegistraion text_input_container">
              {" "}
              <label className="form-label">Date Of Birth : </label>
              <input
                autoComplete="off"
                onChange={handleInput}
                type="date"
                className="form formInputRegistraion text_input_forms"
                id="exampleFormControlInput1"
                name="dateOfBirth"
                placeholder=""
              />
            </div>

            <div className="mb-3 formDivRegistraion text_input_container">
              {" "}
              <label className="form-label"> Phone Number : </label>
              <input
                autoComplete="off"
                onChange={handleInput}
                type="number"
                className="form formInputRegistraion text_input_forms"
                id="exampleFormControlInput1"
                name="phoneNo"
                placeholder=""
              />
            </div>

            <div className="mb-3 formDivRegistraion text_input_container">
              {" "}
              <label className="form-label">State : </label>
              <input
                autoComplete="off"
                onChange={handleInput}
                type="text"
                className="form formInputRegistraion text_input_forms"
                id="exampleFormControlInput1"
                name="state"
                placeholder=""
              />
            </div>

            <div className="mb-3 formDivRegistraion text_input_container">
              {" "}
              <label className="form-label">District : </label>
              <input
                autoComplete="off"
                onChange={handleInput}
                type="text"
                className="form formInputRegistraion text_input_forms"
                id="exampleFormControlInput1"
                name="district"
                placeholder=""
              />
            </div>

            <div className="mb-3 formDivRegistraion text_input_container">
              {" "}
              <label className="form-label">Location : </label>
              <input
                autoComplete="off"
                onChange={handleInput}
                type="text"
                className="form formInputRegistraion text_input_forms"
                id="exampleFormControlInput1"
                name="location"
                placeholder=""
              />
            </div>

            <div className="mb-3 formDivRegistraion text_input_container">
              {" "}
              <label className="form-label"> Upload Your Photo : </label>
              <input
                autoComplete="off"
                onChange={(e) => {
                  setImage1(e.target.files[0]);
                }}
                type="file"
                className="form formInputRegistraion text_input_forms"
                id="exampleFormControlInput1"
                name="userImage"
                placeholder=""
              />
            </div>
            {userImage && (
              <img
                src={URL.createObjectURL(userImage)}
                alt="Preview"
                style={{ width: "200px", height: "150px", marginLeft: "5rem" }}
              />
            )}

            <div className="mb-3 formDivRegistraion text_input_container">
              {" "}
              <label className="form-label">Password : </label>
              <input
                autoComplete="off"
                onChange={handleInput}
                type="password"
                className="form formInputRegistraion text_input_forms"
                id="exampleFormControlInput1"
                name="password"
                placeholder="create a strong , unpredectible password"
              />
            </div>

            <div className="mb-3 formDivRegistraion text_input_container">
              {" "}
              <label className="form-label">Confirm Password : </label>
              <input
                autoComplete="off"
                onChange={handleInput}
                type="password"
                className="form formInputRegistraion text_input_forms"
                id="exampleFormControlInput1"
                name="cpassword"
                placeholder=""
              />
            </div>

            <button
              className="btn btn-primary btn-lg m-3"
              style={{ float: "right", fontSize: "large" }}
              onClick={handleSubmit}
            >
              Add Request
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestNewSavingAccount;
