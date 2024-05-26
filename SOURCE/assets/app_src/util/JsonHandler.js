/*
  Story-engine with Animate and Create.js
  Copyright © 2024 devjck
  Ce logiciel est distribué sous la licence GNU GPL v3. Pour plus d'informations, consultez le fichier COPYING à la racine de ce projet.
 */

/*

Json Handler
Load and provide external data from basic {id,value} json files

author: JCK

model:
[{
    "id" : "my_value",
    "value" : "42",
    "value2" : "abc",
    "value3" : "xyz",
    "value..."
  }
]

--> in case OF 1 VALUE : return value String
--> in case of >=2 VALUES : return object

!!! WARNING : Don't forget to parseInt() integer results for numbers !!!

*/

define(["dojo/request/xhr", "dojo/store/Memory", "engine/Player"], function(xhr, Memory, Player) {

  var _stores = new Object();

  return {
    
    loadExcel: function (sheet, callback){
      getJsonFromExcelStory(sheet, sheet, callback);
    },
    
    load: function (json_url, store_name, callback) {
      loadJson(json_url, store_name, callback);
    },

    get: function (store_name, id) {
      if (id != undefined) {
        if (_stores[store_name].get(id) != undefined) {
          var result;
          if (Object.keys(_stores[store_name].get(id)).length > 2) {
            result = _stores[store_name].get(id);
          } else {
            result = _stores[store_name].get(id).value;
          }
          return result;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    
    getObj: function (store_name, id) {
      if (id != undefined) {
        if (_stores[store_name].get(id) != undefined) {
          var result;
          result = _stores[store_name].get(id);
          return result;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    
    getLength: function (store_name) {
      return _stores[store_name].data.length;
    },
    
    getId: function (store_name, val) {
      return _stores[store_name].data[val].id;
    },
    
    getLine: function (store_name, line) {
      var res = _stores[store_name].data[line];
      return res;
    }
  };

  function loadJson(json_url, store_name, callback) {
    xhr(json_url, {
      handleAs: "json"
    }).then(function(loaded_data) {
      // -----> create store
      _stores[store_name] = new Memory({data: loaded_data});
      callback();
    }, function(err) {
      console.log("**ERROR** "+ err +"|||FILE:"+json_url);
    });
  }
  
  function getJsonFromExcelStory(sheet, store_name, callback) {
    _stores[store_name] = new Memory({data: Player.getExcelStory()[sheet]});
    if (callback != undefined){
      callback();
    }
  }
});
