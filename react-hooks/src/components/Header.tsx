type HeaderProps = {
  infinitasLogo: string;
};

const Header = ({ infinitasLogo }: HeaderProps) => {
  return (
    <header>
      <a
        href="/"
        target="_blank"
      >
        <img
          src={infinitasLogo}
          className="logo"
          alt="Infinitas logo"
        />
      </a>
    </header>
  );
};

export default Header;
