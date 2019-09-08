// When the user scrolls down 250px from the top of the document, show the "top" button
$(window).scroll(function () {
	if ($(document).scrollTop() > 250) {
		$("#myBtn").fadeIn(function () {
			$("#myBtn").css("display", "block");
		});
	} else {
		$("#myBtn").fadeOut(function ()  {
			$("#myBtn").css("display", "none");
		});
	}
});

// When the user clicks on the "top" button, scroll to the top of the document
function topFunction() {
	$(document).scrollTop(0);
}

// Slide the NavBar's menu open and close
function myFunction() {
	var navBar = $(".NavBar");
	if (navBar.hasClass("responsive")) {
		$(".closeOpen").slideUp(function () {
			navBar.removeClass("responsive");
			$(".slideToggle").removeAttr("style");
		});
	} else {
		$(".closeOpen").slideDown(function () {
			checkHeight();
		});
		navBar.addClass("responsive");
	}
}

// Check total height of items in the menu and add a scroll bar if the total height of the menu item is greater than the window height
function checkHeight() {
	var slideHeight = $(".slideToggle").height();
	var windowHeight = window.innerHeight;
	var homeHeight = $(".calcHeight").outerHeight();
	if (slideHeight + homeHeight > windowHeight) {
		$(".slideToggle").css({
			"height": windowHeight - homeHeight,
			"overflow": "auto"
		});
	}
}

// Test if given CSS property and value is supported. This is a bit faulty as fake properties and values will always result in "true".
function cssPropertyValueSupportted(prop, value) {
	var d = document.createElement("div");
	d.style[prop] = value;
	return d.style[prop] === value;
}

// Scale Headers in Text-Body
$(document).ready(function () {
	var scaleH1 = $(".scaleSize");
	var i;
	var scaleLength = scaleH1.length;
	for (i = 0; i < scaleLength; i++) {
		var h1Width = $(".Text-Body > h1");
		if ($(".scaleSize:eq(" + i + ")").width() > h1Width.width()) {
			scaleH1.css("fontSize", "70%");
			break;
		}
	}
	$(".Dropdown").removeClass("noJS");
	
	/* This code sees if Position: Sticky is supported. If it isn't, it will replicate it by switching between Position: Relative and Position: Fixed. */
	var c = cssPropertyValueSupportted("position", "sticky");
	if (c == false) {
		$(".NavBar").addClass("relativePos");
		if (isBrowserIE()) {
			$("<script>window.onscroll = function () {scrollPos();}</" + "script>").appendTo(document.body);
		} else {
			$("body").attr("onscroll", "scrollPos()");
		}
	}
});

/* This is used to check if the user's browser is Internet Explorer. */
function isBrowserIE(userAgent) {
	userAgent = userAgent || navigator.userAgent;
	return userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident/") > -1;
}

/* This function is used when "Position: Sticky" isn't supported. This acts the same way Position: Sticky will act. */
function scrollPos() {
	var distFromTop = $(".NavBar").offset().top;
	var docScroll = $(document).scrollTop();
	var headerHeight = $("#StickyImg").outerHeight();
	if (docScroll > distFromTop) {
		$(".NavBar").removeClass("relativePos").addClass("fixedPos");
		$(".Text-Body").css({
			"top": "51px",
			"position": "relative"
		});
	} else if (docScroll < headerHeight) {
		$(".NavBar").removeClass("fixedPos").addClass("relativePos");
		$(".Text-Body").removeAttr("style");
	}
}

// This is jQuery code for the table image on the Ethernet page. This is used to show the enlarged image and to close it
function enlargeImg() {
	var modal = $("#myModal");
	modal.css("display", "block");

	var span = $(".close");
	span.on("click", function () { 
		modal.css("display", "none");
	});
}

$(function () {
	// This makes the dropdowns slide down to show and slide up to hide.
	$(".Dropdown, .Dropbtn > div").each(function () {
		var dropdown = $(this);
		dropdown.hover(function () {
			if ($(window).outerWidth() >= 634) {
				dropdown.children("div").slideDown();
			}
		}, function () {
			if ($(window).outerWidth() >= 634) {
				dropdown.children("div").slideUp();
			}
		});
	});
	
	// When the NavBar goes from responsive to regular, remove stuff to change the NavBar back to normal
	$(window).resize(function () {
		var windowWidth = $(window).outerWidth();
		if (windowWidth > 634) {
			$(".NavBar").removeClass("responsive");
			$(".removeStuff").removeClass("show").removeAttr("style");
		}
		
		// Check the height of .slideToggle on resize
		if ($(".NavBar").hasClass("responsive")) {
			checkHeight();
		}
	});
	
	// Remove "show" class when the user clicks outside of the dropdown
	$(document).on("click", function () {
		if ($(".NavBar").hasClass("responsive")) {
			var dropDown = $(".Dropbtn, .Dropdown-Content");
			dropDown.slideUp().removeClass("show");
		}
	});
	
	$(".Dropdown a, .Dropbtn > div > a").on("click", function (e) {
		if ($(".NavBar").hasClass("responsive")) {
			e.stopPropagation();
			var currentItem = $(this).siblings(".Dropbtn, .Dropdown-Content");
			var dropDown = $(".Dropbtn, .Dropdown-Content");
			// If the user clicks on a link in which the dropdown is already open, remove "show" class (close dropdown)
			if (currentItem.hasClass("show")) {
				currentItem.slideUp().removeClass("show");
			
			} else if (dropDown.hasClass("show")) {
				// If the clicked dropdown has the "openUp" class (which is on the Conversion's sub-dropdown), open the dropdown (add "show" class)
				if ($(this).hasClass("openUp")) {
					currentItem.slideDown(function () {
						checkHeight();
					}).addClass("show");
				// If the above is false (not the Conversion sub-dropdown), then close any dropdowns that may be currently open and add the "show" class to the clicked dropdown (open dropdown)
				} else {
					dropDown.slideUp().removeClass("show");
					currentItem.slideDown(function () {
						checkHeight();
					}).addClass("show");
				}
			
			// If none of the dropdown elements has the "show" class, add the class to the clicked on dropdown (open dropdown)
			} else {
				currentItem.slideDown(function () {
					checkHeight();
				}).addClass("show");
			}
		}
	});
});