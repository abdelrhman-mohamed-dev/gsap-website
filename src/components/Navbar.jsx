import { useEffect, useRef, useState } from "react"
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];


const Navbar = () => {
    const [isAduioPlaying, setIsAduioPlaying] = useState(false)
    const [isIndicatorActive, setIsIndicatorActive] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isNavVisable, setIsNavVisable] = useState(true)
    const navContainerRef = useRef(null);
    const aduioElementRef = useRef(null);

    const { y: currentScrollY } = useWindowScroll();

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisable(true)
            navContainerRef.current.classList.remove("floating-nav")
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisable(false)
            navContainerRef.current.classList.add("floating-nav")
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisable(true)
            navContainerRef.current.classList.add("floating-nav")
        }

        setLastScrollY(currentScrollY)
    }, [currentScrollY, lastScrollY])

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisable ? 0 : -100,
            opacity: isNavVisable ? 1 : 0,
            duration: 0.2
        })
    }, [isNavVisable])

    const toggleAduioIndicator = () => {
        setIsAduioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    }

    useEffect(() => {
        if (isAduioPlaying === true) {
            aduioElementRef.current.play();
        } else {
            aduioElementRef.current.pause();
        }
    }, [isAduioPlaying])
    return (
        <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 ">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-7">
                        <img src="/img/logo.png" alt="logo" className="w-10" />
                        <Button
                            id={"product-button"}
                            title={"Products"}
                            rightIcon={<TiLocationArrow />}
                            containerClass={"bg-blue-50 md:flex hidden items-center justify-center gap-1 "}
                        />
                    </div>
                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                            {navItems.map((item, index) => (
                                <a key={index} href={`#${item.toLowerCase()}`} className="nav-hover-btn">{item}</a>
                            ))}
                        </div>
                        <button onClick={toggleAduioIndicator} className="ml-10 flex items-center space-x-0.5">
                            <audio autoPlay ref={aduioElementRef} className="hidden" src="/audio/loop.mp3" loop />
                            {[1, 2, 3, 4].map((bar) => (
                                <div key={bar} className={`indicator-line ${isIndicatorActive ? "active" : ""}`} style={{ animationDelay: `${bar * 0.1}s` }} />
                            ))}
                        </button>
                    </div>
                </nav>
            </header>

        </div>
    )
}

export default Navbar