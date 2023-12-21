import React from 'react'
import { CountCards, TableInfo} from '../../components'
import { getItemAtStorage } from '../../hooks/useStorage'
import { ChartSection } from '../../sections'
import { countInfoDetails } from '../../utils/constants'
import './style.css'
import TableSection from '../../sections/tableSection/TableSection'





const Dashboard = () => {
  const role = getItemAtStorage('role')
  const countColors = ['red', 'green', 'blue', 'yellow', 'teal', 'gray', 'crimson']


  return (
    <div className='dashboard'>
      <div className='countCard_wrapper'>
      {
        countInfoDetails.filter(item => item.view.includes(role)).map((items, idx) => <CountCards key={items.id} colors={countColors[idx]} {...items} />)
      }
      </div>
        
        <ChartSection/>

         <div className='table_info__field'>
          <TableSection page={'dashboard'}/>
         </div>

    </div>
  )
}

export default Dashboard