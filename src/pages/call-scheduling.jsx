import React, { useEffect, useState } from 'react'
import { Typography,Box,CardContent,Card,Button } from '@mui/material'
import AddClient from '../components/add-client';
import CallDialog from '../components/call-dialog';

const CallScheduling = () => {
    const [clients,setClients] = useState([]);
    const [openCall,setOpenCall] = useState(false);
    const [counter,setCounter] = useState(0)
    const [isDisabled,setIsDisabled] = useState(false);
    const url = 'https://2423-103-46-203-83.ngrok-free.app';
    const localUrl = 'http://localhost:80';
    const renderUrl = 'https://apis-jct6.onrender.com'

    useEffect(() => {
        async function getClients() {
            try {
                const response = await fetch(`${renderUrl}/get-clients`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setClients(data); // Logging the data returned by the API
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error here, such as displaying an error message to the user
            }
        }
        
        getClients();
    }, [counter]);

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

    const handleStartCalling = async () => {
      const response = await fetch(`${renderUrl}/clients`);
      if(!response.ok){
        throw new Error('Network response not ok');
      }
      const data = await response.json();
      callWithDelay(data,0);
      if(data.length){
        setIsDisabled(true);
      }
    }
      const handleCall = (phoneNumber) => {

    if (phoneNumber) {
      const data = {
        override_agent_id:'61476b9216fe9aecc639da18fef04819',
        from_number: "+14154803160",
        to_number: phoneNumber,
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
  };

  

  function callWithDelay(arr, index) {
    setTimeout(() => {
        console.log(arr[index].number);
        handleCall(arr[index].number);
        if (index < arr.length - 1) {
          callWithDelay(arr, index + 1);
        }
    }, 30000);
}

const increaseRecall = () => {
    setCounter(counter + 1)
}

    
    
  return (
    <div>
      <Box sx={{width:400,margin:'auto'}}>
        <Typography textAlign='center' mt={2} variant='h4'>All Clients</Typography>
        <Box sx={{ my:2,display:'flex',gap:2,alignItems:'center',justifyContent:'center'}}><Button onClick={()=>setOpenCall(true)} variant='contained' size='small'>Add Client</Button>
        <Button onClick={handleStartCalling} disabled={isDisabled} variant='contained' size='small'>Start Calling</Button>
        </Box>
        <Box>
          {clients.map((item,ind)=>{
          return(
            <Card variant='outlined' sx={{mb:2}}>
            <CardContent>
            <Box display='flex' justifyContent='space-between'><Typography>{item.name}</Typography></Box>
              <Typography>{item.number}</Typography>
              <Typography>{item?.description || ""}</Typography>
            </CardContent>
          </Card>
          )
})}
        </Box>
      </Box>
  <AddClient increaseRecall={increaseRecall} onOpen={openCall} onClose={()=>setOpenCall(false)}/>
    </div>
  )
}

export default CallScheduling
