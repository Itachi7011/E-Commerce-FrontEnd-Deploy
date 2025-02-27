import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const NewBrand = () => {

  const [content, setContent] = useState("");
  const [Data, setData] = useState("");
  const [category, setCategory] = useState([]);

  let name, value;
  const [user, setUser] = useState({
    categoryName: "",
    content: "",
    brandName: "",
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

  useEffect(() => {
    axios
      .get("/api/categoriesList")
      .then((response) => {
        const data = response.data;

        setCategory(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  const handleDropdownChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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

    bodyFormData.append("categoryName", user.categoryName);
    bodyFormData.append("brandName", user.brandName);
    bodyFormData.append("createdBy", Data.name);

    bodyFormData.append("content", content);

    try {
      const response = await axios.post(
        "/api/addBrand",

        bodyFormData,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("New Brand added Successfully");

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
                style={{ marginBottom: "1rem", color: "white", fontSize: "1.5rem" }}
              >
                Add New Brand
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
                      Category Name :
                    </h6>
                    <h6 style={{ marginBottom: "2.7rem", fontSize: "1rem" }}>
                      Brand Name :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Details :
                    </h6>

                  </div>
                  <div className="col-lg-8">
                    <select
                      style={{
                        height: "6vh",
                        backgroundColor: "white",
                        borderRadius: "5px",
                        width: "100%",
                        marginBottom: "1.6rem"
                      }}
                      name="categoryName"
                      onChange={handleDropdownChange}
                    // value={user.categoryName}
                    >
                      <option value="">- - - - Please Choose - - - </option>

                      {
                        category.map((item) => {
                          return (<>
                            <option value={item.categoryName}> {item.categoryName} </option>
                          </>)
                        })
                      }

                    </select>

                    <input
                      type="text"
                      name="brandName"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder=""
                      className="form-control mb-4"
                    />
                    <CKEditor
                      config={{
                        height: 800,
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "blockQuote",
                          "link",
                          "numberedList",
                          "bulletedList",
                          "imageUpload",
                          "insertTable",
                          "tableColumn",
                          "tableRow",
                          "mergeTableCells",
                          "mediaEmbed",
                          "|",
                          "undo",
                          "redo",
                        ],
                      }}
                      style={{
                        maxWidth: "100%",
                        height: "800px !important",
                        maxHeight: "800px !important",
                        marginBottom: "1rem",
                      }}
                      editor={ClassicEditor}
                      onReady={(editor) => {
                        editor.editing.view.document.on("change:data", () => {
                          // debouncedHandleInput({
                          //   target: {
                          //     name: "project_specification",
                          //     value: editor.getData(),
                          //   },
                          // });
                        });
                      }}
                      onBlur={(event, editor) => { }}
                      onFocus={(event, editor) => { }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log(data);
                        setContent(data);
                      }}
                      name="content"
                    />


                    <br />
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

export default NewBrand;
