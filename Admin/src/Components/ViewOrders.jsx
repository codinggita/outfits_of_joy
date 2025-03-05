import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Navbar3 from "./Navbar3";

export default function ViewOrders() {
  const [ordersItems, setOrdersItems] = useState([]);
  const [category, setCategory] = useState("");
  const [counts, setCounts] = useState({
    new: 0,
    confirmed: 0,
    cancelled: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://outfits-of-joy.onrender.com/outfits-of-joy/orders");
        const data = await response.json();
        const orders = data.flatMap(user => user.orders.map(order => ({ ...order, userId: user._id }))); // Add userId to each order

        const ordersWithProducts = await Promise.all(orders.map(async (order) => {
          const productResponse = await fetch(`https://outfits-of-joy.onrender.com/outfits-of-joy/collection/${order.category}/${order.productId}`);
          const product = await productResponse.json();
          return {
            ...order,
            product,
          };
        }));

        setOrdersItems(ordersWithProducts);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const newCount = ordersItems.filter((order) => !order.status).length;
    const confirmedCount = ordersItems.filter((order) => order.status === "confirmed").length;
    const cancelledCount = ordersItems.filter((order) => order.status === "cancelled").length;
    const rejectedCount = ordersItems.filter((order) => order.status === "rejected").length;

    setCounts({
      new: newCount,
      confirmed: confirmedCount,
      cancelled: cancelledCount,
      rejected: rejectedCount,
    });
  }, [ordersItems]);

  const updateOrderStatus = async (userId, productId, status) => {
    try {
      const response = await fetch(`https://outfits-of-joy.onrender.com/outfits-of-joy/orders/${productId}/${status}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Use the userId from the order
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update order status");
      }

      toast.success("Order Updated Successfully");

      // Update the local state to reflect the new status
      setOrdersItems((prevOrders) =>
        prevOrders.map((order) =>
          order.productId === productId ? { ...order, status } : order
        )
      );
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  // Filter orders based on the selected category
  const filteredOrders = category
    ? ordersItems.filter((order) => order.status === category)
    : ordersItems.filter((order) => !order.status); // Show orders with empty status for "New Orders"

  return (
    <>
      <Navbar3 category={category} setCategory={setCategory} counts={counts} />

      <div className="mx-10 my-10">
        {filteredOrders.map((item, index) => (
          <div
            key={index}
            className="bg-gray-500 rounded-tl-2xl rounded-br-[16px] overflow-hidden shadow-[0_0_0_15px_rgba(173,46,36,0.35)] relative hover:shadow-[0_0_20px_15px_rgba(173,46,36,0.75)] mb-12"
          >
            <div className="flex font-lato text-lg">
              <img
                src={item.product.images[0]}
                alt=""
                className="h-[250px] md:h-[250px] w-50 bg-gray-300 rounded-br-[16px] border-r-4 border-[#D4A242] flex items-center justify-center"
              />
              <div className="w-full p-4 text-white">
                <div className="flex justify-between items-center gap-3">
                  <p className="font-bree w-2/3 text-[#D4A242] text-xl overflow-hidden line-clamp-1">
                    {item.product.title}
                  </p>
                  <p className="flex w-1/3 text-sm gap-2">
                    Order Id :<span className="text-sm"> {item.orderId}</span>
                  </p>
                </div>

                <div className="flex gap-4 mt-4">
                  <div>
                    <label className="text-black">Quantity:</label>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="text-sm focus:outline-none bg-[rgba(129,23,27,0.25)] text-white  rounded ml-2 w-8 text-center border-2 border-[#C75146]"
                    />
                  </div>
                  <div>
                    <label className="text-black">Size:</label>
                    <input
                      type="text"
                      value={item.size}
                      readOnly
                      className="text-sm focus:outline-none bg-[rgba(129,23,27,0.25)] text-white rounded ml-2 w-8 text-center border-2 border-[#C75146]"
                    />
                  </div>
                  <h4 className="text-black">Product Id : <span className="text-white ">{item.productId}</span></h4>
                </div>

                <div className="mt-4">
                  <div className="flex gap-4">
                    <p className="text-black">
                      Rent: <span className="text-[#D4A242] text-xl">₹{item.product.rent}</span>
                    </p>
                    <p className="text-black">
                      MRP: <span className="text-white text-xl">₹{item.product.mrp}</span>
                    </p>
                    <p className="text-black">
                      Deposited: <span className="text-[#D4A242] text-xl">₹{item.product.deposit}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <div>
                    <p className="text-black">
                      From:{" "}
                      <span className="text-white">
                        {format(new Date(item.fromDate), "dd-MM-yyyy")}
                      </span>
                    </p>
                    <p className="text-black">
                      To:{" "}
                      <span className="text-white">
                        {format(new Date(item.toDate), "dd-MM-yyyy")}
                      </span>
                    </p>
                  </div>
                  <div>
                    {!item.status && (
                      <div>
                        <button
                          onClick={() => updateOrderStatus(item.userId, item.productId, "confirmed")}
                          className="bg-[#C75146] text-black px-4 py-2 rounded-2xl border-[#D4A242] border-3 mr-4 active:scale-90 transition-all duration-150 cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateOrderStatus(item.userId, item.productId, "rejected")}
                          className="bg-white text-black px-4 py-2 rounded-2xl border-[#D4A242] border-3 active:scale-90 transition-all duration-150 cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}