// Personal Details Form Fields Validation
export const Full_Name_Validation = {
  label: "Full Name",
  type: "text",
  id: "Full_Name",
  name: "Full Name",
  placeholder: "Enter Your Name",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
    pattern: {
      value: /^[a-zA-Z][a-zA-Z ]*$/,
      message: "Invalid Input",
    },
  },
};

export const Email_Validation = {
  label: "Email Address",
  type: "email",
  id: "Email",
  name: "Email Address",
  placeholder: "Enter Your Email",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "not valid",
    },
  },
};

export const Phone_Number_Validation = {
  label: "Phone Number",
  type: "tel",
  id: "number",
  name: "Phone Number",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    pattern: {
      value: /^[6-9]\d{9}$/,
      message: "not valid",
    },
    maxLength: {
      value: 10,
      message: "Phone number should be 10 digit",
    },
  },
};

export const DOB_Validation = {
  label: "Date of Birth",
  type: "date",
  id: "DOB",
  name: "DOB",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
  },
};

export const School_Validation = {
  label: "School",
  type: "text",
  id: "school",
  name: "School",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    minLength: {
      value: 3,
      message: "min 3 characters",
    },
    pattern: {
      value: /^[a-zA-Z][a-zA-Z ]*$/,
      message: "Invalid Input",
    },
  },
};


// Team Details Form Fields Validation
export const Team_Name_Validation = {
  label: 'Team Name',
  type: 'text',
  id: 'Team_Name',
  name: 'Team Name',
  validation: {
    required: {
      value: true,
      message: 'Required',
    },
    pattern: {
      value: /^[A-Za-z][ A-Za-z0-9_-]*$/,
      message: 'invalid name',
    }
  }
}


// Project Submission Form Fields Validation
export const Project_Name_Validation = {
  label: "Project Name",
  type: "text",
  id: "ProjectName",
  name: "Project Name",
  validation: {
    required: {
      value: true,
      message: "Required",
    },
  },
};

export const Project_Summary_Validation = {
  label: "Project Summary",
  type: "text",
  id: "summary",
  name: "Project Summary",
  placeholder: "Write Project Summary...",
  multiline: true,
  validation: {
    required: {
      value: true,
      message: "Required",
    },
    maxLength: {
      value: 200,
      message: "200 characters max",
    },
  },
};

export const Project_Link_Validation = {
  label: "Share Scratch Project Link",
  type: "url",
  id: "ProjectLink",
  name: "Project Link",
  validation: {
    pattern: {
      value: "",
      message: "Please provide valid URL",
    },
  },
};

export const Project_File_Validation = {
  type: "file",
  id: "ProjectFile",
  name: "Prject File",
  multiple: false,
};
