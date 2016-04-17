var MyFlow = {
    localStoreSave : false,
    getOpenNodeCell: function (cell) {
        var style = cell.style;
        var value = cell.value;
        var nodeName = style.split(";");
        nodeName = nodeName[0];
        if (!cell || !cell.vertex || nodeName == "tflowstart") {  //判断为vertex成立
            return false;
        }
        if (cell.parent.vertex) {  //排除vertex中的子元素
            return false;
        }
        console.info(cell);
    },
    addToolbarItem: function (graph, toolbar, prototype, image) {
        // Function that is executed when the image is dropped on
        // the graph. The cell argument points to the cell under
        // the mousepointer if there is one.
        var funct = function (graph, evt, cell, x, y) {
            graph.stopEditing(false);

            var vertex = graph.getModel().cloneCell(prototype);
            vertex.geometry.x = x;
            vertex.geometry.y = y;

            graph.addCell(vertex);
            graph.setSelectionCell(vertex);
        }

        // Creates the image which is used as the drag icon (preview)
        var img = toolbar.addMode(null, image, function (evt, cell) {
            var pt = this.graph.getPointForEvent(evt);
            funct(graph, evt, cell, pt.x, pt.y);
        });

        // Disables dragging if element is disabled. This is a workaround
        // for wrong event order in IE. Following is a dummy listener that
        // is invoked as the last listener in IE.
        mxEvent.addListener(img, 'mousedown', function (evt) {
            // do nothing
        });

        // This listener is always called first before any other listener
        // in all browsers.
        mxEvent.addListener(img, 'mousedown', function (evt) {
            if (img.enabled == false) {
                mxEvent.consume(evt);
            }
        });
        mxUtils.makeDraggable(img, graph, funct);
        return img;
    },
    del: function () {
        var selectdCells = null;
        if (!graph.isSelectionEmpty()) {
            selectdCells = graph.getSelectionCells();
            var len = selectdCells.length;
            var parame = {
                "nodes": [],
                "connects": []
            }
            for (var i = 0; i < len; i++) {
                if (selectdCells[i].vertex) {
                    parame.nodes.push(selectdCells[i].id);
                } else {
                    var o = {};
                    o.source = selectdCells[i].source.id;
                    o.target = selectdCells[i].target.id;
                    parame.connects.push(o);
                }
            }
            parame = JSON.stringify(parame);
            return true;
        } else {
            return false;
        }

    },
    move: function (parame) {
        var parames = JSON.stringify(parame);
        var len = parame.length;
        var cell = null;
        for (var i = 0; i < len; i++) {
            cell = graph.getModel().getCell(parame[i].id);
            cell.geometry.x = parame[i].x;
            cell.geometry.y = parame[i].y;
            graph.refresh();
            graph.setSelectionCell(cell)
        }
    },
    undo: function () {

    },
    redo: function () {

    },
    addVertex: function (icon, w, h, style) {
        var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
        vertex.setVertex(true);

        var img = this.addToolbarItem(graph, toolbar, vertex, icon);
        img.enabled = true;

        graph.getSelectionModel().addListener(mxEvent.CHANGE, function () {
            var tmp = graph.isSelectionEmpty();
            mxUtils.setOpacity(img, (tmp) ? 100 : 20);
            img.enabled = tmp;
        });
    },
    openFlow: function (id) {
        var dtd = $.Deferred();
        $.ajax({
            url: GetUrl.graph.saveGraph,
            //async: false,
            type: "GET",
            cache: false,
            dataType: "json",
            success: function (res) {
                var data = res;
                var nodes = data.nodes;//获取所有节点信息并在画布上循环出来
                for (var i = 0; i < nodes.length; i++) {
                    var s = nodes[i].type + ';image=mxGraph/images/flowIcon/' + nodes[i].type + '.png;';
                    if (nodes[i].type == "tflowblank") {
                        flow.addSpecialVertex(nodes[i].id, nodes[i].remark, nodes[i].x, nodes[i].y, 62, 62, "tflowblank;");
                    } else {
                        this.addVertex(nodes[i].id, nodes[i].name, nodes[i].x, nodes[i].y, 64, 64, s, true, nodes[i].remark);
                    }

                }
                var connects = data.connects;
                for (var i = 0; i < connects.length; i++) {
                    var sourceId = connects[i].source;
                    var targetId = connects[i].target;
                    var position = connects[i].position;
                    var name = connects[i].name;
                    flow.addEdge(sourceId, position, targetId, name);
                }
            },
            error: function (res) {
                $(this).Alert({"title": res.message, "str": res.description, "mark": true});
            }
        })
        dtd.resolve();
        return dtd.promise();
    },
    save: function (url) {
        var parent = graph.getDefaultParent();
        var childCount = graph.model.getChildCount(parent);
        var nodes = [];
        var connects = [];
        for (var i = 0; i < childCount; i++) {
            var cell = graph.model.getChildAt(parent, i);
            var o = {};
            if (cell.vertex) {
                o.workflowId = graph.workflowId;
                o.id = cell.id;
                o.name = cell.value;
                o.type = cell.style.split(";")[0];
                o.x = cell.geometry.x;
                o.y = cell.geometry.y;
                nodes.push(o);
            }
            if (cell.edge) {
                o.workflowId = graph.workflowId;
                o.source = cell.source.id;
                o.target = cell.target.id;
                connects.push(o);
            }
        }
        var enc = new mxCodec(mxUtils.createXmlDocument());
        var node = enc.encode(editor.graph.getModel());
        var html = mxUtils.getPrettyXml(node);
        var parame = {
            "nodes": nodes,
            "connects": connects
        }
        var parames = JSON.stringify(parame);
        console.info(parames)
        $.ajax({
            url: url,
            async: false,
            type: "POST",
            cache: false,
            data: {
                'flow.nodes' : nodes,
                'flow.connects' : connects
            },
            dataType: "json",
            contentType: 'application/json',
            success: function (res) {
                if (res.success) {
                    graph.workflowId = res.workflowId;
                } else {

                }
            },
            error: function (res) {

            }
        })
    },
    //鼠标划入划出事件
    mouseTrack: function () {
        var track = new mxCellTracker(graph);
        track.flag = false;
        track.cur_cell = null;
        track.mouseMove = function (sender, me) {
            var cell = this.getCell(me);
            if (cell && cell.vertex && !(track.flag)) {
                var style = cell.style.split(";")[0];
                track.flag = true;
                if (cell.flowValidationNotPass) {
                    if (style == "tflowblank") { // 执行错误，拆分节点可拖入
                        Style.mouseOverStyle(cell);
                    }
                } else {
                    Style.mouseOverStyle(cell);
                }

                track.cur_cell = cell;
                return false;
            } else {
                if (track.cur_cell && !cell && track.flag) {
                    if (track.cur_cell.flowValidationNotPass) {
                        //alert("验证未通过");
                    } else {
                        Style.mouseOutStyle(track.cur_cell)
                    }

                    track.cur_cell = null;
                    track.flag = false;
                }
            }
        }
        track.mouseDown = function (sender, me) {
            var cell = this.getCell(me);
            if (cell && cell.vertex) {
                graph.isMoveCellStart = true;
            }

        }
        track.mouseUp = function (sender, me) {
            graph.isMoveCellStart = false;
        }
    },
    //双击元素，弹出窗口判断
    doubleClick: function () {
        graph.addListener(mxEvent.DOUBLE_CLICK, function (sender, evt) {   //双击打开活动流程
            var cell = evt.getProperty('cell');
            MyFlow.getOpenNodeCell(cell)
            graph.stopEditing(cell);      //撤销双击编辑节点名称
            if (cell && cell.flowValidationNotPass) {     //该节点为验证未通过节点
                cell.flowValidationNotPass = false;
            }
        })
    },
    //移动元素
    moveCells: function () {
        graph.addListener(mxEvent.MOVE_CELLS, function (sender, evt) {     //节点的移动
            var move_cells = evt.properties.cells;
            if (graph.campCloneNode) {
                move_cells = graph.campCloneCells;
            }
            var dx = evt.properties.dx;
            var dy = evt.properties.dy;
            var nodes = [];
            var connects = [];
            // var cells=[];
            for (var i = 0; i < move_cells.length; i++) {
                if (move_cells[i].vertex) {
                    var o = {};
                    o.id = parseInt(move_cells[i].id);
                    o.x = move_cells[i].geometry.x + dx;     //拖动后的坐标
                    o.y = move_cells[i].geometry.y + dy;
                    nodes.push(o);
                    //cells.push(move_cells[i]);
                }
                if (move_cells[i].edge) {
                    var o = {};
                    o.targetId = move_cells[i].target.id;
                    o.sourceId = move_cells[i].source.id;
                    connects.push(o);
                }
            }
            if (graph.campCloneNode) {
                var parame = {
                    "nodes": nodes,
                    "connects": connects
                };
                //graph.removeCells(move_cells);                  //删除mxGraph自动复制的节点
                graph.campCloneNode = false;
                graph.refresh();
                //operatePalette.clone(parame);             //自定义复制节点
            } else {
                if (graph.isAllowDragArea) {   //此时为将普通节点拖入到虚线框中
                    var moveCell = move_cells[0],          //移动的节点
                        moveCellId = parseInt(moveCell.id),
                        sourceCell = graph.intoTheBox.edges[0].source,   //拆分节点
                        sourceCellId = sourceCell.id,
                        targetCell = graph.intoTheBox,    //拆分虚拟框
                        targetCellId = targetCell.id;
                    $.ajax({
                        url: rootStatic + "workflow/" + graph.workflowId + "/node/" + moveCellId + "/replace/" + targetCellId,
                        async: false,
                        type: "PUT",
                        cache: false,
                        dataType: "json",
                        contentType: 'application/json',
                        success: function (res) {
                            //刷新画布
                            var scope = angular.element(document.querySelector('#workflow')).scope();
                            scope.refreshGraph();
                        },
                        error: function (XMLHttpRequest) {
                            var responseText = XMLHttpRequest.responseText;
                            var res = eval('(' + responseText + ')');
                            $(this).Alert({"title": "删除失败", "str": res.description, "mark": true});
                            var scope = angular.element(document.querySelector('#workflow')).scope();
                            scope.refreshGraph();
                            return false;
                        }
                    })
                } else {
                    flow.move(nodes)
                }
            }

        })
    },
    interValLocalSave: function () {

        setTimeout(function(){

        },2000);
    },
    //初始化画布
    init: function () {
        window.graph = null;
        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('该浏览器版本太低，请升级', 200, false);
        } else {
            window.editor = new mxEditor();
            graph = editor.graph;
            var container = document.getElementById("graph");
            var outline = document.getElementById('outlineContainer');
            if (mxClient.IS_IE) {
                new mxDivResizer(container);
                new mxDivResizer(outline);
                //new mxDivResizer(toolbar);
                //new mxDivResizer(sidebar);
//					new mxDivResizer(status);
            }

            mxConnectionHandler.prototype.connectImage = new mxImage('/images/connector.gif', 14, 14);     //重定义连线icon
            graph.setConnectable(true);                 //建立连线
            graph.setTooltips(true);                    //显示提示
            graph.setCellsResizable(false);            //不允许改变大小
            graph.setAllowDanglingEdges(false);         //连线必须作用在对象上
            graph.foldingEnabled = false;                 //不可折叠
            graph.cloneNode = false;                     //自定义属性，克隆节点的标志
            graph.isMoveCellStart = false;               //自定义属性，用于标志节点拖拽的开始状态
            graph.isAllowDragArea = false;               //允许拖入的区域，拆分节点的虚框处理
            graph.intoTheBox = null;                     //被拖入的虚框
            graph.campRedo = [];
            graph.campUndo = [];
            graph.campStatus = null;
            graph.campJobid = null;
            graph.dropEnabled = true;
            editor.setGraphContainer(container);
            var outln = new mxOutline(graph, outline);
            graph.getIntersectionCell = function (x, y, parent) {     //获取和虚框相交的元素
                parent = parent || this.getDefaultParent();
                if (parent != null) {
                    var childCount = this.model.getChildCount(parent);
                    var result = null;
                    for (var i = 0; i < childCount; i++) {
                        var child = this.model.getChildAt(parent, i);
                        var style = child.style;
                        if (style && style.indexOf("tflowblank") >= 0) {
                            if (x < child.geometry.x + 62 && x >= child.geometry.x && y < child.geometry.y + 62 && y >= child.geometry.y) {
                                result = child;
                                break;
                            }
                        }
                    }
                    return result;
                }
            };
            mxTooltipHandler.prototype.zIndex = 999;
            new mxRubberband(graph);                   //橡皮圈选中
            graph.workflowId = '1';
            graph.campId = '1';
            graph.currentType = '1';
            graph.isRemark = true;    //是否为创建人
            graph.isCampRunning = false;  //活动是否为执行中
            //var keyHandler = new mxKeyHandler(graph);
            //keyHandler.bindKey(46, function () {         //绑定键盘删除事件
            //    operatePalette.del();
            //});
            //keyHandler.bindKey(37, function () {         //绑定键盘删除事件
            //
            //});
            //keyHandler.bindControlKey(37, function () {
            //
            //});

            this.doubleClick();
            mxGraph.prototype.cellsMoved = function (cells) {      //去除graph自带的节点移动方法,自定义方法operatePalette.cells.move
                return false;
            };
            this.moveCells();
            this.mouseTrack();
            //复制节点
            mxGraphModel.prototype.cloneCells = function (cells, includeChildren) {
                var mapping = new Object();
                var clones = [];
                var nodes = [];
                var connects = [];
                for (var i = 0; i < cells.length; i++) {
                    if (cells[i] != null) {
                        clones.push(this.cloneCellImpl(cells[i], mapping, includeChildren));
                    }
                    else {
                        clones.push(null);
                    }
                }
                for (var i = 0; i < clones.length; i++) {
                    if (clones[i] != null) {
                        this.restoreClone(clones[i], cells[i], mapping);
                    }
                }
                if (clones.length > 0) {              //自定义操作
                    graph.campCloneNode = true;
                    graph.campCloneCells = cells;
                }
                return clones;
            }

            this.connectValidation();
            graph.enabled = true;
        }
        this.interValLocalSave();
    },
    connectValidation: function () {
        mxConnectionHandler.prototype.connect = function (source, target, evt, dropTarget) {
            var sourceStyle = source.style.split(";")[0];
            var targetStyle = target.style.split(";")[0];
            var sourceId = source.id;
            var targetId = target.id;
            var parame = {
                "source": sourceId,
                "target": targetId
            }
            var parames = JSON.stringify(parame);
            var targetCell = graph.getModel().getCell(targetId);
            var sourceCell = graph.getModel().getCell(sourceId);
            if (targetCell.flowValidationNotPass) {
                targetCell.flowValidationNotPass = false;
                Style.mouseout(targetCell)
            }
            if (sourceCell.flowValidationNotPass) {
                sourceCell.flowValidationNotPass = false;
                Style.mouseout(sourceCell)
            }
            flow.addEdge(sourceId, 0, targetId);
        }
    },
    //初始化侧边栏
    initSliderButtons: function (className) {
        var objs = $("." + className);
        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            if (mxClient.IS_IE) {
                new mxDivResizer(obj);
            }
            var classify = new mxToolbar(obj);     //工具菜单分类列表
            var nodeTitle = $.trim($(obj).text());
            var nodeName = $(obj).attr('type');
            var src = "/images/graph/" + nodeName + ".png";
            this.createVertex(graph, classify, nodeTitle, nodeName, src);
        }
    },
    initSliderButton: function (obj) {
        if (mxClient.IS_IE) {
            new mxDivResizer(obj);
        }
        var classify = new mxToolbar(obj);     //工具菜单分类列表
        var nodeTitle = $.trim($(obj).text());
        var nodeName = $(obj).attr('type');
        var src = "/images/graph/" + nodeName + ".png";
        this.createVertex(graph, classify, nodeTitle, nodeName, src);
    },
    //创建元素
    createVertex: function (graph, sidebar, label, style, subImg) {
        var flog = "left";
        var container = graph.container;
        var parent = graph.getDefaultParent();
        var funct = function (graph, evt, cell, x, y, extra) {
            var intersectionCell = graph.getIntersectionCell(x, y);//将新增节点拖入虚框中
            var parame = {};
            var s = "";
            if (extra) {
                extra.x = extra.x + 90;
                parame.name = extra.name;
                parame.type = extra.style;
                parame.x = extra.x;
                parame.y = extra.y;
                var img = "/images/graph/" + extra.style + ".png";
                s = style + ';image=' + img + ';';
            } else {
                parame.name = label;
                parame.type = style;
                parame.x = x;
                parame.y = y;
                s = style + ';image=' + subImg + ';';
            }
            var parames = JSON.stringify(parame);
            if (intersectionCell !== null) { // 从工具栏拖入虚框
                var cell = graph.getModel().getCell(intersectionCell.id);
                var cells = [];
                cells.push(cell);
                graph.removeCells(cells, false);
                flow.addVertex(null, parame.name, parame.x, parame.y, 62, 62, s);
            } else { // 拖入空白处生成
                //var data = res;
                //flow.addVertex(data.id, data.name, data.x, data.y, 62, 62, s);
                //前端测试使用
                if (parame.type == 'tfilterfind') {
                    flow.addSpecialVertex(null, parame.name, parame.x, parame.y, 62, 62, "tflowblank;");
                } else {
                    flow.addVertex(null, parame.name, parame.x, parame.y, 62, 62, s);
                }
            }
        }
        if (sidebar && sidebar != null) {
            var botton = sidebar.addMode(label, null, funct, null, null, null);
            var tool_icon_htmlModel;
            if (style == "teximmarketingondemand") { // 是否是可拖拽节点样式：如立即营销节点
                tool_icon_htmlModel = '<a href="javascript:void(0);" class="tool_icon ' + style + '" type=' + style + '></a><span class="toolbarLockStyle">' + label + '</span>';
            } else {
                tool_icon_htmlModel = '<a href="javascript:void(0);" class="tool_icon ' + style + '" type=' + style + '></a><span>' + label + '</span>';
            }
            $(botton).append(tool_icon_htmlModel);
            mxEvent.addListener(botton, 'click', function (evt) {
                var parent = graph.getDefaultParent();
                var cells = parent.children;
                var childCount = parent.getChildCount();

                var lastCell = null;
                for (var i = 0; i < childCount; i++) {
                    var curCell = parent.getChildAt(i)
                    if (curCell.vertex) {
                        lastCell = curCell;
                    }
                }
                if (lastCell != null) {
                    var value = $(botton).text();
                    var type = $(botton).find(".tool_icon").attr("type");

                    var o = {
                        "name": value,
                        "style": type,
                        "x": lastCell.geometry.x,
                        "y": lastCell.geometry.y
                    }
                    funct(graph, null, null, null, null, o);

                } else {
                    return false;
                }
            });
            var dragElt = document.createElement('div');
            dragElt.style.border = 'dashed black 1px';
            dragElt.style.width = '48px';
            dragElt.style.height = '48px';
            dragElt.background = "none";
            var ds = mxUtils.makeDraggable(botton, graph, funct, dragElt, 0, 0, true, true);
            //console.log(ds);
            var intersectionCellsIds = [];
            var selectCell = null;
            ds.getDropTarget = function (graph, x, y) {   //此方法必须设置graph.dropEnabled=true
                //将节点拖入虚框中
                var intersectionCell = graph.getIntersectionCell(x, y);

                if (intersectionCell !== null) {
                    var id = intersectionCell.id;
                    if (!screening(id, intersectionCellsIds)) {
                        intersectionCellsIds.push(id);
                        selectCell = intersectionCell;
                    }
                    setIntersectionCellsStyle(intersectionCell)
                } else {
                    if (selectCell) {
                        Style.mouseout(selectCell);
                        //selectCell=null;
                    }
                }
            }
            function screening(id, ids) {
                var flag = false;
                for (var i = 0; i < ids.length; i++) {
                    if (ids[i] == id) {
                        flag = true;
                        break;
                    }
                }
                return flag;
            }

            function setIntersectionCellsStyle(intersectionCell) {
                var model = new mxGraphModel();
                model.beginUpdate();
                try {
                    graph.setCellStyles("strokeWidth", 2, [intersectionCell]);
                    graph.setCellStyles("strokeColor", "#f00", [intersectionCell]);
                    graph.setCellStyles("fillColor", "none", [intersectionCell]);
                }
                finally {
                    model.endUpdate();
                }
            }
        }
    },
    //初始化工具栏
    initOperatorButton: function (className) {
        var objs = $("." + className);
        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            if (mxClient.IS_IE) {
                new mxDivResizer(obj);
            }
            var classify = new mxToolbar(obj);     //工具菜单分类列表
            var nodeTitle = $.trim($(obj).text());
            var nodeName = $(obj).attr('type');
            var src = "/images/graph/" + nodeName + ".png";
            vertex.create(graph, classify, nodeTitle, nodeName, src);
        }
    }
}

