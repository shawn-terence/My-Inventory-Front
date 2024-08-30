import DefaultLayout from "../layouts/default";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import "../styles/App.css";
import { useState, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue
} from "@nextui-org/table";
import MonthlySale from "../statistics/MonthlySale";
import CurrentSale from "../statistics/CurrentSale";
import axios from "axios";
import LowStockProducts from "../statistics/LowStockProducts";

function Home() {
    const [transactions, setTransactions] = useState([]);
    const [items, setItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [numberOfPurchases, setNumberOfPurchases] = useState(0);

    // Fetch transactions and calculate the number of purchases
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/transactions/');
                if (Array.isArray(response.data)) {
                    const sortedTransactions = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    const recentTransactions = sortedTransactions.slice(0, 10);
                    setTransactions(recentTransactions);
                    setNumberOfPurchases(response.data.length); // Set the number of purchases based on the number of transactions
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    // Fetch items and calculate total items and total quantity
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/inventory/'); 
                if (Array.isArray(response.data)) {
                    setItems(response.data);
                    const totalItemsCount = response.data.length;
                    const totalQuantityCount = response.data.reduce((acc, item) => acc + item.quantity, 0);
                    setTotalItems(totalItemsCount); // Set the total number of items
                    setTotalQuantity(totalQuantityCount); // Set the total quantity of all items
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    const transactionColumns = [
        { key: 'name', label: 'Item' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'date', label: 'Date' },
    ];

    const transactionRows = transactions.map(transaction => ({
        key: transaction.id,
        name: transaction.name,
        quantity: transaction.quantity,
        date: transaction.date,
    }));

    return (
        <DefaultLayout>
            <h1 className="text-center text-xl font-black">WELCOME TO THE DASHBOARD</h1>
            <div id="Tdiv" className="flex flex-row place-content-evenly w-auto">
                <Card id="crd1" className="Tcrds">
                    <CardHeader>
                        <h2 className="text-xl font-bold">Total items in Stock</h2>
                    </CardHeader>
                    <CardBody>
                        <h3>{totalQuantity}</h3> {/* Display the total quantity */}
                    </CardBody>
                </Card>
                <Card id="crd2" className="Tcrds">
                    <CardHeader>
                        <h2 className="text-xl font-bold">Number of Purchases</h2>
                    </CardHeader>
                    <CardBody>
                        <h3>{numberOfPurchases}</h3> {/* Display the number of purchases */}
                    </CardBody>
                </Card>
            </div>
            <div id="Dash" className="grid grid-cols-2">
                <CurrentSale />
                <MonthlySale />
            </div>
            <div id="Cdiv" className="grid grid-cols-2 gap-2">
                <LowStockProducts />
                <div>
                    <h2>Recent Transactions</h2>
                    <Table aria-label="Recent transactions">
                        <TableHeader>
                            {transactionColumns.map(column => (
                                <TableColumn key={column.key}>{column.label}</TableColumn>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {transactionRows.map(row => (
                                <TableRow key={row.key}>
                                    {columnKey => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Home;
