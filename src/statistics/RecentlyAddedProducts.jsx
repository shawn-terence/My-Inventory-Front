import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card,CardHeader,CardBody,CardFooter } from "@nextui-org/react";
function RecentlyAddedProducts() {
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        const fetchRecentProducts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/inventory/`);
                const sortedProducts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
                setRecentProducts(sortedProducts);
            } catch (error) {
                console.error('Error fetching recent products:', error);
            }
        };

        fetchRecentProducts();
    }, []);

    return (
        <div>
            <Card>
                <CardHeader>Recently Added Products</CardHeader>
                <CardBody>
                    <ul>
                        {recentProducts.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                </CardBody>
            </Card>
            <h3></h3>

        </div>
    );
}

export default RecentlyAddedProducts;
