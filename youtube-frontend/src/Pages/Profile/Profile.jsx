import React, { useState, useEffect } from "react";
import SideNavbar from "../../Component/SideNavbar/SideNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faEdit, faTrash, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Profile = ({ sideNavbar }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("https://i.pinimg.com/originals/ec/63/e0/ec63e0a44d9ef2dc8308615f2c477826.jpg");

    const [channelName, setChannelName] = useState("");
    const [about, setAbout] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchProfileData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/${id}/channel`);
            setData(response.data.video);
            setUser(response.data.video[0]?.user);
            setUploadedImageUrl(user?.profilePic);
        } catch (err) {
            console.error(err);
        }
    };


    const handleEdit = async () => {
        try {
            const updatedVideo = {
                title: selectedVideo.title,
                description: selectedVideo.description,
                thumbnail: selectedVideo.thumbnail,
                videoLink: selectedVideo.videoLink,
                videoType: selectedVideo.videoType
            };
            await axios.put(`http://localhost:4000/api/video/${selectedVideo._id}`, updatedVideo, { withCredentials: true });
            setData(data.map(video => (video._id === selectedVideo._id ? { ...video, ...updatedVideo } : video)));
            alert("Video updated successfully!");
            setSelectedVideo(null);
        } catch (err) {
            console.error("Error updating video:", err);
            alert("Failed to update the video. Please try again.");
        }
    };

    const handleDelete = async (videoId) => {
        if (window.confirm("Are you sure you want to delete this video?")) {
            try {
                await axios.delete(`http://localhost:4000/api/video/${videoId}`,
                    { withCredentials: true }
                );
                setData(data.filter(video => video._id !== videoId));
                alert("Video deleted successfully!");
            } catch (err) {
                console.error("Error deleting video:", err);
                alert("Failed to delete the video. Please try again.");
            }
        }
    };


    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        try {
            const { data } = await axios.put(
                "http://localhost:4000/auth/update",
                { channelName, about, userId, profilePic: uploadedImageUrl || profilePic },
                { withCredentials: true }
            );
    
            if (data) {
                alert(data.message);
                setShowModal(false);
    
                // Refresh the profile data
                fetchProfileData();
            } else {
                throw new Error('No data in response');
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };
    
    

    const uploadImage= async (e)=>{
        console.log("Uploading");
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        // youtube-clone
        data.append('upload_preset', 'youtube-clone');
        try{
            // cloudName="dgutt23y2"
            const response = await axios.post("https://api.cloudinary.com/v1_1/dgutt23y2/image/upload", data);
            const imageUrl = response.data.url;
            setUploadedImageUrl(imageUrl);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
        <div className="profile mt-14 bg-black text-white min-h-screen">
            <SideNavbar sideNavbar={sideNavbar} />
            <div
                className={`${sideNavbar ? "ml-72" : ""
                    } profile_page flex flex-col p-6 space-y-8`}
            >

                {/* Profile Top Section */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <img className="w-16 h-16 rounded-full" src={user?.profilePic} alt="profile" />
                        <div>
                            <h1 className="text-xl font-bold">{user?.channelName}</h1>
                            <h2 className="text-sm text-gray-400">@{user?.userName}</h2>
                            <p className="text-sm text-gray-400">About: {user?.about}</p>
                        </div>
                    </div>
                    <div className="cursor-pointer hover:text-blue-500" onClick={() => setShowModal(true)}>
                    <FontAwesomeIcon 
                        className="mr-2"
                        icon={faUserEdit}
                    />Edit Profile
                    </div>
                    
                </div>

                {/* Profile Update Section (Modal) */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-1/2">
                            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                            <form onSubmit={handleProfileUpdate} className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-4">
                                    <img className="w-16 h-16 rounded-full" src={user?.profilePic} alt="profile" />
                                    <label className="flex flex-col">
                                        <span className="text-gray-400">Change Profile Picture</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => uploadImage(e)}
                                            className="mt-2"
                                        />
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-gray-400 mb-2">Channel Name</label>
                                    <input
                                        type="text"
                                        value={channelName}
                                        onChange={(e) => setChannelName(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-700 rounded text-black"
                                        placeholder="Channel Name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-400 mb-2">About</label>
                                    <textarea
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-700 rounded text-black"
                                        placeholder="Tell us about yourself"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Videos Section */}
                <div className="border-t border-white pt-4">
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
                                        <FontAwesomeIcon
                                            className="text-gray-400 hover:text-white cursor-pointer"
                                            icon={faEdit}
                                            onClick={() => setSelectedVideo(item)}
                                        />
                                        <FontAwesomeIcon
                                            className={`text-gray-400 hover:text-red-500 cursor-pointer ${isDeleting ? "cursor-not-allowed opacity-50" : ""}`}
                                            icon={faTrash}
                                            onClick={!isDeleting ? () => handleDelete(item._id) : null}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Edit Video Modal */}
                    {selectedVideo && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-1/2">
                                <h2 className="text-xl font-bold mb-4">Edit Video</h2>
                                <input
                                    className="w-full p-2 mb-4 bg-gray-800 rounded"
                                    type="text"
                                    placeholder="Title"
                                    value={selectedVideo.title}
                                    onChange={(e) => setSelectedVideo({ ...selectedVideo, title: e.target.value })}
                                />
                                <textarea
                                    className="w-full p-2 mb-4 bg-gray-800 rounded"
                                    placeholder="Description"
                                    value={selectedVideo.description}
                                    onChange={(e) => setSelectedVideo({ ...selectedVideo, description: e.target.value })}
                                />
                                <input
                                    className="w-full p-2 mb-4 bg-gray-800 rounded"
                                    type="text"
                                    placeholder="Video Thumbnail"
                                    value={selectedVideo.thumbnail}
                                    onChange={(e) => setSelectedVideo({ ...selectedVideo, thumbnail: e.target.value })}
                                />
                                <input
                                    className="w-full p-2 mb-4 bg-gray-800 rounded"
                                    type="text"
                                    placeholder="Video Link"
                                    value={selectedVideo.videoLink}
                                    onChange={(e) => setSelectedVideo({ ...selectedVideo, videoLink: e.target.value })}
                                />
                                <input
                                    className="w-full p-2 mb-4 bg-gray-800 rounded"
                                    type="text"
                                    placeholder="Video Category"
                                    value={selectedVideo.videoType}
                                    onChange={(e) => setSelectedVideo({ ...selectedVideo, videoType: e.target.value })}
                                />
                                <div className="flex justify-end space-x-4">
                                    <button
                                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                                        onClick={() => setSelectedVideo(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                                        onClick={handleEdit}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                </div>

            </div>
        </div>
    );
};

export default Profile;
