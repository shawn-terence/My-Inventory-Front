import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card,CardHeader,CardBody,CardFooter } from "@nextui-org/react";
function TopProducts() {
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/inventory/`);
                const sortedProducts = response.data.sort((a, b) => b.quantity - a.quantity).slice(0, 5);
                setTopProducts(sortedProducts);
            } catch (error) {
                console.error('Error fetching top products:', error);
            }
        };

        fetchTopProducts();
    }, []);

    return (
        
            <Card>
                <CardHeader>Top Products by Quantity</CardHeader>
                <CardBody>
                    <ul>
                        {topProducts.map((product) => (
                            <li key={product.id}>{product.name}: {product.quantity}</li>
                        ))}
                    </ul>
                </CardBody>
            </Card>
        
    );
}

export default TopProducts;
