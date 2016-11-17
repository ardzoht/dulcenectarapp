var feed = new Instafeed({
	get:'user',
  userId: '3284850548',
  accessToken: '3284850548.1677ed0.26b34edc44fe47a5922cd17a26211ba6',
	sortBy: 'most-recent',
	after: function() {
		console.log("Images retrieved");
	},
	error: function(err) {
		console.log(err);
	}
});

function loadAccordion() {
	$( function() {
		$( "#accordion" ).accordion({
			collapsible: true,
			active: false,
			heightStyle: "content"
		});
	} );
}



function loadDetoxSlider() {
	$('.slider-images').slick({
		dots:true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
	});
}

function loadDetoxData() {
	var $active = $('.slick-current.slick-active');
	var slug = $active[0].alt;
	indexes = $.map(local_data.items, function(obj, index) {
		if(obj.slug == slug) {
			return index;
		}
	})
	firstIndex = indexes[0];
	var item = local_data.items[firstIndex];
	$('#itemTitle').text(item.name);
	$('#itemDescription').text(item.description);
}

function onChangeDetoxItem() {
	$('.slick-next').click(function() {
		loadDetoxData();
	});
}

$(document).ready(function(){
	loadAccordion();
	loadDetoxSlider();
	loadDetoxData();
	feed.run();
	onChangeDetoxItem();
});
