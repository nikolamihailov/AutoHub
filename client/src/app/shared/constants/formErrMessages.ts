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
    accountType: {
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
  carOfferForm: {
    brand: {
      required: 'Brand is required.',
      minlength: 'Brand must be at least 2 characters.',
      maxlength: 'Brand must be at most 32 characters.',
    },
    model: {
      required: 'Model is required.',
      minlength: 'Model must be at least 1 character.',
      maxlength: 'Model must be at most 32 characters.',
    },
    price: {
      required: 'Price is required.',
      min: 'Price must be greater than 0.',
    },
    year: {
      required: 'Year is required.',
      min: 'Year must be greater than 1920.',
    },
    mileage: {
      required: 'Mileage is required.',
      min: 'Mileage must be 0 or more.',
      max: 'Mileage must be less than 1,000,000.',
    },
    description: {
      required: 'Description is required.',
      minlength: 'Description must be at least 10 characters.',
      maxlength: 'Description must be at most 1500 characters.',
    },
    region: {
      required: 'Region is required.',
      minlength: 'Region must be at least 2 characters.',
      maxlength: 'Region must be at most 64 characters.',
    },
    gearbox: {
      required: 'Gearbox is required.',
    },
    mainImage: {
      required: 'Main image is required.',
      pattern: 'Must be a valid image URL.',
    },
    category: {
      required: 'Category is required.',
    },
    images: {
      pattern: 'Each image must be a valid image URL.',
    },
  },
  contactsForm: {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be at least 2 characters.',
    },
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email.',
    },
    message: {
      required: 'Message is required.',
      minlength: 'Message must be at least 10 characters.',
    },
  },
};
