import { useState, useEffect } from "react";
import axios from "axios";

import { useContext } from "react";
import { UserContext } from "../../../App";

const ShowAllTags = () => {

  const { state } = useContext(UserContext);

  let name, value;
  const [Data, setData] = useState({ post: [] });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [user, setUser] = useState({
    brandName: "",
    content: "",
    createdBy: "",
  });
  const [Profile, setProfile] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);

  const inputHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleDelete = (event, id) => {
    event.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");


    if (confirmDelete) {

      axios

        .post("/api/deleteBrand", { id: id })

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

        .post("/api/deleteSelectedBrands", { ids: selectedItems })

        .then((data) => {
          alert("Selected Categories Deleted");
        })

        .catch((err) => {
          console.log("Error during delete selected:", err);
        });
    } else {

      // User canceled the delete action

      console.log("Delete action canceled.");

    }
  };



  useEffect(() => {
    axios
      .get("/api/brandsList")
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
                  fontSize: "1.5rem"
                }}
              >
                List Of Brands
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
                  <th>Category</th>
                  <th>Created By</th>
                  <th>Date</th>

                  <th>Delete</th>
                </thead>
                {currentItems.map(
                  (
                    { brandName, content, createdBy, dateOfFormSubmission, categoryName, _id },
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

                            <td>{brandName}</td>

                            <td
                              dangerouslySetInnerHTML={{ __html: content }}
                            ></td>

                            <td>{categoryName}</td>
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
                                onClick={(event) => handleDelete(event, _id)}
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
