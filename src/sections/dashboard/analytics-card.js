import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {Box, Card,Typography} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import AnalyticsConversionRates from './analytics-conversion-rates'

const AnalyticsCard = ({title,data}) => {
  const [cardData, setCardData] = useState({
    value:0, rise: 0, title:''
  })

  useEffect(()=>{
    if(data && data.length > 0) {
      const tempData = {value:0, rise:0,title:''};
      tempData.title = title;
      data.forEach((element,index) => {
        tempData.value += element.value;
        if(index === 0) tempData.rise = element.value;
        if(index === data.length - 1) tempData.rise = (tempData.rise - element.value) * 100/tempData.rise 
      });
      setCardData(tempData);
    }
  },[setCardData, data, title])

  return (
    <Card sx={{maxHeight:300}}>
      <Box 
        sx={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, 
            flexDirection: { xs: 'column',  md:'row' }, maxHeight:250
        }}
      >
        <Box sx={{width:{xs:'80%',md:'50%'}}}>
          <Typography>{title}</Typography>
          <Box>
            <Typography fontSize={40} fontWeight={600}>
              {cardData.value.toLocaleString()}
            </Typography>
            <Box
              sx={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',  
                flexDirection: { sm: 'row' }
              }}
            >
                <Box>{cardData.rise >=0 ? <TrendingUpIcon color='success'/> : <TrendingDownIcon color='error'/>}</Box>
                <Box sx={{m:1}}>{cardData.rise >= 0 ? "+" : ""}{cardData.rise}%</Box>
                <Box><Typography color='gray'>{data.length} month</Typography></Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{width:{xs:'80%',md:'50%'}}}>
          <AnalyticsConversionRates chart={data}/>
        </Box>
      </Box>
    </Card>
  )
}

export default AnalyticsCard;

AnalyticsCard.propTypes = { 
  title: PropTypes.string,
  data: PropTypes.array,
};