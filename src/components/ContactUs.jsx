import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { useRef } from "react";

const ContactUs = () => {

    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_7rduyo1', 'template_ow3425f', form.current, {
        publicKey: 'gIl9elp9Kbmc9LJHt',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className=" py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Contact Us</h2>
      <p className="text-center mb-8 text-gray-700 max-w-xl mx-auto">
        Have a question, suggestion, or need help? We'd love to hear from you!
        Fill out the form below and our team will get back to you as soon as possible.
      </p>
        <form ref={form} onSubmit={sendEmail}>
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-black">Name</label>
            <input type="text" name="user_name" placeholder="Your Name" className="w-full text-black border rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-black">Email</label>
            <input type="email" name="user_email" placeholder="you@email.com" className="w-full text-black border rounded px-3 py-2" />
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-1 text-black">Message</label>
            <textarea placeholder="How can we help you?" name="message" className="w-full text-black border rounded px-3 py-2 h-28 resize-none" />
          </div>
          <button type="submit" className="bg-black text-white font-semibold w-full cursor-pointer py-2 rounded">
            Send Message
          </button>
        </form>
      <p className="text-center text-sm text-gray-700 mt-6">
        Or email us directly at <a href="mailto:info@plantcare.com" className="text-gray-600 font-medium hover:underline">info@starnews.com</a>
      </p>

      <div className="flex justify-center gap-4 mt-4 text-gray-700 text-2xl">
        <Link to="#"><FaFacebookF /></Link>
        <Link to="#"><FaTwitter /></Link>
        <Link to="#"><FaInstagram /></Link>
        <Link to="#"><FaGithub /></Link>
      </div>
      </div>

    </div>
  );
};

export default ContactUs;
