import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const TitleBar: React.FC = () => (
  <AppBar>
    <Toolbar>
      <Typography variant="h2">Savęs vertinimas</Typography>
    </Toolbar>
  </AppBar>
);

export default TitleBar;
