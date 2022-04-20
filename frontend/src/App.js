import './App.css';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { React, useState } from 'react';
import axios from 'axios';

function App() {

  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleOnChangeUrl = (event) =>{
      event.preventDefault();
      setUrl(event.target.value);
  }

  const submitShortUrl = async() =>{
      const response = await axios.post('http://localhost:3030/url/',{ url });
      setShortUrl(response.data.url.shortURL);
  }

  const cleanInput = () => {
      setUrl('');
    }

  return (
    <div className="App">
      <Container maxWidth="sm">
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '55px',
          marginTop: '50px'
        }}>
          <Typography variant='h1' fontSize={35}>SHORTENER</Typography>
          <TextField variant="standard" label="URL" value={url} onChange={handleOnChangeUrl}></TextField>
          <Button  variant="contained" sx={{ mt: 3, mb: 2, text:{ color:'blue' } }} onClick={submitShortUrl}>Short URL</Button>
          <Button  variant="contained" sx={{ mt: 3, mb: 2, text:{ color:'gray' } }} onClick={cleanInput}>Clean</Button>
          <Typography color={'red'}>{shortUrl}</Typography>
        </Box>
      </Container>
    </div>
  );
}

export default App;
