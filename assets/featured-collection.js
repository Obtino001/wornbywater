(function () {
	let featuredCollectionSlide = () => {
		let carousel = $(".collection-product-list").flickity({
			autoPlay: false,
			pageDots: false,
			draggable: true,
			prevNextButtons: false,
			cellAlign: "left",
			groupCells: true,
			friction: 1,
			selectedAttraction: 0.08,
		});

		const dir = $('html').attr('dir')

		let nextEl = '.collection-product-list__button--next';
		let prevEl = '.collection-product-list__button--prev';
		if (dir === 'rtl') {
			[nextEl, prevEl] = [prevEl, nextEl];
		}

		$(nextEl).click(function () {
			carousel.flickity("next");
			$(this).prop('disabled', true);
			$(prevEl).removeAttr("disabled");
		});

		$(prevEl).click(function () {
			carousel.flickity("previous");
			$(this).prop('disabled', true);
			$(nextEl).removeAttr("disabled");
		});
	};

	const calcHeight = () => {
		const card = document.querySelector(".featured-collection-section__card");
		const featuredcollectionSections = document.querySelectorAll(
			".featured-collection-section",
		);
		const cardRect = card.getBoundingClientRect();
		const cardHeight = cardRect.height;
		featuredcollectionSections.forEach((section) => {
			section.style.paddingBottom = `${cardHeight / 2}px`;
		});
	};

	document.addEventListener("shopify:section:load", function () {
		featuredCollectionSlide();
		calcHeight();
	});

	window.addEventListener("load", () => {
		featuredCollectionSlide();
	});

	calcHeight();
})();
