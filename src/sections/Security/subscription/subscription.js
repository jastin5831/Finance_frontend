import React from 'react'
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Typography, Button, Card, CardContent, Container } from "@mui/material";
// eslint-disable-next-line import/no-extraneous-dependencies
import {toast } from 'react-toastify';
import { useSettingsContext } from 'src/components/settings';
import { allFeatures, plans } from 'src/utils/variable';
import { useAuthContext } from 'src/auth/hooks';
import { CancelSubscription, CreateSubscription, UpdateSubscription } from 'src/api/stripe';

const Subscription = () => {
  const settings = useSettingsContext();
  const theme = useTheme()
  const {user, setRole} = useAuthContext() 
  
  const handleSubscribe = async (priceId) => {
    // if plan equals Free,it need create subscription, or not, it need update 
    if (user.role !== priceId) {
      if(user.role === "price_123") {
        const flag = window.confirm('Do you really Create plan?')
        if(flag) {
          const response = await CreateSubscription(priceId, user.email);
          if(response.type === "success") {
            toast.success('go next step!', {theme: "colored"});
            window.location.href = response.data
          }else {
            toast.warn('Create subscripton error!', {theme: "colored"})
          }
        }
      } else if(priceId === "price_123") {
        const flag = window.confirm('Do you really cancel plan?')
        if(flag) {
          const response = await CancelSubscription(user.email)
          if(response.type === "success") {
            toast.success("You successfully Canceled Subscription!", {theme:"colored"})
            await setRole?.("price_123", user)          
          } else {
            toast.warn("Cancel Subscription error!",{theme:"colored"})
          }
        }
      } else {
        const flag = window.confirm('Do you really Update plan?')
        if(flag) {
          const response = await UpdateSubscription(priceId, user.email);
          if(response.type === "success") {
            toast.success("You successfully Upgraded Subscription!",{theme: "colored"});
            await setRole?.(response.data, user)          
          }else {
            toast.warn('Update subscripton error!', {theme: "colored"})
          }
        }
      }
    } else {
      toast.warn('This plan already choosen!', {theme: "colored"})
    }
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box
        sx={{
          borderRadius: 2, height:"100%",
          bgcolor: (themes) => alpha(themes.palette.grey[500], 0.04),
          border: (themes) => `dashed 1px ${themes.palette.divider}`,
        }}
      >
        <Box sx={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", p: 5}}>
          <Typography variant="h2" sx={{ mb: 4 }}>Choose Your Plan</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 4, width: "100%" }}>
            {plans.map((plan) => (
              <Card 
                key={plan.title} 
                sx={{ 
                  p: 4, borderRadius: "1rem", textAlign: "center", boxShadow: 3, 
                  bgcolor: user.role === plan.stripePriceId ? theme.palette.primary.dark : "background.paper",
                  color: user.role === plan.stripePriceId ? theme.palette.primary.contrastText : "inherit"
                }}
              >
                <CardContent>
                  <Typography variant="h2" sx={{ mb: 2 }}>{plan.title}</Typography>
                  <Typography variant="h3" color="primary" sx={{ mb: 3 }}>{plan.price}</Typography>
                  <Box>
                    {allFeatures.map((item, index) => (
                      <Box key={index} sx={{display:'flex', justifyContent:"space-between"}}>
                        <Typography sx={{ mb: 1 }} variant='h6'>{item}</Typography>
                        {plan.features.includes(item) ? 
                          (
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" color={plan.stripePriceId === user.role ? null : `${theme.palette.primary.main}` }>
                              <path fill="currentColor" fillRule="evenodd" d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 0 1-.944.12l-2.75-2.5a.625.625 0 0 1 .841-.925l2.208 2.007l3.849-5.886a.625.625 0 0 1 .865-.181" clipRule="evenodd"/>
                            </svg>
                          ) : null
                        }
                      </Box>
                    ))}
                  </Box>
                  <Button 
                    variant="contained" color="primary" 
                    component="label" sx={{ mt: 3 }}
                    startIcon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" color={`${theme.palette.primary.main}`}><path fill="#005a92" d="M13.4 20.7a4.81 4.81 0 0 0 1.251-6.683l-3.963 2.712a2.4 2.4 0 0 1-2.712-3.971l3.621-2.479l2.324-1.593A4.81 4.81 0 0 0 15.168 2L11.2 4.72L5.259 8.784l-.008.008A7.212 7.212 0 0 0 13.4 20.7m5.21-9.4a.1.1 0 0 0-.031.023za4.81 4.81 0 0 0-1.251 6.683l3.963-2.712a2.407 2.407 0 0 1 2.72 3.971l-3.621 2.479l-2.331 1.596A4.81 4.81 0 0 0 16.838 30l3.962-2.712l5.945-4.072A7.213 7.213 0 0 0 18.61 11.3"/></svg>} 
                    onClick={() => handleSubscribe(plan.stripePriceId)}
                  >
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Subscription