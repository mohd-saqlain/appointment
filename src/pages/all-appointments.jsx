import React, { useEffect, useState } from 'react'
import { Typography,Box,CardContent,Card,Button } from '@mui/material'
import CallDialog from '../components/call-dialog';

const AllAppointments = () => {
    const [appointments,setAppointment] = useState([]);
    const [openCall,setOpenCall] = useState(false);
    const url = 'https://2423-103-46-203-83.ngrok-free.app';
    const localUrl = 'http://localhost:80';
    const renderUrl = 'https://apis-jct6.onrender.com'

    useEffect(() => {
        async function getAppointments() {
            try {
                const response = await fetch(`${renderUrl}/get-appointments`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAppointment(data); // Logging the data returned by the API
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error here, such as displaying an error message to the user
            }
        }
        
        getAppointments();
    }, []);

    const handleApprove = (number) => {
     
        const data = {
          override_agent_id:'32e64934d1a0a166b68a50d2db306940',
          from_number: "+14154803160",
          to_number: number,
        };
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify content type as JSON
            Authorization: "Bearer 962c038c-9a5c-4d45-a9c9-8088d5817e0a", // Include the Bearer token in the Authorization header
          },
          body: JSON.stringify(data),
        };
        fetch("https://api.retellai.com/create-phone-call", options)
          .then((response) => {
              console.log(response)
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json(); // Parse response body as JSON
          })
          .then((data) => {
            console.log("Response data:", data);
            // Handle response data here
          })
          .catch((error) => {
            console.error("Error:", error);
            // Handle errors here
          });
      
    }
    
    
  return (
    <div>
      <Box sx={{width:400,margin:'auto'}}>
        <Typography textAlign='center' mt={2} variant='h4'>All Appointments</Typography>
        <Box sx={{ my:2,textAlign:'center'}}><Button onClick={()=>setOpenCall(true)} variant='contained' size='small'>Make a call</Button></Box>
        <Box>
          {appointments.map((item,ind)=>{
          return(
            <Card variant='outlined' sx={{mb:2}}>
            <CardContent>
            <Box display='flex' justifyContent='space-between'><Typography>{item.name}</Typography> <Typography>{item?.problem_specialist}</Typography></Box>
              <Typography>{item.appointment_date}</Typography>
              <Typography>{item.number}</Typography>
              <Typography>{item?.diagnosis || ""}</Typography>
              <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                {/* <Button variant='contained' sx={{mr:2,textTransform: "capitalize"}} size='small'>Cancel</Button> */}
                <Button variant='contained' sx={{mr:2,textTransform: "capitalize"}} size='small' disabled={item?.is_approved} onClick={()=>handleApprove(item.number)}>{item?.is_approved ? "Approved" : "Approve"}</Button>
                {/* <Button variant='outlined' sx={{mr:2}} size='small'>Bed 3</Button> */}
                {/* <Button variant='outlined' sx={{mr:2}} size='small'>Bed 4</Button> */}
              </Box>
            </CardContent>
          </Card>
          )
})}
        </Box>
      </Box>
  <CallDialog onOpen={openCall} onClose={()=>setOpenCall(false)}/>
    </div>
  )
}

export default AllAppointments
