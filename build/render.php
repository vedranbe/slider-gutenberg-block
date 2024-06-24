<?php if($attributes['slides']) { ?>
<div class="hero-slider" style="min-height: <?php echo esc_attr($attributes['minHeight']); ?>px" data-slider>
<?php 
		foreach ($attributes['slides'] as $index => $slide) {
			echo '<div class="slider-cell" style="background-image:url(' . esc_attr($slide['url']) . '); background-size:cover;">';
			if(esc_attr($attributes['showOverlay'])) { echo '<div class="overlay"></div>'; }
			echo '<div class="inner">';
			if($slide['alt']) { echo '<h3 class="subtitle">' . esc_attr($slide['alt']) . '</h3>'; }
			if($slide['title']) { echo '<h2 class="title">' . esc_attr($slide['title']) . '</h2>'; }
			echo '</div>';
			echo '</div>';
		}
?>
</div>
<script>
			var options = {
				accessibility: true,
				prevNextButtons: <?php echo $attributes['arrows'] ? 'true' : 'false'; ?>,
				pageDots: <?php echo $attributes['dots'] ? 'true' : 'false'; ?>,
				autoPlay: <?php echo $attributes['autoPlay'] ? 'true' : 'false'; ?>,
				freeScroll: <?php echo $attributes['freeScroll'] ? 'true' : 'false'; ?>,
				wrapAround: <?php echo $attributes['wrapAround'] ? 'true' : 'false'; ?>,
				minHeight: <?php echo $attributes['minHeight']; ?>,
				draggable: <?php echo $attributes['draggable'] ? 'true' : 'false'; ?>,
				imagesLoaded: true,
				lazyLoad: true,
				setGallerySize: true,
				selectedAttraction: 0.01,
				friction: 0.45,
				dragThreshold: 10,
				arrowShape: {
					x0: 10,
					x1: 60,
					y1: 50,
					x2: 60,
					y2: 45,
					x3: 15
				}
			};

		var slider = document.querySelector('[data-slider]');
		var slides = document.getElementsByClassName('slider-cell');
		var flkty = new Flickity(slider, options);

		flkty.on('scroll', function () {
		flkty.slides.forEach(function (slide, i) {
			var image = slides[i];
			var x = (slide.target + flkty.x) * -1/3;
			image.style.backgroundPosition = x + 'px';
		});
		});
  
</script>
<?php } ?>
