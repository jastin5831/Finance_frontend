import { useEffect, useState } from 'react';
import {Container, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
// eslint-disable-next-line import/no-extraneous-dependencies
import {toast } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-toastify/dist/ReactToastify.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { CreateCOA, GetCOA } from 'src/api/transaction';
import { useSettingsContext } from 'src/components/settings';
import { useAuthContext } from 'src/auth/hooks';
import UploadFile from 'src/components/table/uploadFile';
import './style.css';

const COATitle = [
  "AccountID", "Description", "Roll UP", "IS/BS"
]

export default function CoaUpload() {
  const settings = useSettingsContext();
  const {user} = useAuthContext();
  const [COAResult, setCOAResult] = useState([]);
  const [uploadCOA, setUploadCOA] = useState(false);

  const handleSetCOAResult = (value) => {
    setCOAResult(value)
  }

  const onCOASubmit = async () => {
    setUploadCOA(true)
    const data = {
      userId: user._id,
      data: COAResult
    }
    if(!data.data || data.data.length === 0) {
      console.log("COA data required!")
      setUploadCOA(false)
    } else {
      console.log('coaData', data)
      const response = await CreateCOA(data)
      if(response.type === "success") {
        toast.success('CoA Successfully Uploaded',{theme: "colored"})
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
      <Typography variant="h4" sx={{mb:2}}> Upload Chart of Account </Typography>
      <UploadFile onSetResult={handleSetCOAResult} currentResult={COAResult} titleArray={COATitle}/>
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
