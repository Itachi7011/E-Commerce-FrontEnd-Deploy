import { useState, useEffect } from "react";
import axios from "axios";
// import ReactJsAlert from "reactjs-alert";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../../../App";

// import { ToastContainer, toast } from "react-toastify";
const ShowAllTags = () => {

  const { state } = useContext(UserContext);

  let name, value;
  const navigate = useNavigate();
  // const [UserType, setUserType] = useState("");
  const [Data, setData] = useState({ post: [] });
  const [showAll, setShowAll] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // These 3 are React alert setStates

  const [user, setUser] = useState({
    categoryName: "",
    content: "",
    createdBy: "",
  });
  const [Profile, setProfile] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);
  // const [allItemsSelected, setAllItemsSelected] = useState(false);

  const inputHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleDelete = (event,id) => {
    event.preventDefault(); 

    const confirmDelete = window.confirm("Are you sure you want to delete this item?");


    if (confirmDelete) {

      axios

        .post("/api/deleteCategory", { id: id })

        .then((data) => {
          alert(data.data.data);
        })

        .catch((err) => {
          console.log("Error during delete selected:", err);
        });
    } else {


      console.log("Delete action canceled.");

    }
  };


  const handleDeleteSelected = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");


    if (confirmDelete) {

      axios

        .post("/api/deleteSelectedCategories", { ids: selectedItems })

        .then((data) => {
          alert("Selected Categories Deleted");
        })

        .catch((err) => {
          console.log("Error during delete selected:", err);
        });
    } else {


      console.log("Delete action canceled.");

    }
  };

  const handleSubcategoryDelete = (id, categoryName,
    subCategoryName) => {
    axios

      .post("/api/deleteSubCategory", { id: id, categoryName: categoryName, subCategoryName: subCategoryName })

      .then((data) => {
        alert("SubCategory Deleted");
      })

      .catch((err) => {
        console.log("Error during delete selected:", err);
      });
  };


  useEffect(() => {
    axios
      .get("/api/categoriesList")
      .then((response) => {
        const data = response.data;

        setData({ post: data });
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/userProfile")
      .then(async (response) => {
        const data = await response.data;

        setProfile(data);

        console.log("data fetched successfully");
      })
      .catch((err) => {
        console.log(`Error during catch of setProfile -  ${err}`);
      });
  }, []);

  const handleShowMore = () => {

    showAll === false ? setShowAll(true) : setShowAll(false);

  };

  if (Profile.userType !== "Admin") {
    return <div></div>;
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    setSearchTerm(searchTerm);

    const searchResults = Data.post.filter((item) => {
      return (
        item.cicularTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cicularSubTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setSearchResults(searchResults);
  };

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItems = searchTerm
    ? searchResults.slice(indexOfFirstItem, indexOfLastItem)
    : Data.post.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectChange = (event, id) => {
    const { checked } = event.target;

    if (checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, id]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((itemId) => itemId !== id)
      );
    }
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
            <div className="col-md-12 mt-3" style={{ marginLeft: "2rem" }}>
              <h1
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  color: "white",
                  backgroundColor: "#708090",
                }}
              >
                List Of Categories
              </h1>
              <div className="adminListsSearchBar">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder=" Search by name or email"
                />
              </div>
              <table className="table table-striped table-hover table-bordered">
                <thead style={{ backgroundColor: "#708090", color: "white" }}>
                  <th>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={(event) => handleDeleteSelected()}
                    />
                  </th>
                  <th>S No.</th>
                  <th>Name</th>
                  <th>Details</th>
                  <th>Sub-Categories</th>
                  <th>Created By</th>
                  <th>Date</th>

                  <th>Delete</th>
                </thead>
                {currentItems.map(
                  (
                    { categoryName, content, createdBy, dateOfFormSubmission, subCategoryName, _id },
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

                            <td>{categoryName}</td>

                            <td
                              dangerouslySetInnerHTML={{ __html: content }}
                            ></td>
                            <td><li>
                              <ol>
                                {subCategoryName.slice(0, showAll ? subCategoryName.length : 4).map((item, index) => (

                                  <li key={index}>{item}<span> <button
                                    className=" btn btn-danger px-2"
                                    onClick={() => handleSubcategoryDelete(_id, categoryName, item)}
                                  >
                                    <i className="fas fa-trash-alt text-white mx-auto"></i>
                                  </button> </span></li>

                                ))}

                                {subCategoryName.length > 4 && (



                                  <span onClick={handleShowMore} style={{ color: "white", background: "#0080FF", cursor: "pointer", padding: "0.2rem", borderRadius: "5px" }}> {showAll === false ? "show" : "hide"} +{subCategoryName.length - 4} more</span>

                                )}
                              </ol></li></td>
                            <td>{createdBy}</td>
                            <td>
                              {new Date(
                                new Date(dateOfFormSubmission).getTime() -
                                19800000
                              )
                                .toUTCString()
                                .slice(0, -12)}
                            </td>

                            <td>
                              <button
                                className=" btn btn-danger px-3"
                                onClick={(event) => handleDelete(event,_id)}
                              >
                                <i className="fas fa-trash-alt text-white mx-auto"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </>
                    );
                  }
                )}
              </table>
              <button className="btn btn-danger" onClick={handleDeleteSelected}>
                Delete Selected
              </button>
            </div>
          </div>
        </div>

        <nav aria-label="..." style={{ width: "50%", margin: "1rem auto" }}>
          <ul className="pagination" style={{ cursor: "pointer" }}>
            {Array(Math.ceil(Data.post.length / itemsPerPage))
              .fill(0)

              .map((_, index) => {
                const startIndex = index * itemsPerPage;

                const endIndex = startIndex + itemsPerPage;

                const currentPageItems = Data.post.slice(startIndex, endIndex);

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

export default ShowAllTags;
