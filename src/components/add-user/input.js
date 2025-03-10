import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const AddUserInput = ({ handleModal, addUsers}) => {
  const [errorMsg, setErrorMsg] = useState('');
  const password = useBoolean();

  const UpdateSchema = Yup.object().shape({
    role: Yup.number()
      .required('Role is required')
      .oneOf([2, 3], 'Role must be between 2 and 3'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    role: 2, // Default to 2
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      addUsers({email: data.email, password:data.password, role: data.role})
      handleModal(false);
      reset();
    } catch (error) {
      setErrorMsg(error)
      reset();
    }
  });

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        {/* Role Dropdown */}
        <RHFTextField name="role" label="Role" select>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </RHFTextField>


        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="primary"
          variant="contained"
          size="medium"
          type="submit"
          loading={isSubmitting}
        >
          Add User
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return <>{renderForm}</>;
};

AddUserInput.propTypes = {
  handleModal: PropTypes.func,
  addUsers : PropTypes.func
};

export default AddUserInput;
