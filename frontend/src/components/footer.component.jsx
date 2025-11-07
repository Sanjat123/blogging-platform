import { useContext, useState } from "react"; // Import useState
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";
import lightLogo from "../imgs/logo-light.png";
import darkLogo from "../imgs/logo-dark.png";
// Import framer-motion for animations
import { motion, AnimatePresence } from "framer-motion";

// Reusable motion variants for animations
const linkHover = {
    hover: { y: -2, opacity: 1, color: "var(--color-dark)" }
};

const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Stagger animation for each column
            delayChildren: 0.2
        }
    }
};

const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const Footer = () => {

    let { theme } = useContext(ThemeContext);
    const [email, setEmail] = useState("");
    const [subStatus, setSubStatus] = useState("idle"); // idle, loading, success, error

    // Function to scroll window to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Visual feedback for newsletter submission
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        
        // Basic email validation
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            setSubStatus("error");
            setTimeout(() => setSubStatus("idle"), 2000);
            return;
        }
        
        setSubStatus("loading");
        
        // Simulate API call
        setTimeout(() => {
            setSubStatus("success");
            setEmail("");
            setTimeout(() => setSubStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <motion.footer 
            className="bg-grey dark:bg-black border-t border-grey dark:border-dark-grey py-16 mt-10 relative"
            variants={footerVariants}
            initial="hidden"
            whileInView="visible" // Animate when it enters the viewport
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container mx-auto px-[4vw]">
                
                {/* Reverted to 4-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    
                    {/* Column 1: Logo & About */}
                    <motion.div variants={columnVariants}>
                        <Link to="/" className="flex-none w-10 mb-4">
                            <img src={theme === "light" ? darkLogo : lightLogo} alt="Logo" className="w-10 h-10" />
                        </Link>
                        <p className="text-dark-grey dark:text-grey text-sm mt-2 max-w-md">
                            Welcome to Zidio Blogs. Share your stories, insights, and passions with a vibrant community.
                        </p>
                    </motion.div>

                    {/* Column 2: Quick Links */}
                    <motion.div variants={columnVariants}>
                        <h3 className="text-lg font-medium mb-4 dark:text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <motion.div variants={linkHover} whileHover="hover" className="inline-block">
                                    <Link to="/" className="text-dark-grey dark:text-grey dark:hover:text-white transition-colors opacity-80">Home</Link>
                                </motion.div>
                            </li>
                            <li>
                                <motion.div variants={linkHover} whileHover="hover" className="inline-block">
                                    <Link to="/editor" className="text-dark-grey dark:text-grey dark:hover:text-white transition-colors opacity-80">Write a Blog</Link>
                                </motion.div>
                            </li>
                            <li>
                                <motion.div variants={linkHover} whileHover="hover" className="inline-block">
                                    <Link to="/dashboard/blogs" className="text-dark-grey dark:text-grey dark:hover:text-white transition-colors opacity-80">Dashboard</Link>
                                </motion.div>
                            </li>
                            <li>
                                <motion.div variants={linkHover} whileHover="hover" className="inline-block">
                                    <Link to="/settings/edit-profile" className="text-dark-grey dark:text-grey dark:hover:text-white transition-colors opacity-80">Settings</Link>
                                </motion.div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Column 3: Legal Links */}
                    <motion.div variants={columnVariants}>
                        <h3 className="text-lg font-medium mb-4 dark:text-white">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <motion.div variants={linkHover} whileHover="hover" className="inline-block">
                                    <Link to="/privacy-policy" className="text-dark-grey dark:text-grey dark:hover:text-white transition-colors opacity-80">Privacy Policy</Link>
                                </motion.div>
                            </li>
                            <li>
                                <motion.div variants={linkHover} whileHover="hover" className="inline-block">
                                    <Link to="/terms-of-service" className="text-dark-grey dark:text-grey dark:hover:text-white transition-colors opacity-80">Terms of Service</Link>
                                </motion.div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Column 4: Newsletter Subscription */}
                    <motion.div variants={columnVariants}>
                        <h3 className="text-lg font-medium mb-4 dark:text-white">Subscribe</h3>
                        <p className="text-dark-grey dark:text-grey text-sm mb-4">
                            Get the latest posts and updates delivered to your inbox.
                        </p>
                        <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                placeholder={subStatus === 'error' ? 'Invalid email!' : 'Your email'}
                                required
                                // THIS IS THE FIXED LINE
                                className={`input-box bg-white dark:bg-dark-grey dark:border-grey w-full dark:text-white placeholder:text-dark-grey dark:placeholder:text-grey ${subStatus === 'error' ? 'border-red placeholder:text-red dark:border-red dark:placeholder:text-red' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={subStatus === 'loading'}
                            />
                            <motion.button 
                                className="btn-dark dark:bg-white dark:text-black shrink-0" 
                                type="submit"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={subStatus === 'loading'}
                            >
                                <AnimatePresence mode="wait">
                                    {subStatus === 'loading' && (
                                        <motion.i key="loading" className="fi fi-rr-loading animate-spin"></motion.i>
                                    )}
                                    {subStatus === 'idle' && (
                                        <motion.i key="idle" className="fi fi-rr-paper-plane"></motion.i>
                                    )}
                                    {subStatus === 'error' && (
                                        <motion.i key="error" className="fi fi-rr-exclamation"></motion.i>
                                    )}
                                    {subStatus === 'success' && (
                                        <motion.i key="success" className="fi fi-rr-check"></motion.i>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </form>
                        <AnimatePresence>
                            {subStatus === 'success' && (
                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-green-500 text-sm mt-2"
                                >
                                    Subscribed! Welcome to the club.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>

                {/* Bottom Bar: Social Icons & Copyright */}
                <motion.div 
                    className="border-t border-grey dark:border-dark-grey mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.5 }}
                >
                    
                    {/* Social Icons */}
                    <div className="flex gap-4">
                        <motion.a href="#" className="text-dark-grey dark:text-grey text-2xl opacity-80" variants={linkHover} whileHover="hover">
                            <i className="fi fi-brands-github"></i>
                        </motion.a>
                        <motion.a href="#" className="text-dark-grey dark:text-grey text-2xl opacity-80" variants={linkHover} whileHover="hover">
                            <i className="fi fi-brands-instagram"></i>
                        </motion.a>
                        <motion.a href="#" className="text-dark-grey dark:text-grey text-2xl opacity-80" variants={linkHover} whileHover="hover">
                            <i className="fi fi-brands-twitter"></i>
                        </motion.a>
                        <motion.a href="#" className="text-dark-grey dark:text-grey text-2xl opacity-80" variants={linkHover} whileHover="hover">
                            <i className="fi fi-brands-facebook"></i>
                        </motion.a>
                        <motion.a href="#" className="text-dark-grey dark:text-grey text-2xl opacity-80" variants={linkHover} whileHover="hover">
                            <i className="fi fi-brands-youtube"></i>
                        </motion.a>
                        <motion.a href="#" className="text-dark-grey dark:text-grey text-2xl opacity-80" variants={linkHover} whileHover="hover">
                            <i className="fi fi-rr-globe"></i>
                        </motion.a>
                    </div>
                    
                    {/* Copyright Text */}
                    <p className="text-dark-grey dark:text-grey text-sm text-center md:text-right">
                        © {new Date().getFullYear()} Zidio Blogs. All rights reserved.
                    </p>
                </motion.div>

            </div>

            {/* Back to Top Button */}
            <motion.button
                className="w-12 h-12 bg-black text-white dark:bg-white dark:text-black rounded-full flex justify-center items-center fixed bottom-8 right-8 z-50 shadow-lg"
                onClick={scrollToTop}
                title="Back to top"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1, rotate: -15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
                <i className="fi fi-rr-arrow-up text-xl"></i>
            </motion.button>
        </motion.footer>
    );
}

export default Footer;