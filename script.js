// Smooth scroll with offset for navbar links
document.addEventListener('DOMContentLoaded', function () {
	const navbar = document.querySelector('.navbar');
	const toggle = document.querySelector('.navbar__toggle');

	function setMenuOpen(open) {
		if (!navbar || !toggle) return;
		navbar.classList.toggle('navbar--open', open);
		toggle.setAttribute('aria-expanded', String(open));
		toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
		document.body.style.overflow = open ? 'hidden' : '';
	}

	if (navbar && toggle) {
		toggle.addEventListener('click', function () {
			setMenuOpen(!navbar.classList.contains('navbar--open'));
		});

		window.addEventListener('resize', function () {
			if (window.innerWidth > 900) setMenuOpen(false);
		});
	}

	document.querySelectorAll('.navbar a[href^="#"]').forEach(link => {
		link.addEventListener('click', function (e) {
			const targetId = this.getAttribute('href').slice(1);
			const target = document.getElementById(targetId);
			if (target) {
				e.preventDefault();
				const navbarHeight = navbar ? navbar.offsetHeight : 0;
				const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 8; // 8px extra spacing
				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				});
				setMenuOpen(false);
			}
		});
	});
});

