// TODO: Create footer

export default function Footer() {
  return (
    <footer className="py-5">
      {/* TODO: change with portfolio link          */}
      <div className="flex flex-wrap items-center justify-end mr-4 text-right">
        <p>
          Build By <span className="font-bold">Pasquale Matarrese</span>
        </p>
        <a
          href="https://www.github.com/pasqat"
          target="_blank"
          rel="noopener noreferrer"
          className="pl-3"
        >
          <i className="text-xl fab fa-github" />
        </a>
        <a
          href="https://www.linkedin.com/in/pasquale-matarrese/"
          target="_blank"
          rel="noopener noreferrer"
          className="pl-3"
        >
          <i className="text-xl text-blue-900 fab fa-linkedin" />
        </a>
        <a
          href="https://www.linkedin.com/in/pasquale-matarrese/"
          target="_blank"
          rel="noopener noreferrer"
          className="pl-3"
        >
          <i className="text-xl text-green-600 fas fa-house-user" />
        </a>
      </div>
    </footer>
  );
}
