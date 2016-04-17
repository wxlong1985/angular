package com.data.data.analysis.services;

import com.data.data.analysis.services.dao.FlowDao;
import com.data.data.analysis.services.entity.Flow;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by Kingsley on 2016/3/26.
 */
@Service
public class FlowService {

    @Resource
    private FlowDao flowDao;

    public Flow saveFlow(Flow flow) {
        if (flow != null && flow.getId().longValue() != 0) {
            Flow findFlow = flowDao.load(flow.getId());
            if(findFlow != null){
                findFlow.setNodes(flow.getNodes());
                findFlow.setEdges(flow.getEdges());
                flowDao.save(flow);
            }else{
                flowDao.save(flow);
                findFlow = flow;
            }
            return findFlow;
        }
        return null;
    }

    public void saveFlow(JSONObject o) {

    }
}
