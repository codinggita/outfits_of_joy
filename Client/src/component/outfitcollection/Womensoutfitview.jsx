import React, { useEffect, useState } from 'react'
import { fetchProduct } from './api'
import { useParams } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { addDays, format } from 'date-fns';
import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import RelatedProducts from '../Cardslider/RelatedProducts';
import 'react-datepicker/dist/react-datepicker.css';
import './Womensoutfitview.css'

function Womensoutfitview() {
    const { category, id } = useParams();  // Get params from URL
    const [product, setProduct] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [showSizeChart, setShowSizeChart] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            const data = await fetchProduct(category, id);
            setProduct(data);
            setSelectedImage(data.images[0]);
        };

        getProduct();
    }, [category, id]);

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    const formatDate = (date) => {
        return date ? format(date, 'dd-MM-yyyy') : '';
    };

    const toggleSizeChart = () => {
        setShowSizeChart((prev) => !prev);
    };

    const closeSizeChart = (event) => {
        if (event.target.id !== 'view-size-chart' && !event.target.closest('#size-chart')) {
            setShowSizeChart(false);
        }
    };

    React.useEffect(() => {
        document.body.addEventListener('click', closeSizeChart);
        return () => {
            document.body.removeEventListener('click', closeSizeChart);
        };
    }, []);

    return (
        <>
            <div id='productview'>
                <div id='product2'>
                    <div className="gallery-container">
                        {product && product.images ? (
                            <>
                                <div className="thumbnail-container">
                                    {product.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
                                            onClick={() => handleThumbnailClick(image)}
                                        />
                                    ))}
                                </div>

                                <div className="main-image-container">
                                    <img
                                        src={selectedImage}
                                        alt="Selected"
                                        className="main-image"
                                    />
                                </div>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div id='productinfo'>
                        <div id='titlepart'>
                            <p>{product?.title}</p>
                            <div><FaRegHeart /></div>
                        </div>
                        <div id='aboutproduct'>
                            <div id='productprice'>
                                <p id="productrent"><sup>Rent</sup><span id='rentproduct'>₹{product?.rent}</span><span>For 4 days</span></p>
                                <p id="productmrp"><sup>Mrp</sup><span id='mrpproduct'>₹{product?.mrp}</span></p>
                            </div>
                            <div>
                                <p id="productdeposit"><sup>Deposit</sup><span id='rentproduct'>₹{product?.deposit}</span><span>refundable</span><span id='refundinfo'><FaInfoCircle title="Remaining Extra Money will be Refund with in 7 days of return" /></span></p>
                            </div>
                            <div id='productsizes'>
                                <label>Size: </label>
                                <select>
                                    {product?.sizes?.map((size, index) => (
                                        <option key={index} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                                <span id="view-size-chart" onClick={toggleSizeChart}>View Size Chart</span>

                                {showSizeChart && (
                                    <div id="size-chart" style={{ marginTop: '10px', border: '1px solid #ddd', padding: '10px' }}>
                                        <h3>Women's Size Chart</h3>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Size</th>
                                                    <th>Chest</th>
                                                    <th>Waist</th>
                                                    <th>Hip</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>S</td>
                                                    <td>33"-35"</td>
                                                    <td>27"-29"</td>
                                                    <td>36"-38"</td>
                                                </tr>
                                                <tr>
                                                    <td>M</td>
                                                    <td>35"-37"</td>
                                                    <td>29"-31"</td>
                                                    <td>38"-40"</td>
                                                </tr>
                                                <tr>
                                                    <td>L</td>
                                                    <td>37"-39"</td>
                                                    <td>31"-33"</td>
                                                    <td>40"-42"</td>
                                                </tr>
                                                <tr>
                                                    <td>XL</td>
                                                    <td>39"-41"</td>
                                                    <td>33"-35"</td>
                                                    <td>42"-44"</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            <div id='datecontainer'>
                                <label>From :</label>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    minDate={new Date()}
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="Choose Date"
                                    id='datepicker'
                                />
                                <label id='tolabel'>to :</label>
                                <input type="text" id='todateshow' value={formatDate(addDays(selectedDate, 4))} readOnly />
                            </div>
                            <div id='productsizes'>
                                <label>Quantity :</label>
                                <select>
                                    {Array.from({ length: product?.stock }).map((_, index) => (
                                        <option key={index} value={index + 1}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div id='orderbuttons'>
                                <button id='rentnowbutton'>Rent Now</button>
                                <button>Add To Cart <IoMdCart /></button>
                            </div>
                            <div id='additionalinfo'>
                                <h4>Hygiene and Care</h4>
                                <p>All our outfits are sanitized and dry cleaned by us prior to delivery. If you must, please get it professional steam ironed only.</p>
                                <h4>Deposit and Refund</h4>
                                <p>While booking you have to pay Deposit money. If you cancel our order we will refund you within 7 working day. </p>
                                <h4>Note</h4>
                                <p>Book before its is too late. With in 25-30day before need. Visit store for trail.</p>
                            </div>
                        </div>
                    </div>
                    <div id='outfitdiscription'>
                        <h3>PRODUCT DESCRIPTION:</h3>
                        <p>{product?.description}</p>
                    </div>
                    <div id='outfitrating'>
                        <h4>Ratings & Reviews</h4>
                        <p>3.5 <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt /> <FaRegStar /></p>
                        <p id='reviewsection'>Read reviews(5)<IoIosArrowDown /></p>
                    </div>
                </div>
            </div>
            <RelatedProducts />
        </>
    )
}

export default Womensoutfitview