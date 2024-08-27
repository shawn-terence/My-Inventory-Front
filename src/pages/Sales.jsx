import React, { useState, useEffect } from "react";
import DefaultLayout from "../layouts/default";
import { Input, Button } from "@nextui-org/react";
import inventoryData from "../data/db.json";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

function SaleTerminal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const inventory = inventoryData.inventory;

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const filtered = inventory.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const adjustQuantity = (id, adjustment) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + adjustment) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const confirmPurchase = () => {
    // Implement purchase confirmation logic here (e.g., sending order details to the backend)
    alert("Purchase confirmed!");
    setCart([]); // Clear the cart after confirming the purchase
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <DefaultLayout>
      <h1 className="text-center text-xl mb-4 mt-4">Sales Terminal</h1>

      {/* Search Section */}
      <div className="search-section   items-center  flex flex-col">
        <Input
          placeholder="Search for an item"
          className="max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display Filtered Products */}
      <div className="product-list mb-6">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="product-item p-2 mb-2 flex space-x-4 rounded cursor-pointer hover:bg-gray-50 bg-gray-50"
            onClick={() => addToCart(item)}
          >
            <p>{item.name}</p>            
            <p>{item.quantity}</p>
            <p>${item.price}</p>

          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="cart-section">
        <div className="rounded-lg bg-white p-2 shadow-lg shadow-slate-300 border-2">
          <h2 className="text-center">Cart</h2>
          <Table isStriped aria-label="Cart Items" shadow="none"  >
            <TableHeader>
              <TableColumn>Item Name</TableColumn>
              <TableColumn>Price</TableColumn>
              <TableColumn>Quantity</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No items in cart"}>
              {cart.map((item) => (
                <TableRow key={item.id} >
                  <TableCell className="font-bold">{item.name}</TableCell>
                  <TableCell className="font-bold">{item.price}</TableCell>
                  <TableCell className="font-bold">{item.quantity}</TableCell>
                  <TableCell>
                    <Button
                      size="xs"
                      className="mr-2"
                      id="Remove"
                      onClick={() => adjustQuantity(item.id, -1)}
                    >
                      -
                    </Button>
                    <Button size="xs" id="Add" onClick={() => adjustQuantity(item.id, 1)}>
                      +
                    </Button>
                    <Button
                      size="xs"
                      id="RemoveItem"
                      className="ml-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Total Price */}
          <div className="mt-4 ml-7 font-black text-lg">
            <h3>Total: Kes {totalPrice.toFixed(2)}</h3>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-center space-x-4">
            <Button id="PurchaseButton" onClick={confirmPurchase}>
              Confirm Purchase
            </Button>
            <Button id="ClearCart" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default SaleTerminal;
