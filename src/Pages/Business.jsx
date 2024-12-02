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
import AllCustomers from "../components/AllCustomers";

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
          marginTop: "60px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ borderBottom: "2px solid #4caf50", paddingBottom: "8px" }}
        >
          Locations of All Approved Customers
        </Typography>
      </Container>
      <AllCustomers />
    </Container>
  );
};

export default Business;
