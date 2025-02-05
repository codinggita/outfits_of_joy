import React, { useEffect, useRef, useState } from "react";
import './Sherwani.css'
import img1 from '../../assets/s1.png'
import Filternavmen from "../extra component/Filternavmen";
import { fetchCollection } from "./api";
export default function Sherwani() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const isInitialLoad = useRef(true);

    const limit = 8;

    useEffect(() => {
        if (isInitialLoad.current) {
            loadData();
            isInitialLoad.current = false;
        }
    }, []);

    const loadData = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        try {
            const result = await fetchCollection("sherwani", page, limit);
            if (result.length < limit) setHasMore(false);
            setData((prevData) => [...prevData, ...result]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error(`Error loading ${Sherwani} data:`, error);
        } finally {
            setLoading(false);
        }
    };
    console.log(data)

    return (
        <>
            <main id='outfitmain'>
                <div id='sherwanipage' >
                    <Filternavmen />
                </div>
                <div id="outfitsection">
                    <div id="outfits">
                        <div id="outfitimage">
                            <img src={img1} alt="" />
                        </div>
                        <div id="outfitinfo">
                            <p id="outfittitle">Gold Jacquard Silk dfasfas adf</p>
                            <div>
                                <p id="outfitrent"><sup>Rent</sup><span>₹7,999</span></p>
                                <p id="outfitmrp"><sup>Mrp</sup><span>₹68,999</span></p>
                            </div>
                        </div>
                    </div>
                    <div id="outfits">
                        <div id="outfitimage">
                            <img src={img1} alt="" />
                        </div>
                    </div>
                    <div id="outfits">
                        <div id="outfitimage">
                            <img src={img1} alt="" />
                        </div>
                    </div>
                    <div id="outfits">
                        <div id="outfitimage">
                            <img src={img1} alt="" />
                        </div>
                    </div>
                    <div id="outfits">
                        <div id="outfitimage">
                            <img src={img1} alt="" />
                        </div>
                    </div>
                </div>
                <div id="morebutton">
                    {hasMore ? (
                        <button onClick={loadData} disabled={loading} id="loadmorebtn">
                            {loading ? "Loading..." : "Load More"}
                        </button>
                    ) : (
                        null
                    )}
                </div>
            </main>
        </>
    )
}
