export default function Container({ children }) {
  return (
    <div className="pt-10 bg-gray-100 container px-5 mx-auto max-w-7xl">
      {children}
    </div>
  );
}
