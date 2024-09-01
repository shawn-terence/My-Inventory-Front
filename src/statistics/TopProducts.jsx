import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card,CardHeader,CardBody,CardFooter } from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@nextui-org/table";
import api from "../api";
function TopProducts() {
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                const response = await axios.get(`${api}/inventory/`);
                const sortedProducts = response.data.sort((a, b) => b.quantity - a.quantity).slice(0, 5);
                setTopProducts(sortedProducts);
            } catch (error) {
                console.error('Error fetching top products:', error);
            }
        };

        fetchTopProducts();
    }, []);
    const columns = [
        { key: 'name', label: 'Product Name' },
        { key: 'quantity', label: 'Quantity' },
    ];

    const rows = topProducts.map(product => ({
        key: product.id,
        name: product.name,
        quantity: product.quantity,
    }));
    return (
        
        <div>
            <h2>Top Products by Quantity</h2>
            <Table aria-label="Top Products">
                <TableHeader>
                    {columns.map(column => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.key}>
                            {columnKey => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>

    );
}

export default TopProducts;
