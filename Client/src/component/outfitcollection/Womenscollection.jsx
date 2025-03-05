import React, { useEffect, useRef, useState } from "react";
import './Womenscollection.css'
import Filternavwomen from "../extra component/Filternavwomen";
import { Link } from 'react-router-dom'
import { fetchCollection } from "./api";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import useFavorites from "../Hooks/useFavorites.jsx"


export default function Menscollection() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [sortOrder, setSortOrder] = useState("none");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);
    const isInitialLoad = useRef(true);
    const currentPath = location.pathname.split('/').pop();
    const category = currentPath.replace('/', '');
    const { favourites, toggleFavourite } = useFavorites();

    const limit = 5000;

    useEffect(() => {
        if (isInitialLoad.current) {
            loadData();
            isInitialLoad.current = false;
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        const sortedAndFiltered = applySortAndFilter();
        setFilteredData(sortedAndFiltered);
    }, [data, sortOrder, minPrice, maxPrice, category]);

    useEffect(() => {
        if (!hasMore || loading) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadData();
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [hasMore, loading]);

    const loadData = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        try {
            const result = await fetchCollection(category, page, limit);
            if (result.length < limit) setHasMore(false);
            setData((prevData) => [...prevData, ...result]);
            setPage((prevPage) => prevPage + 1);
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
                <div id='outfitpage' >
                    <Filternavwomen onSortChange={setSortOrder}
                        onFilterChange={({ min, max }) => {
                            setMinPrice(min);
                            setMaxPrice(max);
                        }}
                        alloutfitsCount={filteredData.filter((item) => item.stock >= 1).length}
                    />
                </div>
                <div id="outfitsection2">
                    {filteredData.length > 0 && filteredData.filter((item) => item.stock >= 1).map((item, index) => (

                        <Link to={`/femalecollection/${item.category}/${item._id}`} key={index}>
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
                                        <p id="outfitrent">Rent<span>₹{item.rent}</span></p>
                                        <p id="outfitmrp">Mrp<span>₹{item.mrp}</span></p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {loading && (
                        <p id="spinner" style={{ textAlign: "center", padding: "1rem" }}><span className="loader"></span></p>
                    )}
                    <div ref={observerRef} style={{ height: "1px" }}></div>
                </div>
            </main>
        </>
    )
}
