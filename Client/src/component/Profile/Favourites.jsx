import React, { useEffect, useState } from "react";
import "./Favourites.css";
import Profilenav from "./Profilenav";
import { Link } from "react-router-dom";
import { fetchProduct } from "../outfitcollection/api.js";
import useFavorites from "../Hooks/useFavorites.jsx";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

function Favourites() {
    const [productDetails, setProductDetails] = useState([]);
    const { favourites, toggleFavourite } = useFavorites();

    useEffect(() => {
        const favouriteArray = Array.from(favourites); // Convert Set to Array
        if (favouriteArray.length > 0) {
            fetchFavouriteProducts(favouriteArray);
        }
    }, [favourites]); // Re-fetch when favorites change

    const getCategory = (productId) => {
        const categoryMap = {
            i: "Indo-western",
            s: "Sherwani",
            t: "Tuxedo",
            l: "Lehenga",
            g: "Gown",
            a: "Anarkali",
        };
        const categoryKey = productId.charAt(0).toLowerCase(); // Get the first letter
        return categoryMap[categoryKey]; // Default to "Unknown" if not found
    };

    const fetchFavouriteProducts = async (favouriteArray) => {
        try {
            const productRequests = favouriteArray.map(async (productId) => {
                const category = getCategory(productId);
                return fetchProduct(category, productId);
            });

            const productResults = await Promise.all(productRequests);
            setProductDetails(productResults);
        } catch (error) {
            console.error("Error fetching favourite products:", error);
        }
    };

    return (
        <>
            <div id="profileview">
                <Profilenav />
                <h2 id="Personalinfo" style={{marginBottom:"0"}}>Favourites :</h2>
                <div id="outfitsection" style={{ background: "none", border: "none", rowGap: "12vh",  columGap: "5vw", marginTop:"0"}}>
                    {productDetails.length > 0 ? (
                        productDetails.map((item, index) => (
                            <Link to={`/${item.gender === 'women' ? 'Femalecollection' : 'Malecollection'}/${item.category}/${item._id}`}>
                                <div id="outfits">
                                    <div id="favouriteicon" onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavourite(item._id);
                                    }}>
                                        {favourites.has(item._id) ? <FaHeart color="rgb(173, 46, 36)" /> : <FaRegHeart />}
                                    </div>
                                    <div id="outfitimage">
                                        <img src={item.images[0]} alt={item.title} />
                                    </div>
                                    <div id="outfitinfo">
                                        <p id="outfittitle">{item.title}</p>
                                        <div>
                                            <p id="outfitrent">
                                                <sup>Rent</sup>
                                                <span>₹{item.rent}</span>
                                            </p>
                                            <p id="outfitmrp">
                                                <sup>Mrp</sup>
                                                <span>₹{item.mrp}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p style={{ gridColumn: "span 4" }}><p id="spinner" style={{ textAlign: "center", padding: "1rem" }}><span className="loader" style={{ backgroundColor: "rgb(245, 193, 145)" }}></span></p>.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Favourites;
