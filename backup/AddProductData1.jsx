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
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState("");

  let name, value;
  const [user, setUser] = useState({
    name: "",
    category: "",
    subCategory: "",
    price: "",
    brand: "",
    model: "",
    size: "",
    color: "",
    weight: "",
    dimensions: "",
    stock_quantity: "",
    youtubeUrl: "",
    status: "",
    tags: "",
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

  useEffect(() => {
    axios
      .get("/api/categoriesList")
      .then((response) => {
        const data = response.data;

        setCategory( data );
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  console.log("category:",category)
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

    setTags((prevValues) => {
      const newValues = [...prevValues];

      newValues[index] = value;

      return newValues;
    });
  };

  const handleDropdownChange = (e) => {
    setData({ ...user, [e.target.name]: e.target.value });
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
    bodyFormData.append("category", user.category);
    bodyFormData.append("subCategory", user.subCategory);
    bodyFormData.append("price", user.price);
    bodyFormData.append("brand", user.brand);
    bodyFormData.append("model", user.model);
    bodyFormData.append("size", user.size);
    bodyFormData.append("color", user.color);
    bodyFormData.append("weight", user.weight);
    bodyFormData.append("dimensions", user.dimensions);
    bodyFormData.append("stock_quantity", user.stock_quantity);
    bodyFormData.append("youtubeUrl", user.youtubeUrl);
    bodyFormData.append("status", user.status);

    bodyFormData.append("tags", JSON.stringify(tags));

    bodyFormData.append("description", description);

    bodyFormData.append(
      "createdBy",
      Data.name + " " + "(" + Data.userType + ")"
    );

    bodyFormData.append("photo", image);

    try {
      const response = await axios.post(
        "/api/addProducts",

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
                Add New Product Data
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
                      Market :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Category :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Price :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Brand :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Model :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Size :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Color :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Weight :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Dimensions :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Stock Available :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Weight :
                    </h6>
                    <h6
                      style={{
                        marginBottom: image ? "10rem" : "2.5rem",
                        fontSize: "1rem",
                      }}
                    >
                      Photo :
                    </h6>
                    <h6 style={{ marginBottom: "5.8rem", fontSize: "1rem" }}>
                      Details :
                    </h6>
                    <h6 style={{ marginBottom: "3.8rem", fontSize: "1rem" }}>
                      Tags :
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
                      name="market"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder="State"
                      className="form-control mb-4"
                    />

                    <select
                      style={{
                        height: "5.3vh",
                        backgroundColor: "white",
                        borderRadius: "5px",
                        width: "100%",
                      }}
                      name="category"
                      className="form-control mb-4"
                      onChange={handleDropdownChange}
                      value={user.category}
                    >
                      {
                        category.map((item)=>{
                          return(<>
                          <option value={item.categoryName}> {item.categoryName} </option>
                          </>)
                        })
                      }
                      
                    </select>

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
                        setDescription(data);
                      }}
                      name="description"
                    />

                    <div
                    // style={{ marginLeft: "0.1%" }}
                    >
                      {arr.map((item, i) => {
                        return (
                          <div key={i} className="col-lg-4">
                            <input
                              type="text"
                              style={{ fontWeight: "400", width: "100%", marginTop:"2rem" }}
                              placeholder={`${i + 1} - Tags `}
                              className="form-control mb-4"
                              onChange={(e) => handleSubItemChange(e, i)}
                              value={tags[i]} // Bind to type
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
                            fontSize: "larger",
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
