import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { toast } from 'react-toastify'; 
import { Box, Container,Modal, Typography } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';
import UserList from 'src/components/table/userList';
import { useAuthContext } from 'src/auth/hooks';
import AddUser from 'src/components/add-user';
import { modalStyle } from 'src/utils/variable';
import { addUser, GetUser, deleteUser } from 'src/api/users';
import { filterUsersResult } from 'src/components/add-user/func';

const userTitle = [
  "No", "Email", "Role", "Company", "Action"
]

const UserManagement = () => {
  const settings = useSettingsContext();
  const [users, setUsers] = useState([])
  const {user} = useAuthContext();
  const [openModal, setOpenModal] = useState(false)
  const handleModal = (value) => setOpenModal(value);

  const addUsers = async (data) => {
    try {
      const response = await addUser(user._id, data.email, data.password, data.role);
      if (response.success) {
        toast.success('Successfully Added!', { theme: 'colored' });
        const tempUser = [...users, {email: data.email, role: data.role}]
        setUsers(tempUser)
      } else {
        toast.error(`${response.data}`, { theme: 'colored' });
      }
      handleModal(false);
    } catch (error) {
      handleModal(false);
      console.log(error)
    }
  }

  const deleteUsers = async (data) => {
    try {
      const response = await deleteUser(data);
      if(response.success) {
        toast.success('successfully deleted!', {theme:'colored'})
        const tempUsers = users.filter(tdata => tdata.email !== data)
        setUsers(tempUsers)
      }
    } catch (error) {
      toast.error(`${error.data}`,{theme:'colored'})
    }
  }

  const onSetUser = (data) => {
    setUsers(data)
  }

  useEffect(()=>{
    const getUsers = async () => {
      const response = await GetUser(user._id)
      if(response.success === true) {
        toast.success('successfully uploaded!', {theme: 'colored'})
        const result = filterUsersResult(response.data)
        setUsers(result);
      } else {
        toast.error(`${response.data}`, {theme:'colored'})
      }
    }
    getUsers();
  },[user._id])

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> UserManagement </Typography>
      <Box
        sx={{
          mt: 5,
          width: 1,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      > 
        <UserList onSetResult={onSetUser} currentUsers={users} titleArray={userTitle} handleModal={handleModal} deleteUsers={deleteUsers}/>
      </Box>
      <Modal open={openModal} onClose={() => handleModal(false)}>
        <Box sx={{ ...modalStyle, position: 'relative' }}>
          <AddUser handleModal={handleModal} addUsers={addUsers} />
        </Box>
      </Modal>
    </Container>
  )
}

export default UserManagement