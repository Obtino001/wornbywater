(function () {
	const header = () => {
		const body = document.querySelector("body");
		const openBtn = document.querySelector(".header__offcanvas-toggle");
		const closeBtn = document.querySelector(
			".header__offcanvas-toggle-link--close",
		);
		const offMenu = document.querySelector(".header__offcanvas-menu");
		const searchDetails = document.querySelector(".header__details");
		const openSearchBtn = document.querySelector(".header__search");
		const searchModal = document.querySelector(".search-modal");
		const submenuDetails = document.querySelectorAll(
			".header__submenu li details",
		);

		const openMenu = (e) => {
			e.preventDefault();
			offMenu.classList.add("header__offcanvas-menu--open");
			openBtn.classList.add("active");
			body.classList.add("body--hidden");
		};

		const closeMenu = () => {
			offMenu.classList.remove("header__offcanvas-menu--open");
			openBtn.classList.remove("active");
			body.classList.remove("body--hidden");
		};

		openBtn.addEventListener("click", openMenu);
		closeBtn.addEventListener("click", closeMenu);

		openSearchBtn.addEventListener("click", (e) => {
			if (searchDetails.open) {
				body.classList.add("body--hidden");
				setTimeout(() => {
					searchModal.classList.add("search-modal--overflow");
				}, 1000);
			} else {
				body.classList.remove("body--hidden");
				searchModal.classList.remove("search-modal--overflow");
			}
		});

		submenuDetails.forEach((targetDetail) => {
			targetDetail.addEventListener("click", () => {
				submenuDetails.forEach((detail) => {
					if (detail !== targetDetail) {
						detail.removeAttribute("open");
					}
				});
			});
		});

		document.addEventListener("keyup", (e) => {
			if (e.key === "Escape") {
				closeMenu();
				searchDetails.removeAttribute("open");
			}
		});

		// Mega menu tabs
		let hideMenuTimeout;
		const header = document.querySelector('.shopify-section-header');
		const menuLinks = document.querySelectorAll('.list-menu-item');
		const megaMenus = document.querySelectorAll('.mega-menu');
		const dir = $('html').attr('dir');

		const heightHeader = header.getBoundingClientRect().height;
		document.documentElement.style.setProperty(
			'--header-height',
			`${heightHeader}px`,
		)
		menuLinks.forEach((link) => {
			link.addEventListener('click', (e) => {
				clearTimeout(hideMenuTimeout);

				if (link.classList.contains('list-menu--megamenu') && !link.classList.contains('list-menu--megamenu-visible')) {
					link.classList.add('list-menu--megamenu-visible');

					if (!megaMenus) return;

					megaMenus.forEach((megaMenu) => {
						const headerMain = header.querySelector('.header');

						if (!megaMenu.classList.contains("mega-menu--tabs")) return;

						const calcPosition = () => {
							if (dir !== 'rtl') {
								megaMenu.style.right = 'auto';
								megaMenu.style.left = 'unset';
							} else {
								megaMenu.style.right = 'unset';
								megaMenu.style.left = 'auto';
							}


							const megaMenuRight = megaMenu.getBoundingClientRect().right;
							const headerRight = headerMain.getBoundingClientRect().right;

							if (megaMenuRight > headerRight) {
								if (dir !== 'rtl') {
									megaMenu.style.right = '2rem';
									megaMenu.style.left = 'unset';
								} else {
									megaMenu.style.right = 'unset';
									megaMenu.style.left = '2rem';
								}
							}
						}

						calcPosition();
						let headerMainWidth = headerMain.offsetWidth;

						const resizeObserver = new ResizeObserver((entries) => {
							for (const entry of entries) {
								const newWidth = entry.contentRect.width;

								if (newWidth !== headerMainWidth) {
									headerMainWidth = newWidth;
									calcPosition();
								}
							}
						})

						resizeObserver.observe(headerMain);
					})

					menuLinks.forEach((el) => {
						if (el !== link) {
							el.classList.remove('list-menu--megamenu-visible');
						}
					})
				}
			})
		});

		const megaMenuTabs = () => {
			$('.mega-menu__tab-wrapper')
				.children()
				.find('.mega-menu__tab-wrapper')
				.first()
				.addClass('mega-menu__tab-wrapper--active');
			$('.mega-menu__tab-wrapper').on('mouseenter', function (ev) {
				const menuListItem = ev.target.closest('.mega-menu__tab-list-item');
				if (menuListItem) return;

				ev.preventDefault();
				ev.stopPropagation();
				const megaMenuTabs = $(ev.target).closest('.mega-menu__tabs');
				if (megaMenuTabs) {
					$(megaMenuTabs).find('.mega-menu__tab-wrapper').removeClass('mega-menu__tab-wrapper--active');
				}
				$(this).addClass('mega-menu__tab-wrapper--active');
			});
		}
		megaMenuTabs();

		// Mega menu tabs Mobile
		const tabHeadings = document.querySelectorAll('.mega-menu__tab-heading');

		function setupMobileMenu() {
			const isMobile = window.innerWidth <= 1100;

			tabHeadings.forEach(heading => {
				heading.replaceWith(heading.cloneNode(true));
			});

			const refreshedHeadings = document.querySelectorAll('.mega-menu__tab-heading');

			if (!refreshedHeadings) return;

			refreshedHeadings.forEach(heading => {
				const tabList = heading.parentElement.querySelector('.mega-menu__tab-list');

				if (!tabList) return;

				if (isMobile) {
					heading.addEventListener('click', () => {
						tabList.classList.toggle('hidden');
					});
				} else {
					tabList.classList.remove('hidden');
				}
			});
		}

		setupMobileMenu();
		window.addEventListener('resize', setupMobileMenu);
	};

	document.addEventListener("shopify:section:load", header);

	header();
})();
