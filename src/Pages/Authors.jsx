import React, { useState } from 'react';
import { Container, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, Snackbar, Alert, Grid } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, Close as CloseIcon } from '@mui/icons-material';

const mockAuthors = [
  { id: 1, authorName: 'Author One', bio: 'Bio of Author One', contentTitle: 'Content One', contentCategory: 'Category One', language: 'English', description: 'Description of Content One' },
  { id: 2, authorName: 'Author Two', bio: 'Bio of Author Two', contentTitle: 'Content Two', contentCategory: 'Category Two', language: 'Spanish', description: 'Description of Content Two' },
  { id: 3, authorName: 'Author Three', bio: 'Bio of Author Three', contentTitle: 'Content Three', contentCategory: 'Category Three', language: 'French', description: 'Description of Content Three' },
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
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 32 }}>
        <Typography variant="h4" gutterBottom style={{ borderBottom: '2px solid #4caf50', paddingBottom: '8px' }}>
          Manage Authors
        </Typography>
      </Container>
      <IconButton color="primary" onClick={() => handleOpenDialog(null)}>
        <AddIcon />
      </IconButton>
      <Typography variant="caption" style={{ verticalAlign: 'super' }}>Add Author</Typography>
      {authors.length === 0 ? (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: 16 }}>
          No authors found. Please add a new author.
        </Typography>
      ) : (
        <TableContainer component={Paper} style={{ marginTop: 16 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Author Name</TableCell>
                <TableCell>Bio</TableCell>
                <TableCell>Content Title</TableCell>
                <TableCell>Content Category</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {authors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell>{author.authorName}</TableCell>
                  <TableCell>{author.bio}</TableCell>
                  <TableCell>{author.contentTitle}</TableCell>
                  <TableCell>{author.contentCategory}</TableCell>
                  <TableCell>{author.language}</TableCell>
                  <TableCell>{author.description}</TableCell>
                  <TableCell>
                    <Tooltip title="View">
                      <IconButton color="primary" onClick={() => handleOpenDialog(author)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="secondary" onClick={() => handleDelete(author.id)}>
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

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Author Details</DialogTitle>
        <DialogContent>
          {selectedAuthor && (
            <Container sx={{ padding: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Author Name"
                    variant="outlined"
                    fullWidth
                    value={selectedAuthor.authorName}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Bio"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={selectedAuthor.bio}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Content Title"
                    variant="outlined"
                    fullWidth
                    value={selectedAuthor.contentTitle}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Content Category"
                    variant="outlined"
                    fullWidth
                    value={selectedAuthor.contentCategory}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Language"
                    variant="outlined"
                    fullWidth
                    value={selectedAuthor.language}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={selectedAuthor.description}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
            </Container>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" startIcon={<CloseIcon />}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Author deleted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Authors;
