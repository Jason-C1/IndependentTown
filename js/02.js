var incomeRate = {
	free: 3500,
	levels: [{low: 0,high: 1500,rate: 0.03,sub: 0},
			{low: 1500,high: 4500,rate: 0.1,sub: 105},
			{low: 4500,high: 9000,rate: 0.2,sub: 555},
			{low: 9000,high: 35000,rate: 0.25,sub: 1005},
			{low: 35000,high: 55000,rate: 0.30,sub: 2755},
			{low: 55000,high: 80000,rate: 0.35,sub: 5505},
			{low: 80000,high: Number.MAX_VALUE,rate: 0.45,sub: 13505},
	],
	calcMonthTax: function(monthIncome) {
		var tax = 0;
		var left = monthIncome - this.free;
		for(index in this.levels) {
			if(left > this.levels[index].low && left <= this.levels[index].high) {
				tax = left * incomeRate.levels[index].rate - incomeRate.levels[index].sub;
			}
		}
		return tax;
	},
	calcYearEndTax: function(monthIncome, yearIncome) {
		var tax = 0;
		var left;
		if(monthIncome < this.free) {
			left = (yearIncome - (this.free - monthIncome));
		} else {
			left = yearIncome;
		}
 		for(index in this.levels) {
			if(left / 12 > this.levels[index].low && left / 12 <= this.levels[index].high) {
				tax = left * incomeRate.levels[index].rate - incomeRate.levels[index].sub;
			}
		}
		return tax;
	},
};
var printGZ = function(gz, mrnzj) {
	var randMul = Math.floor(Math.random()*17+3);
	var nzj = mrnzj||gz*randMul;
	var monthTax = Math.floor(incomeRate.calcMonthTax(gz)*100)/100;
	var yearEndTax = Math.floor(incomeRate.calcYearEndTax(gz, nzj)*100)/100;
	document.write("月工资" + gz + "元，每月所得税为" + monthTax + "元；年终奖 " + nzj + "元，一次性所得税为" + yearEndTax + "元；全年所得税共计" + (monthTax + yearEndTax) + "元。");
	if (!mrnzj) {
		document.write("\(年终奖为随机生成，为工资的"+randMul+"倍\)");
	}
}
var cmtOutput = function(){
	var outBox = document.getElementById("cmto");
	var inBox = document.getElementById("cmti");
	outBox.innerHTML = incomeRate.calcMonthTax(inBox.value);
}
var cyetOutput = function(){
	var cmti = document.getElementById("cmti");
	var outBox = document.getElementById("cyeto");
	var inBox = document.getElementById("cyeti");
	outBox.innerHTML = incomeRate.calcYearEndTax(cmti.value,inBox.value);
}
