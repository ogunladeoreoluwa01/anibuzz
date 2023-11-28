/** @format */

// Get the current page URL
const currentPageUrl = window.location.href;

// Get all the navigation links
const navLinks = document.querySelectorAll(".navlink");

// Check each link and add the 'active' class if the href matches the current page URL
navLinks.forEach((link) => {
	if (link.href === currentPageUrl) {
		link.classList.add("active");
	}
});
