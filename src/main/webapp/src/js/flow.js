var flow = {
    //工具栏事件
    editor: function (action) {
        if (action == "delete") {
            operatePalette.del();
        } else if (action == "zoomIn") {
            graph.zoomIn();
        } else if (action == "zoomOut") {
            graph.zoomOut();
        }
        else if (action == "actualSize") {
            graph.zoomActual();
        } else if (action == "export") {
            var textarea = document.createElement('textarea');
            textarea.style.width = '400px';
            textarea.style.height = '400px';
            var enc = new mxCodec(mxUtils.createXmlDocument());
            var node = enc.encode(editor.graph.getModel());
            var html = mxUtils.getPrettyXml(node);
            alert(html);
        } else {
            editor.execute(action);
        }
    },
    //添加元素
    addVertex: function (id, label, x, y, w, h, s, selection, remark) {// remark-是否有备注
        graph.htmlLabels = true; // 设置可解析html
        var model = new mxGraphModel();
        Style.defaultVertexStyle(graph);   //设置节点的默认样式
        var parent = graph.getDefaultParent();
        model.beginUpdate();
        try {
            var v1 = graph.insertVertex(parent, id, label, x, y, w, h, s)
            v1.setConnectable(true);

            /*有备注鼠标浮动备注*/
            if (remark) {
                v1.flowValidationNotPass = true;
                v1.flowValidationNotPassMessage = remark.replace(/<(?!br)/gi, "&lt;");
            }

            if (selection) {
                return false;
            } else {
                graph.setSelectionCell(v1)
            }
        }
        finally {
            model.endUpdate();
        }


    },
    //特殊节点--拆分节点虚拟框
    addSpecialVertex: function (id, label, x, y, w, h, s) {
        var model = new mxGraphModel();
        Style.occupiedCaseStyle(graph)
        var parent = graph.getDefaultParent();
        model.beginUpdate();
        try {
            var v1 = graph.insertVertex(parent, id, label, x, y, w, h, s)
            v1.setConnectable(false);
            graph.orderCells("back", [v1]);
        }
        finally {
            model.endUpdate();
        }
    },
    //添加边
    addEdge: function (sourceId, position, targetId, name) {
        var model = new mxGraphModel();
        var parent = graph.getDefaultParent();
        Style.defaultEdgeStyle(graph);     //设置连线的默认样式
        Style.dashedStyle();
        var sourceCell = graph.getModel().getCell(sourceId);
        var targetCell = graph.getModel().getCell(targetId);
        var targetCellStyle = targetCell.style.split(";")[0];
        var sourceCellStyle = sourceCell.style.split(";")[0];
        var s = null;
        if (targetCellStyle == "tflowblank") {
            s = "dashed";
        }
        var connectId = "" + sourceId;
        if (position == null) {
            connectId = connectId + "_" + "null";
        } else {
            connectId = connectId + "_" + position;
        }
        if (targetId == null) {
            connectId = connectId + "_" + "null";
        } else {
            connectId = connectId + "_" + targetId;
        }
        console.info("targetCellStyle:" + targetCellStyle + " sourceCellStyle" + sourceCellStyle);
        var valid = RuleValid.valid(sourceCellStyle, targetCellStyle);
        if (true) {
            model.beginUpdate();
            try {
                graph.insertEdge(parent, connectId, name, sourceCell, targetCell, s);
            }
            finally {
                model.endUpdate();
            }
        } else {
            alert(valid.message);
        }
    },
    //删除元素
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
    //移动元素
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
    //自定义取消事件，由于绑定的元素弹窗，此处建议替换掉上一步、下一步事件
    undo: function () {

    },
    //自定义取消事件，由于绑定的元素弹窗，此处建议替换掉上一步、下一步事件
    redo: function () {

    }
}