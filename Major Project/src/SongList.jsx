import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, CardActionArea, CardMedia, useTheme } from '@mui/material';
import AudioPlayer from './AudioPlayer';

const songs = [
  { title: "Song 1", artist: "Artist 1", src: "/songs/01.mp3", cover: "https://deepai.org/static/images/cyberpunkdolphin.png" },
  { title: "Song 2", artist: "Artist 2", src: "/songs/02.mp3", cover: "https://deepai.org/static/images/cyberpunkdolphin.png" },
  // Add more songs and covers as needed
];

function SongList() {
  const theme = useTheme();
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = searchTerm
    ? songs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : songs;

  return (
    <>
      <TextField
        label="Search Songs"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Grid container spacing={2}>
        {filteredSongs.map((song, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={3} sx={{ maxWidth: 345, transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardActionArea onClick={() => setCurrentSong(song)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={song.cover}
                  alt={`Cover for ${song.title}`}
                />
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {song.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {song.artist}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {currentSong && <AudioPlayer src={currentSong.src} title={`${currentSong.title} - ${currentSong.artist}`} />}
    </>
  );
}

export default SongList;

