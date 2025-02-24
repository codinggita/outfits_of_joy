import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchmensCollections } from "../outfitcollection/api.js";
import { PiArrowCircleLeftDuotone } from "react-icons/pi";
import { PiArrowCircleRightDuotone } from "react-icons/pi";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import useFavorites from "../Hooks/useFavorites.jsx"

const MoreProductsmen = () => {
    const { category, id } = useParams();
    const [data, setData] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const sliderRef = useRef(null);
    const { favourites, toggleFavourite } = useFavorites();


    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (sliderRef.current) {
            const container = sliderRef.current;
            setMaxScroll(container.scrollWidth - container.clientWidth);

            const handleScroll = () => {
                setScrollPosition(container.scrollLeft);
            };

            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, [data]);

    const loadData = async () => {
        try {
            const result = await fetchmensCollections(1, 1000);
            result.sort(() => Math.random() - 0.5);
            setData(result);
        } catch (error) {
            console.error(`Error loading ${category} data:`, error);
        }
    };

    const handleNext = () => {
        const container = sliderRef.current;
        const cardWidth = container.querySelector("#outfits01").offsetWidth;
        const gap = 16;
        const scrollAmount = (cardWidth + gap) * 4; // Scroll by 4 cards

        container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            behavior: "smooth"
        });
    };

    const handlePrev = () => {
        const container = sliderRef.current;
        const cardWidth = container.querySelector("#outfits01").offsetWidth;
        const gap = 16;
        const scrollAmount = (cardWidth + gap) * 4;

        container.scrollTo({
            left: container.scrollLeft - scrollAmount,
            behavior: "smooth"
        });
    };

    const isAtStart = scrollPosition === 0;
    const isAtEnd = scrollPosition >= maxScroll;

    return (
        <>
            <h1 id="relatedProducts">More Products</h1>
            <div id="outfitsection01">
                {!isAtStart && (
                    <button className="slider-btn prev-btn" onClick={handlePrev}>
                        <PiArrowCircleLeftDuotone />
                    </button>
                )}
                <div className="slider" ref={sliderRef}>
                    {data.length > 0 && data
                        .filter(item => item._id !== id) // Exclude the current item
                        .map((item, index) => (
                            <Link to={`/Malecollection/${item.category}/${item._id}`} key={index}>
                                <div id="outfits01" key={index}>
                                    <div id="favouriteicon" onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavourite(item._id);
                                    }}>
                                        {favourites.has(item._id) ? <FaHeart color="rgb(173, 46, 36)" /> : <FaRegHeart />}
                                    </div>
                                    <div id="outfitimage01">
                                        <img src={item.images[0]} alt="" />
                                    </div>
                                    <div id="outfitinfo">
                                        <p id="outfittitle">{item.title}</p>
                                        <div>
                                            <p id="outfitrent"><sup>Rent</sup><span>₹{item.rent}</span></p>
                                            <p id="outfitmrp"><sup>Mrp</sup><span>₹{item.mrp}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                {!isAtEnd && (
                    <button className="slider-btn next-btn" onClick={handleNext}>
                        <PiArrowCircleRightDuotone />
                    </button>
                )}
            </div>
        </>
    );
};

export default MoreProductsmen;