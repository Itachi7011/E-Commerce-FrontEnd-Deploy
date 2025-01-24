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

  const [content, setContent] = useState("");
  const [Data, setData] = useState("");
  const [arr, setArr] = useState(inputArr);
  const [subItems, setSubItems] = useState([{ name: "", link: "" }]);

  let name, value;
  const [user, setUser] = useState({
    itemName: "",
    itemLink: "",
    itemIcon: "",
    subItems: "",
    createdBy: "",
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

  const inputHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubItemChange = (e, index) => {
    const { name, value } = e.target;

    setSubItems((prevValues) => {
      const newValues = [...prevValues];

      newValues[index] = { ...newValues[index], [name]: value };

      return newValues;
    });
  };

  // const debouncedHandleInputSubItems = (e) => {
  //   const { value } = e.target;
  //   setSubItems([...subItems, value]);
  // };

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

    bodyFormData.append("itemName", user.itemName);
    bodyFormData.append("itemLink", user.itemLink);
    bodyFormData.append("itemIcon", user.itemIcon);
    bodyFormData.append("subItems", JSON.stringify(subItems));

    bodyFormData.append("createdBy", Data.name);

    try {
      const response = await axios.post(
        "/api/addNavbarItems",

        bodyFormData,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("New Tag added Successfully");

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
          // marginLeft: "7%",
          // position: "absolute",
          textAlign: "left",
        }}
      >
        <div
          className="container"
          style={{ backgroundColor: "#808080", marginTop: "7rem" }}
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
                style={{ marginBottom: "1rem", color: "white", fontSize:"1.5rem" }}
              >
                Add New NavBar Item
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
                      Menu Name :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Menu-Link :
                    </h6>

<h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Menu-Icon Class :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Sub-Menus :
                    </h6>
                  </div>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="itemName"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder="Menu Nam"
                      className="form-control mb-4"
                    />
                    <input
                      type="text"
                      name="itemLink"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder="Menu Link"
                      className="form-control mb-4"
                    />
                     <input
                      type="text"
                      name="itemIcon"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder="Only Class Name For Font Awesome Icon"
                      className="form-control mb-4"
                    />

                    <div
                    // style={{ marginLeft: "0.1%" }}
                    >
                      {arr.map((item, i) => {
                        return (
                          <div key={i} className="col-lg-4">
                            <input
                              type="text"
                              style={{ fontWeight: "400", width: "100%" }}
                              placeholder={`${i + 1} - Name (Sub Menu) `}
                              className="form-control mb-4"
                              onChange={(e) => handleSubItemChange(e, i)}
                              name="name" // Change to 'name'
                              value={subItems[i]?.name} // Bind to name
                            />

                            <input
                              type="text"
                              style={{ fontWeight: "400", width: "100%" }}
                              placeholder={`${i + 1} - Link (Sub Menu) `}
                              className="form-control mb-4"
                              onChange={(e) => handleSubItemChange(e, i)}
                              name="link" // Change to 'link'
                              value={subItems[i]?.link} // Bind to link
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

                    {/* <input
                      type="text"
                      name="subItems"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder=""
                      className="form-control mb-4"
                    /> */}

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
