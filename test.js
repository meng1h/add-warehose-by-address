
var mongodb = require('mongodb');

var server = new mongodb.Server("localhost",27017,{
   auto_reconnect : true
}) ;

var conn = new mongodb.Db("my-address-add",server,{
   safe : true
}) ;

//样例
var nihao =    
    {"name":"河北省", 
      children: [
        { 
          "name":"保定市", 
          children:[
            {"name":"涿州市"},
            {"name":"高碑店市"}
          ]
        }
        ,{ 
          "name":"衡水市", 
          children:[
          {"name":"五一"},
          {"name":"景县"}
        ]}
      ]
    };



conn.open(function(error,db){
  if(error) throw error ;
  db.collection("xbm-toulai",{
       safe : true
  },function(err,collection){
    collection.find({},{"_id":false}).toArray(function(e,doc){
      // console.log(doc[0]);

      var provinces = doc[0] ;
      //console.log(provinces);

      // console.log(provinces[北京])

      // console.log(provinces.length);

      for(var province in provinces){
        console.log(province);

        citys =provinces[province]
        //console.log(citys)

        for(var city in citys){
          console.log(city);

          var areas = citys[city];

          for(area in areas ){
            console.log(areas[area]);
          }
        }
 
      }
      // }
      // console.log(doc[0].河北省.保定市);
      // for(var tmp in doc[0]){
      //   console.log(doc[0]);
      // }

    }) ; 
  }) ;
}) ;

// conn.open(function(error,db){
//    if(error) throw error ;
//    db.collection("basic-address-1",{
//        safe : true
//    },function(err,collection){
//       if(err) throw err ;
//       collection.find().toArray(function(e,docs){
//       console.log(1);

//       for( var i=0; i<docs.length ; i++){
//         //console.log(i);
//         var provincename = docs[i].name;//河北省
//         var citys = docs[i].city;//



//         for (var j=0;j<citys.length ;j++){
//           var cityname = citys[j].name;
//           var areas= citys[j].area;
//           //console.log(area);

//           for(var k=0;k<areas.length;k++){
//             var areaname = areas[k];
//             docs[i].city[j].area[k] = {"name": areaname};

//             collection.save(docs[i].city[j].area[k]);
//             console.log(areaname);
            
//           }
//         }
//       }
         
//      }) ; 
//    }) ;
// }) ;
// // 