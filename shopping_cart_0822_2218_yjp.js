// 代码生成时间: 2025-08-22 22:18:11
 * Features:
 * - Add items to the cart
 * - Remove items from the cart
 * - Update item quantity
 * - Display cart items
 * - Calculate total price
 *
 * To use D3.js, ensure it is included in your HTML file before this script.
 */

// ShoppingCart constructor function
function ShoppingCart() {
  this.items = [];
  this.totalPrice = 0;
}

// Add an item to the cart
ShoppingCart.prototype.addItem = function(itemId, price, quantity) {
  if (!itemId || !price || !quantity) {
    throw new Error('Item ID, price, and quantity are required.');
  }

  const existingItem = this.items.find(item => item.id === itemId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({
      id: itemId,
      price: price,
      quantity: quantity
    });
  }
  this.calculateTotalPrice();
};

// Remove an item from the cart
ShoppingCart.prototype.removeItem = function(itemId) {
  const index = this.items.findIndex(item => item.id === itemId);
  if (index > -1) {
    this.items.splice(index, 1);
    this.calculateTotalPrice();
  } else {
    console.error('Item not found in the cart.');
  }
};

// Update item quantity in the cart
ShoppingCart.prototype.updateQuantity = function(itemId, quantity) {
  const item = this.items.find(item => item.id === itemId);
  if (item) {
    item.quantity = quantity;
    this.calculateTotalPrice();
  } else {
    console.error('Item not found in the cart.');
  }
};

// Calculate the total price of the cart
ShoppingCart.prototype.calculateTotalPrice = function() {
  this.totalPrice = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

// Display cart items
ShoppingCart.prototype.displayCart = function() {
  console.log('Cart Items:', this.items);
  console.log('Total Price:', this.totalPrice);
};

// Example usage
try {
  const cart = new ShoppingCart();
  cart.addItem('001', 9.99, 2); // Add two items with ID '001' and price $9.99
  cart.addItem('002', 19.99, 1); // Add one item with ID '002' and price $19.99
  cart.displayCart();
  cart.updateQuantity('001', 3); // Update quantity of ID '001' items to 3
  cart.displayCart();
  cart.removeItem('002'); // Remove item with ID '002'
  cart.displayCart();
} catch (error) {
  console.error('An error occurred:', error.message);
}
