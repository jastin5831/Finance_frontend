import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {toast } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';

import {
  Box,
  Typography,
  Container,
} from '@mui/material';  
import {LoadingButton} from '@mui/lab';
import { alpha } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { CreateCOA, GetCOA } from 'src/api/transaction';
import { useAuthContext } from 'src/auth/hooks';
import { useSettingsContext } from 'src/components/settings';
import ChecklistTable from 'src/components/table/checklist';

export default function CheckList() {
  const settings = useSettingsContext();
  const {user} = useAuthContext();
  const [COAResult, setCOAResult] = useState([]);
  const [uploadCOA, setUploadCOA] = useState(false);
  
  const updateCOA = (data) => {
    setCOAResult(data)
  }
  
  const onCOASubmit = async () => {
    setUploadCOA(true)
    const data = {
      userId: user._id,
      data: COAResult
    }
    if(!data.data || data.data.length === 0) {
      toast.error('COA data required!',{theme: "colored"})
      setUploadCOA(false)
    } else {
      const response = await CreateCOA(data)
      if(response.type === "success") {
        toast.success('COA Successfully Uploaded',{theme: "colored"})
      }else {
        toast.error('COA Upload Error',{theme: "colored"})
      }

      setCOAResult(response.data)
      setUploadCOA(false)
    }
  }

  useEffect(()=>{
    const getCOA = async () => {
      const data = {userId: user._id}
      const response = await GetCOA(data)
      if(response.type === "success") {
        toast.success("COA Successfully Upload!",{theme: "colored"});
        setCOAResult(response.data);
      }else {
        toast.error('COA Upload Error', {theme: "colored"})
      }
    }

    getCOA()
  },[user._id])

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Check List </Typography>
      <Box
        sx={{
          mt: 5,
          width: 1,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <ChecklistTable COAResult={COAResult} updateCOA={updateCOA}/>        
      </Box>
      <LoadingButton
        component="label"
        color="primary"
        variant="contained"
        onClick={onCOASubmit}
        loading={uploadCOA}
        sx = {{mt:2, mb:2}}
        startIcon={<CloudUploadIcon />}
      >
        Submit
      </LoadingButton>
    </Container>
  );
}
