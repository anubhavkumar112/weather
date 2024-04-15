import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="container-main flex flex-col md:flex-row justify-between items-center py-4 px-6 md:px-10 lg:px-16 bg-gray-800 text-white">
      {/* Left Heading */}
      <div className="heading-header mb-4 md:mb-0">
        <h1 className="text-lg lg:text-xl font-semibold">Weather Application</h1>
      </div>

      {/* Right Section */}
      <div className="right-div">
        <div className="link-div flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4"> {/* Updated */}
          <Link to={'/'} className="text-white hover:text-blue-200">Home</Link>
          <Link to={'/table'} className="text-white hover:text-blue-200">All Cities</Link>
          <Link to={'/about'} className="text-white hover:text-blue-200">About</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
