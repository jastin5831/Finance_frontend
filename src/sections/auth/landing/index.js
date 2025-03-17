import React from 'react';
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from "src/routes/hooks";
import Logo from "src/components/logo";

import VisaCard from 'src/assets/landnig/card.jpg';
import { footer, connect, feature, keyMetrix } from 'src/utils/variable';

import FeatureCard from './featureCard';
import MetricCard from './metricCard';
import TransactionRow from './transactionRow';


const Landing = () => {
  const router = useRouter();
  const returnTo = paths.auth.jwt.login;

  return (
    <Box sx={{ 
      minHeight: "100vh", display: "flex", flexDirection: "column", 
      minWidth:"100%", alignItems: "center", textAlign: "center", position: "relative", 
    }}>
      {/* Header */}
      <AppBar 
        position="fixed" color="inherit" elevation={1} 
        sx={{
          maxHeight:"70px",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
          boxShadow: 'none', 
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1} paddingLeft={6}>
            <Logo/> 
          </Box>
          <Box 
            color="primary"  onClick={()=>{router.replace(returnTo)}}
            sx={{
              mr: '3%', 
              cursor: 'pointer', 
              transition: 'transform 0.3s ease, color 0.3s ease',
              '&:hover': {
                transform: 'scale(1.15)',
                color: '#41c1af',
              }
            }} 
          >  
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" d="M18.5 20.247V16S16 14.5 12 14.5S5.5 16 5.5 16v4.247M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Zm10.426.5S8.5 10.68 8.5 8c0-1.933 1.569-3.5 3.504-3.5A3.495 3.495 0 0 1 15.5 8c0 2.68-3.426 4.5-3.426 4.5z" strokeWidth="1"/>
            </svg>
          </Box>
        </Box>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ pt: 15, width:'95%'}}>
        <Box maxWidth="md" mx="auto" textAlign="center">
          <Typography component="pre" variant="h1" mt={10} padding={5}>
            {`Empower Your Business with
                      Smart Financial Solutions`}
          </Typography>
          <Typography variant="h5"  mb={4}>
            Streamline your finances with a secure, analytics-powered platform for budgeting, forecasting, and automated transactions.
          </Typography>
        </Box>
      </Box>

      {/* Features Grid */}
      <Box py={10} sx={{ width:'95%'}}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
          {feature.map((item, index) => (
            <Box key={index} sx={{ width: { xs: '100%', md: '50%', lg: '33.33%' }, p: 2 }}>
              <FeatureCard icon={item.icon} title={item.title} description={item.description} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Stats Section */}
      <Box py={10} bgcolor="primary.main" color="white" sx={{ width:'95%'}}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
          {[
            { value: "500+", label: "Businesses Served" },
            { value: "$2B+", label: "Transactions Processed" },
            { value: "99.9%", label: "Uptime Guaranteed" }
          ].map((stat, index) => (
            <Box key={index} sx={{ width: { xs: '100%', md: '33.33%' }, p: 2, textAlign: 'center' }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {stat.value}
              </Typography>
              <Typography variant="h6">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Dashboard Section */}
      <Box py={10} sx={{ width:'95%'}}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" gutterBottom color="text.secondary">Your Financial Dashboard</Typography>
          <Typography color="text.secondary">
            Get real-time insights into your business performance
          </Typography>
        </Box>

        {/* Key Metrics */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5, mb: 4 }}>
          {keyMetrix.map((metric, index) => (
            <Box key={index} sx={{ width: { xs: '100%', md: '50%', lg: '25%' }, p: 1.5 }}>
              <MetricCard title={metric.title} value={metric.value} change={metric.change} isPositive={metric.isPositive} icon={metric.icon}/>
            </Box>
          ))}
        </Box>

        {/* Charts Section */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5, mb: 4 }}>
          <Box sx={{ width: { xs: '100%', lg: '50%' }, p: 1.5 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Revenue Overview</Typography>
                <Box height={256} overflow="hidden" borderRadius={1}>
                  <img 
                    src="https://images.unsplash.com/photo-1543286386-2e659306cd6c"
                    alt="Revenue Line Chart"
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ width: { xs: '100%', lg: '50%' }, p: 1.5 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Expense Distribution</Typography>
                <Box height={256} overflow="hidden" borderRadius={1}>
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                    alt="Expense Pie Chart"
                    style={{ width: '100%', height: '100%'}}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Recent Transactions */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TransactionRow
                    name="Software Subscription"
                    amount="2,500.00"
                    date="Mar 15, 2024"
                    status="Completed"
                  />
                  <TransactionRow
                    name="Office Supplies"
                    amount="436.50"
                    date="Mar 14, 2024"
                    status="Pending"
                  />
                  <TransactionRow
                    name="Marketing Campaign"
                    amount="1,750.00"
                    date="Mar 13, 2024"
                    status="Completed"
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card sx={{ mb: 4, mt:7}}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Payment Methods</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
              {[
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
                "https://images.unsplash.com/photo-1542435503-956c469947f6",
                VisaCard
              ].map((url, index) => (
                <Box key={index} sx={{ width: { xs: '100%', md: '33.33%' }, p: 1.5 }}>
                  <Paper elevation={1} sx={{ overflow: 'hidden', height: 260 }}>
                    <img 
                      src={url}
                      alt="Credit Card"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Paper>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Testimonial */}
      <Box py={10} sx={{ width:'95%'}}>
        <Box maxWidth="md" mx="auto" textAlign="center" color="text.secondary">
          <Typography variant="h4" component="blockquote" gutterBottom sx={{ fontStyle: 'italic' }}>
            Totadvi has transformed how we manage our finances. The insights and automation have saved us countless hours and helped us make better decisions.
          </Typography>
          <Typography color="text.secondary">
            Chris Greco, CEO of Totadvi Inc.
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box py={6} color="white" sx={{ width:'95%'}}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {footer.map((section, index) => (
            <Box key={index} sx={{ width: { xs: '100%', md: '25%' }, p: 2 }}>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <IconButton size="small" sx={{ color: 'success.main' }}>
                  {section.icon}    
                </IconButton>
                <Typography variant="h5" color='success.main'>{section.title}</Typography>
              </Box>
              <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
                {section.items.map((item) => (
                  <Box component="li" key={item} mb={1}>
                    <Typography color="grey.500">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
          <Box sx={{ width: { xs: '100%', md: '25%' }, p: 2 }}>
            <Box display='flex' justifyContent='center' alignItems='center'>
              <IconButton size="small" sx={{ color: 'success.main' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                  <path fill="currentColor" d="M12.5 9c-1 0-1.8.4-2.4 1L6.9 8.3c.1-.3.1-.5.1-.8v-.4l2.9-1.3c.6.7 1.5 1.2 2.6 1.2C14.4 7 16 5.4 16 3.5S14.4 0 12.5 0S9 1.6 9 3.5v.4L6.1 5.2C5.5 4.5 4.6 4 3.5 4C1.6 4 0 5.6 0 7.5S1.6 11 3.5 11c1 0 1.8-.4 2.4-1L9 11.7v.8c0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5S14.4 9 12.5 9m0-8C13.9 1 15 2.1 15 3.5S13.9 6 12.5 6S10 4.9 10 3.5S11.1 1 12.5 1m-9 9C2.1 10 1 8.9 1 7.5S2.1 5 3.5 5S6 6.1 6 7.5S4.9 10 3.5 10m9 5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5"/>
                </svg>             
              </IconButton>
              <Typography variant="h5" color='success.main'>Connect</Typography>
            </Box>
            <Box display="flex" gap={2} justifyContent='center' pt={2}>
              {connect.map((item, index) => (
                <IconButton size="small"  key={index}>
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 4, borderColor: 'grey.800' }} />
        <Typography color="grey.500" textAlign="center">
          © 2024 Finance Totadvi. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Landing;