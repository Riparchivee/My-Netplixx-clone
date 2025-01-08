import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Aos from "aos"
import "aos/dist/aos.css"

const AuthScreen = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = e => {
        e.preventDefault();
        navigate("/signup?email=" + email);
    };
    
    Aos.init();

    return (
        <div className="hero-bg relative overflow-hidden">
            {/* Navbar */}
            <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
                <img className="mt-4 w-20 md:w-40 text-red-700 text-2xl md:text-6xl font-semibold"
                src="/netflix-logo.png"
                />
                <Link
                    to={"/login"}
                    className="mt-4 text-white bg-red-600 py-1 px-2 rounded"
                >
                    Sign In
                </Link>
            </header>

            {/* hero section */}
            <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto"
  
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Film, acara TV tak terbatas, dan banyak lagi
                </h1>
                <p className="text-lg mb-4">
                    Watch anywhere. Data list from TMDB.
                </p>
                <p className="mb-4">
                    Siap menonton? Masukkan email untuk membuat atau memulai
                    lagi keanggotaanmu
                </p>

                <form
                    className="flex flex-col md:flex-row gap-4 w-1/2"
                    onSubmit={handleFormSubmit}
                >
                    <input
                        type="email"
                        placeholder="Email address"
                        className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
                        Get Started
                        <ChevronRight className="size-8 md:size-10" />
                    </button>
                </form>
            </div>

            {/* separator */}
            <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

            {/* 1st section */}
            <div className="py-10 bg-black text-white"
            >
                <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
                    {/* left side */}
                    <div className="flex-1 text-center md:text-left"
                    data-aos="fade-right"
                    data-aos-anchor-placement="bottom-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                            Nikmati di TV-mu
                        </h2>
                        <p className="text-lg md:text-xl">
                            Tonton di Smart TV, Playstation, Xbox, Chromecast,
                            Apple TV, pemutar Blu-ray, dan banyak lagi.
                        </p>
                    </div>
                    {/* right side */}
                    <div className="flex-1 relative"
                    data-aos="fade-left"
                    data-aos-duration="1200"
                    >
                        <img
                            src="/tv.png"
                            alt="Tv image"
                            className="mt-4 z-20 relative"
                        />
                        <video
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
                            playsInline
                            autoPlay={true}
                            muted
                            loop
                        >
                            <source src="/hero-vid.m4v" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>

            {/* separator */}

            <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />


            
            {/* 2rd section */}
            <div className="py-10 bg-black text-white">
                <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
                    {/* left side */}
                    <div className="flex-1 relative"
                    data-aos="fade-down"
                    data-aos-anchor-placement="bottom-center"
                    
                    >
                        <div className="relative">
                            <img
                                src="/stranger-things-lg.jpg"
                                alt="Stranger Things img"
                                className="mt-4"
                            />

                            <div
                                className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black
              w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2
              "
                            >
                                <img
                                    src="/stranger-things-sm.png"
                                    alt="image"
                                    className="h-full"
                                />
                                <div className=" flex justify-between items-center w-full">
                                    <div className="flex flex-col gap-0">
                                        <span className="text-md lg:text-lg font-bold">
                                            Stranger Things
                                        </span>
                                        <span className="text-sm text-blue-500">
                                            Downloading...
                                        </span>
                                    </div>

                                    <img
                                        src="/download-icon.gif"
                                        alt=""
                                        className="h-12"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* right side */}

                    <div className="flex-1 md:text-left text-center"
                    data-aos="fade-left"
                    data-aos-anchor-placement="bottom-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
                            Download acara TV untuk menontonnya secara offline
                        </h2>
                        <p className="text-lg md:text-xl">
                            Simpan favoritmu dengan mudah agar selalu ada acara TV dan film yang bisa ditonton.
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
            
          {/* 3rd section */}
            <div className="py-10 bg-black text-white">
                <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
                    {/* left side */}
                    <div className="flex-1 text-center md:text-left"
                    data-aos="zoom-in-up"
                    data-aos-anchor-placement="center-center"
                    
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                            Tonton di mana pun
                        </h2>
                        <p className="text-lg md:text-xl">
                            Streaming film dan acara TV tak terbatas di ponsel,
                            tablet, laptop, dan TV-mu.
                        </p>
                    </div>
                    
                    {/* right side */}
                    <div className="flex-1 relative overflow-hidden"
                    data-aos="zoom-in-down"
                    data-aos-anchor-placement="center-center"
                    >
                        <img
                            src="/device-pile.png"
                            alt="Device image"
                            className="mt-4 z-20 relative"
                        />
                        <video
                            className="absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10
               max-w-[63%] 
              "
                            playsInline
                            autoPlay={true}
                            muted
                            loop
                        >
                            <source src="/video-devices.m4v" type="video/mp4" />
                        </video>
                    </div>

                </div>
            </div>

            <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

            {/* 4th section*/}
            <div className="py-10 bg-black text-white">
                <div
                    className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row
           px-4 md:px-2
        "
                >
                    {/* left */}
                    <div className="flex-1 relative"
                    data-aos="fade-right"
                    >
                        <img
                            src="/kids.png"
                            alt="Enjoy on your TV"
                            className="mt-4"
                        />
                    </div>
                    
                    {/* right */}
                    <div className="flex-1 text-center md:text-left"
                    data-aos="fade-left"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                            Buat profil untuk anak
                        </h2>
                        <p className="text-lg md:text-xl">
                            Kirim anak-anak untuk bertualang bersama karakter
                            favorit di dunia yang dibuat khusus untuk mereka —
                            gratis dengan keanggotaanmu.
                        </p>
                    </div>

                </div>
            </div>
            

        </div>
    );
};
export default AuthScreen;
