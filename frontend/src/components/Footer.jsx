const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white px-8 py-12">
            <div className="md:mx-28 flex flex-col md:flex-row justify-evenly">
                <div className="mb-8 md:mb-0 md:mr-8">
                    <h3 className="font-semibold mb-2">About Us</h3>
                    <ul>
                        <li><a href="#">Our Story</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>
                <div className="mb-8 md:mb-0 md:mr-8">
                    <h3 className="font-semibold mb-2">Customer Service</h3>
                    <ul>
                        <li><a href="#">Help & Contact</a></li>
                        <li><a href="#">Shipping & Returns</a></li>
                        <li><a href="#">Order Status</a></li>
                    </ul>
                </div>
                <div className="mb-8 md:mb-0 md:mr-8">
                    <h3 className="font-semibold mb-2">Privacy & Policy</h3>
                    <ul>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Contact Us</h3>
                    <ul>
                        <li><a href="#">Email</a></li>
                        <li><a href="#">Chat</a></li>
                        <li><a href="#">Phone</a></li>
                    </ul>
                </div>
            </div>
            <p className="text-center mt-8">© Copyrights 2024 - 2025.  Aquasleri.  All Rights Reserved.</p>
        </footer>
    )
}

export default Footer;
