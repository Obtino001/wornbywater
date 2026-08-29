(function () {
	$('.modal-iframe').fancybox({
		wrapCSS: 'modal-iframe-wrapper',
		autoSize: false,
		closeClick: false,
		openEffect: 'none',
		closeEffect: 'none',
		type: 'iframe',
		iframe: {
			preload: true,
		},
		tpl: {
			closeBtn:
				'<a href="#" class="modal-close-button modal-iframe-close-button" onclick="$.fancybox.close()"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-close" fill="none" viewBox="0 0 14 14">\n' +
				'<rect y="12.728" width="18" height="1.5" transform="rotate(-45 0 12.728)" fill="currentColor"/>\n' +
				'<rect x="1.06055" width="18" height="1.5" transform="rotate(45 1.06055 0)" fill="currentColor"/>\n' +
				'</svg></a>',
		},
	});

	function debounce(func, delay = 600) {
		let timer;
		return function() {
			clearTimeout(timer);
			timer = setTimeout(func, delay);
		};
	}

	function handleHrefUpdate(){
		const videoSections = document.querySelectorAll(".video-section");

		videoSections.forEach(section => {
			if (section.dataset.videoResize === "1") {
				const video = section.dataset.video;
				const mobileVideo = section.dataset.mobileVideo;
				const videoLink = section.querySelector(`#video-link-id-${section.dataset.sectionId}`);

				if (!videoLink || (!video && !mobileVideo)) {
					return;
				}

				let videoHref = video ? video : mobileVideo ? mobileVideo : "";
				if (window.innerWidth < 750 && mobileVideo){
					videoHref = mobileVideo;
				} else if (video) {
					videoHref = video;
				}

				videoLink.setAttribute("href", videoHref);
			}
		});
	}

	// initial state
	handleHrefUpdate();

	window.addEventListener('resize', debounce(handleHrefUpdate, 600));
	
})();
