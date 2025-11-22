document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. TOUR FILTERING LOGIC (For tours.html page)
    // ----------------------------------------------------------------------
    const tourResults = document.querySelector('.tour-results');
    const filterInputs = document.querySelectorAll('.sidebar input[type="checkbox"], .sidebar input[type="radio"]');
    const applyFiltersButton = document.querySelector('.apply-filters');

    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', applyTourFilters);
    }

    function applyTourFilters() {
        // Get all selected filters
        const selectedRegions = Array.from(document.querySelectorAll('input[name="region"]:checked')).map(input => input.value);
        const selectedStyles = Array.from(document.querySelectorAll('input[name="style"]:checked')).map(input => input.value);
        const selectedDuration = document.querySelector('input[name="duration"]:checked')?.value;
        
        const tourCards = document.querySelectorAll('.tour-card');

        tourCards.forEach(card => {
            const cardRegion = card.getAttribute('data-region');
            const cardStyle = card.getAttribute('data-style');
            // Assuming duration filtering is complex, we skip it for basic JS
            
            let passesRegionFilter = selectedRegions.length === 0 || selectedRegions.includes(cardRegion);
            let passesStyleFilter = selectedStyles.length === 0 || selectedStyles.includes(cardStyle);

            // Show the card only if it passes ALL active filters
            if (passesRegionFilter && passesStyleFilter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Optional: Show a message if no tours are found
        const visibleCards = Array.from(tourCards).filter(card => card.style.display === 'block').length;
        if (visibleCards === 0) {
             // In a real site, you'd insert a "No results found" message here
             console.log("No tours match the current filters.");
        }
    }


    // ----------------------------------------------------------------------
    // 2. BOOKING FORM VALIDATION (For tour-details.html page)
    // ----------------------------------------------------------------------
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmission);
    }

    function handleBookingSubmission(event) {
        event.preventDefault(); // Stop the default form submission
        
        const dateInput = document.getElementById('date');
        const peopleInput = document.getElementById('people');
        const emailInput = document.getElementById('email');
        
        let isValid = true;
        
        // Basic validation checks
        if (!dateInput.value) {
            alert('Please select a departure date.');
            dateInput.focus();
            isValid = false;
        } else if (parseInt(peopleInput.value) < 1) {
            alert('Number of travelers must be at least 1.');
            peopleInput.focus();
            isValid = false;
        } else if (!emailInput.value || !validateEmail(emailInput.value)) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission to a server
            console.log("Booking data collected:", {
                date: dateInput.value,
                people: peopleInput.value,
                email: emailInput.value
            });
            // Display success message
            alert('Thank you! Your reservation request has been submitted. Hanaq Tours will contact you shortly.');
            bookingForm.reset();
        }
    }

    // Helper function for email validation
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // ----------------------------------------------------------------------
    // 3. ITINERARY ACCORDION (For tour-details.html page)
    // ----------------------------------------------------------------------
    // The CSS handles the basic accordion functionality using checkboxes.
    // No extra JS is needed unless you want complex animations or open/close all buttons.
});
