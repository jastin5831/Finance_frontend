import * as Yup from 'yup';
// Yup validation schema
export const validationSchema = Yup.object({
  revenueStreams: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required('Stream name is required'),
        id: Yup.string().required('Id is required'),
        value: Yup.number().typeError('Amount must be a number').required('Amount is required'),
      })
    )
    .min(1, 'At least one revenue stream is required'),
  expenses: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required('Expense name is required'),
        id: Yup.string().required('Id is required'),
        value: Yup.number().typeError('Amount must be a number').required('Amount is required'),
      })
    )
    .min(1, 'At least one expense is required'),
  //   salary: Yup.number().typeError('Salary must be a number').required('Salary is required'),
  //   rent: Yup.number().typeError('Rent must be a number').required('Rent is required'),
  salary: Yup.object({
    value: Yup.number().typeError('Salary must be a number').required('Salary is required'),
  }),
  rent: Yup.object({
    value: Yup.number().typeError('Rent must be a number').required('Rent is required'),
  }),
  selectedDate: Yup.date().required('Date is required'),
});
