function loadInstafeed() {
	var feed = new Instafeed({
		get: 'user',
		userId: '3284850548',
		//userId: '6719060',
		//accessToken: '6719060.1677ed0.dfba186d4fe94487801c25abf8615978',
		accessToken: '3284850548.1677ed0.26b34edc44fe47a5922cd17a26211ba6',
		sortBy: 'most-recent',
		template: '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a>',
		resolution: 'low_resolution',
		limit: 4,
		after: function () {
			console.log("Images retrieved");
		},
		error: function (err) {
			console.log(err);
		}
	});
	feed.run();
}

function loadAccordion() {
	$(function () {
		$("#accordion").accordion({
			collapsible: true,
			active: false,
			heightStyle: "content"
		});
	});
}

function cycleImages() {
	var $active = $('#slider .active');
	var $next = ($active.next().length > 0) ? $active.next() : $('#slider img:first');
	$next.css('z-index', 2); //move the next image up the pile
	$active.fadeOut(300, function () { //fade out the top image
		$active.css('z-index', 1).show().removeClass('active'); //reset the z-index and unhide the image
		$next.css('z-index', 3).addClass('active'); //make the next image the top one
	});
}

function loadDetoxSlider() {
	setInterval('cycleImages()', 3500);
	if (top.location.pathname.substr(0, 7) === '/detox/') {
		$('.slider-images').slick({
			dots: true,
			infinite: true,
			speed: 500,
			fade: true,
			cssEase: 'linear',
		});
	}
}

function loadDetoxData() {
	if (top.location.pathname.substr(0, 7) === '/detox/') {
		var $active = $('.slick-current.slick-active');
		var slug = $active[0].alt;
		indexes = $.map(local_data.items, function (obj, index) {
			if (obj.slug == slug) {
				return index;
			}
		})
		firstIndex = indexes[0];
		var item = local_data.items[firstIndex];
		$('#itemTitle').text(item.name);
		$('#itemIng').attr("src", item.image_ing.secure_url);
		$('#itemPerks').text(item.properties);
		$('#itemInfo').text(item.info);
		toTag('#itemPerks');
		toList('#itemInfo');
	}
}


function toTag(target) {
	var text = $(target).html().split(',');
	var newtag = text.map(function(item) {
		return '<span class="label label-success perk-label">' + item + '</span>&nbsp; &nbsp;';
	});
	$(target).html('').append(newtag.join(''));
}

function toList(target) {
	var text = $(target).html().split('-');
	var newtag = text.map(function(item) {
		return item + '<br>';
	});
	$(target).html('').append(newtag.join(''));
}

function onChangeDetoxItem() {
	$('.slick-next').click(function () {
		loadDetoxData();
	});
	$('.slick-prev').click(function () {
		loadDetoxData();
	});
}

function loadModal() {
	// Get the modal
	var modal = document.getElementById('myModal');

	window.onload = function() {
		modal.style.display = "block";
	}

	// Get the <span> element that closes the modal
	var span = $('.close');
	console.log(span);
	// When the user clicks on <span> (x), close the modal
	span.click(function() {
		modal.style.display = "none";
	});

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}

function loadFaq() {
	var image = $('#rightImage');
	$('h4').click(function() {
		var self = $(this);
		var id = self[0].id.substring(self[0].id.length-2,self[0].id.length);
		var contains = $(this).attr('class').indexOf('ui-state-active');
		var arrow = self.find('i');
		if(contains === -1) {
			$('h4>i').removeClass('fa-arrow-down').addClass('fa-arrow-right');
			arrow.removeClass('fa-arrow-right').addClass('fa-arrow-down');
		} else {
			arrow.removeClass('fa-arrow-down').addClass('fa-arrow-right');
		}
		if(id === '-1') {
			image.attr("src", "/images/img/faq_2.png");
			image.removeClass("img-circle");			
		} else if (id === '-9' ) {
			image.attr("src", "/images/img/faq_10.png");
			image.removeClass("img-circle");			
		} else if (id === '10') {
			image.attr("src", "/images/img/faq_11.jpg");
			image.removeClass("img-circle");			
		} else if (id === '11') {
			image.attr("src", "/images/img/faq_12.jpg");
			image.removeClass("img-circle");			
		} else if (id === '12') {
			image.attr("src", "/images/img/faq_13.png");
			image.removeClass("img-circle");			
		} else {
			image.attr("src", "/images/img/Rayito.jpg");
			image.addClass("img-circle");
		}
	});
}

function calculateDetoxPrice() {
	var days = $('.pagination_detox li');
	var total = $('#quantity');
	var link = $('.pagination_detox li a');
	console.log(link);
	days.click(function() {
		switch(this.id) {
			case 'one_day':
				total.html('Total: $500.00');
				break;
			case 'two_day':
				total.html('Total: $900.00');
				break;
			case 'three_day':
				total.html('Total: $1,300.00');
				break;
			case 'four_day':
				total.html('Total: $1,600.00');
				break;
			case 'five_day':
				total.html('Total: $2,000.00');
				break;
			default:
				total.html('Total: $0.00');
				break;
		}
	});
	link.click(function(e) {
		e.preventDefault();
	});
}

$(window).ready(function () {
	loadAccordion();
	loadDetoxSlider();
	if (top.location.pathname.substr(0, 7) === '/detox/') {
		loadDetoxData();
	}
	//console.log(top.location.pathname.substr(0));
	else if (top.location.pathname.substr(0) === '/') {
		loadModal();
		loadInstafeed();
	}
	else if (top.location.pathname.substr(0,4) === '/faq') {
		loadFaq();
	}
	else if (top.location.pathname.substr(0,6) === '/detox') {
		calculateDetoxPrice();
	}
	onChangeDetoxItem();
});
