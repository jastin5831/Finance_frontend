import { Card, CardContent, Box, Typography, useTheme} from "@mui/material";
import PropTypes from 'prop-types';

import CreditCardImage1 from "src/assets/landnig/card-visa.png";
import FlowChartImage1 from 'src/assets/landnig/chart1.jpg';
import FlowChartImage2 from 'src/assets/landnig/chart2.png';
import PieChartImage from 'src/assets/landnig/chart-pie.png';
import Logo from "src/components/logo";
import { paths } from 'src/routes/paths';
import { useRouter } from "src/routes/hooks";

export default function JwtLandingPage() {
  const router = useRouter();
  const returnTo = paths.auth.jwt.login;
  const theme = useTheme()
  return (
    <Box 
      sx={{ 
        minHeight: "100vh", display: "flex", flexDirection: "column", 
        minWidth:"100%", alignItems: "center", textAlign: "center", position: "relative", 
      }}
    >
      <Box sx={{display:"flex", alignItems:'center', mt:'2%', width:'100%', justifyContent:'space-between'}}>
        <Box sx={{ml:"2%", display:"flex",alignItems:"center"}}>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" d="M18.5 20.247V16S16 14.5 12 14.5S5.5 16 5.5 16v4.247M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Zm10.426.5S8.5 10.68 8.5 8c0-1.933 1.569-3.5 3.504-3.5A3.495 3.495 0 0 1 15.5 8c0 2.68-3.426 4.5-3.426 4.5z" strokeWidth="1"/>
          </svg>
        </Box>
      </Box>
      <Box 
        sx={{ 
          display: "flex", 
          alignItems: "center", 
          width: "100%", 
          justifyContent: "space-between",
          borderBottom: "1px solid white",  
          pb: "10px"  
        }}
      />
      <Box sx={{display: "flex", flexDirection: "column",textAlign: "center", alignItems: "center", mt: "5%", mb:"10%"}}>
        <Typography component="pre" variant="h1" mt={10} padding={5}>
          {`Empower Your Business 
                                          with Smart Financial Solutions`}
        </Typography>
        <Typography component="pre" variant="h3" sx={{ mt: 5, maxWidth: "60%" }}>
          {`Our platform helps small and medium-sized businesses manage their finances with 
              budgeting, forecasting, and automated transaction processing.`}
        </Typography>
      </Box>
      {/* line chart and credit card */}
      <Box 
        sx={{ 
          mt: 10,  
          alignItems: "center", position: "relative", width: "100%" 
        }}
      >
        <Box 
          src={FlowChartImage2} alt="Line Chart" component="img"
          sx={{ 
            borderRadius: "0.5rem", width:"90%", height:'600px', 
            position: "relative", zIndex: 1 
          }}
        />
        <Box 
          src={CreditCardImage1} alt="Credit Card" component="img"
          sx={{ 
            width: "30rem", borderRadius: "0.5rem", 
            position: "absolute", top: "60%", right: "5%", 
            transform: "translate(0%, -50%)", zIndex: 2 
          }}
        />  
      </Box>

      <Box 
        sx={{ 
          mt: 5, display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 6, 
          width: "90%" 
        }}
      >
        <FeatureCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 48 48" color={`${theme.palette.primary.main}`}>
              <circle cx="24" cy="24" r="21.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
              <circle cx="24" cy="24" r="12.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M18.794 29.31a3.14 3.14 0 0 0 3.062 1.49h2.013a4.26 4.26 0 0 0 4.015-3.4h0a2.752 2.752 0 0 0-2.772-3.4h-2.224a2.752 2.752 0 0 1-2.772-3.4h0a4.26 4.26 0 0 1 4.015-3.4h2.013a3.14 3.14 0 0 1 3.062 1.49m-3.963-1.49l.311-1.7m-3.108 17l.311-1.7M24 36.5v8.999M13.194 17.716l-7.779-4.524m29.449 4.626l7.822-4.451" strokeWidth="1"/>
            </svg>}
          title="Budgeting&Forecasting"
          description="Plan your business growth with intelligent forecasting tools."
        />
        <FeatureCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 24 24" color={`${theme.palette.primary.main}`}>
              <path fill="currentColor" d="m6 16.5l-3 2.94V11h3m5 3.66l-1.57-1.34L8 14.64V7h3m5 6l-3 3V3h3m2.81 9.81L17 11h5v5l-1.79-1.79L13 21.36l-3.47-3.02L5.75 22H3l6.47-6.34L13 18.64"/>
            </svg>
          }
          title="Financial Statements"
          description="Generate real-time reports and financial insights effortlessly."
        />
        <FeatureCard
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 48 48" color={`${theme.palette.primary.main}`}>
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.8">
                <path d="M24.008 41L24 23m16.518 11.316A9.21 9.21 0 0 0 44 24c-1.213-3.83-4.93-5.929-8.947-5.925h-2.321a14.737 14.737 0 1 0-25.31 13.429"/>
                <path d="M30.364 27.636L24 21.272l-6.364 6.364"/>
              </g>
            </svg>}
          title="Transaction Uploads"
          description="Easily upload and process financial transactions securely."
        />
      </Box>
      {/* barchart and line chart */}
      <Box 
        sx={{ 
          mt: 10, mb: 10, display: "flex", justifyContent: "center", 
          alignItems: "center", position: "relative", width: "100%" 
        }}
      >
        <Box 
          component="img"
          src={FlowChartImage1}
          alt="Flow Chart"
          sx={{ 
            borderRadius: "0.5rem", width:"90%", height:"500px", 
            position: "relative", zIndex: 1 
          }}
        />
        <Box 
          component="img"
          src={PieChartImage}
          alt="Pie Chart"
          sx={{ 
            width: "30rem", borderRadius: "0.5rem", 
            position: "absolute", top: "60%", left: "20%", 
            transform: "translate(-50%, -50%)", zIndex: 2 
          }}
        />
      </Box>
    </Box>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card sx={{p: 7, borderRadius: "1rem", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", textAlign: "center" }}>
      <CardContent>
        {icon}
        <Typography variant="h3" >{title}</Typography>
        <Typography variant="body4" >{description}</Typography>
      </CardContent>
    </Card>
  );
}

FeatureCard.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string,
};