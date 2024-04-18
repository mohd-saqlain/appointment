import Appointments from "../pages/appointments"
import AllAppointments from "../pages/all-appointments"

export const routes = [
    {
        path:'/appointments',
        element:<Appointments />,
    },
    {
        path:'/',
        element:<AllAppointments />,
    },
]