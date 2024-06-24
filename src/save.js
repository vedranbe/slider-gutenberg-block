import { __ } from '@wordpress/i18n';

export default function Save(props) {
    const { attributes } = props;

    return (
        <div className="hero-slider" data-block-attributes={JSON.stringify(attributes)}>
            <div>
                {attributes.slides.map((slide, index) => (
                    <div key={index} className="slider-cell">
                        <img src={slide.url} alt={slide.alt} />
                        <div className="inner">
                            <h3 className="subtitle">Subtitle</h3>
                            <h2 className="title">Title</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
