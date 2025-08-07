export const FORM_ERROR_MESSAGES: Record<string, Record<string, Record<string, string>>> = {
  registerForm: {
    firstName: {
      required: 'First name is required.',
      minlength: 'First name must be at least 3 characters.',
      maxlength: 'First name must not be more than 15 characters.',
    },
    lastName: {
      required: 'Last name is required.',
      minlength: 'Last name must be at least 3 characters.',
      maxlength: 'Last name must not be more than 15 characters.',
    },
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email.',
      minlength: 'Email must be at least 7 characters.',
      maxlength: 'Email must not be more than 25 characters.',
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password must be at least 6 characters.',
      maxlength: 'Password must not be more than 20 characters.',
    },
    accounType: {
      required: 'Account type is required.',
    },
  },
  loginForm: {
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email.',
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password must be at least 6 characters.',
    },
  },
  categoryForm: {
    name: {
      required: 'Name is required',
      minlength: 'Category must be at least 3 characters.',
      maxlength: 'Category must not be more than 20 characters',
    },
    img: { required: 'Image is required' },
  },
};
