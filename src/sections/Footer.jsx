import React from 'react';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-black text-center text-surface text-white">
      <div className="container pt-9">
        <div className="mb-6 flex justify-center space-x-2">
          <a
            href="#!"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
          >
            <FaFacebook className="h-5 w-5 text-white" />
          </a>
          <a
            href="#!"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
          >
            <FaTwitter className="h-5 w-5 text-white" />
          </a>
          <a
            href="#!"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
          >
            <FaGoogle className="h-5 w-5 text-white " />
          </a>
          <a
            href="#!"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
          >
            <FaInstagram className="h-5 w-5 text-white" />
          </a>
          <a
            href="#!"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus:ring-0 dark:text-white dark:hover:bg-secondary-900"
          >
            <FaLinkedin className="h-5 w-5 text-white" />
          </a>
          <a
            href="#!"
            className="rounded-full bg-transparent p-3 font-medium uppercase leading-normal text-surface transition duration-150 ease-in-out focus:outline-none focus:ring-0 hover:bg-red-600"
          >
            <FaGithub className="h-5 w-5 text-white" />
          </a>
        </div>
      </div>

      <div className="w-full bg-black/5 p-4 text-center">
        © 2024 Copyright
        <a> Black Craft Tattoo</a>
      </div>
    </footer>
  );
};

export default Footer;
