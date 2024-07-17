import axios from 'axios';

const url = 'https://api.cloudinary.com/v1_1/dciebjpeq/image/upload';
// const url='CLOUDINARY_URL=cloudinary://954626436695326:k_xSctKAAXwULfc2sglWUKVQVDc@dciebjpeq'

export const UploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'mern_product');
    const response = await axios.post(url, formData);
    return response.data; 
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;  
  }
};
