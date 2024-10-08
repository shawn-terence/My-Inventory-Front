import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";
import { Input, Spacer } from "@nextui-org/react";
import DefaultLayout from "../layouts/default";
import { Button } from "@nextui-org/button";


function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [newItem, setNewItem] = useState({ id: "", name: "", quantity: "", price: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [file, setFile] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const rowsPerPage = 10;

  // Fetch inventory items from the API
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get(`https://my-inventory-backend.onrender.com/inventory/`);
        setInventoryItems(response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventoryItems();
  }, []);

  // Handle adding a new item or updating an existing one
  const handleAddOrUpdateItem = async () => {
    if (isEditing) {
      try {
        const response = await axios.put(
          `https://my-inventory-backend.onrender.com/inventory/${newItem.id}/`,
          newItem
        );
        setInventoryItems(
          inventoryItems.map((item) =>
            item.id === response.data.id ? response.data : item
          )
        );
        setIsEditing(false);
        setNewItem({ id: "", name: "", quantity: "", price: "" });
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      try {
        const response = await axios.post(`https://my-inventory-backend.onrender.com/inventory/add/`, {
          ...newItem,
          id: Date.now()
        });
        setInventoryItems([...inventoryItems, response.data]);
        setNewItem({ id: "", name: "", description: "", quantity: "", price: "" });
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  const handleEditItem = (item) => {
    setNewItem(item);
    setIsEditing(true);
  };

  const handleDeleteItem = async () => {
    if (itemToDelete) {
      try {
        await axios.delete(`https://my-inventory-backend.onrender.com/inventory/${itemToDelete.id}/delete/`);
        setInventoryItems(inventoryItems.filter((item) => item.id !== itemToDelete.id));
        setItemToDelete(null);
        onOpenChange(false); // Close the modal
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const confirmDelete = (item) => {
    setItemToDelete(item);
    onOpen(); // Open the modal
  };

  const handleSearch = () => {
    setPage(1);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`https://my-inventory-backend.onrender.com/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Filtered and paginated inventory items
  const filteredItems = inventoryItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedItems = filteredItems.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalPages = Math.ceil(filteredItems.length / rowsPerPage);

  return (
    <DefaultLayout>
      <div className="inventory-page p-10" id="InventoryPage">
        {/* Search Section */}
        <h2 className="text-center text-xl">INVENTORY PAGE</h2>
        <Spacer y="10" />
        <div id="searchInventory" className="mb-4 flex items-center">
          <Input
            placeholder="Search Items"
            className="max-w-[220px] justify-self-center"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button id="SearchButton" className="ml-2" onClick={handleSearch}>
            Search
          </Button>
        </div>

        {/* Add or Edit Item Section */}
        <div className="add-item-section mb-6">
          <h2>{isEditing ? "Edit Item" : "Add New Item Individually"}</h2>
          <div className="flex gap-4">
            <Input
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
            <Input
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
            <Button id="AddButton" onClick={handleAddOrUpdateItem}>
              {isEditing ? "Update Item" : "Add Item"}
            </Button>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="file-upload-section mb-6">
          <h2>Upload Spreadsheet</h2>
          <input type="file" onChange={handleFileChange} />
          <Button id="UploadFile" onClick={handleFileUpload}>Upload</Button>
        </div>

        {/* Inventory List Section */}
        <div className="inventory-list">
          <h2>Inventory Items</h2>
          <Table
            isStriped
            aria-label="Inventory Table"
            css={{
              minWidth: "100%",
            }}
          >
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>QUANTITY</TableColumn>
              <TableColumn>PRICE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {paginatedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <Button
                      id="EditButton"
                      size="small"
                      className="mr-2"
                      onClick={() => handleEditItem(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      id="DeleteButton"
                      size="small"
                      color="danger"
                      onClick={() => confirmDelete(item)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center">
          <Pagination
            page={page}
            total={totalPages}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Confirm Delete
                </ModalHeader>
                <ModalBody>
                  <p>Are you sure you want to delete {itemToDelete?.name}?</p>
                  <p>Deleting this item is irreversible</p>
                </ModalBody>
                <ModalFooter>
                  <Button id="CancelDelete" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    id="Confirm-Delete"
                    onPress={() => {
                      handleDeleteItem();
                      onClose();
                    }}
                  >
                    Yes, Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </DefaultLayout>
  )
  }
  export default InventoryPage
