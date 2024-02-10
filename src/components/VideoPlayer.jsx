import React, { useState, useEffect } from 'react';
import { FaPlus, FaYoutube, FaArrowLeft } from 'react-icons/fa';

const VideoPlayer = () => {
  const [youtubeURLs, setYoutubeURLs] = useState(['']);
  const [allowAdding, setAllowAdding] = useState(true);
  const [latestVideoId, setLatestVideoId] = useState(null);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);

  useEffect(() => {
    const latestId = extractVideoId(youtubeURLs[youtubeURLs.length - 1]);
    setLatestVideoId(latestId);
    setCurrentPlayingIndex(null);
  }, [youtubeURLs]);

  const handleURLChange = (e, index) => {
    const updatedURLs = [...youtubeURLs];
    updatedURLs[index] = e.target.value;
    setYoutubeURLs(updatedURLs);

    const latestId = extractVideoId(updatedURLs[updatedURLs.length - 1]);
    setLatestVideoId(latestId);
    setCurrentPlayingIndex(index === currentPlayingIndex ? null : index);
  };

  const handleAddInput = () => {
    if (allowAdding) {
      setYoutubeURLs([...youtubeURLs, '']);
      setAllowAdding(false);
    }
  };

  const handleGoBack = () => {
    if (youtubeURLs.length > 1) {
      const updatedURLs = [...youtubeURLs];
      updatedURLs.pop();
      setYoutubeURLs(updatedURLs);

      const latestId = extractVideoId(updatedURLs[updatedURLs.length - 1]);
      setLatestVideoId(latestId);
      setCurrentPlayingIndex(null);
    }
  };

  const extractVideoId = (url) => {
    const videoId = url?.split('v=')[1] || url?.split('youtu.be/')[1];
    return videoId;
  };

  return (
    <div>
      {youtubeURLs.map((url, index) => (
        <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <FaYoutube size={35} color="#ff0000" />
          <input
            type="text"
            value={url}
            onChange={(e) => handleURLChange(e, index)}
            style={{
              marginRight: '20px',
              marginLeft: '10px',
              border: '2px solid #678983',
              width: '250px',
              height: '25px',
              borderRadius: '25px',
            }}
          />

          {index === youtubeURLs.length - 1 && allowAdding && (
            <FaPlus
              size={14}
              onClick={handleAddInput}
              style={{
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            />
          )}

          {index > 0 && (
            <FaArrowLeft
              onClick={handleGoBack}
              size={20}
              style={{
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            />
          )}
        </div>
      ))}
      {/* {latestVideoId && (
        <iframe
          width="350"
          height="200"
          src={`https://www.youtube.com/embed/${latestVideoId}`}
          title="YouTube Video Player"
          allowFullScreen
        ></iframe>
      )} */}
    </div>
  );
};

export default VideoPlayer;
