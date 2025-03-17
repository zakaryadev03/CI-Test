const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Mock Inventory Data
let inventory = {
  'item1': { name: 'Item 1', quantity: 10 },
  'item2': { name: 'Item 2', quantity: 5 }
};

app.use(bodyParser.json());

// Health check endpoint
app.get('/health', (req, res) => res.status(200).send('OK'));



// Unified inventory update endpoint
app.post('/inventory/update', (req, res) => {
    const { itemId, quantity } = req.body;

    console.log('Request received from Order service');
    
    if (!inventory[itemId]) {
        return res.status(404).json({ error: 'Item not found in inventory' });
    }

    if (inventory[itemId].quantity < quantity) {
        return res.status(400).json({ error: 'Insufficient stock' });
        /*
        // Delay the response by 10 seconds
        setTimeout(() => {
            return res.status(400).json({ error: 'Insufficient stock' });
        }, 10000); // 10000 milliseconds = 10 seconds
        */
    }

    inventory[itemId].quantity -= quantity;
    res.status(200).json({ message: 'Inventory updated successfully' });    
    /*
    // Delay the response by 10 seconds
    setTimeout(() => {
        res.status(200).json({ message: 'Inventory updated successfully' });
    }, 10000); // 10000 milliseconds = 10 seconds
    */
});

app.listen(PORT, () => {
    console.log(`Inventory service running on port ${PORT}`);
});
