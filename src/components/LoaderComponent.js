import React from 'react'

const LoaderComponent = () => {
    const loader = "assets/loader.gif";
  return (
    <>
    <div id="divLoader" class="loader" style={{zIndex: '9999', display: 'block'}}>
        <img style={{display: 'block', margin: 'auto'}} alt="progress" src={loader} />
    </div>
    </>
  )
}

export default LoaderComponent