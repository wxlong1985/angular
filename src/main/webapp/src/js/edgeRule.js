var edgeRule = [
    {
        "name": "tflow",
        "text": "操作流程",
        "nodes": [
            {
                "type": "tflowstart", "name": "开始", "popWidth": 650, "popHeight": 340
            },
            {
                "type": "tflowtime", "name": "时间", "popWidth": 610
            },
            {
                "type": "tflowwait", "name": "等待", "popWidth": 650,
                "unbindableNode": [
                    {
                        "targetType": "tflowwait",
                        "message": "等待节点不能与等待节点相连"
                    }
                ]
            }
        ],
        "unbindableGroup": [
            {
                "targetGroupName": "tflow",
                "message": "操作流程组节点不能连接到操作流程组节点"              //如果message不为空时，统一输出语
            }
        ]
    },
    {
        "name": "tfilter",
        "text": "目标客户组",
        "nodes": [
            {
                "type": "tfilterfind", "name": "查询", "popWidth": 1200
            },
            {
                "type": "tfilterscreen", "name": "屏蔽", "popWidth": 800, "popHeight": 600
            },
            {
                "type": "tfiltersplit", "name": "拆分", "popWidth": 800
            },
            {
                "type": "tfiltermerge", "name": "合并", "popWidth": 650
            },
            {
                "type": "tfilterand", "name": "交集", "popWidth": 800
            },
            {
                "type": "tfiltergrouppriority", "name": "排重", "popWidth": 800
            },
            {
                "type": "tfilterexclude", "name": "排除", "popWidth": 800
            },
            {
                "type": "tfiltersample", "name": "抽样", "popWidth": 800
            },
            {
                "type": "teximimport", "name": "名单匹配", "popWidth": 800
            },
            {
                "type": "teximmarketingondemand", "name": "立即营销", "popWidth": 800
            },
            {
                "type": "tfilterdataImport", "name": "导入查询", "popWidth": 800
            },
            {
                "type": "tfilterHeat", "name": "营销热度", "popWidth": 650
            },
            {
                "type": "tfilterUMPQuery", "name": "定向优惠使用查询", "popWidth": 800
            },
            {
                "type": "tfilterECQuery", "name": "优惠券使用查询", "popWidth": 800
            },
            {
                "type": "tfilterBehavior", "name": "访问查询", "popWidth": 650
            },
            {
                "type": "tfilterUnionlabel", "name": "联合标签", "popWidth": 1000
            }
        ],
        "unbindableGroup": [
            {
                "targetGroupName": "tdiscount",
                "message": "优惠方式类节点前面必须是客户组类节点"
            },
            {
                "targetGroupName": "tcommunicate",
                "message": "沟通方式类节点前面必须是客户组类节点"
            },
            {
                "targetGroupName": "tanalysis",
                "message": "客户分析类节点前面必须是客户组类节点"
            }
        ]
    },
    {
        "name": "tcustomer",
        "text": "客户组",
        "nodes": [
            {
                "type": "tcustomertargetgroup", "name": "目标组", "popWidth": 800,
                "unbindableNode": [
                    {
                        "targetType": "tcustomertargetgroup",
                        "message": "目标组节点不能与目标组节点连接"
                    },
                    {
                        "targetType": "tcustomerrespondgroup",
                        "message": "目标组节点不能与响应组节点连接"
                    }
                ]
            },
            {
                "type": "tcustomerrespondgroup", "name": "响应组", "popWidth": 800,
                "unbindableNode": [
                    {
                        "targetType": "tcustomertargetgroup",
                        "message": "响应组节点不能与目标组节点连接"
                    },
                    {
                        "targetType": "tcustomerrespondgroup",
                        "message": "响应组节点不能与响应组节点连接"
                    },
                    {
                        "targetType": "tspecialordermatch",
                        "message": "响应组节点不能与匹配订单节点连接"
                    }
                ]
            },
            {
                "type": "tspecialordermatch", "name": "匹配订单", "popWidth": 800, "popHeight": 600,
                "unbindableNode": [
                    {
                        "targetType": "tcustomertargetgroup",
                        "message": "匹配订单节点不能与目标组节点连接"
                    },
                    {
                        "targetType": "tcustomerrespondgroup",
                        "message": "匹配订单节点不能与响应组节点连接"
                    },
                    {
                        "targetType": "tspecialordermatch",
                        "message": "匹配订单节点不能与匹配订单节点连接"
                    }
                ]
            }
        ],
        "unbindableGroup": [
            {
                "targetGroupName": "tfilter",
                "message": "客户组类节点只能连接优惠方式、沟通方式、客户分析类节点"
            },
            {
                "targetGroupName": "tchannelresponse",
                "message": "客户组类节点只能连接优惠方式、沟通方式、客户分析类节点"
            },
            {
                "targetGroupName": "tcustomer",
                "message": "客户组类节点只能连接优惠方式、沟通方式、客户分析类节点"
            }
        ]
    },
    {
        "name": "tdiscount",
        "text": "优惠方式",
        "nodes": [
            {
                "type": "tdiscountEC", "name": "优惠券", "popWidth": 800
            },
            {
                "type": "tdiscountUMP", "name": "定向优惠", "popWidth": 800
            },
            {
                "type": "tdiscountdigitalpromocode", "name": "优惠码响应", "popWidth": 800, "popHeight": 600
            },
            {
                "type": "tdiscountISNew", "name": "积分发放", "popWidth": 800
            },
            {
                "type": "tdiscountIS", "name": "积分发放", "popWidth": 800
            },
            {
                "type": "tdiscountBenefit", "name": "淘宝权益", "popWidth": 800
            }
        ],
        "unbindableGroup": [
            {
                "targetGroupName": "tfilter",
                "message": "优惠方式类节点后面只能连等待、沟通方式类节点"
            },
            {
                "targetGroupName": "tcustomer",
                "message": "优惠方式类节点后面只能连等待、沟通方式类节点"
            },
            {
                "targetGroupName": "tdata",
                "message": "数据操作类节点前面必须是客户组类节点"
            },
            {
                "targetGroupName": "tchannelresponse",
                "message": "优惠方式类节点后面只能连等待、沟通方式类节点"
            },
            {
                "targetGroupName": "tanalysis",
                "message": "优惠方式类节点后面只能连等待、沟通方式类节点"
            },
            {
                "targetGroupName": "tdiscount",
                "message": "优惠方式类节点不能互相连接"
            }
        ]
    },
    {
        "name": "tcommunicate",
        "text": "沟通方式",
        "nodes": [
            {
                "type": "tcommunicateSMS", "name": "短信", "popWidth": 800
            },
            {
                "type": "tcommunicateEDM", "name": "EDM", "popWidth": 800
            },
            {
                "type": "tcommunicateMMS", "name": "彩信", "popWidth": 800, "popHeight": 600
            },
            {
                "type": "tcommunicateWAP", "name": "wap推送", "popWidth": 800, "popHeight": 600
            },
            {
                "type": "tcommunicateOther", "name": "线下活动", "popWidth": 800
            },
            {
                "type": "tcommunicateWechat", "name": "微信", "popWidth": 800
            }
        ],
        "unbindableGroup": [
            {
                "targetGroupName": "tfilter",
                "message": "沟通方式类节点后面只能连等待类节点"
            },
            {
                "targetGroupName": "tcustomer",
                "message": "沟通方式类节点后面只能连等待类节点"
            },
            {
                "targetGroupName": "tdiscount",
                "message": "沟通方式类节点后面只能连等待类节点"
            },
            {
                "targetGroupName": "tdata",
                "message": "数据操作类节点前面必须是客户组类节点"
            },
            {
                "targetGroupName": "tchannelresponse",
                "message": "沟通方式类节点后面只能连等待类节点"
            },
            {
                "targetGroupName": "tanalysis",
                "message": "沟通方式类节点后面只能连等待类节点"
            },
            {
                "targetGroupName": "tcommunicate",
                "message": "沟通方式类节点不能互相连接"
            }
        ]
    },
    {
        "name": "tchannelresponse",
        "text": "渠道反馈",
        "nodes": [
            {
                "type": "tchannelresponseEC", "name": "优惠券响应", "popWidth": 800
            },
            {
                "type": "tchannelresponseEDM", "name": "EDM响应", "popWidth": 800
            },
            {
                "type": "tchannelresponseDigitalPromoCode", "name": "数字优惠码响应", "popWidth": 800
            }
        ],
        "unbindableGroup": [
            {
                "targetGroupName": "tdiscount",
                "message": "优惠方式类节点前面必须是客户组类节点"
            },
            {
                "targetGroupName": "tcommunicate",
                "message": "沟通方式类节点前面必须是客户组类节点"
            },
            {
                "targetGroupName": "tdata",
                "message": "数据操作类节点前面必须是客户组类节点"
            },
            {
                "targetGroupName": "tanalysis",
                "message": "客户分析类节点前面必须是客户组类节点"
            }
        ]
    },
    {
        "name": "tdata",
        "text": "数据操作",
        "nodes": [
            {
                "type": "tdataloyaltyvip", "name": "忠诚度会员等级设置", "popWidth": 800
            },
            {
                "type": "tdatammsmart", "name": "智能会员等级", "popWidth": 800
            },
            {
                "type": "tdatammvip", "name": "会员等级", "popWidth": 800
            },
            {
                "type": "tdatacustomgroup", "name": "客户分组操作", "popWidth": 800
            },
            {
                "type": "tdataattributeedit", "name": "属性修改", "popWidth": 800
            }
        ],
        "unbindableGroup": [
            {
                "targetGroupName": "tflow",
                "message": "数据操作类节点是最终节点，不可连出"
            },
            {
                "targetGroupName": "tfilter",
                "message": "数据操作类节点是最终节点，不可连出"
            },
            {
                "targetGroupName": "tcustomer",
                "message": "数据操作类节点是最终节点，不可连出"
            },
            {
                "targetGroupName": "tdiscount",
                "message": "数据操作类节点是最终节点，不可连出"
            },
            {
                "targetGroupName": "tcommunicate",
                "message": "数据操作类节点是最终节点，不可连出"
            },
            {
                "targetGroupName": "tchannelresponse",
                "message": "数据操作类节点是最终节点，不可连出"
            },
            {
                "targetGroupName": "tdata",
                "message": "数据操作类节点不能互相连接"
            },
            {
                "targetGroupName": "tanalysis",
                "message": "数据操作类节点是最终节点，不可连出"
            }
        ]
    },
    {
        "name": "tanalysis",
        "text": "客户分析",
        "nodes": [
            {
                "type": "tanalysisorder", "name": "订单分析", "popWidth": 800
            },
            {
                "type": "tanalysiseffmarket", "name": "营销效果分析", "popWidth": 800
            },
            {
                "type": "tanalysisFeature", "name": "客户特征分析", "popWidth": 940,
                "message": "只允许目标组和响应组输入,不可连出"
            }
        ],
        "unbindableGroup": [
            {
                "targetGroupName": "tflow",
                "message": "客户分析类节点是最终节点，不可连出"
            },
            {
                "targetGroupName": "tfilter",
                "message": "客户分析类节点是最终节点，不可连出"
            },
            {
                "targetGroupName": "tcustomer",
                "message": "客户分析类节点是最终节点，不可连出"
            },
            {
                "targetGroupName": "tdiscount",
                "message": "客户分析类节点是最终节点，不可连出"
            },
            {
                "targetGroupName": "tcommunicate",
                "message": "客户分析类节点是最终节点，不可连出"
            },
            {
                "targetGroupName": "tchannelresponse",
                "message": "客户分析类节点是最终节点，不可连出"
            },
            {
                "targetGroupName": "tdata",
                "message": "客户分析类节点是最终节点，不可连出"
            },
            {
                "targetGroupName": "tanalysis",
                "message": "客户分析类节点不能互相连接"
            }
        ]
    }
];
var IncomingLimitation = {
    "multi": [             //可多连的节点集合
        "tfiltermerge", "tfilterand", "tfiltergrouppriority", "tdiscountEC", "tdiscountUMP", "tdiscountdigitalpromocode", "tcommunicateSMS", "tcommunicateWAP", "tcommunicateMMS", "tcommunicateEDM", "tcommunicateOther", "tflowwait"
    ],
    "maximum": [          //此集合为有最大极限控制且大于一条的节点集合
        {"type": "tfilterexclude", "num": 2}
    ]
};
var RuleValid = {
    valid: function (source, target) {
        var sourceGroup = this.findGroup(source);
        var targetGroup = this.findGroup(target);
        var validRule = this.validRule(sourceGroup, targetGroup);
        if (validRule.success) {
            validRule = this.validRule(targetGroup, sourceGroup);
            return validRule;
        } else {
            return validRule;
        }
    },
    findGroup: function (name) {
        for (var i = 0; i < edgeRule.length; i++) {
            var group = edgeRule[i];
            for (var j = 0; j < group.nodes.length; j++) {
                var node = group.nodes[j];
                if (name == node.type) {
                    return [group, node];
                }
            }
        }
    },
    validRule: function (sourceGroup, targetGroup) {
        var sgroup = sourceGroup[0];
        var snode = sourceGroup[1];
        var tgroup = targetGroup[0];
        var tnode = targetGroup[1];
        if (sgroup.unbindableGroup) {
            for (i = 0; i < sgroup.unbindableGroup.length; i++) {
                if (sgroup.unbindableGroup[i].targetGroupName == tgroup.name) {
                    return {success: false, message: sgroup.unbindableGroup[i].message};
                }
            }
        }
        if (snode.unbindableNode) {
            for (i = 0; i < snode.unbindableNode.length; i++) {
                if (snode.unbindableNode[i].targetType == tnode.type) {
                    return {success: false, message: snode.unbindableNode[i].message};
                }
            }
        }
        return {success: true, message: ''};
    }
};
