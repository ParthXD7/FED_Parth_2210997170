import React, { useRef, useState, useEffect } from 'react';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

function AudioPlayer({ src, title, songs }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);  // Consider setting volume to 0 for autoplay on load.
  const audioRef = useRef(new Audio(src));
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
      audio.play().catch(() => {
        console.error("Playback failed. User has not interacted with the document yet.");
      });
    });
    audio.addEventListener('timeupdate', (e) => {
      setCurrentTime(e.target.currentTime);
    });

    return () => {
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', () => {});
    };
  }, [src]);  // Ensure this effect runs only if the src changes

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleChange = (event, newValue) => {
    setCurrentTime(newValue);
    audioRef.current.currentTime = newValue;
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    audioRef.current.volume = newValue / 100;
  };

  const handleNext = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      audioRef.current.src = songs[currentSongIndex + 1].src;
      audioRef.current.load();
      togglePlayPause();
    }
  };
  
  const handlePrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      audioRef.current.src = songs[currentSongIndex - 1].src;
      audioRef.current.load();
      togglePlayPause();
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      mt: 2,
      bgcolor: 'background.paper',
      boxShadow: 3,
      borderRadius: 2,
      p: 2,
    }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton color="primary" onClick={handlePrevious}>
          <SkipPreviousIcon />
        </IconButton>
        <IconButton color="primary" onClick={togglePlayPause}>
          {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
        </IconButton>
        <IconButton color="primary" onClick={handleNext}>
          <SkipNextIcon />
        </IconButton>
      </Box>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={currentTime}
        min={0}
        step={1}
        max={duration}
        onChange={handleChange}
        sx={{ width: 300, mt: 2 }}
        color="secondary"
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
        <IconButton color="primary" onClick={() => setVolume(Math.max(0, volume - 10))}>
          <VolumeDownIcon />
        </IconButton>
        <Slider
          aria-label="volume-indicator"
          size="small"
          value={volume}
          min={0}
          max={100}
          onChange={handleVolumeChange}
          sx={{ width: 150 }}
          color="secondary"
        />
        <IconButton color="primary" onClick={() => setVolume(Math.min(100, volume + 10))}>
          <VolumeUpIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default AudioPlayer;
