import { useState, useEffect } from "react";
import axios from "axios";
// import ReactJsAlert from "reactjs-alert";
import { useNavigate } from "react-router-dom";

// import { ToastContainer, toast } from "react-toastify";
const LoanEnquiryList = () => {
  let name, value;
  const navigate = useNavigate();
  const [UserType, setUserType] = useState("");
  const [Data, setData] = useState({ post: [] });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // These 3 are React alert setStates

  const [user, setUser] = useState({
    title: "",
    articleContent: "",
    youtubeUrl: "",
    developerName: "",
    projectName: "",
    status: "",
    articleImage: "",
  });
  const [Profile, setProfile] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);
  const [allItemsSelected, setAllItemsSelected] = useState(false);

  const inputHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleDelete = (id) => {
    axios

      .post("/api/deleteNewLoanEnquiries", { id: id })

      .then((data) => {
        // console.log("Selected bank offers deleted:", response.data);

        alert("Saving Loan Enquiries Deleted"); // display success message
        // alert("Selected Articles Deleted Successfully.")
      })
      // .then((data) => {

      // alert("Selected Articles ", data); // display success message

      // })

      .catch((err) => {
        console.log("Error during delete selected:", err);
      });
  };

  

  const handleDeleteSelected = () => {
    axios

      .post("/api/deleteSelectedLoanEnquiries", { ids: selectedItems })

      .then((data) => {
        // console.log("Selected bank offers deleted:", response.data);

        alert("Selected Loan Enquiries Deleted"); // display success message
        // alert("Selected Articles Deleted Successfully.")
      })
      // .then((data) => {

      // alert("Selected Articles ", data); // display success message

      // })

      .catch((err) => {
        console.log("Error during delete selected:", err);
      });
  };
  useEffect(() => {
    axios
      .get("/api/pendingLoanEnquiryList")
      .then((response) => {
        const data = response.data;

        setData({ post: data });
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);
  //   useEffect(() => {
  //     UserDetails();
  //   }, []);

  useEffect(() => {
    axios
      .get("/api/empProfile")
      .then(async (response) => {
        const data = await response.data;

        setProfile(data);

        console.log("data fetched successfully");
      })
      .catch((err) => {
        console.log(`Error during catch of setProfile -  ${err}`);
      });
  }, []);

  if (![1, 2, 3, 4, 5, "1", "2", "3", "4", "5"].includes(Profile.scale)) {
    return (
      <div>
        <h2 style={{ textAlign: "center", width: "70%", margin: "4rem auto" }}>
          Sorry You Are Not Authorised To Visit This Page
        </h2>
      </div>
    );
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    setSearchTerm(searchTerm);

    const searchResults = Data.post.filter((item) => {
      return (
        item.phoneNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase())
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
        style={{ marginTop: "5rem", marginRight: "2rem" }}
      >
        <div className="container-fluid">
          <div className="row justify-content-end">
            <div className="col-md-12" style={{ marginLeft: "2rem" }}>
              <h1
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  color: "white",
                  backgroundColor: "#708090",
                }}
              >
                List Of Pending Loan Enquiries
              </h1>
              <div className="adminListsSearchBar">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder=" Search by Phone No. Or City"
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
                  <th>Loan Amount</th>
                  <th>Phone No.</th>
                  <th>City</th>
                  <th>Submit Date</th>
                  <th>Status</th>
                  
                  <th>Delete</th>
                </thead>
                {currentItems.map(
                  (
                    {
                      loanAmount,
                      phoneNo,
                      city,
                      status,
                      dateOfFormSubmission,
                     
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
                            
                            <td>{loanAmount}</td>
                            <td>{phoneNo}</td>
                            <td>{city}</td>
                            {/* <td>{new Date(dateOfFormSubmission + 'Z').toLocaleString()}</td> */}
                            <td>{dateOfFormSubmission}</td>

                            <td>{status}</td>
                          
                            

                            <td>
                              <button
                                className=" btn btn-danger px-3"
                                onClick={() => handleDelete(_id)}
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

export default LoanEnquiryList;
