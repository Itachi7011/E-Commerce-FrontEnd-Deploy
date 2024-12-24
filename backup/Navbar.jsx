// import { UserContext } from "../App";
// import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Navbar = () => {

  const navigate = useNavigate();

  // const { state, dispatch } = useContext(UserContext);

  const [user, setUser] = useState("");
  const [Data, setData] = useState({ post: [] });

  const [category, setCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [data1, setData1] = useState("");


  const [searchTerm, setSearchTerm] = useState('');
  const [productsData, setProductsData] = useState([]);



  useEffect(() => {
    axios
      .get("/api/userProfile")
      .then(async (response) => {
        const data = await response.data;

        setUser(data);

        console.log("data fetched successfully");
      })
      .catch((err) => {
        console.log(`Error during catch of setProfile -  ${err}`);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/navbarItemsList")
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
      .get("/api/productsList")
      .then((response) => {
        const data = response.data;

        setProductsData(data);
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

        setCategory(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);
  const handleSearchChange = (e) => {

    setSearchTerm(e.target.value);

  };


  useEffect(() => {

    // Add event listeners for clicks and key presses


    document.addEventListener('keydown', handleEscKey);


    // Cleanup event listeners on component unmount

    return () => {


      document.removeEventListener('keydown', handleEscKey);

    };

  }, []);

  const handleEscKey = (event) => {

    if (event.key === 'Escape') {

      setSearchTerm(''); // Clear the search term to hide results

    }

  };


  useEffect(() => {

    // Add event listeners for clicks and key presses


    document.addEventListener('keydown', handleEscKey);


    // Cleanup event listeners on component unmount

    return () => {


      document.removeEventListener('keydown', handleEscKey);

    };

  }, []);

  const handleDropdownChange = (e) => {

    const { name, value } = e.target;

    if (name === "subCategory") {

      setSelectedSubCategory(value);

    }

    setUser({ ...user, [name]: value });

  };

  const filterResults = () => {

    if (!searchTerm) return []; // Return an empty array if search term is empty


    // Filter results based on selected subcategory and search term

    const productResults = productsData.filter(item => {

      const matchesSubCategory = selectedSubCategory === "" || item.subCategory === selectedSubCategory;

      const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSubCategory && matchesSearchTerm;

    });


    return productResults; // Return filtered results

  };



  if (user.userType === "Admin") {
    return ""
  }

  return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-logo">
          <i className="fas fa-bullhorn flip-horizontal ps-2"></i> Weekly Market{" "}
          <i className="fas fa-bullhorn ps-2"></i>
        </a>

        {/* Search Bar Code */}

        <div className="search-bar">



          <input

            type="text"

            placeholder="Search Products ..."

            value={searchTerm}

            onChange={handleSearchChange}
            style={{
              marginLeft: "2px",
              height: "4.5vh",
              marginRight: "-3rem",
              paddingLeft: "10rem",
              paddingRight: "4rem",
              width: "35rem"
            }}

          />
          <select

            style={{

              height: "4.5vh",

              marginLeft: "-32rem",

              borderRadius: "6px 0 0 6px",

              padding: "0rem 0.5rem",

              zIndex: 1,

              background: "#ECEFE3"

            }}

            name="subCategory" // Ensure the name matches

            value={selectedSubCategory} // Set the value to the selected subcategory

            onChange={handleDropdownChange}

          >

            <option value=""> All Categories </option>

            {

              category.map((cat, index) => (

                cat.subCategoryName.map((subCat, subIndex) => (

                  <option key={`${index}-${subIndex}`} value={subCat}>{subCat}</option>

                ))

              ))

            }

          </select>

          <i className="fas fa-search me-2"
            style={{
              background: "orange",
              marginLeft: "22.4rem",
              padding: "0.5rem 1.1rem",
              cursor: "pointer",
              borderRadius: "0 6px 6px 0"
            }}
            onClick={function () {
              // const formattedSearchTerm =  searchTerm.replace(/\s+/g, '-').toLowerCase();
              // console.log(formattedSearchTerm)

              navigate(`/ProductList/search="${searchTerm}"`, {
                state: {
                  searchTerm: searchTerm,

                },
              });
            }}            
            ></i>

        </div>

        <div className={`admin-sidebar-search-results ${searchTerm && filterResults().length > 0 ? 'show' : ''}`} style={{ marginRight: "11rem" }}>


          {searchTerm && (

            <div className="admin-sidebar-search-results-list d-flex justify-content-between">

              <div className="product-search-results" style={{ flex: 1, marginLeft: '10px', }}>

                <h4 style={{ fontSize: "1.2rem", paddingTop: "0.8rem", paddingLeft: "1.8rem" }}>Product Search Results:</h4>
                <hr />
                {filterResults().map((item, index) => (

                  <div key={index} className="search-result-item">

                    <a onClick={function () {
                      navigate(`/ProductProfile/${item.name}`, {
                        state: {
                          _id: item._id,
                          id: item.id,
                          name: item.name,
                        },
                      });
                      setSearchTerm("");
                    }} className="nav1-item">

                      <h4 className="nav1-item-name">

                        <i className="fas fa-search me-2"></i>

                        <span style={{ fontWeight: "bolder" }}> {item.name} &nbsp; </span>  ( {item.subCategory} )

                      </h4>

                    </a>

                  </div>

                ))}

              </div>

            </div>

          )}

        </div>


        <ul className="navbar-links">
          <li className="navbar-dropdown">
            <a href="/">
              <i className="fas fa-user me-1"></i>{user.firstName}
            </a>
          </li>

          {Data.post.map(
            ({ itemName, link, itemIcon, subItems }) => {
              return (
                <>
                  <li className="navbar-dropdown">
                    <a href={link}>
                      <i className={itemIcon}></i>
                      {itemName}
                    </a>
                    <div className="dropdown">
                      {subItems.map((item) => {
                        return (
                          <>
                            <a href={item.link}>{item.name}</a>
                          </>
                        );
                      })}
                    </div>
                  </li>
                </>
              );
            }
          )}


          {!user ? (
            <li className="navbar-dropdown">
              <a href="#">
                <i className="fas fa-user me-1"></i>User
              </a>
              <div className="dropdown">
                <a href="/Login">
                  <i className="fas fa-sign-in-alt me-2"></i>Login
                </a>
                <a href="/NewUserRegistration">
                  <i className="fas fa-user-plus me-2"></i>Signup
                </a>
              </div>
            </li>
          ) : (
            <>

              <li className="navbar-dropdown">
                <a href="#">
                  <i className="fas fa-shopping-cart me-1"></i>
                  Cart <span style={{ color: user.cart.length === 0 ? "red" : "green" }}> ({user.cart.length}) </span>
                </a>
              </li>
              <li className="navbar-dropdown">
                <a href="/api/logout">
                  <i className="fas fa-sign-out-alt me-1"></i>Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
