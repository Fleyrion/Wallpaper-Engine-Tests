var interval;
var count = 1;

function showImage(imgURLs, delay){
	
	if(imgURLs.constructor === Array){
		$('#image').attr("src",imgURLs[0]);
		interval = setInterval(function (){
			$('#image').attr("src",imgURLs[count]);
			count++;
			if(count > imgURLs.length - 1){
				count = 1;
			}
		},delay);
		
	}
	else{
		$('#image').attr("src",imgURLs);
	}
	
}

function ajaxCall(URL){
	return $.ajax({
		url:URL,
		dataType: "jsonp",
		jsonpCallback: "response"
	});
}

function getImages(json, loop){
	var imgURLs = new Array();
		for (var i = 0; i <= json.length - 1; i++) {
			if(isValidImage(json[i].file_ext)){
				imgURLs[imgURLs.length] = json[i].file_url;
			}	
		}
	if(loop){
		return imgURLs;
	}
	else{
		return imgURLs[0];
	}
}

function getURL(tags, ByScore){
	var orderBy = "random";
	if(ByScore){
		orderBy = "score";
	}
	var url = "https://e621.net/post/index.json?tags=order:"+orderBy+"&limit=320";
	if(tags != ""){
		url = "https://e621.net/post/index.json?tags="+ tags +"+order:"+orderBy+"&limit=320";
	}
	return url;
}

function isValidImage(ext){
	if(ext == 'gif' || ext == 'jpeg' || ext == 'jpg' || ext == 'png' || ext == 'apng' || ext == 'svg' || ext == 'bmp'){
		return true;
	}
	else{
		return false;
	}
}

function newImageRequested(keepSearching, tags, SearchByID, ID, Loop, LoopInterval, ByScore){
	if(keepSearching){
		clearInterval(interval);
		count = 1;
		var URL = getURL(tags, ByScore);
		if (SearchByID)
		{
			URL = "https://e621.net/post/show.json?id="+ID;
		}

		ajaxCall(URL).done(function(json){
			var imgURLs = getImages(json, Loop);
			showImage(imgURLs, LoopInterval);
		});
	}
}