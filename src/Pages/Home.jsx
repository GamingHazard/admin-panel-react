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
import Inbox from "../components/Inbox";

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
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 32,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ borderBottom: "2px solid #4caf50", paddingBottom: "8px" }}
        >
          Inbox
        </Typography>
      </Container>
      <Inbox />
    </Container>
  );
};

export default Home;
