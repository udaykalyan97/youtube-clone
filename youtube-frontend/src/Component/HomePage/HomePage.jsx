import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addHistoryItem, clearHistory } from '../Store/Store.js';

const HomePage = ({ sideNavbar, searchResults, searchQuery }) => {
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState("");


  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.video);

  const handleAddHistory = (video) => {
    // Check if the video is already in the history
    const isAlreadyInHistory = history.some((item) => item.videoId === video._id);
  
    if (!isAlreadyInHistory) {
      const newHistoryItem = {
        videoId: video._id,      
        title: video.title,     
        timestamp: new Date().toISOString(), 
      };
      dispatch(addHistoryItem(newHistoryItem)); // Dispatch the action with the new history item
    }
  };
  
  

  useEffect(() => {
    if (!searchResults?.success) {
      axios
        .get('http://localhost:4000/api/allVideo')
        .then((res) => {
          setData(res.data.videos); 
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [searchResults]);

  // Filtered videos based on selectedType
  const filteredVideos =
    selectedType === "History"
      ? history.map((item) => data.find((video) => video._id === item.videoId))
      : selectedType === ""
      ? data
      : data.filter((video) => video.videoType === selectedType);

  // Videos to display based on search or filter
  const displayVideos =
    searchResults?.success && searchQuery?.trim()
      ? searchResults.videos
      : filteredVideos;

  // Extract unique video types
  const options = ["History",...new Set(data.map((item) => item.videoType))];

  return (
    <div className="bg-gray-900">
      <div className={`flex flex-col min-h-screen ${sideNavbar ? 'ml-72' : ''}`}>

        {/* Filter Options */}
        <div className="flex fixed top-14 w-full box-border gap-2 overflow-x-scroll bg-gray-900 text-white px-4 py-2">
          <div
            onClick={() => setSelectedType("")} // Show all videos when no type is selected
            className={`flex-shrink-0 h-8 px-4 py-1 bg-gray-800 text-white font-medium rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 hover:scale-105 transition-transform duration-300 ${selectedType === "" ? "bg-blue-500" : ""
              }`}
          >
            All
          </div>
          {options.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedType(item)}
              className={`flex-shrink-0 h-8 px-4 py-1 bg-gray-800 text-white font-medium rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 hover:scale-105 transition-transform duration-300 ${selectedType === item ? "bg-blue-500" : ""
                }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Videos Grid */}
        <div
          className={`grid ${sideNavbar ? 'lg:grid-cols-4' : 'lg:grid-cols-5'
            } sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 pt-24 mt-3`}
        >
          {displayVideos?.map((item, ind) => (
            <Link
              key={ind}
              to={`/watch/${item._id}`}
              className="flex flex-col cursor-pointer rounded-lg hover:scale-110 hover:border hover:border-blue-400 transition-transform duration-300"
              onClick={() => handleAddHistory(item)}
            >
              {/* Video Thumbnail */}
              <div className="relative group">
                <img
                  src={item.thumbnail}
                  alt="Thumbnail"
                  className="w-full rounded-lg object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-gray-900 text-white text-xs px-1.5 py-0.5 rounded-sm">
                  28:05
                </div>
              </div>

              {/* Video Details */}
              <div className="flex mt-3 flex-col">
                <div className="text-white font-medium text-sm line-clamp-2">
                  {item?.title}
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  {item?.user?.channelName}
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  {item?.like} likes
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
