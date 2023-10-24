import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function MyBreadcrumbs() {
    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Aarti For Girls</Typography>
      </Breadcrumbs>
    );
  }

  export default MyBreadcrumbs;