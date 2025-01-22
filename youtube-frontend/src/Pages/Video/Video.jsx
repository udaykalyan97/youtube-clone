import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import SideNavbar from "../../Component/SideNavbar/SideNavbar";

const Video = ({ sideNavbar }) => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [allVideos, setAllVideos] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux selectors
    const likes = useSelector(state => state.video.likes);
    const dislikes = useSelector(state => state.video.dislikes);

    const [commentEditValue, setCommentEditValue] = useState('');

    // Redux actions
    const likeVideo = () => ({ type: 'video/likeVideo' });
    const dislikeVideo = () => ({ type: 'video/dislikeVideo' });

    const handleLike = () => {
        dispatch(likeVideo());
    };

    const handleDislike = () => {
        dispatch(dislikeVideo());
    };

    // Fetch video by ID
    const fetchVideoById = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/getVideoById/${id}`);
            setData(response.data.video);
            setVideoUrl(response?.data?.video?.videoLink);
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch comments by video ID
    const fetchCommentsByVideoId = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/commentApi/comment/${id}`);
            setComments(response.data.comments);
        } catch (err) {
            console.error(err);
        }
    };

    // Handle comment submission
    const handleComment = async () => {
        const body = {
            "message": message,
            "video": id
        };
        try {
            const response = await axios.post("http://localhost:4000/commentApi/comment", body, { withCredentials: true });
            const newComment = response.data.comment;
            setComments([newComment, ...comments]);
            setMessage("");
        } catch (err) {
            toast.error("Please login first to comment");
        }
    };

    const handleCancel = () => {
        setMessage("");
    };

    // Fetch all videos for 'Up Next'
    const fetchVideos = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/allVideo');
            setAllVideos(response.data.videos); // Populate the state
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };
    // Edit comment
    const handleEdit = (comment) => {
        setComments(comments.map(item =>
            item._id === comment._id ? { ...item, isEditing: true } : { ...item, isEditing: false }
        ));
    };

    const updateComment = async (commentId, updatedMessage) => {
        try {
            const response = await axios.put(
                `http://localhost:4000/commentApi/comment/${commentId}`,
                { message: updatedMessage },
                { withCredentials: true }
            );
            setComments(comments.map(item =>
                item._id === commentId ? { ...item, message: updatedMessage, isEditing: false } : item
            ));
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    // Delete comment
    const handleDelete = async (commentId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
        if (confirmDelete) {
            try {
                await axios.delete(
                    `http://localhost:4000/commentApi/comment/${commentId}`,
                    { withCredentials: true }
                );
                setComments(comments.filter(comment => comment._id !== commentId));
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };

    useEffect(() => {
        fetchVideoById();
        fetchCommentsByVideoId();
        fetchVideos();
    }, [id, navigate]);

    return (
        <>
            <SideNavbar sideNavbar={sideNavbar} />
            <div className={`${sideNavbar ? "ml-72 mt-14 bg-black" : ""} flex flex-col p-6 space-y-8 bg-black mt-14`}>

                <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-6">
                    {/* Main video section */}
                    <div className="flex-1 flex flex-col space-y-4">
                        <div className="video_youtube w-full">
                            {data && <video controls autoPlay className="w-full aspect-video rounded-lg shadow-lg">
                                <source src={videoUrl} type="video/mp4" />
                                <source src={videoUrl} type="video/webm" />
                                Your browser does not support the video tag.
                            </video>}
                        </div>

                        <div className="text-white">
                            <h1 className="text-xl font-bold mb-2">{data?.title}</h1>
                            <div className="flex items-center text-sm text-gray-400 mb-4">
                                <span>{"1,234,567 views"}</span>
                                <span className="mx-2">{"•"}</span>
                                <span>{data?.user?.createdAt.slice(0, 10)}</span>
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <Link to={`/user/${data?.user?._id}`}>
                                    <div className="w-10 h-10 bg-gray-700 rounded-full">
                                        <img src={data?.user?.profilePic} alt="Profile" className="rounded-full" />
                                    </div>
                                </Link>
                                <div>
                                    <Link to={`/user/${data?.user?._id}`}><p className="text-white font-medium">{data?.user?.userName}</p></Link>
                                    <p className="text-sm text-gray-400">100K subscribers</p>
                                </div>
                                <div className="bg-white text-black font-semibold rounded-md px-4 py-2 flex justify-center items-center cursor-pointer hover:bg-gray-200 transition duration-300">
                                    Subscribe
                                </div>

                                <div className="flex items-center gap-4 mb-4">
                                    <button onClick={handleLike} className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition duration-200">
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                        <span>Like {data?.like + likes}</span>
                                    </button>
                                    <button onClick={handleDislike} className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition duration-200">
                                        <FontAwesomeIcon icon={faThumbsDown} />
                                        <span>Dislike {dislikes}</span>
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-300 mb-4">
                                This is a beginner-friendly tutorial on JavaScript, covering the basics of the language to help you get started with programming.
                            </p>
                        </div>

                        {/* Comments */}
                        <div className="mt-6">
                            <div className="text-white mb-4">
                                {comments.length} Comments
                            </div>
                            <div className="flex mb-6 space-x-4">
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src="https://ih1.redbubble.net/image.3883065385.6444/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
                                    alt="User"
                                />
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        className="w-full bg-black text-white border-b border-white focus:outline-none focus:border-blue-500"
                                        placeholder="Add a Comment"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <div className="flex justify-end space-x-4 mt-4">
                                        <button onClick={handleCancel} className="px-2 py-1 border text-white border-gray-600 rounded-md shadow-md hover:bg-gray-800 transition duration-300">
                                            Cancel
                                        </button>
                                        <button onClick={handleComment} className="px-2 py-1 border text-white border-gray-600 rounded-md shadow-md hover:bg-gray-800 transition duration-300">
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {comments.map((item, index) => (
                                    <div key={index} className="flex space-x-3">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src={item?.user?.profilePic}
                                            alt="User-Profile-Pic"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between text-sm text-white">
                                                <span>{item?.user?.channelName}</span>
                                                <span>{item?.createdAt.slice(0, 10)}</span>
                                            </div>
                                            {item.isEditing ? (
                                                <div>
                                                    <input
                                                        type="text"
                                                        defaultValue={item.message}
                                                        onChange={(e) => setCommentEditValue(e.target.value)}
                                                        className="w-full bg-black text-white border-b border-white focus:outline-none focus:border-blue-500"
                                                    />
                                                    <div className="mt-2 flex space-x-4 text-sm text-gray-400">
                                                        <button
                                                            onClick={() => updateComment(item._id, commentEditValue)}
                                                            className="px-2 py-1 border text-white border-gray-600 rounded-md shadow-md hover:bg-gray-800 transition duration-300"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(item)}
                                                            className="px-2 py-1 border text-white border-gray-600 rounded-md shadow-md hover:bg-gray-800 transition duration-300"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="text-white">{item.message}</p>
                                                    <div className="mt-2 flex flex-row-reverse space-x-4 text-sm text-gray-400">
                                                        <button
                                                            onClick={() => handleDelete(item._id)}
                                                            className="px-2 py-1 border text-white border-gray-600 rounded-md shadow-md hover:bg-gray-800 transition duration-300 ml-2"
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(item)}
                                                            className="px-2 py-1 border text-white border-gray-600 rounded-md shadow-md hover:bg-gray-800 transition duration-300"
                                                        >
                                                            Edit
                                                        </button>

                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - 'Up Next' */}
                    <div className="w-full md:w-[300px] p-4">
    <h3 className="text-white text-xl font-bold mb-6">Up Next</h3>
    <div className="grid grid-cols-1 gap-2">
        {allVideos.length > 0 ? (
            allVideos.map((video, index) => (
                <div key={index} className="flex items-center bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition duration-300 cursor-pointer">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-24 h-12 aspect-video rounded-lg mr-4 shadow-lg transition duration-300 ease-in-out hover:scale-105"
                    />
                    <div>
                        <h4 className="text-white font-semibold text-lg line-clamp-2">{video.title}</h4>
                        <p className="text-gray-400 text-sm mt-2 line-clamp-1">{video.user.channelName}</p>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-gray-400">No videos available</p>
        )}
    </div>
</div>




                </div>
            </div>

            <ToastContainer position="bottom-right" autoClose={5000} />
        </>
    );
};

export default Video;
