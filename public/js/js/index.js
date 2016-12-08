function loadInstafeed() {
	var feed = new Instafeed({
		get: 'user',
		//userId: '3284850548',
		userId: '6719060',
		accessToken: '6719060.1677ed0.dfba186d4fe94487801c25abf8615978',
		//accessToken: '3284850548.1677ed0.26b34edc44fe47a5922cd17a26211ba6',
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
		toTag('#itemPerks');
	}
}


function toTag(target) {
	var text = $(target).html().split(',');
	var newtag = text.map(function(item) {
		return '<span class="label label-success">' + item + '</span>&nbsp; &nbsp;';
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

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal 
	window.onload = function() {
		modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}

$(window).ready(function () {
	loadAccordion();
	loadDetoxSlider();
	if (top.location.pathname.substr(0, 7) === '/detox/') {
		loadDetoxData();
	}
	console.log(top.location.pathname.substr(0));
	if (top.location.pathname.substr(0) === '/') {
		loadModal();
		loadInstafeed();
	}
	onChangeDetoxItem();
});
