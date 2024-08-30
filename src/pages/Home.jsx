import DefaultLayout from "../layouts/default";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card"
import "../styles/App.css"
import {useState, useEffect} from "react";
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
import TotalProducts from '../statistics/TotalProducts'
import axios from "axios";
import LowStockProducts from "../statistics/LowStockProducts";
import { Spacer } from "@nextui-org/react";
//   import HighSale from "../statistics/HighSale";
  function Home(){
    const [transactions, setTransactions] = useState([]);
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/transactions/');
          if (Array.isArray(response.data)) {
            // Sort transactions by date in descending order and limit to 10
            const sortedTransactions = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            const recentTransactions = sortedTransactions.slice(0, 10);
            setTransactions(recentTransactions);
          } else {
            console.error('Expected an array but got:', response.data);
          }
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      };
  
      fetchTransactions();
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
  
    const itemColumns = [
      { key: 'item', label: 'Item' },
      { key: 'remaining', label: 'Remaining' },
    ];
  
    const itemRows = items.map(item => ({
      key: item.id,
      item: item.name,
      remaining: item.quantity,
    }));
    return(
        <DefaultLayout>
            <h1 className="text-center text-xl font-black">WELCOME TO THE DASHBOARD</h1>
            <div id="Tdiv" className=" flex flex-row place-content-evenly w-auto ">
                <Card id="crd1" className="Tcrds ">
                    <CardHeader>
                        <h2 className="text-xl font-bold">Total items in Stock</h2>
                    </CardHeader>
                    <CardBody>
                        <h3>100</h3>
                    </CardBody>
                </Card>
                <Card id="crd2" className="Tcrds">
                    <CardHeader>
                        <h2 className="text-xl font-bold">Number of Purchases</h2>
                    </CardHeader>
                    <CardBody>
                        <h3>100</h3>
                    </CardBody>
                </Card>
            </div>
            <div id="Cdiv" className="grid grid-cols-2 gap-2">
              <LowStockProducts/>
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

    )

}
export default Home