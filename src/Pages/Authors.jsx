import React, { useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import Settings from "../components/Settings";

const mockAuthors = [
  {
    id: 1,
    authorName: "Author One",
    bio: "Bio of Author One",
    contentTitle: "Content One",
    contentCategory: "Category One",
    language: "English",
    description: "Description of Content One",
  },
  {
    id: 2,
    authorName: "Author Two",
    bio: "Bio of Author Two",
    contentTitle: "Content Two",
    contentCategory: "Category Two",
    language: "Spanish",
    description: "Description of Content Two",
  },
  {
    id: 3,
    authorName: "Author Three",
    bio: "Bio of Author Three",
    contentTitle: "Content Three",
    contentCategory: "Category Three",
    language: "French",
    description: "Description of Content Three",
  },
];

const Authors = () => {
  const [authors, setAuthors] = useState(mockAuthors);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpenDialog = (author) => {
    setSelectedAuthor(author);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAuthor(null);
  };

  const handleDelete = (id) => {
    setAuthors(authors.filter((author) => author.id !== id));
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "60px",
        }}
      ></Container>
      <Settings />
    </Container>
  );
};

export default Authors;
