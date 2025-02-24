import React, { useEffect, useState } from "react";
import Filternavmen from "../extra component/Filternavmen";
import { Link, useLocation } from 'react-router-dom';
import { fetchmensCollections } from "../outfitcollection/api.js";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import useFavorites from "../Hooks/useFavorites.jsx"

export default function Allmensoutfit() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortOrder, setSortOrder] = useState("none");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    const category = currentPath.replace('/', '');
    const { favourites, toggleFavourite } = useFavorites();

    // Load all data once
    useEffect(() => {
        loadData();
    }, []);

    // Update filtered data when any of these states change
    useEffect(() => {
        const sortedAndFiltered = applySortAndFilter();
        setFilteredData(sortedAndFiltered);
    }, [data, sortOrder, minPrice, maxPrice]);

    const loadData = async () => {
        setLoading(true);
        try {
            // Fetch all data without pagination
            const result = await fetchmensCollections(1, 1000); // Use a large limit to get all data
            result.sort(() => Math.random() - 0.5);
            setData(result);
        } catch (error) {
            console.error(`Error loading ${category} data:`, error);
        } finally {
            setLoading(false);
        }
    };

    const applySortAndFilter = () => {
        let updatedData = [...data];

        // Apply filters (minPrice and maxPrice)
        if (minPrice !== "" && maxPrice !== "") {
            updatedData = updatedData.filter(
                (item) => item.rent >= minPrice && item.rent <= maxPrice
            );
        }

        // Apply sorting
        if (sortOrder === "A-Z") {
            updatedData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === "Z-A") {
            updatedData.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOrder === "Price: Low to High") {
            updatedData.sort((a, b) => a.rent - b.rent);
        } else if (sortOrder === "Price: High to Low") {
            updatedData.sort((a, b) => b.rent - a.rent);
        }

        return updatedData;
    };


    return (
        <>
            <main id='outfitmain'>
                <div id='outfitpage'>
                    <Filternavmen
                        onSortChange={setSortOrder}
                        onFilterChange={({ min, max }) => {
                            setMinPrice(min);
                            setMaxPrice(max);
                        }}
                        alloutfitsCount={filteredData.length}
                    />
                </div>
                <div id="outfitsection">
                    {filteredData.length > 0 && filteredData.map((item, index) => (
                        <Link to={`/Malecollection/${item.category}/${item._id}`} key={index}>
                            <div id="outfits" key={index}>
                                <div id="favouriteicon" onClick={(e) => {
                                    e.preventDefault();
                                    toggleFavourite(item._id);
                                }}>
                                    {favourites.has(item._id) ? <FaHeart color="rgb(173, 46, 36)" /> : <FaRegHeart />}
                                </div>
                                <div id="outfitimage">
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
                    ))}
                    {loading && (
                        <p id="spinner" style={{ textAlign: "center", padding: "1rem" }}>
                            <span className="loader"></span>
                        </p>
                    )}
                </div>
            </main>
        </>
    )
};
