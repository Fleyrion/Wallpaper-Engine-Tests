var tags = "";
var keepSearching = true;
var ID = "";
var SearchByID = false;
var Loop = false;
var LoopInterval = 60000;
var ByScore = false;

$(document).ready(function(){
	window.wallpaperPropertyListener = { 
		applyUserProperties: function(properties) {
			if (properties.Tags) { 
				tags = properties.Tags.value; 
			}
			if (properties.TagID) { 
				ID = properties.TagID.value;
				if(ID != ""){
					SearchByID = true;
				}
				else{
					SearchByID = false;
				}
			}
			if (properties.KeepSearching) { 
				keepSearching = properties.KeepSearching.value; 
			}
			if (properties.OrderByScore) { 
				ByScore = properties.OrderByScore.value; 
			}
			if (properties.Loop) { 
				Loop = properties.Loop.value; 
			}
			if (properties.LoopInterval) { 
				LoopInterval = properties.LoopInterval.value; 
			}
		} 
	};

	if (tags == "")
	{
		tags= "rating:safe+animated"
	}
	newImageRequested(keepSearching, tags, SearchByID, ID, Loop, LoopInterval, ByScore);
});

$('#image').on('mousedown',function(){
	newImageRequested(keepSearching, tags, SearchByID, ID, Loop, LoopInterval, ByScore);
});

