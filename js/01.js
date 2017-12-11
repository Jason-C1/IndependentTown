	//判断素数
	var prime = function(n) {
		if(n==1)return false;
		k = Math.sqrt(n);
		for(i = 2; i <= k; i++) {
			if(n % i == 0)
			return false;
		}
		return true;
	}
	var drawTable = function() {
		d("<table class='primetable'>");
		for(var i = 0; i < 10; i++) {
			d("<tr>");
			for(var j = 1; j <= 10; j++) {
				var num = i * 10 + j;
				if(prime(num)) {
					d("<td class='ttd'>"+num+"</td>");
				} else {
					d("<td class='ftd'>"+num+"</td>");
				}
			}
			d("</tr>");
		}
		d("</table>");
	}
	var d = function(n) {
		document.write(n);
	}