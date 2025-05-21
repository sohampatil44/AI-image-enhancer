import React from 'react'

function Upload({uploadImageHandler}) {

  const showImageHandler=(j)=>{
   
    
    const file = j.target.files[0]
    if(file){
      uploadImageHandler(file)
    }
  }
  
  return (
    <div className='ml-30 mr-40 bg-transparent text-white shadow-lg rounded-2xl p-6 w-[300px] h-[100px] '>
<label htmlFor="fileInput"className='block w-full cursor-pointer border-2 border-dashed border-white rounded-lg p-5 text-center hover:border-blue-500 hover:shadow-blue-500/50 hover:shadow-[0_0_20px_#3b82f6] transition-all duration-100'>
    
    <input type="file" id="fileInput" className='hidden' onChange={showImageHandler} accept="image/*" />
<span>Click or drag to upload your image</span>

    
    </label>   


 </div>
  


)
}

export default Upload
