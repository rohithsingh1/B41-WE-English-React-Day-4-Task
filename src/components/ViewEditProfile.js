import React,{useState} from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { SetEditProfile,SetProfile } from '../redux/UsersSlice';
import ToggleButton from './ToggleButton';

function ViewEditProfile() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
   let initialState={
    id:1,
    fullName: "",
    email: "",
    phoneNumber: "",
  }
  const {profile, editProfile}=useSelector((state) => {
    return state.users;
  })
  if(profile===null) {
    initialState={
      id: 1,
      fullName: "Rohith Singh",
      email: "rohith@gmail.com",
      phoneNumber:"456789123"
    }
    
    dispatch(SetProfile(initialState))
  }
  initialState = profile
  const [userState, setUserState]=useState(initialState)
  const editProfileHandler=(e) => {
    e.preventDefault();
    dispatch(SetEditProfile(null))
    dispatch(SetProfile(userState))
    navigate("/profile");
  }
  return (
    <Box>
      <Box sx={{
        width:"100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }} >
        <Box sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems:"center"
        }}>
          <ToggleButton/>
          <Typography variant="h2" sx={{
          fontSize: "1.3rem",
          marginRight:"1rem"
        }} >Profile</Typography>
        <Button variant="outlined" onClick={() => navigate('/users')} >Home</Button>
        </Box>
        <Box>
          <Button variant="outlined" onClick={() => {
            dispatch(SetEditProfile(profile))
            //dispatch(SetProfile)
            navigate('/edit-profile')
          }}>Edit Profile</Button>
        </Box>
      </Box>
      <Grid container spacing={2} mt="1.2rem">
        <Grid item xs={12} md={6} >
            <Box component="img" src="/resources/avatorimage.png" sx={{
              width: "100%",
              height: "20rem",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundOrigin: "border-box",
              borderRadius:"0.5rem"
            }} ></Box>
        </Grid>
        <Grid item container xs={12} md={6} mt="1.2rem" spacing={1.5} >
          <Grid item xs={12} md={12} >
              <TextField
                  required
                  variant="standard"
                  label="fullName"
              defaultValue={userState?.fullName}
              onChange={(e)=>setUserState({...userState,fullName:e.target.value})}
                  InputProps={{
                    readOnly: editProfile===null?true:false,
                  }}
                  sx={{
                    width:"100%"
                  }}
              />
          </Grid>
          <Grid item xs={12} md={12} >
              <TextField
                  required
                  variant="standard"
                  label="email"
              defaultValue={userState?.email}
               onChange={(e)=>setUserState({...userState,email:e.target.value})}
                  InputProps={{
                    readOnly: editProfile===null?true:false,
                  }}
                  sx={{
                    width:"100%"
                  }}
              />
          </Grid>
          <Grid item xs={12} md={6} >
              <TextField
                  required
                  variant="standard"
                  label="phoneNumber"
              defaultValue={userState?.phoneNumber}
               onChange={(e)=>setUserState({...userState,phoneNumber:e.target.value})}
                  InputProps={{
                    readOnly: editProfile===null?true:false,
                  }}
                  sx={{
                    width:"100%"
                  }}
              />
          </Grid>
          <Grid item xs={12} md={6} >
              <TextField
                  required
                  variant="standard"
                  label="RollNo"
                  defaultValue={userState?.id}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    width:"100%"
                  }}
              />
          </Grid>
          {
            editProfile!==null&&(
                 <Grid item xs={12} md={6} >
                    <Button variant="contained" onClick={(e)=>editProfileHandler(e)} >Edit Profile</Button>
                  </Grid>
            )
          }
        </Grid>
      </Grid>
    </Box>
  )
}

export default ViewEditProfile