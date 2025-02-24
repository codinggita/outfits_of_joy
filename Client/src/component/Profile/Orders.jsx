import React, { useEffect, useState } from 'react';
import Profilenav from './Profilenav';
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import useFavorites from "../Hooks/useFavorites.jsx"
import { FaInfoCircle } from "react-icons/fa";
import { useUser } from "../UserContext.jsx";
import './Orders.css';
import { ordersdetails } from './Api.js';
import { fetchProduct } from '../outfitcollection/api.js';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

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
          // Fetch product details for each order
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

  const currentDate = new Date();
  const ongoingOrders = orderData.filter(order => new Date(order.toDate) >= currentDate);
  const pastOrders = orderData.filter(order => new Date(order.toDate) < currentDate);

  return (
    <>
      <div id='profileview'>
        <Profilenav />
        {/* Ongoing Orders */}
        <h2 id='Personalinfo'>Ongoing Orders :</h2>

        {ongoingOrders.map((order) => {

          const product = products[order.productId] || {};
          return (
            <div id='ongoingorder' key={order.orderId}>
              <div id='ordermain'>
                <div id='orderimg'>
                  {product.images?.length > 0 && (
                    <Link to={`/${product.gender === 'women' ? 'Femalecollection' : 'Malecollection'}/${order.category}/${order.productId}`}>
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
                      {favourites.has(product._id) ? <FaHeart color="rgb(173, 46, 36)" /> : <FaRegHeart />}
                    </div>
                  </div>
                  <div id='middleinfo'>
                    <div>
                      <div id='productprice' style={{ gap: "2vw" }}>
                        <p id="productrent">
                          <sup>Rent</sup>
                          <span id='rentproduct'>₹{product.rent || "N/A"}</span>
                          <span>For 4 days</span>
                        </p>
                        <p id="productmrp">
                          <sup>Mrp</sup>
                          <span id='mrpproduct'>₹{product.mrp || "N/A"}</span>
                        </p>
                      </div>
                      <p id="productdeposit">
                        <sup>Deposited</sup>
                        <span id='rentproduct'>₹{product.deposit || "N/A"}</span>
                        <span id='refundinfo'><FaInfoCircle title="Refund processed within 7 days after return" /></span>
                      </p>
                    </div>

                    <div className="tracker-box">
                      <h4>Order Tracker :</h4>
                      <div className="labels">
                        <span id='label1'>Order Confirmed</span>
                        <span id='label2'>In Shipping</span>
                        <span id='label3'>Delivered</span>
                        <span id='label4'>Returned</span>
                        <span id='label5'>Refunded</span>
                      </div>
                      <div className="tracker">
                        <div className="step completed"><div className="circle"></div></div>
                        <div className="step completed"><div className="circle"></div></div>
                        <div className="step completed"><div className="circle"></div></div>
                        <div className="step"><div className="circle"></div></div>
                        <div className="step"><div className="circle"></div></div>
                      </div>
                    </div>

                  </div>
                  <div id='bottominfo'>
                    <div id='orderbuttons' style={{ marginLeft: "0vw", marginTop: "0vh" }}>
                      <button id='rentnowbutton'>Cancel Order</button>
                    </div>
                    <p><span>Ordered Date: </span>{format(new Date(order.orderDate), 'dd-MM-yyyy')}</p>
                    <p><span>From Date: </span>{format(new Date(order.fromDate), 'dd-MM-yyyy')}</p>
                    <p><span>To Date: </span>{format(new Date(order.toDate), 'dd-MM-yyyy')}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}


        {/* Past Orders */}
        <h2 id='Personalinfo'>Past Orders :</h2>
        {pastOrders.map((order) => {
          const product = products[order.productId] || {};
          return (
            <div id='ongoingorder' key={order.orderId}>

              <div id='ordermain'>
                <div id='orderimg'>
                  {product.images?.length > 0 && (
                    <Link to={`/${product.gender === 'women' ? 'Femalecollection' : 'Malecollection'}/${order.category}/${order.productId}`}>
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
                    <div id='savetofav'><FaRegHeart /></div>
                  </div>
                  <div id='middleinfo'>
                    <div>
                      <div id='productprice' style={{ gap: "2vw" }}>
                        <p id="productrent">
                          <sup>Rent</sup>
                          <span id='rentproduct'>₹{product.rent || "N/A"}</span>
                          <span>For 4 days</span>
                        </p>
                        <p id="productmrp">
                          <sup>Mrp</sup>
                          <span id='mrpproduct'>₹{product.mrp || "N/A"}</span>
                        </p>
                      </div>
                      <p id="productdeposit">
                        <sup>Deposited</sup>
                        <span id='rentproduct'>₹{product.deposit || "N/A"}</span>
                        <span id='refundinfo'><FaInfoCircle title="Refund processed within 7 days after return" /></span>
                      </p>
                    </div>

                    <div className="tracker-box">
                      <h4>Order Tracker :</h4>
                      <div className="labels">
                        <span id='label1'>Order Confirmed</span>
                        <span id='label2'>In Shipping</span>
                        <span id='label3'>Delivered</span>
                        <span id='label4'>Returned</span>
                        <span id='label5'>Refunded</span>
                      </div>
                      <div className="tracker" id='tracker' >
                        <div className="step completed"><div className="circle"></div></div>
                        <div className="step completed"><div className="circle"></div></div>
                        <div className="step completed"><div className="circle"></div></div>
                        <div className="step completed"><div className="circle"></div></div>
                        <div className="step completed"><div className="circle"></div></div>
                      </div>
                    </div>
                  </div>
                  <div id='bottominfo'>
                    <div id='orderbuttons' style={{ marginLeft: "0vw", marginTop: "0vh" }}>
                      <button id='rentnowbutton'>Rate & Review</button>
                    </div>
                    <p><span>Ordered Date: </span>{format(new Date(order.orderDate), 'dd-MM-yyyy')}</p>
                    <p><span>From Date: </span>{format(new Date(order.fromDate), 'dd-MM-yyyy')}</p>
                    <p><span>To Date: </span>{format(new Date(order.toDate), 'dd-MM-yyyy')}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Orders;