function workflow($http, $scope, $compile, $locale) {
    $scope.nodeSrc = "";
    $scope.getOpenNodeCell = function (scope, cell) {
        var style = cell.style;
        var value = cell.value;
        var nodeName = style.split(";");
        nodeName = nodeName[0];
        if (!cell || !cell.vertex || nodeName == "tflowstart") {  //判断为vertex成立
            return false;
        }
        if (cell.parent.vertex) {  //排除vertex中的子元素
            return false;
        }

        $scope.nodeSrc = root + "app/marketing/view/node/" + nodeName + ".html?_=" + new Date().getTime();
        $scope.$apply();
        graph.nodeId = cell.id;
        var len = configuration.length;  //变量configuration为前端配置文件，主要存储节点的信息
        graph.openNode = null;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < configuration[i].nodes.length; j++) {
                if (configuration[i].nodes[j].type == nodeName) {
                    graph.openNode = configuration[i].nodes[j]
                    break;
                }
            }
        }


    }
    $scope.openNodePop = function () {
        if (graph.openNode != null) {
            graph.isEditable = true;
            $("#nodeContent").addInteractivePop({
                magTitle: graph.openNode.name + "节点",
                mark: true,
                drag: true,
                position: "fixed",
                width: graph.openNode.popWidth,
                height: graph.openNode.popHeight
            });
            if (false) {
                $div = $("<div>").css({
                    "position": "absolute",
                    "top": 38,
                    "left": 0,
                    "bottom": 0,
                    "right": 0,
                    "background": "#CCC",
                    "opacity": 0.5
                })
                $("#nodeContent").append($div);
            }

        }
    }
    //修改节点名称
    $scope.editNodeName = function (cellId, cellName) {
        var cell = graph.getModel().getCell(cellId);
        cell.value = cellName;
        graph.refresh();

    }
    //清楚活动状态定时器
    $scope.clearStatusTimer = function () {
        if (typeof(jobRefreshTimer) != "undefined") {
            clearTimeout(jobRefreshTimer);
        }
        if (typeof(campRefreshTimer) != "undefined") {
            clearTimeout(campRefreshTimer);
        }
    }
    //特殊节点配置成功后生成虚框节点（如拆分）
    $scope.refreshGraph = function () {
        /*
         *清楚页面中执行状态
         *清楚画布中的节点
         *重新加载画布节点
         *重新启动执行活动的方法
         */
        //this.clearStatusTimer();
        graph.model.clear();
        flow.openFlow();

    }
    /*编辑区*/
    $scope.screen = {
        "init": function () {
            var $screen = angular.element("#screen");
            if ($screen.hasClass("fullScree")) {
                $screen.addClass("shrinkScreen").removeClass("fullScree");
                $screen.attr("title", "退出全屏");
                $scope.screen.fullScreen();
            } else if ($screen.hasClass("shrinkScreen")) {
                $screen.addClass("fullScree").removeClass("shrinkScreen");
                $screen.attr("title", "全屏编辑");
                $scope.screen.shrinkScreen();
            }
        },

        "fullScreen": function () {
            angular.element("#operating_area").css({"position": "fixed", "top": "0"});
            angular.element(".action_buttons").css({"position": "fixed"});
            angular.element(".header").css({"z-index": 0});
            //html5 触发浏览器全屏
            var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
            rfs.call(el);
        },
        "shrinkScreen": function () {
            angular.element("#operating_area").css({"position": "absolute", "top": "36"});
            angular.element(".action_buttons").css({"position": "absolute"});
            angular.element(".header").css({"z-index": 900});
            //html5 退出浏览器全屏
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

}