$( document ).ready(function() {
	var beginAC = 80,
	    endAC = 320,
	    beginB = 80,
	    endB = 320;

	function inAC(s) {
	    s.draw('80% - 240', '80%', 0.3, {
	        delay: 0.1,
	        callback: function() {
	            inAC2(s)
	        }
	    });
	}

	function inAC2(s) {
	    s.draw('100% - 545', '100% - 305', 0.6, {
	        easing: ease.ease('elastic-out', 1, 0.3)
	    });
	}

	function inB(s) {
	    s.draw(beginB - 60, endB + 60, 0.1, {
	        callback: function() {
	            inB2(s)
	        }
	    });
	}

	function inB2(s) {
	    s.draw(beginB + 120, endB - 120, 0.3, {
	        easing: ease.ease('bounce-out', 1, 0.3)
	    });
	}

	/* Out animations (to burger icon) */

	function outAC(s) {
	    s.draw('90% - 240', '90%', 0.1, {
	        easing: ease.ease('elastic-in', 1, 0.3),
	        callback: function() {
	            outAC2(s)
	        }
	    });
	}

	function outAC2(s) {
	    s.draw('20% - 240', '20%', 0.3, {
	        callback: function() {
	            outAC3(s)
	        }
	    });
	}

	function outAC3(s) {
	    s.draw(beginAC, endAC, 0.7, {
	        easing: ease.ease('elastic-out', 1, 0.3)
	    });
	}

	function outB(s) {
	    s.draw(beginB, endB, 0.7, {
	        delay: 0.1,
	        easing: ease.ease('elastic-out', 2, 0.4)
	    });
	}

	/* Awesome burger default */
	var pathA = document.getElementById('pathA'),
		pathB = document.getElementById('pathB'),
		pathC = document.getElementById('pathC'),
		segmentA = new Segment(pathA, beginAC, endAC),
		segmentB = new Segment(pathB, beginB, endB),
		segmentC = new Segment(pathC, beginAC, endAC),
		trigger = document.getElementById('menu-icon-trigger'),
		toCloseIcon = true,
		/*dummy = document.getElementById('st-container'),*/
		wrapper = document.getElementById('menu-icon-wrapper');

	wrapper.style.visibility = 'visible';

	trigger.onclick = function() {
		if (toCloseIcon) {
			inAC(segmentA);
			inB(segmentB);
			inAC(segmentC);

			/*dummy.className = 'st-reveal st-menu-open';*/
		} else {
			outAC(segmentA);
			outB(segmentB);
			outAC(segmentC);

			/*dummy.className = 'st-reveal';*/
		}
		toCloseIcon = !toCloseIcon;
	};

	function smooth () {
		// Select all links with hashes
		$('a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.click(function(event) {
			// On-page links
			if (
			  location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			  && 
			  location.hostname == this.hostname
			) {
			  // Figure out element to scroll to
			  var target = $(this.hash);
			  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			  // Does a scroll target exist?
			  if (target.length) {
			    // Only prevent default if animation is actually gonna happen
			    event.preventDefault();
			    $('html, body').animate({
			      scrollTop: target.offset().top
			    }, 1000, function() {
			      // Callback after animation
			      // Must change focus!
			      var $target = $(target);
			      $target.focus();
			      if ($target.is(":focus")) { // Checking if the target was focused
			        return false;
			      } else {
			        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
			        $target.focus(); // Set focus again
			      };
			    });
			  }
			}
		});
	}
	
	smooth();

		/*onclickHamburger to open menu*/
    function onClickHamburger() {
    	$('#menu-icon-trigger').on('click touchStart', function() {
    		console.log('re')
    		$('#st-container').toggleClass('st-menu-open');
    		$('#html').toggleClass('noScroll')
    	});
    }

    onClickHamburger();

    /*onclick outside menu make close menu*/
    function closedMenu () {
    	$('.st-pusher').on('click touchstart', function() {
			if($('.st-menu-open').length == 1) {	
				$('#menu-icon-trigger').trigger('click');
			}
		});
    }

    closedMenu ();
});
