import React, { useEffect, useState } from 'react'

import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import axios from 'axios';

ChartJs.register(CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const WeeklyAppointmentChart = () => {

    const [appointmentChart, setAppointmentChart] = useState([]);

    const fetchWeeklyAppointment = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/dashboard/get/weekly-appointment");
            setAppointmentChart(res.data.data);   
        } catch (error) {
            console.error("Error While Fetch weekly appointment",error);
        }
    }

    useEffect(()=>{
        fetchWeeklyAppointment();
    },[]);

    const weeklyappointmentData = {
        labels: appointmentChart.map((item) => `Week ${item.week_number}`),
        datasets: [
        {
            label: "Appointments",
            data: appointmentChart.map((item) => item.total_appointments),
            backgroundColor: [
                "#4a90e2",
                "#50c878",
                "#ff7f50",
                "#9370db",
            ],
            borderRadius: 6,
            maxBarThickness: 40,
        },
        ],
    };

  return (
        <div style={{ background: "#fff", padding: "20px", borderRadius: "2px", width:"600px" }}>
            <h4 style={{ marginBottom: "20px", fontSize:"20px",color:"#283c50", fontWeight:"600"}}>
                Weekly Appointments
            </h4>
            <Bar data={weeklyappointmentData} />
        </div>
  )
}

export default WeeklyAppointmentChart
