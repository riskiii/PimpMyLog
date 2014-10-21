$(function() {
	"use strict";

	// Logo click
	$('.logo').click(function() {
		location.reload();
	});

	$('table').addClass('table table-striped table-bordered table-hover table-condensed');

	$('#regextest').submit( function( event ) {

		$.ajax( {
			url  : 'test.php' ,
			type : 'POST',
			data : {
				'r' : $( '#inputRegEx' ).val(),
				'l' : $( '#inputLog' ).val(),
				'm' : $( '#inputMatch' ).val(),
				't' : $( '#inputTypes' ).val(),
				'u' : $( '#inputMultiline' ).val(),
				's' : '1',
			} ,
			dataType: 'json'
		} )
		.fail( function ( d , e , f ) {
			$( "#regexresult" ).html( f.message );
		})
		.done( function ( d ) {

			$( "#regexresult" ).html( d.msg );
			$( '.form-group' ).removeClass( 'has-error' );
			if ( d.err ) {
				$( '#GP' + d.err ).addClass( 'has-error' );
				$( '#' + d.err ).focus();
			}
		});

		event.preventDefault();
	});

	$(document).ready(function(){

		$('a.clipboard2').zclip({
			path:'../js/ZeroClipboard.swf',
			copy:function(){
				return $("pre.clipboard2content").text();
			},
			afterCopy:function() {
				$( 'a.clipboard2' ).popover( {
					html      : true ,
					animation : true ,
					placement : 'right',
					container : 'body',
					delay     : { show: 100, hide: 5000 },
					content   : lemma.command_copied
				} ).popover( 'show' );
				$('a.clipboard2').on('hidden.bs.popover', function () {
					$( 'a.clipboard2' ).show();
				});
			}
		});

		$('a.clipboard').zclip({
			path:'../js/ZeroClipboard.swf',
			copy:function(){
				var t = '{\n';
				t += '  "SOFTWARE_ID": {\n';
				t += '    "display"   : "SOFTWARE NAME",\n';
				t += '    "path"      : "SOFTWARE PATH",\n';
				t += '    "format"    : {\n';
				t += '      "multiline": ' + JSON.stringify($( '#inputMultiline' ).val()) + ',\n';
				t += '      "regex"    : ' + JSON.stringify($( '#inputRegEx' ).val()) + ',\n';
				t += '      "match"    : ' + $( '#inputMatch' ).val() + ',\n';
				t += '      "types"    : ' + $( '#inputTypes' ).val() + '\n';
				t += '    }\n';
				t += '  }\n';
				t += '}\n';
				return t;
			},
			afterCopy:function() {
				$( 'a.clipboard' ).popover( {
					html      : true ,
					animation : true ,
					placement : 'right',
					container : 'body',
					delay     : { show: 100, hide: 5000 },
					content   : lemma.configuration_copied
				} ).popover( 'show' );
				$('a.clipboard').on('hidden.bs.popover', function () {
					$( 'a.clipboard' ).show();
				});
			}
		});

		$( '#authsave' ).submit(function( event ) {
			var username  = $('#username').val();
			var password  = $('#password').val();
			var password2 = $('#password2').val();
			var go        = true;

			$('#usernamegroup').removeClass('has-error').removeClass('has-success').tooltip('hide');
			$('#passwordgroup').removeClass('has-error').removeClass('has-success').tooltip('hide');
			$('#password2group').removeClass('has-error').removeClass('has-success').tooltip('hide');

			if ( username.length === 0 ) {
				$('#usernamegroup').addClass('has-error').tooltip('show');
				go = false;
			}
			if ( password.length < 6 ) {
				$('#passwordgroup').addClass('has-error').tooltip('show');
				go = false;
			}
			if ( password2 !== password ) {
				$('#password2group').addClass('has-error').tooltip('show');
				go = false;
			}
			if ( go === true ) {
				return;
			}
			event.preventDefault();
			return false;
		});

		$(function () {
			var activeTab = $('[href=' + location.hash + ']');
			activeTab && activeTab.tab('show');});
		});

});
