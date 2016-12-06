var feed = new Instafeed({
	get: 'user',
	userId: '3284850548',
	accessToken: '3284850548.1677ed0.26b34edc44fe47a5922cd17a26211ba6',
	sortBy: 'most-recent',
	after: function () {
		console.log("Images retrieved");
	},
	error: function (err) {
		console.log(err);
	}
});

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
		console.log(item);
		$('#itemTitle').text(item.name);
		$('#itemIng').attr("src", item.image_ing.secure_url);
		$('#itemPerks').text(item.properties);
		toTag('#itemPerks');
	}
}


function toTag(target) {
	var text = $(target).html().split(',');
	var newtag = text.map(item => '<span class="label label-success">' + item + '</span> &nbsp; &nbsp;').join('');
	console.log(newtag);
	$(target).html('').append(newtag);
}

function onChangeDetoxItem() {
	$('.slick-next').click(function () {
		loadDetoxData();
	});
	$('.slick-prev').click(function () {
		loadDetoxData();
	});
}

$(document).ready(function () {
	loadAccordion();
	loadDetoxSlider();
	loadDetoxData();
	feed.run();
	onChangeDetoxItem();
});
