import {
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SetAllUsers} from '../redux/UsersSlice';
import { useNavigate } from 'react-router-dom';
import ToggleButton from './ToggleButton';

function CreateEditUser() {
   const {allUsers,editUser}=useSelector((state) => {
    return state.users;
   })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let initialState={
    id: allUsers.length+1,
    fullName: "",
    email: "",
    phoneNumber: "",
  }
  if(editUser!==null) {
    initialState=editUser;
  }
  const [user, setUser]=useState(initialState)
  //console.log('...allUsers = ',...allUsers)
  const userAddHandler=async (e) => {
    e.preventDefault()
    const {id,fullName,email,phoneNumber} = user
    const arr=[...allUsers, {
      id,fullName,email,phoneNumber
    }]
    console.log('arr = ',[...arr])
    dispatch(SetAllUsers(arr));
    navigate('/users');
  }
  const userEditHandler=(e) => {
    e.preventDefault();
    const arr=allUsers.map((data) => {
      let userObjCopy;
      if(data.id===user.id) {
        userObjCopy={
          ...data,
          fullName: user.fullName,
          email: user.email,
          phoneNumber:user.phoneNumber
        }
        return userObjCopy;
      } else {
        return data;
      }
    })
    console.log('edited arr = ', arr)
    dispatch(SetAllUsers(arr));
    navigate('/users')
  }
  return (
    <Box>
      <Box sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems:"center"
      }}>
        <ToggleButton />
         {
        editUser!==null? (
           <Typography variant="h2" sx={{
        fontSize:"2.1rem"
      }} >
       Edit User
      </Typography>
        ):(
             <Typography variant="h2" sx={{
        fontSize:"2.1rem"
      }} >
       Add User
      </Typography>
       ) 
      }
      </Box>
      <Grid container spacing={2} mt="1.2rem" >
        <Grid item xs={12} md={6} >
           <TextField
              required
              value={user.fullName}
              onChange={(e)=>setUser({...user,fullName:e.target.value})}
              label="fullName"
            placeholder='Rohith Singh'
            sx={{
              width:"100%"
            }}
            />
        </Grid>
         <Grid item xs={12} md={6} >
            <TextField
              type={"email"}
              required
              value={user.email}
              onChange={(e)=>setUser({...user,email:e.target.value})}
              label="Email"
            placeholder='rohith@gmail.com'
             sx={{
              width:"100%"
            }}
            />
        </Grid>
         <Grid item xs={12} md={6} >
            <TextField
              type="number"
              required
              value={user.phoneNumber}
              onChange={(e)=>setUser({...user,phoneNumber:e.target.value})}
              label="phoneNumber"
            placeholder='789456123'
             sx={{
              width:"100%"
            }}
            />
        </Grid>
         <Grid item xs={12} md={6} >
           <TextField
            required
              //placeholder={user.id}
              defaultValue={user.id}
              InputProps={{
                readOnly: true,
              }}
            label="RollNo"
             sx={{
              width:"100%"
            }}
            />
        </Grid>
        <Grid item xs={12} sm={3}  >
          {
            editUser!==null? (
                   <Button variant="contained"
                      onClick={(e) => userEditHandler(e)}
                    sx={{
                        width:"100%"
                      }}>Edit User</Button>
            ):(
                 <Button variant="contained"
                    onClick={(e) => userAddHandler(e)}
                  sx={{
                    width:"100%"
                  }}>Add User</Button>
            )
          }
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreateEditUser