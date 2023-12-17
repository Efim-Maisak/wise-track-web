import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";

ChartJS.register(CategoryScale, LinearScale, BarController, BarElement, Tooltip, Legend );


const BarChart = ({chartData, devices}) => {

    const barOptions = {
        scales: {
            y: {
                beginAtZero: true,
                grace: "20%",
                ticks: {
                    stepSize: 1,
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
        },
        layout: {
            padding: 20
        }
    }


    return (
        <Box p={4}>
            {chartData.map((item, index) => {
                return (
                    <Box pb={4} key={index}>
                        <Text
                        color="gray.600"
                        fontWeight="500"
                        textAlign="center"
                        >
                        {item.datasets[0].label}, {devices[index].device_type_id.units}, за месяц
                        </Text>
                        <Bar
                        h="400px"
                        data={item}
                        options={barOptions}/>
                    </Box>
                );
            })}
        </Box>
    );
};

export default BarChart;
