import React from "react";

const Navbar3 = ({ category, setCategory, counts }) => {

  const getResultCount = () => {
    switch (category) {
      case "confirmed":
        return counts.confirmed;
      case "cancelled":
        return counts.cancelled;
      case "rejected":
        return counts.rejected;
      default:
        return counts.new; // Default to "New Orders"
    }
  };

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
            View Orders :-
          </label>
          <select
            className="cursor-pointer ml-2 sm:ml-4 bg-[#c2837f] border-2 sm:border-3 border-[#C75146] rounded-[10px] font-bree focus:outline-none p-1 text-sm sm:text-base"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">New Orders</option>
            <option value="confirmed">Confirmed Orders</option>
            <option value="rejected">Rejected Orders</option>
            <option value="cancelled">Cancelled Orders</option>
          </select>
        </div>
        <div className="flex items-center">
          <label className="font-bree text-sm sm:text-base">
            Results :
          </label>
          <input
            type="text"
            readOnly
            value={getResultCount()}
            className="w-10 ml-2 sm:ml-4 bg-[#c2837f] border-2 sm:border-3 border-[#C75146] rounded-[10px] font-bree focus:outline-none p-1 text-sm sm:text-base text-center"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar3;