import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-cyan-50 text-black py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Our Offices Section */}
        <div>
          <h3 className="font-bold mb-2">Our Offices</h3>
          <ul className="space-y-1">
            <li>Addis Ababa</li>
            <li>Bahir Dar</li>
            <li>Hawassa</li>
            <li>Adama</li>
          </ul>
        </div>
        {/* Global Navigation Section */}
        <div>
          <h3 className="font-bold mb-2">Local Navigation</h3>
          <ul className="space-y-1">
            <li>Addis Ababa</li>
            <li>Hawassa</li>
            <li>Bahir Dar</li>
            <li>Jimma</li>
            <li>Ambo</li>
            <li>Adama</li>
            <li>Mekele</li>
            <li>Deremarkos</li>
            <li>Arba Minch</li>
            <li>Debrebirhan</li>
            <li>Buta Jira</li>
          </ul>
        </div>
        {/* Product Section */}
        <div>
          <h3 className="font-bold mb-2">Product</h3>
          <ul className="space-y-1">
            <li>ERP System</li>
            <li>Mobile</li>
            <li>Financial Management</li>
            <li>Inventory Management</li>
            <li>What is ERP?</li>
            <li>Industry Solutions</li>
          </ul>
        </div>
        {/* About ERP Section */}
        <div>
          <h3 className="font-bold mb-2">About ERP</h3>
          <ul className="space-y-1">
            <li>Awards</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>Customer</li>
            <li>News</li>
            <li>Why ERP</li>
            <li>LearnIt</li>
          </ul>
        </div>
        {/* Social Media Section */}
        <div >
          <h3 className="font-bold mb-2">Connect with ERP</h3>
          <div className="flex space-x-2">
            <a href="#" aria-label="LinkedIn" className="p-2 bg-white rounded">
              <FaLinkedin className="h-6 w-6 text-gray-800 hover:text-white" />
            </a>
            <a href="#" aria-label="Twitter" className="p-2 bg-white rounded">
              <FaTwitter className="h-6 w-6 text-gray-800 hover:text-white" />
            </a>
            <a href="#" aria-label="Facebook" className="p-2 bg-white rounded">
              <FaFacebook className="h-6 w-6 text-gray-800 hover:text-white" />
            </a>
            <a href="#" aria-label="Instagram" className="p-2 bg-white rounded">
              <FaInstagram className="h-6 w-6 text-gray-800 hover:text-white" />
            </a>
            <a href="#" aria-label="YouTube" className="p-2 bg-white rounded">
              <FaYoutube className="h-6 w-6 text-gray-800 hover:text-white" />
            </a>
          </div>
        </div>
      </div>
      <div className=" bg-cyan-100 border-t border-gray-600 mt-6 pt-4  text-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400">© Copyright ERP 2024. All Rights Reserved.</div>
          <div className="space-x-4 mt-2 md:mt-0 text-sm text-gray-400">
            <a href="#" className="hover:underline">ERP Trust Center</a>
            <a href="#" className="hover:underline">Terms & Conditions</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
