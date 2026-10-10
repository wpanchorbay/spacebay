/**
 * SpaceBay documentation search.
 *
 * Searches the headings and text of every section on this page, in the browser.
 * Nothing is sent anywhere. Press "/" to jump to the search box.
 */
( function () {
	'use strict';

	var input = document.getElementById( 'docs-search-input' );
	var list = document.getElementById( 'docs-search-results' );
	var status = document.getElementById( 'docs-search-status' );
	var nav = document.getElementById( 'docs-nav-list' );
	var main = document.querySelector( '.docs-main' );

	if ( ! input || ! list || ! main ) {
		return;
	}

	// 1. Build the index: one entry per h2 and h3 with the text up to the next heading.
	var sections = [];
	var headings = main.querySelectorAll( 'h2, h3' );
	var used = {};

	function slug( text ) {
		var base = text.toLowerCase().replace( /[^a-z0-9]+/g, '-' ).replace( /^-+|-+$/g, '' ) || 'section';
		var id = base;
		var n = 2;
		while ( used[ id ] || document.getElementById( id ) ) {
			id = base + '-' + n;
			n++;
		}
		return id;
	}

	Array.prototype.forEach.call( headings, function ( heading ) {
		if ( ! heading.id ) {
			heading.id = slug( heading.textContent );
		}
		used[ heading.id ] = true;
	} );

	var parentTitle = '';

	Array.prototype.forEach.call( headings, function ( heading ) {
		var title = heading.textContent.replace( /\s+Pro$/, '' ).trim();
		var text = '';
		var node = heading.nextElementSibling;

		while ( node && ! /^H[23]$/.test( node.tagName ) ) {
			text += ' ' + node.textContent;
			node = node.nextElementSibling;
		}

		if ( heading.tagName === 'H2' ) {
			parentTitle = title;
		}

		sections.push( {
			id: heading.id,
			title: title,
			parent: heading.tagName === 'H3' ? parentTitle : '',
			pro: !! heading.querySelector( '.pro' ),
			text: text.replace( /\s+/g, ' ' ).trim(),
		} );
	} );

	// 2. Search.
	function words( query ) {
		return query.toLowerCase().split( /\s+/ ).filter( function ( w ) {
			return w.length > 0;
		} );
	}

	function score( section, terms ) {
		var title = section.title.toLowerCase();
		var parent = section.parent.toLowerCase();
		var body = section.text.toLowerCase();
		var total = 0;

		for ( var i = 0; i < terms.length; i++ ) {
			var term = terms[ i ];
			var inTitle = title.indexOf( term ) !== -1;
			var inParent = parent.indexOf( term ) !== -1;
			var inBody = body.indexOf( term ) !== -1;

			if ( ! inTitle && ! inParent && ! inBody ) {
				return 0;
			}

			total += ( inTitle ? 10 : 0 ) + ( title.indexOf( term ) === 0 ? 5 : 0 ) + ( inParent ? 3 : 0 ) + ( inBody ? 1 : 0 );
		}

		return total;
	}

	function escapeHtml( value ) {
		return value.replace( /[&<>"']/g, function ( c ) {
			return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ c ];
		} );
	}

	function escapeRegExp( value ) {
		return value.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' );
	}

	function highlight( text, terms ) {
		var safe = escapeHtml( text );
		var pattern = new RegExp( '(' + terms.map( function ( t ) {
			return escapeRegExp( escapeHtml( t ) );
		} ).join( '|' ) + ')', 'gi' );
		return safe.replace( pattern, '<mark>$1</mark>' );
	}

	function snippet( text, terms ) {
		var lower = text.toLowerCase();
		var at = -1;

		for ( var i = 0; i < terms.length && at === -1; i++ ) {
			at = lower.indexOf( terms[ i ] );
		}

		if ( at === -1 ) {
			return text.slice( 0, 110 ) + ( text.length > 110 ? '…' : '' );
		}

		var start = Math.max( 0, at - 40 );
		var end = Math.min( text.length, at + 90 );
		return ( start > 0 ? '…' : '' ) + text.slice( start, end ).trim() + ( end < text.length ? '…' : '' );
	}

	var results = [];
	var active = -1;

	function render( query ) {
		var terms = words( query );
		list.innerHTML = '';
		active = -1;

		if ( ! terms.length ) {
			results = [];
			list.hidden = true;
			nav.hidden = false;
			status.textContent = '';
			input.setAttribute( 'aria-expanded', 'false' );
			return;
		}

		results = sections.map( function ( section ) {
			return { section: section, score: score( section, terms ) };
		} ).filter( function ( r ) {
			return r.score > 0;
		} ).sort( function ( a, b ) {
			return b.score - a.score;
		} ).slice( 0, 12 );

		nav.hidden = true;
		list.hidden = false;
		input.setAttribute( 'aria-expanded', 'true' );

		if ( ! results.length ) {
			list.innerHTML = '<li class="docs-search__empty">No results. Try another word.</li>';
			status.textContent = 'No results';
			return;
		}

		status.textContent = results.length === 1 ? '1 result' : results.length + ' results';

		results.forEach( function ( r, index ) {
			var item = document.createElement( 'li' );
			var link = document.createElement( 'a' );
			link.href = '#' + r.section.id;
			link.id = 'docs-search-result-' + index;
			link.setAttribute( 'role', 'option' );
			link.innerHTML =
				'<span class="docs-search__title">' + highlight( r.section.title, terms ) + ( r.section.pro ? ' <span class="pro">Pro</span>' : '' ) + '</span>' +
				( r.section.parent ? '<span class="docs-search__parent">' + escapeHtml( r.section.parent ) + '</span>' : '' ) +
				'<span class="docs-search__text">' + highlight( snippet( r.section.text, terms ), terms ) + '</span>';
			link.addEventListener( 'click', function () {
				go( r.section.id, terms );
			} );
			item.appendChild( link );
			list.appendChild( item );
		} );
	}

	function setActive( index ) {
		var links = list.querySelectorAll( 'a' );

		if ( ! links.length ) {
			return;
		}

		active = ( index + links.length ) % links.length;
		Array.prototype.forEach.call( links, function ( link, i ) {
			link.classList.toggle( 'is-active', i === active );
		} );
		input.setAttribute( 'aria-activedescendant', links[ active ].id );
		links[ active ].scrollIntoView( { block: 'nearest' } );
	}

	// 3. Going to a result: scroll there and briefly mark the words in that section.
	function clearMarks() {
		Array.prototype.forEach.call( main.querySelectorAll( 'mark.docs-hit' ), function ( mark ) {
			mark.replaceWith( document.createTextNode( mark.textContent ) );
		} );
		main.normalize();
	}

	function markSection( id, terms ) {
		clearMarks();
		var heading = document.getElementById( id );

		if ( ! heading || ! terms.length ) {
			return;
		}

		var pattern = new RegExp( '(' + terms.map( escapeRegExp ).join( '|' ) + ')', 'gi' );
		var node = heading;
		var nodes = [];

		do {
			nodes.push( node );
			node = node.nextElementSibling;
		} while ( node && ! /^H[23]$/.test( node.tagName ) );

		nodes.forEach( function ( block ) {
			var walker = document.createTreeWalker( block, NodeFilter.SHOW_TEXT, {
				acceptNode: function ( textNode ) {
					var parent = textNode.parentNode.nodeName;
					return parent === 'SCRIPT' || parent === 'STYLE' || parent === 'MARK' ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
				},
			} );
			var texts = [];

			while ( walker.nextNode() ) {
				texts.push( walker.currentNode );
			}

			texts.forEach( function ( textNode ) {
				if ( ! pattern.test( textNode.nodeValue ) ) {
					return;
				}

				pattern.lastIndex = 0;
				var fragment = document.createDocumentFragment();
				textNode.nodeValue.split( pattern ).forEach( function ( part, i ) {
					if ( i % 2 === 1 ) {
						var mark = document.createElement( 'mark' );
						mark.className = 'docs-hit';
						mark.textContent = part;
						fragment.appendChild( mark );
					} else if ( part ) {
						fragment.appendChild( document.createTextNode( part ) );
					}
				} );
				textNode.parentNode.replaceChild( fragment, textNode );
			} );
		} );
	}

	function go( id, terms ) {
		markSection( id, terms );
		var heading = document.getElementById( id );

		if ( heading ) {
			heading.setAttribute( 'tabindex', '-1' );
			heading.focus( { preventScroll: true } );
			heading.scrollIntoView( { behavior: window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ? 'auto' : 'smooth', block: 'start' } );
		}
	}

	input.addEventListener( 'input', function () {
		render( input.value );
	} );

	input.addEventListener( 'keydown', function ( event ) {
		if ( event.key === 'ArrowDown' ) {
			event.preventDefault();
			setActive( active + 1 );
		} else if ( event.key === 'ArrowUp' ) {
			event.preventDefault();
			setActive( active - 1 );
		} else if ( event.key === 'Enter' && results.length ) {
			event.preventDefault();
			var pick = results[ active >= 0 ? active : 0 ];
			history.replaceState( null, '', '#' + pick.section.id );
			go( pick.section.id, words( input.value ) );
		} else if ( event.key === 'Escape' ) {
			input.value = '';
			render( '' );
			clearMarks();
		}
	} );

	document.addEventListener( 'keydown', function ( event ) {
		var tag = ( event.target.tagName || '' ).toLowerCase();

		if ( event.key === '/' && tag !== 'input' && tag !== 'textarea' && ! event.target.isContentEditable ) {
			event.preventDefault();
			input.focus();
			input.select();
		}
	} );

	// Open with ?q=word to search right away (for links from the plugin or support replies).
	var params = new URLSearchParams( window.location.search );

	if ( params.get( 'q' ) ) {
		input.value = params.get( 'q' );
		render( input.value );
	}
}() );
