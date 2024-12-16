const track = document.querySelector('.carousel-track');
const cursor = document.getElementById("cursor");
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const cards = document.querySelectorAll('.product-card') || {};
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

if (cards.length > 0) {
    const cardWidth = cards[0].getBoundingClientRect().width; 

// Initialize the carousel and position each card horizontally
cards.forEach((card, index) => {
    card.style.left = `${index * cardWidth}px`; 
});

// Set current index of the visible card and number of cards visible in one frame
let currentIndex = 0; 
const visibleCards = 4;

// Event for the "Previous" button
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--; // Move to the previous card index
        const amountToMove = -currentIndex * cardWidth; // Calculate movement distance
        track.style.transform = `translateX(${amountToMove}px)`; // Move the carousel
    }
});

// Event for the "Next" button
nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - visibleCards) {
        currentIndex++;
        const amountToMove = -currentIndex * cardWidth;
        track.style.transform = `translateX(${amountToMove}px)`;
    }
});

// Ensure the carousel starts with "Cakes" in view
track.style.transform = `translateX(0px)`;
}

// Theme toggle functionality
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    body.classList.add(savedTheme);
}

// Event listener for the theme toggle button
themeToggleButton.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        // If the current theme is dark, switch to light
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', '');  // Save the light theme state to localStorage
    } else {
         // If the current theme is light, switch to dark
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme'); // Save the dark theme state to localStorage
    }
});

// Follow mouse movement
document.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
});

// Zoom in when user click the mouse
document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
});

// Restore size after releasing the mouse
document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
});

document.addEventListener("DOMContentLoaded", () => {
    // Select modal elements
    const modal = document.getElementById("product-modal");
    const closeModal = document.getElementById("close-modal");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const decreaseBtn = document.getElementById("decrease-btn");
    const increaseBtn = document.getElementById("increase-btn");
    const quantityDisplay = document.getElementById("quantity");

    // Check if modal elements exist
    if (!modal || !closeModal || !modalImage || !modalTitle || !modalDescription || !decreaseBtn || !increaseBtn || !quantityDisplay) {
        console.warn("Modal elements are missing on this page. Skipping modal logic.");
        return;
    }

    let quantity = 1;

    // Product Data Array
    const products = [
        {
            title: "Caramelized Lemon Tart",
            image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=2574&auto=format&fit=crop",
            description: "Rich, buttery tart filled with smooth lemon curd and topped with fluffy, caramelized meringue. A perfect balance of tangy and sweet flavors, crafted to delight your taste buds. (Contains: Wheat, Milk, Eggs)"
        },
        {
            title: "Raspberry Chocolate Brownies",
            image: "https://images.unsplash.com/photo-1589113705163-688db004aaa9?q=80&w=3087&auto=format&fit=crop",
            description: "Rich, fudgy chocolate brownies stacked high and paired with creamy milk. Fresh raspberries and mint leaves add a burst of color and flavor, creating the ultimate indulgent treat.(Contains: Wheat, Milk, Eggs, Nuts)"
        },
        {
            title: "Chocolate Chip Cookies",
            image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=3165&auto=format&fit=crop",
            description: "Freshly baked chocolate chip cookies with a crisp edge and chewy center, packed with rich chocolate chunks. Perfect for sharing or enjoying with a warm cup of milk.(Contains: Wheat, Milk, Eggs, Soy)"
        },
        {
            title: "Artisan French Baguettes",
            image: "https://images.unsplash.com/photo-1554475659-9fd915c8f156?q=80&w=2715&auto=format&fit=crop",
            description: "Classic French baguettes with a perfectly golden, crusty exterior and a soft, airy crumb. Wrapped in rustic twine, these artisanal loaves are ideal for sandwiches, soups, or simply with butter.(Contains: Wheat)"
        },
        {
            title: "Golden Butter Croissants",
            image: "https://images.unsplash.com/photo-1529978215771-45f0bcc12de3?q=80&w=3115&auto=format&fit=crop",
            description: "Golden, flaky croissants baked to perfection with a crisp exterior and soft, buttery layers inside. A classic French pastry, ideal for breakfast or pairing with your favorite coffee. (Contains: Wheat, Milk, Eggs)"
        }
    ];

    // Add event listeners to product cards
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card, index) => {
        card.addEventListener("click", (e) => {
            // Ignore clicks in the rating-container
            if (e.target.closest(".rating-container")) {
                return; // Exit the function if clicked on rating area
            }

            // Populate modal content
            const product = products[index];
            modalImage.src = product.image;
            modalTitle.textContent = product.title;
            modalDescription.textContent = product.description;

            quantity = 1;
            quantityDisplay.textContent = quantity;

            modal.classList.remove("hidden");
        });
    });

    // Close modal when close button is clicked
    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Quantity control
    decreaseBtn.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });

    increaseBtn.addEventListener("click", () => {
        quantity++;
        quantityDisplay.textContent = quantity;
    });

    // Close modal when clicking outside modal content
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });

    // Rating system
    const ratingContainers = document.querySelectorAll('.rating-container');

    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        const ratingResult = container.querySelector('.rating-result');
        let selectedRating = 0;

        stars.forEach((star, index) => {
            // Mouseover event: Highlights all stars up to the hovered star
            star.addEventListener('mouseover', (e) => {
                e.stopPropagation(); // Stop bubbling to prevent modal trigger
            // When the user hovers over a star, all stars up to (and including) the hovered star are highlighted.
            // This gives users immediate visual feedback about the rating they are about to select.
                stars.forEach((s, i) => {
                    s.style.color = i <= index ? '#FFD700' : '#ddd';
                });
            });

            // Mouseout event: Resets the stars' appearance to match the selected rating
            star.addEventListener('mouseout', (e) => {
                e.stopPropagation(); // Stop bubbling
            // When the mouse leaves a star, the stars reset to reflect the current selected rating 
            // (or none, if no rating is selected).
            // This ensures the stars' appearance always matches the user's confirmed selection.
                stars.forEach((s, i) => {
                    s.style.color = i < selectedRating ? '#FFD700' : '#ddd';
                });
            });

            // Click event: Saves the selected rating and updates the display
            star.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop bubbling
                selectedRating = index + 1;
                stars.forEach((s, i) => {
                    s.style.color = i < selectedRating ? '#FFD700' : '#ddd';
                });
                ratingResult.textContent = `Rating: ${selectedRating}`;
            });
        });
    });
});
