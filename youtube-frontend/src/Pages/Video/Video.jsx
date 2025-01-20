import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getCommentByVideoId } from "../../../../Controllers/comment.controller";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import SideNavbar from "../../Component/SideNavbar/SideNavbar";

const Video = ({sideNavbar}) => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [allVideos, setAllVideos] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const likes = useSelector(state => state.likes);
    const dislikes = useSelector(state => state.dislikes);

    const likeVideo = () => ({ type: 'LIKE_VIDEO' });
    const dislikeVideo = () => ({ type: 'DISLIKE_VIDEO' });

    const handleLike = () => {
        dispatch(likeVideo());
    };

    const handleDislike = () => {
        dispatch(dislikeVideo());
    };

    const fetchVideoById = async () => {
        await axios.get(`http://localhost:4000/api/getVideoById/${id}`).then((response) => {
            setData(response.data.video);
            setVideoUrl(response?.data?.video?.videoLink);
        }).catch(err => {
            console.log(err);
        });
    };

    const getCommentByVideoId = async () => {
        await axios.get(`http://localhost:4000/commentApi/comment/${id}`).then((response) => {
            setComments(response.data.comments);
        }).catch(err => {
            console.log(err);
        });
    };

    const handleComment = async () => {
        const body = {
            "message": message,
            "video": id
        };
        await axios.post("http://localhost:4000/commentApi/comment", body, { withCredentials: true }).then((res) => {
            const newComment = res.data.comment;
            setComments([newComment, ...comments]);
            setMessage("");
        }).catch(err => {
            toast.error("Please Login first to comment");
        });
    };

    const handleCancel = () => {
        setMessage("");
    };

    const fetchVideos = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/allVideo');
            setAllVideos(response.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
        fetchVideos();
    }, [navigate]);

    return (
        <>
        <SideNavbar sideNavbar={sideNavbar}/>
         <div className="mt-20 bg-black p-4 flex justify-center">
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
                                    onChange={(e) => { setMessage(e.target.value) }}
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
                                    <img className="w-8 h-8 rounded-full" src={item?.user?.profilePic} alt="User-Profile-Pic" />
                                    <div>
                                        <div className="flex justify-between text-sm text-white">
                                            <span>{item?.user?.channelName}</span>
                                            <span>{item?.createdAt.slice(0, 10)}</span>
                                        </div>
                                        <div className="text-gray-300">{item?.message}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-[350px] flex flex-col space-y-4 mt-6 md:mt-0">
                    <h2 className="text-lg font-bold text-white mb-4">Up Next</h2>
                    {allVideos?.videos
                        ?.filter(video => video._id !== id)
                        .map((video, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 cursor-pointer"
                                onClick={() => navigate(`/watch/${video._id}`)}
                            >
                                <div className="w-24 h-16 bg-gray-700 rounded-md">
                                    <img
                                        src={video.thumbnail}
                                        alt="Thumbnail"
                                        className="rounded-md"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-white line-clamp-2">{video.title}</h3>
                                    <p className="text-xs text-gray-400">{video.views} views</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
        
        </>


       
    );
};

export default Video;
