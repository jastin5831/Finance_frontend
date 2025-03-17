import React from 'react'
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton
} from '@mui/material';

const MetricCard = ({ title, value, change, isPositive, icon }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography >{title}</Typography>
          <IconButton size="small" sx={{ color: 'success.main' }}>
            {icon}
          </IconButton>
        </Box>
        <Typography variant="h4" gutterBottom >{value}</Typography>
        <Box display="flex" alignItems="center" color={isPositive ? 'success.main' : 'error.main'}>
          {isPositive ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"><path d="m3 17l6-6l4 4l8-8"/><path d="M17 7h4v4"/></g>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                <path fill="currentColor" d="M238 128v64a6 6 0 0 1-6 6h-64a6 6 0 0 1 0-12h49.52L136 104.49l-35.76 35.75a6 6 0 0 1-8.48 0l-72-72a6 6 0 0 1 8.48-8.48L96 127.51l35.76-35.75a6 6 0 0 1 8.48 0L226 177.52V128a6 6 0 0 1 12 0"/>
            </svg>
          )}
          <Typography>{change}</Typography>
        </Box>
      </CardContent>
    </Card>
)

MetricCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  change: PropTypes.string,
  isPositive: PropTypes.bool,
  icon: PropTypes.object
}

export default MetricCard