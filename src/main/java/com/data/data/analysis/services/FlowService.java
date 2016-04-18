package com.data.data.analysis.services;

import com.data.data.analysis.services.dao.EdgeDao;
import com.data.data.analysis.services.dao.FlowDao;
import com.data.data.analysis.services.dao.NodeDao;
import com.data.data.analysis.services.entity.Edge;
import com.data.data.analysis.services.entity.Flow;
import com.data.data.analysis.services.entity.Node;
import com.data.data.analysis.services.entity.enums.FlowStatus;
import com.data.data.analysis.services.entity.enums.NodeType;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Kingsley on 2016/3/26.
 */
@Service
public class FlowService {

    @Resource
    private FlowDao flowDao;
    @Resource
    private EdgeDao edgeDao;
    @Resource
    private NodeDao nodeDao;

    public Flow saveFlow(Flow flow) {
        if (flow != null && flow.getId().longValue() != 0) {
            Flow findFlow = flowDao.load(flow.getId());
            if (findFlow != null) {
                findFlow.setNodes(flow.getNodes());
                findFlow.setEdges(flow.getEdges());
                flowDao.save(flow);
            } else {
                flowDao.save(flow);
                findFlow = flow;
            }
            return findFlow;
        }
        return null;
    }

    public void saveFlow(JSONObject o) {
        JSONArray nodesJSON = o.getJSONArray("nodes");
        JSONArray edgesJSON = o.getJSONArray("edges");
        List<Node> nodes = new ArrayList<Node>();
        List<Edge> edges = new ArrayList<Edge>();
        Flow flow = new Flow();
        flow.setEdges(edges);
        flow.setNodes(nodes);
        flow.setCreateTime(new Date());
        flow.setStatus(FlowStatus.NEW);
        flowDao.save(flow);
        for (int i = 0; i < nodesJSON.size(); i++) {
            JSONObject nodeJson = nodesJSON.getJSONObject(i);
            Node node = (Node) JSONObject.toBean(nodeJson, Node.class);
            node.setFlow(flow);
            node.setNodetype(NodeType.findNodeType(nodeJson.getString("type")));
            nodes.add(node);
        }
        nodeDao.save(nodes);

        for (int i = 0; i < edgesJSON.size(); i++) {
            JSONObject edgeJson = edgesJSON.getJSONObject(i);
            Edge edge = (Edge) JSONObject.toBean(edgeJson, Edge.class);
            edge.setFlow(flow);
            edges.add(edge);
        }
        edgeDao.save(edges);
    }
}
