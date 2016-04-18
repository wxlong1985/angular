package com.data.data.analysis.services.entity.enums;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Created by Kingsley on 2016/3/26.
 */
public enum NodeType {

    tflowstart("开始"), tflowtime("时间"), tflowwait("等待"), tfilterfind("查询"), tfilterscreen("屏蔽"),
    tfiltersplit("拆分"), tfiltermerge("合并"), tfilterand("交集"), tfiltergrouppriority("排重"),
    tfilterexclude("排除"), tfiltersample("抽样"), teximimport("名单匹配"),
    teximmarketingondemand("立即营销"), tfilterdataImport("导入查询"), tfilterHeat("营销热度"),
    tfilterUMPQuery("定向优惠使用查询"), tfilterECQuery("优惠券使用查询"), tfilterBehavior("访问查询"),
    tfilterUnionlabel("联合标签"), tcustomertargetgroup("目标组"), tcustomerrespondgroup("响应组"),
    tspecialordermatch("匹配订单"), tdiscountEC("优惠券"), tdiscountUMP("定向优惠"),
    tdiscountdigitalpromocode("优惠码响应"), tdiscountISNew("积分发放"),
    tdiscountBenefit("淘宝权益"), tcommunicateSMS("短信"), tcommunicateEDM("EDM"), tcommunicateMMS("彩信"),
    tcommunicateWAP("wap推送"), tcommunicateOther("线下活动"), tcommunicateWechat("微信"),
    tchannelresponseEC("优惠券响应"), tchannelresponseEDM("EDM响应"),
    tchannelresponseDigitalPromoCode("数字优惠码响应"), tdataloyaltyvip("忠诚度会员等级设置"),
    tdatammsmart("智能会员等级"), tdatammvip("会员等级"), tdatacustomgroup("客户分组操作"),
    tdataattributeedit("属性修改"), tanalysisorder("订单分析"), tanalysiseffmarket("营销效果分析"),
    tanalysisFeature("客户特征分析");
    private static final Log log = LogFactory.getLog(NodeType.class);
    private String name;

    NodeType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static NodeType findNodeType(String type) {
        for (NodeType nodeType : values()) {
            if (nodeType.name().equals(type)) {
                return nodeType;
            }
        }
        log.error(String.format("Type %s Not Found", type));
        return null;
    }
}
