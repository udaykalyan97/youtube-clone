import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const VideoUpload = () => {
    const [inputField, setInputField] = useState({
        title: "",
        description: "",
        videoLink: "",
        thumbnail: "",
        videoType: "",
    });
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const handleOnChangeInput = (event, name) => {
        setInputField({
            ...inputField,
            [name]: event.target.value,
        });
    };

    const uploadImage = async (e, type) => {
        setLoader(true);
        console.log("Uploading...");
        const files = e.target.files;

        if (!files || files.length === 0) {
            setLoader(false);
            console.error("No file selected.");
            return;
        }

        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "youtube-clone");

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dgutt23y2/${type}/upload`,
                data
            );
            const url = response.data.secure_url; // Use `secure_url` for HTTPS.
            setLoader(false);

            const key = type === "image" ? "thumbnail" : "videoLink";
            setInputField({
                ...inputField,
                [key]: url,
            });
        } catch (err) {
            setLoader(false);
            console.error("Error uploading file:", err);
        }
    };

    const handleSubmitFunc = async() => {
        setLoader(true);
        await axios.post("http://localhost:4000/api/video", inputField, {withCredentials: true}).then((res)=>{
            console.log(res);
            setInputField(false);
        }).catch(err=>{
            console.log(err);
            setInputField(false);
        })
    }

    useEffect(()=>{
        let isLogin = localStorage.getItem("userId");
        if(isLogin == null){
            navigate('/');
        }
    },[])

    return (
        <div className="videoUpload min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="uploadBox bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
                {/* Upload Title */}
                <div className="uploadVideoTitle flex items-center justify-center space-x-3 text-xl font-semibold">
                    <FontAwesomeIcon className="text-red-500" icon={faYoutube} />
                    <span>Upload Video</span>
                </div>

                {/* Upload Form */}
                <div className="uploadForm space-y-4">
                    <input
                        type="text"
                        placeholder="Title of Video"
                        onChange={(e) => handleOnChangeInput(e, "title")}
                        value={inputField.title}
                        className="uploadFormInputs w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    />
                    <textarea
                        placeholder="Description"
                        onChange={(e) => handleOnChangeInput(e, "description")}
                        value={inputField.description}
                        className="uploadFormInputs w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                        rows="4"
                    ></textarea>
                    <input
                        type="text"
                        value={inputField.videoType}
                        onChange={(e) => handleOnChangeInput(e, "videoType")}
                        placeholder="Category"
                        className="uploadFormInputs w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    />
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-300">Thumbnail</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => uploadImage(e, "image")}
                            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block font-medium text-gray-300">Video</label>
                        <input
                            type="file"
                            accept="video/mp4, video/webm, video/*"
                            onChange={(e) => uploadImage(e, "video")}
                            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="uploadBtns flex justify-evenly items-center">
                    <button onClick={handleSubmitFunc} className="uploadBtn-form border border-gray-500 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                        Upload
                    </button>
                    <Link to="/">
                        <button className="uploadBtn-form border border-gray-500 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                            Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VideoUpload;
