import React from 'react'
import './style.css'
import { BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'


const CountCards = ({count, title, path, colors}) => {
  return (

      <div className='count_card' style={{background:`${colors}`}}>
          <div className='count_card_count'>
          <h1>
              {count}
          </h1>
          </div>
          <div className='chart_students'>
            <h3>{title}</h3>
            <BarChart3  className='chart'/>
          </div>
          <div className='countCard_link'>
           <Link to={path}>
           <h4>go to {title} page</h4>
           </Link>
          </div>
      </div>

  )
}

export default CountCards