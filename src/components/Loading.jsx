import React from 'react'
import { Atom } from 'react-loading-indicators';

function Loading() {

  return (
    <div>
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

              <Atom color="#32cd32" size={60} text="" textColor="" />
            </div>
    </div>
  )
}

export default Loading
