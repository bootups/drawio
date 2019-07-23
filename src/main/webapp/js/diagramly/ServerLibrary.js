/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
/**
 * Constructs a new point for the optional x and y coordinates. If no
 * coordinates are given, then the default values for <x> and <y> are used.
 * @constructor
 * @class Implements a basic 2D point. Known subclassers = {@link mxRectangle}.
 * @param {number} x X-coordinate of the point.
 * @param {number} y Y-coordinate of the point.
 */
ServerLibrary = function(ui, data, title)
{
	ServerFile.call(this, ui, data, title);
};

//Extends mxEventSource
mxUtils.extend(ServerLibrary, ServerFile);

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
ServerLibrary.prototype.isAutosave = function()
{
	return true;
};

/**
 * Overridden to avoid updating data with current file.
 */
ServerLibrary.prototype.saveAs = function(title, success, error)
{
	this.saveFile(title, false, success, error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
ServerLibrary.prototype.getHash = function()
{
	return 'Z' + encodeURIComponent(this.title);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
ServerLibrary.prototype.getTitle = function()
{
	return (this.title == '.scratchpad') ? mxResources.get('scratchpad') : this.title;
};

/**
 * Overridden to avoid updating data with current file.
 */
ServerLibrary.prototype.isRenamable = function(title, success, error)
{
	return this.title != '.scratchpad';
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
ServerLibrary.prototype.open = function()
{
	// Do nothing - this should never be called
};
