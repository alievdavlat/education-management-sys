import React, { useState } from 'react';
import { Avatar, Button } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

const Avatarka = () => {
  const [color, setColor] = useState(ColorList[0]);
	const {user} = useSelector(state => state.account)
  

 
  return (
    <Link to={'/profile'} title='go to profile   -->'>
      <Avatar
        style={{
          backgroundColor: color,
          verticalAlign: 'middle',
        }}
        size="large"
      >
        {user?.name.charAt(0).toUpperCase()}
      </Avatar>
      <Button
        size="small"
        style={{
          margin: '0 16px',
          verticalAlign: 'middle',
          background:'transparent',
          border:'none',
          color:`var(--settings_modal-text)`
        }}
      >
        {user?.name + '  ' + user?.last_name}   
      </Button>
    
    </Link>
  );
}

export default Avatarka


