/*!
 * IstanbulPHP
 * Hasan Aydoğdu [ Front-end Developer ] - Atölye15 < hasan@atolye15.com >
 * Version 1.0.0 ( 17-05-2015 )
 */

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */

( function( window ) {

	'use strict';

	//Atolye15's app.js

	/*
	 * getOffsetSum
	 * elemanın top ve left offsetini verir
	 *
	 * @param elem {object} offset değerleri hesaplanacak element
	 */
	var breakPoint, getOffsetSum, i, scrollTo, sticky, stickyHeader, stickyHeaderClickEvent, stickyHeaderMenuItems;
	getOffsetSum = function(elem) {
	  var left, top;
	  top = 0;
	  left = 0;
	  while (elem) {
	    top = top + parseInt(elem.offsetTop);
	    left = left + parseInt(elem.offsetLeft);
	    elem = elem.offsetParent;
	  }
	  return {
	    top: top,
	    left: left
	  };
	};

	/*
	 * easeOutQuart Easing Fonksiyonu
	 *
	 * @param t {int}: current time
	 * @param b {int}: start value
	 * @param c {int}: change in value
	 * @param d {int}: duration
	 */
	Math.easeOutQuart = function(t, b, c, d) {
	  t /= d;
	  t--;
	  return -c * (t * t * t * t - 1) + b;
	};

	/*
	 * scrollTo
	 * Belirlenen hedef elemente easeOutQuart fonksiyonunu kullanarak
	 * animasyonlu bir şekilde scroll eder
	 *
	 * @param toElm  {object}: scroll edilecek element
	 * @param tolerance {int}: scroll edilecek hedefte eksi yada artı tolarans vermeye yarar
	 * @param duration  {int}: animasyon süresi
	 */
	scrollTo = function(toElm, tolerance, duration) {
	  var animate, change, currentTime, from, increment, lastPageYOffset, to;
	  to = getOffsetSum(toElm).top;
	  from = window.pageYOffset;
	  to -= tolerance;
	  change = to - from;
	  currentTime = 0;
	  increment = 20;
	  lastPageYOffset = 0;

	  /*
	   * Scroll Animasyon Fonkstionu
	   */
	  animate = function() {
	    var currentPageYOffset, val;
	    currentPageYOffset = window.pageYOffset;
	    if (lastPageYOffset !== 0) {
	      if (lastPageYOffset === currentPageYOffset) {
	        return;
	      }
	      if ((change > 0 && lastPageYOffset > currentPageYOffset) || (change < 0 && lastPageYOffset < currentPageYOffset)) {
	        return;
	      }
	    }
	    lastPageYOffset = currentPageYOffset;
	    currentTime += increment;
	    val = Math.easeOutQuart(currentTime, from, change, duration);
	    window.scroll(0, val);
	    if (currentTime < duration) {
	      setTimeout(animate, increment);
	    }
	  };
	  animate();
	};

	/*
	 * Sticky Header
	 * 1024px ekran genişliğinin altında devre dışı bırakılmıştır!
	 */
	if ((window.innerWidth > 1023) && !!(stickyHeader = document.getElementById('sticky-header'))) {
	  breakPoint = window.innerHeight;
	  sticky = false;
	  if (window.pageYOffset > breakPoint) {
	    stickyHeader.classList.add('is-active');
	    sticky = true;
	  }
	  window.onscroll = function() {
	    if (window.pageYOffset > breakPoint) {
	      if (!sticky) {
	        stickyHeader.classList.add('is-active');
	        sticky = true;
	      }
	    } else {
	      if (sticky) {
	        stickyHeader.classList.remove('is-active');
	        sticky = false;
	      }
	    }
	  };

	  /*
	   * Sticky header menu scroll işlemleri
	   */
	  stickyHeaderMenuItems = document.getElementById('sticky-header-menu').children;
	  stickyHeaderClickEvent = function(e) {
	    var target;
	    e.preventDefault();
	    target = document.getElementById(this.getAttribute('data-target-id'));
	    if (target !== null) {
	      scrollTo(target, 30, 1000);
	    }
	  };
	  i = 0;
	  while (i < stickyHeaderMenuItems.length) {
	    stickyHeaderMenuItems[i].addEventListener('click', stickyHeaderClickEvent);
	    i++;
	  }
	}

	//Atolye15's app.js

	// class helper functions from bonzo https://github.com/ded/bonzo
	function classReg( className ) {
		return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	}

	// classList support for class management
	// altho to be fair, the api sucks because it won't accept multiple classes at once
	var hasClass, addClass, removeClass;

	if ( 'classList' in document.documentElement ) {
		hasClass = function( elem, c ) {
			return elem.classList.contains( c );
		};
		addClass = function( elem, c ) {
			elem.classList.add( c );
		};
		removeClass = function( elem, c ) {
			elem.classList.remove( c );
		};
	}
	else {
		hasClass = function( elem, c ) {
			return classReg( c ).test( elem.className );
		};
		addClass = function( elem, c ) {
			if ( !hasClass( elem, c ) ) {
				elem.className = elem.className + ' ' + c;
			}
		};
		removeClass = function( elem, c ) {
			elem.className = elem.className.replace( classReg( c ), ' ' );
		};
	}

	function toggleClass( elem, c ) {
		var fn = hasClass( elem, c ) ? removeClass : addClass;
		fn( elem, c );
	}

	window.classie = {
		// full names
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		// short names
		has: hasClass,
		add: addClass,
		remove: removeClass,
		toggle: toggleClass
	};

})( window );

//# sourceMappingURL=vendors.js.map