import clsx from "clsx";
import Link from "next/link";

export default function Header({ children, href, className }) {
  return href ? (
    <h2
      className={clsx(
        "py-10 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter",
        className
      )}
    >
      <Link href={href}>
        <a className="hover:underline">{children}</a>
      </Link>
      .
    </h2>
  ) : (
    <h2
      className={clsx(
        "py-10 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter",
        className
      )}
    >
      {children}.
    </h2>
  );
}
