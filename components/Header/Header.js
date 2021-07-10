import Link from "next/link";

export default function Header({ children, href }) {
  return href ? (
    <h2 className="mb-20 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
      <Link href={href}>
        <a className="hover:underline">{children}</a>
      </Link>
      .
    </h2>
  ) : (
    <h2 className="mb-20 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
      {children}.
    </h2>
  );
}
