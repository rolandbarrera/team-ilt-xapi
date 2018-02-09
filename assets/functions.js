
var lrsCreds = {
        endpoint: " http://atombox.com/data/xAPI",
        username: "1a039df04becfebff1ec7d30ad15e71b4c31e929",
        password: "af502710ec969e6be77ea45ea9dd9241c2dfa4a9",
        allowFail: false
        }
function sendStatement(xAPIverbIRI, xAPIverb) {
var lrs;

try {
    lrs = new TinCan.LRS(lrsCreds
   
    );
}
catch (ex) {
    console.log("Failed to setup LRS object: " + ex); 
}
var statement = new TinCan.Statement(
    {
    "actor": {
        "name": fName.value,
        "account": {
                "homePage": "http://atombox.com",
        },
        "mbox": 'mailto:'+emailAddress.value,
        "objectType": "Agent"
    },
    "verb": {
        "id": xAPIverbIRI,
        "display": {
            "en-US": xAPIverb
        }
    },
     "object": {

        "id": document.URL,
        "definition": {
            "name": {
                "en-US": "Presenation 101"
            },
            "type": "http://id.tincanapi.com/activitytype/slide-deck"
        },
        "objectType": "Activity"
    }
}
);
lrs.saveStatement(
    statement,
       {
        callback: function (err, xhr) {
            if (err !== null) {
                if (xhr !== null) {
                    console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                    return;
                }
                console.log("Failed to save statement: " + err);
                return;
            }
            console.log("Statement saved");
        }
    }
);}
function sendStatementColor(color){
var lrs;

try {
    lrs = new TinCan.LRS(lrsCreds
   
    );
}
catch (ex) {
    console.log("Failed to setup LRS object: " + ex); 
}
var statement = new TinCan.Statement(
    {
    "actor": {
        "name": fName.value,
        "account": {
                "homePage": "http://atombox.com",
        },
        "mbox": 'mailto:'+emailAddress.value,
        "objectType": "Agent"
    },
    "verb": {
        "id": "http://id.tincanapi.com/verb/selected",
        "display": {
            "en-US": "selected"
        }
    },
     "object": {

        "id": document.URL,
        "definition": {
            "name": {
                "en-US": "Presenation 101"
            },
            "type": "http://id.tincanapi.com/activitytype/slide-deck"
        },
        "objectType": "Activity"
    },
     "result": {
        "response": color
    }  
}
);
lrs.saveStatement(
    statement,
       {
        callback: function (err, xhr) {
            if (err !== null) {
                if (xhr !== null) {
                    console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                    return;
                }
                console.log("Failed to save statement: " + err);
                return;
            }
            console.log("Statement saved");
        }
    }
);}

function getStatementColor() {
    var tincan = new  TinCan({
    recordStores: [lrsCreds]
});
var container =  document.getElementById('response');
//var user = new TinCan.Agent({'mbox' : 'mailto:roland@thirdstring.com'})

//new test section


 //new test section end   

tincan.getStatements({
    //sendActor: true,
    'params' : {
        'limit' : 20,
        'since' : '2018-01-23T16:09:35.469Z',
        //'related_agents' : true,
        
        //'agent' : user
        'verb' : {
            'id' : 'http://id.tincanapi.com/verb/selected'
        },
        // 'activity' : {
        //    'id' : 'http://127.0.0.1:52720/index.html'
       // }
        'activity' : {
            'id' : 'file:///Users/rbarrera/Documents/GitHub/team-ilt-xapi/index.html#/2'
            
        } 
    },
    'callback': function (err, result) {
        if (result.statements.length > 0) {
            statementFound = true;
	 //Insert authoring tool specific code here.
        }
        //     container.innerHTML = (err != null ? 'ERROR' : parseMyData(result));
        container.innerHTML = (parseMyData(result));
         //     container.innerHTML = (err != null ? 'ERROR' : parseMyData(result));
       // container2.innerHTML = (parseMyData2(result));
    }
});
parseMyData = function(result) {
            var statements = result.statements;
            var output = '';
            var name,verb,activity,id;
            for(var i=0;i<statements.length;i++){
                // check the statement for a usable name value
                // (priority = actor.name, actor.mbox, actor.account.name)
                if(statements[i].actor.name != null && statements[i].actor.name != "") {
                    name = statements[i].actor.name
                }
                // check the statement for a usable verb value
                // (priority = verb.display['en-US'], verb.id)
                try{
                    verb = statements[i].verb.display['en-US'];
                }catch(e){
                    verb = statements[i].verb.id;
                }
                // check the activity for a usable value
                // (priority = definition.name['en-US'], id)
                try{
                    activity = statements[i].result.response;
                }catch(e){
                    activity = statements[i].result.response;
                }
                try{
                    id = statements[i].id;
                }catch(e){
                    id = statements[i].id;
                }
                output +=   name + ' -- ' + verb + ' -- ' + 
                            activity + ' -- '+ id +' <br> '
                           
            }
            return output;
        }


}
