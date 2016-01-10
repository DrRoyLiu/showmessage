/**
 * showmessage.js
 * 
 * @author Roy
 * @since 2016-01-03
 */
ShowMessage = {};
/**
 * show a msg until ShowMessage.close()
 * 
 * @param msg (, parent)
 *            msg: message. parent: define its parent,optional.
 * @author Roy
 * @since 2016-01-03
 */
var messageId = 0;
ShowMessage.show = function(value) {
	var divID = "warnMsg" + messageId++;
	var warnMsg = "<div id='" + divID + "' class='warnMsg'></div>";
	if (arguments.length == 1) {
		$("body").append(warnMsg);
	} else if (arguments.length == 2) {
		$(arguments[1]).append(warnMsg);
	} else {
		console.logÏ("ShowMessage.show must contains 1 or 2 argument(s)");
		return null;
	}
	$("#" + divID).html("<p>" + arguments[0] + "</p>");
	setItemInCenter($("#" + divID));
	return divID;
};

/**
 * set postion
 * 
 * @param item
 *            item: a jquery object. the warMsg in this case.
 * @author Roy
 * @since 2016-01-03
 */
function setItemInCenter(item) {
	var htmlWidth, htmlHeight, tmpWidth, tmpHeight;
	/*
	 * use the parent of item, so the message div will not be out of parent's range.
	 */
	var parent = $(item).parent();
	htmlWidth = $(parent).outerWidth();
	htmlHeight = $(parent).outerHeight();
	tmpWidth = item.outerWidth();
	tmpHeight = item.outerHeight();
	item.css({
		'top' : (htmlHeight - tmpHeight) / 2,
		'left' : (htmlWidth - tmpWidth) / 2
	});
}
/**
 * close the msg
 * @param item
 *            item: a jquery object. the warMsg in this case.
 * @author Roy
 * @since 2016-01-03
 */
ShowMessage.close = function(divID) {
	$("#" + divID).remove();
};
/**
 * close the msg after time automatically
 * 
 * @param msg
 *            the message
 * @param time
 *            the time, time unit: ms. time must > 0. it will be 1000ms by default
 * @author Roy
 * @since 2016-01-03
 */
ShowMessage.showForTime = function(msg, time) {
	var divID = this.show(msg);
	var waitTime = 1000;
	if (parseInt(time) > 0) {
		waitTime = time;
	} else {
		if (time == "slow")
			waitTime = 2000;
		else if (time == "normal")
			waitTime = 1000;
		else if (time == "fast")
			waitTime = 500;
	}
	setTimeout(function() {
		ShowMessage.close(divID);
	}, waitTime);
};
/**
 * a msg window with "ok" button
 * 
 * @param msg (,parent) (,staticId)
 *            msg: the message
 *            parent: its parent
 *            staticId: the msg window will be the only one if staticId is not null
 * @author Roy
 * @since 2016-01-03
 */
ShowMessage.showConfirm = function(msg) {
	var confirmMsgID;
	if (arguments.length == 1) {
		confirmMsgID = ShowMessage.show(arguments[0]);
	} else if (arguments.length == 2) {
		confirmMsgID = ShowMessage.show(arguments[0], arguments[1]);
	} else if (arguments.length == 3) {
		confirmMsgID = arguments[2];
		if ($("#" + confirmMsgID).length < 1) {
			var confirmDiv = "<div id='" + confirmMsgID
					+ "' class='warnMsg'></div>";
			$(arguments[1]).append(confirmDiv);
		}
		$("#" + confirmMsgID).html("<p>" + arguments[0] + "</p>");
		setItemInCenter($("#" + confirmMsgID));
	} else {
		console.log("ShowMessage.showConfirm must contains 1 to 3 argument(s)");
		return null;
	}
	var button = "<button name='" + confirmMsgID
			+ "Btn' class='msgOkBtn'>OK</button>";
	$("#" + confirmMsgID).append(button);
	$("[name='" + confirmMsgID + "Btn']").click(function() {
		ShowMessage.close(confirmMsgID);
	});
};
