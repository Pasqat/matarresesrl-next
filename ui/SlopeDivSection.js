import clsx from "clsx";
/**
 * @param color text color (def. text-white)
 * @param position top or bottom (def. top)
 * The parent mast be positioned relative or absolute
 */
export const SlopeDivSection = ({ color = "text-white", position = "top" }) => {
  return (
    <div
      className={clsx(
        position === "top" ? "top-0 bottom-auto" : "bottom-0 top-auto",
        "absolute left-0 right-0 w-full h-20 -mt-20 overflow-hidden pointer-events-none"
      )}
      style={{ transform: "translateZ(0)" }}
    >
      <svg
        className="absolute bottom-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon
          className={clsx("fill-current", color)}
          points="2560 0 2560 100 0 100"
        ></polygon>
      </svg>
    </div>
  );
};
