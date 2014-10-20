var participants = [
	{"no":1,
	"name":"Jose Almada", 
	"age":1, 
	"weight":90.5,
	"heigth":185,
	"sex":"m", 
	"country":"MEX",
	"state":"NL",
	"city":"Monterrey",
	"club":"Shaolin de Mexico",
	"traintime":10,
	"level":"Cinta Negra 3",
	"category":"Avanzado",
	"place":1
	},
	{"no":2,
	"name":"Alberto Almada", 
	"age":10, 
	"weight":81.5,
	"heigth":170,
	"sex":"m", 
	"country":"MEX",
	"state":"NL",
	"city":"Monterrey",
	"club":"Shaolin de Mexico",
	"traintime":0.5,
	"level":"Cinta Blanca 10",
	"category":"Principiante",
	"place":2
	},
	{"no":3,
	"name":"Biby Almada", 
	"age":3, 
	"weight":78,
	"heigth":175,
	"sex":"f", 
	"country":"MEX",
	"state":"NL",
	"city":"Monterrey",
	"club":"Shaolin de Mexico",
	"traintime":1,
	"level":"Cinta Verde 6",
	"category":"Intermedio",
	"place":3
	},
	{"no":4,
	"name":"Ximena Reyes", 
	"age":33, 
	"weight":80,
	"heigth":185,
	"sex":"f", 
	"country":"MEX",
	"state":"NL",
	"city":"Monterrey",
	"club":"Shaolin de Mexico",
	"traintime":3,
	"level":"Cinta Negra 2",
	"category":"Avanzado",
	"place":4
	},
	{"no":5,
	"name":"Enrique Sosa", 
	"age":21, 
	"weight":70,
	"heigth":165,
	"sex":"m", 
	"country":"MEX",
	"state":"NL",
	"city":"Monterrey",
	"club":"Shaolin de Mexico",
	"traintime":3,
	"level":"Cinta Negra 2",
	"category":"Avanzado",
	"place":5
	},
	{"no":6,
	"name":"Ricardo Magallanes", 
	"age":30, 
	"weight":100,
	"heigth":170,
	"sex":"m", 
	"country":"MEX",
	"state":"NL",
	"city":"Monterrey",
	"club":"Shaolin de Mexico",
	"traintime":7,
	"level":"Cinta Negra 2",
	"category":"Avanzado",
	"place":6
	},
	{"no":7,
	"name":"Jose Alvarado", 
	"age":33, 
	"weight":85,
	"heigth":172,
	"sex":"m", 
	"country":"MEX",
	"state":"NL",
	"city":"Monterrey",
	"club":"Shaolin de Mexico",
	"traintime":2,
	"level":"Cinta Roja 3",
	"category":"Avanzado",
	"place":7
	}
];

//If sexMergeAgeLimit falls in between the from/to ages of an age category, the category will
//be divided in two one with the sex diferentiation and another without it
//TODO: An alert should be shown when setting this value as an intermediate age in a category
var sexMergeAgeLimit = 6;

var enforcedCategories = [
{"name":"age","from":4, "to": 150},
{"name":"weight", "from":50, "to": 200},
{"name":"traintime","from":0.3, "to": 100}
];

var categories = [
{"level":1, "name":"age", "subcategories" : [{"from":1, "to": 4},{"from":5, "to": 6},{"from":7, "to": 8},{"from":9, "to": 10},{"from":11, "to": 12},{"from":13, "to": 14},{"from":15, "to": 16},{"from":17, "to": 34},{"from":35, "to": 150}]},
{"level":2, "name":"sex", "subcategories" : ["m","f"]},
{"level":3, "name":"traintime", "subcategories" : [{"from":0, "to": 0.9}, {"from":1, "to": 1.9}, {"from":2, "to": 2.9}, {"from":3, "to": 100}]},
{"level":4, "name":"weight","subcategories" : [{"from":60, "to": 79},{"from":80, "to": 99},{"from":100, "to": 119}]}
];

var graphics = new Array();
//Default type is first and second
var seedTypes = ["firstAndLast","firstAndMiddle","firstAndSecond","random"];

function calculateByes(participantsNo){
	var byes = Math.pow(2,Math.floor(Math.log(participantsNo)/Math.LN2) + 1) - participantsNo;
	return byes;
}

function sortBy(array, prop, asc){
	 array = array.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
}

function createGraphics(cats)
{
	var graphs = new Array();
	
	for(x = 0; x < cats.length; x++)
	{
		cat = cats[x];
		var newGraphs = new Array();
		if(graphs.length != 0)
		{
			$.each(cat.subcategories, function(i, subcat){		
				$.each(graphs, function(ii, gra){
					var newG = new Array();
					newG = $.extend( {}, gra);
					newG[cat.name] = subcat;
					newGraphs.push(newG);
				});		
			});	
		}
		else
		{
			$.each(cat.subcategories, function(i, subcat){
				var graph = new Array();
				graph[cat.name] = subcat;
				newGraphs.push(graph);	
			});	
		}
		
		graphs = newGraphs;
	}

	return graphs;
}

function mergeSexIsMid(sexMergeAgeLimit, ageCategories)
{
	var isIt = false;
	isIt = Enumerable.From(ageCategories).Any("$.from < " + sexMergeAgeLimit + " && $.to > " + sexMergeAgeLimit);
	return isIt;
}

function createMatches(participants, categories, seedType, byeCriteria)
{
	var matches = [{}];
	return matches;
}

//TODO: TEST THIS FUNCTION
function isGraphicValid(graph)
{
	var isValid = true;

	for(x = 0; x < enforcedCategories.length; x++)
	{	
		var enforcedCat = enforcedCategories[x];
		var graphCatValue = graph[enforcedCat.name];
		if( graphCatValue == undefined) { isValid = false; break;}		

		if(enforcedCat.from != undefined && enforcedCat.to != undefined)
		{
			if(!(enforcedCat.from <= graphCatValue && enforcedCat.to >= graphCatValue)) { isValid = false; break; }
		}
		else if(enforcedCat.value != undefined)
		{
			if(!(enforcedCat.value == graphCatValue)){ isValid = false; break; }
		}
	}

	if(graph.traintime != undefined && graph.age != undefined)
	{
		if(graph.traintime > graph.age){ isValid = false;}
	}
	return isValid;
}
console.log(calculateByes(6));
sortBy(participants, "age", true);
console.log(participants);

