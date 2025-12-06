<<<<<<< HEAD
// MAIN JAVASCRIPT FOR ALL PAGES
document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ GLAZEWORKS FINAL REFINEMENT LOADED ✨');
    
    // 1. BACKGROUND EFFECTS
    const glowEffects = document.createElement('div');
    glowEffects.className = 'glow-effects';
    document.body.appendChild(glowEffects);
    
    for (let i = 1; i <= 2; i++) {
        const orb = document.createElement('div');
        orb.className = `glow-orb glow-${i}`;
        glowEffects.appendChild(orb);
    }
    
    // 2. CURSOR HALO
    const cursorHalo = document.createElement('div');
    cursorHalo.className = 'cursor-halo';
    document.body.appendChild(cursorHalo);
    
    let mouseX = 0;
    let mouseY = 0;
    let haloVisible = false;
    
    function updateCursor() {
        requestAnimationFrame(updateCursor);
        if (haloVisible) {
            cursorHalo.style.left = mouseX + 'px';
            cursorHalo.style.top = mouseY + 'px';
            cursorHalo.classList.add('active');
        }
    }
    
    updateCursor();
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        haloVisible = true;
    });
    
    document.addEventListener('mouseleave', () => {
        haloVisible = false;
        cursorHalo.classList.remove('active');
    });
    
    document.addEventListener('mouseenter', () => {
        haloVisible = true;
    });
    
    // 3. HORIZONTAL SCROLL FOR SIGNATURE COLLECTION - MANUAL ONLY
    const scrollContainer = document.querySelector('.horizontal-scroll');
    const scrollItems = document.querySelectorAll('.scroll-item');
    const leftArrow = document.querySelector('.scroll-arrow.left');
    const rightArrow = document.querySelector('.scroll-arrow.right');
    
    if (scrollContainer && scrollItems.length > 0) {
        // Set middle item as active initially
        const middleIndex = Math.floor(scrollItems.length / 2);
        scrollItems[middleIndex].classList.add('active');
        
        // Auto scroll to middle
        setTimeout(() => {
            const middleItem = scrollItems[middleIndex];
            const containerRect = scrollContainer.getBoundingClientRect();
            const itemRect = middleItem.getBoundingClientRect();
            const scrollLeft = middleItem.offsetLeft - (containerRect.width / 2) + (itemRect.width / 2);
            scrollContainer.scrollLeft = scrollLeft;
        }, 100);
        
        // Arrow navigation
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                scrollContainer.scrollBy({
                    left: -320,
                    behavior: 'smooth'
                });
            });
        }
        
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                scrollContainer.scrollBy({
                    left: 320,
                    behavior: 'smooth'
                });
            });
        }
        
        // Update active item on scroll
        scrollContainer.addEventListener('scroll', () => {
            const containerRect = scrollContainer.getBoundingClientRect();
            const containerCenter = containerRect.left + (containerRect.width / 2);
            
            let closestItem = null;
            let closestDistance = Infinity;
            
            scrollItems.forEach(item => {
                item.classList.remove('active');
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.left + (itemRect.width / 2);
                const distance = Math.abs(containerCenter - itemCenter);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestItem = item;
                }
            });
            
            if (closestItem && closestDistance < 200) {
                closestItem.classList.add('active');
            }
        });
        
        // Touch/swipe support
        let isDown = false;
        let startX;
        let scrollLeft;
        
        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });
        
        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    }
    
    // 4. COFFEE & TEA - NO AUTO SCROLL AT ALL
    const menuItems = document.querySelectorAll('.menu-item');
    const scrollableMenu = document.querySelector('.scrollable-menu');
    
    if (scrollableMenu && menuItems.length > 0) {
        // Set first item as active
        menuItems[0].classList.add('active');
        
        // Manual hover only - NO AUTO SCROLL
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Remove active from all items
                menuItems.forEach(i => i.classList.remove('active'));
                // Add active to hovered item
                item.classList.add('active');
            });
            
            item.addEventListener('click', () => {
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }
    
    // 5. HOVER EFFECTS
    function setupHoverEffects() {
        // Primary button
        const primaryButton = document.querySelector('.glass-button-primary');
        if (primaryButton) {
            primaryButton.addEventListener('mouseenter', () => {
                cursorHalo.classList.add('hovering');
                primaryButton.style.transform = 'translateY(-15px) scale(1.05)';
            });
            
            primaryButton.addEventListener('mouseleave', () => {
                cursorHalo.classList.remove('hovering');
                primaryButton.style.transform = 'translateY(-10px) scale(1)';
            });
        }
        
        // Regular buttons
        const buttons = document.querySelectorAll('.glass-button, .header-btn, .contact-btn, .order-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                cursorHalo.classList.add('hovering');
            });
            
            btn.addEventListener('mouseleave', () => {
                cursorHalo.classList.remove('hovering');
            });
        });
        
        // Scroll items
        if (scrollItems) {
            scrollItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    cursorHalo.classList.add('hovering');
                });
                
                item.addEventListener('mouseleave', () => {
                    cursorHalo.classList.remove('hovering');
                });
            });
        }
        
        // Menu items
        if (menuItems) {
            menuItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    cursorHalo.classList.add('hovering');
                });
                
                item.addEventListener('mouseleave', () => {
                    cursorHalo.classList.remove('hovering');
                });
            });
        }
        
        // Nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorHalo.classList.add('hovering');
            });
            
            link.addEventListener('mouseleave', () => {
                cursorHalo.classList.remove('hovering');
            });
        });
    }
    
    // 6. BUTTON CLICK EFFECTS
    const buttons = document.querySelectorAll('.glass-button, .header-btn, .contact-btn, .order-btn, .tab-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255, 176, 157, 0.4) 0%, transparent 70%);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // 7. INITIALIZE
    setTimeout(() => {
        setupHoverEffects();
        
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            console.log('✅ ALL FINAL FIXES APPLIED ✅');
        }, 300);
    }, 500);
