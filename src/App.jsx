import React, { useState } from 'react';
import Upload from './components/Upload';
import Imageprev from './components/Imageprev';
import { enhancedImageAPI } from '../utils/enhancedImageAPI';

const App = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImageHandler = async (file) => {
    if (!(file instanceof File)) {
      alert('Please select a valid image file');
      return;
    }

    const maxSize = 15 * 1024 * 1024; // 15MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/tiff',
      'image/bmp',
      'image/x-raw',
      'image/jfif',
    ];
    if (file.size > maxSize) {
      alert('File size exceeds 15MB limit');
      return;
    }
    if (!allowedTypes.includes(file.type)) {
      alert('Unsupported file format. Use JPG, PNG, WEBP, TIFF, or BMP');
      console.warn('File MIME type:', file.type, 'File name:', file.name);
      return;
    }

    // Log file details for debugging
    console.log('File details:', {
      name: file.name,
      size: file.size,
      type: file.type,
      extension: file.name.split('.').pop().toLowerCase(),
    });

    try {
      setUploadImage(URL.createObjectURL(file));
      setLoading(true);

      const enhancedData = await enhancedImageAPI(file);
      if (enhancedData?.image) {
        setEnhancedImage(enhancedData.image);
      } else {
        throw new Error('No enhanced image URL received');
      }
    } catch (e) {
      console.error('Error in uploadImageHandler:', e);
      alert(`Failed to enhance image: ${e.message}. Try a different image or check the file format.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black w-full min-h-screen flex flex-col justify-center items-center">
      <div className="text-center mb-8 text-white text-3xl font-bold flex items-center gap-3 mt-10 whitespace-nowrap">
        <img className="w-16 h-16" src="/logo.jpg" alt="Logo" />
        <h1 className="mr-12">AI Image Enhancer</h1>
      </div>
      <div className="mb-16">
        <Upload uploadImageHandler={uploadImageHandler} />
      </div>
      <Imageprev loading={loading} uploaded={uploadImage} enhanced={enhancedImage} />
      <div className="mr-12 text-white text-center text-lg p-5">
        <h1 className="font-semibold">Upload your image to see the magic</h1>
        <h4 className="font-light text-sm mt-2">© powered by Soham.Ai</h4>
      </div>
    </div>
  );
};

export default App;