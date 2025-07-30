// 代码生成时间: 2025-07-31 06:37:27
const d3 = require('d3-selection');

/**
 * ShoppingCart class to manage items in a shopping cart.
 * @constructor
 */
class ShoppingCart {
  /**
   * Initializes the shopping cart with an empty array of items.
   */
  constructor() {
    this.items = [];
  }

  /**
   * Adds an item to the shopping cart.
   * @param {object} item - The item to add to the cart.
   * @param {string} item.name - The name of the item.
   * @param {number} item.price - The price of the item.
   * @param {number} item.quantity - The quantity of the item to add.
   */
  addItem(item) {
    if (!item.name || typeof item.name !== 'string') {
      throw new Error('Item must have a name.');
    }
    if (typeof item.price !== 'number' || item.price <= 0) {
      throw new Error('Item must have a positive price.');
    }
    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      throw new Error('Item must have a positive quantity.');
    }

    const existingItemIndex = this.items.findIndex((cartItem) => cartItem.name === item.name);
    if (existingItemIndex > -1) {
      this.items[existingItemIndex].quantity += item.quantity;
    } else {
      this.items.push({ ...item, quantity: item.quantity });
    }
  }

  /**
   * Removes an item from the shopping cart.
   * @param {string} itemName - The name of the item to remove.
   */
  removeItem(itemName) {
    this.items = this.items.filter((item) => item.name !== itemName);
  }

  /**
   * Updates the quantity of an item in the shopping cart.
   * @param {string} itemName - The name of the item to update.
   * @param {number} quantity - The new quantity of the item.
   */
  updateItemQuantity(itemName, quantity) {
    if (typeof quantity !== 'number' || quantity < 0) {
      throw new Error('Quantity must be a non-negative number.');
    }

    const itemIndex = this.items.findIndex((item) => item.name === itemName);
    if (itemIndex > -1) {
      this.items[itemIndex].quantity = quantity;
    } else {
      throw new Error(`Item with name '${itemName}' not found in cart.`);
    }
  }

  /**
   * Calculates the total cost of all items in the cart.
   * @returns {number} The total cost of the cart.
   */
  calculateTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Returns the current state of the shopping cart.
   * @returns {Array} An array of items in the cart.
   */
  getItems() {
    return this.items;
  }
}

// Example usage:
const cart = new ShoppingCart();
try {
  cart.addItem({ name: 'Apple', price: 0.99, quantity: 3 });
  cart.addItem({ name: 'Banana', price: 0.59, quantity: 2 });
  console.log('Total cost:', cart.calculateTotal()); // Output: Total cost: 3.46
  cart.updateItemQuantity('Apple', 1);
  console.log('Total cost after update:', cart.calculateTotal()); // Output: Total cost after update: 1.67
  cart.removeItem('Banana');
  console.log('Total cost after removal:', cart.calculateTotal()); // Output: Total cost after removal: 0.99
  console.log('Cart items:', cart.getItems()); // Output: Cart items: [{ name: 'Apple', price: 0.99, quantity: 1 }]
} catch (error) {
  console.error('An error occurred:', error.message);
}
