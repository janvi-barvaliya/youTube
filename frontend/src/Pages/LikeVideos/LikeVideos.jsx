import React, { useContext, useEffect, useState } from 'react';
import './LikeVideos.css';
import thumbnail1 from '/Assets/thumbnail1.png';
import profile_icon from '/Assets/jack.png';
import Feed from '../../components/Feed/Feed';
import API from '../../axios';
import { UserContext } from '../../userContext';
import { formatDistanceToNow } from 'date-fns';



const LikeVideos = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const response = await API.get('/api/v1/likes/getAllLikedVideos');
        if (response.data?.data) {
          setLikedVideos(response.data.data);
        }
      } catch (error) {
        console.error('Error while fetching videos: ', error);
      }
    };

    if (user) {
      fetchLikedVideos();
    }
  }, [user]);

  return (
    <div className="feed">
      <div className="card">
        {likedVideos.length > 0 ? (
          likedVideos.map(({ likedVideo }, index) => {
            const video = likedVideo[0]; // Extracting video details
            return (
              <div className="videoBox"
                key={index}>
                <img src={video.thumbnail.url || './images/signup-backgorund.jpg'}
                  alt={video.title || 'Video thumbnail'} />
                <div className="box">
                  <div className="image">
                    <img src={video.ownerDetails?.avatar || './images/user.svg'}
                      className="profile_logo"
                      alt={video.ownerDetails?.username || 'User avatar'} />
                  </div>
                  <div className='description'>
                    <h2>{video.title || 'Untitled video'}</h2>
                    <h3>@{video.ownerDetails?.username || 'Unknown User'}</h3>      
                    <div className="info">
                      <p>{video.views || '0'} views</p> •{' '}
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

          }

          )) : (
          <p>No liked videos found </p>
        )}
        {/* <img src={thumbnail1} alt="" />
        <img src={profile_icon} className="profile_logo" alt="" />
        <h2>Best channel to learn coding that help you to be a developer</h2>
        <h3>GrateStack</h3>
        <p>15k views &bull; 2 days ago</p> */}
      </div>
    </div>
  )
}



export default LikeVideos;