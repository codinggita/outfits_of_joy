import React, { useEffect, useRef, useState } from "react";
import Filternavmen from "../extra component/Filternavmen";
import './Indowestern.css'
import { fetchCollection } from "./api";

function Indowestern() {
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
      const result = await fetchCollection("indo-western", page, limit);
      if (result.length < limit) setHasMore(false);
      setData((prevData) => [...prevData, ...result]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(`Error loading ${Sherwani} data:`, error);
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
        <div id="outfitsection">
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
          <div id="morebutton">
            {hasMore ? (
              <button onClick={loadData} disabled={loading} id="loadmorebtn">
                {loading ? "Loading..." : "Load More"}
              </button>
            ) : (
              null
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default Indowestern