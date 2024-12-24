import PropTypes from 'prop-types';

const FilterSidebar = ({

    filters,

    handleFilterChange,

    handleRatingFilterChange,

    minVal,

    maxVal,

    handleMinChange,

    handleMaxChange,

    includeOutOfStock,

    isCumulativeRating,

    toggleCumulativeRating


}) => {

    return (
        <>


            <div className="product-list-sidebar">


                <div style={{ marginTop: "0rem" }}>

                    <span style={{ marginLeft: "3rem", marginTop: "0rem", fontWeight: "bold" }}> Types Filter:  </span>

                    <hr />

                    <br />

                    <label>

                        <input

                            type="checkbox"

                            name="isNewProduct"

                            checked={filters.isNewProduct}

                            onChange={handleFilterChange}

                        />

                        New Product

                    </label>

                </div>


                <div>

                    <label>

                        <input

                            type="checkbox"

                            name="refurbished"

                            checked={filters.refurbished}

                            onChange={handleFilterChange}

                        />

                        Refurbished

                    </label>

                </div>


                <div>

                    <label>

                        <input

                            type="checkbox"

                            name="isPremium"

                            checked={filters.isPremium}

                            onChange={handleFilterChange}

                        />

                        Premium

                    </label>

                </div>


                <div>

                    <label>

                        <input

                            type="checkbox"

                            name="isLimitedTimeDeal"

                            checked={filters.isLimitedTimeDeal}

                            onChange={handleFilterChange}

                        />

                        Limited Time Deal

                    </label>

                </div>


                <div>

                    <label>

                        <input

                            type="checkbox"

                            name="isPopular"

                            checked={filters.isPopular}

                            onChange={handleFilterChange}

                        />

                        Popular

                    </label>

                </div>


                <hr style={{ marginTop: "3rem" }} />


                <div style={{ textAlign: "center", marginTop: "1rem", marginBottom: "0rem" }}>

                    <span style={{ fontWeight: "bold" }}> Price Range:  </span>

                    <hr />

                    <br />

                    <div className="range-slider">

                        <input

                            type="range"

                            min="0"

                            max="100"

                            value={minVal}

                            onChange={handleMinChange}

                            className="price-slider"

                        />

                        <input

                            type="range"

                            min="0"

                            max="100"

                            value={maxVal}

                            onChange={handleMaxChange}

                            className="price-slider"

                        />

                        <div className="values">

                            <span>Min: {minVal}</span>

                            <span>Max: {maxVal}</span>

                        </div>

                    </div>

                </div>
                <hr />

                <div style={{ textAlign: "center", marginTop: "2rem", marginBottom: "-2rem" }}>

                    <span style={{ fontWeight: "bold" }}> Strict Rating:
                        <label className='rating-filter-switch' style={{ display: "inline-flex", marginBottom: "-10px" }}>
                            <input
                                className='rating-filter-checkbox'

                                type="checkbox"

                                checked={isCumulativeRating}

                                onChange={toggleCumulativeRating}

                            />
                            <span className="rating-filter-slider"></span>
                        </label>
                    </span>


                    {/* {isCumulativeRating ? "On" : "Off"} */}

                    <hr />

                    <br />

                    <label style={{ marginTop: "-2rem", textAlign: "center" }}>


                        {[...Array(5)].map((_, index) => (

                            <span key={index} onClick={() => handleRatingFilterChange(index + 1)} style={{ cursor: 'pointer', fontSize: "30px" }}>

                                <i className="fas fa-star" style={{ color: index < filters.rating ? "yellow" : "lightgray" }}></i>

                            </span>

                        ))}

                    </label>

                </div>


                <hr style={{ marginTop: "3rem" }} />


                <div style={{ textAlign: "center", marginTop: "1rem", marginBottom: "-2rem" }}>

                    <span style={{ fontWeight: "bold" }}> Availability:  </span>

                    <hr />

                    <br />

                    <label style={{ marginLeft: "-2.5rem", marginTop: "-2rem" }}>

                        <input

                            type="checkbox"

                            name="includeOutOfStock"

                            checked={includeOutOfStock}

                            onChange={handleFilterChange}

                        />

                        Include Out Of Stock

                    </label>

                </div>

            </div >
        </>



    );

};


FilterSidebar.propTypes = {

    filters: PropTypes.object.isRequired,

    handleFilterChange: PropTypes.func.isRequired,

    handleRatingFilterChange: PropTypes.func.isRequired,

    minVal: PropTypes.number.isRequired,

    maxVal: PropTypes.number.isRequired,

    handleMinChange: PropTypes.func.isRequired,

    handleMaxChange: PropTypes.func.isRequired,

    includeOutOfStock: PropTypes.bool.isRequired,


    isCumulativeRating: PropTypes.bool.isRequired,

    toggleCumulativeRating: PropTypes.func.isRequired

};


export default FilterSidebar;