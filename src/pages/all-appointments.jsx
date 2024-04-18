import React, { useEffect, useState } from 'react'
import { Typography,Box,CardContent,Card,Button } from '@mui/material'

const AllAppointments = () => {
    const [appointments,setAppointment] = useState([]);

    useEffect(() => {
        async function getAppointments() {
            try {
                const response = await fetch('http://localhost:80/get-appointments');
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
    
    
  return (
    <div>
      <Box sx={{width:400,margin:'auto'}}>
        <Typography textAlign='center' my={2} variant='h4'>All Appointments</Typography>
        <Box>
          {appointments.map((item,ind)=>{
            console.log(new Date(item.appointment_date))
          return(
            <Card variant='outlined' sx={{mb:2}}>
            <CardContent>
            <Typography>{item.name}</Typography>
              <Typography>{item.appointment_date}</Typography>
              <Typography>{item.number}</Typography>
              {/* <Box sx={{display:'flex'}}>
                <Button variant='outlined' sx={{mr:2}} size='small'>Bed 1</Button>
                <Button variant='contained'  sx={{mr:2}} size='small'>Bed 2</Button>
                <Button variant='outlined' sx={{mr:2}} size='small'>Bed 3</Button>
                <Button variant='outlined' sx={{mr:2}} size='small'>Bed 4</Button>
              </Box> */}
            </CardContent>
          </Card>
          )
})}
        </Box>
      </Box>
    </div>
  )
}

export default AllAppointments
