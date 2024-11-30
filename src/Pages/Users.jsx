import React, { useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText, // Import DialogContentText here
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
  Grid,
  Avatar,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const mockUsers = [
  { id: 1, email: "user1@example.com", password: "password1", role: "admin" },
  { id: 2, email: "user2@example.com", password: "password2", role: "user" },
  { id: 3, email: "user3@example.com", password: "password3", role: "user" },
];

const User = () => {
  const [users, setUsers] = useState(mockUsers);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleOpenDialog = (user = null) => {
    if (user) {
      setIsEdit(true);
      setCurrentUser(user);
    } else {
      setIsEdit(false);
      setCurrentUser({
        id: null,
        email: "",
        password: "",
        role: "",
      });
    }
    setError(""); // Clear error message when opening dialog
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setCurrentUser({
      id: null,
      email: "",
      password: "",
      role: "",
    });
    setError(""); // Clear error message when closing dialog
  };

  const handleSave = () => {
    if (!currentUser.email || !currentUser.password || !currentUser.role) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(currentUser.email)) {
      setError("Invalid email format.");
      return;
    }
    setError(""); // Clear error message on valid input

    if (isEdit) {
      setUsers(users.map((user) => (user.id === currentUser.id ? currentUser : user)));
    } else {
      setUsers([...users, { ...currentUser, id: users.length + 1 }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const validateEmail = (email) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Container>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 32 }}>
        <Typography variant="h4" gutterBottom style={{ borderBottom: '2px solid #4caf50', paddingBottom: '8px' }}>
          Manage Users
        </Typography>
      </Container>
      <IconButton color="primary" onClick={() => handleOpenDialog()}>
        <AddIcon />
      </IconButton>
      <Typography variant="caption" style={{ verticalAlign: 'super' }}>Add User</Typography>
      {users.length === 0 ? (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: 16 }}>
          No users found. Please add a new user.
        </Typography>
      ) : (
        <TableContainer component={Paper} style={{ marginTop: 16 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleOpenDialog(user)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="secondary" onClick={() => handleDelete(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>
          {isEdit ? "Edit User" : "Add User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEdit
              ? "Update the details of the user."
              : "Enter the details of the new user."}
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={currentUser.email}
                onChange={handleChange}
                error={Boolean(error && !currentUser.email)}
                helperText={error && !currentUser.email ? error : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={currentUser.password}
                onChange={handleChange}
                error={Boolean(error && !currentUser.password)}
                helperText={error && !currentUser.password ? error : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                value={currentUser.role}
                onChange={handleChange}
                error={Boolean(error && !currentUser.role)}
                helperText={error && !currentUser.role ? error : ''}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography variant="caption" color="error">
                  {error}
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            startIcon={<CancelIcon style={{ color: '#f44336' }} />}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
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

export default User;
