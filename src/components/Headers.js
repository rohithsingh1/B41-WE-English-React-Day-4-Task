import React from 'react'
import {Typography, Box, Button} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {SetEditUser} from '../redux/UsersSlice';
import { useDispatch } from 'react-redux';
import ToggleButton from './ToggleButton';
function Headers({title, path}) {
  const navigate=useNavigate()
  const dispatch = useDispatch()
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems:"center"
    }} >
      <Box sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems:"center"
      }} >
        <ToggleButton/>
        <Typography variant="h2" sx={{
            fontSize:"2.1rem"
          }} >
        {title}
        </Typography>
      </Box>
      {
        title.toLowerCase()==='users'? (
          <Button variant="contained" onClick={() => {
            dispatch(SetEditUser(null))
            navigate(path)
          }} >Add User</Button>
        ):(
            <Button variant="contained" onClick={()=>navigate(path)} >Edit Profile</Button>
        )
      }
    </Box>
  )
}

export default Headers