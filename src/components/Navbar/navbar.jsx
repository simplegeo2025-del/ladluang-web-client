import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/user.store";

const logo = '/logo-ladluang.png';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    console.log("🚀 ~ Navbar ~ user:", user)
    const clearUser = useUserStore(state => state.clearUser);

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

    const handleLogout = () => {
        clearUser();
        navigate('/login');
    };

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
                        {user && (
                            <>
                                <button onClick={() => navigate('/reports')} className="text-gray-700 hover:text-primary-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-500 after:transition-all after:duration-300">รายการร้องเรียน</button>
                                <button onClick={() => navigate('/notify')} className="text-gray-700 hover:text-primary-700 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-500 after:transition-all after:duration-300">แจ้งเรื่องร้องเรียน</button>
                            </>
                        )}
                    </nav>
                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="text-sm text-gray-700">
                                    <span className="font-medium">{user.firstName} {user.lastname}</span>
                                </div>
                                <div className="relative group">
                                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                                        {user.avatarUrl ? (
                                            <img src={user.avatarUrl} alt={user.firstName} className="w-8 h-8 rounded-full object-cover" />
                                        ) : (
                                            <span className="text-sm font-medium text-gray-700">{user.firstName.charAt(0)}</span>
                                        )}
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="px-4 py-2 text-sm text-gray-500">{user.email}</div>
                                        <hr className="my-1" />
                                        <button onClick={handleLogout} className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50">ออกจากระบบ</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => navigate('/login')} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-3 py-2 text-sm font-medium text-white hover:from-primary-700 hover:to-primary-800 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 3c-1.657 0-3 .895-3 2v1H6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h3v1c0 1.105 1.343 2 3 2s3-.895 3-2v-1h3a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-3V5c0-1.105-1.343-2-3-2z" /></svg>
                                แจ้งเรื่องร้องเรียน
                            </button>
                        )}
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
                            {user ? (
                                <>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                                            {user.avatar_url ? (
                                                <img src={user.avatar_url} alt={user.firstName} className="w-10 h-10 rounded-full object-cover" />
                                            ) : (
                                                <span className="text-sm font-medium text-gray-700">{user.firstName.charAt(0)}</span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium">{user.firstName} {user.lastName}</div>
                                            <div className="text-xs text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                    <nav className="flex flex-col gap-1 text-sm">
                                        <button onClick={() => { navigate('/reports'); setMobileMenuOpen(false); }} className="px-1.5 py-2 rounded hover:bg-gray-50 text-gray-700 hover:text-primary-700 text-left">รายการร้องเรียน</button>
                                        <button onClick={() => { navigate('/notify'); setMobileMenuOpen(false); }} className="px-1.5 py-2 rounded hover:bg-gray-50 text-gray-700 hover:text-primary-700 text-left">แจ้งเรื่องร้องเรียน</button>
                                        <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="px-1.5 py-2 rounded hover:bg-gray-50 text-red-600 hover:text-red-700 text-left">ออกจากระบบ</button>
                                    </nav>
                                </>
                            ) : (
                                <button onClick={() => navigate('/notify')} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-3 py-2 text-sm font-medium text-white shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 3c-1.657 0-3 .895-3 2v1H6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h3v1c0 1.105 1.343 2 3 2s3-.895 3-2v-1h3a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-3V5c0-1.105-1.343-2-3-2z" /></svg>
                                    แจ้งเรื่องร้องเรียน
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;