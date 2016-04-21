package com.data.data.analysis.action.graph;

import com.data.data.analysis.services.FlowService;
import com.data.data.analysis.services.entity.Flow;
import com.framework.struts.NotNeedLogin;
import com.opensymphony.xwork2.Result;
import com.zuipin.action.JxmallAction;
import net.sf.json.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.annotation.Resource;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by Kingsley on 2016/3/26.
 */
@NotNeedLogin
public class GraphAction extends JxmallAction {

    private Flow flow;
    private static final Log log = LogFactory.getLog(GraphAction.class);
    @Resource
    private FlowService flowService;

    public Result save() throws IOException {
        String post = getPostResult();
        log.info(post);
        JSONObject o = JSONObject.fromObject(post);
        log.info(o);
        Flow flow = flowService.saveFlow(o);
        result.put("success", true);
        result.put("workflowid", flow.getId());
        return jsonResult(result);
    }

    private String getPostResult() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(getRequest().getInputStream(), "UTF-8"));
        String line = null;
        StringBuilder sb = new StringBuilder();
        while ((line = br.readLine()) != null)
            sb.append(line);
        return sb.toString();
    }


    public Flow getFlow() {
        return flow;
    }

    public void setFlow(Flow flow) {
        this.flow = flow;
    }
}
