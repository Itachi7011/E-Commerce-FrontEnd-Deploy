import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


const AdminNavbarSettingContent = () => {

  const [Data, setData] = useState("");

  let name, value;
  const [user, setUser] = useState({
    name: "",
    link: "",
    details: "",
    createdByName: "",
    createdByEmail: "",
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

  const inputHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    var bodyFormData = new FormData();

    bodyFormData.append("name", user.name);
    bodyFormData.append("link", user.link);
    bodyFormData.append("details", user.details);
    bodyFormData.append("createdByName", Data.name);
    bodyFormData.append("createdByEmail", Data.email);

    try {
      const response = await axios.post(
        "/api/addNewAdminNavBarSettingsContents",

        bodyFormData,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("New Admin Navbar Setting Content added Successfully");

      window.location.reload();
    } catch (error) {
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
          width: "100%",
          marginTop: "7rem",

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
                style={{ marginBottom: "1rem", color: "white", fontSize: "2rem" }}
              >
                Add New Admin Navbar Setting Content
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
                      Name :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Link :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Details :
                    </h6>

                  </div>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="name"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder="Please Enter Name"
                      className="form-control mb-4"
                    />
                    <input
                      type="text"
                      name="link"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder="Please Enter Link. Ex:     /comments"
                      className="form-control mb-4"
                    />

                    <textarea
                      type="text"
                      name="details"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder="Please Enter Details"
                      className="form-control mb-4"
                    />


                    <br />
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

export default AdminNavbarSettingContent;
