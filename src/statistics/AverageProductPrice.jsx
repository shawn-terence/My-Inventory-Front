import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card,CardHeader,CardBody,CardFooter } from "@nextui-org/react";
import api from "../api";
function AverageProductPrice() {
    const [averagePrice, setAveragePrice] = useState(0);

    useEffect(() => {
        const fetchAverageProductPrice = async () => {
            try {
                const response = await axios.get(`https://my-inventory-backend.onrender.com/inventory/`);
                const totalValue = response.data.reduce((acc, product) => acc + product.price, 0);
                setAveragePrice(totalValue / response.data.length);
            } catch (error) {
                console.error('Error fetching average product price:', error);
            }
        };

        fetchAverageProductPrice();
    }, []);

    return (
        <Card>
            <CardHeader>Average Product Price</CardHeader>
            <CardBody>Kes {averagePrice}</CardBody>
        </Card>
    );
}

export default AverageProductPrice;
