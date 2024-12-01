import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import Approved from "../components/Approved";

const Publications = () => {
  return (
    <Container>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      ></Container>
      <Approved />
    </Container>
  );
};

export default Publications;
