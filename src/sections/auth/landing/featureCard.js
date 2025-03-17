import React from 'react'
import PropTypes from 'prop-types';

import {
  Card,
  Typography,
  IconButton
} from '@mui/material';

const FeatureCard = ({ icon, title, description }) => (
    <Card sx={{ p: 3, height: '100%', '&:hover': { boxShadow: 6 } }}>
      <IconButton size="small" sx={{ color: 'success.main' }}>
        {icon}
      </IconButton>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography color="text.secondary">{description}</Typography>
    </Card>
)


FeatureCard.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
}

export default FeatureCard