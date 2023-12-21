import React from 'react'; 
import './style.css'
import { mainTabItem } from '../../utils/constants';
import {changeTab} from '../../redux/themingSlice'
import { useDispatch, useSelector } from 'react-redux';

const TabsMain = () => {
    const {tabContent} = useSelector(state => state.theming)
    const dispatch = useDispatch()



return (
       <>
    <div className="main_tabs">
       {
            mainTabItem.map(item => (
                <div onClick={() => dispatch(changeTab(item.title))} key={item.id} className={`main_tab_item ${tabContent === item.title  && 'tab_active'}`}>
                    {item.title}
                </div>
            ))
        }
    
    </div>

        

       </>

  )
}

export default TabsMain




