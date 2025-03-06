import React, { useState, useRef } from "react";
import { PiArrowCircleLeftDuotone } from "react-icons/pi";
import { PiArrowCircleRightDuotone } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";

const review = [
    {
        id: 1,
        name: "John Doe",
        photo: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
        message: "Great product! Loved the quality and service.",
        date: "2023-10-01",
        rating: 4.5,
    },
    {
        id: 2,
        name: "Jane Smith",
        photo: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
        message: "Amazing experience. Will definitely recommend!",
        date: "2023-10-05",
        rating: 5, 
    },
    {
        id: 3,
        name: "Alice Johnson",
        photo: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
        message: "Very satisfied with the purchase. Thank you!",
        date: "2023-10-10",
        rating: 3.5, 
    },
    {
        id: 4,
        name: "Bob Brown",
        photo: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
        message: "Excellent product and fast delivery.",
        date: "2023-10-15",
        rating: 4, 
    },
    {
        id: 5,
        name: "Charlie Davis",
        photo: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
        message: "Good quality and value for money.",
        date: "2023-10-20",
        rating: 2.5, 
    },
];

const Reviews = ({ isVisible, onClose }) => {
    const [startIndex, setStartIndex] = useState(0); // Track the starting index of visible reviews
    const reviewsWrapperRef = useRef(null); // Ref for the reviews wrapper

    const showNextReviews = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % review.length);
        scrollToReview(startIndex + 1); // Scroll to the next set of reviews
    };

    const showPreviousReviews = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + review.length) % review.length);
        scrollToReview(startIndex - 1); // Scroll to the previous set of reviews
    };

    // Function to scroll to a specific review
    const scrollToReview = (index) => {
        if (reviewsWrapperRef.current) {
            const cardWidth = reviewsWrapperRef.current.children[0].offsetWidth; // Width of one review card
            const scrollPosition = index * cardWidth; // Calculate scroll position
            reviewsWrapperRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth", // Smooth scroll effect
            });
        }
    };

    // Get the 4 reviews to display
    const visibleReviews = [];
    for (let i = 0; i < 4; i++) {
        const index = (startIndex + i) % review.length;
        visibleReviews.push(review[index]);
    }

    return (
        <div className={`slider2 ${isVisible ? "visible" : ""}`}>
            <div className="slider2-content">
                {/* Close Button */}
                <button className="slider-btn prev-btn" onClick={showPreviousReviews}>
                    <PiArrowCircleLeftDuotone />
                </button>

                <button className="slider-btn next-btn" onClick={showNextReviews}>
                    <PiArrowCircleRightDuotone />
                </button>

                {/* Visible Reviews */}
                <div className="reviews-wrapper" ref={reviewsWrapperRef}>
                    {visibleReviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <div className="profile">
                                <img src={review.photo} alt={review.name} className="profile-photo" />
                                <div className="profile-info">
                                    <p className="name">{review.name}</p>
                                    <p className="date">{review.date}</p>
                                </div>
                                <div id="userratings">{review.rating} < FaRegStar /></div>
                            </div>
                            <p className="message">{review.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;