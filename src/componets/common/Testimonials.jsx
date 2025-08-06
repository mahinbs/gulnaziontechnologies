import React from "react";
import { useKeenSlider } from "keen-slider/react";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { reviews } from "../../constant";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 3,
        spacing: 20,
      },
      breakpoints: {
        "(max-width: 1024px)": {
          slides: {
            perView: 2,
            spacing: 20,
          },
        },
        "(max-width: 768px)": {
          slides: {
            perView: 1,
            spacing: 20,
          },
        },
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  // Button click handler
  const handleNextClick = () => {
    if (instanceRef.current) {
      instanceRef.current.next(); // Move to the next slide
    }
  };

  const handlePrevClick = () => {
    if (instanceRef.current) {
      instanceRef.current.prev(); // Move to the prev slide
    }
  };

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="py-[3rem] bg-gray-50">
      <div className="wrapper flex flex-col items-center gap-7">
        <div
          className="gradient-rounded-text-box"
          data-aos="fade-up"
          data-aos-offset={-400}
        >
          Testimonials
        </div>
        <h2
          className="heading-2 text-primarytextcolor mb-2 text-center"
          data-aos-offset={-400}
          data-aos="fade-up"
        >
          Our Client's Experiences
        </h2>
        <div
          ref={sliderRef}
          className="keen-slider"
          data-aos="fade-up"
          data-aos-offset={-400}
        >
          {reviews.map((item) => (
            <div
              key={item.id}
              className="keen-slider__slide bg-white rounded-xl p-6 flex flex-col gap-4 min-h-[280px]"
            >
              {/* Star Rating */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-400 text-lg" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                {item.desc}
              </p>
              
              {/* Reviewer Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {getInitials(item.name)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                  {/*<p className="text-gray-600 text-xs">{item.role}</p>*/}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex justify-center items-center gap-10 mt-2"
        >
          <button
            className="text-primary text-5xl hover:text-primary/70 transition-all duration-200"
            onClick={handlePrevClick}
            aria-label="Previous slide"
          >
            <IoArrowBackCircleOutline />
          </button>
          <button
            className="text-primary text-5xl hover:text-primary/70 transition-all duration-200"
            onClick={handleNextClick}
            aria-label="Next slide"
          >
            <IoArrowForwardCircleOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
