import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function CallDialog({ onOpen, onClose }) {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const handleCall = () => {
    if (phoneNumber) {
      const data = {
        from_number: "+12137322785",
        to_number: phoneNumber,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify content type as JSON
          Authorization: "Bearer 851d8446-7774-45c8-9c15-4a6945ce4d7e", // Include the Bearer token in the Authorization header
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
  return (
    <React.Fragment>
      <Dialog open={onOpen} onClose={onClose}>
        <DialogContent>
          <Typography variant="h5">Enter phone number</Typography>
          <Typography variant="body2" mb={2}>
            Remember to prefix your number with the country code without space,
            e.g., +11234567890
          </Typography>
          <TextField
            fullWidth
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            label="Phone number"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="warning"
            sx={{ textTransform: "capitalize" }}
            size="small"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: "capitalize" }}
            onClick={handleCall}
          >
            Call
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
