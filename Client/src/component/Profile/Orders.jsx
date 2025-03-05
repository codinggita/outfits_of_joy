import React, { useEffect, useState } from 'react';
import Profilenav from './Profilenav';
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import useFavorites from "../Hooks/useFavorites.jsx";
import { FaInfoCircle } from "react-icons/fa";
import { useUser } from "../UserContext.jsx";
import './Orders.css';
import { ordersdetails, cancelOrder } from './Api.js';
import { fetchProduct } from '../outfitcollection/api.js';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-toastify";


function Orders() {
  const { userId } = useUser();
  const [orderData, setOrderData] = useState([]);
  const [products, setProducts] = useState({});
  const { favourites, toggleFavourite } = useFavorites();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await ordersdetails(userId);
        if (data) {
          setOrderData(data);
          const productRequests = data.map(async (order) => {
            const productData = await fetchProduct(order.category, order.productId);
            return { productId: order.productId, data: productData };
          });

          const productResults = await Promise.all(productRequests);
          const productMap = productResults.reduce((acc, item) => {
            acc[item.productId] = item.data;
            return acc;
          }, {});
          setProducts(productMap);
        } else {
          console.error("No orders found");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (userId) getOrders();

  }, [userId]);

  const handleCancelOrder = async (orderId, productId, status) => {
    confirmAlert({
      title: "Are you sure?",
      message: "Do you really want to cancel this order? This action cannot be undone.",
      buttons: [
        {
          label: "Yes, Cancel",
          onClick: async () => {
            try {
              const response = await cancelOrder(userId, productId, status);
              console.log(response.message)
              if (response.message === "Order status updated to 'cancelled' successfully") {
                setOrderData((prevOrders) =>
                  prevOrders.map((order) =>
                    order.orderId === orderId ? { ...order, status } : order
                  )
                );
              }
              toast.success("Order cancelled successfully!")
            } catch (error) {
              console.error("Error cancelling order:", error);
            }
          },
          style: { backgroundColor: "#d33", color: "white" } // Red confirm button
        },
        {
          label: "No, Keep It",
          onClick: () => console.log("Cancelled"),
          style: { backgroundColor: "#3085d6", color: "white" } // Blue cancel button
        }
      ],
      overlayClassName: "custom-overlay", // Custom overlay class
    });
  };

  const currentDate = new Date();
  const reversedOrders = [...orderData].reverse();
  const ongoingOrders = reversedOrders.filter(order => new Date(order.toDate) >= currentDate);
  const pastOrders = reversedOrders.filter(order => new Date(order.toDate) < currentDate);

  const renderOrder = (order, index, isPastOrder = false) => {
    const product = products[order.productId] || {};
    return (
      <div id='ongoingorder' key={index}>
        <div id='ordermain'>
          <div id='orderimg'>
            {product.images?.length > 0 && (
              <Link to={`/${product.gender === 'women' ? 'femalecollection' : 'malecollection'}/${order.category}/${order.productId}`}>
                <img src={product.images[0]} alt="Product Image" />
              </Link>
            )}
          </div>
          <div id='orderinfo'>
            <div id='upperinfo'>
              <p>{product.title}</p>
              <h4>Order Id :- #{order.orderId}</h4>
              <div id='productsizes' style={{ marginTop: "0vh", marginLeft: "0vh" }}>
                <label style={{ marginRight: "0vh" }}>Quantity: </label>
                <input type="text" value={order.quantity} readOnly />
              </div>
              <div id='productsizes' style={{ marginTop: "0vh", marginLeft: "0vh" }}>
                <label style={{ marginRight: "0vh" }}>Size: </label>
                <input type="text" value={order.size} readOnly />
              </div>
              <div id="savetofav" onClick={(e) => {
                e.preventDefault();
                toggleFavourite(product._id);
              }}>
                {favourites.has(product._id) ? <span aria-label="Remove Favorite" className='hint--left hint--bounce'><FaHeart color="rgb(173, 46, 36)" /></span> : <span aria-label="Add to Favorite" className='hint--left hint--bounce'><FaRegHeart /></span>}
              </div>
            </div>
            <div id='middleinfo'>
              <div>
                <div id='productprice' style={{ gap: "2vw" }}>
                  <p id="productrent">
                    Rent
                    <span id='rentproduct'>₹{product.rent || "N/A"}</span>
                    <span>For 4 days</span>
                  </p>
                  <p id="productmrp">
                    Mrp
                    <span id='mrpproduct'>₹{product.mrp || "N/A"}</span>
                  </p>
                </div>
                <p id="productdeposit">
                  Deposited
                  <span id='rentproduct'>₹{product.deposit || "N/A"}</span>
                  <span id='refundinfo'><FaInfoCircle title="Refund will process within 7 days after return" /></span>
                </p>
              </div>

              <div className="tracker-box">
                <h4>
                  Order Tracker :{" "}
                  {order.status === "cancelled" && (
                    <span style={{ color: "yellow" }}>(Order Cancelled)</span>
                  )}
                  {order.status === "rejected" && (
                    <span style={{ color: "red" }}>(Order Rejected)</span>
                  )}
                </h4>
                <div className="labels">
                  <span id='label1'>Order Confirmed</span>
                  <span id='label2'>In Shipping</span>
                  <span id='label3'>Delivered</span>
                  <span id='label4'>Returned</span>
                  <span id='label5'>Refunded</span>
                </div>
                <div className="tracker" id={isPastOrder ? 'tracker' : ''}>
                  <div className="step completed"><div className="circle"></div></div>
                  <div className="step completed"><div className="circle"></div></div>
                  <div className="step completed"><div className="circle"></div></div>
                  <div className={`step ${isPastOrder ? 'completed' : ''}`}><div className="circle"></div></div>
                  <div className={`step ${isPastOrder ? 'completed' : ''}`}><div className="circle"></div></div>
                </div>
              </div>
            </div>
            <div id='bottominfo'>
              <div id='orderbuttons' style={{ marginLeft: "0vw", marginTop: "0vh" }}>
                <div id='orderbuttons' style={{ marginLeft: "0vw", marginTop: "0vh" }}>
                  <button
                    id="rentnowbutton"
                    onClick={() => handleCancelOrder(order.orderId, order.productId, "cancelled")}
                    style={{
                      backgroundColor:
                        order.status === "cancelled" || order.status === "rejected"
                          ? "black"
                          : "",
                      color:
                        order.status === "cancelled" || order.status === "rejected"
                          ? "white"
                          : "black",
                      cursor:
                        order.status === "cancelled" || order.status === "rejected"
                          ? "not-allowed"
                          : "pointer",
                      opacity:
                        order.status === "cancelled" || order.status === "rejected" ? 0.7 : 1,
                    }}
                    disabled={order.status === "cancelled" || order.status === "rejected"}
                  >
                    {
                      order.status === "rejected"
                        ? "Rejected"
                        : order.status === "cancelled"
                          ? "Cancelled"
                          : new Date(order.toDate) < new Date()
                            ? "Rate & Review"
                            : "Cancel Order"}

                  </button>

                </div>

              </div>
              <p><span>Ordered Date: </span>{format(new Date(order.orderDate), 'dd-MM-yyyy')}</p>
              <p><span>From Date: </span>{format(new Date(order.fromDate), 'dd-MM-yyyy')}</p>
              <p><span>To Date: </span>{format(new Date(order.toDate), 'dd-MM-yyyy')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div id='profileview'>
        <Profilenav />
        <h2 id='Personalinfo'>Ongoing Orders :</h2>
        {ongoingOrders.map((order, index) => renderOrder(order, index))}
        <h2 id='Personalinfo'>Past Orders :</h2>
        {pastOrders.map((order, index) => renderOrder(order, index, true))}
      </div>
    </>
  );
}

export default Orders;