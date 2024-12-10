const Header = ({ username, headerRef }) => {
   return (
      <div ref={headerRef} className="header-wrapper">
         <h2>{username ? `${username} tasks` : "Loading..."}</h2>
      </div>
   );
};

export default Header;