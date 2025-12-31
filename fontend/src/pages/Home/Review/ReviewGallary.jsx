import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import ReviewCard from "./ReviewCard";

const ReviewGallary = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);

  return (
    <div className="my-20">
      <div className="flex flex-col items-center justify-center gap-5 my-10 ">
        <h3 className="text-5xl text-center font-bold my-8 text-secondary">
          Review
        </h3>
        <p className="md:w-3xl text-center">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>
      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        <div className="grid md:grid-cols-5 grid-cols-2">
          {review.map((reviewData) => (
            <SwiperSlide key={reviewData.id}>
              <ReviewCard reviewData={reviewData} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default ReviewGallary;
