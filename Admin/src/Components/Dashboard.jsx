import React from 'react';
import sales from '../assets/sales.png';
import profit from '../assets/profit.png';
import totalvisit from '../assets/totalvisit.png';

export default function Dashboard() {
  return (
    <div>
      {/* First Row: Sales and Profit Images */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-12 p-4">
        <img
          src={sales}
          alt="Sales"
          className="w-full md:w-[45%] lg:w-[47%] xl:w-[50%] rounded-lg shadow-lg"
        />
        <img
          src={profit}
          alt="Profit"
          className=" mt-6 w-full md:w-[45%] lg:w-[47%] md:mt-0 xl:w-[50%] rounded-lg shadow-lg "
        />
      </div>

      {/* Second Row: Total Visit Image */}
      <div className="my-6 md:my-10 flex justify-center p-4">
        <img
          src={totalvisit}
          alt="Total Visits"
          className="w-full md:w-[80%] lg:w-[70%] rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}