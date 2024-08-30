import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card,CardHeader,CardBody,CardFooter } from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@nextui-org/table";
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
    const columns = [
        { key: 'name', label: 'Product Name' },
        { key: 'quantity', label: 'Quantity' },
    ];

    const rows = lowStockProducts.map(product => ({
        key: product.id,
        name: product.name,
        quantity: product.quantity,
    }));
    return (
        
        <div>
            <h2>Low Stock Products</h2>
            <Table aria-label="Low Stock Products">
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

export default LowStockProducts;
