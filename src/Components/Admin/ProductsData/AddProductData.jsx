import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import debounce from "lodash/debounce";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Container,
  Grid,
  TextField,
  Button,
  InputLabel,
  TextareaAutosize,
  List,
  ListItem,
  ListItemText,

} from "@mui/material";


import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const AddNewProduct = () => {

  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [market, setMarket] = useState([]);

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const textareaRef = useRef(null);


  const [priceWithoutDiscount, setPriceWithoutDiscount] = useState("");

  const [sellerDiscount, setSellerDiscount] = useState("");

  const [effectivePrice, setEffectivePrice] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [productDetailsText, setproductDetailsText] = useState("");
  const [warrantyDetailsText, setwarrantyDetailsText] = useState("");
  const [technicalDetailsText, settechnicalDetailsText] = useState("");


  const [tabIndex, setTabIndex] = useState(0);
  const [image1, setImage1] = useState([]);

  const [data, setData] = useState("");
  const [user, setUser] = useState({
    name: "",
    category: "",
    subCategory: "",
    marketName: "",
    price: "",
    newOrRefurbished: "",
    sellerDiscount: "",
    brand: "",
    model: "",
    color: "",
    weight: "",
    dimensions: "",
    stock_available: "",
    youtubeUrl: "",
    stockNextRefillDate: "",
    createdByName: "",
    createdByType: "",
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

  useEffect(() => {
    axios
      .get("/api/brandsList")
      .then((response) => {
        const data = response.data;

        setBrand(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);


  useEffect(() => {
    axios
      .get("/api/marketsList")
      .then((response) => {
        const data = response.data;

        setMarket(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
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


  const debouncedHandleInput = debounce((e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (name === "price") {
      setPriceWithoutDiscount(value);
    } else if (name === "sellerDiscount") {
      setSellerDiscount(value);
    }
  }, 300);

  const handleDropdownChange = (e) => {

    const { name, value } = e.target;

    if (name === "category") {

      setSelectedCategory(value);

    }

    setUser({ ...user, [name]: value });

  };
  const debouncedOnChange1 = debounce((event, editor) => {
    const data = editor.getData();

    setproductDetailsText(data);
  }, 500);

  const debouncedOnChange2 = debounce((event, editor) => {
    const data = editor.getData();

    setwarrantyDetailsText(data);
  }, 500);

  const debouncedOnChange3 = debounce((event, editor) => {
    const data = editor.getData();

    settechnicalDetailsText(data);
  }, 500);


  //   effectivePrice
  // setEffectivePrice
  useEffect(() => {

    const price = parseFloat(priceWithoutDiscount) || 0;

    const discount = parseFloat(sellerDiscount) || 0;

    const discountAmount = (price * discount) / 100;

    const effectivePrice = price - discountAmount;
    const EffectivePrice = effectivePrice.toFixed(0)

    setEffectivePrice(EffectivePrice);

  }, [priceWithoutDiscount, sellerDiscount]);



  const getSubCategories = () => {

    const selectedCat = category.find(item => item.categoryName === selectedCategory);

    return selectedCat ? selectedCat.subCategoryName : [];

  };

  const handleTagClick = (tag) => {


    setSelectedTags((prevTags) => [...prevTags, tag.tagName]);

    textareaRef.current.focus(); // Focus on the textarea immediately after clicking the tag

    setShowSuggestions(false); // Hide suggestions

  };


  const handleFocus = () => {

    setShowSuggestions(true); // Show suggestions when focused

  };


  const handleBlur = () => {

    setTimeout(() => setShowSuggestions(false), 100); // Delay to allow click event on suggestions

  };

  const handleRemoveTag = (tagToRemove) => {

    setSelectedTags((prevTags) => prevTags.filter(tag => tag !== tagToRemove));

  };
  // Filter out selected tags from the suggestions

  const filteredTags = tags.filter(tag => !selectedTags.includes(tag.tagName));


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit button pressed");

    var bodyFormData = new FormData();
    bodyFormData.append("name", user.name);
    bodyFormData.append("category", user.category);
    bodyFormData.append("subCategory", user.subCategory);
    bodyFormData.append("marketName", user.marketName);
    bodyFormData.append("price", user.price);
    bodyFormData.append("newOrRefurbished", user.newOrRefurbished);
    bodyFormData.append("sellerDiscount", user.sellerDiscount);
    bodyFormData.append("brand", user.brand);
    bodyFormData.append("model", user.model);
    bodyFormData.append("color", user.color);
    bodyFormData.append("weight", user.weight);
    bodyFormData.append("dimensions", user.dimensions);
    bodyFormData.append("stock_available", user.stock_available);
    bodyFormData.append("youtubeUrl", user.youtubeUrl);
    bodyFormData.append("stockNextRefillDate", user.stockNextRefillDate);
    bodyFormData.append("tags", JSON.stringify(selectedTags));

    bodyFormData.append("createdByName", data.name);
    bodyFormData.append("createdByType", data.userType);



    for (let i = 0; i < image1.length; i++) {
      bodyFormData.append("images", image1[i]);
    }


    bodyFormData.append("effectivePrice", effectivePrice);

    bodyFormData.append("productDetails", productDetailsText);
    bodyFormData.append("warrantyDetails", warrantyDetailsText);
    bodyFormData.append("technicalDetails", technicalDetailsText);


    try {
      await axios.post(
        "/api/addNewProduct",

        bodyFormData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("New Product added Successfully");


      window.location.reload();
    } catch (error) {
      //handle error

      console.log(error);
    }
  };

  if (!data) {
    return <div style={{ textAlign: "center", color: "white", background: "#63B7B7", padding: "5rem", margin: "5rem" }}>You must Login To Add A New Product
      <br />
      <Button
        href="/Login"
        variant="contained"
        style={{ padding: "0.6rem 1.5rem", background: "green" }}
      >
        {" "}
        Login{" "}
      </Button>

      <br />

      <Button
        href="/LogiNewUserRegistrationn"
        variant="contained"
        style={{ padding: "0.6rem 1.5rem", background: "green" }}
      >
        {" "}
        New User{" "}
      </Button>
    </div>;
  }


  return (
    <div
      className="newProjectMainDiv"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        marginTop: "7rem",
        marginBottom: "5rem",
        marginLeft: "5rem",
        marginRight: "5rem",
        borderRadius: "20px",
        padding: "1rem"
        // zIndex: "999",
        // position: "absolute",
        // left: "12rem",
      }}
    ><h2 style={{ textAlign: "center", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", margin: "1% 30%", padding: "1.5rem 0.2rem", fontSize: "1.8rem" }}>Add New Product</h2>
      <div>
        <div>

        </div>

        <div className="tablist">
          <Tabs
            forceRenderTabPanel={true}
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList>
              <Tab id="Project">Product</Tab>

              <Tab id="LocationMap">Specifications</Tab>
              <Tab id="LocationMap">Tech. Details</Tab>

              <Tab id="LocationMap">Tags</Tab>

              <Tab id="MasterPlan">Price Details</Tab>

              <Tab id="FloorPlan">Stock Available</Tab>

              <Tab id="PricePlan">Images & Videos</Tab>


            </TabList>

            <TabPanel>
              <Container
                component="main"
                maxWidth="xl"
                rowspacing={2}
                style={{
                  marginTop: "2%",
                  marginBottom: "2%",
                  display: "block",
                }}
              >
                <div>
                  <Grid container spacing={2} rowSpacing={4}>
                    {/* email address */}

                    <Grid item xs={10}>
                      <TextField
                        placeholder="Please Enter Product Name"
                        label="Product Name"
                        fullWidth
                        name="name"
                        style={{ background: "#F0E7F2 " }}
                        onChange={debouncedHandleInput}
                      />
                    </Grid>


                    <Grid item xs={8}>
                      Market Name{" "}
                      <select
                        style={{
                          height: "6vh",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          width: "100%",
                          background: "#ECEFE3"
                        }}
                        name="marketName"
                        onChange={handleDropdownChange}
                        value={data.marketName}
                      >
                        <option value="">- - - - Please Choose - - - - </option>

                        {
                          market.map((item) => {
                            return (<>
                              <option value={item.name}> {item.name} </option>
                            </>)
                          })
                        }

                      </select>
                    </Grid>
                    <br />
                    <Grid item xs={8}>
                      Product Type{" "} (New Or Refurbished)
                      <select
                        style={{
                          height: "6vh",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          width: "100%",
                          background: "#ECEFE3"
                        }}
                        name="newOrRefurbished"
                        onChange={handleDropdownChange}
                        value={data.newOrRefurbished}
                      >
                        <option value="">- - - - Please Choose - - - - </option>
                        <option value="New">New</option>
                        <option value="Refurbished">Refurbished</option>
                      </select>
                    </Grid>

                    <Grid item xs={8}>
                      Product Category{" "}
                      <select
                        style={{
                          height: "6vh",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          width: "100%",
                          background: "#ECEFE3"
                        }}
                        name="category"
                        onChange={handleDropdownChange}
                        value={data.category}
                      >
                        <option value="">- - - - Please Choose - - - - </option>

                        {
                          category.map((item) => {
                            return (<>
                              <option value={item.categoryName}> {item.categoryName} </option>
                            </>)
                          })
                        }

                      </select>
                    </Grid>
                    <Grid item xs={8}>
                      Product Sub - Category{" "}
                      <select

                        style={{
                          height: "6vh",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          width: "100%",
                          background: "#ECEFE3"

                        }}

                        name="subCategory"

                        onChange={handleDropdownChange}

                        value={data.subCategory} // Update this to the correct state

                      >

                        <option value="">- - - - Please Choose - - - - </option>

                        {

                          getSubCategories().map((subCat, index) => (

                            <option key={index} value={subCat}>{subCat}</option>

                          ))

                        }

                      </select>
                    </Grid>
                    <Grid item xs={10}>


                      Product Brands{" "}
                      <select

                        style={{

                          height: "6vh",

                          backgroundColor: "white",

                          borderRadius: "5px",

                          width: "100%",

                          background: "#ECEFE3"

                        }}

                        name="brand"

                        onChange={handleDropdownChange}

                        value={user.brand} // Update this to the correct state

                      >

                        <option value="">- - - - Please Choose - - - - </option>

                        {

                          brand

                            .filter(item => item.categoryName === selectedCategory) // Filter brands based on selected category

                            .map(item => (

                              <option key={item.brandName} value={item.brandName}> {item.brandName} </option>

                            ))

                        }

                      </select>

                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        placeholder="Please Enter Model Name"
                        label="Model Name"
                        fullWidth
                        name="model"
                        onChange={debouncedHandleInput}
                        style={{ background: "#F0E7F2 " }}
                      />
                    </Grid>




                  </Grid>
                  <Grid item xs={8} style={{ textAlign: "center" }}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      style={{ padding: "0.6rem 1.5rem", marginTop: "2rem" }}
                      onClick={() => setTabIndex(tabIndex + 1)}
                    >
                      Next <span style={{ marginLeft: "0.2rem" }}> ⟶ </span>
                    </Button>
                  </Grid>
                </div>
              </Container>
            </TabPanel>

            <TabPanel>
              <div>
                <Container
                  component="main"
                  rowspacing={2}
                  maxWidth="xl"
                  style={{
                    marginTop: "2%",
                    marginBottom: "2%",
                    display: "block",
                  }}
                >
                  <Grid container spacing={2} rowSpacing={2}>

                    <Grid item xs={10}>
                      <TextField
                        placeholder="Please Enter Product Dimensions (Ex: 20cm X 30cm)"
                        label="Product Dimensions (Ex: 20cm X 30cm)"
                        fullWidth
                        name="dimensions"
                        onChange={debouncedHandleInput}
                        style={{ background: "#F0E7F2 " }}
                      /> </Grid>
                    <Grid item xs={10}>
                      <TextField
                        placeholder="Please Enter Product Weight"
                        label="Product Weight"
                        fullWidth
                        name="weight"
                        onChange={debouncedHandleInput}
                        style={{ background: "#F0E7F2 " }}
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        placeholder="Please Enter Product Color"
                        label="Product Color"
                        fullWidth
                        name="color"
                        onChange={debouncedHandleInput}
                        style={{ background: "#F0E7F2 " }}
                      />
                    </Grid>


                  </Grid>
                  {" "}
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ marginTop: "2%", marginBottom: "1%" }}
                  >
                    <h3>Detailed Specifications</h3>
                  </InputLabel>
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
                    onReady={(editor) => {
                      editor.editing.view.document.on("change:data", () => { });
                    }}
                    onBlur={(event, editor) => { }}
                    onFocus={(event, editor) => { }}
                    onChange={debouncedOnChange1}
                  />
                  <br />

                  <br />
                  <br />

                  <br /> <br />
                  <Grid item xs={8} style={{ textAlign: "center" }}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      style={{ padding: "0.6rem 1.5rem", marginRight: "2rem" }}
                      onClick={() => setTabIndex(tabIndex - 1)}
                    >
                      <span style={{ marginRight: "0.2rem" }}> ⟵ </span> Prev
                    </Button> <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      style={{ padding: "0.6rem 1.5rem" }}
                      onClick={() => setTabIndex(tabIndex + 1)}
                    >
                      Next  <span style={{ marginLeft: "0.2rem" }}> ⟶ </span>
                    </Button>

                  </Grid>
                </Container>
              </div>
            </TabPanel>


            <TabPanel>
              <div>
                <Container
                  component="main"
                  rowspacing={2}
                  maxWidth="xl"
                  style={{
                    marginTop: "2%",
                    marginBottom: "2%",
                    display: "block",
                  }}
                >

                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ marginTop: "2%", marginBottom: "1%" }}
                  >
                    <h3>Technical Details</h3>
                  </InputLabel>
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
                    onReady={(editor) => {
                      editor.editing.view.document.on("change:data", () => { });
                    }}
                    onBlur={(event, editor) => { }}

                    onFocus={(event, editor) => { }}

                    onChange={debouncedOnChange3}

                  />
                  <br />

                  <br />
                  <br />

                  <br /> <br />
                  <Grid item xs={8} style={{ textAlign: "center" }}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      style={{ padding: "0.6rem 1.5rem", marginRight: "2rem" }}
                      onClick={() => setTabIndex(tabIndex - 1)}
                    >
                      <span style={{ marginRight: "0.2rem" }}> ⟵ </span> Prev
                    </Button> <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      style={{ padding: "0.6rem 1.5rem" }}
                      onClick={() => setTabIndex(tabIndex + 1)}
                    >
                      Next  <span style={{ marginLeft: "0.2rem" }}> ⟶ </span>
                    </Button>

                  </Grid>
                </Container>
              </div>
            </TabPanel>

            <TabPanel>
              <div>
                <Container
                  component="main"
                  rowspacing={2}
                  maxWidth="xl"
                  style={{
                    marginTop: "2%",
                    marginBottom: "2%",
                    display: "block",
                  }}
                >
                  <Grid container spacing={2} rowSpacing={2}>

                    <Grid item xs={6}>

                      <TextareaAutosize
                        aria-label="minimum height"
                        minRows={8}
                        placeholder=""
                        style={{ width: "100%" }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        name="tags"
                      />

                    </Grid>


                    {showSuggestions && filteredTags.length > 0 && (

                      <List style={{ cursor: "pointer", position: "absolute", zIndex: 200 }}>

                        {filteredTags.map((tag) => (

                          <ListItem button key={tag._id} onMouseDown={() => handleTagClick(tag)} style={{ cursor: "pointer" }}>

                            <ListItemText primary={tag.tagName} style={{ color: "white", background: "blue", borderRadius: "5px", padding: "0.2rem" }} />

                          </ListItem>

                        ))}

                      </List>

                    )}

                    <div style={{ marginLeft: "5%" }} >

                      <h4>Selected Tags:</h4>

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



                  </Grid>
                  {" "}

                  <br />

                  <br /> <br />
                  <Grid item xs={8} style={{ textAlign: "center" }}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      style={{ padding: "0.6rem 1.5rem", marginRight: "2rem" }}
                      onClick={() => setTabIndex(tabIndex - 1)}
                    >
                      <span style={{ marginRight: "0.2rem" }}> ⟵ </span> Prev
                    </Button> <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      style={{ padding: "0.6rem 1.5rem" }}
                      onClick={() => setTabIndex(tabIndex + 1)}
                    >
                      Next  <span style={{ marginLeft: "0.2rem" }}> ⟶ </span>
                    </Button>

                  </Grid>
                </Container>
              </div>
            </TabPanel>








            <TabPanel>
              <div>
                <Container
                  component="main"
                  rowspacing={2}
                  maxWidth="xl"
                  style={{
                    marginTop: "2%",
                    marginBottom: "2%",
                    display: "block",
                  }}
                >
                  <Grid container spacing={2} rowSpacing={2}>
                    <Grid item xs={10}>
                      <TextField
                        placeholder="Please Enter Product Price (Without Discount)"
                        label="Product Price (Without Discount)"
                        fullWidth
                        name="price"
                        onChange={debouncedHandleInput}
                        style={{ background: "#F0E7F2 " }}
                      />
                    </Grid>

                    <Grid item xs={10}>
                      <TextField
                        placeholder="Please Enter Discount (Only In Numbers, without %)"
                        label="Discount (Only In Numbers, without %)"
                        fullWidth
                        name="sellerDiscount"
                        onChange={debouncedHandleInput}
                        style={{ background: "#F0E7F2 " }}
                      />
                    </Grid>


                    <Grid item xs={10}>Effective Price
                      <TextField

                        fullWidth
                        name="effectivePrice"
                        value={"₹ " + effectivePrice}
                        readonly
                        style={{ color: "white", background: "#F0E2DE " }}
                      />
                    </Grid>

                  </Grid>
                  <br />
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ marginTop: "2%", marginBottom: "1%" }}
                  >
                    <h3>Warranty / Guarantee Details </h3> <span> (Leave It Empty If No Warranty / Guarantee Available)  </span>
                  </InputLabel>
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
                    onReady={(editor) => {
                      editor.editing.view.document.on("change:data", () => { });
                    }}
                    onBlur={(event, editor) => { }}
                    onFocus={(event, editor) => { }}
                    onChange={debouncedOnChange2}
                  />
                  <br />

                  <br />
                  <br />

                  <br /> <br />
                  <Grid item xs={8} style={{ textAlign: "center" }}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      style={{ padding: "0.6rem 1.5rem", marginRight: "2rem" }}
                      onClick={() => setTabIndex(tabIndex - 1)}
                    >
                      <span style={{ marginRight: "0.2rem" }}> ⟵ </span> Prev
                    </Button> <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      style={{ padding: "0.6rem 1.5rem" }}
                      onClick={() => setTabIndex(tabIndex + 1)}
                    >
                      Next  <span style={{ marginLeft: "0.2rem" }}> ⟶ </span>
                    </Button>
                  </Grid>
                </Container>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <Container
                  component="main"
                  rowspacing={2}
                  maxWidth="xl"
                  style={{
                    marginTop: "2%",
                    marginBottom: "2%",
                    display: "block",
                  }}
                >
                  <br />
                  <Grid item xs={8}>
                    <TextField
                      placeholder="Please Enter Total Stock Available"
                      label="Total Stock Available"
                      fullWidth
                      name="stock_available"
                      onChange={debouncedHandleInput}
                      style={{ background: "#F0E7F2 " }}
                    />
                  </Grid>
                  <Grid item xs={8}>

                    <span> Stock Next Refill Date : </span>
                    <input type="date"
                      className="p-2 mt-4 ms-4 dateTimeInput"
                      name="stockNextRefillDate"
                      onClick={debouncedHandleInput}
                      style={{ borderRadius: "5px", background: "#F0E2DE" }}
                    />

                  </Grid>

                  <br />

                  <br />

                  <br />
                  <br /> <br />
                  <Grid item xs={8} style={{ textAlign: "center" }}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      style={{ padding: "0.6rem 1.5rem", marginRight: "2rem" }}
                      onClick={() => setTabIndex(tabIndex - 1)}
                    >
                      <span style={{ marginRight: "0.2rem" }}> ⟵ </span> Prev
                    </Button> <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      style={{ padding: "0.6rem 1.5rem" }}
                      onClick={() => setTabIndex(tabIndex + 1)}
                    >
                      Next  <span style={{ marginLeft: "0.2rem" }}> ⟶ </span>
                    </Button>
                  </Grid>
                </Container>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <Container
                  component="main"
                  rowspacing={2}
                  maxWidth="xl"
                  style={{
                    marginTop: "2%",
                    marginBottom: "2%",
                    display: "block",
                  }}
                >

                  <br />
                  <Grid item xs={8}>
                    Upload Product Images  ( You can select upto 5 Product Images)<br /><br />
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Product Images
                      <input
                        multiple="multiple"
                        type="file"
                        name="images"
                        onChange={(e) => {
                          setImage1((prevImages) => [
                            ...prevImages,
                            ...e.target.files,
                          ]);
                          // setImage1(e.target.files);
                          // setImage1((prevImages) => {

                          //   const newImages = [...e.target.files];

                          //   return [...prevImages, ...newImages];

                          // });
                          console.log(image1);
                        }}
                      />
                    </Button>{" "}

                  </Grid>
                  <br /><br />
                  <Grid item xs={10}>
                    <TextField
                      placeholder="Please Enter Product Youtube Video URL"
                      label="Youtube Video URL"
                      fullWidth
                      name="youtubeUrl"
                      onChange={debouncedHandleInput}
                      style={{ background: "#F0E7F2 " }}
                    /> </Grid>
                  <br /> <br />
                  <Grid item xs={8} style={{ textAlign: "center" }}>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      style={{ padding: "0.6rem 1.5rem", background: "green" }}
                    >
                      {" "}
                      Save{" "}
                    </Button>
                  </Grid>
                </Container>
              </div>
            </TabPanel>

          </Tabs>
        </div>
      </div>
    </div >
  );
};

export default AddNewProduct;
