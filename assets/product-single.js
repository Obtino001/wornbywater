if (typeof initProductSlider_G === "undefined") {
	let initProductSlider_G = null;
}

(function () {
	const initProductAccordion = () => {
		$(".product__additional").click(function () {
			if (!$(this).hasClass("active")) {
				$(".product__additional.active").removeClass("active");
				$(this).addClass("active");
				$(".product__additional-description")
					.hide()
					.eq($(this).index())
					.slideDown(300);
			} else {
				$(this).removeClass("active");
				$(".product__additional-description")
					.eq($(this).index())
					.slideToggle(300);
			}
		});
	};
	
	const initProductSlider = () => {
		document.querySelectorAll(".product-section .product__media-list").forEach((elem) => {
			var slider = new Flickity(elem, {
				pageDots: false,
				prevNextButtons: false,
				adaptiveHeight: true,
				wrapAround: true,
				imagesLoaded: true,
				on: {
					select: function (index) {
						let slides = document.querySelectorAll(".product-section .product__media-list .product__media-item");
	
						var iframe = slides[index]?.querySelector("iframe");
	
						var allIframes = document.querySelectorAll(".product-section .product__media-list iframe");

						var video = slides[index]?.querySelector("video");
						var allVideos = document.querySelectorAll(".product-section .product__media-list video");
	
						if (video && video.length > 0) {
							video.play().catch(error => {
								console.error("Video error:", error);
						});
						} else if (allVideos.length > 0) {
							allVideos.forEach((v) => v.pause());
						}
	
						if (iframe && iframe.length > 0) {
							if (iframe[0].classList.contains('js-youtube')) {
								iframe[0].contentWindow.postMessage(
									JSON.stringify({ event: "command", func: "playVideo" }),
									"*",
								);
							}
							else {
								iframe[0].contentWindow.postMessage('{"method":"play"}', "*");
							}
						} else if (allIframes && allIframes.length > 0) {
							allIframes.forEach(video => {
								if (video.classList.contains('js-youtube')) {
									video.contentWindow.postMessage(
										JSON.stringify({ event: "command", func: "pauseVideo" }),
										"*",
									);
								}
								else {
									video.contentWindow.postMessage('{"method":"pause"}', "*");
								}
							})
						} else {
							return false;
						}
					},
					ready: () => {
						const flickitySlider = elem?.querySelector(".flickity-slider");
						if (flickitySlider) {
							setTimeout(() => {
								flickitySlider.style.transform = 'translateX(0%)'
							}, 100);
						}
					}
				},
			});

			elem.parentElement.querySelector('.product-section .product__media-list-wrapper-outer-arrow_prev')?.addEventListener( 'click', function() {
				slider.previous();
			});
			elem.parentElement.querySelector('.product-section .product__media-list-wrapper-outer-arrow_next')?.addEventListener( 'click', function() {
				slider.next();
			});
		});

		document.querySelectorAll(".product-section .product__media-sublist").forEach((elem, index) => {
			var slider = new Flickity(elem, {
				asNavFor: document.querySelectorAll(".product-section .product__media-list")[index],
				contain: true,
				pageDots: false,
				prevNextButtons: false,
				cellAlign: "left",
			})
		});
	}

	initProductSlider_G = initProductSlider;

	document.addEventListener("shopify:section:load", function () {
		if (Shopify.designMode) {
			initProductSlider();
			initProductAccordion();
			initModal("fancy-container-info");
		}
	});

	initProductSlider();
	initModal("fancy-container-info");
	initProductAccordion();
})();
