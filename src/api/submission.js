import axios, { endpoints } from 'src/utils/axios';

export const CreateRevenueExpenseApi = async (data) => {
  try {
    const response = await axios.post(endpoints.submission.create, data);
    console.log('Response:', response);
    return response.data.data;
  } catch (error) {
    console.error('Error creating submission:', error);
    throw error;
  }
};
export const updateForecast = async (forecastData) => {
  try {
    const response = await axios.put(endpoints.submission.update, forecastData);
    return response.data;
  } catch (error) {
    console.error('Error updating forecast:', error);
    throw error;
  }
};
export const GetSubmissionByDate = async (selectedDate) => {
  try {
    const response = await axios.get(endpoints.submission.getSubmissionByDate, {
      params: {
        selectedDate,
      },
    });

    console.log('Submission retrieved successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching submission:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const GetSubmissionOfCurrentMonth = async () => {
  try {
    const response = await axios.get(endpoints.submission.getSubmissionByCurrentDate, {});

    console.log('Submission retrieved successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching submission:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const GetSubmissionDifference = async (selectedDate) => {
  try {
    const response = await axios.get(endpoints.submission.submissionDifference, {
      params: {
        selectedDate,
      },
    });

    console.log('Submission retrieved successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching submission:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
