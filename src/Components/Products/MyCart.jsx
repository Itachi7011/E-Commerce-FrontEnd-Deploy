import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';
import FilterSidebar from './FilterComponent';

import axios from "axios";




const MyCart = () => {

    const location = useLocation();
    const navigate = useNavigate();


    const [Profile, setProfile] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const [atBottom, setAtBottom] = useState(false);

    const [isCumulativeRating, setIsCumulativeRating] = useState(false);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [bankOffers, setBankOffers] = useState({ post: [] });
    const [products, setProducts] = useState([]);

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const [formattedName1, setFormattedName] = useState("");


    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(100);

    const [filters, setFilters] = useState({

        isNewProduct: false,

        isPremium: false,

        isLimitedTimeDeal: false,

        isPopular: false,

        rating: 0,

        includeOutOfStock: false,


    });


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


    useEffect(() => {
        axios
            .get("/api/productsList")
            .then((response) => {

                const data = response.data;
                setProducts(data);
            })
            .catch((err) => {
                console.log("Error during Data:", err);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/api/bankOfferList")
            .then((response) => {
                const data = response.data;

                setBankOffers({ post: data });

            })
            .catch((err) => {
                console.log("Error during Data:", err);
            });
    }, []);

    const handleImageClick = (index) => {

        setCurrentImageIndex(index); // Update the current image index

    };

    const getStarColor = (index, rating) => {

        if (index < rating) {

            // If the index is less than the rating, color the star based on the rating

            switch (rating) {

                case 1:

                    return 'darkred'; // 1 star

                case 2:

                    return '#FF6347'; // Light red for 2 stars

                case 3:

                    return '#FFD700'; // Yellow for 3 stars

                case 4:

                    return '#3CB371'; // Light green for 4 stars

                case 5:

                    return 'green'; // Dark green for 5 stars

                default:

                    return 'gray'; // Default color for no stars

            }

        } else {

            // If the index is greater than or equal to the rating, return light gray

            return 'lightgray';

        }

    };

    // const formattedName = searchTerm.replace(/\s+/g, '-').toLowerCase();
    // const formattedName2 = `SearchProduct/search=${formattedName}`

    // setFormattedName(formattedName2); // Update state with the formatted product name

    // console.log(formattedName2);


    const handleMinChange = (e) => {

        const value = Math.min(Number(e.target.value), maxVal); // Ensure min does not exceed max

        setMinVal(value);

    };


    const handleMaxChange = (e) => {

        const value = Math.max(Number(e.target.value), minVal); // Ensure max does not go below min

        setMaxVal(value);

    };

    const indexOfLastItem = currentPage * itemsPerPage;

    const indexOfFirstItem = indexOfLastItem - itemsPerPage;



    const toggleSidebar = () => {

        setIsSidebarVisible(!isSidebarVisible);

    };


    const handleFilterChange = (e) => {

        const { name, checked } = e.target;

        setFilters(prevFilters => ({

            ...prevFilters,

            [name]: checked

        }));

    };


    const handleRatingFilterChange = (rating) => {

        setFilters(prevFilters => {

            // If the rating is already selected, deselect it

            if (prevFilters.rating === rating) {

                return { ...prevFilters, rating: 0 }; // Deselect

            }

            return { ...prevFilters, rating }; // Select new rating

        });

    };

    const toggleCumulativeRating = () => {

        setIsCumulativeRating(prev => {

            const newValue = !prev; // Toggle the value

            console.log("isCumulativeRating : ", newValue); // Log the new value

            return newValue; // Return the new value

        });

    };


    // Filter products based on selected filters

    const filteredProducts = products.filter((product) => {

        // If no filters are selected, return all products

        if (!filters.isNewProduct && !filters.refurbished && !filters.isPremium && !filters.isLimitedTimeDeal && !filters.isPopular && filters.rating === 0 && !filters.includeOutOfStock) {

            return true; // Show all products

        }



        const matchesNewProduct = filters.isNewProduct ? product.newOrRefurbished === "New" : false;

        const matchesRefurbished = filters.refurbished ? product.newOrRefurbished === "Refurbished" : false;

        const matchesPremium = filters.isPremium ? product.isPremium : true;

        const matchesLimitedTimeDeal = filters.isLimitedTimeDeal ? product.isLimitedTimeDeal : true;

        const matchesPopular = filters.isPopular ? product.isPopular : true;

        const matchesRating = !isCumulativeRating

            ? (product.averageRating === undefined || product.averageRating === null || Number(product.averageRating) <= Number(filters.rating))

            : (Number(product.averageRating) === Number(filters.rating));


        // Check stock availability based on the new filter

        const matchesStockAvailability = filters.includeOutOfStock || Number(product.stock_available) > 0;

        // Check if either new or refurbished matches

        const matchesNewOrRefurbished = matchesNewProduct || matchesRefurbished;


        return (

            (matchesNewOrRefurbished || !filters.isNewProduct && !filters.refurbished) &&

            matchesPremium &&

            matchesLimitedTimeDeal &&

            matchesPopular &&

            matchesRating &&

            matchesStockAvailability

        );

    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);


    if (currentPage > totalPages && totalPages > 0) {

        setCurrentPage(1); // Reset to page 1 if current page exceeds total pages

    }

    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {

        setCurrentPage((prevPage) => pageNumber);

        window.scrollTo(0, 0);
    };


    // Function to limit the text to 20 words

    const limitWords = (text, wordLimit) => {

        const words = text.split(/\s+/); // Split by whitespace

        if (words.length <= wordLimit) {

            return text; // Return original text if it's within the limit

        }

        return words.slice(0, wordLimit).join(' ') + '...'; // Join first 20 words and add ellipsis

    };

    const handleScrollToggle = () => {

        if (atBottom) {

            // Scroll to the top of the page

            window.scrollTo({ top: 0, behavior: 'smooth' });

        } else {

            // Scroll to the bottom of the page

            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

        }

    };


    const checkScrollPosition = () => {

        const scrollPosition = window.scrollY + window.innerHeight;

        const documentHeight = document.body.scrollHeight;


        // Check if the user is at the bottom of the page

        setAtBottom(scrollPosition >= documentHeight - 100);

    };

    useEffect(() => {

        window.addEventListener('scroll', checkScrollPosition);

        return () => {

            window.removeEventListener('scroll', checkScrollPosition);

        };

    }, []);

    const handleDelete = (event, id) => {

        if (event && typeof event.preventDefault === 'function') {

            event.preventDefault();

        }
        console.log("id is: ", id)

        const confirmDelete = window.confirm("Are you sure you want to delete this item?");


        if (confirmDelete) {

            axios

                .post("/api/deleteProduct", { id: id })

                .then((response) => {

                    alert("Product Deleted Successfully");
                    // window.location.reload();


                })

                .catch((err) => {

                    console.log("Error during delete selected:", err);

                });

        } else {

            // User canceled the delete action

            console.log("Delete action canceled.");

        }
    };

    const handleAddToCart = (event, id, name) => {

        if (event && typeof event.preventDefault === 'function') {

            event.preventDefault();

        }


        const bodyFormData = new FormData();

        bodyFormData.append("productId", id);
        bodyFormData.append("productName", name);

        bodyFormData.append("userName", Profile.name);

        bodyFormData.append("userEmail", Profile.email);



        axios

            .post("/api/addToCartProduct", bodyFormData, {

                headers: {

                    "Content-Type": "application/json",

                },

            })

            .then((response) => {

                alert(response.data.data);


            })

            .catch((err) => {

                console.log("Error during delete selected:", err);

            });


    };




    const BankOffers = () => {
        return (<>
            <section className="left-side-section"
                style={{
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    background: "#E7E9EA",
                    marginLeft: "0%",
                    marginRight: "0%",
                }}>
                <div className="container">

                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-12">

                            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">

                                <div className="carousel-indicators">

                                    {bankOffers.post.map((offer, index) => (

                                        <button

                                            key={index}

                                            type="button"

                                            data-bs-target="#carouselExampleIndicators"

                                            data-bs-slide-to={index}

                                            className={index === 0 ? "active" : ""}

                                            aria-label={`Slide ${index + 1}`}

                                        ></button>

                                    ))}

                                </div>


                                <div className="carousel-inner" style={{ marginTop: "0rem" }}>

                                    {bankOffers.post.map((offer, index) => (

                                        <div key={index} className={`carousel-item ${index === currentImageIndex ? "active" : ""}`}>

                                            <div className="row justify-content-center" style={{
                                            }} >

                                                <h6
                                                    style={{
                                                        fontSize: "32px",
                                                        fontWeight: "bolder",
                                                        color: "white",
                                                        background: "#367588",
                                                        width: "100%",
                                                        marginLeft: "20%",
                                                        marginRight: "20%",
                                                        marginTop: "0rem",
                                                        textAlign: "center",
                                                        padding: "1rem",
                                                    }}
                                                >{offer.bankName}</h6>

                                                <div className="col-lg-2 col-12">

                                                    <div className="bank-details-check d-flex">

                                                        <img


                                                            src={offer.logo.data}

                                                            className="img-fluid ms-2 mb-3"

                                                            alt={offer.bankName}
                                                            style={{
                                                                width: "8rem",
                                                                height: "8rem",
                                                                color: "black"

                                                            }}

                                                        />

                                                    </div>


                                                </div>

                                                <div className="col-lg-2 col-12 mt-4">

                                                    <h3 style={{ fontSize: "32px" }}>Loan Amount</h3>

                                                    <h6 style={{ fontSize: "24px", color: "black" }} className="loan-amount">₹ {offer.loanAmount}</h6>

                                                </div>

                                                <div className="col-lg-2 col-12 mt-4">

                                                    <h3 style={{ fontSize: "32px" }}>Interest Rate</h3>

                                                    <h6 style={{ fontSize: "24px", color: "black" }} className="">Starts {offer.rateOfInterest}</h6>

                                                </div>

                                                <div className="col-lg-2 col-12 mt-4">

                                                    <h3 style={{ fontSize: "32px" }}>Processing Fees</h3>

                                                    <h6 style={{ fontSize: "24px", color: "black" }} className="">{offer.processingFees}</h6>

                                                </div>

                                                <div className="col-lg-2 col-12 mt-4">

                                                    <h3 style={{ fontSize: "32px" }}>Total Tenure</h3>

                                                    <h6 style={{ fontSize: "24px", color: "black" }}>{offer.tenure}</h6>

                                                </div>

                                                <div className="col-lg-2 col-12 mt-4">

                                                    <button

                                                        className=""

                                                        data-label="CONTACT"

                                                        id="Contact"

                                                        onClick={() => navigate("/home-loan", { state: offer })}
                                                        style={{
                                                            color: "white",
                                                            fontWeight: "bold",
                                                            background: "#355BF5",
                                                            padding: "0.6rem",
                                                            borderRadius: "7px"
                                                        }}

                                                    >

                                                        View Offer

                                                    </button>

                                                </div>

                                            </div>

                                            <hr />

                                        </div>

                                    ))}

                                </div>

                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" style={{ marginTop: "5rem", marginLeft: "-5.5rem" }}>

                                    <span className="carousel-control-prev-icon" aria-hidden="true" ></span>

                                    <span className="visually-hidden">Previous</span>

                                </button>

                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" style={{ marginTop: "5rem", marginRight: "-5.5rem" }}>

                                    <span className="carousel-control-next-icon" aria-hidden="true" ></span>

                                    <span className="visually-hidden">Next</span>

                                </button>

                            </div>

                        </div>



                    </div>

                </div>
            </section>
        </>)
    }

    return (<>
        {/* 
<Helmet>

<title>{formattedName1} </title>

</Helmet> */}

        <button

            style={{

                position: 'fixed',

                left: isSidebarVisible ? "15.5rem" : "0px",

                top: '3.65rem',

                backgroundColor: "rgba(0, 0, 0, 0.8)",

                color: 'white',

                border: 'none',

                borderRadius: '5px',

                padding: '21rem 10px 21rem 10px',

                cursor: 'pointer',

                zIndex: 9999999,

            }}

            onClick={toggleSidebar}

        >

            {isSidebarVisible ? <i className="fa-solid fa-angle-left"></i> : <i className="fa-solid fa-angle-right"></i>}

        </button>

        {isSidebarVisible && (

            <FilterSidebar

                filters={filters}

                handleFilterChange={handleFilterChange}

                handleRatingFilterChange={handleRatingFilterChange}

                minVal={minVal}

                maxVal={maxVal}

                handleMinChange={handleMinChange}

                handleMaxChange={handleMaxChange}

                includeOutOfStock={filters.includeOutOfStock}

                isCumulativeRating={isCumulativeRating}

                toggleCumulativeRating={toggleCumulativeRating}


            />

        )}

        <button

            style={{

                position: 'fixed',

                right: '20px',

                bottom: '12rem',

                backgroundColor: '#007bff',

                color: 'white',

                border: 'none',

                borderRadius: '5px',

                padding: '20px',

                cursor: 'pointer',

                zIndex: 9999999,

            }}

            onClick={handleScrollToggle}

        >

            <i className={atBottom ? "fas fa-arrow-up" : "fas fa-arrow-down"} />

        </button>





        <div className="container productListPage">

            <h2 className="text-center mb-4"
                style={{
                    fontSize: "2rem",
                    fontWeight: "bolder",
                    color: "white",
                    background: "#3A7575",
                    padding: "1rem 5rem",
                    margin: "1rem 15%",
                    borderRadius: "15px"
                }}
            > My Cart List </h2>



            <div className="row">

                {(filteredProducts.length === 0) && (currentItems.length > 0) ? (

                    <div>No Products Match Rating Filter</div>

                ) : (

                    currentItems.filter((data1) => {

                        const matchCart = Profile.cart.some((cartItem) => {
                            return cartItem.productName.toLowerCase() === data1.name.toLowerCase() && cartItem.productId === data1._id;
                        });

                        // Include this item if it matches both the search term and the cart filter
                        return matchCart;

                    }).map((product, index) => (


                        <div className="col-md-4 mb-4" key={`${product.id}-${currentPage}`}>

                            <div className="card shadow-sm" style={{ height: "750px" }}>

                                {product.isPremium === true ? (<span className="badge bg-warning text-dark position-absolute" style={{ top: "10px", left: "10px", zIndex: 1 }}>

                                    Premium

                                </span>) : ""}




                                {product.isPopular === true ? (<span className="badge  position-absolute" style={{ top: "50px", left: "10px", zIndex: 1, background: "#00A86B" }}>

                                    Latest

                                </span>) : ""}





                                <span className="rating-stars position-absolute" style={{ top: "10px", right: "10px", zIndex: 1 }}>

                                    {[...Array(5)].map((_, index) => (

                                        <i key={index} className="fas fa-star" style={{ color: getStarColor(index, parseInt(product.averageRating)), fontSize: "large", }}></i>

                                    ))}
                                </span>



                                <img src={product.images[0].data}
                                    className="card-img-top"
                                    alt={product.name}
                                    style={{
                                        width: "100%",
                                        height: "450px",
                                        objectFit: "cover",
                                        position: "relative",
                                        cursor: "pointer",
                                        padding: "0.2rem",
                                        background: "#F0F8FB"
                                    }}
                                    onClick={function () {
                                        navigate(`/ProductProfile/${product.name}`, {
                                            state: {
                                                _id: product._id,
                                                id: product.id,
                                                name: product.name,
                                            },
                                        });
                                    }}

                                />
                                {product.isPopular === true ? (<span className="badge bg-primary text-white position-absolute" style={{ top: "50px", right: "10px", zIndex: 1 }}>

                                    Sponsored

                                </span>) : ""}

                                {
                                    Number(product.stock_available) === 0 ? <>
                                        <span
                                            style={{
                                                position: "absolute",
                                                textAlign: "center",
                                                bottom: "20.5rem",
                                                width: "100%",
                                                margin: "0.5rem auto",
                                                background: "white",
                                                color: "red",
                                                fontSize: "50px",
                                                fontWeight: "bolder",
                                                padding: "0.2rem 2rem",
                                                zIndex: 1
                                            }}
                                        >  Out Of Stock
                                        </span>

                                    </> : ""
                                }





                                <span
                                    className={product.addToCart.some(item =>

                                        item.userEmail === Profile.email && item.productId === product._id

                                    ) ? "profileListCartIcon2" : "profileListCartIcon1"}
                                    onClick={(event) => handleAddToCart(event, product._id, product.name)}
                                    style={{
                                        position: "absolute",
                                        bottom: "14.5rem"
                                    }}
                                > {Profile.userType === "Admin" ?
                                    (<span>  {product.addToCart.length} </span>) :
                                    ""}   <i className="fas fa-cart-plus"></i> </span>


                                {Profile.userType === "Admin" ? (

                                    <button
                                        className=" btn btn-danger px-3"
                                        onClick={(event) => handleDelete(event, product._id)}
                                        style={{ bottom: "140px", right: "10px", position: "absolute", zIndex: 1 }}>
                                        <i className="fas fa-trash-alt text-white mx-auto"
                                            style={{
                                                fontSize: "1.2rem"
                                            }}
                                        ></i>
                                    </button>

                                ) : ""}

                                <div className="card-body">

                                    <h5 className="card-title ">
                                        <div className="product-title"
                                            style={{
                                                marginBottom: "-0.5rem"
                                            }}

                                            onClick={function () {
                                                navigate(`/ProductProfile/${product.name}`, {
                                                    state: {
                                                        _id: product._id,
                                                        id: product.id,
                                                        name: product.name,
                                                    },
                                                });
                                            }}
                                        > {product.name}


                                        </div>



                                        <br /> <span
                                            style={{
                                                fontSize: "small",
                                                color: "white",
                                                background: product.newOrRefurbished === "New" ? "#1866E1" : "#FF7518",
                                                borderRadius: "5px",
                                                padding: "5px 10px",
                                                marginBottom: "0.5rem"
                                            }}
                                        > {product.newOrRefurbished}
                                        </span> {product.isLimitedTimeDeal === true ? (

                                            <span style={{ position: "relative", display: "inline-block" }}>

                                                <span

                                                    className="ms-1"

                                                    style={{ color: "white", fontSize: "small", background: "#BE1F35 ", padding: "0.2rem 0.4rem", borderRadius: "5px", }}

                                                > Limited Time Deal </span>

                                                {/* Tooltip */}

                                                <span className="tooltip-text">It is a time-limited offer, price will rise soon</span>

                                            </span>

                                        ) : ""}

                                        <span className="rating-stars position-absolute ms-2"
                                            style={{
                                                // top: "50px",
                                                // right: "10px",
                                                zIndex: 1,
                                                background: "#00A86B"
                                            }}>
                                            {product.isNewProduct === true ? (<span className="badge "
                                            >
                                                Popular
                                            </span>) : ""}

                                        </span>

                                    </h5>
                                    <p className="card-text" style={{
                                        marginTop: "1rem", marginBottom: "-0.5rem", cursor: "pointer", color: "#5B5B6C ", fontSize: "1.2rem",

                                    }}>
                                        {product.subCategory} ({product.category})
                                    </p>

                                    <p className="card-text" style={{ marginTop: "1.5rem", cursor: "pointer" }}
                                        onClick={function () {
                                            navigate(`/ProductProfile/${product.name}`, {
                                                state: {
                                                    _id: product._id,
                                                    id: product.id,
                                                    name: product.name,
                                                },
                                            });
                                        }}
                                    >

                                        <strong className="" style={{ fontSize: "xx-large" }}> ₹ {product.effectivePrice}</strong>
                                        &nbsp;
                                        <strong> <del>₹ {product.price}</del> &nbsp; </strong>  <span className="text-danger">(-{product.sellerDiscount + "%" + (product.adminDiscount === 0 ? (" & " + product.adminDiscount + "%") : "")} Off)</span> <br />

                                    </p>

                                    <p className="text-success" style={{ fontSize: "large", marginTop: "-0.5rem", cursor: "pointer" }}
                                        onClick={function () {
                                            navigate(`/ProductProfile/${product.name}`, {
                                                state: {
                                                    _id: product._id,
                                                    id: product.id,
                                                    name: product.name,
                                                },
                                            });
                                        }}
                                    ><i className="fa-solid fa-check"></i> Save ₹ {product.price - (product.effectivePrice - (product.adminDiscount || 0))} </p>

                                    <p className="card-text">

                                        <span>
                                            {Number(product.effectivePrice) >= 500
                                                ?
                                                <span style={{
                                                    color: "black",
                                                    background: "yellow",
                                                    padding: "5px 10px"
                                                }}>
                                                    Free Delivery
                                                </span>

                                                :

                                                <span style={{
                                                    color: "white",
                                                    background: "red",
                                                    padding: "5px 10px"
                                                }}>
                                                    + Delivery Charges
                                                </span>
                                            }
                                        </span>

                                    </p>


                                </div>

                            </div>

                        </div>
                    ))
                )}
            </div>


            {currentItems.length > 0 && (

                <div className="row">

                    {currentItems.map((_, index) => (

                        (index + 1) % 3 === 0 && (

                            <div className="col-12 mb-4" key={`bank-offer-${index}`}>

                                <BankOffers />

                            </div>

                        )

                    ))}

                </div>
            )}


            <div className="pagination">

                <ul>

                    <li>

                        <button onClick={() => paginate(1)}>First</button>

                    </li>

                    <li>

                        {currentPage > 1 ? (

                            <button onClick={() => paginate(currentPage - 1)}>Prev</button>

                        ) : (

                            <button disabled>Prev</button>
                        )}

                    </li>

                    {[...Array(Math.ceil(products.length / itemsPerPage))].map((_, index) => (

                        <li key={index}>

                            <button

                                onClick={() => paginate(index + 1)}

                                className={index + 1 === currentPage ? "active" : ""}

                            >
                                {index + 1}

                            </button>

                        </li>
                        
                    ))}

                    <li>

                        {currentPage < Math.ceil(products.length / itemsPerPage) ? (

                            <button onClick={() => paginate(currentPage + 1)}>Next</button>

                        ) : (

                            <button disabled>Next</button>

                        )}

                    </li>

                    <li>

                        <button onClick={() => paginate(Math.ceil(products.length / itemsPerPage))}>

                            Last

                        </button>

                    </li>

                </ul>

            </div>

        </div>


    </>

    );

};


export default MyCart;