=======
// MAIN JAVASCRIPT FOR ALL PAGES
document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ GLAZEWORKS FINAL REFINEMENT LOADED ✨');
    
    // 1. BACKGROUND EFFECTS
    const glowEffects = document.createElement('div');
    glowEffects.className = 'glow-effects';
    document.body.appendChild(glowEffects);
    
    for (let i = 1; i <= 2; i++) {
        const orb = document.createElement('div');
        orb.className = `glow-orb glow-${i}`;
        glowEffects.appendChild(orb);
    }
    
    // 2. CURSOR HALO
    const cursorHalo = document.createElement('div');
    cursorHalo.className = 'cursor-halo';
    document.body.appendChild(cursorHalo);
    
    let mouseX = 0;
    let mouseY = 0;
    let haloVisible = false;
    
    function updateCursor() {
        requestAnimationFrame(updateCursor);
        if (haloVisible) {
            cursorHalo.style.left = mouseX + 'px';
            cursorHalo.style.top = mouseY + 'px';
            cursorHalo.classList.add('active');
        }
    }
    
    updateCursor();
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        haloVisible = true;
    });
    
    document.addEventListener('mouseleave', () => {
        haloVisible = false;
        cursorHalo.classList.remove('active');
    });
    
    document.addEventListener('mouseenter', () => {
        haloVisible = true;
    });
    
    // 3. HORIZONTAL SCROLL FOR SIGNATURE COLLECTION - MANUAL ONLY
    const scrollContainer = document.querySelector('.horizontal-scroll');
    const scrollItems = document.querySelectorAll('.scroll-item');
    const leftArrow = document.querySelector('.scroll-arrow.left');
    const rightArrow = document.querySelector('.scroll-arrow.right');
    
    if (scrollContainer && scrollItems.length > 0) {
        // Set middle item as active initially
        const middleIndex = Math.floor(scrollItems.length / 2);
        scrollItems[middleIndex].classList.add('active');
        
        // Auto scroll to middle
        setTimeout(() => {
            const middleItem = scrollItems[middleIndex];
            const containerRect = scrollContainer.getBoundingClientRect();
            const itemRect = middleItem.getBoundingClientRect();
            const scrollLeft = middleItem.offsetLeft - (containerRect.width / 2) + (itemRect.width / 2);
            scrollContainer.scrollLeft = scrollLeft;
        }, 100);
        
        // Arrow navigation
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                scrollContainer.scrollBy({
                    left: -320,
                    behavior: 'smooth'
                });
            });
        }
        
        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                scrollContainer.scrollBy({
                    left: 320,
                    behavior: 'smooth'
                });
            });
        }
        
        // Update active item on scroll
        scrollContainer.addEventListener('scroll', () => {
            const containerRect = scrollContainer.getBoundingClientRect();
            const containerCenter = containerRect.left + (containerRect.width / 2);
            
            let closestItem = null;
            let closestDistance = Infinity;
            
            scrollItems.forEach(item => {
                item.classList.remove('active');
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.left + (itemRect.width / 2);
                const distance = Math.abs(containerCenter - itemCenter);
                
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestItem = item;
                }
            });
            
            if (closestItem && closestDistance < 200) {
                closestItem.classList.add('active');
            }
        });
        
        // Touch/swipe support
        let isDown = false;
        let startX;
        let scrollLeft;
        
        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });
        
        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    }
    
    // 4. COFFEE & TEA - NO AUTO SCROLL AT ALL
    const menuItems = document.querySelectorAll('.menu-item');
    const scrollableMenu = document.querySelector('.scrollable-menu');
    
    if (scrollableMenu && menuItems.length > 0) {
        // Set first item as active
        menuItems[0].classList.add('active');
        
        // Manual hover only - NO AUTO SCROLL
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Remove active from all items
                menuItems.forEach(i => i.classList.remove('active'));
                // Add active to hovered item
                item.classList.add('active');
            });
            
            item.addEventListener('click', () => {
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }
    
    // 5. HOVER EFFECTS
    function setupHoverEffects() {
        // Primary button
        const primaryButton = document.querySelector('.glass-button-primary');
        if (primaryButton) {
            primaryButton.addEventListener('mouseenter', () => {
                cursorHalo.classList.add('hovering');
                primaryButton.style.transform = 'translateY(-15px) scale(1.05)';
            });
            
            primaryButton.addEventListener('mouseleave', () => {
                cursorHalo.classList.remove('hovering');
                primaryButton.style.transform = 'translateY(-10px) scale(1)';
            });
        }
        
        // Regular buttons
        const buttons = document.querySelectorAll('.glass-button, .header-btn, .contact-btn, .order-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                cursorHalo.classList.add('hovering');
            });
            
            btn.addEventListener('mouseleave', () => {
                cursorHalo.classList.remove('hovering');
            });
        });
        
        // Scroll items
        if (scrollItems) {
            scrollItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    cursorHalo.classList.add('hovering');
                });
                
                item.addEventListener('mouseleave', () => {
                    cursorHalo.classList.remove('hovering');
                });
            });
        }
        
        // Menu items
        if (menuItems) {
            menuItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    cursorHalo.classList.add('hovering');
                });
                
                item.addEventListener('mouseleave', () => {
                    cursorHalo.classList.remove('hovering');
                });
            });
        }
        
        // Nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursorHalo.classList.add('hovering');
            });
            
            link.addEventListener('mouseleave', () => {
                cursorHalo.classList.remove('hovering');
            });
        });
    }
    
    // 6. BUTTON CLICK EFFECTS
    const buttons = document.querySelectorAll('.glass-button, .header-btn, .contact-btn, .order-btn, .tab-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255, 176, 157, 0.4) 0%, transparent 70%);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // 7. INITIALIZE
    setTimeout(() => {
        setupHoverEffects();
        
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            console.log('✅ ALL FINAL FIXES APPLIED ✅');
        }, 300);
    }, 500);
>>>>>>> 234afc3f3b8bf8ba9181b971a46c446adb3cdf5d
});