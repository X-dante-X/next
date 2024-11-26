import Link from "next/link";

function Footer() {
    return (
        <footer className="flex flex-col h-auto relative bg-stone-950 text-slate-200">
            <div className="border-t border-gray-600 flex flex-col sm:flex-row justify-between px-6 sm:px-12 py-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full">
                    <ul className="flex flex-wrap gap-4">
                        <li>
                            <Link
                                href="/privacy"
                                className="hover:text-gray-400 transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/terms"
                                className="hover:text-gray-400 transition-colors duration-300"
                            >
                                Terms of Use
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact#newsletter"
                                className="hover:text-gray-400 transition-colors duration-300"
                            >
                                Newsletter
                            </Link>
                        </li>
                    </ul>
                    <p className="text-sm sm:ml-auto text-gray-400 mt-4 sm:mt-0">
                        © Yevhenii Solomchenko, Inc. 2024. All Rights Reserved.
                    </p>
                </div>
                <div className="flex items-center justify-center sm:justify-end ml-3 mt-6 sm:mt-0">
                    <ul className="flex gap-4">
                        <li>
                            <Link
                                href="https://www.linkedin.com/in/solomchenko/"
                                target="_blank"
                                aria-label="LinkedIn"
                                className="hover:text-gray-400 transition-transform duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448.1 448"
                                    className="w-3 h-3 fill-current"
                                >
                                    <path d="M100.3,448H7.4V148.9h92.9ZM53.8,108.1C24.1,108.1,0,83.5,0,53.8a53.8,53.8,0,0,1,107.6,0C107.6,83.5,83.5,108.1,53.8,108.1ZM448,448H355.3V302.4c0-34.7-.7-79.2-48.3-79.2-48.3,0-55.7,37.7-55.7,76.7V448H158.5V148.9h89.1v40.8h1.3c12.4-23.5,42.7-48.3,87.9-48.3,94,0,111.3,61.9,111.3,142.3V448Z"></path>
                                </svg>
                            </Link>
                        </li>
                        {/* <!-- Add other icons similarly --> */}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;