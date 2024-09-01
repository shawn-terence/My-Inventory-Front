import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card,CardHeader,CardBody,CardFooter } from "@nextui-org/react";
import api from "../api";
function TotalProducts() {
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchTotalProducts = async () => {
            try {
                const response = await axios.get(`${api}/inventory/`);
                setTotalProducts(response.data.length);
            } catch (error) {
                console.error('Error fetching total products:', error);
            }
        };

        fetchTotalProducts();
    }, []);

    return (
        // <div>
        //     <h3>Total Products in Inventory</h3>
        //     <p>{totalProducts}</p>
        // </div>
        <Card>
            <CardHeader><h3>Total Products in Inventory</h3></CardHeader>
            <CardBody>{totalProducts}</CardBody>
        </Card>
    );
}

export default TotalProducts;
