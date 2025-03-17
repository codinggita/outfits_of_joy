// ShareButton.jsx
import React, { useState } from "react";
import { FaShare, FaWhatsapp, FaFacebook, FaLink } from "react-icons/fa6";
import { toast } from "react-toastify";
import './ShareButton.css';

const ShareButton = ({ product, collectionType }) => {
  const [showModal, setShowModal] = useState(false);
  const shareLink = `https://outfits-of-joy.vercel.app/${collectionType}/${product?.category}/${product?._id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: "#fff",
        color: "rgb(173, 46, 36)",
        border: "1px solid rgb(173, 46, 36)",
        borderRadius: "5px",
      },
    });
    setShowModal(false);
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareLink)}`, "_blank");
    setShowModal(false);
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`, "_blank");
    setShowModal(false);
  };

  return (
    <div className="share-container">
      <button 
        onClick={() => setShowModal(true)}
        className="share-button"
      >
        <FaShare /> Share
      </button>

      {showModal && (
        <div className="share-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="share-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Share Product</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>
            <div className="share-content">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="share-link"
              />
              <div className="share-options">
                <button onClick={shareToWhatsApp} className="share-option whatsapp">
                  <FaWhatsapp /> WhatsApp
                </button>
                <button onClick={shareToFacebook} className="share-option facebook">
                  <FaFacebook /> Facebook
                </button>
                <button onClick={handleCopy} className="share-option copy">
                  <FaLink /> Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;