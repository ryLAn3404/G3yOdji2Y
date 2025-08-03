// 代码生成时间: 2025-08-03 23:55:51
// Define a class representing an Inventory Item
class InventoryItem {
    constructor(id, name, quantity) {
        this.id = id; // Unique identifier for the item
        this.name = name; // Name of the item
        this.quantity = quantity; // Quantity of the item available
    }

    // Method to update item quantity
    updateQuantity(newQuantity) {
        if (newQuantity < 0) {
            throw new Error('Quantity cannot be negative.');
        }
        this.quantity = newQuantity;
    }
}

// Define a class to manage the inventory
class InventoryManager {
    constructor() {
        this.items = []; // Array to store inventory items
    }

    // Method to add a new item to the inventory
    addItem(item) {
        if (!(item instanceof InventoryItem)) {
            throw new Error('Invalid item. Item must be an instance of InventoryItem.');
        }
        this.items.push(item);
    }

    // Method to remove an item from the inventory
    removeItem(itemId) {
        const index = this.items.findIndex(item => item.id === itemId);
        if (index === -1) {
            throw new Error('Item not found in inventory.');
        }
        this.items.splice(index, 1);
    }

    // Method to update item quantity
    updateItemQuantity(itemId, newQuantity) {
        const item = this.items.find(item => item.id === itemId);
        if (!item) {
            throw new Error('Item not found in inventory.');
        }
        item.updateQuantity(newQuantity);
    }

    // Method to get inventory items
    getItems() {
        return this.items;
    }
}

// Example usage:
try {
    const inventoryManager = new InventoryManager();

    // Create and add items to the inventory
    const item1 = new InventoryItem(1, 'Apple', 100);
    const item2 = new InventoryItem(2, 'Banana', 50);
    inventoryManager.addItem(item1);
    inventoryManager.addItem(item2);

    // Update item quantity
    inventoryManager.updateItemQuantity(1, 80);

    // Remove an item from the inventory
    inventoryManager.removeItem(2);

    // Get and display inventory items
    const items = inventoryManager.getItems();
    items.forEach(item => {
        console.log(`Item ID: ${item.id}, Name: ${item.name}, Quantity: ${item.quantity}`);
    });
} catch (error) {
    console.error('An error occurred:', error.message);
}