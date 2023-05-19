import React from "react";

const Playbtn = () => {
  return (
    <div className='container'>
      <button className='playBut'>
        <svg
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          xmlnsA='http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/'
          viewBox='0 0 213.7 213.7'
          preserveAspectRatio='xMidYMid meet'
        >
          <polygon
            className='triangle'
            id='XMLID_18_'
            fill='none'
            strokeWidth='7'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            points='73.5,62.5 148.5,105.8 73.5,149.1'
          />
          <circle
            className='circle'
            id='XMLID_17_'
            fill='none'
            strokeWidth='7'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            cx='106.8'
            cy='106.8'
            r='103.3'
          />
        </svg>
      </button>
    </div>
  );
};

export default Playbtn;
