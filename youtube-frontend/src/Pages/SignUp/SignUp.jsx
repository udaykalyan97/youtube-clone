import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';

const SignUp = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("https://i.pinimg.com/originals/ec/63/e0/ec63e0a44d9ef2dc8308615f2c477826.jpg");
    const [signUpField, setSignUpField] = useState({"channelName":"", "userName":"", "password":"", "about":"" , "profilePic":uploadedImageUrl});
    const [progressBar, setProgressBar] = useState(false);
    const navigate = useNavigate();
    

    const handleInputField = (event,name)=>{
        setSignUpField({
            ...signUpField,[name]:event.target.value
        })
    }

    const uploadImage= async (e)=>{
        console.log("Uploading");
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        // youtube-clone
        data.append('upload_preset', 'youtube-clone');
        try{
            // cloudName="dgutt23y2"
            setProgressBar(true);
            const response = await axios.post("https://api.cloudinary.com/v1_1/dgutt23y2/image/upload", data);
            setProgressBar(false);
            const imageUrl = response.data.url;
            setUploadedImageUrl(imageUrl);
            setSignUpField({
                ...signUpField, "profilePic":imageUrl
            });
        }catch(err){
            console.log(err);
        }
    }

    const handleSignUp = async()=>{
        setProgressBar(true);
        axios.post('http://localhost:4000/auth/signUp', signUpField).then((res)=>{
            toast.success(res.data.message);
            setProgressBar(false);
            navigate('/');
        }).catch(err=>{
            setProgressBar(false);
            toast.error(err);
        })
    }

    
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-90">
            <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="flex items-center justify-center text-2xl font-bold text-white mb-6 space-x-3">
                    <FontAwesomeIcon icon={faYoutube} className="text-red-500" />
                    <span className="text-white">Sign Up</span>
                </div>
                <div className="space-y-4">
                    <input 
                        type="text" 
                        className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        placeholder="Channel Name"
                        value={signUpField.channelName} 
                        onChange={(e)=>{handleInputField(e,"channelName")}}
                    />
                    <input 
                        type="text" 
                        className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        placeholder="User Name" 
                        value={signUpField.userName}
                        onChange={(e)=>{handleInputField(e,"userName")}}
                    />
                    <input 
                        type="password" 
                        className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        placeholder="Password" 
                        value={signUpField.password}
                        onChange={(e)=>{handleInputField(e,"password")}}
                    />
                    <input 
                        type="text" 
                        className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                        placeholder="About Your Channel" 
                        value={signUpField.about}
                        onChange={(e)=>{handleInputField(e,"about")}}
                    />
                    <div className="flex items-center space-x-3">
                        <input type="file" className="hidden" id="uploadImage" onChange={(e)=>uploadImage(e)}/>
                        <label htmlFor="uploadImage" className="flex items-center justify-center w-16 h-16 bg-gray-600 rounded-full cursor-pointer">
                            <img 
                                className="w-full h-full object-cover rounded-full"
                                src={uploadedImageUrl}
                                alt="Upload Preview"
                            />
                        </label>
                    </div>
                    {progressBar && <ToastContainer/>}
                    <div className="flex space-x-4 mt-6">
                        <button onClick={handleSignUp} className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                            Sign Up
                        </button>
                        <Link to="/" className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg text-center block">
                            Home Page
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
