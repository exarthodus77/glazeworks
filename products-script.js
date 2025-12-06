// PRODUCTS PAGE JAVASCRIPT
document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ PRODUCTS PAGE LOADED ✨');
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Products data
    const signatureProducts = [
        {
            name: "Honey Butter Croissant",
            description: "27 delicate layers of French butter, glazed with wild honey",
            price: "$5.50",
            image: "https://www.corriecooks.com/wp-content/uploads/2025/04/Honey-Butter-Croissants-500x500.jpg"
        },
        {
            name: "Vanilla Bean Éclair",
            description: "Madagascar vanilla pastry cream in choux pastry",
            price: "$6.75",
            image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop&q=90"
        },
        {
            name: "Raspberry Macaron",
            description: "Fresh raspberry filling in almond meringue shells",
            price: "$3.50",
            image: "https://www.sweetandsavorybyshinee.com/wp-content/uploads/2022/08/Raspberry-Macarons-1-1024x1536.jpg"
        },
        {
            name: "Lemon Tart",
            description: "Zesty citrus cream in buttery shortcrust pastry",
            price: "$7.25",
            image: "https://zestfulkitchen.com/wp-content/uploads/2020/03/classic-lemon-tart-_-for-web-_-cover-736x809.jpg"
        },
        {
            name: "Chocolate Twist",
            description: "Dark chocolate spiral with sea salt crystals",
            price: "$5.75",
            image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=400&h=400&fit=crop&q=90"
        },
        {
            name: "Almond Brioche",
            description: "Toasted almond and orange blossom",
            price: "$6.25",
            image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop&q=90"
        },
        {
            name: "Pain au Chocolat",
            description: "Double chocolate batons in flaky pastry",
            price: "$5.95",
            image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400&h=400&fit=crop&q=90"
        },
        {
            name: "Matcha Roll",
            description: "Ceremonial matcha sponge with red bean paste",
            price: "$6.95",
            image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=400&fit=crop&q=90"
        }
    ];
    
    const drinks = [
        { name: "Espresso", description: "Single origin coffee", price: "$3.50" },
        { name: "Pour Over", description: "Slow-brewed single origin", price: "$4.50" },
        { name: "Cappuccino", description: "Espresso with steamed milk", price: "$4.25" },
        { name: "Latte", description: "Espresso with velvety milk", price: "$4.75" },
        { name: "Matcha Latte", description: "Ceremonial matcha", price: "$5.25" },
        { name: "Chai Tea", description: "Spiced black tea latte", price: "$4.75" },
        { name: "Cold Brew", description: "12-hour steeped coffee", price: "$5.50" },
        { name: "Herbal Infusion", description: "Seasonal herbs", price: "$4.00" },
        { name: "Hot Chocolate", description: "70% dark chocolate", price: "$4.50" },
        { name: "Turkish Coffee", description: "Traditional preparation", price: "$4.75" }
    ];
    
    // Render products
    const productsGrid = document.querySelector('.products-grid');
    const drinksGrid = document.querySelector('.drinks-grid');
    
    if (productsGrid) {
        signatureProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">${product.price}</div>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
    }
    
    if (drinksGrid) {
        drinks.forEach(drink => {
            const drinkCard = document.createElement('div');
            drinkCard.className = 'drink-card';
            drinkCard.innerHTML = `
                <div class="drink-info">
                    <h3>${drink.name}</h3>
                    <p>${drink.description}</p>
                </div>
                <div class="drink-price">${drink.price}</div>
            `;
            drinksGrid.appendChild(drinkCard);
        });
    }
    
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card, .drink-card');
    const cursorHalo = document.querySelector('.cursor-halo');
    
    if (cursorHalo) {
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                cursorHalo.classList.add('hovering');
            });
            
            card.addEventListener('mouseleave', () => {
                cursorHalo.classList.remove('hovering');
            });
        });
    }
});
// Load products from your API
async function loadLiveProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/menu-items');
        const items = await response.json();
        
        // Separate pastries and drinks
        const pastries = items.filter(item => item.type === 'pastry');
        const drinks = items.filter(item => item.type === 'drink');
        
        // Update signature collection tab
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = pastries.map(pastry => `
                <div class="product-card" style="opacity: 0; animation: fadeIn 0.5s ease forwards;">
                    <div class="product-image">
                        <img src="${pastry.image}" alt="${pastry.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${pastry.name}</h3>
                        <p class="product-description">${pastry.description}</p>
                        <div class="product-price">${pastry.price}</div>
                    </div>
                </div>
            `).join('');
        }
        
        // Update drinks tab - ADD INLINE STYLES TO FORCE ANIMATIONS
        const drinksGrid = document.querySelector('.drinks-grid');
        if (drinksGrid) {
            drinksGrid.innerHTML = drinks.map((drink, index) => `
                <div class="drink-item" 
                     style="opacity: 0; 
                            transform: translateY(20px); 
                            animation: fadeInUp 0.5s ease ${index * 0.05}s forwards;
                            transition: all 0.3s ease !important;">
                    <div class="drink-info">
                        <h4 class="drink-name">${drink.name}</h4>
                        <p class="drink-description">${drink.description || 'Premium quality beverage'}</p>
                    </div>
                    <div class="drink-price">${drink.price}</div>
                </div>
            `).join('');
        }
        
    } catch (error) {
        console.log('Using fallback data (API not available)');
        // Fallback to hardcoded data
    }
}

