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
feed.run();

$( function() {
	$( "#accordion" ).accordion({
		collapsible: true,
		active: false,
		heightStyle: "content"
	});
} );

function cycleImages(){
	var $active = $('#slider .active');
	var $next = ($active.next().length > 0) ? $active.next() : $('#slider img:first');
	$next.css('z-index',2);//move the next image up the pile
	$active.fadeOut(300,function(){//fade out the top image
		$active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
		$next.css('z-index',3).addClass('active');//make the next image the top one
	});
}

$(document).ready(function(){
	setInterval('cycleImages()', 3500);
});
