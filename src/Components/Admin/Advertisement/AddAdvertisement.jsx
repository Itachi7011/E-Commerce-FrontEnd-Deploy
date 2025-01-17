import { useState } from "react";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Helmet } from "react-helmet";

const AddAdvertisement = () => {
  const navigate = useNavigate();

  const tadsTextAreaRef = useRef(null);

  const [content, setContent] = useState("");
  const [Data, setData] = useState("");
  const [image, setImage] = useState("");

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagsSuggestions, setShowTagsSuggestions] = useState(false);

  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [showSubCategoriesSuggestions, setShowSubCategoriesSuggestions] = useState(false);



  const [user, setUser] = useState({
    sponserName: "",
    phoneNo: "",
    email: "",
    redirectLink: "",
    position: [],
    categories: "",
    prepaymentCharges: "",
    foreclosureCharges: "",
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

  useEffect(() => {
    axios
      .get("/api/tagsList")
      .then((response) => {
        const data = response.data;

        setTags(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/categoriesList")
      .then((response) => {
        const data = response.data;

        setSubCategories(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  const inputHandler = (e) => {

    const { name, value, checked } = e.target;


    if (name === "position") {

      setUser((prevUser) => {

        const positionArray = prevUser.position || []; // Ensure it starts as an array


        // If the checkbox is checked, add the value if it's not already in the array

        if (checked) {

          if (!positionArray.includes(value)) {

            return {

              ...prevUser,

              position: [...positionArray, value],

            };

          }

        } else {

          // If the checkbox is unchecked, remove the value from the array

          return {

            ...prevUser,

            position: positionArray.filter((pos) => pos !== value),

          };

        }

        return prevUser; // Return the previous state if no changes were made

      });

    } else {
      const value = e.target.value;
      setUser({

        ...user,

        [name]: value,

      });


      if (name === "tags") {

        setShowTagsSuggestions(value.trim().length > 0);

      }


      if (name === "subCategories") {

        setShowSubCategoriesSuggestions(value.trim().length > 0);

      }

    }

  };


  const handleTagClick = (tag) => {


    setSelectedTags((prevTags) => [...prevTags, tag.tagName]);

    tadsTextAreaRef.current.focus(); // Focus on the textarea immediately after clicking the tag

    setShowTagsSuggestions(false); // Hide suggestions

  };

  const handleRemoveTag = (tagToRemove) => {

    setSelectedTags((prevTags) => prevTags.filter(tag => tag !== tagToRemove));

  };
  const handleSubCategoryClick = (subCategory, name) => {

    // Check if the clicked name is already selected

    if (!selectedSubCategories.includes(name) && selectedSubCategories.length < 5) {

      setSelectedSubCategories((prevTags) => [...prevTags, name]);

    } else if (selectedSubCategories.length >= 5) {

      alert("You can select a maximum of 5 subcategories.");

    }


    tadsTextAreaRef.current.focus(); // Focus on the textarea immediately after clicking the subcategory

    setShowSubCategoriesSuggestions(false); // Hide suggestions

  };

  const handleRemoveSubCategory = (subCategoryToRemove) => {

    setSelectedSubCategories((prevTags) => prevTags.filter(tag => tag !== subCategoryToRemove));

  };



  const currentTagsValue = user.tags || "";

  const filteredTags = tags.filter(tag =>

    tag.tagName.toLowerCase().includes(currentTagsValue.toLowerCase()) &&

    !selectedTags.includes(tag.tagName)

  );



  const currentSubCategoriesValue = user.subCategories || "";

  const filteredSubCategories = subCategories.filter(subCategory =>

    subCategory.subCategoryName.some(name => {

      const isMatch = name.toLowerCase().includes(currentSubCategoriesValue.toLowerCase());


      return isMatch;

    })

  );


  console.log("Current Position State:", user.position);
  const handleSubmit = async (e) => {

    e.preventDefault();



    var bodyFormData = new FormData();

    bodyFormData.append("sponserName", user.sponserName);
    bodyFormData.append("phoneNo", user.phoneNo);
    bodyFormData.append("email", user.email);
    bodyFormData.append("redirectLink", user.redirectLink);

    user.position.forEach((pos) => {

      bodyFormData.append("position[]", pos); // Use "position[]" to indicate an array

    });



    selectedSubCategories.forEach((subCategory) => {

      bodyFormData.append("subCategories[]", subCategory); // Use "subCategories[]" to indicate an array

    });


    // Append selectedTags as an array

    selectedTags.forEach((tag) => {

      bodyFormData.append("tags[]", tag); // Use "tags[]" to indicate an array

    });


    bodyFormData.append("content", content);
    bodyFormData.append("createdByName", Data.name);
    bodyFormData.append("createdByUserType", Data.userType);
    bodyFormData.append("createdByEmail", Data.email);

    bodyFormData.append("image", image);


    console.log(bodyFormData)


    try {

      const response = await axios.post(

        "/api/AddAdvertisement",

        bodyFormData,


        {

          headers: {

            "Content-Type": "multipart/form-data",
            // "Content-Type": "application/json",

          },

        }

      );
      alert("New Bank Offer added Successfully");


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
      <div className="container" style={{ backgroundColor: "#808080", marginTop: "7rem" }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Advertisement</title>
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <div className="row justify-content-center">
          <div
            className="col-lg-12"
            style={{
              paddingTop: "1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingBottom: "3rem",
              borderRadius: "5px",
            }}
          >
            <h3 className="text-center" style={{ marginBottom: "0.5rem", color: "white", fontSize: "1.5rem" }}>
              Add New Advertisement
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
                  <h6 style={{ marginBottom: "2.9rem", fontSize: "1rem" }}>
                    Sponser Name :
                  </h6>
                  <h6 style={{ marginBottom: "2.9rem", fontSize: "1rem" }}>
                    Phone Number :
                  </h6>
                  <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                    Email :
                  </h6>
                  <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                    Link (To Redirect) :
                  </h6>
                  <h6 style={{ marginBottom: "3.5rem", fontSize: "1rem" }}>
                    Position :
                  </h6>
                  <h6 style={{ marginBottom: "14.6rem", fontSize: "1rem" }}>
                    Tags :
                  </h6>
                  <h6 style={{ marginBottom: "12rem", fontSize: "1rem" }}>
                    Sub-Categories :
                  </h6>

                  <h6 style={{ marginBottom: "4.8rem", fontSize: "1rem" }}>
                    Image :
                  </h6>
                  <h6 style={{ marginBottom: "2.8rem", marginTop: !image ? "0.1rem" : "14rem", fontSize: "1rem" }}>
                    Other Information :
                  </h6>

                </div>
                <div className="col-lg-8">

                  <input
                    type="text"
                    name="sponserName"
                    style={{ fontWeight: "400" }}
                    onChange={inputHandler}
                    placeholder="Please Enter Sponser Name"
                    className="form-control mb-4"
                  />
                  <input
                    type="text"
                    name="phoneNo"
                    style={{ fontWeight: "400" }}
                    onChange={inputHandler}
                    placeholder="Please Enter Sponser's Phone No."
                    className="form-control mb-4"
                  />
                  <input
                    type="text"
                    name="email"
                    style={{ fontWeight: "400" }}
                    onChange={inputHandler}
                    placeholder="Please Enter Sponser's Email"
                    className="form-control mb-4"
                  />
                  <input
                    type="text"
                    name="redirectLink"
                    style={{ fontWeight: "400" }}
                    onChange={inputHandler}
                    placeholder="Please Enter Redirected Link"
                    className="form-control mb-4"
                  />

                  <div className="checkbox-group">

                    <label className="checkbox-option">

                      <input type="checkbox" name="position" value="Top" onChange={inputHandler} />

                      <span className="checkbox-label">Top</span>

                    </label>


                    <label className="checkbox-option">

                      <input type="checkbox" name="position" value="Middle" onChange={inputHandler} />

                      <span className="checkbox-label">Middle</span>

                    </label>


                    <label className="checkbox-option">

                      <input type="checkbox" name="position" value="Bottom" onChange={inputHandler} />

                      <span className="checkbox-label">Bottom</span>

                    </label>

                  </div>


                  {/* Tags Input Fields */}

                  <textarea
                    className="mt-4"
                    aria-label="minimum height"
                    rows={8}
                    style={{ width: "50%", marginRight: "40%" }}
                    onChange={inputHandler}
                    placeholder="Please Type Here To Search Tags"
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    name="tags"
                  />
                  {showTagsSuggestions && filteredTags.length > 0 && (

                    <li style={{ cursor: "pointer", position: "absolute", zIndex: 200, marginTop: "-11rem", marginLeft: "12rem" }}>

                      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>

                        {filteredTags.map((tag) => (

                          <li key={tag._id} onMouseDown={() => handleTagClick(tag)} style={{ cursor: "pointer", color: "white", background: "blue", borderRadius: "5px", padding: "0.2rem", margin: "0.2rem 0" }}>

                            {tag.tagName}

                          </li>

                        ))}

                      </ul>

                    </li>

                  )}

                  <div style={{ marginLeft: "55%", marginTop: "-12rem", marginBottom: "15rem", zIndex: "99999" }} >

                    <h4 style={{ fontSize: "1rem", color: "white", background: "#4E4B51", padding: "0.5rem" }}>Selected Tags (Max: 5 ):</h4>

                    <ul>

                      {selectedTags.length === 0 ? "No Tags Selected Yet ! " : selectedTags.map((tag, index) => (

                        <li key={index} style={{ color: "white", background: "blue", borderRadius: "5px", padding: "0.2rem", marginTop: "0.5rem" }}>{tag}
                          <span

                            onClick={() => handleRemoveTag(tag)}

                            style={{

                              color: "white",
                              marginLeft: "0.4rem",
                              paddingRight: "0.3rem",
                              paddingLeft: "0.3rem",

                              cursor: "pointer",
                              float: "right",

                              fontWeight: "bold",

                              fontSize: "1rem",
                              background: "red"

                            }}

                          >

                            &times; {/* This is the close (X) character */}

                          </span>

                        </li>

                      ))}

                    </ul>

                  </div>


                  {/* Subcategories Input Fields */}


                  <textarea

                    aria-label="minimum height"
                    rows={8}
                    style={{ width: "50%", marginRight: "40%", marginTop: "-5rem" }}
                    onChange={inputHandler}
                    placeholder="Please Type Here To Search Tags"
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    name="subCategories"
                  />


                  {showSubCategoriesSuggestions && filteredSubCategories.length > 0 && (

                    <li style={{ cursor: "pointer", position: "absolute", zIndex: 200, marginTop: "-11rem", marginLeft: "12rem" }}>

                      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>

                        {filteredSubCategories.map((subCategory) => (

                          subCategory.subCategoryName

                            .filter(name => !selectedSubCategories.includes(name)) // Filter out already selected names

                            .map(name => (

                              <li key={name} onMouseDown={() => handleSubCategoryClick(subCategory, name)} style={{ cursor: "pointer", color: "white", background: "blue", borderRadius: "5px", padding: "0.2rem", margin: "0.2rem 0" }}>

                                {name}

                              </li>

                            ))

                        ))}

                      </ul>

                    </li>

                  )}


                  <div style={{ marginLeft: "55%", marginTop: "-12rem", marginBottom: "15rem", zIndex: "99999" }}>

                    <h4 style={{ fontSize: "1rem", color: "white", background: "#4E4B51", padding: "0.5rem" }}>Selected Sub-Categories (Max: 5):</h4>

                    <ul>

                      {selectedSubCategories.length === 0 ? "No Subcategories Selected Yet!" : selectedSubCategories.map((subCategory, index) => (

                        <li key={index} style={{ color: "white", background: "blue", borderRadius: "5px", padding: "0.2rem", marginTop: "0.5rem" }}>{subCategory}

                          <span

                            onClick={() => handleRemoveSubCategory(subCategory)}

                            style={{

                              color: "white",

                              marginLeft: "0.4rem",

                              paddingRight: "0.3rem",

                              paddingLeft: "0.3rem",

                              cursor: "pointer",

                              float: "right",

                              fontWeight: "bold",

                              fontSize: "1rem",

                              background: "red"

                            }}

                          >

                            &times; {/* This is the close (X) character */}

                          </span>

                        </li>

                      ))}

                    </ul>

                  </div>













                  <input
                    type="file"
                    name="logo"
                    style={{ fontWeight: "400", marginTop: "-5rem" }}
                    onChange={(e) => {
                      setImage(e.target.files[0]);

                      console.log(image);
                    }}
                    placeholder=""
                    className="form-control mb-4"
                  />

                  {image && (

                    <div style={{ marginTop: "1rem", position: "relative", display: "inline-block", marginBottom: "1rem" }}>

                      <button

                        onClick={() => setImage("")}

                        style={{

                          position: "absolute",

                          top: "0",

                          right: "0",

                          padding: "0.2rem 0.4rem",

                          color: "white",
                          outline: " 5px solid white",

                          background: "red",

                          fontSize: "1rem",

                          fontWeight: "bolder",

                          border: "none",

                          cursor: "pointer"

                        }}

                      >

                        X

                      </button>

                      <img

                        src={URL.createObjectURL(image)}

                        alt="Uploaded Preview"

                        style={{ width: '300px', height: '200px', borderRadius: '5px' }} // Adjust styles as needed

                      />

                    </div>

                  )}

                  <br />

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
                      marginTop: "1rem",

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
                  <button className="btn btn-primary me-4" onClick={handleSubmit}>
                    {" "}
                    Submit
                  </button>
                  <button className="btn btn-primary" type="reset">
                    {" "}
                    Reset
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdvertisement;
