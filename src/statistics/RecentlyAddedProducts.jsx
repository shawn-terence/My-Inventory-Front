import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@nextui-org/table";

function RecentlyAddedProducts() {
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        const fetchRecentProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/inventory/');
                if (Array.isArray(response.data)) {
                    // Sort products by creation date in descending order and limit to 5
                    const sortedProducts = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
                    setRecentProducts(sortedProducts);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching recent products:', error);
            }
        };

        fetchRecentProducts();
    }, []);

    const columns = [
        { key: 'name', label: 'Product Name' },
        { key: 'quantity', label: 'Quantity' },
    ];

    const rows = recentProducts.map(product => ({
        key: product.id,
        name: product.name,
        quantity: product.quantity,
    }));

    return (
        <div>
            <h2>Recently Added Products</h2>
            <Table aria-label="Recently Added Products">
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

export default RecentlyAddedProducts;
