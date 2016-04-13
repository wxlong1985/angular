function splitNodeCtrl($scope, $window, $location, $http, splitNodeDate, getListService) {
    $scope.splitType = "RANDOM";
    $scope.splitNodeId = "";
    $scope.splitName = "";
    $scope.splitRemark = "";
    $scope.getCurrentClass = function (str) {
        if (this.splitType == str) {
            return "cur";
        }
    };
    $scope.splitSmt = function () {
        if (!$scope.splitName) {
            return false;
        }
        $("#splitForm").validate({
            rules: {
                name: "required",
                percentage: {
                    required: true,
                    number: true
                }
            },
            messages: {
                name: "拆分组名称必填",
                percentage: {
                    required: "拆分比例必填",
                    number: "请输入正整数"
                }
            },
            submitHandler: function () {
                $scope.splitSave();
            },
            errorPlacement: function (error, element) {
                if (element.is(":text")) {
                    var top = element.position().top;
                    var left = element.position().left;
                    element.after(error);
                    var inputW = parseInt(element.outerWidth());
                    error.css({"position": "absolute", "left": left + inputW + 30, "top": top + 4, "padding-left": 16});
                    var color = element.css("borderColor");
                    element.css({"borderColor": "red"});
                    error.click(function () {
                        error.remove();
                        element.css({"borderColor": color});
                        element.focus();
                    });
                    element.click(function () {
                        error.remove();
                        element.css({"borderColor": color});
                    });

                    angular.forEach($scope.randomSplit.partPercentage, function (data, i) {
                        s;
                        $scope.$watch('randomSplit.partPercentage[' + i + '].percentage', function (newVal, oldVal) {
                            var str = element.attr('name');
                            var num = str.charAt(str.length - 1) - 1;
                            if (newVal <= 100 && num == i) {
                                element.css({"borderColor": '#d9d9d9', "borderWidth": 1});
                            }
                            else if (newVal > 100 && num == i) {
                                element.css({"borderColor": "red", "borderWidth": 2});
                            }
                        })
                    })
                }
            }
        });
        $("#splitForm").submit();
    };
    $scope.splitSave = function () {
        var obj = {};
        obj.name = $scope.splitName;
        obj.remark = $scope.nodecomment;
        obj.type = $scope.splitType;
        if ($scope.splitType == "RANDOM") {
            obj.partPercentage = $scope.randomSplit.save();
            if ($("#randomTotal").hasClass("error")) {
                return false;
            }
            //判断重名
            if ($scope.randomSplit.clearAryObj(obj.partPercentage)) {
                $scope.splitGroupNameMatchFalg = true;
                return null;
            } else {
                $scope.splitGroupNameMatchFalg = false;
            }
        }
        var element = angular.element(".splitSmtButton");
        var callback = function () {
            //关闭窗口
            disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue(element);
            angular.element("#nodeContent").hide();
            angular.element(".yunat_maskLayer:last").remove();
            //刷新画布
            $scope.refreshGraph();
        };
        disposeCommMethod.shuyunAjaxButtonClickMethod(function () {
            splitNodeDate.post(graph.nodeId, obj, callback, element);
        }, element);
    };
    //打开节点获取数据
    $scope.getSplitData = function (nodeId) {
        var callback = function (data) {
            $scope.splitNodeId = data.nodeId;
            $scope.splitName = data.name;
            $scope.nodecomment = data.remark;
            if (data.type == null) {
                data.type = "RANDOM";
            }
            $scope.splitType = data.type;
            if (data.type == "RANDOM") {
                $scope.randomSplit.partPercentage = data.partPercentage || [{
                        "index": 1,
                        "name": "拆分1",
                        "percentage": 100
                    }];
            }
        };
        splitNodeDate.get(nodeId, callback);

        getListService.getNodeTipsByType(function (responseTips) { // 获取tips
            $scope.splitRemark = responseTips.tips || "";
        }, "tfiltersplit");
    };
    $scope.getSplitData(graph.nodeId);
    disposeCommMethod.initShuyunAjaxButtonGlobaValueTrue();

    //随机拆分
    $scope.randomSplit = {
        "delBtnFirstClick": true,
        "partPercentage": [
            {
                "index": 1,
                "name": "",
                "percentage": 0
            }
        ],
        "add": function (index) {
            var len = this.partPercentage.length;
            this.partPercentage.push({
                "index": null,
                "name": this.delPartPercentage ? ("拆分" + this.delPartPercentage) : ("拆分" + (len + 1)),
                "percentage": 1
            });
            if (this.delPartPercentage) {
                this.delPartPercentage += 1;
            }
        },
        "del": function (index) {
            var partPercentage = this.partPercentage,
                len = partPercentage.length;
            if (len == 1) {
                return false;
            }

            if (this.delBtnFirstClick) { // 记录最后一次默认名
                this.delPartPercentage = len + 1;
                this.delBtnFirstClick = false;
            }
            if ((index + 1) == len) {
                this.delPartPercentage = this.delPartPercentage - 1;
            }
            partPercentage.splice(index, 1);
        },
        "save": function () {
            return $scope.randomSplit.partPercentage;
        },
        "equalSplit": function () {
            var thiSpartPercentage = this.partPercentage;
            var equalAplitValue = Math.floor(100 / thiSpartPercentage.length);
            var lastItemValue = 100 - (equalAplitValue * (thiSpartPercentage.length - 1));
            angular.forEach(thiSpartPercentage, function (val, key) {
                if (key == (thiSpartPercentage.length - 1)) {
                    val.percentage = lastItemValue;
                } else {
                    val.percentage = equalAplitValue;
                }
            })
        },
        "toggleKey": function (i) { // visibility是否为hidden
            var maxLength = this.partPercentage.length - 1;
            return i == maxLength ? "visibilityVisible" : "visibilityHidden";
        },
        "clearAryObj": function (aryObj) {//去除保存对象重名
            var splitNameAryStore = [], matchAryFlag = false;
            for (var i = 0; i < aryObj.length; i++) {
                splitNameAryStore.push(aryObj[i].name);
            }
            var matchStoreName = splitNameAryStore.sort();
            for (var i = 0; i < splitNameAryStore.length; i++) {
                if (matchStoreName[i] == matchStoreName[i + 1]) {
                    matchAryFlag = true;
                    break;
                }
            }
            return matchAryFlag;
        }
    };
    $scope.openNodePop();    //显示节点弹出框

}

