var vh = $(window).height();
var vw = $(window).width();
$.fn.getDeviceType = function(){
	var ua = navigator.userAgent;
	if(/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)){
		return 'tablet';
	}
	if(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)){
		return 'mobile';
	}
	return 'desktop';
}
$.fn.toUI = function(type, config){
	if(type == 'startbtn'){
		this.addClass('starbtn');
	} else if(type == 'gamearea'){
		this.addClass('gamarea');
	} else if(type == 'homepage'){
		this.addClass('hompage');
	} else if(type == 'pausebtn'){
		this.addClass('pausbtn');
	} else if(type == 'pausepage'){
		this.addClass('pauspage');
	} else if(type == 'continuebtn'){
		this.addClass('continubtn');
	} else if(type == 'savebtn'){
		this.addClass('savbtn');
	} else if(type == 'fightpage'){
		this.addClass('fighpage');
	} else if(type == 'exitbtn'){
		this.addClass('exibtn');
	} else {
		console.error('...toUI(\'' + type + '\') is wrong');
	}
};
$.fn.toSprite = function(type, config){
	if(type == 'sprite'){
		this.addClass('sprte');
		var thcstopstr = Number(this.css('top').substr(0, this.css('top').length - 2));
		if(thcstopstr <= 400){
			this.teleport('gravity', 0, 0);
		}
	} else if(type == 'control'){
		this.addClass('sprte');
		this.addClass('control');
		window.xspeed = config.xspeed;
		window.yspeed = config.yspeed;
	} else if(type == 'enemy'){
		this.addClass('sprte');
		this.addClass('enemy');
		this.addClass(config);
	} else if(type == 'trap'){
		this.addClass('sprte');
		this.addClass('trap');
	} else {
		console.error('...rite(\'' + type + '\') is wrong');
	}
};
$.fn.vari = function(data){
	$().setCookie('data1', JSON.stringify(data), 0.5)
}
$.fn.teleport = function(type, x, y){
	if(this.hasClass('sprte') == true){
		if(type == ''){
			this.css('left', x + 'px');
			this.css('top', y + 'px');
		} else if(type == 'move'){
			var thcstopstr = Number(this.css('top').substr(0, this.css('top').length - 2));
			var thcsleftstr = Number(this.css('left').substr(0, this.css('left').length - 2));
			this.css('left', thcsleftstr + x + 'px');
			this.css('top', thcstopstr + y + 'px');
		} else if(type == '%'){
			this.css('left', x + '%');
			this.css('top', y + '%');
		} else {
			console.error('...port(\'' + type + '\'...is wrong');
		}
	} else {
		console.error('id: ' + this.attr('id') + ' is not a sprite');
	}
};
$.fn.overlap = function(firstitem, seconditem){
	var d1_offset			 = firstitem.offset();
	var d1_height			 = firstitem.outerHeight( true );
	var d1_width			  = firstitem.outerWidth( true );
	var d1_distance_from_top  = d1_offset.top + d1_height;
	var d1_distance_from_left = d1_offset.left + d1_width;
	
	// Div 2 data
	var d2_offset			 = seconditem.offset();
	var d2_height			 = seconditem.outerHeight( true );
	var d2_width			  = seconditem.outerWidth( true );
	var d2_distance_from_top  = d2_offset.top + d2_height;
	var d2_distance_from_left = d2_offset.left + d2_width;
	window.overlap = seconditem.attr('class');
	
	var not_colliding = ( d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left );
	
	// Return whether it IS colliding
	return ! not_colliding;
};
$.fn.generate = function(){
	
}
$.fn.setCookie = function(cname, cvalue, exdays){
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = 'expires='+ d.toUTCString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
$.fn.getCookie = function(cname){
	var name = cname + '=';
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}
$.fn.checkCookie = function(){
	var xcoordinate = $().getCookie('xcoordinate');
	var ycoordinate = $().getCookie('ycoordinate');
	var login = $().getCookie('login');
	if (xcoordinate != '' && ycoordinate != ''){
		console.log('coordinate x is ' + xcoordinate + ', y is ' + ycoordinate)
	} else if(login != 'true'){
		window.top.location.href = 'index.html';
	}
}
$.fn.render = function(){
	if($().getCookie('data') != ''){
		var readData = JSON.parse($().getCookie('data'));
		$('.control').css('left', readData.xcoordinate);
		$('.control').css('top', readData.ycoordinate);
	} else {
		alert('sd')
	}
}
$.fn.save = function(){
	var xcoordinate1 = $('.control').css('left');
	var ycoordinate1 = $('.control').css('top');
	var hp1 = window.hp;
	var a = {
		xcoordinate: xcoordinate1,
		ycoordinate: ycoordinate1, 
		hp: hp1
	}
	$().set('', a);
}
$(document).ready(function(){
	$.get('plot.json', function(data){
		data = JSON.parse(data);
		$().setCookie('plot', JSON.stringify(data), 0.5);
		console.log(data);
	}, 'text');
	$('body').attr('id','body');
	$(document).click(function(){
		$('#body').fullscreen();
	});
	$().checkCookie();
	$().render();
	$().read();
	$(window).contextmenu(function(event){
		event.preventDefault();
	});
	$('.starbtn').click(function(){
		window.start = true;
		$('.hompage').css('display', 'none');
		$('.gamarea').css('display', 'block');
		$('.pausbtn').css('display', 'block');
		
	});
	$('.pausbtn').click(function(){
		window.start = false;
		$('.pauspage').css('display', 'block');
		$('.pausbtn').css('display', 'none');
	});
	$('.pauspage').click(function(event){
		if($(event.target).hasClass('pauspage')){
			window.start = true;
			$('.pauspage').css('display', 'none');
			$('.pausbtn').css('display', 'block');
		}
	});
	$('.continubtn').click(function(){
		window.start = true;
		$('.pauspage').css('display', 'none');
		$('.pausbtn').css('display', 'block');
	});
	$('.savbtn').click(function(){
		$().save();
	});
	$('.exibtn').click(function(){
		$().setCookie('login', 'false', 0.5);
		location.reload();
	});
	$(window).keydown(function(event){
		if(window.start){
			var xspeed = Number(window.xspeed);
			var yspeed = Number(window.yspeed);
			if(event.which == 39){
				$('.control').teleport('move', xspeed, 0);
				$('.control').removeClass('flip');
			} else if(event.which == 37){
				$('.control').teleport('move', Number('-' + xspeed), 0);
				$('.control').addClass('flip');
			} else if(event.which == 38){
				$('.control').teleport('move', 0, Number('-' + yspeed));
			} else if(event.which == 40){
				$('.control').teleport('move', 0, yspeed);
			} else if(event.which == 80){
				$('.pauspage').css('display', 'block');
			}
			if($().overlap($('.control'), $('.trap')) && window.fighting != true){
				var readData = JSON.parse($().getCookie('data1'));
				$('.trap').css('display', 'none');
				$('.gamarea').append('<div class=damage>-' + readData.trap.damage + '</div>')
				setTimeout(function(){
					$('.damage').css({'top': '-50px', 'opacity': '0'})
					window.hp = window.hp - b.trap.damage;
				}, 1000)
				console.log(b)
			}
		}
	});
	$(document).bind('fscreenchange', function(e, state, elem) {
		// if we currently in fullscreen mode
		if ($.fullscreen.isFullScreen()) {
			$('#fullscreen').css('display', 'none');
		} else {
			$('#fullscreen').css('display', 'block');
		}
		$('#state').text($.fullscreen.isFullScreen() ? '' : 'not');
	});
});
