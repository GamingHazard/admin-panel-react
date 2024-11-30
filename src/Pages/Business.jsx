import React, { useState } from "react";
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

const mockCompanies = [
  {
    id: 1,
    name: "Tech Innovators",
    category: "Technology",
    email: "info@techinnovators.com",
    website: "https://techinnovators.com",
    description: "Innovative tech solutions.",
    location: "Silicon Valley, CA",
    phone: "123-456-7890",
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Green Energy",
    category: "Energy",
    email: "contact@greenenergy.com",
    website: "https://greenenergy.com",
    description: "Sustainable energy solutions.",
    location: "Austin, TX",
    phone: "098-765-4321",
    imageUrl: "https://via.placeholder.com/150",
  },
];

const Business = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [open, setOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState({
    id: null,
    name: "",
    category: "",
    email: "",
    website: "",
    description: "",
    location: "",
    phone: "",
    imageUrl: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCompany({ ...currentCompany, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddClick = () => {
    setOpen(true);
    setIsEdit(false);
    setCurrentCompany({
      id: null,
      name: "",
      category: "",
      email: "",
      website: "",
      description: "",
      location: "",
      phone: "",
      imageUrl: "",
    });
    setFile(null);
  };

  const handleEditClick = (company) => {
    setOpen(true);
    setIsEdit(true);
    setCurrentCompany(company);
    setFile(null);
  };

  const handleDeleteClick = (id) => {
    setCompanies(companies.filter((company) => company.id !== id));
  };

  const handleSaveClick = () => {
    if (isEdit) {
      setCompanies(
        companies.map((company) =>
          company.id === currentCompany.id ? currentCompany : company
        )
      );
    } else {
      setCompanies([
        ...companies,
        { ...currentCompany, id: companies.length + 1 },
      ]);
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
          Companies
        </Typography>
      </Container>
      <IconButton color="primary" onClick={handleAddClick}>
        <AddIcon />
      </IconButton>
      <Typography variant="caption" style={{ verticalAlign: "super" }}>
        Add Company
      </Typography>
      {companies.length === 0 ? (
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ marginTop: 16 }}
        >
          No companies found. Please add a new company.
        </Typography>
      ) : (
        <TableContainer component={Card} style={{ marginTop: 16 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <CardHeader
                      avatar={<Avatar src={company.imageUrl} />}
                      title={company.name}
                      subheader={company.category}
                    />
                  </TableCell>
                  <TableCell>{company.category}</TableCell>
                  <TableCell>{company.email}</TableCell>
                  <TableCell>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.website}
                    </a>
                  </TableCell>
                  <TableCell>{company.description}</TableCell>
                  <TableCell>{company.location}</TableCell>
                  <TableCell>{company.phone}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(company)}
                      >
                        <EditIcon />
                      </IconButton>
                      <Typography variant="caption">Edit</Typography>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteClick(company.id)}
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
        <DialogTitle>{isEdit ? "Edit Company" : "Add Company"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEdit
              ? "Update the details of the company."
              : "Enter the details of the new company."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={currentCompany.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            fullWidth
            value={currentCompany.category}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            fullWidth
            value={currentCompany.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="website"
            label="Website"
            fullWidth
            value={currentCompany.website}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={currentCompany.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            fullWidth
            value={currentCompany.location}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            fullWidth
            value={currentCompany.phone}
            onChange={handleInputChange}
          />
          <input
            accept="image/*,video/*,audio/*"
            id="file-input"
            type="file"
            onChange={handleFileChange}
            style={{ marginTop: 16 }}
          />
          <label htmlFor="file-input">
            <Typography variant="caption">
              Upload Image, Video, or Audio
            </Typography>
          </label>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelClick}
            startIcon={<CancelIcon style={{ color: "#f44336" }} />}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveClick}
            startIcon={<SaveIcon style={{ color: "#4caf50" }} />}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Business;
