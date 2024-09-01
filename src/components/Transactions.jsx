import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import api from "../api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10; // Number of rows per page

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${api}/transactions/`);
        if (Array.isArray(response.data)) {
          setTransactions(response.data);
          setFilteredTransactions(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Handle search and filtering
  useEffect(() => {
    const filterTransactions = () => {
      const filtered = transactions.filter((transaction) => {
        const searchString = `${transaction.name} ${transaction.date}`.toLowerCase();
        return searchString.includes(searchTerm.toLowerCase());
      });
      setFilteredTransactions(filtered);
      setPage(1);
    };

    filterTransactions();
  }, [searchTerm, transactions]);

  // Paginated transactions
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  const transactionColumns = [
    { key: "name", label: "Item" },
    { key: "quantity", label: "Quantity" },
    { key: "date", label: "Date" },
  ];

  const transactionRows = paginatedTransactions.map((transaction) => ({
    key: transaction.id,
    name: transaction.name,
    quantity: transaction.quantity,
    date: transaction.date,
  }));

  return (
      <div className="p-4">
        <h1 className="text-center text-xl font-black">Transaction Records</h1>
        <Input
          placeholder="Search by item or date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <Table isStriped aria-label="Transactions Table">
          <TableHeader>
            {transactionColumns.map((column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={"No transactions found"}>
            {transactionRows.map((row) => (
              <TableRow key={row.key}>
                {(columnKey) => (
                  <TableCell>{row[columnKey]}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center">
          <Pagination
            page={page}
            total={totalPages}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    
  );
}

export default Transactions;
