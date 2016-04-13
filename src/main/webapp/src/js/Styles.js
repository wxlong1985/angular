//mxGraph定义节点样式
var Style = {

    defaultVertexStyle: function (graph) {
        var style = {};
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;   //必须定义label，不然会默认vertex中只有图片，这样图片会自动压缩
        style[mxConstants.STYLE_IMAGE_ALIGN] = "center";
        style[mxConstants.STYLE_IMAGE_vertical_ALIGN] = "middle";
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_ALIGN] = "center";
        style[mxConstants.STYLE_VERTICAL_ALIGN] = "top";
        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = "bottom";
        style[mxConstants.STYLE_GRADIENTCOLOR] = 'none';
        style[mxConstants.STYLE_FONTCOLOR] = '#000000';
        style[mxConstants.STYLE_OPACITY] = '100';
        style[mxConstants.STYLE_FONTSIZE] = '12';
        style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
        style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
        graph.getStylesheet().putDefaultVertexStyle(style);
    },
    defaultEdgeStyle: function (graph) {
        var style = {};
        style[mxConstants.STYLE_ROUNDED] = true;       //设置连接线为曲线
        // style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CONNECTOR;
        style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_CLASSIC;    //定义箭头样式
        style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
        style[mxConstants.STYLE_STROKECOLOR] = '#868686';
        style[mxConstants.STYLE_PERIMETER_SPACING] = 1;   //连线与节点间的距
        graph.getStylesheet().putDefaultEdgeStyle(style)
    },
    mouseOverStyle: function (cell) {
        var style = cell.style.split(";")[0];
        var model = new mxGraphModel();
        model.beginUpdate();
        try {
            if (style == "tflowblank") {   //排除虚框节点
                if (graph.isMoveCellStart) {
                    //cell.setValue("建立连\n接关系");
                    graph.setCellStyles("strokeWidth", 3, [cell]);
                    graph.setCellStyles("strokeColor", "#F00", [cell]);
                    graph.isAllowDragArea = true;
                    graph.intoTheBox = cell;

                } else {
                    return false;
                }
            } else {
                graph.setCellStyles("strokeWidth", 2, [cell]);
                graph.setCellStyles("strokeColor", "#009ad0", [cell]);
                graph.setCellStyles("fillColor", "#ecf7fe", [cell]);
            }
        }
        finally {
            model.endUpdate();
        }
    },
    mouseOutStyle: function (cell) {
        var style = cell.style.split(";")[0];
        var model = new mxGraphModel();
        model.beginUpdate();
        try {
            if (style == "tflowblank") {   //排除虚框节点
                //cell.setValue("请拖入\n节点");
                graph.setCellStyles("strokeWidth", 2, [cell]);
                graph.setCellStyles("strokeColor", "#000", [cell]);
            } else {
                graph.setCellStyles("strokeWidth", 2, [cell]);
                graph.setCellStyles("strokeColor", "none", [cell]);
                graph.setCellStyles("fillColor", "none", [cell]);
            }
            graph.isAllowDragArea = false;
            graph.intoTheBox = null;
        }
        finally {
            model.endUpdate();
        }
    },
    validationErrorStyle: function (cell) {
        var model = new mxGraphModel();
        model.beginUpdate();
        try {
            graph.setCellStyles("strokeWidth", 2, [cell]);
            graph.setCellStyles("strokeColor", "#F00", [cell]);
            graph.setCellStyles("fillColor", "#FFF", [cell]);
        }
        finally {
            model.endUpdate();
        }

    },
    occupiedCaseStyle: function (graph) {          //拆分节点生成虚框样式
        var style = {};
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SQUARE;
        style[mxConstants.STYLE_OPACITY] = '20';
        style[mxConstants.STYLE_FILLCOLOR] = 'none';
        style[mxConstants.STYLE_STROKECOLOR] = '#000';
        style[mxConstants.STYLE_DASHED] = true;
        graph.getStylesheet().putCellStyle("tflowblank", style)
    },
    dashedStyle: function () {
        var style = {};
        style[mxConstants.STYLE_DASHED] = true;
        graph.getStylesheet().putCellStyle("dashed", style);
    }
};