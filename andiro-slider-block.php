<?php

/**
 * Plugin Name: Andiro Slider Block
 * Description: Slider block based on Flickity v2.
 * Version: 0.1.0
 * Author: Vedran Bejatovic
 * Author URI: https://www.linkedin.com/in/vedranbe/
 * Text Domain: andiro
 */

namespace andiroDevRandom;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function andiro_slider_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', __NAMESPACE__ . '\andiro_slider_block_init' );

/** 
 * Enqueue your custom CSS and JS
 */
function enqueue_plugin_styles()
{
    wp_enqueue_style('flickity-styles', plugin_dir_url(__FILE__) . 'flickity/flickity.min.css');
	wp_enqueue_style('flickity-custom', plugin_dir_url(__FILE__) . 'flickity/flickity.custom.css');
}
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_plugin_styles');

function enqueue_ajax_scripts()
{
    wp_enqueue_script('flickity-script', plugin_dir_url(__FILE__) . 'flickity/flickity.pkgd.min.js', array('jquery'), '1.0', false);
}

add_action('wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_ajax_scripts');


