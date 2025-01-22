import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faVideo, faPlay, faChevronRight, faAddressBook, faClockRotateLeft, faCirclePlay, faForward, faPlayCircle, faClock, faThumbsUp, faScissors } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const SideNavbar = ({ sideNavbar }) => {
    return (
        <div className={`bg-gray-900 ${sideNavbar ? 'block' : 'hidden'} md:w-72 sm:w-64 xs:w-56 p-4 h-[92vh] overflow-y-auto fixed top-14 left-0 z-40`}>
            <style>{`-webkit-scrollbar {width: 12px;}`}</style>

            {/* Home & Shorts Section */}
            <div className="flex flex-col border-b border-gray-400">
                <div className="flex flex-col text-white mb-2">
                    {/* Link to Home */}
                    <Link
                        to="/"
                        className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
                    >
                        <FontAwesomeIcon icon={faHouse} className="mr-3" /> Home
                    </Link>

                    {/* Link to Shorts */}
                    <Link
                        to="/shorts"
                        className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
                    >
                        <FontAwesomeIcon icon={faVideo} className="mr-3" /> Shorts
                    </Link>

                    {/* Link to Subscriptions */}
                    <Link
                        to="/subscriptions"
                        className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
                    >
                        <FontAwesomeIcon icon={faPlay} className="mr-3" /> Subscriptions
                    </Link>
                </div>
            </div>


            {/* Your Section */}
            <div className="flex flex-col border-b border-gray-400">
                <div className="flex flex-col text-white mb-2">
                    <div className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        You <FontAwesomeIcon icon={faChevronRight} className="ml-3" />
                    </div>
                    <div className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <FontAwesomeIcon icon={faAddressBook} className="mr-3" /> Your Channel
                    </div>
                    <div className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <FontAwesomeIcon icon={faClockRotateLeft} className="mr-3" /> History
                    </div>
                    <div className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <FontAwesomeIcon icon={faForward} className="mr-3" /> Playlists
                    </div>
                    <div className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <FontAwesomeIcon icon={faPlayCircle} className="mr-3" /> Your videos
                    </div>
                    <div className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <FontAwesomeIcon icon={faClock} className="mr-3" /> Watch later
                    </div>
                    <div className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <FontAwesomeIcon icon={faThumbsUp} className="mr-3" /> Liked videos
                    </div>
                    <div className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <FontAwesomeIcon icon={faScissors} className="mr-3" /> Your clips
                    </div>
                </div>
            </div>

            {/* Subscription Section */}
            <div className="flex flex-col border-b border-gray-400">
                <div className="flex flex-col text-white mb-2">
                    <div className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg font-bold">
                        Subscription <FontAwesomeIcon icon={faChevronRight} className="ml-3" />
                    </div>
                    <div className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <img className="w-10 h-10 rounded-full mr-3" src="https://www.pixilart.com/images/art/9e632d6c399893c.png" alt="MrBeast" />
                        <span className="text-white">MrBeast</span>
                    </div>
                    <div className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <img className="w-10 h-10 rounded-full mr-3" src="https://yt3.ggpht.com/-8ZnBMvGyRbQ/AAAAAAAAAAI/AAAAAAAAAAA/_Hp2swLOznQ/s900-c-k-no/photo.jpg" alt="TSeries" />
                        <span className="text-white">TSeries</span>
                    </div>
                    <div className="flex mb-3 items-center cursor-pointer hover:bg-gray-700 p-2 rounded-lg">
                        <img className="w-10 h-10 rounded-full mr-3" src="https://ih1.redbubble.net/image.3883065385.6444/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg" alt="CocoMelon" />
                        <span className="text-white">CocoMelon - Nursery Rhymes</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideNavbar;
