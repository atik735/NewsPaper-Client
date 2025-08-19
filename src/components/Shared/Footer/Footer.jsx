import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import logo from '../../../assets/star.png'

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-gray-50 p-10">
            <aside>
                <img src={logo} className="w-10" alt="" />
                <p className="font-bold text-xl text-black">
                    Star News.
                    <br />
                    Providing reliable tech since 1992
                </p>
                <p className='text-black'>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
<nav>
  <div className="grid grid-flow-col gap-4 text-2xl">
    <a
      href="https://x.com/AtikHassan35"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-800 dark:text-white hover:text-blue-500"
    >
      <FaTwitter />
    </a>
    <a
      href="https://facebook.com/ki.korbi.id.diye"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-800 dark:text-white hover:text-blue-600"
    >
      <FaFacebook />
    </a>
    <a
      href="https://github.com/atikh35"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-800 dark:text-white hover:text-gray-400"
    >
      <FaGithub />
    </a>
    <a
      href="https://www.linkedin.com/in/md-atik-hassan-522139374"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-800 dark:text-white hover:text-blue-700"
    >
      <FaLinkedin />
    </a>
  </div>
</nav>

        </footer>
    );
};

export default Footer;
