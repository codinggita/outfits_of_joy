import React, { useEffect, useState } from "react";
import './Filternavmen.css'
import {fetchTotalCount} from '../outfitcollection/api'

function Filternavmen() {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const currentPath = location.pathname;
    const heading = currentPath;
    const category = heading.replace('/', '');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const total = await fetchTotalCount(category);
                setTotalCount(total);
            } catch (error) {
                console.error("Error fetching total count:", error);
            }
        };
        fetchData();

    }, []);

    const handleApplyFilter = () => {
        setIsOverlayOpen(false);
    };

    console.log({category})
    return (
        <>
            <div id='infonav'>
                <div id="pagename">
                    <p>{heading}</p>
                </div>
                <div id="outfitresults">
                    <p>{totalCount} Results</p>
                </div>
                <div id="outfitsort">
                    <label><span>Sort By:-</span>
                        <select>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="Price: Low to High">Price: Low to High</option>
                            <option value="Price: high to Low">Price: high to Low</option>
                        </select>
                    </label>
                </div>
                <div>
                    <button
                        onClick={() => setIsOverlayOpen(true)}
                        className="filter-btn"
                    >
                        Filter by Price
                    </button>

                    {isOverlayOpen && (
                        <div className="overlay" onClick={() => setIsOverlayOpen(false)}>
                            <div
                                className="overlay-content"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2>Select Price Range</h2>
                                <div className="form-group">
                                    <label>Min Price:</label>
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Max Price:</label>
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                    />
                                </div>
                                <div className="actions">
                                    <button
                                        onClick={() => setIsOverlayOpen(false)}
                                        className="cancel-btn"
                                    >
                                        Cancel
                                    </button>
                                    <button onClick={handleApplyFilter} className="apply-btn">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Filternavmen