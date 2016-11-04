//Import the object array from the friends.js
var friendList = require('../data/friends.js');

module.exports = function(app){
	
	//JSONify the object array and send it to the /api/friends route
	app.get('/api/friends', function(req, res) {
		res.json(friendList);
	});

	//Post the newly posted member through the /api/friends route
	app.post('/api/friends', function(req,res){
		var newMember = req.body;
		var sumArray = [];

		//Loop to compare each member's scores to those from the new post
		for (i=0; i<friendList.length; i++) {
			var sumVal = 0;
			var compare = friendList[i].scores;

			//Compare the new member's scores to each already existing member's score array
			for (j=0; j<10; j++){
				var intFormat = parseInt(newMember.scores[j]);
				var diff = compare[j] - intFormat;
			
				//Get the absolute value: if the difference is negative, multiply by -1
				if (diff < 0) {
					diff *= -1;
				}

				//Sum the differences' absolute values
				sumVal += diff;
			}
		
			//Create an array for each member's name, photo, and compatibility "sum"
			var friendName = friendList[i].name;
			var friendPic = friendList[i].photo;
			sumArray.push({name: friendName, pic: friendPic, sum: sumVal});
		}

		//Sort the friends array by sum so that the lowest sum (i.e. highest compatibility) is listed first
		sumArray.sort(function(a,b){
			return a.sum - b.sum;
		});

		// sumArray[0] is the match, attach it to the new member's data
		// so that the modal can access its object values
		newMember.match = sumArray[0];
		friendList.push(newMember);
		res.json(newMember);
	});
};