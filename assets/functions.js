

function sendStatement(xAPIverbIRI, xAPIverb){
var lrs;

try {
    lrs = new TinCan.LRS(
   {
            endpoint: "<ADD xAPI ENDPOINT>",
            username: "<ADD KEY>",
            password: "<ADD SECRET>",
            allowFail: false
        }
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
                "name": "123456",
                "homePage": "https://atombox.com",
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
                "en-US": "Test"
            },
            "type": "http://adlnet.gov/expapi/activities/media"
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