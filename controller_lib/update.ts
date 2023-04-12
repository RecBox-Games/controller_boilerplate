function controlpadUpdate() {
	// Clear screen
	// Check touches
	// Checl cancels
	// Update buttons
	//Request nimation frame
    if (image_drawables.length > 0) {
        image_drawables[image_drawables.length-1].rotation += 2 * Math.PI / 60;
        needs_draw = true;
    }
}
