package com.data.data.analysis.action.graph;

import com.data.data.analysis.services.entity.Flow;
import com.framework.struts.NotNeedLogin;
import com.opensymphony.xwork2.Result;
import com.zuipin.action.JxmallAction;
import net.sf.json.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.IOException;

/**
 * Created by Kingsley on 2016/3/26.
 */
@Entity
@Table(name = "flow")
@NotNeedLogin
public class GraphAction extends JxmallAction {

    private Flow flow;
    private static final Log log = LogFactory.getLog(GraphAction.class);
    public Result save() throws IOException {
        String post = getPostResult();
        log.info(post);
        JSONObject o = JSONObject.fromObject(post);
        log.info(o);
        return jsonResult(result);
    }

    public Flow getFlow() {
        return flow;
    }

    public void setFlow(Flow flow) {
        this.flow = flow;
    }
}
