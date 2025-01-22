import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

// import { useNavigate } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NewTag = () => {

  // const navigate = useNavigate();

  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [image, setImage] = useState("");
  const [Data, setData] = useState("");
  const [arr, setArr] = useState(inputArr);
  const [speciality, setSpeciality] = useState([]);

  let name, value;
  const [user, setUser] = useState({
    name: "",
    state: "",
    district: "",
    location: "",
    totalShops: "",
    speciality: "",
    additionalComment: "",
    frontPhoto: "",
    createdBy: "",
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

  const handleSubItemChange = (e, index) => {
    const { value } = e.target;

    setSpeciality((prevValues) => {
      const newValues = [...prevValues];

      newValues[index] = value;

      return newValues;
    });
  };

  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var bodyFormData = new FormData();

    bodyFormData.append("name", user.name);
    bodyFormData.append("state", user.state);
    bodyFormData.append("district", user.district);
    bodyFormData.append("location", user.location);
    bodyFormData.append("totalShops", user.totalShops);
    bodyFormData.append("speciality", JSON.stringify(speciality));

    bodyFormData.append("createdBy", Data.name);

    bodyFormData.append("photo", image);

    try {
      const response = await axios.post(
        "/api/addMarkets",

        bodyFormData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("New Tag added Successfully");

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
                style={{ marginBottom: "1rem", color: "white", fontSize: "1.5rem" }}
              >
                Add New Market Data
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
                      State :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      District :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Location :
                    </h6>
                    <h6 style={{ marginBottom: "2.5rem", fontSize: "1rem" }}>
                      Total Shops :
                    </h6>

                    <h6
                      style={{
                        marginBottom: image ? "10rem" : "2.5rem",
                        fontSize: "1rem",
                      }}
                    >
                      Photo :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Speciality :
                    </h6>
                  </div>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="name"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder="Name"
                      className="form-control mb-4"
                    />
                    <input
                      type="text"
                      name="state"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder="State"
                      className="form-control mb-4"
                    />
                    <input
                      type="text"
                      name="district"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder="District"
                      className="form-control mb-4"
                    />
                    <input
                      type="text"
                      name="location"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder="Location"
                      className="form-control mb-4"
                    />
                    <input
                      type="text"
                      name="totalShops"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder="Total Shops"
                      className="form-control mb-4"
                    />

                    <input
                      type="file"
                      name="photo"
                      style={{ fontWeight: "400" }}
                      onChange={(e) => {
                        setImage(e.target.files[0]);

                        console.log(image);
                      }}
                      placeholder=""
                      className="form-control mb-4"
                    />

                    {image && (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        style={{
                          width: "200px",
                          height: "150px",
                          marginLeft: "5rem",
                          marginBottom: "1rem",
                        }}
                      />
                    )}

                    <div
                    // style={{ marginLeft: "0.1%" }}
                    >
                      {arr.map((item, i) => {
                        return (
                          <div key={i} className="col-lg-4">
                            <input
                              type="text"
                              style={{ fontWeight: "400", width: "100%" }}
                              placeholder={`${i + 1} - Speciality `}
                              className="form-control mb-4"
                              onChange={(e) => handleSubItemChange(e, i)}
                              value={speciality[i]} // Bind to type
                            />
                          </div>
                        );
                      })}

                      <br />
                      <div>
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={addInput}
                          style={{
                            marginLeft: "1rem",
                            marginTop: "-3rem",
                            padding: "0rem !important",
                            height: "5px !important",
                            fontSize: "large",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

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

export default NewTag;
