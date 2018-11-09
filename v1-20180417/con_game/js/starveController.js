gameModule.controller('starveToolController', ['$scope', function($scope){
        var toolObj = [
            {
                name : "1",
                list : [
                    {
                        "cName" : "c1-1",
                        "eName" : "e1-1",
                        "type" : 0,
                        "txt" : "more txt"
                    },{
                        "cName" : "c1-2",
                        "eName" : "e1-2",
                        "type" : 1,
                        "txt" : "more txt"
                    }
                ]
            },
            {
                name : "2",
                list : [
                    {
                        "cName" : "c2-1",
                        "eName" : "e2-1",
                        "type" : 1,
                        "txt" : "more txt"
                    },{
                        "cName" : "c2-2",
                        "eName" : "e2-2",
                        "type" : 2,
                        "txt" : "more txt"
                    }
                ]
            }
        ];

        $scope.toolObj = toolObj;
        console.log("饥荒小百科");
    }]);