// Add these animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Load on page load
document.addEventListener('DOMContentLoaded', loadLiveProducts);




////////





window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Load products from your API - ADD THIS FUNCTION
        async function loadLiveProducts() {
            try {
                const response = await fetch('http://localhost:5000/api/menu-items');
                const items = await response.json();
                
                // Separate pastries and drinks
                const pastries = items.filter(item => item.type === 'pastry');
                const drinks = items.filter(item => item.type === 'drink');
                
                // Update signature collection tab
                const productsGrid = document.querySelector('.products-grid');
                if (productsGrid) {
                    productsGrid.innerHTML = pastries.map(pastry => `
                        <div class="product-card">
                            <div class="product-image">
                                <img src="${pastry.image}" alt="${pastry.name}">
                            </div>
                            <div class="product-info">
                                <h3 class="product-name">${pastry.name}</h3>
                                <p class="product-description">${pastry.description}</p>
                                <div class="product-price">${pastry.price}</div>
                            </div>
                        </div>
                    `).join('');
                }
                
                // Update drinks tab
                const drinksGrid = document.querySelector('.drinks-grid');
                if (drinksGrid) {
                    drinksGrid.innerHTML = drinks.map(drink => `
                        <div class="drink-item">
                            <div class="drink-info">
                                <h4 class="drink-name">${drink.name}</h4>
                                <p class="drink-description">${drink.description || 'Premium quality beverage'}</p>
                            </div>
                            <div class="drink-price">${drink.price}</div>
                        </div>
                    `).join('');
                }
                
            } catch (error) {
                console.log('Using fallback data (API not available)');
                // Fallback to hardcoded data
            }
        }

        // Load on page load
    document.addEventListener('DOMContentLoaded', () => {
        loadLiveProducts();
        // Re-run animations after a longer delay to be safe
        setTimeout(reinitializeAnimations, 500);
        });
        // Force CSS animation restart
        const drinksGrid = document.querySelector('.drinks-grid');
        if (drinksGrid) {
            drinksGrid.style.animation = 'none';
            void drinksGrid.offsetWidth; // Trigger reflow
            drinksGrid.style.animation = null;
        }
    

// Modified load function with animation fix
async function loadLiveProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/menu-items');
        const items = await response.json();
        
        // Separate pastries and drinks
        const pastries = items.filter(item => item.type === 'pastry');
        const drinks = items.filter(item => item.type === 'drink');
        
        // Update signature collection tab
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = pastries.map(pastry => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${pastry.image}" alt="${pastry.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${pastry.name}</h3>
                        <p class="product-description">${pastry.description}</p>
                        <div class="product-price">${pastry.price}</div>
                    </div>
                </div>
            `).join('');
        }
        
        // Update drinks tab
        const drinksGrid = document.querySelector('.drinks-grid');
        if (drinksGrid) {
            drinksGrid.innerHTML = drinks.map(drink => `
                <div class="drink-item">
                    <div class="drink-info">
                        <h4 class="drink-name">${drink.name}</h4>
                        <p class="drink-description">${drink.description || 'Premium quality beverage'}</p>
                    </div>
                    <div class="drink-price">${drink.price}</div>
                </div>
            `).join('');
            
            // FIX: Add a small delay to ensure CSS is applied
            setTimeout(() => {
                reinitializeAnimations();
            }, 100);
        }
        
    } catch (error) {
        console.log('Using fallback data (API not available)');
        // Fallback to hardcoded data
    }
}
