// 代码生成时间: 2025-10-01 03:38:25
// Importing D3 library
const d3 = require('d3');

/**
 * Class representing a server
 * @property {string} id - Unique identifier for the server
 * @property {number} capacity - Maximum capacity of the server
 * @property {number} currentLoad - Current load on the server
 */
class Server {
  constructor(id, capacity) {
    this.id = id;
    this.capacity = capacity;
    this.currentLoad = 0;
  }

  /**
   * Increment the server's current load
   * @param {number} load - Load to add to the server
   */
  incrementLoad(load) {
    if (this.currentLoad + load > this.capacity) {
      throw new Error("Server capacity exceeded");
    }
    this.currentLoad += load;
  }
}

/**
 * Class representing the load balancer
 * @property {Array.<Server>} servers - Array of Server instances
 */
class LoadBalancer {
  constructor() {
    this.servers = [];
  }

  /**
   * Add a server to the load balancer
   * @param {Server} server - Server instance to add
   */
  addServer(server) {
    this.servers.push(server);
  }

  /**
   * Distribute load among servers
   * @param {number} load - Total load to distribute
   * @returns {boolean} - Whether distribution was successful
   */
  distributeLoad(load) {
    if (this.servers.length === 0) {
      throw new Error("No servers available");
    }

    let totalLoad = load;
    let distributedLoad = 0;
    let servers = [...this.servers]; // Clone the array to avoid modifying the original

    while (totalLoad > 0) {
      let minLoadServer = servers.reduce((min, server) => (min.currentLoad < server.currentLoad) ? min : server);
      let loadToDistribute = Math.min(totalLoad, minLoadServer.capacity - minLoadServer.currentLoad);
      minLoadServer.incrementLoad(loadToDistribute);
      totalLoad -= loadToDistribute;
      distributedLoad += loadToDistribute;
    }

    if (distributedLoad < load) {
      throw new Error("Not enough capacity to distribute load");
    }

    return true;
  }
}

// Example usage:

// Create servers
const server1 = new Server('server1', 100);
const server2 = new Server('server2', 100);
const server3 = new Server('server3', 100);

// Create load balancer and add servers
const balancer = new LoadBalancer();
balancer.addServer(server1);
balancer.addServer(server2);
balancer.addServer(server3);

try {
  // Attempt to distribute load
  balancer.distributeLoad(300);
  console.log("Load distributed successfully");
} catch (error) {
  console.error("Error distributing load: ", error.message);
}