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
    // add empty string for standard category
    const tempResult = JSON.parse(JSON.stringify(COAResult));
    tempResult.map(coa => {
      coa.push('');
      return true;
    })

    const data = {
      userId: user._id,
      data: tempResult
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

      // remove standard category
      const tempRes = response.data.map((res) => {
        res.pop();
        return res;
      })
      setCOAResult(tempRes)
      setUploadCOA(false)
    }
  }

  useEffect(()=>{
    const getCOA = async () => {
      const data = {userId: user._id}
      const response = await GetCOA(data)
      if(response.type === "success") {
        toast.success("COA Successfully Upload!",{theme: "colored"});
        // remove standard category
        const tempRes = response.data.map((res) => {
          res.pop();
          return res;
        })
        setCOAResult(tempRes);
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
