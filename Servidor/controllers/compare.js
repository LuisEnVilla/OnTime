var express = require('express');
var router = express.Router();

router.get('/:id/:id2/:tipo', function(req, res) {
	if (req.params.tipo == "funcionarios"){
		db.viaje.find({Funcionario_id: req.params.id}).count(function (err, count1){
			  	if (err) res.send(500, err.message);
			  	db.viaje.find({Funcionario_id: req.params.id},"GastoPasaje CostoHospedaje GastosViaticos Aclaraciones TarifaDiaria Moneda FechaFin FechaInicio Destino Funcionario_id").populate('Funcionario_id').exec(function (err, datos1){
					db.viaje.find({Funcionario_id: req.params.id2}).count(function (err, count2){
						if (err) res.send(500, err.message);
						db.viaje.find({Funcionario_id: req.params.id2},"GastoPasaje CostoHospedaje GastosViaticos Aclaraciones TarifaDiaria Moneda FechaFin FechaInicio Destino Funcionario_id").populate('Funcionario_id').exec(function (err, datos2){  	
						  	if(err) return res.send(500, err.message);
						  	var totalpasajes1 = 0
							var totalviaticos1 = 0
							var toatlhospedaje1 = 0
							var totalpasajes2 = 0
							var totalviaticos2 = 0
							var toatlhospedaje2 = 0
							for (x in datos1){
								if (!isNaN(datos1[x].GastoPasaje)) totalpasajes1 += datos1[x].GastoPasaje
								if (!isNaN(datos1[x].GastosViaticos)) totalviaticos1 += datos1[x].GastosViaticos
								if (!isNaN(datos1[x].CostoHospedaje)) toatlhospedaje1 += datos1[x].CostoHospedaje
							}
							for (x in datos2){
								if (!isNaN(datos2[x].GastoPasaje)) totalpasajes2 += datos2[x].GastoPasaje
								if (!isNaN(datos2[x].GastosViaticos)) totalviaticos2 += datos2[x].GastosViaticos
								if (!isNaN(datos2[x].CostoHospedaje)) toatlhospedaje2 += datos2[x].CostoHospedaje
							}
							var total1 = toatlhospedaje1 + totalviaticos1 + totalpasajes1
							var total2 = toatlhospedaje2 + totalviaticos2 + totalpasajes2
								var totales ={
									totalpasajes1 : totalpasajes1,
									totalviaticos1 : totalviaticos1,
									toatlhospedaje1 : toatlhospedaje1,
									total1 : total1,
									totalpasajes2 : totalpasajes2,
									totalviaticos2 : totalviaticos2,
									toatlhospedaje2 : toatlhospedaje2,
									total2 : total2
								}
								var grafica1 = "{ chart: { plotBackgroundColor: null, plotBorderWidth: 0, plotShadow: false }, title: { text: 'Total de Gastos $ "+(total1+total2)+"', align: 'center', verticalAlign: 'top', y: 50 },subtitle: {text: 'Fuente IFAI'}, tooltip: { pointFormat: '{series.name}:{point.percentage:.1f}%' }, plotOptions: { pie: { dataLabels: { enabled: true, distance: -50, style: { color: 'white', textShadow: '0px 1px 2px black' } }, startAngle: -90, endAngle: 90,center: ['50%', '75%']}},series: [{type: 'pie',name: 'Porcentaje',innerSize: '50%',data: [{name: '"+datos1[0].Funcionario_id.Nombre.Nombres+" $"+total1+"',y: "+total1+",color: '#80cbc4'},{name: '"+datos2[0].Funcionario_id.Nombre.Nombres+" $"+total2+"',y: "+total2+",color:'#4db6ac'}]}]}"
								var grafica12 = "{ chart: { plotBackgroundColor: null, plotBorderWidth: 0, plotShadow: false }, title: { text: 'Total de Viajes "+(count1+count2)+"', align: 'center', verticalAlign: 'top', y: 50 },subtitle: {text: 'Fuente IFAI'}, tooltip: { pointFormat: '{series.name}:{point.percentage:.1f}%' }, plotOptions: { pie: { dataLabels: { enabled: true, distance: -50, style: { color: 'white', textShadow: '0px 1px 2px black' } }, startAngle: -90, endAngle: 90,center: ['50%', '75%']}},series: [{type: 'pie',name: 'Viajes',innerSize: '50%',data: [{name: '"+datos1[0].Funcionario_id.Nombre.Nombres+" "+count1+"',y: "+count1+",color: '#80cbc4'},{name: '"+datos2[0].Funcionario_id.Nombre.Nombres+" "+count2+"',y: "+count2+",color:'#4db6ac'}]}]}"
								var grafica2 = "{chart: {type: 'bar'},title: {text: 'Gastos por seccion'},subtitle: {text: 'Fuente IFAI'},xAxis: {categories: ['"+datos1[0].Funcionario_id.Nombre.Nombres+"', '"+datos2[0].Funcionario_id.Nombre.Nombres+"'],title: {text: null}},yAxis: {min: 0,title: {text: 'Pesos MXP',align: 'high'},labels: {overflow: 'justify'}},tooltip: {valueSuffix: ' Pesos'},plotOptions: {bar: {dataLabels: {enabled: true}}},legend: {layout: 'vertical',align: 'right',verticalAlign: 'top',x: -40,y: 10,floating: true,borderWidth: 1,backgroundColor:  '#FFFFFF',shadow: true},credits: {enabled: false},series: [{name: 'Gastos en Hospedaje',color: '#b2dfdb',data: ["+toatlhospedaje1+", "+toatlhospedaje2+"]}, {name: 'Gastos en Viaticos',color:'#80cbc4',data: ["+totalviaticos1+", "+totalviaticos2+"]}, {name: 'Gastos en Pasaje',color: '#26a69a',data: ["+totalpasajes1+", "+totalpasajes2+"]}]}"
						  		var link = {
						  			url:"http://checktrips.jit.su/compare/" + req.params.id +"/"+req.params.id2 + "/"+req.params.tipo
						  		}
						  		res.render('compare',{count1:count1, count2:count2, datos1:datos1,datos2:datos2, totales:totales,grafica1:grafica1,grafica2:grafica2,grafica12:grafica12, tipo:1,link:link});
						});
					});
			  });
		});
	}
	else if (req.params.tipo == "viaje"){
	  	db.viaje.find({Consecutivo : req.params.id},"ViaticosComp ViaticosNoComp ViaticosDevueltos Tema MecanismoOrigen TarifaDiaria Consecutivo GastoPasaje CostoHospedaje GastosViaticos Aclaraciones  Moneda FechaFin FechaInicio Destino Funcionario_id").populate('Funcionario_id').exec(function (err, datos1){
			db.viaje.find({Consecutivo: req.params.id2},"ViaticosComp ViaticosNoComp ViaticosDevueltos Tema MecanismoOrigen TarifaDiaria Consecutivo GastoPasaje CostoHospedaje GastosViaticos Aclaraciones  Moneda FechaFin FechaInicio Destino Funcionario_id").populate('Funcionario_id').exec(function (err, datos2){  	
			  	if(err) return res.send(500, err.message);
			  	var totalpasajes1 = 0
				var totalviaticos1 = 0
				var toatlhospedaje1 = 0
				var totalpasajes2 = 0
				var totalviaticos2 = 0
				var toatlhospedaje2 = 0
				for (x in datos1){
					if (!isNaN(datos1[x].GastoPasaje)) totalpasajes1 += datos1[x].GastoPasaje
					if (!isNaN(datos1[x].GastosViaticos)) totalviaticos1 += datos1[x].GastosViaticos
					if (!isNaN(datos1[x].CostoHospedaje)) toatlhospedaje1 += datos1[x].CostoHospedaje
				}
				for (x in datos2){
					if (!isNaN(datos2[x].GastoPasaje)) totalpasajes2 += datos2[x].GastoPasaje
					if (!isNaN(datos2[x].GastosViaticos)) totalviaticos2 += datos2[x].GastosViaticos
					if (!isNaN(datos2[x].CostoHospedaje)) toatlhospedaje2 += datos2[x].CostoHospedaje
				}
				var total1 = toatlhospedaje1 + totalviaticos1 + totalpasajes1
				var total2 = toatlhospedaje2 + totalviaticos2 + totalpasajes2
				var totales ={
					totalpasajes1 : totalpasajes1,
					totalviaticos1 : totalviaticos1,
					toatlhospedaje1 : toatlhospedaje1,
					total1 : total1,
					totalpasajes2 : totalpasajes2,
					totalviaticos2 : totalviaticos2,
					toatlhospedaje2 : toatlhospedaje2,
					total2 : total2
				}
					var grafica1 = "{ chart: { plotBackgroundColor: null, plotBorderWidth: 0, plotShadow: false }, title: { text: 'Total de Gastos $ "+(total1+total2)+"', align: 'center', verticalAlign: 'top', y: 50 },subtitle: {text: 'Fuente IFAI'}, tooltip: { pointFormat: '{series.name}:{point.percentage:.1f}%' }, plotOptions: { pie: { dataLabels: { enabled: true, distance: -50, style: { color: 'white', textShadow: '0px 1px 2px black' } }, startAngle: -90, endAngle: 90,center: ['50%', '75%']}},series: [{type: 'pie',name: '$',innerSize: '50%',data: [{name: '"+datos1[0].Consecutivo+"',y: "+total1+",color: '#80cbc4'},{name: '"+datos2[0].Consecutivo+"',y: "+total2+",color:'#4db6ac'}]}]}"
					var grafica12 = "{ chart: { plotBackgroundColor: null, plotBorderWidth: 0, plotShadow: false }, title: { text: 'Total Aclaraciones Solicitadas', align: 'center', verticalAlign: 'top', y: 50 },subtitle: {text: 'Fuente IFAI'}, tooltip: { pointFormat: '{series.name}:{point.percentage:.1f}%' }, plotOptions: { pie: { dataLabels: { enabled: true, distance: -50, style: { color: 'white', textShadow: '0px 1px 2px black' } }, startAngle: -90, endAngle: 90,center: ['50%', '75%']}},series: [{type: 'pie',name: '$',innerSize: '50%',data: [{name: '"+datos1[0].Consecutivo+" "+datos1[0].Aclaraciones+"',y: "+datos1[0].Aclaraciones+",color: '#80cbc4'},{name: '"+datos2[0].Consecutivo+" "+datos2[0].Aclaraciones+"',y: "+datos2[0].Aclaraciones+",color:'#4db6ac'}]}]}"
					var grafica2 = "{chart: {type: 'bar'},title: {text: 'Gastos por seccion'},subtitle: {text: 'Fuente IFAI'},xAxis: {categories: ['"+datos1[0].Consecutivo+"', '"+datos2[0].Consecutivo+"'],title: {text: null}},yAxis: {min: 0,title: {text: 'Pesos MXP',align: 'high'},labels: {overflow: 'justify'}},tooltip: {valueSuffix: ' Pesos'},plotOptions: {bar: {dataLabels: {enabled: true}}},legend: {layout: 'vertical',align: 'right',verticalAlign: 'top',x: -40,y: 10,floating: true,borderWidth: 1,backgroundColor:  '#FFFFFF',shadow: true},credits: {enabled: false},series: [{name: 'Gastos en Hospedaje',color: '#b2dfdb',data: ["+toatlhospedaje1+", "+toatlhospedaje2+"]}, {name: 'Gastos en Viaticos',color:'#80cbc4',data: ["+totalviaticos1+", "+totalviaticos2+"]}, {name: 'Gastos en Pasaje',color: '#26a69a',data: ["+totalpasajes1+", "+totalpasajes2+"]}]}"
					var link = {
						url: "http://checktrips.jit.su/compare/" + req.params.id +"/"+req.params.id2 + "/"+req.params.tipo
					}
					res.render('compare',{datos1:datos1,datos2:datos2, totales:totales,grafica1:grafica1,grafica2:grafica2,grafica12:grafica12, tipo:0,link:link});
			});
		});
	}
	else{
		return res.send(404, err.message);
	}

  
});

module.exports = router;