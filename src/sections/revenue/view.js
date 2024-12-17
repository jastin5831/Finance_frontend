// @mui
import Container from '@mui/material/Container';
// components
import { useEffect, useState } from 'react';
import { useSettingsContext } from 'src/components/settings';
import { GetSubmissionOfCurrentMonth } from 'src/api/submission';
import RevenueExpenseForm from './RevenueForm';

// ----------------------------------------------------------------------

export default function Revenue() {
  const settings = useSettingsContext();
  const [response, setResponse] = useState('');
  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        // Assuming GetSubmissionOfCurrentMonth is the function that makes the API call
        const data = await GetSubmissionOfCurrentMonth(); // Make sure this function returns data
        console.log('dataadada', data);
        setResponse(data);
      } catch (error) {
        console.error('Failed to fetch submission:', error);
      }
    };

    fetchSubmission();
  }, []);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <RevenueExpenseForm defaultData={response?.data} />
    </Container>
  );
}
