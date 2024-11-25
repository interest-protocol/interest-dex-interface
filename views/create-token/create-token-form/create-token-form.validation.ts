import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup.string().required('Name is a required field'),
  symbol: yup
    .string()
    .required('Symbol is a required field')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
  projectUrl: yup
    .string()
    .url('You must provide an URL')
    .notOneOf(
      [yup.ref('name'), yup.ref('symbol')],
      'The description must be different than the name and symbol'
    ),
  imageUrl: yup.string(),
  supply: yup
    .number()
    .required('Supply is a required field')
    .min(1, 'You cannot add numbers less than 0')
    .required('Total Supply is a required field'),
  decimals: yup
    .number()
    .required('Decimals is a required field')
    .min(0, 'You cannot add numbers less than 0')
    .max(11, 'You cannot add numbers greater than 11'),
  fixedSupply: yup.boolean().required('Fixed Supply is an required field'),
  pool: yup.object({
    active: yup.boolean().required(),
    quoteValue: yup.string(),
    tokenValue: yup.string(),
    quote: yup.object(),
  }),
});
