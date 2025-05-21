import React from 'react'
import Upload from './Upload'
import Imageprev from './Imageprev'

function Home() {
    const [image,setImage]=useState(null)
    const [enhancedImage,setEnhancedImagePreview]=useState(null)
    const [loading,setLoading]=useState(false)
  
  return (
    <>
   <Upload/>
   <Imageprev loading={loading} uploaded={image} enhanced={enhancedImage}/>
    </>
  )
}

export default Home
