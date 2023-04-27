import React from "react";
import Submission from "@/components/forms/Submission";
import ReSubmission from "@/components/forms/ReSubmission";
import { Container } from "@mui/material";

const SubmissionForm = () => {
  return (
    <Container maxWidth="sm">
      {/* <Submission /> */}
      <ReSubmission />
    </Container>
  );
};

export default SubmissionForm;
