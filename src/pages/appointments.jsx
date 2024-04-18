import React from 'react'
import { Typography,Box,CardContent,Card,Button } from '@mui/material'

const Appointments = () => {
  return (
    <div>
      <Box sx={{width:400,margin:'auto'}}>
        <Typography textAlign='center' my={2} variant='h3'>Appointments</Typography>
        <Box>
          {Array.from({length:4}).map((item,ind)=>(
            <Card variant='outlined' sx={{mb:2}} gutterBottom>
            <CardContent>
              <Typography color='text.primary'>9:00 AM to 10:00 AM</Typography>
              <Box sx={{display:'flex'}}>
                <Button variant='outlined' sx={{mr:2}} size='small'>Bed 1</Button>
                <Button variant='contained'  sx={{mr:2}} size='small'>Bed 2</Button>
                <Button variant='outlined' sx={{mr:2}} size='small'>Bed 3</Button>
                <Button variant='outlined' sx={{mr:2}} size='small'>Bed 4</Button>
              </Box>
            </CardContent>
          </Card>
          ))}
        </Box>
      </Box>
    </div>
  )
}

export default Appointments
