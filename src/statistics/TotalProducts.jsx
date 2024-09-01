import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card,CardHeader,CardBody,CardFooter } from "@nextui-org/react";

function TotalProducts() {
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchTotalProducts = async () => {
            try {
                const response = await axios.get(`https://my-inventory-backend.onrender.com/inventory/`);
                setTotalProducts(response.data.length);
            } catch (error) {
                console.error('Error fetching total products:', error);
            }
        };

        fetchTotalProducts();
    }, []);

    return (
        <Card>
            <CardHeader><h3>Total Products in Inventory</h3></CardHeader>
            <CardBody>{totalProducts}</CardBody>
        </Card>
    );
}

export default TotalProducts;
