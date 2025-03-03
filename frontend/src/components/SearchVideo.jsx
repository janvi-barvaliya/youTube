import React, { useEffect, useState } from 'react'
import API from '../axios';
import { useLocation } from 'react-router-dom';
import { formatDistanceToNow } from "date-fns";


const SearchVideo = () => {
    const location = useLocation();
    const [videos, setVideos] = useState([]);
    const [channels, setChannels] = useState([]);

    // Extract query from URL
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        // Fetching search videos
        const fetchVideos = async () => {
            try {
                const response = await API.get(`/api/v1/searches?query=${query}`);
                const { videos, channels } = response.data.data;

                setVideos(videos);
                setChannels(channels);
            } catch (error) {
                console.error('Error while fetching searched videos: ', error);
            }
        };
        if (query) {
            fetchVideos();
        }
    }, [query]);

    const hasVideos = videos.length > 0;
    const hasChannels = channels.length > 0;
    return (
        <div className="feed">
            <div className="card">
                {hasVideos &&
                    videos.map((video) => (
                        <div className="videoBox"
                            key={video._id}
                        >
                            <div className="box">
                                <img src={video.thumbnail.url} alt={video.title} />
                            </div>
                           
                                <div className="feed-info">
                                    <div className="user">
                                    <img src={video.ownerDetails.avatar}
                                        className="profile_logo"
                                        alt={video.title} />
                                    </div> 
                                    <div className='description'>
                                    <h2>{video.title}</h2>
                                    <h3>@{video.ownerDetails.username}</h3>
                                    <div className="info">
                                        <p>{video.views} views •{' '} </p>
                                        <p>
                                            {formatDistanceToNow(new Date(video.createdAt), {
                                                addSuffix: true,
                                            })}
                                        </p>
                                    </div>
                                </div>                                  
                                </div>                              
                           
                        </div>

                    )
                    )}

                {hasVideos &&
                    channels.map((channel) => (
                        <div className="channelItem"
                            key={channel._id}
                        >
                            <div className="channelBox">
                                <div className="channelLogo">
                                <img src={channel.avatar} alt={channel.name} />
                                </div>
                            </div>
                           <div className="channelInfo">
                           <div className='description'>
                                <h2>{channel.name}</h2>
                                <h3>@{channel.username}</h3>
                                <p>{channel.subscriberCount} subscribers</p>
                            </div>
                           </div>                         
                        </div>

                    ) )}               
                {!hasVideos && !hasChannels && <h1>No videos or channels found</h1>}
            </div>
        </div>

    )
}

export default SearchVideo;