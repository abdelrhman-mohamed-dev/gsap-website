import { useRef } from "react"
import { useState } from "react"
import Button from "./Button"

const Hero = () => {

    const [currentIndex, setCurrentIndex] = useState(1)
    const [hasClicked, setHasClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [loadedVideos, setLoadedVideos] = useState(0)

    const totalVideos = 3
    const nextVdRef = useRef(null)

    const handelVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1)
    }

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1

    const handelMiniVdClick = () => {
        setHasClicked(true)
        setCurrentIndex(upcomingVideoIndex)

    }


    const getVideoSrc = (index) => `/videos/hero-${index}.mp4`

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            <div id="video-frame" className="relative h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
                <div className="mask-clip-path absolute absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                    <div onClick={handelMiniVdClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                        <video
                            ref={nextVdRef}
                            src={getVideoSrc(upcomingVideoIndex)}
                            loop
                            muted
                            id="current-video"
                            className="size-64 origin-center scale-150 object-cover object-center"
                            onLoadedData={handelVideoLoad}
                        />
                    </div>
                </div>
                <video
                    ref={nextVdRef}
                    src={getVideoSrc(currentIndex)}
                    loop
                    muted
                    id="next-video"
                    className="absolute-center invisible absolute-center z-20 size-64 origin-center object-cover object-center"
                    onLoadedData={handelVideoLoad}
                />

                <video
                    src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                    autoPlay
                    loop
                    muted
                    className="absolute left-0 top-0 size-full object-cover object-center"
                    onLoadedData={handelVideoLoad}
                />
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                G<b>a</b>ming
            </h1>
            <div className="absolute left-0 top-0 size-full z-40 ">
                <div className="mt-25 px-5 sm:px-10 ">
                    <h1 className="special-font hero-heading text-blue-100">refifi<b>n</b>e</h1>
                    <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter the Metagame Layer <br />Unleach the play Economy</p>
                    <Button />
                </div>
            </div>
        </div>
    )
}

export default Hero