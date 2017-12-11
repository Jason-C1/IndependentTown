$(function() {
	var game = {
		allImg: ["001", "002", "003", "004", "005", "006", "007", "008", "009", "010",
		"011", "012", "013", "014", "015", "016", "017", "018", "019", "020",],
		headNum: [],
		answerNum: [],
		backImg:"back",
		unknown:0,
		action:false,
		exchangeTimes:0,
		correctTimes:0,
		score:0,
		passCorrect:3,
		time:{
			minute:0,
			second:0,
			time:00+":"+00,
			start:function(){
				game.time.timer=setInterval(function(){
					game.time.second++;
					if (game.time.second>60) {
						game.time.minute++;
						game.time.second=0;
					}
					if (game.time.minute<10&&game.time.minute>=0) {
						game.time.time="0"+game.time.minute+":";
					}else{
						game.time.time=game.time.minute+":";
					}
					if (game.time.second<10&&game.time.second>=0){
						game.time.time+="0"+game.time.second;
					}else{
						game.time.time+=game.time.second;
					}
					$(".timer").html(game.time.time);
				},1000);
			},
			stop:function(){
				clearTimeout(game.time.timer);
				game.time.minute=0;
				game.time.second=0;
				game.time.time="00:00";
				$(".timer").html(game.time.time);

			},
		},
		getrandom: function() {
			for(i = 0; i < 4;) {
				var temp = Math.floor(Math.random() * this.allImg.length);
				j = 0;
				for(; j < this.headNum.length; j++) {
					if(this.headNum[j] == temp) break;
				}
				if(j < this.headNum.length) continue;
				this.headNum[i] = temp;
				this.answerNum[i] = temp;
				i++;
			}
		},
		cahngeHead:function(){
			var temp;
			var a = Math.floor(Math.random() * 4);
			var b = Math.floor(Math.random() * 4);
			temp = game.headNum[a];
			game.headNum[a] = game.headNum[b];
			game.headNum[b] = temp;
			$(".center .show").append("<div class='process'>"+(a+1)+"←→"+(b+1)+"</div>");
		},
		showflag: function() {
			$(".flag").html("猜猜我是谁").insertAfter($(".head .item" + (game.unknown + 1))).css('display','block');
			game.cahngeHead();
		},
		hideflag: function(str=" ") {
			$(".flag").css('display','none'); 
			$(".center .show").html(str);
		},
		pass:function(){
			var result;
			game.time.stop();
			game.hideflag();
			$(".pass").css('display','none'); 
			if(game.score>50){
				game.score=50;
			}
			if(game.time.minute>5){
				result=5;
			}else{
				result=game.time.minute;
			}
			result = Math.floor(game.score/5/(result+1));
			console.log(game.score/5/(result+1));
			console.log(result);
			if (result>5) {result=5;}
			for (var i = 1; i <= result; i++) {
				$(".star" + i).attr("src", "img/star_good.png");
			}
			game.exchangeTimes=0;
			game.correctTimes=0;
			game.score=0;
			game.action=false;

			$(".pass").css('display','block'); 
		},
		reset: function(event) {
			game.getrandom();
			for(i = 0; i < 4; i++) {
				$(".item" + (i + 1)).attr("src", "img/minions/" + game.allImg[game.headNum[i]] + ".png");
			}
			for (var i = 1; i <= 5; i++) {
				$(".star" + i).attr("src", "img/star_error.png");
			}
			game.exchangeTimes=0;
			game.time.stop();
			game.hideflag();
			game.correctTimes=0;
			game.score=0;
			game.action=false;
			$(".pass").css('display','none'); 
		},
		start: function(event) {
			for(i = 0; i < 4;i++) {
				game.headNum[i] = game.answerNum[i];
			}
			$(".head .xitem").attr("src", "img/minions/" + game.backImg + ".png");
			for (var i = 1; i <= 5; i++) {
				$(".star" + i).attr("src", "img/star_error.png");
			}
			game.time.stop();
			game.hideflag();
			game.exchangeTimes=0;
			game.time.start();
			game.action=true;
			game.score=0;
			game.correctTimes=0;
			game.exchange();
			$(".pass").css('display','none'); 
		},
		exchange: function(event) {
			if (game.action==false) {
				$(".center .show").html("<div>请开始你的表演</div><div>点击“计时”</div>");
				return;
			}
			$(".head .xitem").attr("src", "img/minions/" + game.backImg + ".png");
			$(".flag").css('display','none'); 
			game.unknown = Math.floor(Math.random() * 4);
			game.showflag();
			game.score++;
			game.exchangeTimes++;
		},
		answer:function(answer){
			if (game.action==false) {
				$(".center .show").html("<div>请开始你的表演</div><div>请点击“计时”</div>");
				return;
			}
			if (game.exchangeTimes<2) {
				$(".flag").html("多换几次吧<br/>请点击“调换”");
				return;
			}
			if (game.answerNum[answer]==game.headNum[game.unknown]) {
				$(".head .item" + (game.unknown + 1)).attr("src", "img/minions/" + game.allImg[game.headNum[game.unknown]] + ".png");
				game.correctTimes++;
				if(game.passCorrect==game.correctTimes){
					game.pass();
				}else{
					$(".flag").html("贼鸡儿机智!!<br/>再对"+(game.passCorrect-game.correctTimes)+"次<br/>将为你表现评分<br/>点击“调换”");
				}
				game.score++;
				game.exchangeTimes=1;
			}else{
				$(".flag").html("哎呀错啦~");
				game.exchangeTimes=1;
			}
		},

	}
	game.reset();//初始化
	$("#reset").on('click', game.reset);
	$("#exchange").on('click', game.exchange);
	$("#start").on('click', game.start);
	$(".answer .item1").on('click', function(){game.answer(0);});
	$(".answer .item2").on('click', function(){game.answer(1);});
	$(".answer .item3").on('click', function(){game.answer(2);});
	$(".answer .item4").on('click', function(){game.answer(3);});
});