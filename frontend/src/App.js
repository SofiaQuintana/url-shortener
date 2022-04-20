import './App.css';
import { Button, Container, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

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
          <Typography variant='h1' fontSize={40}>SHORTENER</Typography>
          <TextField value={url} onChange={handleOnChangeUrl}></TextField>
          <Button onClick={cleanInput}>Clean</Button>
          <Button onClick={submitShortUrl}>Short URL</Button>
          <Typography color={'green'}>{shortUrl}</Typography>
        </Box>
      </Container>
    </div>
  );
}

export default App;
