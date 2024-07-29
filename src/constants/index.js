import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import { customer1, customer2, panther, skelly, pile, monkey} from "../assets/images";

export const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about-us", label: "About Us" },
    { href: "#products", label: "Products" },
    { href: "#contact-us", label: "Contact Us" },
    { href: "/profile", label: "Profile" },
];



export const statistics = [
    { value: '1k+', label: 'Designs' },
    { value: '50+', label: 'Reviews' },
    { value: '200+', label: 'Happy Customers' },
];

export const products = [
    {
        imgURL: panther,
        name: "Leaping Panther",
        price: "$350",
    },
    {
        imgURL: skelly,
        name: "Zap Zap Zap",
        price: "$350",
    },
    {
        imgURL: monkey,
        name: "Monkey With Wings",
        price: "$380",
    },
    {
        imgURL: pile,
        name: "The Golden Pile",
        price: "$500",
    },
];

export const services = [
    {
        imgURL: truckFast,
        label: "Fast Deliver",
        subtext: "Once payment is made, we'll schedule your appointment promptly."
    },
    {
        imgURL: shieldTick,
        label: "Secure Payment",
        subtext: "Experience worry-free transactions with our secure payment options."
    },
    {
        imgURL: support,
        label: "Love to help you",
        subtext: "Our dedicated team is here to assist you every step of the way."
    },
];

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Morich Brown',
        rating: 4.5,
        feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
    },
    {
        imgURL: customer2,
        customerName: 'Lota Mongeskar',
        rating: 4.5,
        feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
    }
];


export const footerLinks = [

    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@nike.com", link: "mailto:customer@blackcraft.com" },
            { name: "+92554862354", link: "tel:+92554862354" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];