document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    // Gather form data
    const formData = new FormData(this);

    // Show an alert to the user
    alert('Your message has been sent!');

    // Clear the form fields
    this.reset();
});
