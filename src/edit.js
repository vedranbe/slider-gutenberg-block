import { __ } from '@wordpress/i18n';
import { InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, PanelRow, CheckboxControl, RangeControl, Button } from "@wordpress/components";
import { useBlockProps } from '@wordpress/block-editor';

import './flickity.scss';
import './style.scss';
import './editor.scss';


export default function Edit(props) {

	const { attributes, setAttributes } = props;

	const zeroSlide = attributes.slides.length === 0;
	const shouldShowOverlay = attributes.showOverlay;
	const sampleImage = 'https://picsum.photos/1920/1080';

	const sliderItems = (
		<div
			className="slider-cell"
			style={{
				minHeight: attributes.minHeight,
				backgroundImage: zeroSlide ? `url(${sampleImage})` : `url(${attributes.slides[0].url})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			{shouldShowOverlay && <div className="overlay"></div>}
			<div className="inner">
				<h3 className="subtitle">Subtitle</h3>
				<h2 className="title">Title</h2>
			</div>
		</div>
	);


	const sliderArrows =
		attributes.arrows && attributes.slides.length > 1 ? (
			<div>
				<button class="flickity-prev-next-button previous" type="button" disabled="" aria-label="previous"><svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 60,95 L 15,50  L 60,5 L 60,0 Z" class="arrow"></path></svg></button>
				<button class="flickity-prev-next-button next" type="button" aria-label="next"><svg viewBox="0 0 100 100"><path d="M 10,50 L 60,100 L 60,95 L 15,50  L 60,5 L 60,0 Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>
			</div>
		) : null;

	const sliderDots =
		attributes.dots ? (
			<ol class="flickity-page-dots">
				{attributes.slides.map((slide, index) => {
					const isActive = index === 0;
					return (
						<li key={index} className={isActive ? 'dot is-selected' : 'dot'}>{index + 1}</li>
					);
				})}
			</ol>
		) : null;

	const sliderContainerStyle = {};
	if (attributes.slides.length > 0) {
		sliderContainerStyle.background = 'none';
	}

	return (
		<div {...useBlockProps()}>

			<InspectorControls key="inspector">
				<PanelBody title={__('Slider Images', 'andiro')} initialOpen={true}>
					<MediaUpload
						help={__('Add Images', 'andiro')}
						multiple={true}
						value={attributes.slides.map((slide) => slide.id)}
						onSelect={(newSlides) => {
							setAttributes({
								slides: newSlides.map((slide) => ({
									id: slide.id,
									url: slide.url,
									title: slide.title,
									alt: slide.alt,
									description: slide.description,
								})),
							});
						}}
						render={({ open }) => (
							<>
								<Button onClick={open} isPrimary={true}>
									{__('Choose', 'andiro')}
								</Button>
								<p></p>
								<p>{__('Select (Hold Ctrl for Multiple)', 'andiro')}. {__('Enter Alt Text and/or Title in order to add text to the slide.', 'andiro')} </p>
								{!zeroSlide && (
									<p>{__('You have chosen', 'andiro')} {attributes.slides.length} {__('so far', 'andiro')}.</p>
								)}
							</>
						)}
					/>
					<CheckboxControl
						label={__('Show Overlay', 'andiro')}
						checked={attributes.showOverlay}
						onChange={(value) => setAttributes({ showOverlay: value })}
					/>
				</PanelBody>
				<PanelBody title={__('Slider Settings', 'andiro')} initialOpen={true}>
					<CheckboxControl
						label={__('Show Dots', 'andiro')}
						checked={attributes.dots}
						onChange={(value) => setAttributes({ dots: value })}
					/>
					<CheckboxControl
						label={__('Show Arrows', 'andiro')}
						checked={attributes.arrows}
						onChange={(value) => setAttributes({ arrows: value })}
					/>
					<CheckboxControl
						label={__('Draggable', 'andiro')}
						checked={attributes.draggable}
						onChange={(value) => setAttributes({ draggable: value })}
					/>
					{attributes.draggable && (<CheckboxControl
						label={__('Free Scroll', 'andiro')}
						checked={attributes.freeScroll}
						onChange={(value) => setAttributes({ freeScroll: value })}
					/>
					)}
					<CheckboxControl
						label={__('Wrap Around', 'andiro')}
						checked={attributes.wrapAround}
						onChange={(value) => setAttributes({ wrapAround: value })}
					/>
					<CheckboxControl
						label={__('Auto Play', 'andiro')}
						checked={attributes.autoPlay}
						onChange={(value) => {
							setAttributes({ autoPlay: value });
							if (value) {
								setAttributes({ adaptiveHeight: false });
							}
						}}
					/>

					<RangeControl
						label={__('Minimum Slider Height', 'andiro')}
						min={300}
						max={1500}
						step={0}
						value={attributes.minHeight}
						onChange={(value) => setAttributes({ minHeight: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div class="hero-slider" style={{
				minHeight: attributes.minHeight
			}} data-slider>

				{sliderItems}
				{sliderDots}
				{sliderArrows}
			</div>
		</div>
	);
}