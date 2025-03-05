import React, { useEffect, useState } from "react";
import { PiDotsThreeCircleVerticalDuotone } from "react-icons/pi";
import { fetchCollection } from "./Api";
import Navbar2 from "./Navbar2";
import { PiEmptyBold } from "react-icons/pi";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import UpdateOutfitsform from "./UpdateOutfitsform";
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function OutfitsUpdate() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("sherwani");
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const collectionData = await fetchCollection(category);
        setData(collectionData.reverse());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const handleOutOfStock = async (id) => {
    confirmAlert({
      title: 'Confirm to mark as out of stock',
      message: 'Are you sure you want to mark this outfit as out of stock?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              console.log('Sending PATCH request to update stock to 0 for ID:', id);
              const response = await axios.patch(
                `https://outfits-of-joy.onrender.com/outfits-of-joy/collection/${category}/${id}`,
                { stock: 0 }
              );

              console.log('Response from backend:', response);

              if (response.status === 200) {
                setData((prevData) =>
                  prevData.map((item) =>
                    item._id === id ? { ...item, stock: 0 } : item
                  )
                );
                toast.success('Outfit marked as out of stock!');
              }
            } catch (err) {
              console.error('Error updating stock:', err);
              toast.error('Failed to update stock. Please try again.');
            }
          },
        },
        {
          label: 'No',
          onClick: () => { }, 
        },
      ],
    });
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-white rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  const handleDelete = async (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this outfit?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await fetch(
                `https://outfits-of-joy.onrender.com/outfits-of-joy/collection/${category}/${id}`,
                { method: 'DELETE' }
              );

              if (!response.ok) {
                throw new Error(`Failed to delete outfit: ${response.statusText}`);
              }

              setData((prevData) => prevData.filter((item) => item._id !== id));
              toast.success('Outfit deleted successfully');
            } catch (error) {
              toast.error('Error deleting outfit');
            }
          },
        },
        {
          label: 'No',
          onClick: () => { },
        },
      ],
    });
  };

  return (
    <>
      <Navbar2 category={category} setCategory={setCategory} />

      <div id="outfitmain" className="my-8 sm:my-12">
        <div
          id="outfitsection"
          className="bg-gradient-to-br rounded-3xl mx-4 sm:mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"
        >
          {data.map((item, index) => (
            <div key={index}
              id="outfits"
              className="bg-gray-500 rounded-tl-2xl rounded-br-[16px] overflow-hidden h-[550px] w-full shadow-[0_0_0_15px_rgba(173,46,36,0.35)] relative hover:shadow-[0_0_20px_15px_rgba(173,46,36,0.75)]"
            >
              <div
                id="favouriteicon"
                className="absolute top-2 right-2 text-4xl text-[rgb(173,46,36)] cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownVisible(dropdownVisible === item._id ? null : item._id);
                }}
              >
                <PiDotsThreeCircleVerticalDuotone />
              </div>
              {dropdownVisible === item._id && (
                <div className="absolute top-14 right-2 rounded-lg grid w-10 justify-center items-center gap-y-4 shadow-xl bg-[rgba(255,255,255,0.3)] shadow-black">
                  <button onClick={() => handleOutOfStock(item._id)} aria-label="out of stock" className="hint--left hint--bounce flex items-center gap-2 w-full px-2 py-1 text-amber-500 hover:bg-gray-400 text-3xl cursor-pointer">
                    <PiEmptyBold />
                  </button>
                  <button onClick={() => setShowModal({ show: true, category, id: item._id })} aria-label="Edit Outfit" className="hint--left hint--bounce flex items-center gap-2 w-full px-2 py-1 text-green-700 hover:bg-gray-400 text-3xl cursor-pointer">
                    <MdModeEdit />
                  </button>
                  <button aria-label="Delete Outfit" onClick={() => handleDelete(item._id)} className="hint--left hint--bounce flex items-center gap-2 w-full px-2 py-1 text-red-500 hover:bg-gray-400 text-3xl cursor-pointer">
                    <RiDeleteBin6Line />
                  </button>
                </div>
              )}
              {item.stock == 0 ? <div className="absolute top-[40%] w-full font-lato text-center text-red-800 text-xl bg-white p-1">Out of stock</div> : null}
              <div
                id="outfitimage"
                className="border-b-4 border-[#D4A242] rounded-br-[16px]"
              >
                <div
                  className="h-[250px] md:h-[450px] bg-gray-300 rounded-br-[16px]"
                  style={{
                    backgroundImage: `url(${item.images[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
              <div id="outfitinfo" className="w-full p-4">
                <p
                  id="outfittitle"
                  className="font-bree text-[#D4A242] text-xl w-full text-center overflow-hidden line-clamp-1"
                >
                  {item.title}
                </p>
                <div className="flex gap-4 justify-center mt-4 font-lato">
                  <p id="outfitrent" className="font-lato flex">
                    <span className="text-white ">Rent</span>
                    <span className="text-xl ml-1 text-[#FBE496]">
                      ₹{item.rent}
                    </span>
                  </p>
                  <p id="outfitmrp" className="font-lato flex">
                    <span className="text-white ">Mrp</span>
                    <span className="text-xl ml-1 line-through decoration-red-500 decoration-2">₹{item.mrp}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
          {showModal.show && (
            <UpdateOutfitsform
              category={showModal.category}
              outfitId={showModal.id}
              onClose={() => setShowModal({ show: false, category: null, id: null })}
            />
          )}
        </div>
      </div>
    </>
  );
}