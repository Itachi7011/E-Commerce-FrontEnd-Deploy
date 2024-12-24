import { useState, useEffect } from "react";
import axios from "axios";
import ReactJsAlert from "reactjs-alert";
import { useNavigate } from "react-router-dom";


import { useContext } from "react";
import { UserContext } from "../../../App";

const ViewAllAdvertisements = () => {

  const { state } = useContext(UserContext);


  let name, value;
  const navigate = useNavigate();
  const [UserType, setUserType] = useState("");
  const [Localities, setLocalities] = useState({ post: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isEnabled, setIsEnabled] = useState({});

  // These 3 are React alert setStates
  const [status, setStatus] = useState(false);
  const [type, setType] = useState("success");
  const [title, setTitle] = useState("This is a alert");

  const [user, setUser] = useState({
    sponserName: "",
    phoneNo: "",
    email: "",
    position: "",
    subCategories: "",
    tags: "",
    createdByName: "",
    createdByUserType: "",
    dateOfFormSubmission: "",
  });

  const [selectedItems, setSelectedItems] = useState([]);
  const [allItemsSelected, setAllItemsSelected] = useState(false);
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

      setUserType(data);

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
  const inputHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  useEffect(() => {

    axios

      .get("/api/allAdvertisementList")

      .then((response) => {

        const data = response.data;


        // Initialize Localities

        setLocalities({ post: data });


        // Initialize isEnabled state based on the fetched data

        const initialIsEnabled = {};

        data.forEach(item => {

          initialIsEnabled[item._id] = item.isEnable; // Use isEnable from the fetched data

        });

        setIsEnabled(initialIsEnabled); // Set the initial state

      })

      .catch((err) => {

        console.log("Error during Data:", err);

      });

  }, []);
  useEffect(() => {
    UserDetails();
  }, []);

  if (UserType.userType !== "Admin") {
    return <div></div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = Localities.post.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const handleSelectChange = (event, id) => {
    const { checked } = event.target;

    if (id === "all") {
      setAllItemsSelected(checked);

      if (checked) {
        setSelectedItems(
          Localities.post
            .slice(indexOfFirstItem, indexOfLastItem)
            .map((item) => item._id)
        );
      } else {
        setSelectedItems([]);
      }
    } else {
      if (checked) {
        setSelectedItems((prevSelectedItems) => [...prevSelectedItems, id]);
      } else {
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter((itemId) => itemId !== id)
        );
      }
    }
  };

  const handleDelete = (event, id) => {

    event.preventDefault();
    // Ask for confirmation before proceeding with the delete action

    const confirmDelete = window.confirm("Are you sure you want to delete this item?");


    if (confirmDelete) {

      // Proceed with the deletion if confirmed

      axios

        .post("/api/deleteAdvertisement", { id: id })

        .then((response) => {

          alert(response.data.data);

          // Optionally, reload the page or update the UI here

          window.location.reload();

        })

        .catch((err) => {

          console.log("Error during delete selected:", err);

        });

    } else {

      // Log that the delete action was canceled

      console.log("Delete action canceled.");

    }

  };
  const handleDeleteSelected = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");


    if (confirmDelete) {

      axios

        .post("/api/deleteSelectedAdvertisement", { ids: selectedItems })

        .then((response) => {
          console.log("Selected Advertisements deleted:", response.data);

          <ReactJsAlert
            status={true} // true or false
            type="success" // success, warning, error, info
            title="Successfully Deleted" // title you want to display
            Close={() => this.setState({ status: false })} // callback method for hide
          />;

          // You can add any necessary logic here to update the state or reload the data
        })

        .catch((err) => {
          console.log("Error during delete selected:", err);
        });
    } else {


      console.log("Delete action canceled.");

    }
  };
  const truncateString = (str, num) => {

    const words = str.split(' ');

    return words.length <= num ? str : words.slice(0, num).join(' ') + "  ...";

  };


  return (
    <>
      <div
        className="sublocationList"
        style={{

          marginTop: "7rem",

          marginRight: "0rem",

          marginLeft: state.sidebarActive ? "13.3rem" : "4rem",

        }}
      >
        <div className="container-fluid">
          <div className="row justify-content-end">
            <div className="col-md-12">
              <h1
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  color: "white",
                  backgroundColor: "#708090",
                }}
              >
                List Of Advertisement
              </h1>
              <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered" style={{ width: '100%', maxWidth: '100%' }}>
                  <thead style={{ backgroundColor: "#708090", color: "white" }}>
                    <th>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={handleDeleteSelected}
                      />
                    </th>
                    <th>S No.</th>
                    <th>Image</th>
                    <th>Sponser Name</th>
                    <th>Contact Info.</th>
                    <th>Redirected Link</th>
                    <th>Position</th>
                    <th>Sub-Categories</th>
                    <th>Tags</th>
                    <th>Created By</th>

                    <th>Other Info.</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </thead>
                  {currentItems.map(
                    (
                      {
                        sponserName,
                        phoneNo,
                        email,
                        redirectLink,
                        position,
                        subCategories,
                        tags,
                        createdByName,
                        createdByEmail,
                        createdByUserType,
                        dateOfFormSubmission,
                        image,
                        isEnable,
                        content,
                        _id,
                      },
                      index
                    ) => {
                      return (
                        <>
                          <tbody>
                            <tr className="bg-light">
                              <td style={{ paddingLeft: "1rem" }}>
                                <input
                                  style={{ paddingLeft: "1rem" }}
                                  type="checkbox"
                                  className="form-check-input"
                                  value={_id}
                                  onChange={(event) =>
                                    handleSelectChange(event, _id)
                                  }
                                />

                              </td>
                              <td>{indexOfFirstItem + index + 1}</td>
                              <td>
                                <img
                                  src={image.data}
                                  alt="main-img"
                                  style={{ height: "10vh", width: "8vw" }}
                                />
                              </td>
                              <td>{sponserName}</td>
                              <td> <i className="fa-solid fa-phone"></i> {phoneNo} , <br /><i className="fa-solid fa-envelope"></i> {email}</td>
                              <td>{redirectLink}</td>

                              <td>

                                <ol>

                                  {position.map((item, index) => (

                                    <li key={index}>{item}</li>

                                  ))}

                                </ol>

                              </td>
                              <td>

                                <ol>

                                  {subCategories.map((item, index) => (

                                    <li key={index}>{item}</li>

                                  ))}

                                </ol>
                              </td>

                              <td>
                                <ol>

                                  {tags.map((item, index) => (

                                    <li key={index}>{item}</li>

                                  ))}

                                </ol> </td>
                              <td>{createdByName} ({createdByUserType}) - <i className="fa-solid fa-envelope"></i>{createdByEmail} , <br /> [{dateOfFormSubmission}]</td>

                              <td

                                dangerouslySetInnerHTML={{ __html: truncateString(content, 20) }}

                              ></td>
                              <td>

                                <label className="switch">

                                  <input

                                    type="checkbox"

                                    checked={isEnabled[_id] || false}

                                    onChange={async () => {

                                      // Toggle the state locally

                                      const newIsEnabled = !isEnabled[_id]; // Get the new state

                                      setIsEnabled(prevState => ({

                                        ...prevState,

                                        [_id]: newIsEnabled // Toggle the state for the specific advertisement

                                      }));


                                      // Send the API request to update the server

                                      try {

                                        await axios.post("/api/changeIsEnableAdvertise", {

                                          id: _id,

                                          isEnabled: newIsEnabled, // Send the new state

                                        });

                                      } catch (error) {

                                        console.error("Error updating advertisement status:", error);

                                      }

                                    }}

                                  />

                                  <span className="slider round"></span>

                                </label>

                              </td>
                              <td>
                                <form method="POST" action="/deleteSubLocality">

                                  <input
                                    type="hidden"
                                    name="_id"
                                    value={_id}
                                    onChange={inputHandler}
                                  ></input>
                                  <button
                                    type="submit"
                                    className=" btn btn-danger px-3"
                                    onClick={function () {
                                      navigate("/UpdateBankOffer", {
                                        state: {
                                          id: _id,

                                        },
                                      });
                                    }}
                                  >
                                    <i className="fas fa-edit text-white"></i>
                                  </button>
                                </form>
                              </td>
                              <td>
                                <form method="POST" action="/api/deleteBankOffer">
                                  <input
                                    type="hidden"
                                    name="id"
                                    value={_id}
                                    onChange={inputHandler}
                                  ></input>

                                  <button
                                    type="submit"
                                    className=" btn btn-danger px-3"
                                    onClick={() => handleDelete(event, _id)}
                                  >
                                    <i className="fas fa-trash-alt text-white mx-auto"></i>
                                  </button>
                                </form>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      );
                    }
                  )}
                </table></div>
              <button className="btn btn-danger" onClick={handleDeleteSelected}>
                Delete Selected
              </button>
            </div>
          </div>
        </div>

        <nav aria-label="..." style={{ width: "50%", margin: "1rem auto" }}>
          <ul className="pagination" style={{ cursor: "pointer" }}>
            {Array(Math.ceil(Localities.post.length / itemsPerPage))
              .fill(0)

              .map((_, index) => {
                const startIndex = index * itemsPerPage;

                const endIndex = startIndex + itemsPerPage;

                const currentPageItems = Localities.post.slice(
                  startIndex,
                  endIndex
                );

                if (currentPageItems.length > 0) {
                  return (
                    <li className="page-item" key={index}>
                      <button
                        className="page-link"
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  );
                } else {
                  return null;
                }
              })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ViewAllAdvertisements;
