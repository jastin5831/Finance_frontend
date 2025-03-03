import axios, { endpoints } from 'src/utils/axios';

export const CreateSubscription = async (id,gmail) => {
    const data = {priceId:id, email:gmail}
    try {
      let result = {type:'', data: {}}
      await axios.post(endpoints.subscription.create, data)
              .then(res => {result = {type:'success', data:res.data.url}})
              .catch(err => {result = {type:'error', data:err}})
      return result
    } catch (error) {
      console.error( 'Error Create Subscription Per Month:', error);
      throw error;
    }
};

export const GetSubscription = async (gmail) => {
  try {
    let result = {type: '', data: {}}
    await axios.post(endpoints.subscription.get, {email: gmail})
            .then(res => {result = {type: 'success', data: res.data.plan}})
            .catch(err => {result = {type: 'error', data: err}})
    return result
  } catch (error) {
    console.error(
      'Error fetching Revenue:',error
    );
    return [];
  }
};

export const UpdateSubscription = async (id, gmail) => {
  const data = {priceId:id, email:gmail}
  try {
    let result = {type:'',data:{}};
    await axios.post(endpoints.subscription.update, data)
            .then(res => {result = {type:'success', data:res.data.subscription}})
            .catch(err => {result = {type:'error',data:err}})
    return result
  } catch (error) {
    console.error(
      'Error Create Subscription Per Month:', error
    );
    throw error;
  }
};

export const CancelSubscription = async (gmail) => {
  try {
    let result = {type:'',data:{}};
    await axios.post(endpoints.subscription.cancel, {email:gmail})
            .then(res => {result = {type:'success', data:'price_123'}})
            .catch(err => {result = {type:'error',data:err}})
    return result
  } catch (error) {
    console.error(
      'Error Create Subscription Per Month:', error
    );
    throw error;
  }
};