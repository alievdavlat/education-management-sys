import { useSelector } from 'react-redux'
import './style.css'


import React from 'react'

const Avatar = () => {
	const {user} = useSelector(state => state.account)
  return (
   <>
   <button id="btn-message" className="button-message">
	<div className="content-avatar">
		<div className="status-user"></div>
		<div className="avatar">
			<svg className="user-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path></svg>
		</div>
	</div>
	 <div className="notice-content">
		<div className="avatar_username">{user?.name}  {user?.last_name}</div>
		<div className="lable-message">{user?.name}</div>
		<div className="user-id">{user?.email}</div>
	</div>
</button>
   </>
  )
}

export default Avatar