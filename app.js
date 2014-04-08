$(function(){

	var url = "https://jira.aensys.hu/rest/api/2/search?jql=assignee in (currentUser()) AND updatedDate > startOfDay()";
	var $out = $('#out');

	var getData = function(){
		
		$.ajax({
		  dataType: "json",
		  url: url,	  
		  success: function(data){
		  
			var result = '';
			
			data.issues.forEach(function(issue){
				var time = issue.fields.timespent / 3600;
				result += '[https://jira.aensys.hu/browse/' + issue.key + ' ' + issue.fields.summary + '] (' + time + ') [[BR]]';
				
			});
			$out.text(result);
		  },
		  error : function(e, a, b){
			$out.text(b + ', Please log in');
		  }
		});
	
	};
	
	$out.on('focus', function () {
		var elem = this;
		setTimeout(function () { elem.select(); }, 50); //select all text in any field on focus for easy re-entry. Delay sightly to allow focus to "stick" before selecting.
	});

	$('#start').click(getData);

});
