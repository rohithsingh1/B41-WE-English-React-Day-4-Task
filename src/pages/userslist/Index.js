import {
  Box,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,

} from '@mui/material';
import {EditOutlined} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import React,{useEffect} from 'react';
import Headers from '../../components/Headers';
import {SetAllUsers,SetEditUser} from '../../redux/UsersSlice';
import { userData } from '../../data';


function Index() {
  const dispatch = useDispatch()
  const {allUsers}=useSelector((state) => {
    return state.users;
  })
  console.log('all users after = ',allUsers)

  const navigate = useNavigate()
  function createData(id, fullName, email, phoneNumber, actions) {
    return { id,fullName,email,phoneNumber,actions };
  }
   const rows =  allUsers.length!==0&&allUsers.map((data) => {
    return createData(data.id,data.fullName,data.email,data.phoneNumber, <EditOutlined />)
   })
  console.log('rows = ',rows)
  useEffect(() => {
    console.log('useeffect')
    allUsers.length===0 && dispatch(SetAllUsers(userData))
  },[allUsers])
  return (
    <Box>
      <Headers title="Users" path="/create-user" />
      <Grid container sx={{
        marginTop:"1.2rem"
      }} >
        <Grid item xs={12} >
          {
            allUsers.length!==0&&(
               <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
                    <TableRow >
            <TableCell sx={{
            fontWeight:"bold"
          }} >ID</TableCell>
            <TableCell sx={{
            fontWeight:"bold"
          }} align="right">FULLNAME</TableCell>
            <TableCell sx={{
            fontWeight:"bold"
          }} align="right">EMAIL</TableCell>
            <TableCell sx={{
            fontWeight:"bold"
          }} align="right">PHONE NUMBERS</TableCell>
            <TableCell sx={{
            fontWeight:"bold"
          }} align="right" >ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.fullName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right" sx={{
                cursor:"pointer",
              }} onClick={() => {
                const {id, fullName, email, phoneNumber}=row
                dispatch(SetEditUser({id,fullName,email,phoneNumber}))
                navigate(`/edit-user/${row.id}`)
              }} >{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            )
          }
        </Grid>
      </Grid>
    </Box>
  )
}

export default Index