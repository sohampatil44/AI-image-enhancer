import axios from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const enhancedImageAPI = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
    const taskId = await uploadImage(file);
    console.log('Image uploaded, task ID:', taskId);

    if (!taskId) {
      throw new Error('No task ID received');
    }

    const enhanced = await Polling(taskId);
    console.log('Enhanced image data:', enhanced);
    return enhanced;
  } catch (err) {
    console.error('Error in enhancedImageAPI:', err);
    throw err;
  }
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image_file', file);

  try {
    const { data } = await axios.post(`${BASE_URL}/api/tasks/visual/scale`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-API-KEY': API_KEY,
      },
    });

    console.log('Upload response:', JSON.stringify(data, null, 2));
    if (!data?.data?.task_id) {
      throw new Error('Failed to upload image: No task ID returned');
    }

    return data.data.task_id;
  } catch (err) {
    console.error('Upload error:', err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
    throw new Error(`Failed to upload image: ${err.message}`);
  }
};

const fetchEnhancedImage = async (taskId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    console.log('Fetch response:', JSON.stringify(data, null, 2));
    if (!data?.data) {
      throw new Error('Invalid response: No data returned');
    }

    const { progress, state, image } = data.data;

    if (state < 0) {
      console.error('Task failed. Full API response:', JSON.stringify(data, null, 2));
      throw new Error(`Task failed: ${data.message || data.data?.error || 'No specific error details provided'}`);
    }

    if (progress >= 100 && image) {
      return data.data;
    }

    return { state, progress };
  } catch (err) {
    console.error('Fetch error:', err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
    throw new Error(`Failed to fetch enhanced image: ${err.message}`);
  }
};

const Polling = async (taskId, retries = 0, maxRetries = 15, delay = 2000) => {
  const result = await fetchEnhancedImage(taskId);

  if (result.progress >= 100 && result.image) {
    return result;
  }

  if (result.state < 0) {
    throw new Error(`Task failed: ${result.message || 'No specific error details provided'}`);
  }

  if (retries >= maxRetries) {
    throw new Error('Maximum retries reached: Task did not complete in time');
  }

  console.log(`Still processing... (Retry ${retries + 1}/${maxRetries})`);
  await new Promise((resolve) => setTimeout(resolve, delay));
  return Polling(taskId, retries + 1, maxRetries, delay);
};