const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-10 px-5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-green-500">FarmEasy</h2>
            <p className="text-gray-400 mt-2">
              Your trusted marketplace for farm products. Fresh & Organic.
            </p>
          </div>
  
          {/* Navigation Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold text-gray-300">Quick Links</h3>
            <a href="/" className="hover:text-green-400 transition">Home</a>
            <a href="/products" className="hover:text-green-400 transition">Products</a>
            <a href="/about" className="hover:text-green-400 transition">About Us</a>
            <a href="/contact" className="hover:text-green-400 transition">Contact</a>
          </div>
  
          {/* Social Media & Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-300">Follow Us</h3>
            <div className="flex space-x-4 mt-3">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
  
        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
          © {new Date().getFullYear()} FarmEasy. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  