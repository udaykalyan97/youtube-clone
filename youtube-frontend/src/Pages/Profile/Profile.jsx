import React, { useState, useEffect } from "react";
import SideNavbar from "../../Component/SideNavbar/SideNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Profile = ({ sideNavbar }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/${id}/channel`);
            setData(response.data.video);
            setUser(response.data.video[0]?.user);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (videoId) => {
        try {
            await axios.delete(`http://localhost:4000/api/video/${videoId}`);
            setData(data.filter(video => video._id !== videoId));
        } catch (err) {
            console.error("Error deleting video:", err);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
        <div className="profile mt-20 bg-black text-white min-h-screen">
            <SideNavbar sideNavbar={sideNavbar} />
            <div
                className={`${sideNavbar ? "ml-72" : ""
                    } profile_page flex flex-col p-6 space-y-8`}
            >
                {/* Profile Top Section */}
                <div className="profile_top_section flex items-center space-x-8 pb-6 border-b border-gray-700">
                    <img className="profile_top_section_profile w-40 h-40 rounded-full" src={user?.profilePic} alt="profile"/>
                    <div>
                        <h1 className="text-3xl font-bold">{user?.channelName}</h1>
                        <p className="text-gray-400 mt-1">{user?.userName} • {data.length} videos</p>
                        <p className="mt-4 text-gray-300">{user?.about}</p>
                    </div>
                </div>

                {/* Videos Section */}
                <div>
                    <div className="flex items-center space-x-4 mb-6">
                        <h2 className="text-xl font-semibold">Videos</h2>
                        <FontAwesomeIcon
                            className="text-gray-400"
                            icon={faChevronRight}
                        />
                    </div>

                    {/* Video List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((item, key) => (
                            <div key={key} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                                <Link to={`/watch/${item._id}`} className="block">
                                    <img className="w-full h-48 object-cover group-hover:opacity-90 transition duration-300" src={item?.thumbnail} alt="Video Thumbnail" />
                                </Link>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium">{item?.title}</h3>
                                    <p className="text-sm text-gray-400 mt-1">Created on {item?.createdAt}</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <Link to={`/edit/${item._id}`}>
                                            <FontAwesomeIcon className="text-gray-400 hover:text-white cursor-pointer" icon={faEdit} />
                                        </Link>
                                        <FontAwesomeIcon 
                                            className="text-gray-400 hover:text-red-500 cursor-pointer"
                                            icon={faTrash}
                                            onClick={() => handleDelete(item._id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
