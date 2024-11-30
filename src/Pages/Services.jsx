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

const mockServices = [
  {
    id: 1,
    title: "Web Development",
    description: "Building responsive and modern websites.",
    imageUrls: ["https://via.placeholder.com/150"],
  },
  {
    id: 2,
    title: "Graphic Design",
    description: "Creating stunning visuals and graphics.",
    imageUrls: ["https://via.placeholder.com/150"],
  },
];

const Services = () => {
  const [services, setServices] = useState(mockServices);
  const [open, setOpen] = useState(false);
  const [currentService, setCurrentService] = useState({
    id: null,
    title: "",
    description: "",
    imageUrls: [],
  });
  const [isEdit, setIsEdit] = useState(false);
  const [files, setFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentService({ ...currentService, [name]: value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleAddClick = () => {
    setOpen(true);
    setIsEdit(false);
    setCurrentService({
      id: null,
      title: "",
      description: "",
      imageUrls: [],
    });
    setFiles([]);
  };

  const handleEditClick = (service) => {
    setOpen(true);
    setIsEdit(true);
    setCurrentService(service);
    setFiles([]);
  };

  const handleDeleteClick = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleSaveClick = () => {
    const updatedImageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    const updatedService = {
      ...currentService,
      imageUrls: [...currentService.imageUrls, ...updatedImageUrls],
    };

    if (isEdit) {
      setServices(
        services.map((service) =>
          service.id === currentService.id ? updatedService : service
        )
      );
    } else {
      setServices([...services, { ...updatedService, id: services.length + 1 }]);
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
          Services
        </Typography>
      </Container>
      <IconButton color="primary" onClick={handleAddClick}>
        <AddIcon />
      </IconButton>
      <Typography variant="caption" style={{ verticalAlign: 'super' }}>Add Service</Typography>
      {services.length === 0 ? (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: 16 }}>
          No services found. Please add a new service.
        </Typography>
      ) : (
        <Grid container spacing={3} style={{ marginTop: 16 }}>
          {services.map((service) => (
            <Grid item xs={12} key={service.id}>
              <Card style={{ padding: 16 }}>
                <CardHeader
                  avatar={<Avatar>{service.title[0]}</Avatar>}
                  title={service.title}
                  subheader={service.description}
                />
                <CardContent>
                  {service.imageUrls.map((imageUrl, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      image={imageUrl}
                      alt={service.title}
                      style={{ marginTop: 16 }}
                    />
                  ))}
                  <div style={{ marginTop: 16 }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(service)}
                    >
                      <EditIcon />
                    </IconButton>
                    <Typography variant="caption">Edit</Typography>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteClick(service.id)}
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
          {isEdit ? "Edit Service" : "Add Service"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEdit
              ? "Update the details of the service."
              : "Enter the details of the new service."}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={currentService.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={currentService.description}
            onChange={handleInputChange}
          />
          <input
            accept="image/*"
            id="file-input"
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ marginTop: 16 }}
          />
          <label htmlFor="file-input">
            <Typography variant="caption">Upload Images</Typography>
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

export default Services;
