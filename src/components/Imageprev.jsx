import React from 'react';
import { Atom } from 'react-loading-indicators';
import Loading from "./Loading"


function Imageprev(props) {
  return (
    <div className='text-black mt-8 flex flex-col md:flex-row items-center justify-center gap-10 w-full px-10'>
      
      {/* Original Image Card */}
      <div className='bg-zinc-100 shadow-lg rounded-xl overflow-hidden flex flex-col items-center justify-center w-[350px] h-[350px] p-6'>
        <h2 className='mb-4 text-lg font-semibold'>Original Pic</h2>
        {props.uploaded ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img src={props.uploaded} alt="original" className='w-full h-full object-cover' />
           
          </div>
        ) : (
          <div className='text-center mt-2 text-sm'>No image selected</div>
        )}
      </div>

      {/* Enhanced Image Card */}
      {props.enhanced && !props.loading ? (
        <div className='bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center justify-center w-[350px] h-[350px] p-6'>
          <h2 className='mb-4 text-lg font-semibold'>Enhanced Pic</h2>
          <img src={props.enhanced} alt="enhanced" className='w-full h-full object-cover' />
        </div>
      ) : (
        <div className='bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center justify-center w-[350px] h-[350px] p-6 relative'>
          

          {props.loading ? (
                <Loading/>
           
          ):(
             <h2 className='mb-4 text-lg font-semibold'>No Enhanced Image</h2>
          )}
        </div>
      )}
    </div>
  );
}

export default Imageprev;
