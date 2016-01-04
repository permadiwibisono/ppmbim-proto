'use strict';
angular.module('services',[])
.factory('MasterKitab', function(){
	var masterKitab=[
	{
		id:'K001',
		Name:'Kitabussholah',
		Target:20
	},
	{
		id:'K002',
		Name:'Kitab Adab',
		Target:15
	},
	{
		id:'K003',
		Name:'Kitab Adillah',
		Target:12
	},
	];
	return{
		getList:function(){
			return masterKitab;
		},
		getById: function(kitabId){
	      for (var i = 0; i < masterKitab.length; i++) {
	        if (masterKitab[i].id === kitabId) {
	          return masterKitab[i];
	        }
	      }
	      return null;
		}
	};

})
.factory('Siswas', function(){
	var siswaList=[{
    	id:1,
    	Nama:'Andi Marjono',
    	Gender:'Pria',
    	Universitas:'STAN',
    	Alamat:'Alamat rumah',
    	Phone:'',
    	Ayah:'',
    	Ibu:'',
    	Umur:0
    },{
    	id:2,
    	Nama:'Doni Febrian',
    	Gender:'Pria',
    	Universitas:'STAN',
    	Alamat:'Alamat rumah',
    	Phone:'',
    	Ayah:'',
    	Ibu:'',
    	Umur:0
    },{
    	id:3,
    	Nama:'Permadi Wibisono',
    	Gender:'Pria',
    	Universitas:'STAN',
    	Alamat:'Alamat rumah',
    	Phone:'',
    	Ayah:'',
    	Ibu:'',
    	Umur:0
    }
    ];
	return{
		getList:function(){
			return siswaList;
		},
		add:function(siswa){
			siswaList.push(siswa);
		},
		update:function(siswa){
	      for (var i = 0; i < siswaList.length; i++) {
	        if (siswaList[i].id === parseInt(siswa.id)) {
	          return siswaList[i]=siswa;
	        }
	      }
		},
		getLastId: function(){
			var lastid=0;
	      for (var i = 0; i < siswaList.length; i++) {
	        var getid=siswaList[i].id;
	        var numb=parseInt(getid);
	        if (lastid<numb) {
	        	lastid=numb;
	        }
	      }
	      return lastid;
		},
		remove:function(index){
			siswaList.slice(siswaList,index);
		},
		getById: function(siswaId){
	      for (var i = 0; i < siswaList.length; i++) {
	        if (siswaList[i].id === parseInt(siswaId)) {
	          return siswaList[i];
	        }
	      }
	      return null;
		}
	};

})
.factory('Journals', function(MasterKitab,$log){
	var JournaList=[{
    	id:'J001',
    	UserId:1,
    	kitabId:'K001',
    	hal:2,
    	checked:true
    },{
    	id:'J002',
    	UserId:1,
    	kitabId:'K001',
    	hal:4,
    	checked:true
    },
    ];
	return{
		getList:function(){
			return JournaList;
		},
		add:function(journal){
			JournaList.push(journal);
		},
		remove:function(index){
			JournaList.slice(JournaList,index);
		},
		update:function(journal){
	      for (var i = 0; i < JournaList.length; i++) {
	        if (JournaList[i].id === journal.id) {
	          return JournaList[i]=journal;
	        }
	      }
		},
		getByUserId: function(siswaId){
			var list=new Array();
	      for (var i = 0; i < JournaList.length; i++) {
	        if (JournaList[i].UserId === parseInt(siswaId)) {
	          list.push(JournaList[i]);
	        }
	      }
	      return list;
		},
		getById: function(Id){
			var list=new Array();
	      for (var i = 0; i < JournaList.length; i++) {
	        if (JournaList[i].id === Id) {
	          list.push(JournaList[i]);
	        }
	      }
	      return list;
		},
		getLastId: function(){
			var lastid=0;
	      for (var i = 0; i < JournaList.length; i++) {
	        var getid=JournaList[i].id.substr(1,JournaList[i].id.length-1);
	        var numb=parseInt(getid);
	        if (lastid<numb) {
	        	lastid=numb;
	        }
	      }
	      return lastid;
		},
		getByUserIdKitabId: function(siswaId,kitabId){
			var list=new Array();
			var kitab=MasterKitab.getById(kitabId);
	      for (var i = 0; i < kitab.Target; i++) {
	      	var found=false;
	      	for(var j=0;j<JournaList.length;j++)
	      	{
		        if (JournaList[j].UserId === parseInt(siswaId) && JournaList[j].kitabId===kitabId&&JournaList[j].hal===i+1) {
				
			$log.warn(JournaList);
		          list.push(JournaList[j]);
		          found=true;
		          break;
		        }
	      	}
	      	if (!found) {
	      		var newjournal={
		    		id:'',
			    	UserId:parseInt(siswaId),
			    	kitabId:kitabId,
			    	hal:i+1,
		    		checked:false
	    		};
	      		list.push(newjournal);
	      	}
	      }
	      return list;
		}
	};

})
;