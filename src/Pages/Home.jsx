import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const mockHomes = [
  {
    id: 1,
    title: "Beautiful Landscape",
    subtitle: "A serene view of nature",
    mediaType: "image",
    mediaUrls: ["https://via.placeholder.com/150"],
    description: "This is an image of a beautiful landscape.",
    createdAt: "2023-01-01",
  },
  {
    id: 2,
    title: "Inspiring Speech",
    subtitle: "Motivational talk by a famous speaker",
    mediaType: "audio",
    mediaUrls: ["https://www.example.com/audio.mp3"],
    description: "Listen to this inspiring speech to start your day right.",
    createdAt: "2023-02-01",
  },
];

const Home = () => {
  const [homes, setHomes] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentHome, setCurrentHome] = useState({
    id: null,
    title: "",
    subtitle: "",
    mediaType: "",
    mediaUrls: [],
    description: "",
    createdAt: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setHomes(mockHomes);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentHome({ ...currentHome, [name]: value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleAddClick = () => {
    setOpen(true);
    setIsEdit(false);
    setCurrentHome({
      id: null,
      title: "",
      subtitle: "",
      mediaType: "",
      mediaUrls: [],
      description: "",
      createdAt: "",
    });
    setFiles([]);
  };

  const handleEditClick = (home) => {
    setOpen(true);
    setIsEdit(true);
    setCurrentHome(home);
    setFiles([]);
  };

  const handleDeleteClick = (id) => {
    setHomes(homes.filter((home) => home.id !== id));
  };

  const handleSaveClick = () => {
    const updatedMediaUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    const updatedHome = {
      ...currentHome,
      mediaUrls: [...currentHome.mediaUrls, ...updatedMediaUrls],
    };

    if (isEdit) {
      setHomes(
        homes.map((home) => (home.id === currentHome.id ? updatedHome : home))
      );
    } else {
      setHomes([...homes, { ...updatedHome, id: homes.length + 1 }]);
    }
    setOpen(false);
  };

  const handleCancelClick = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 32 }}>
        <Typography variant="h4" gutterBottom style={{ borderBottom: '2px solid #4caf50', paddingBottom: '8px' }}>
          Home Media
        </Typography>
      </Container>
      <IconButton color="primary" onClick={handleAddClick}>
        <AddIcon />
      </IconButton>
      <Typography variant="caption" style={{ verticalAlign: 'super' }}>Add Media</Typography>
      {homes.length === 0 ? (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: 16 }}>
          No media found. Please add a new media.
        </Typography>
      ) : (
        <Grid container spacing={3} style={{ marginTop: 16 }}>
          {homes.map((home) => (
            <Grid item xs={12} key={home.id}>
              <Card style={{ padding: 16 }}>
                <CardHeader
                  avatar={<Avatar>{home.title[0]}</Avatar>}
                  title={home.title}
                  subheader={home.subtitle}
                />
                <CardContent>
                  <Typography>{home.description}</Typography>
                  {home.mediaType === "image" && home.mediaUrls.map((url, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      image={url}
                      alt={home.title}
                      style={{ marginTop: 16 }}
                    />
                  ))}
                  {home.mediaType === "video" && home.mediaUrls.map((url, index) => (
                    <CardMedia
                      key={index}
                      component="video"
                      controls
                      src={url}
                      alt={home.title}
                      style={{ marginTop: 16 }}
                    />
                  ))}
                  {home.mediaType === "audio" && home.mediaUrls.map((url, index) => (
                    <CardMedia
                      key={index}
                      component="audio"
                      controls
                      src={url}
                      alt={home.title}
                      style={{ marginTop: 16 }}
                    />
                  ))}
                  <div style={{ marginTop: 16 }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(home)}
                    >
                      <EditIcon />
                    </IconButton>
                    <Typography variant="caption">Edit</Typography>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteClick(home.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Typography variant="caption">Delete</Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={open} onClose={handleCancelClick}>
        <DialogTitle>
          {isEdit ? "Edit Media" : "Add Media"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEdit
              ? "Update the details of the media."
              : "Enter the details of the new media."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={currentHome.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="subtitle"
            label="Subtitle"
            fullWidth
            value={currentHome.subtitle}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Media Type</InputLabel>
            <Select
              name="mediaType"
              value={currentHome.mediaType}
              onChange={handleInputChange}
            >
              <MenuItem value="image">Image</MenuItem>
              <MenuItem value="video">Video</MenuItem>
              <MenuItem value="audio">Audio</MenuItem>
            </Select>
          </FormControl>
          <input
            accept={currentHome.mediaType + "/*"}
            id="file-input"
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ marginTop: 16 }}
          />
          <label htmlFor="file-input">
            <Typography variant="caption">Upload {currentHome.mediaType.charAt(0).toUpperCase() + currentHome.mediaType.slice(1)} Files</Typography>
          </label>
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={currentHome.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="createdAt"
            label="Created At"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={currentHome.createdAt ? currentHome.createdAt.split('T')[0] : ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelClick}
            startIcon={<CancelIcon style={{ color: '#f44336' }} />}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveClick}
            startIcon={<SaveIcon style={{ color: '#4caf50' }} />}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
