import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faMicrophone, faBell, faVideo, faUser } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import axios from "axios";

const NavBar = ({ setSideNavbarFunc, sideNavbar, setSearchResults, searchResults, setSearchQuery, searchQuery}) => {
    const [userPic, setUserPic] = useState("https://pixy.org/src/120/thumbs350/1206832.jpg");
    const [navbarModal, setNavbarModal] = useState(false);
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("Sign In");

    const handleInputChange = (e) => {
        if(e.target.value.length<1) setSearchResults({});
        setSearchQuery(e.target.value);
    };


    const handleSearch = async() => {
        if (searchQuery.trim() === "") {
            alert("Please enter a search query.");
            return;
        }
        console.log("Searching for:", searchQuery);
        try {
            const response = await axios.get(`http://localhost:4000/api/videos/search`, {
                params: { query: searchQuery },
            });
            setSearchResults(response.data); 
        } catch (err) {
            console.log(err, "Failed to fetch search results. Please try again later.");
        }
    };

    const handleKeyDown = (e) => {
        
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleClickModal = () => {
        setNavbarModal((prev) => !prev);
    };

    const sideNavbarFunc = () => {
        setSideNavbarFunc(!sideNavbar);
    };

    const handleProfile = () => {
        let userId = localStorage.getItem("userId");
        navigate(`/user/${userId}`);
        setNavbarModal(false);
    };

    const setLoginModal = () => {
        setLogin(false);
    };

    const onClickLogin = (button) => {
        setNavbarModal(false);
        if (button === "login") {
            setLogin(true);
        }else{
            localStorage.clear();
            getLogoutFun();
            setTimeout(()=>{
                navigate('/');
                window.location.reload();
            },2000)
        }
    };

    const getLogoutFun = async() => {
        axios.post("http://localhost:4000/auth/logout", {}, {withCredentials: true}).then((res)=>{
            console.log("Logout ")
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        let userProfilePic = localStorage.getItem("userProfilePic");
        
        setIsLoggedIn(localStorage.getItem("userId")!==null ? true : false);
        if(userProfilePic!== null){
            setUserPic(userProfilePic);
            setUsername(localStorage.getItem("username"));
        }
    },[])

    return (
        <>
            <div className="h-14 px-4 flex items-center justify-between w-full fixed top-0 bg-gray-900 shadow-md z-50">
                {/* Left Section */}
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon 
                        icon={faBars} 
                        size="lg" 
                        className="text-white cursor-pointer hover:bg-gray-500 hover:rounded-full hover:scale-125" 
                        onClick={sideNavbarFunc} 
                    />
                    <Link to={"/"}>
                        <div className="flex items-center space-x-2 cursor-pointer hover:scale-125">
                            <FontAwesomeIcon icon={faYoutube} size="2x" className="text-red-600" />
                            <span className="text-white text-lg font-bold">YouTube</span>
                        </div>
                    </Link>
                </div>

                {/* Center Section */}
                {/* <div className="flex items-center w-1/2 space-x-2">
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex-grow px-4 py-2 border border-gray-700 rounded-l-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-700 rounded-r-full text-white transition-all">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <button className="ml-2 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all">
                        <FontAwesomeIcon icon={faMicrophone} className="text-white" />
                    </button>
                </div> */}


                <div className="flex items-center w-1/2 space-x-2">
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-grow px-4 py-2 border border-gray-700 rounded-l-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-700 rounded-r-full text-white transition-all"
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <button className="ml-2 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all">
                <FontAwesomeIcon icon={faMicrophone} className="text-white" />
            </button>
        </div>


                {/* Right Section */}
                <div className="flex items-center space-x-4 relative">
                    <Link to={"/763/upload"}>
                        <FontAwesomeIcon icon={faVideo} size="lg" className="text-white cursor-pointer" />
                    </Link>
                    <FontAwesomeIcon icon={faBell} size="lg" className="text-white cursor-pointer" />
                    <div className="flex items-center border border-blue-200 rounded-xl p-1 cursor-pointer" onClick={handleClickModal}>
                    <img
                        src={userPic}
                        className="w-8 h-8 rounded-full"
                        alt="User"
                    /><span className="text-white ml-1">{username}</span>
                    {navbarModal && (
                        <div className="absolute right-0 top-12 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
                            <div className="flex flex-col cursor-pointer text-white">
                                {isLoggedIn &&
                                <div className="px-4 py-2 hover:bg-gray-700" onClick={handleProfile}>
                                    Profile
                                </div>}
                                {isLoggedIn && <div className="px-4 py-2 hover:bg-gray-700" onClick={() => onClickLogin("logout")}>
                                    Logout
                                </div>}
                                {!isLoggedIn && <div className="px-4 py-2 hover:bg-gray-700" onClick={() => onClickLogin("login")}>
                                    Login
                                </div>}
                            </div>
                        </div>
                    )}
                    </div>
                    
                </div>
            </div>
            {login && <Login setLoginModal={setLoginModal} />}
        </>
    );
};

export default NavBar;
