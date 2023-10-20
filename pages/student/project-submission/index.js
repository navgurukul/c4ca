import React from "react";
import Completed from "@/components/submission/Completed";
import ReSubmission from "@/components/forms/ReSubmission";
import Submission from "@/components/forms/Submission";

const ProjectSubmitForm = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  return (
    <>
      {!isSubmitted ? (
        <Submission setIsSubmitted={setIsSubmitted} />
      ) : (
        <Completed />
      )}
      {/* <ReSubmission /> */}
    </>
  );
};

export default ProjectSubmitForm;
