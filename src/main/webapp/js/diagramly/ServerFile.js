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
ServerFile = function(ui, data, title)
{
	DrawioFile.call(this, ui, data);
	
	this.title = title;
};

//Extends mxEventSource
mxUtils.extend(ServerFile, DrawioFile);

/**
 * Sets the delay for autosave in milliseconds. Default is 2000.
 */
ServerFile.prototype.autosaveDelay = 2000;

/**
 * Sets the delay for autosave in milliseconds. Default is 20000.
 */
ServerFile.prototype.maxAutosaveDelay = 20000;

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
ServerFile.prototype.getMode = function()
{
	return App.MODE_SERVER;
};

/**
 * Overridden to enable the autosave option in the document properties dialog.
 */
ServerFile.prototype.isAutosaveOptional = function()
{
	return true;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
ServerFile.prototype.getHash = function()
{
	return 'Z' + encodeURIComponent(this.getTitle());
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
ServerFile.prototype.getTitle = function()
{
	return this.title;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
ServerFile.prototype.isRenamable = function()
{
	return true;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
ServerFile.prototype.save = function(revision, success, error)
{
	this.saveAs(this.getTitle(), success, error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
ServerFile.prototype.saveAs = function(title, success, error)
{
	DrawioFile.prototype.save.apply(this, arguments);
	this.saveFile(title, false, success, error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
ServerFile.prototype.saveFile = function(title, revision, success, error)
{
	if (!this.isEditable())
	{
		if (success != null)
		{
			success();
		}
	}
	else
	{
		var fn = mxUtils.bind(this, function()
		{
			if (this.isRenamable())
			{
				this.title = title;
			}
			
			try
			{
				/*
				new mxXmlRequest("vd", 'format=' + format +
					'&xml=' + encodeURIComponent(data) +
					'&filename=' + encodeURIComponent(title) +
					((binary) ? '&binary=1' : '')).
					simulate(document, '_blank');
					*/
				//new mxXmlRequest("vd/" + this.title, 
					//this.getData(), "PUT", false, null, null).send();
	
				//this.ui.setLocalData(this.title, this.getData(), mxUtils.bind(this, function()
				//{
					this.setModified(false);
					this.contentChanged();
					
					if (success != null)
					{
						success();
					}
			}
			catch (e)
			{
				if (error != null)
				{
					error(e);
				}
			}
		});
		
		// Checks for trailing dots
		if (this.isRenamable() && title.charAt(0) == '.' && error != null)
		{
			error({message: mxResources.get('invalidName')});
		}
		else
		{
			this.ui.getLocalData(title, mxUtils.bind(this, function(data)
			{
				if (!this.isRenamable() || this.getTitle() == title || data == null)
				{
					fn();
				}
				else
				{
					this.ui.confirm(mxResources.get('replaceIt', [title]), fn, error);
				}
			}));
		}
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
ServerFile.prototype.rename = function(title, success, error)
{
	var oldTitle = this.getTitle();

	if (oldTitle != title)
	{
		this.ui.getLocalData(title, mxUtils.bind(this, function(data)
		{
			var fn = mxUtils.bind(this, function()
			{
				this.title = title;
				
				// Updates the data if the extension has changed
				if (!this.hasSameExtension(oldTitle, title))
				{
					this.setData(this.ui.getFileData());
				}
				
				this.saveFile(title, false, mxUtils.bind(this, function()
				{
					this.ui.removeLocalData(oldTitle, success);
				}), error);
			});
			
			if (data != null)
			{
				this.ui.confirm(mxResources.get('replaceIt', [title]), fn, error);
			}
			else
			{
				fn();
			}
		}));
	}
	else
	{
		success();
	}
};

/**
 * Returns the location as a new object.
 * @type mx.Point
 */
ServerFile.prototype.open = function()
{
	DrawioFile.prototype.open.apply(this, arguments);

	// Immediately creates the server entry
	this.saveFile(this.getTitle());
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
ServerFile.prototype.getLatestVersion = function(success, error)
{
	this.ui.getLocalData(this.title, mxUtils.bind(this, function(data)
	{
		success(new ServerFile(this.ui, data, this.title));
	}));
};

/**
 * Stops any pending autosaves and removes all listeners.
 */
ServerFile.prototype.destroy = function()
{
	DrawioFile.prototype.destroy.apply(this, arguments);
	
	if (this.serverListener != null)
	{
		mxEvent.removeListener(window, 'server', this.serverListener);
		this.serverListener = null;
	}
};
