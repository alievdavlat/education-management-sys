import React from 'react'
import './style.css'
import { ChevronDown, ChevronUp } from 'lucide-react'


const ChartField = ({header, children, width, height}) => {
  const [bodySize , setBodySize] = React.useState(true)
  return (
    <div className='chartField' style={{height:`${bodySize ? '370px' : '40px'}`, width:`${width}`}}>
      <div className="chartField_header">
          <h4>{header}</h4>
          <span onClick={() => setBodySize(!bodySize)}>
          {
           bodySize ?  
           <ChevronUp />
            :
            <ChevronDown />
          }
          </span>
      </div>
        <div className={`chartField_body ${bodySize ? '' : 'hideBody'}`} style={{height:`${bodySize ? '100%' : '0px'}`}}>
              { bodySize ? children : ''}
        </div>
    </div>
  )
}

export default ChartField