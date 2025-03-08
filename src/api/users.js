import axios, { endpoints } from 'src/utils/axios';

export const GetUser = async (parentId) => {
  const result = {success: false, data:[]}
  await axios.post(endpoints.auth.get, {userId: parentId})
    .then(res => {result.data = res.data.users; result.success = true})
    .catch(err => {result.success = false; result.data = err.message})
  return result;
}

export const addUser = async (parent, email, password, role) => {
  const result = {success: false, data:''}
  await axios.post(endpoints.auth.register, {parent, email, password, role})
    .then(res => {result.success = true; result.data = res.data.data})
    .catch(err => {result.success = false; result.data = err})
  return result;
}

export const deleteUser = async (data) => {
  const result= {success: false}
  await axios.post(endpoints.auth.delete, {email:data})
    .then(res => {result.success = true;})
    .catch(err => {result.success = false})
  return result;
}