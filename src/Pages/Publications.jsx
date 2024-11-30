import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

const mockPublications = [
  {
    id: 1,
    title: "React for Beginners",
    subtitle: "A comprehensive guide to learning React",
    category: "Programming",
    language: "English",
    coverImage: "https://via.placeholder.com/150",
    description: "Learn React from scratch with this comprehensive guide.",
    author: "John Doe",
    email: "john@example.com",
    pages: 300,
    price: "29.99",
    date: "2022-01-01",
    pdfFile: "https://example.com/sample.pdf",
  },
  {
    id: 2,
    title: "Advanced Node.js",
    subtitle: "Master Node.js for backend development",
    category: "Programming",
    language: "English",
    coverImage: "https://via.placeholder.com/150",
    description: "Take your Node.js skills to the next level.",
    author: "Jane Smith",
    email: "jane@example.com",
    pages: 400,
    price: "39.99",
    date: "2022-02-15",
    pdfFile: "https://example.com/sample.pdf",
  },
];

const Publications = () => {
  const [publications, setPublications] = useState(mockPublications);
  const [open, setOpen] = useState(false);
  const [currentPublication, setCurrentPublication] = useState({
    id: null,
    title: "",
    subtitle: "",
    category: "",
    language: "",
    coverImage: "",
    description: "",
    author: "",
    email: "",
    pages: "",
    price: "",
    date: "",
    pdfFile: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPublication({ ...currentPublication, [name]: value });
  };

  const handleCoverImageChange = (e) => {
    setCoverImageFile(e.target.files[0]);
  };

  const handlePdfFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleAddClick = () => {
    setOpen(true);
    setIsEdit(false);
    setCurrentPublication({
      id: null,
      title: "",
      subtitle: "",
      category: "",
      language: "",
      coverImage: "",
      description: "",
      author: "",
      email: "",
      pages: "",
      price: "",
      date: "",
      pdfFile: "",
    });
    setCoverImageFile(null);
    setPdfFile(null);
  };

  const handleEditClick = (publication) => {
    setOpen(true);
    setIsEdit(true);
    setCurrentPublication(publication);
    setCoverImageFile(null);
    setPdfFile(null);
  };

  const handleDeleteClick = (id) => {
    setPublications(publications.filter((pub) => pub.id !== id));
  };

  const handleSaveClick = () => {
    let coverImageUrl = currentPublication.coverImage;
    let pdfFileUrl = currentPublication.pdfFile;

    if (coverImageFile) {
      coverImageUrl = URL.createObjectURL(coverImageFile);
    }
    if (pdfFile) {
      pdfFileUrl = URL.createObjectURL(pdfFile);
    }

    const updatedPublication = {
      ...currentPublication,
      coverImage: coverImageUrl,
      pdfFile: pdfFileUrl,
    };

    if (isEdit) {
      setPublications(
        publications.map((pub) =>
          pub.id === currentPublication.id ? updatedPublication : pub
        )
      );
    } else {
      setPublications([
        ...publications,
        { ...updatedPublication, id: publications.length + 1 },
      ]);
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
          Publications
        </Typography>
      </Container>
      <IconButton color="primary" onClick={handleAddClick}>
        <AddIcon />
      </IconButton>
      <Typography variant="caption" style={{ verticalAlign: 'super' }}>Add Publication</Typography>
      {publications.length === 0 ? (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: 16 }}>
          No publications found. Please add a new publication.
        </Typography>
      ) : (
        <TableContainer component={Card} style={{ marginTop: 16 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Subtitle</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Pages</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {publications.map((publication) => (
                <TableRow key={publication.id}>
                  <TableCell>
                    <CardHeader
                      avatar={<Avatar src={publication.coverImage} />}
                      title={publication.title}
                      subheader={publication.subtitle}
                    />
                  </TableCell>
                  <TableCell>{publication.subtitle}</TableCell>
                  <TableCell>{publication.category}</TableCell>
                  <TableCell>{publication.language}</TableCell>
                  <TableCell>{publication.description}</TableCell>
                  <TableCell>{publication.author}</TableCell>
                  <TableCell>{publication.email}</TableCell>
                  <TableCell>{publication.pages}</TableCell>
                  <TableCell>{publication.price}</TableCell>
                  <TableCell>{publication.date}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(publication)}
                      >
                        <EditIcon />
                      </IconButton>
                      <Typography variant="caption">Edit</Typography>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteClick(publication.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Typography variant="caption">Delete</Typography>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleCancelClick}>
        <DialogTitle>
          {isEdit ? "Edit Publication" : "Add Publication"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEdit
              ? "Update the details of the publication."
              : "Enter the details of the new publication."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={currentPublication.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="subtitle"
            label="Subtitle"
            fullWidth
            value={currentPublication.subtitle}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            fullWidth
            value={currentPublication.category}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="language"
            label="Language"
            fullWidth
            value={currentPublication.language}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="coverImage"
            label="Cover Image URL"
            fullWidth
            value={currentPublication.coverImage}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <input
            accept="image/*"
            id="cover-image-input"
            type="file"
            onChange={handleCoverImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="cover-image-input">
            <Button
              variant="contained"
              component="span"
              style={{ marginTop: 8 }}
            >
              Upload Cover Image
            </Button>
          </label>
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={currentPublication.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="author"
            label="Author"
            fullWidth
            value={currentPublication.author}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            fullWidth
            value={currentPublication.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="pages"
            label="Pages"
            type="number"
            fullWidth
            value={currentPublication.pages}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            fullWidth
            value={currentPublication.price}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            value={currentPublication.date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <input
            accept="application/pdf"
            id="pdf-file-input"
            type="file"
            onChange={handlePdfFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="pdf-file-input">
            <Button
              variant="contained"
              component="span"
              style={{ marginTop: 8 }}
            >
              Upload PDF File
            </Button>
          </label>
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

export default Publications;
