package com.data.data.analysis.action;

import com.data.data.analysis.services.entity.Flow;
import com.data.data.analysis.services.entity.Node;
import com.opensymphony.xwork2.Result;
import com.zuipin.action.JxmallAction;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.List;

/**
 * Created by Kingsley on 2016/3/26.
 */
@Entity
@Table(name = "flow")

public class GraphAction extends JxmallAction {

    private Flow flow;

    public Result save() {

        return null;
    }

    public Flow getFlow() {
        return flow;
    }

    public void setFlow(Flow flow) {
        this.flow = flow;
    }
}
