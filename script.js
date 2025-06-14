document.addEventListener('DOMContentLoaded', function() {
    // Get all search containers
    const searchContainers = document.querySelectorAll('.search-container');
    
    // Add event listeners to each search container
    searchContainers.forEach(container => {
        const input = container.querySelector('input');
        const dropdown = container.querySelector('.dropdown');
        const button = container.querySelector('button');
        
        // Toggle dropdown when input is clicked
        input.addEventListener('click', function() {
            // Close all other dropdowns first
            document.querySelectorAll('.dropdown').forEach(dd => {
                if (dd !== dropdown) {
                    dd.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!container.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
        
        // Handle dropdown option selection
        dropdown.querySelectorAll('.dropdown-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                input.value = this.textContent;
                dropdown.classList.remove('active');
                
                // Open link in new tab
                window.open(this.href, '_parent');
            });
        });
        
        // Handle button click
        button.addEventListener('click', function() {
            if (input.value) {
                // Find the matching option and open its link
                const options = dropdown.querySelectorAll('.dropdown-option');
                for (let option of options) {
                    if (option.textContent === input.value) {
                        window.open(option.href, '_parent');
                        break;
                    }
                }
            }
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const overviewButtons = document.querySelectorAll('.overview-btn');
    const popupOverlays = document.querySelectorAll('.popup-overlay');
    const closeButtons = document.querySelectorAll('.close-btn');
    
    // Open popup function
    function openPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            // Close any open popups first
            closeAllPopups();
            
            // Show the selected popup
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close popup function
    function closePopup(popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Close all popups
    function closeAllPopups() {
        popupOverlays.forEach(popup => {
            closePopup(popup);
        });
    }
    
    // Add event listeners to overview buttons
    overviewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const popupId = this.getAttribute('data-popover');
            openPopup(popupId);
        });
    });
    
    // Add event listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const popup = this.closest('.popup-overlay');
            closePopup(popup);
        });
    });
    
    // Close popup when clicking on overlay
    popupOverlays.forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup(this);
            }
        });
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    });
});