import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card,CardHeader,CardBody,CardFooter } from "@nextui-org/react";
function LowStockProducts() {
    const [lowStockProducts, setLowStockProducts] = useState([]);

    useEffect(() => {
        const fetchLowStockProducts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/inventory/`);
                const filteredProducts = response.data.filter(product => product.quantity < 10);
                setLowStockProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching low stock products:', error);
            }
        };

        fetchLowStockProducts();
    }, []);

    return (
        
            <Card>
                <CardHeader>Low stock Products</CardHeader>
                <CardBody>
                <ul>
                    {lowStockProducts.map((product) => (
                        <li key={product.id}>{product.name}: {product.quantity}</li>
                    ))}
                </ul>
                </CardBody>
            </Card>

        
    );
}

export default LowStockProducts;
