import Appointments from "../pages/appointments"
import AllAppointments from "../pages/all-appointments"
import CallScheduling from "../pages/call-scheduling"

export const routes = [
    {
        path:'/call-scheduling',
        element:<CallScheduling />,
    },
    {
        path:'/',
        element:<AllAppointments />,
    },
]