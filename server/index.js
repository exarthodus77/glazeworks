const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Simple CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});

// Middleware
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Connect to MongoDB
console.log('🔗 Connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Atlas connected!'))
    .catch(err => {
        console.error('❌ MongoDB error:', err.message);
        process.exit(1);
    });

// Menu Item Schema
const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    image: String,
    type: { type: String, enum: ['pastry', 'drink'], required: true },
    createdAt: { type: Date, default: Date.now }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// ==================== ROUTES ====================

// 1. Status check
app.get('/', (req, res) => {
    res.json({ 
        message: '🍰 Glazeworks Bakery API',
        status: 'running',
        mongoDB: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        time: new Date().toISOString()
    });
});

// 2. Get all menu items
app.get('/api/menu-items', async (req, res) => {
    try {
        const items = await MenuItem.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Get single item by ID
app.get('/api/menu-items/id/:id', async (req, res) => {
    try {
        console.log('🔍 Fetching item ID:', req.params.id);
        
        // Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid item ID format' });
        }
        
        const item = await MenuItem.findById(req.params.id);
        
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Get items by type (pastry/drink)
app.get('/api/menu-items/:type', async (req, res) => {
    try {
        const type = req.params.type.toLowerCase();
        
        if (!['pastry', 'drink'].includes(type)) {
            return res.status(400).json({ error: 'Invalid type. Use "pastry" or "drink"' });
        }
        
        const items = await MenuItem.find({ type: type }).sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Create new item
app.post('/api/menu-items', async (req, res) => {
    try {
        const item = new MenuItem(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 6. Update item
app.put('/api/menu-items/:id', async (req, res) => {
    try {
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid item ID format' });
        }
        
        const item = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 7. Delete item
app.delete('/api/menu-items/:id', async (req, res) => {
    try {
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid item ID format' });
        }
        
        const item = await MenuItem.findByIdAndDelete(req.params.id);
        
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 8. Admin login
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    
    if (password === 'glazeworks2024') {
        res.json({ 
            success: true, 
            token: 'admin_token_' + Date.now(),
            message: 'Login successful' 
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: 'Invalid password' 
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 MongoDB: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    console.log(`🌐 Main site: http://localhost:${PORT}/index.html`);
    console.log(`🔧 Admin: http://localhost:${PORT}/admin/index.html`);
});