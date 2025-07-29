import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import logo from '../../../assets/star.png'

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-gray-50 p-10">
            <aside>
                <img src={logo} className="w-10" alt="" />
                <p className="font-bold text-xl">
                    Star News.
                    <br />
                    Providing reliable tech since 1992
                </p>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4 text-2xl">
                    <a href="https://x.com/AtikHassan35" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                    <a href="https://facebook.com/ki.korbi.id.diye" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                    <a href="https://github.com/atikh35" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/md-atik-hassan-522139374" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
