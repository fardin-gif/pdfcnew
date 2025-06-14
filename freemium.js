document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('chapterSearch');
    const cards = document.querySelectorAll('.feather-card');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        cards.forEach(card => {
            const chapterName = card.getAttribute('data-chapter').toLowerCase();
            
            if (searchTerm === '' || chapterName.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});







document.addEventListener('DOMContentLoaded', function() {
    // Variables to track selected items and total amount
    let selectedItems = [];
    let totalAmount = 0;
    const payNowButton = document.querySelector('.custom-button');
    const cardsContainer = document.getElementById('cardsContainer');
    const paymentPopup = document.getElementById('paymentPopup');
    const closePopup = document.querySelector('.close-popup');
    const selectedItemsContainer = document.getElementById('selectedItems');
    const popupTotalAmount = document.getElementById('popupTotalAmount');

    // Function to update the Pay Now button
    function updatePayNowButton() {
        const buttonText = payNowButton.querySelector('.button-text');
        buttonText.textContent = `PAY NOW (${totalAmount}/=)`;
    }

    // Function to handle card clicks
    function handleCardClick(event) {
        const addButton = event.target.closest('.add-btn');
        if (!addButton) return;

        const card = addButton.closest('.feather-card');
        const chapterElement = card.querySelector('.chapter-name');
        // Get clean chapter name without the badge
        const chapterName = chapterElement.childNodes[0].textContent.trim();
        const badgeElement = card.querySelector('.yt-badge, .live-badge, .archive-badge');
        const badge = badgeElement ? badgeElement.textContent : '';
        const subject = card.querySelector('.subject').textContent;
        const priceText = card.querySelector('.original-price').textContent;
        const price = parseInt(priceText);

        // Toggle selection
        if (addButton.classList.contains('added')) {
            // Remove item
            addButton.classList.remove('added');
            totalAmount -= price;
            selectedItems = selectedItems.filter(item => item.id !== card.dataset.chapter);
        } else {
            // Add item
            addButton.classList.add('added');
            totalAmount += price;
            selectedItems.push({
                id: card.dataset.chapter,
                name: chapterName,
                badge: badge,
                subject: subject,
                price: price
            });
        }

        updatePayNowButton();
    }

    // Function to show payment popup
    function showPaymentPopup() {
        if (selectedItems.length === 0) {
            alert('Please add at least one item before payment.');
            return;
        }

        // Update selected items list in popup
        selectedItemsContainer.innerHTML = '';
        selectedItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'selected-item';
            itemElement.textContent = `${item.name} (${item.badge}) - ${item.price}/=`;
            selectedItemsContainer.appendChild(itemElement);
        });

        // Update total amount in popup
        popupTotalAmount.textContent = `${totalAmount}/=`;

        // Show popup
        paymentPopup.style.display = 'flex';
    }

    // Function to close payment popup
    function closePaymentPopup() {
        paymentPopup.style.display = 'none';
    }

    // Event listeners
    cardsContainer.addEventListener('click', handleCardClick);
    payNowButton.addEventListener('click', showPaymentPopup);
    payNowButton.querySelector('.button-highlight').addEventListener('click', showPaymentPopup);
    closePopup.addEventListener('click', closePaymentPopup);

    // Close popup when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === paymentPopup) {
            closePaymentPopup();
        }
    });

    // Search functionality
    const chapterSearch = document.getElementById('chapterSearch');
    chapterSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const cards = document.querySelectorAll('.feather-card');

        cards.forEach(card => {
            const chapterText = card.dataset.chapter.toLowerCase();
            if (chapterText.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});