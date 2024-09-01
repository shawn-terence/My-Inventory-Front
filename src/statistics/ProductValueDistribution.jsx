import React, { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import axios from "axios";
import { Card,CardHeader,CardBody,CardFooter } from "@nextui-org/react";

function ProductValueDistribution() {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchProductValueDistribution = async () => {
            try {
                const response = await axios.get(`https://my-inventory-backend.onrender.com/inventory/`);
                const labels = response.data.map(product => product.name);
                const data = response.data.map(product => product.price * product.quantity);

                setChartData({
                    labels,
                    datasets: [{
                        label: 'Product Value',
                        data,
                        backgroundColor: "#467349",
                        borderColor: "#333",
                        borderWidth: 1,
                    }]
                });
            } catch (error) {
                console.error('Error fetching product value distribution:', error);
            }
        };

        fetchProductValueDistribution();
    }, []);

    return (
        <div className="w-full items-center " id="ProductDist">
            <h3>Product Value Distribution</h3>
            <BarChart ChartData={chartData} />
        </div>
    );
}

export default ProductValueDistribution;
