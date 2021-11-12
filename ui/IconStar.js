const IconStar = ({ number = 1 }) => {
  let total = []
  for (let i = 0; i < number; i++) {
    total.push(
      <svg
        width="24"
        height="23"
        viewBox="0 0 24 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        key={i}
      >
        <path
          d="M11.1344 1.43364L8.30018 7.18017L1.95903 8.10465C0.821879 8.26958 0.36615 9.67149 1.1908 10.4744L5.77848 14.9449L4.69341 21.26C4.49809 22.4015 5.70035 23.2566 6.7073 22.7227L12.38 19.7409L18.0528 22.7227C19.0597 23.2522 20.262 22.4015 20.0667 21.26L18.9816 14.9449L23.5693 10.4744C24.3939 9.67149 23.9382 8.26958 22.801 8.10465L16.4599 7.18017L13.6257 1.43364C13.1179 0.409337 11.6465 0.396316 11.1344 1.43364Z"
          fill="#FFD600"
        />
      </svg>
    );
  }

  return total
};

export default IconStar;
