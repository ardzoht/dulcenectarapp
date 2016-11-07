var feed = new Instafeed({
	get:'user',
  userId: '3284850548',
  accessToken: '3284850548.1677ed0.26b34edc44fe47a5922cd17a26211ba6',
	sortBy: 'most-recent',
	after: () => {
		console.log("Images retrieved");
	},
	error: (err) => {
		console.log(err);
	}
});
feed.run();

$( function() {
	$( "#accordion" ).accordion({
		collapsible: true,
		active: false
	});
} );

