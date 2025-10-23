import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const logo = '/logo-ladluang.png';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('overflow-hidden', mobileMenuOpen);
        return () => {
            document.documentElement.classList.remove('overflow-hidden');
        };
    }, [mobileMenuOpen]);

    return (
        <header className={`${scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white/95 backdrop-blur-sm"} border-b border-gray-200 sticky top-0 z-100 transition-all duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <button onClick={() => navigate('/')} className="flex items-center gap-3 group">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-white text-xl shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300">
                            <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
                        </span>
                        <div>
                            <div className="text-base font-semibold leading-5 group-hover:text-primary-700 transition-colors duration-300 text-left">ศูนย์รับเรื่องร้องเรียน</div>
                            <div className="text-xs text-gray-500 -mt-0.5">เทศบาลเมืองลัดหลวง จังหวัดสมุทรปราการ</div>
                        </div>
                    </button>
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        {/* <a className="text-gray-700 hover:text-primary-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-500 after:transition-all after:duration-300" href="#ข่าวสาร">ข่าวสาร</a>
                        <a className="text-gray-700 hover:text-primary-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-500 after:transition-all after:duration-300" href="#ประกาศ">ประกาศ</a>
                        <a className="text-gray-700 hover:text-primary-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-500 after:transition-all after:duration-300" href="#บริการประชาชน">บริการประชาชน</a>
                        <a className="text-gray-700 hover:text-primary-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-500 after:transition-all after:duration-300" href="#ติดต่อ">ติดต่อเรา</a>
                        <a className="text-gray-700 hover:text-primary-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-500 after:transition-all after:duration-300" href="./mock-login.html">เข้าสู่ระบบ</a> */}
                    </nav>
                    <div className="hidden md:flex items-center gap-3">
                        {/* <label className="relative group">
                            <span className="sr-only">ค้นหา</span>
                            <input type="text" placeholder="ค้นหาข่าว/ประกาศ" className="peer w-64 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm transition-all duration-300 hover:border-primary-300" />
                            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 peer-focus:text-primary-500 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" /></svg>
                        </label> */}
                        <button onClick={() => navigate('/login')} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-3 py-2 text-sm font-medium text-white hover:from-primary-700 hover:to-primary-800 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 3c-1.657 0-3 .895-3 2v1H6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h3v1c0 1.105 1.343 2 3 2s3-.895 3-2v-1h3a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-3V5c0-1.105-1.343-2-3-2z" /></svg>
                            แจ้งเรื่องร้องเรียน
                        </button>
                    </div>
                    <button className="md:hidden flex items-center px-2 py-2 text-gray-700 hover:text-primary-700 transition-colors duration-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[60] md:hidden h-dvh">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)}></div>
                    <div className="absolute right-0 top-0 h-dvh w-80 max-w-[85%] bg-white shadow-xl transition-transform duration-300 translate-x-0">
                        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
                                <div className="text-sm font-semibold">ศูนย์แจ้งเรื่องร้องเรียน</div>
                            </div>
                            <button className="p-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100dvh-4rem)]">
                            <label className="relative block">
                                <span className="sr-only">ค้นหา</span>
                                <input type="text" placeholder="ค้นหาข่าว/ประกาศ" className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm" />
                                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" /></svg>
                            </label>
                            <nav className="flex flex-col gap-1 text-sm">
                                <a className="px-1.5 py-2 rounded hover:bg-gray-50 text-gray-700 hover:text-primary-700" href="#ข่าวสาร" onClick={() => setMobileMenuOpen(false)}>ข่าวสาร</a>
                                <a className="px-1.5 py-2 rounded hover:bg-gray-50 text-gray-700 hover:text-primary-700" href="#ประกาศ" onClick={() => setMobileMenuOpen(false)}>ประกาศ</a>
                                <a className="px-1.5 py-2 rounded hover:bg-gray-50 text-gray-700 hover:text-primary-700" href="#บริการประชาชน" onClick={() => setMobileMenuOpen(false)}>บริการประชาชน</a>
                                <a className="px-1.5 py-2 rounded hover:bg-gray-50 text-gray-700 hover:text-primary-700" href="#ติดต่อ" onClick={() => setMobileMenuOpen(false)}>ติดต่อเรา</a>
                                <a className="px-1.5 py-2 rounded hover:bg-gray-50 text-gray-700 hover:text-primary-700" href="./mock-login.html" onClick={() => setMobileMenuOpen(false)}>เข้าสู่ระบบ</a>
                            </nav>
                            <button onClick={() => navigate('/notify')} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-3 py-2 text-sm font-medium text-white shadow-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 3c-1.657 0-3 .895-3 2v1H6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h3v1c0 1.105 1.343 2 3 2s3-.895 3-2v-1h3a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-3V5c0-1.105-1.343-2-3-2z" /></svg>
                                แจ้งเรื่องร้องเรียน
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;