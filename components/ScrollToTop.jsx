import { useEffect, useState } from "react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <div
        className="fixed w-8 h-8 bg-gradient-tl-yellow z-20 rounded cursor-pointer bottom-10 right-4 shadow-md items-end flex justify-center"
        onClick={scrollToTop}
      >
        <svg
          className="w-5 h-5 text-white animate-bounce mb-1"
          viewBox="0 0 10 20"
          fill="none"
          strokeLinecap="round"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="none"
          stroke="currentColor"
        >
          <path d="M1 5L5 1M5 1L9 5M5 1V19" />
        </svg>
      </div>
    )
  );
};

export default ScrollToTop;
