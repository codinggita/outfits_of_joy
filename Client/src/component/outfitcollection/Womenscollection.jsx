import React, { useEffect, useRef, useState } from "react";
import './Womenscollection.css'
import Filternavmen from "../extra component/Filternavmen";
import { fetchCollection } from "./api";


export default function Womenscollection() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const isInitialLoad = useRef(true);
    const observerRef = useRef(null);
    const currentPath = location.pathname.split('/').pop();
    const category = currentPath.replace('/', '');

    const limit = 8;

    useEffect(() => {
        if (isInitialLoad.current) {
            loadData();
            isInitialLoad.current = false;
        }
    }, []);

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


    return (
        <>
            <main id='outfitmain'>
                <div id='outfitpage' >
                    <Filternavmen />
                </div>
                <div id="outfitsection2">
                    {data.length > 0 && data.map((item, index) => (
                        <div id="outfits" key={index}>
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
                    ))}
                    {loading && (
                        <p id="spinner" style={{ textAlign: "center", padding: "1rem" }}><span class="loader"></span></p>
                    )}
                    <div ref={observerRef} style={{ height: "1px" }}></div>
                </div>
            </main>
        </>
    )
}
