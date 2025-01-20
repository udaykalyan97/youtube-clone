import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = ({ sideNavbar, searchResults, searchQuery }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!searchResults?.success) {
      axios
        .get('http://localhost:4000/api/allVideo')
        .then((res) => {
          setData(res.data.videos); // Store all videos in state
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [searchResults]);

  
  const displayVideos =
    searchResults?.success && searchQuery?.trim()
      ? searchResults.videos
      : data;

  const options = [...new Set(data.map((item) => item.videoType))];

  return (
    <div className="bg-gray-900">
      <div className={`flex flex-col min-h-screen ${sideNavbar ? 'ml-72' : ''}`}>

        {/* Filter Options */}
        <div
          className="flex fixed top-14 w-full box-border gap-2 overflow-x-scroll bg-gray-900 text-white px-4 py-2"
        >
          {options.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-8 px-4 py-1 bg-gray-800 text-white font-medium rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 hover:scale-105 transition-transform duration-300"
            >
              {item}
            </div>
          ))}
        </div>

        {/* Videos Grid */}
        <div
          className={`grid ${
            sideNavbar ? 'lg:grid-cols-4' : 'lg:grid-cols-5'
          } sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 pt-24 mt-3`}
        >
          {displayVideos?.map((item, ind) => (
            <Link
              key={ind}
              to={`/watch/${item._id}`}
              className="flex flex-col cursor-pointer rounded-lg hover:scale-110 hover:border hover:border-blue-400 transition-transform duration-300"
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
