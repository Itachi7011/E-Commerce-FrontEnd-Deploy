import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import debounce from "lodash/debounce";
import Carousel from "react-multi-carousel";

import { Helmet } from 'react-helmet';

import axios from "axios";


const ProductProfile = () => {


    const location = useLocation();

    // const previousData = location.state._id;
    // const previousId = location.state.id;



    const advertisementCloseButtonRef = useRef(null);

    const bankOffersRef = useRef(null);
    const specificationRef = useRef(null);
    const technicalDetailsRef = useRef(null);
    const otherDetailsRef = useRef(null);
    const warrantyDetailsRef = useRef(null);
    const ReviewSectionRef = useRef(null);
    const SimilarProductsRef = useRef(null);

    const navigate = useNavigate();

    const [Data, setData] = useState({ post: [] });

    const [selectedRating, setSelectedRating] = useState(null);

    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const [refreshReviews, setRefreshReviews] = useState(false);

    const [selectedStars, setSelectedStars] = useState({});
    // const [clickedIcons, setClickedIcons] = useState({});

    const [atBottom, setAtBottom] = useState(false);

    const [title, setTitle] = useState("");
    const [answer, setAnswer] = useState("");

    const [formattedName1, setFormattedName] = useState("");

    const [likedComments, setLikedComments] = useState({});
    const [dislikedComments, setDislikedComments] = useState({});

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const [visibleOffers, setVisibleOffers] = useState(2);

    const [user1, setUser1] = useState("");

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [bankOffers, setBankOffers] = useState({ post: [] });
    const [Advertisement, setAdvertisement] = useState({ post: [] });

    const [advertisementVisible, setAdvertisementVisible] = useState(false);

    const [showCloseButton, setShowCloseButton] = useState(false);

    const [previousData, setPreviousData] = useState(null);

    const [previousId, setPreviousId] = useState(null);
    const [isPopular, setIsPopular] = useState(false);
    const [isNewProduct, setIsNewProduct] = useState(false);
    const [isPremium, setIsPremium] = useState(false);
    const [isLimitedTimeDeal, setIsLimitedTimeDeal] = useState(false);

    useEffect(() => {

        // Check if location.state is available

        if (location.state) {

            // Store the data in sessionStorage

            sessionStorage.setItem('productData', JSON.stringify(location.state));

            setPreviousData(location.state._id);

            setPreviousId(location.state.id);

        } else {

            // Retrieve data from sessionStorage if location.state is not available

            const storedData = sessionStorage.getItem('productData');

            if (storedData) {

                const parsedData = JSON.parse(storedData);

                setPreviousData(parsedData._id);

                setPreviousId(parsedData.id);

            }

        }

    }, [location.state]);

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

    const adjustDate = (date) => {



        // Step 1: Create a Date object

        const dateObj = new Date(date);




        // Step 2: Add 5 hours and 30 minutes

        dateObj.setHours(dateObj.getHours() - 12);

        dateObj.setMinutes(dateObj.getMinutes());





        // Step 3: Format the date to a string without the timezone part

        const dateStr1 = dateObj.toString().replace(/GMT[^\s]*/, "");

        const dateStr = dateStr1.replace("India Standard Time", "IST")
        // Step 4: Return the adjusted date as a string

        return dateStr; // or use dateObj.toLocaleString() for a different format

    };



    const Profile = async () => {
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

            setUser1(data);

            if (!res === 200) {
                throw new Error(`Error during retreive data - ${Error}`);
            }
        } catch (err) {
            console.log(`Error during catch of CustomerSavingAccountsProfile -  ${err}`);
        }
    };

    useEffect(() => {
        Profile();
    }, []);


    useEffect(() => {
        axios
            .get("/api/productsList")
            .then((response) => {
                const data = response.data;

                setData({ post: data });

                console.log("data fetch successfully");
            })
            .catch((err) => {
                console.log("Error during Data:", err);
            });
    }, [ReviewSectionRef]);



    const printImage = (content) => {
        const printWindow = window.open("", "", "width=800,height=600");

        const imgTag = `<img src="${content}" />`; // assume content is the image URL

        printWindow.document.write(imgTag);

        printWindow.document.close();

        printWindow.print();
    };

    const debouncedOnChange1 = debounce((event, editor) => {
        const data = editor.getData();

        setAnswer(data);
    }, 1);

    useEffect(() => {
        axios
            .get("/api/bankOfferList")
            .then((response) => {
                const data = response.data;

                setBankOffers({ post: data });

                setSearchResults(data);
            })
            .catch((err) => {
                console.log("Error during Data:", err);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/api/allAdvertisementList")
            .then((response) => {
                const data = response.data;

                setAdvertisement({ post: data });

            })
            .catch((err) => {
                console.log("Error during Data:", err);
            });
    }, []);

    const useScrollIntoView = (ref, options = {}) => {
        const {
            behavior = "smooth",
            block = "center",
            inline = "nearest",
        } = options;

        const handleClick = () => {
            ref.current.scrollIntoView({ behavior, block, inline });
        };

        useEffect(() => {
            if (ref.current) {
                ref.current.scrollIntoView({ behavior, block, inline });
            }
        }, [ref]);

        return handleClick;
    };



    useEffect(() => {

        const timer = setTimeout(() => {
            setAdvertisementVisible(true);



        }, 5000); // 5 seconds


        return () => clearTimeout(timer);

    }, []);


    useEffect(() => {

        const timer = setTimeout(() => {


            setShowCloseButton(true);

        }, 10000); // 5 seconds


        return () => clearTimeout(timer);

    }, []);



    useEffect(() => {

        // Update the URL to include the product name for better SEO


        // Find the product that matches the previous data, ignoring case and whitespace

        const filteredProduct = Data.post.find(product => {

            const productIdLower = product._id.toLowerCase();

            const previousDataLower = previousData.toLowerCase().trim();




            // Log the comparison for debugging

            console.log(`Comparing Product ID: "${productIdLower}" with Previous Data: "${previousDataLower}"`);


            return productIdLower.includes(previousDataLower);

        });


        console.log("filtered product: ", filteredProduct)

        if (filteredProduct) {

            console.log("Found Product:", filteredProduct); // Debugging output for the found product


            // Format the product name to be URL-friendly

            const formattedName = filteredProduct.name

                .replace(/\s+/g, '-') // Replace spaces with hyphens

                .toLowerCase(); // Convert to lowercase


            setFormattedName(formattedName); // Update state with the formatted product name


            console.log(formattedName);


            // Update the browser's URL to reflect the product name

            window.history.replaceState(null, '', `/ProductProfile/${formattedName}`);

        } else {

            console.log("No matching product found for previousData:", previousData);

        }

    }, [Data.post, previousData]);





    const handleImageClick = (index) => {

        setCurrentImageIndex(index); // Update the current image index

    };


    const openModal = (product) => {

        if (user1) {

            // User is logged in, open the rating modal

            setIsModalOpen(true);
            setCurrentProduct(product);

            setTimeout(() => {

                const modalElement = document.querySelector('.modal');

                if (modalElement) {

                    modalElement.style.display = 'block';

                    modalElement.offsetHeight; // Trigger reflow

                }

            }, 0);


        } else {

            // User is not logged in, show a message or redirect

            const userConfirmed = window.confirm("You must be logged in to add a rating. Would you like to go to the login page?");

            if (userConfirmed) {

                // User clicked "OK", redirect to login page

                navigate("/Login");

            }

        }


    };


    const closeModal = () => {

        setIsModalOpen(false);

        setSelectedStars({});

    };

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
            slidesToSlide: 1, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 1, // optional, default to 1.
        },
    };



    const handleDelete = (event, id) => {
        event.preventDefault();
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
        event.preventDefault();


        const bodyFormData = new FormData();

        bodyFormData.append("productId", id);
        bodyFormData.append("productName", name);

        bodyFormData.append("userName", user1.name);

        bodyFormData.append("userEmail", user1.email);



        axios

            .post("/api/addToCartProduct", bodyFormData, {

                headers: {

                    "Content-Type": "application/json",

                },

            })

            .then((response) => {

                alert(response.data.data);
                // window.location.reload();


            })

            .catch((err) => {

                console.log("Error during delete selected:", err);

            });


    };

    const saveRating = () => {

        if (currentProduct) {

            const { _id, name } = currentProduct;

            const rating = selectedStars[_id]?.length || 0;

            const comment = answer;


            const bodyFormData = new FormData();

            bodyFormData.append("id", _id);

            bodyFormData.append("userName", user1.name);

            bodyFormData.append("userEmail", user1.email);

            bodyFormData.append("title", title);

            bodyFormData.append("rating", rating);

            bodyFormData.append("comment", answer);


            axios.post("/api/productRating", bodyFormData, {

                headers: {

                    "Content-Type": "application/json",

                },

            })

                .then(response => {

                    console.log(response);

                    // Create a new review object based on the response

                    const newReview = {

                        rating: rating,

                        userName: user1.name,

                        comment: answer,

                        title: title,
                        likes: ["0"],
                        disLikes: ["0"],

                        // Add any other fields you need from the response

                    };


                    // Update the reviews state immediately

                    setData(prevData => {

                        const updatedReviews = prevData.post.map(product => {

                            if (product._id === _id) {

                                return {

                                    ...product,

                                    reviews: [...product.reviews, newReview], // Add the new review

                                };

                            }

                            return product;

                        });

                        return { post: updatedReviews };

                    });


                    closeModal(); // Close modal after saving

                })

                .catch(err => console.error("Error saving rating:", err));

        }

    };

    useEffect(() => {

        if (refreshReviews) {

            axios.get(`/api/productRating/${previousData}`)

                .then(response => {

                    const data = response.data;

                    setData(data);

                })

                .catch(err => console.error("Error fetching ratings:", err));

            setRefreshReviews(false);

        }

    }, [refreshReviews, previousData]);

    const filteredAds = Advertisement.post.filter(ad =>

        ad.isEnable &&

        Data.post.some(product =>

            product.tags.some(tag => ad.tags.includes(tag))

        )

    );
    const adImageSrc = filteredAds.length > 0 ? filteredAds[0].image.data : null;

    const redirectLink = filteredAds.length > 0 ? filteredAds[0].redirectLink : "#"; // Replace with appropriate fallback if needed

    const sponsorName = filteredAds.length > 0 ? filteredAds[0].sponserName : "Sponsor"; // Replace with appropriate fallback if needed

    const content = filteredAds.length > 0 ? filteredAds[0].content : "Content goes here"; // Replace with appropriate fallback if needed

    const handleIconClick = (e, id, name, rating) => {
        e.preventDefault();

        // Update the selected stars state without sending data to the backend
        const newSelectedStars = Array.from({ length: rating }, (_, i) => i + 1);

        setSelectedStars({
            ...selectedStars,
            [id]: newSelectedStars,
        });
    };

    const handleLikeCommentClick = (id, commentId) => {

        // Check if the comment is already liked

        const isLiked = likedComments[commentId];



        // If the comment is already disliked, deactivate the dislike

        if (dislikedComments[commentId]) {

            setDislikedComments((prev) => ({ ...prev, [commentId]: false }));

        }


        // Toggle like state

        const newLikedState = !isLiked; // Toggle like state

        setLikedComments((prev) => ({

            ...prev,

            [commentId]: newLikedState, // Update the like state

        }));


        // If the comment was already liked, deactivate it

        if (isLiked) {

            // If already liked, we don't send the request to the server

            return;

        }


        const bodyFormData = new FormData();

        bodyFormData.append("id", id);

        bodyFormData.append("userName", user1.name);

        bodyFormData.append("userEmail", user1.email);

        bodyFormData.append("commentId", commentId);


        axios.post("/api/likedComment", bodyFormData, {

            headers: {

                "Content-Type": "application/json",

            },

        }).then(response => {

            console.log(response);

        }).catch(err => console.error("Error saving liked comment:", err));

    };


    const handleDislikeCommentClick = (id, commentId) => {

        // Check if the comment is already disliked

        const isDisliked = dislikedComments[commentId];


        // If the comment is already liked, deactivate the like

        if (likedComments[commentId]) {

            setLikedComments((prev) => ({ ...prev, [commentId]: false }));

        }


        // Toggle dislike state

        const newDislikedState = !isDisliked; // Toggle dislike state

        setDislikedComments((prev) => ({

            ...prev,

            [commentId]: newDislikedState, // Update the dislike state

        }));


        // If the comment was already disliked, deactivate it

        if (isDisliked) {

            // If already disliked, we don't send the request to the server

            return;

        }


        const bodyFormData = new FormData();

        bodyFormData.append("id", id);

        bodyFormData.append("userName", user1.name);

        bodyFormData.append("userEmail", user1.email);

        bodyFormData.append("commentId", commentId);


        axios.post("/api/dislikedComment", bodyFormData, {

            headers: {

                "Content-Type": "application/json",

            },

        }).then(response => {

            console.log(response);

        }).catch(err => console.error("Error saving disliked comment:", err));

    };

    const handleBankOffersClick = useScrollIntoView(bankOffersRef);
    const handleSpecificationClick = useScrollIntoView(specificationRef);
    const handleAadharClick = useScrollIntoView(technicalDetailsRef);
    const handlePancardClick = useScrollIntoView(otherDetailsRef);
    const handlevoteridcardClick = useScrollIntoView(warrantyDetailsRef);
    const handleReviewSectionClick = useScrollIntoView(ReviewSectionRef);
    const handleSimilarProductsClick = useScrollIntoView(SimilarProductsRef);


    const handleSearch = (e) => {
        const searchTerm = e.target.value;

        setSearchTerm(searchTerm);

        if (!searchTerm) {
            setSearchResults(bankOffers.post)
        } else {
            const searchResults = bankOffers.post.filter((item) => {
                return (
                    item.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.rateOfInterest.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.otherInformation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.loanAmount.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });

            setSearchResults(searchResults);
        }


    };

    const buttonStyle = {

        backgroundColor: '#4CAF50', // Green background

        color: 'white', // White text

        border: 'none', // No border

        borderRadius: '25px', // Rounded corners

        padding: '15px 30px', // Padding

        fontSize: '16px', // Font size

        fontWeight: 'bold', // Bold text

        textTransform: 'uppercase', // Uppercase text

        cursor: 'pointer', // Pointer cursor on hover

        transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease', // Transition effects

        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Shadow effect

        outline: 'none', // Remove outline

    };


    const hoverStyle = {

        backgroundColor: '#45a049', // Darker green on hover

        transform: 'translateY(-3px)', // Lift effect

        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)', // Deeper shadow on hover

    };


    const activeStyle = {

        transform: 'translateY(1px)', // Pressed effect

        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Shadow returns to normal

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


    return (
        <>

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
            {Data.post
                .filter((field) => {
                    if (field._id.includes(previousData)) {
                        return field;
                    }
                })
                .map(
                    ({
                        _id,
                        name,
                        category,
                        subCategory,
                        marketName,
                        newOrRefurbished,
                        isPopular,
                        reviews,
                        isNewProduct,
                        isPremium,
                        isLimitedTimeDeal,
                        price,
                        effectivePrice,
                        brand,
                        model,
                        color,
                        weight,
                        dimensions,
                        stockNextRefillDate,
                        sellerDiscount,
                        adminDiscount,
                        stock_available,
                        tags,
                        images,
                        averageRating,
                        youtubeUrl,
                        productDetails,
                        addToCart,
                        warrantyDetails,
                        technicalDetails,
                        rating,
                        comments,
                        freqAskedQuest,
                        totalSold,
                        totalCart,
                        createdByName,
                        createdByType,
                        dateOfFormSubmission,



                    }) => {
                        return (
                            <>

                                <Helmet>

                                    <title>{formattedName1} </title>

                                </Helmet>

                                {/* Your existing component code */}


                                {


                                    isModalOpen && (

                                        <div className={`modal ${isModalOpen ? 'show' : ''}`} tabIndex="1" role="dialog" style={{ display: 'block', zIndex: 1050 }}>

                                            <div className="modal-dialog modal-dialog-centered" role="document">

                                                <div className="modal-content">

                                                    <div className="modal-header">

                                                        <h5 className="modal-title">Enter Rating For {currentProduct?.name}</h5>

                                                        <button type="button" className="close" onClick={closeModal}>

                                                            <span aria-hidden="true">&times;</span>

                                                        </button>

                                                    </div>

                                                    <div className="modal-body">

                                                        <h6>Rating</h6>

                                                        <div className="rating-stars" style={{ paddingLeft: "30%" }}>

                                                            {Array.from({ length: 5 }, (_, i) => (

                                                                <i

                                                                    key={i}

                                                                    className={`fas fa-star rating-icon ${selectedStars[currentProduct?._id]?.includes(i + 1) ? "yellow" : "gray"}`}

                                                                    onClick={(e) => handleIconClick(e, currentProduct._id, currentProduct.name, i + 1)}

                                                                    style={{ marginLeft: "2rem", fontSize: 'larger', paddingTop: "1rem", paddingBottom: "1rem" }}
                                                                />

                                                            ))}

                                                        </div>
                                                        <div
                                                            className="innerDiv container"
                                                            style={{
                                                                backgroundColor: "white",
                                                                // padding: "4rem 5rem 2rem 1rem",
                                                                borderRadius: "5px",
                                                            }}
                                                        >
                                                            <div className="row">
                                                                <div className="col-12 col-lg-2  ">

                                                                    <h6
                                                                        style={{
                                                                            marginBottom: "2.2rem",
                                                                            fontSize: "1rem",
                                                                        }}
                                                                    >
                                                                        Title
                                                                    </h6>

                                                                    <h6
                                                                        style={{
                                                                            marginBottom: "1.3rem",
                                                                            fontSize: "1rem",
                                                                        }}
                                                                    >
                                                                        Comment
                                                                    </h6>
                                                                </div>
                                                                <div className="col-lg-10">
                                                                    <h6 className="ps-1">
                                                                        <input
                                                                            type="text"
                                                                            name="quetion"
                                                                            onChange={(e) => {
                                                                                setTitle(e.target.value);
                                                                            }}
                                                                            style={{
                                                                                height: "4vh",
                                                                                width: "100%",
                                                                            }}
                                                                        />
                                                                    </h6>
                                                                    <h6 className="ps-1">
                                                                        <CKEditor
                                                                            config={{
                                                                                height: 600,
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
                                                                                height: "800px",
                                                                                marginBottom: "1rem",
                                                                            }}
                                                                            editor={ClassicEditor}
                                                                            onReady={(editor) => { }}
                                                                            onBlur={(event, editor) => { }}
                                                                            onFocus={(event, editor) => { }}
                                                                            onChange={debouncedOnChange1}
                                                                        />
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="modal-footer">

                                                        <button type="button" className="btn btn-danger me-4" onClick={closeModal} style={{ fontSize: "1rem" }}>

                                                            Close

                                                        </button>

                                                        <button type="button" className="btn btn-primary" onClick={saveRating} style={{ fontSize: "1rem" }}>

                                                            Save

                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    )}






                                <div style={{ marginTop: "5rem" }}>



                                    {/* All Images Main Div */}

                                    <div className="small-images-section mt-3 ms-5">





                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: "-3rem", marginTop: "5rem" }}>

                                            {images.map((image, index) => (

                                                <img

                                                    key={index}

                                                    src={image.data}

                                                    className="img-thumbnail"

                                                    alt={`Thumbnail ${index + 1}`}

                                                    onClick={() => handleImageClick(index)} // Update the carousel when clicked

                                                    style={{ cursor: "pointer", width: "7rem", height: "auto", marginBottom: "0.5rem" }} // Make images clickable and set small width

                                                />

                                            ))}

                                        </div>

                                    </div>




                                    <section className="left-side-section" style={{ marginTop: "-16rem", }}>
                                        <div className="container">
                                            <div className="row">
                                                <div
                                                    className="col-lg-8 col-md-8 col-12"
                                                //  style={{ height: "1000px !important" }}
                                                >
                                                    <div
                                                        //  style={{ height: "1200px !important" }}
                                                        id="carouselExampleIndicators"
                                                        className="carousel slide"
                                                        data-bs-ride="carousel"
                                                    >
                                                        <div
                                                            className="carousel-indicators"
                                                        // style={{ height: "1000px !important" }}
                                                        >
                                                            {images.map((image, index) => (

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

                                                        <div
                                                            className="carousel-inner"
                                                            style={{ marginTop: "0rem" }}
                                                        >
                                                            {images.map((image, index) => (

                                                                <div

                                                                    key={index}

                                                                    className={`carousel-item ${index === currentImageIndex ? "active" : ""}`}

                                                                >

                                                                    <img

                                                                        src={image.data}

                                                                        className="d-block w-100"

                                                                        alt={`Slide ${index + 1}`}
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            objectFit: "contain",
                                                                        }}

                                                                    />

                                                                </div>

                                                            ))}
                                                        </div>
                                                        <button
                                                            className="carousel-control-prev"
                                                            type="button"
                                                            data-bs-target="#carouselExampleIndicators"
                                                            data-bs-slide="prev"
                                                        >
                                                            <span
                                                                className="carousel-control-prev-icon"
                                                                aria-hidden="true"
                                                            ></span>

                                                            <span className="visually-hidden">Previous</span>
                                                        </button>

                                                        <button
                                                            className="carousel-control-next"
                                                            type="button"
                                                            data-bs-target="#carouselExampleIndicators"
                                                            data-bs-slide="next"
                                                        >
                                                            <span
                                                                className="carousel-control-next-icon"
                                                                aria-hidden="true"
                                                            ></span>

                                                            <span className="visually-hidden">Next</span>
                                                        </button>
                                                    </div>


                                                </div>


                                                <div className="col-lg-4 col-md-4 col-12">


                                                    <div className="side-bar-contant">
                                                        <div className="card" style={{ padding: "1rem", marginRight: "-6em", marginTop: "2rem" }}>
                                                            <h1 className="heading-side">
                                                                {name}
                                                                <br />
                                                            </h1>

                                                            <div className="rating-stars" style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem', padding: "0.5rem" }}>

                                                                <div className="rating-stars" style={{ display: 'flex', alignItems: 'center' }}>

                                                                    {[...Array(5)].map((_, index) => (

                                                                        <i key={index} className="fas fa-star" style={{ color: getStarColor(index, parseInt(averageRating)), fontSize: "x-large", }}></i>

                                                                    ))}

                                                                </div>



                                                                <button

                                                                    onClick={() => openModal({ _id, name })}

                                                                    style={{

                                                                        marginLeft: '1rem',
                                                                        padding: '0.5rem 1rem',
                                                                        backgroundColor: '#007bff',
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        borderRadius: '0.25rem',
                                                                        textDecoration: 'none',
                                                                        display: 'inline-block',
                                                                        textAlign: 'center',
                                                                        transition: 'background-color 0.3s',

                                                                    }}

                                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}

                                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}

                                                                >

                                                                    Add Rating

                                                                </button>

                                                            </div>




                                                            <h6 className="">
                                                                Brand : {brand} (Official <a href="www.google.com">{brand} </a> Website)
                                                                <br />
                                                            </h6>
                                                            <h6 className="">
                                                                Model : {model}
                                                                <br />
                                                            </h6>
                                                            <h6 className="">
                                                                Category : {category} ( {subCategory} )
                                                                <br />
                                                            </h6>

                                                            <h6 className="">
                                                                Market Name : {marketName}
                                                                <br />
                                                            </h6>
                                                            <h6 className="">
                                                                About : {color} - Color , &nbsp;{weight} ,&nbsp;{dimensions}
                                                                <br />
                                                            </h6>
                                                            <h6 className="d-flex align-items-center">

                                                                {isPremium && (

                                                                    <span className="badge bg-warning text-dark me-2">

                                                                        Premium

                                                                    </span>

                                                                )}


                                                                {isPopular && (

                                                                    <span className="badge" style={{ background: "#00A86B", marginRight: '0.5rem' }}>

                                                                        New

                                                                    </span>

                                                                )}


                                                                {isNewProduct && (

                                                                    <span className="badge" style={{ background: "#00A86B", marginRight: '0.5rem' }}>

                                                                        Popular

                                                                    </span>

                                                                )}


                                                                {isLimitedTimeDeal && (

                                                                    <span style={{ display: "inline-flex", alignItems: "center", marginRight: '0.5rem' }}>

                                                                        <i

                                                                            className="fa-solid fa-hourglass-half"

                                                                            style={{ color: "white", background: "#2142AB", padding: "0.2rem 0.4rem", cursor: "pointer" }}

                                                                        ></i>

                                                                        {/* Tooltip */}

                                                                        <span className="tooltip-text">It is a time-limited offer, price will rise soon</span>

                                                                    </span>

                                                                )}

                                                            </h6>
                                                            <h6>
                                                                { }
                                                            </h6>

                                                            <hr />
                                                            <h1 className="price-text">
                                                                <del>₹ {price}</del> <span className="text-danger">(-{sellerDiscount + "%" + (adminDiscount === 0 ? (" & " + adminDiscount + "%") : "")} Off)</span> <br /> <strong className="text-success"> ₹ {effectivePrice}</strong> <span className="text-danger"> (Save ₹ {price - (effectivePrice - (adminDiscount || 0))}) </span>

                                                            </h1>
                                                            <span className={addToCart.some(item =>

                                                                item.userEmail === user1.email && item.productId === name

                                                            ) ? "profileProductCartIcon1" : "profileProductCartIcon2"}
                                                                onClick={(event) => handleAddToCart(event, _id, name)}
                                                            >
                                                                {user1.userType === "Admin" ?
                                                                    (<span style={{ fontSize: "1rem", color: "red", fontWeight: "bolder" }}>  {addToCart.length} </span>) :
                                                                    ""}
                                                                <i className="fas fa-cart-plus"></i> </span>
                                                            <span style={{ color: "black" }}>
                                                                Stock Available:{" "}
                                                                <strong style={{ marginLeft: "1rem" }}>
                                                                    {" "}
                                                                    {stock_available}{" "}
                                                                </strong>
                                                            </span>

                                                            <div className="project-size d-flex mt-4">
                                                                <div className="box-1"></div>
                                                                <div className="box-2">
                                                                    <span className="ms-2 me-5" style={{ color: "black" }}>

                                                                        Date Of Listing:{" "}
                                                                        <strong style={{ marginLeft: "1rem" }}>    {new Date(new Date(dateOfFormSubmission).getTime() - (5 * 60 + 30) * 60 * 1000).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', '')}</strong>

                                                                    </span>


                                                                </div>
                                                            </div>
                                                            <div>
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>



                                    <section className="contant-navigation contant-nav">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12 col-12">
                                                    <nav className="product-profile-navbar navbar-expand-lg">
                                                        <div
                                                            className="collapse navbar-collapse"
                                                            id="navbarSupportedContent"
                                                        >
                                                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                                                <li
                                                                    className="nav-item"
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <a
                                                                        className="nav-link"
                                                                        onClick={handleBankOffersClick}
                                                                    >
                                                                        <i className="fa-solid fa-money-check-dollar"></i>  Bank Offers
                                                                    </a>
                                                                </li>
                                                                <li
                                                                    className="nav-item"
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <a
                                                                        className="nav-link"
                                                                        onClick={handleSpecificationClick}
                                                                    >
                                                                        <i className="fa-solid fa-circle-info"></i>  Specifications
                                                                    </a>
                                                                </li>

                                                                <li
                                                                    className="nav-item"
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <a
                                                                        className="nav-link"
                                                                        onClick={handleAadharClick}
                                                                    >
                                                                        <i className="fa-solid fa-microchip"></i>  Technical Details
                                                                    </a>
                                                                </li>
                                                                <li
                                                                    className="nav-item"
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <a
                                                                        onClick={handlevoteridcardClick}
                                                                        className="nav-link"
                                                                    >
                                                                        <i className="fa-solid fa-screwdriver-wrench"></i>  Warranty Details
                                                                    </a>
                                                                </li>
                                                                <li
                                                                    className="nav-item"
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <a
                                                                        onClick={handlePancardClick}
                                                                        className="nav-link"
                                                                    >
                                                                        <i className="fa-solid fa-network-wired"></i>  Other Details
                                                                    </a>
                                                                </li>

                                                                <li
                                                                    className="nav-item"
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <a
                                                                        onClick={handleReviewSectionClick}
                                                                        className="nav-link"
                                                                    >
                                                                        <i className="fa-solid fa-comment-dots"></i>  Reviews
                                                                    </a>
                                                                </li>

                                                                <li
                                                                    className="nav-item"
                                                                    style={{ cursor: "pointer" }}
                                                                >
                                                                    <a
                                                                        onClick={handleSimilarProductsClick}
                                                                        className="nav-link"
                                                                    >
                                                                        <i className="fa-solid fa-bookmark"></i>   Similar Products
                                                                    </a>
                                                                </li>


                                                            </ul>
                                                        </div>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section
                                        className="specification-section"
                                        ref={bankOffersRef}
                                    >
                                        <div className="container">
                                            <h2>Bank Offers
                                                <input
                                                    placeholder="Search Bank Offers"
                                                    style={{

                                                        width: "20rem",
                                                        height: "3rem",
                                                        borderRadius: "10px",
                                                        marginLeft: "10rem",
                                                        marginRight: "-30rem",
                                                        fontSize: "1.3rem",

                                                    }}
                                                    value={searchTerm}
                                                    onChange={handleSearch}

                                                />
                                            </h2>
                                            {searchResults.slice(0, visibleOffers).map(
                                                ({
                                                    bankName,
                                                    logo,
                                                    rateOfInterest,
                                                    tenure,
                                                    otherInformation,
                                                    processingFees,
                                                    prepaymentCharges,
                                                    loanAmount,
                                                    foreclosureCharges,
                                                }) => {
                                                    return (
                                                        <>
                                                            <div
                                                                className="row justify-content-center"
                                                            //  style={{cursor:"pointer"}}
                                                            >
                                                                <div className="col-lg-2 col-12">
                                                                    <div className="bank-details-check d-flex">
                                                                        {/* <input type="checkbox" className="form-check" /> */}
                                                                        <img
                                                                            height={80}
                                                                            width={100}
                                                                            src={logo.data}
                                                                            className="img-fluid ms-2 mb-3"
                                                                            alt=""
                                                                            style={{ color: "black" }} />
                                                                    </div>
                                                                    <h6 style={{ color: "black" }}> {bankName} </h6>
                                                                </div>

                                                                <div className="col-lg-2 col-12">
                                                                    <h3>Loan Amount</h3>
                                                                    <h6 className="loan-amount" style={{ color: "black" }} >
                                                                        ₹ {loanAmount}
                                                                    </h6>
                                                                </div>

                                                                <div className="col-lg-2 col-12">
                                                                    <h3>Interest Rate</h3>
                                                                    <h6 className="interest-rate" style={{ color: "black" }} >
                                                                        Starts {rateOfInterest}
                                                                    </h6>
                                                                </div>

                                                                <div className="col-lg-2 col-12" style={{ color: "black" }} >
                                                                    <h3>Processing Fees</h3>
                                                                    <h6 className="emi"> {processingFees} </h6>
                                                                </div>

                                                                <div className="col-lg-2 col-12">
                                                                    <h3>Total Tenure</h3>
                                                                    <h6 className=" " style={{ color: "black" }}> {tenure} </h6>
                                                                </div>
                                                                <div className="col-lg-2 col-12">

                                                                    <button
                                                                        className=""
                                                                        data-label="CONTACT"
                                                                        id="Contact"
                                                                        style={{

                                                                            ...buttonStyle,

                                                                            ...(isHovered ? hoverStyle : {}),

                                                                            ...(isActive ? activeStyle : {}),

                                                                        }}

                                                                        onMouseEnter={() => setIsHovered(true)}

                                                                        onMouseLeave={() => setIsHovered(false)}

                                                                        onMouseDown={() => setIsActive(true)}

                                                                        onMouseUp={() => setIsActive(false)}

                                                                        onFocus={(e) => {

                                                                            e.target.style.boxShadow = '0 0 5px rgba(76, 175, 80, 0.5)'; // Green glow on focus

                                                                        }}

                                                                        onBlur={(e) => {

                                                                            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)'; // Reset shadow on blur

                                                                        }}
                                                                        onClick={function () {
                                                                            navigate("/home-loan", {
                                                                                state: {
                                                                                    logo: logo,
                                                                                    bankName: bankName,
                                                                                    loanAmount: loanAmount,
                                                                                    rateOfInterest: rateOfInterest,
                                                                                    processingFees: processingFees,
                                                                                    tenure: tenure,
                                                                                    prepaymentCharges: prepaymentCharges,
                                                                                    otherInformation: otherInformation,
                                                                                    foreclosureCharges: foreclosureCharges,
                                                                                },
                                                                            });
                                                                        }}
                                                                    >

                                                                        View Offer
                                                                    </button>
                                                                </div>

                                                            </div>
                                                            <hr />
                                                        </>
                                                    );
                                                }
                                            )}
                                            <button

                                                onClick={() => setVisibleOffers(visibleOffers + 2)} // Increase the number of visible offers by 2

                                                style={{
                                                    marginLeft: "45%",

                                                    padding: "1rem",

                                                    backgroundColor: "transparent",

                                                    border: "none",

                                                    cursor: "pointer",

                                                    color: "#007bff",

                                                }}

                                            >

                                                <i className="fas fa-chevron-down"></i> {/* Downward arrow icon */}

                                                Load 2 More

                                            </button>
                                        </div>
                                    </section>

                                    <section
                                        className="specification-section product-profile-specification-section"
                                        ref={specificationRef}
                                    >
                                        <div className="container">
                                            <h2>Details</h2>
                                            <hr />
                                            <div className="row justify-content-center">
                                                <div className="col-lg-3 col-md-3 col-3 mt-4 product-profile-details" >
                                                    <h6>Name</h6>
                                                    <h6>Brand</h6>
                                                    <h6>Model</h6>
                                                    <h6>Effective Price</h6>
                                                    <h6>Price Without Discount</h6>
                                                    <h6>Discount</h6>
                                                    <h6>Category</h6>
                                                    <h6>New / Refurb.</h6>
                                                    {isPopular === true ? (<h6>Popular</h6>) : ""}
                                                    <h6> Color </h6>
                                                    <h6> Weight </h6>
                                                    <h6> Dimensions </h6>
                                                    <h6> Stock Available </h6>
                                                    <h6> Stock Next Refill Date </h6>
                                                    <h6>Video URL</h6>

                                                    {Data.userType !== "Admin" ? "" : <>
                                                        <h6>Total Sold</h6>
                                                        <h6>Total Cart</h6>
                                                        <h6>Created By</h6>
                                                    </>}



                                                    <h6>Date Of Listing</h6>

                                                    <h6>Tags</h6>

                                                    <h6>Popular</h6>
                                                    <h6>New</h6>
                                                    <h6>Premium</h6>
                                                    <h6>Time Limited Offer</h6>
                                                </div>

                                                <div
                                                    className="col-lg-5 col-md-5 col-9 mt-4"
                                                    id="specifications"
                                                >
                                                    <div className="specification-content" >


                                                        <h6 className="" > {name} </h6>
                                                        <h6 className="" > {brand} </h6>
                                                        <h6 className="" > {model} </h6>
                                                        <h6> <span className="text-success"><strong>  ₹ {effectivePrice} </strong></span>  </h6>
                                                        <h6 className="" > <del> ₹ {price}  </del></h6>
                                                        <h6 className="" > <span className="text-danger">-{sellerDiscount + "%" + (adminDiscount === 0 ? (" & " + adminDiscount + "%") : "")} (Save ₹ {price - (effectivePrice - (adminDiscount || 0))}) </span> </h6>

                                                        <h6 className="" > {category} ({subCategory}) </h6>

                                                        <h6 className="" > {isNewProduct === true ? "New" : "Refurbished"} </h6>

                                                        {isPopular === true ? (<h6> Yes </h6>) : ""}
                                                        <h6 className="" > {color} </h6>

                                                        <h6 className="" >  {weight}  </h6>

                                                        <h6 className="" > {dimensions} </h6>
                                                        <h6 className="" > {stock_available} </h6>
                                                        <h6 className="" > {stockNextRefillDate} </h6>

                                                        <h6 className="" > {youtubeUrl} </h6>

                                                        {Data.userType !== "Admin" ? "" : <>
                                                            <h6 className="" > {((totalSold === 0) || (!totalSold)) ? <span className="text-danger">Sorry! No Sold Yet</span> : <span className="text-success" > {totalSold} People Bought This Product </span>} </h6>
                                                            <h6 className="" > {((totalCart === 0) || (!totalCart)) ? <span className="text-danger">Sorry! No Cart Yet</span> : <span className="text-success" > {totalCart} People Add This Product To Cart </span>}  </h6>

                                                            <h6 className="" > {createdByName
                                                            } ({createdByType}) </h6>

                                                        </>}

                                                        {Data.userType !== "Admin" ? "" : <>

                                                            <h6 className="" >  {isPopular}  </h6>
                                                            <h6 className="" >  {isNewProduct}  </h6>
                                                            <h6 className="" >  {isPremium}  </h6>
                                                            <h6 className="" >  {isLimitedTimeDeal}  </h6>

                                                        </>}


                                                        <h6 className="" > {dateOfFormSubmission} </h6>
                                                        <h6 className="">

                                                            {tags.map((tag, index) => (

                                                                <span key={tag}>

                                                                    ({index + 1}). {tag} , &nbsp; &nbsp;

                                                                </span>

                                                            ))}

                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section >



                                    <section className="location-section" ref={technicalDetailsRef}>
                                        <div className="container">
                                            <h2> Technical Details</h2>
                                            <div className="row justify-content-center">
                                                <div className="col-lg-12 col-12 mb-4">

                                                    <div className="product-profile-dangerouslySetInnerHTML-details" style={{ border: "1px dotted black", padding: "2rem 8rem", borderRadius: "10px", fontSize: "large" }} dangerouslySetInnerHTML={{ __html: technicalDetails }} />

                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {
                                        !warrantyDetails ? "" : (
                                            <section
                                                className="location-section"
                                                id="voteridcard"
                                                ref={warrantyDetailsRef}
                                            >
                                                <div className="container">
                                                    <h2> Warranty Details</h2>
                                                    <div className="row justify-content-center">
                                                        <div className="col-lg-12 col-12 mb-4">

                                                            <div className="product-profile-dangerouslySetInnerHTML-details"  style={{ border: "1px dotted black", padding: "2rem 8rem", borderRadius: "10px" ,  fontSize: "large" }} dangerouslySetInnerHTML={{ __html: warrantyDetails }} />

                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        )
                                    }


                                    <section className="location-section" ref={otherDetailsRef}>
                                        <div className="container">
                                            <h2> Other Details</h2>
                                            <div className="row justify-content-center">
                                                <div className="col-lg-12 col-12 mb-4">

                                                    <div className="product-profile-dangerouslySetInnerHTML-details"  style={{ border: "1px dotted black", padding: "2rem 8rem", borderRadius: "10px", fontSize: "large" }} dangerouslySetInnerHTML={{ __html: productDetails }} />

                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="location-section" ref={ReviewSectionRef} style={{
                                        width: "60%",
                                        margin: "1rem auto"
                                    }}>
                                        <div className="container">
                                            <h2> Reviews </h2>
                                            <button className="btn btn-primary" style={{ fontSize: "medium", marginLeft: "85%", marginTop: "-4rem" }} onClick={() => openModal({ _id, name })}>
                                                Add Review
                                            </button>

                                            <div className="review-stars-section" style={{ marginTop: "-4rem" }}>

                                                <div className="review-star-row" onClick={() => setSelectedRating(null)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>

                                                    <div className="review-star-icon-container pe-4" style={{ fontWeight: "bolder", fontSize: "1rem", }} >All Ratings</div>

                                                    <div className="review-star-users-container" style={{ marginLeft: "22rem" }}> {reviews.length} Reviews</div>

                                                </div>


                                                {[5, 4, 3, 2, 1].map((star) => {

                                                    const userCount = reviews.filter(r => r.rating === star).length;

                                                    const percentage = reviews.length > 0 ? ((userCount / reviews.length) * 100).toFixed(0) : 0; // Calculate percentage


                                                    return (

                                                        <div className="review-star-row" key={star} onClick={() => setSelectedRating(star)}>

                                                            <div className="review-star-icon-container pe-4 ">

                                                                {[...Array(5)].map((_, index) => (

                                                                    <i key={index} className="fas fa-star" style={{ color: getStarColor(index, star) }}></i>

                                                                ))}

                                                            </div>

                                                            <div className="percentage-bar-container">

                                                                <div className="percentage-fill" style={{ width: `${percentage}%`, backgroundColor: getStarColor(0, star) }}></div>

                                                            </div>

                                                            <div className="review-star-users-container">

                                                                {percentage}% ({userCount} Reviews)  {/* Display user count and percentage */}

                                                            </div>

                                                        </div>

                                                    );

                                                })}

                                            </div>

                                            {selectedRating !== null && (

                                                <h3 style={{ marginTop: "2rem", fontSize: "1.5rem", textAlign: "center" }}>Reviews with {selectedRating} star{selectedRating > 1 ? 's' : ''}</h3>

                                            )}

                                            {selectedRating === null && (

                                                <h3 style={{ marginTop: "2rem", fontSize: "1.5rem", textAlign: "center" }}>All Reviews</h3>

                                            )}

                                            <div className="row justify-content-center">

                                                <div className="col-lg-12 col-12 mb-4 product-list-main-comment-section" >

                                                    {

                                                        reviews

                                                            .filter(review => selectedRating === null || review.rating === selectedRating) // Filter based on selected rating

                                                            .map(({ rating, userName, comment, title, likes, disLikes, commentId, dateOfFormSubmission }, index) => {

                                                                const Id = `${_id}-${index}`;

                                                                return (

                                                                    <div key={Id}>

                                                                        <div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>

                                                                            <h5 style={{ display: 'flex', alignItems: 'center', margin: 0 }}>

                                                                                <strong style={{ display: 'flex', alignItems: 'center' }}>

                                                                                    <i className="fas fa-user-circle" style={{ fontSize: "2rem", marginRight: "0.5rem" }}></i>

                                                                                    <span style={{ fontSize: "1rem" }}>{userName}</span>

                                                                                </strong>

                                                                            </h5>
                                                                            <h6 style={{ marginLeft: "-9rem", marginBottom: "-4rem" }}>{adjustDate(dateOfFormSubmission)}</h6>

                                                                        </div>

                                                                        <div style={{ display: 'flex', alignItems: 'center', height: '100px', marginTop: "-1rem" }}>

                                                                            <h5 style={{ display: 'flex', alignItems: 'center', margin: 0 }}>

                                                                                <strong style={{ display: 'flex', alignItems: 'center' }}>

                                                                                    <div className="rating-stars" style={{ display: 'flex', alignItems: 'center', marginRight: '0.5rem' }}>

                                                                                        {Array.from({ length: 5 }, (_, index) => (

                                                                                            <i

                                                                                                key={index}

                                                                                                className="fas fa-star"

                                                                                                style={{ color: getStarColor(index, rating), fontSize: "1rem", marginRight: "0.2rem", }}

                                                                                            ></i>

                                                                                        ))}

                                                                                    </div>

                                                                                    <span style={{ fontSize: "1rem", fontWeight: "bolder", marginLeft: "0rem",color: "black" ,  }}>
                                                                                        <br />     <br />  <br />{title}</span>

                                                                                </strong>

                                                                            </h5>


                                                                        </div>

                                                                        <h5>

                                                                            <div className="p-2 mt-2 product-profile-comment" style={{  width: "50%", borderRadius: "10px" }} dangerouslySetInnerHTML={{ __html: comment }}>

                                                                            </div>

                                                                        </h5>
                                                                        <div>
                                                                            <i

                                                                                className={`fa-solid fa-thumbs-up me-4 p-2 ${likedComments[commentId] ? 'liked' : ''}`}

                                                                                style={{

                                                                                    color: (likedComments[commentId] || likes.some(like => like.userName === user1.name)) ? 'green' : 'grey',

                                                                                    cursor: 'pointer',


                                                                                }}

                                                                                onClick={() => handleLikeCommentClick(_id, commentId)}

                                                                            ></i>

                                                                            <i

                                                                                className={`fa-solid fa-thumbs-down p-2 ${dislikedComments[commentId] ? 'disliked' : ''}`}

                                                                                style={{

                                                                                    color: (dislikedComments[commentId] || disLikes.some(disLikes => disLikes.userName === user1.name)) ? 'red' : 'grey',

                                                                                    cursor: 'pointer',

                                                                                }}

                                                                                onClick={() => handleDislikeCommentClick(_id, commentId)}

                                                                            ></i>

                                                                        </div>

                                                                    </div>



                                                                );

                                                            })

                                                    }

                                                </div>

                                            </div>
                                        </div>
                                    </section>



                                </div >


                                {advertisementVisible && adImageSrc && (

                                    <div style={{

                                        position: 'absolute',

                                        top: '70rem',

                                        right: '0rem',

                                        zIndex: '1000',

                                        margin: '1rem',
                                        overflow: 'hidden', // Prevent overflow if the image is larger

                                        border: '3px solid #ccc', // Optional: Add a border for better visibility
                                        outline: '1px solid black', // Optional: Add a border for better visibility

                                        borderRadius: '8px',
                                        // width: '100%', // Adjust width as necessary
                                        // height: '100%' // Adjust width as necessary

                                    }}


                                    >
                                        {showCloseButton && (

                                            <button

                                                ref={advertisementCloseButtonRef}

                                                onClick={
                                                    () => {
                                                        console.log("Close Btn Clicked")
                                                        setAdvertisementVisible(false)
                                                    }
                                                }

                                                style={{

                                                    position: 'absolute',
                                                    top: '0.5rem',
                                                    right: '0.5rem',
                                                    fontSize: '2rem',
                                                    background: 'red',
                                                    color: 'white',
                                                    padding: "0rem 0.4rem",
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    zIndex: '99000',

                                                }}

                                            >

                                                &times;

                                            </button>

                                        )}

                                        <i className="fas fa-ad" style={{

                                            position: 'absolute',

                                            top: '0.5rem',

                                            left: '0.5rem',
                                            fontSize: '1.2rem', // Increase font size

                                            fontWeight: 'bold',

                                            color: 'white', // Change color as necessary

                                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: background for better visibility

                                            borderRadius: '50%', // Optional: round icon

                                            padding: '0.5rem' // Optional: padding for the icon

                                        }}></i>
                                        <span className="" style={{

                                            position: 'absolute',

                                            bottom: '0.5rem',

                                            left: '0.5rem',
                                            fontSize: '0.8rem', // Increase font size

                                            fontWeight: 'bold',

                                            color: 'white', // Change color as necessary

                                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: background for better visibility

                                            borderRadius: '5px', // Optional: round icon

                                            padding: '0.5rem' // Optional: padding for the icon

                                        }}
                                            onClick={() => window.location.href = redirectLink}>Sponsered</span>
                                        <span style={{

                                            position: 'absolute',

                                            top: '0.5rem',

                                            left: '3.5rem', // Adjust left position to place it right after the icon

                                            color: 'white', // Change color as necessary

                                            cursor: 'pointer', // Change cursor to pointer to indicate clickability

                                            textDecoration: 'none', // Remove underline

                                            fontSize: '1rem', // Increase font size

                                            fontWeight: 'bold', // Make font bold

                                            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background

                                            padding: '0.3rem 0.5rem', // Padding around the text

                                            borderRadius: '4px', // Rounded corners

                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)', // Subtle shadow for depth

                                            transition: 'background-color 0.3s',
                                        }} onClick={() => window.location.href = redirectLink}>

                                            {sponsorName}

                                        </span>

                                        <img src={adImageSrc}
                                            onClick={() => window.location.href = redirectLink}
                                            alt="Advertisement" style={{ width: '20rem', height: '80vh', objectFit: 'cover', cursor: "pointer", transition: 'filter 0.3s', }} />

                                    </div>

                                )
                                }


                                <section className="location-section" ref={SimilarProductsRef}>
                                    <h2> Similar Products</h2>

                                    <div className="similarProductsDiv">

                                        <Carousel
                                            responsive={responsive}
                                            swipeable={true}
                                            draggable={true}
                                            showDots={true}
                                            ssr={true}
                                            infinite={false}
                                            autoPlaySpeed={1000}
                                            keyBoardControl={true}
                                            customTransition="all .5"
                                            transitionDuration={500}
                                            containerClassName="carousel-container"
                                            removeArrowOnDeviceType={["tablet", "mobile"]}
                                            dotListClassName="custom-dot-list-style"
                                            itemClassName="carousel-item"
                                        >

                                            {Data.post

                                                .filter((product) => {

                                                    // Exclude the current product from similar products

                                                    if (product._id === previousData) {

                                                        return false;

                                                    }

                                                    // Check if the product matches the subCategory or tags

                                                    return product.subCategory === subCategory ||

                                                        product.tags.some(tag => tags.includes(tag));

                                                })

                                                .map(({
                                                    _id,
                                                    id,
                                                    name,
                                                    category,
                                                    subCategory,
                                                    marketName,
                                                    newOrRefurbished,
                                                    isPopular,
                                                    reviews,
                                                    isNewProduct,
                                                    isPremium,
                                                    isLimitedTimeDeal,
                                                    price,
                                                    effectivePrice,
                                                    brand,
                                                    model,
                                                    color,
                                                    weight,
                                                    dimensions,
                                                    stockNextRefillDate,
                                                    sellerDiscount,
                                                    adminDiscount,
                                                    stock_available,
                                                    tags,
                                                    images,
                                                    averageRating,
                                                    youtubeUrl,
                                                    productDetails,
                                                    warrantyDetails,
                                                    technicalDetails,
                                                    rating,
                                                    comments,
                                                    freqAskedQuest,
                                                    totalSold,
                                                    totalCart,
                                                    createdByName,
                                                    createdByType,
                                                    dateOfFormSubmission,
                                                }) => (




                                                    <div key={_id} className="card" style={{ height: "650px", margin: "1rem" }}>

                                                        {isPremium === true ? (<span className="badge bg-warning text-dark position-absolute" style={{ top: "10px", left: "10px", zIndex: 1 }}>

                                                            Premium

                                                        </span>) : ""}




                                                        {isPopular === true ? (<span className="badge  position-absolute" style={{ top: "50px", left: "10px", zIndex: 1, background: "#00A86B" }}>

                                                            New

                                                        </span>) : ""}





                                                        <span className="rating-stars position-absolute" style={{ top: "10px", right: "10px", zIndex: 1 }}>

                                                            {[...Array(5)].map((_, index) => (

                                                                <i key={index} className="fas fa-star" style={{ color: getStarColor(index, parseInt(averageRating)), fontSize: "large", }}></i>

                                                            ))}
                                                        </span>



                                                        <img src={images[0].data} className="card-img-top" alt={name} style={{ width: "100%", height: "450px", objectFit: "cover", position: "relative", cursor: "pointer" }} onClick={function () {
                                                            const formattedName = encodeURIComponent(name);
                                                            console.log("Navigating to ProductProfile with name:", formattedName);
                                                            navigate(`/ProductProfile/${name}`, {
                                                                state: {
                                                                    _id: _id,
                                                                    id: id,
                                                                    name: name,
                                                                },
                                                            });
                                                        }} />
                                                        {isPopular === true ? (<span className="badge bg-primary text-white position-absolute" style={{ top: "50px", right: "10px", zIndex: 1 }}>

                                                            Sponsored

                                                        </span>) : ""}


                                                        {Profile.userType === "Admin" ? (

                                                            <button
                                                                className=" btn btn-danger px-3"
                                                                onClick={(event) => handleDelete(event, _id)}
                                                                style={{ bottom: "140px", right: "10px", position: "absolute", zIndex: 1 }}>
                                                                <i className="fas fa-trash-alt text-white mx-auto"
                                                                    style={{
                                                                        fontSize: "1.2rem"
                                                                    }}
                                                                ></i>
                                                            </button>

                                                        ) : ""}

                                                        <div className="card-body">

                                                            <h5 className="card-title">
                                                                <div className="" style={{ marginBottom: "-1rem" }}> {name}  <span style={{ fontSize: "smaller" }}>  </span>
                                                                </div>


                                                                <br />({newOrRefurbished}) {isLimitedTimeDeal === true ? (

                                                                    <span style={{ position: "relative", display: "inline-block" }}>

                                                                        <i

                                                                            className="fa-solid fa-hourglass-half ms-2"

                                                                            style={{ color: "white", background: "#2142AB", padding: "0.2rem 0.4rem", cursor: "pointer" }}

                                                                        ></i>

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
                                                                    {isNewProduct === true ? (<span className="badge "
                                                                    >
                                                                        Popular
                                                                    </span>) : ""}

                                                                </span>

                                                            </h5>


                                                            <p className="card-text">

                                                                <strong> <del>₹ {price}</del> </strong>  <span className="text-danger">(-{sellerDiscount + "%" + (adminDiscount === 0 ? (" & " + adminDiscount + "%") : "")} Off)</span> <br /> <strong className="text-success"> ₹ {effectivePrice}</strong> <span className="text-danger"> Save ₹ {price - (effectivePrice - (adminDiscount || 0))} </span>

                                                            </p>



                                                        </div>

                                                    </div>



                                                ))}

                                        </Carousel>
                                    </div>






                                </section>

                            </>
                        );
                    }
                )}




        </>
    );
};

export default ProductProfile;
