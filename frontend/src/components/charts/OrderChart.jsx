import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
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

const OrderChart = () => {

    const [orderChart, setOrderChart] = useState([]);

    const fetchMonthlyOrder = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/dashboard/get/monthly-order");
            setOrderChart(res.data.data);   
        } catch (error) {
            console.error("Error While Fetch Monthly Order",error);
        }
    }

    useEffect(()=>{
        fetchMonthlyOrder();
    },[]);


    const monthlyOrderData = {
    labels: orderChart.map((item) => item.month_name),
    datasets: [
        {
            label: "Monthly Orders",
            data: orderChart.map((item) => item.total_orders),
             backgroundColor: [
                "#ff7f50",
                "#9370db",
                "#4a90e2",
                "#50c878",
            ],
            borderRadius: 8,
            maxBarThickness: 45,
        },
    ],
    };
  return (
    <div>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "2px", width:"600px" }}>
            <h4 style={{ marginBottom: "20px", fontSize:"20px",color:"#283c50", fontWeight:"600"}}>
                Monthly Orders
            </h4>
            <Bar data={monthlyOrderData} />
        </div>
    </div>
  )
}

export default OrderChart
