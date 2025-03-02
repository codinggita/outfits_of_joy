import React, { useState } from "react";
import OutfitForm from "./OutfitForm";

const Navbar2 = ({ category, setCategory }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <div
      className="py-2.5 px-4 sm:px-8 rounded-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0"
      style={{
        background:
          "linear-gradient(45deg, rgba(173, 46, 36, 0.5), rgba(255, 181, 175, 0.5))",
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center">
        <label className="font-bree text-sm sm:text-base">
          Select Category :-
        </label>
        <select
          className="ml-2 sm:ml-4 bg-[#c2837f] border-2 sm:border-3 border-[#C75146] rounded-[10px] font-bree focus:outline-none p-1 text-sm sm:text-base"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="sherwani">Sherwani</option>
          <option value="indo-western">Indo-Western</option>
          <option value="tuxedo">Tuxedo</option>
          <option value="lehenga">Lehenga</option>
          <option value="anarkali">Anarkali</option>
          <option value="gown">Gown</option>
        </select>
      </div>
      <div>
        <button onClick={() => setShowModal(true)} className="bg-white border-2 sm:border-3 border-[#D4A242] px-2 sm:px-4 py-1 rounded-[10px] active:scale-90 transition-all duration-150 text-sm sm:text-base">
          Add New Outfit
        </button>
      </div>
    </div>

    {showModal && <OutfitForm onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar2;