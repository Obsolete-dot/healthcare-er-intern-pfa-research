"use client";

import React, { useState, useMemo } from "react";
import { 
  Activity, Award, BarChart3, ChevronRight, Database, 
  ExternalLink, FileText, Filter, Layers, Search, ShieldCheck, 
  Sliders, Sparkles, TrendingUp, Zap, Building2, CheckCircle2, Clock, Globe, ArrowRight
} from "lucide-react";

// --- 结构化双语字典与管线数据 ---
interface PipelineItem {
  id: string;
  company: { cn: string; en: string };
  category: "GLOBAL" | "DOMESTIC";
  productName: string;
  energyType: { cn: string; en: string };
  targetIndication: { cn: string; en: string };
  clinicalStage: { cn: string; en: string };
  highlights: { cn: string; en: string };
}

const PIPELINE_DATA: PipelineItem[] = [
  {
    id: "1",
    company: { cn: "Boston Scientific (波士顿科学)", en: "Boston Scientific" },
    category: "GLOBAL",
    productName: "Farapulse PFA System",
    energyType: { cn: "单高压脉冲 (PFA)", en: "Pulsed Field Ablation (Single-mode)" },
    targetIndication: { cn: "阵发性房颤 (PAF)", en: "Paroxysmal Atrial Fibrillation (PAF)" },
    clinicalStage: { cn: "已获批上市 (FDA / NMPA)", en: "Commercialized (FDA & NMPA Approved)" },
    highlights: {
      cn: "全球首款获批 PFA 系统，五瓣花形网状导管，兼顾操作学习曲线与肺静脉隔离效率。",
      en: "First-in-class global commercial PFA system. Novel 5-spline flower catheter ensuring rapid PVI and steep learning curve reduction."
    }
  },
  {
    id: "2",
    company: { cn: "Medtronic (美敦力)", en: "Medtronic" },
    category: "GLOBAL",
    productName: "PulseSelect System",
    energyType: { cn: "单高压脉冲 (PFA)", en: "Pulsed Field Ablation (Single-mode)" },
    targetIndication: { cn: "阵发性 / 持续性房颤", en: "Paroxysmal & Persistent AF" },
    clinicalStage: { cn: "已获批上市 (FDA / NMPA)", en: "Commercialized (FDA & NMPA Approved)" },
    highlights: {
      cn: "首个获 FDA/NMPA 批准的双适应症 PFA 导管，环状 9 极电极设计，贴靠稳定性与安全性俱佳。",
      en: "First dual-indication FDA/NMPA approved catheter with a 9-pole circular array, offering predictable tissue contact and safety profile."
    }
  },
  {
    id: "3",
    company: { cn: "Johnson & Johnson (强生)", en: "Johnson & Johnson (Biosense Webster)" },
    category: "GLOBAL",
    productName: "VARIPULSE™ (Integrated with CARTO 3)",
    energyType: { cn: "单高压脉冲 (PFA)", en: "Pulsed Field Ablation (Single-mode)" },
    targetIndication: { cn: "阵发性房颤", en: "Paroxysmal Atrial Fibrillation" },
    clinicalStage: { cn: "已获批上市 (FDA / NMPA)", en: "Commercialized (FDA & NMPA Approved)" },
    highlights: {
      cn: "深度集成 CARTO 3 三维电生理标测系统，真正实现术中零射线/低射线的三维可视化消融。",
      en: "Seamlessly integrated with CARTO 3 3D electro-anatomical mapping, enabling zero/ultra-low fluoroscopy real-time ablation."
    }
  },
  {
    id: "4",
    company: { cn: "玄宇医疗 (XuanYu Medical)", en: "XuanYu Medical" },
    category: "DOMESTIC",
    productName: "AblatEasy™ Multi-Channel Dual-Energy System",
    energyType: { cn: "PFA + RF 双能量融合", en: "Dual-Energy (PFA + RF Hybrid)" },
    targetIndication: { cn: "房颤 / 房扑 / 室早 (广谱心律失常)", en: "Atrial Fibrillation / Atrial Flutter / PVC" },
    clinicalStage: { cn: "注册申报阶段 (NMPA Review)", en: "NMPA Registration / Filing Stage" },
    highlights: {
      cn: "独创双能量架构，一台主机可在脉冲与射频间自由切换；兼顾肺静脉隔离安全性与深层心室肌透壁深度。",
      en: "Proprietary hybrid architecture allowing seamless intraoperative switching between PFA and RF; optimizes transmural depth and peri-esophageal safety."
    }
  },
  {
    id: "5",
    company: { cn: "锦江电子 (Jinjiang Electronic)", en: "Jinjiang Electronic" },
    category: "DOMESTIC",
    productName: "LEAD-PFA / Pureswitch",
    energyType: { cn: "单高压脉冲 (PFA)", en: "Pulsed Field Ablation (Single-mode)" },
    targetIndication: { cn: "阵发性房颤", en: "Paroxysmal Atrial Fibrillation" },
    clinicalStage: { cn: "已获批上市 (NMPA 创新绿通)", en: "Commercialized (NMPA Green Channel Approved)" },
    highlights: {
      cn: "国产首张 PFA 医疗器械注册证获得者，自研全套三维标测系统与高压发生器，国产替代先锋。",
      en: "First domestic NMPA Class III registration winner for PFA; proprietary high-voltage generator and matching 3D mapping ecosystem."
    }
  },
  {
    id: "6",
    company: { cn: "德诺医疗 / 诺生医疗", en: "Denuo Medical / Nuo生" },
    category: "DOMESTIC",
    productName: "CardioPulse™ PFA",
    energyType: { cn: "单高压脉冲 (PFA)", en: "Pulsed Field Ablation (Single-mode)" },
    targetIndication: { cn: "阵发性房颤", en: "Paroxysmal Atrial Fibrillation" },
    clinicalStage: { cn: "已获批上市 (NMPA Approved)", en: "Commercialized (NMPA Approved)" },
    highlights: {
      cn: "创新球囊网篮一体化结构，具备自主专利电极微弧防护，获国家创新医疗器械特别审批通道。",
      en: "Integrated basket-balloon design with micro-arc suppression technology; approved via China NMPA Innovative Device Green Channel."
    }
  },
  {
    id: "7",
    company: { cn: "惠泰医疗 (APT Medical)", en: "APT Medical" },
    category: "DOMESTIC",
    productName: "PFA Catheter & Generator Suite",
    energyType: { cn: "单高压脉冲 (PFA)", en: "Pulsed Field Ablation (Single-mode)" },
    targetIndication: { cn: "房颤消融介入", en: "Atrial Fibrillation Ablation" },
    clinicalStage: { cn: "临床随访与注册入组", en: "Clinical Follow-up / Multi-center Trial" },
    highlights: {
      cn: "与自研三维电生理系统高度协同，渠道覆盖国内上千家核心医院，商业化协同与进口替代潜力大。",
      en: "Strong synergy with established 3D mapping and access to 1,000+ top-tier domestic hospital networks for rapid post-approval scaling."
    }
  }
];

const LIFECYCLE_STEPS = [
  {
    step: "01",
    phase: { cn: "研发立项与概念验证", en: "R&D Definition & Proof-of-Concept" },
    duration: { cn: "6 - 12 个月", en: "6 - 12 Months" },
    keyTasks: {
      cn: ["临床痛点需求定义 (PRD)", "脉冲发生器波形设计 (微秒/纳秒脉冲)", "电极材料与抗击穿绝缘验证", "专利布局与 FTO 自由实施分析"],
      en: ["Clinical requirement definition (PRD)", "Waveform optimization (Microsecond/Nanosecond)", "Electrode insulation & dielectric testing", "Global IP layout & FTO clearance analysis"]
    },
    deliverable: { cn: "原理样机与核心专利申请", en: "Functional Prototype & Core Patent Filing" }
  },
  {
    step: "02",
    phase: { cn: "型式检验与大动物实验", en: "Type Testing & Preclinical Animal Trials" },
    duration: { cn: "10 - 18 个月", en: "10 - 18 Months" },
    keyTasks: {
      cn: ["医疗器械电磁兼容 (EMC) 及电气安规检验", "生物相容性全套测试 (ISO 10993)", "大动物 (猪/羊) 肺静脉隔离急慢性实验", "病理切片透壁性检验与无冠脉/食道副损伤验证"],
      en: ["Medical device EMC & electrical safety testing", "Biocompatibility certification (ISO 10993)", "In-vivo swine/ovine acute & chronic PVI models", "Pathological transmurality & safety validation"]
    },
    deliverable: { cn: "第三方检验报告 & 动物安全性评价报告", en: "Certified Type Test & GLP Animal Safety Reports" }
  },
  {
    step: "03",
    phase: { cn: "临床试验 (GCP) 与随访", en: "Multi-Center Clinical Trials (GCP)" },
    duration: { cn: "18 - 30 个月", en: "18 - 30 Months" },
    keyTasks: {
      cn: ["伦理委员会审批 (IRB) 与临床试验方案设计", "多中心临床入组 (PI 带头顶级医院试验)", "术后 3/6/12 个月心电 Holter 随访", "主要疗效终点 (12个月房颤无复发率) 统计"],
      en: ["IRB ethics approval & statistical protocol design", "Multi-center patient enrollment led by Key PIs", "3/6/12-month Holter ECG structured follow-up", "Primary efficacy (12M AF-free rate) & safety endpoints"]
    },
    deliverable: { cn: "多中心注册临床试验总结报告 (CSR)", en: "Clinical Study Report (CSR) for Registration" }
  },
  {
    step: "04",
    phase: { cn: "NMPA 注册申报与体系考核", en: "NMPA Regulatory Filing & GMP Audit" },
    duration: { cn: "9 - 15 个月", en: "9 - 15 Months" },
    keyTasks: {
      cn: ["国家药监局创新器械特别审批申请 (创新绿通)", "技术审评中心 (CMDE) 专家质询与发补答辩", "GMP 生产质量管理规范现场考核体系检查", "器械注册证与生产许可证获批"],
      en: ["NMPA Innovation Green Channel special review submission", "CMDE technical review, deficiency letter & defense", "On-site GMP quality management system inspection", "Class III Medical Device & Manufacturing Licenses"]
    },
    deliverable: { cn: "国家三类医疗器械注册证 (Class III)", en: "NMPA Class III Medical Device Certificate" }
  },
  {
    step: "05",
    phase: { cn: "物价立项、医保准入与商业化进院", en: "Pricing Code, Reimbursement & Commercial Access" },
    duration: { cn: "持续进行", en: "Ongoing Commercialization" },
    keyTasks: {
      cn: ["各省发改/卫健委新增医疗服务价格项目立项", "省级医保局阳光挂网与耗材医保代码映射", "医院药事会/器械委员会招标遴选进院", "术者带教 (Proctoring) 与学术研讨推广"],
      en: ["Provincial healthcare fee schedule establishment", "Sunlight procurement listing & insurance code mapping", "Hospital tender committee approval & listing", "Physician proctoring, training & academic congresses"]
    },
    deliverable: { cn: "阳光挂网代码、进院采购与商业化放量", en: "Procurement Code, Hospital Listing & Revenue Scaling" }
  }
];

export default function PFAPortfolioPage() {
  const [lang, setLang] = useState<"cn" | "en">("cn");
  const [activeTab, setActiveTab] = useState<"overview" | "lifecycle" | "pipelines" | "company" | "tam">("overview");

  // 管线筛选与搜索状态
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // TAM 测算参数状态
  const [patientPool, setPatientPool] = useState<number>(2000); // 万人 (中国房颤患者)
  const [ablationPenetration, setAblationPenetration] = useState<number>(1.8); // % 手术渗透率
  const [pfaShareInAblation, setPfaShareInAblation] = useState<number>(55); // % PFA 替代率
  const [kitPrice, setKitPrice] = useState<number>(28000); // RMB 耗材单价

  // 动态测算计算
  const tamCalculations = useMemo(() => {
    const totalSurgeryCount = (patientPool * 10000) * (ablationPenetration / 100);
    const pfaSurgeryCount = totalSurgeryCount * (pfaShareInAblation / 100);
    const totalMarketValueRMB = (pfaSurgeryCount * kitPrice) / 100000000; // 亿元
    const totalMarketValueUSD = (totalMarketValueRMB * 100) / 7.2; // 百万美元 (汇率按 7.2 估算)
    return {
      totalSurgeryCount: Math.round(totalSurgeryCount),
      pfaSurgeryCount: Math.round(pfaSurgeryCount),
      totalMarketValueRMB: totalMarketValueRMB.toFixed(2),
      totalMarketValueUSD: totalMarketValueUSD.toFixed(1)
    };
  }, [patientPool, ablationPenetration, pfaShareInAblation, kitPrice]);

  // 过滤管线数据
  const filteredPipelines = useMemo(() => {
    return PIPELINE_DATA.filter(item => {
      const companyName = lang === "cn" ? item.company.cn : item.company.en;
      const highlightsText = lang === "cn" ? item.highlights.cn : item.highlights.en;
      const matchSearch = companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          highlightsText.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === "ALL" || item.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory, lang]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans selection:bg-teal-500 selection:text-white">
      {/* 顶部 Header / 导航栏 */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> 
                {lang === "cn" ? "医药与医疗器械行研成果" : "Healthcare & MedTech Equity Research"}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {lang === "cn" ? "实习专题交互看板｜吳永鈞(吴永钧)" : "Interactive Equity Research & TAM Valuation Portfolio on Pulsed Field Ablation. | Ng Wing Kwan(George)"}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
              {lang === "cn" 
                ? "PFA 脉冲电场消融赛道全景研究与产业落地看板" 
                : "Pulsed Field Ablation (PFA) Industry Landscape & Valuation Terminal"}
            </h1>
          </div>

          {/* 右侧：中英文切换按钮与专业 Tag */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "cn" ? "en" : "cn")}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === "cn" ? "English Version (EN)" : "切换至中文 (CN)"}</span>
            </button>
            <span className="hidden sm:inline-block text-xs px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200/60 font-medium">
              Electrophysiology / MedTech
            </span>
          </div>
        </div>

        {/* 模块切换导航 Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex space-x-2 overflow-x-auto border-t border-slate-100">
          {[
            { id: "overview", label: lang === "cn" ? "赛道逻辑与技术颠覆" : "Core Thesis & Tech Shift", icon: Zap },
            { id: "lifecycle", label: lang === "cn" ? "器械 0 到 1 上市流程" : "MedTech 0-to-1 Roadmap", icon: Layers },
            { id: "pipelines", label: lang === "cn" ? "知名企业管线数据库" : "Global Pipeline Database", icon: Database },
            { id: "company", label: lang === "cn" ? "玄宇医疗深度拆解" : "Company Deep-Dive: XuanYu", icon: Building2 },
            { id: "tam", label: lang === "cn" ? "市场空间动态测算" : "Interactive TAM Model", icon: BarChart3 }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-all ${
                  isActive
                    ? "border-teal-600 text-teal-700 font-semibold bg-teal-50/50"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-teal-600" : "text-slate-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* 主体内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* ================= TAB 1: 赛道核心逻辑 ================= */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* 顶栏投资要点卡片 */}
            <div className="bg-gradient-to-r from-teal-50 via-white to-blue-50 border border-teal-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-teal-600 text-white rounded-lg shadow-xs">
                  <Zap className="w-5 h-5" />
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {lang === "cn" 
                    ? "核心行研论点：为什么 PFA 是电生理领域的“范式革命”？" 
                    : "Investment Thesis: Why PFA Represents a Paradigm Shift in Cardiac EP?"}
                </h2>
              </div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {lang === "cn" ? (
                  <>
                    传统导管消融依赖热传导机制（射频 RF 的热损伤或冷冻球囊的超低温冻死），易伤及临近的食道、膈神经及肺静脉。
                    **PFA（脉冲电场消融）基于不可逆电穿孔（IRE）生物物理机制**，由于心肌细胞具备独特的电场阈值特异性，在保证高效透壁的同时，几乎不损伤周边非心肌组织，将消融操作时间大幅缩短 50% 以上，正迅速重构全球数百亿美元的房颤介入市场。
                  </>
                ) : (
                  <>
                    Traditional thermal ablation (Radiofrequency thermal injury or Cryoballoon extreme freezing) carries non-negligible collateral damage risks to the adjacent esophagus and phrenic nerve. 
                    **Pulsed Field Ablation (PFA) leverages non-thermal Irreversible Electroporation (IRE)**. Due to cardiac myocytes possessing the lowest electrical field threshold among tissues, PFA achieves rapid transmural lesion while sparing surrounding nerves and vessels—slashing procedure times by &gt;50% and driving global standard-of-care transition.
                  </>
                )}
              </p>
            </div>

            {/* 三代技术横向对比表 */}
            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-600" />
                  {lang === "cn" ? "三代房颤消融技术核心参数横向对比" : "Head-to-Head Comparison: Three Generations of AF Ablation Tech"}
                </h3>
                <span className="text-xs text-slate-400">PULSED AF / ADVENT / BEAT-AF Trial Source</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-4">{lang === "cn" ? "消融技术路线" : "Technology Modality"}</th>
                      <th className="p-4">{lang === "cn" ? "生物物理消融机制" : "Biophysical Mechanism"}</th>
                      <th className="p-4">{lang === "cn" ? "组织选择性 (安全性)" : "Tissue Selectivity"}</th>
                      <th className="p-4">{lang === "cn" ? "单次放电耗时" : "Ablation Time / Application"}</th>
                      <th className="p-4">{lang === "cn" ? "主要并发症风险" : "Key Clinical Complications"}</th>
                      <th className="p-4">{lang === "cn" ? "术者学习曲线" : "Learning Curve"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-semibold text-slate-900">{lang === "cn" ? "第一代：射频消融 (RF)" : "1st Gen: Radiofrequency (RF)"}</td>
                      <td className="p-4 text-slate-600">{lang === "cn" ? "热能致凝固性坏死" : "Thermal coagulative necrosis"}</td>
                      <td className="p-4 text-amber-600 font-medium">{lang === "cn" ? "无 (易伤及食道/神经)" : "None (High collateral risk)"}</td>
                      <td className="p-4">20 - 40s ({lang === "cn" ? "点对点贴靠" : "Point-by-point"})</td>
                      <td className="p-4 text-slate-600">{lang === "cn" ? "心包填塞、食道瘘、PV狭窄" : "Esophageal fistula, PV stenosis"}</td>
                      <td className="p-4">{lang === "cn" ? "陡峭 (需百台以上经验)" : "Steep (>100 cases)"}</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-semibold text-slate-900">{lang === "cn" ? "第二代：冷冻球囊 (Cryo)" : "2nd Gen: Cryoballoon"}</td>
                      <td className="p-4 text-slate-600">{lang === "cn" ? "超低温冰晶胞破" : "Cryo-induced microvascular damage"}</td>
                      <td className="p-4 text-amber-600 font-medium">{lang === "cn" ? "低 (易致膈神经麻痹)" : "Low (Phrenic nerve injury)"}</td>
                      <td className="p-4">120 - 180s</td>
                      <td className="p-4 text-slate-600">{lang === "cn" ? "一过性膈神经麻痹" : "Transient phrenic nerve palsy"}</td>
                      <td className="p-4">{lang === "cn" ? "中等" : "Moderate"}</td>
                    </tr>
                    <tr className="bg-teal-50/40 hover:bg-teal-50/60 border-l-4 border-l-teal-600">
                      <td className="p-4 font-bold text-teal-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-teal-600" /> 
                        {lang === "cn" ? "第三代：脉冲电场 (PFA)" : "3rd Gen: Pulsed Field (PFA)"}
                      </td>
                      <td className="p-4 font-medium text-slate-800">{lang === "cn" ? "不可逆纳米级电穿孔 (IRE)" : "Non-thermal irreversible electroporation"}</td>
                      <td className="p-4 font-bold text-teal-700">{lang === "cn" ? "极高 (心肌特异性)" : "Highest (Myocardial specificity)"}</td>
                      <td className="p-4 font-bold text-teal-700">{lang === "cn" ? "数十毫秒级极速放电" : "Sub-second (Milliseconds)"}</td>
                      <td className="p-4 text-slate-700">{lang === "cn" ? "极低（无食道瘘报道）" : "Zero esophageal fistula reported"}</td>
                      <td className="p-4 font-semibold text-teal-800">{lang === "cn" ? "平缓 (极易掌握)" : "Gentle (Fast adoption)"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3 大核心商业驱动指标 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <div className="text-teal-700 font-bold text-xs uppercase tracking-wider mb-1">
                  {lang === "cn" ? "手术室周转效率" : "Cath Lab Efficiency"}
                </div>
                <div className="text-3xl font-extrabold text-slate-900">~45 mins</div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {lang === "cn" 
                    ? "单台手术耗时由传统的 2-3 小时缩短至 45 分钟以内，单导管室日均手术台次翻倍。" 
                    : "Procedure times cut from 2-3h to <45 mins, doubling daily Cath Lab turnover rates."}
                </p>
              </div>
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <div className="text-blue-700 font-bold text-xs uppercase tracking-wider mb-1">
                  {lang === "cn" ? "1 年窦性心律维持率" : "1-Year Efficacy Rate"}
                </div>
                <div className="text-3xl font-extrabold text-slate-900">~80%</div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {lang === "cn" 
                    ? "在阵发性房颤中 12 个月无房颤复发率达 80% 左右，媲美或优于传统热消融。" 
                    : "12-month Freedom from AF in PAF cohort reaches ~80%, matching or exceeding RF benchmarks."}
                </p>
              </div>
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <div className="text-indigo-700 font-bold text-xs uppercase tracking-wider mb-1">
                  {lang === "cn" ? "全球并购热度" : "Global M&A Activity"}
                </div>
                <div className="text-3xl font-extrabold text-slate-900">&gt; $3.5B</div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {lang === "cn" 
                    ? "波科收购 Farapulse、美敦力收购 Affera，引爆跨国巨头在电生理领域的军备竞赛。" 
                    : "Mega acquisitions (Farapulse, Affera) ignite global race among MedTech giants."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: 0到1上市全流程 ================= */}
        {activeTab === "lifecycle" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-teal-600" />
                {lang === "cn" 
                  ? "三类创新医疗器械从 0 到 1 产业化与注册上市全生命周期" 
                  : "Class III Innovative MedTech 0-to-1 Commercialization Roadmap"}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {lang === "cn"
                  ? "以高压脉冲电场消融系统（主机发生器 + 标测/消融导管）为例拆解的完整研发、监管审评与进院闭环。"
                  : "End-to-end regulatory, clinical trial, and commercial access pathway for advanced PFA systems."}
              </p>
            </div>

            <div className="space-y-4">
              {LIFECYCLE_STEPS.map((item) => (
                <div 
                  key={item.step} 
                  className="bg-white border border-slate-200/80 hover:border-teal-300 rounded-2xl p-5 transition-all shadow-xs hover:shadow-md flex flex-col md:flex-row gap-5 items-start"
                >
                  <div className="flex items-center gap-3 md:flex-col md:items-start md:min-w-[140px]">
                    <span className="text-2xl font-black text-teal-600">{item.step}</span>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 border border-teal-200/50 rounded-md">
                      {lang === "cn" ? item.duration.cn : item.duration.en}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900">
                      {lang === "cn" ? item.phase.cn : item.phase.en}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      {(lang === "cn" ? item.keyTasks.cn : item.keyTasks.en).map((task, tIdx) => (
                        <div key={tIdx} className="text-xs text-slate-600 flex items-start gap-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-60 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60 shrink-0">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {lang === "cn" ? "关键交付物 / 里程碑" : "Key Milestone Deliverable"}
                    </div>
                    <div className="text-xs font-bold text-teal-800 mt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" /> 
                      {lang === "cn" ? item.deliverable.cn : item.deliverable.en}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: 管线追踪器 ================= */}
        {activeTab === "pipelines" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder={lang === "cn" ? "搜索厂商、产品名称或技术特点..." : "Search company, product name, or tech..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>

              {/* 筛选阵营 */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">{lang === "cn" ? "阵营筛选:" : "Filter:"}</span>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
                >
                  <option value="ALL">{lang === "cn" ? "全部厂商 (All)" : "All Players"}</option>
                  <option value="GLOBAL">{lang === "cn" ? "外资巨头 (Global MNCs)" : "Global MNCs"}</option>
                  <option value="DOMESTIC">{lang === "cn" ? "国产领跑者 (Domestic Leaders)" : "Domestic Leaders"}</option>
                </select>
              </div>
            </div>

            {/* 管线卡片 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredPipelines.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white border border-slate-200/80 hover:border-teal-300 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          item.category === "GLOBAL" 
                            ? "bg-indigo-50 text-indigo-700 border border-indigo-200" 
                            : "bg-teal-50 text-teal-700 border border-teal-200"
                        }`}>
                          {item.category === "GLOBAL" ? (lang === "cn" ? "外资巨头" : "Global MNC") : (lang === "cn" ? "国产领跑" : "Domestic Leader")}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-2">
                          {lang === "cn" ? item.company.cn : item.company.en}
                        </h4>
                      </div>
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold shrink-0">
                        {lang === "cn" ? item.clinicalStage.cn : item.clinicalStage.en}
                      </span>
                    </div>

                    <div className="mt-3.5 space-y-1.5 text-xs text-slate-600">
                      <div>
                        <span className="text-slate-400 font-medium">{lang === "cn" ? "产品名称: " : "Product: "}</span>
                        <span className="font-semibold text-slate-800">{item.productName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">{lang === "cn" ? "能源架构: " : "Energy: "}</span>
                        <span className="font-medium text-teal-700">{lang === "cn" ? item.energyType.cn : item.energyType.en}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">{lang === "cn" ? "核心适应症: " : "Indication: "}</span>
                        <span className="text-slate-700">{lang === "cn" ? item.targetIndication.cn : item.targetIndication.en}</span>
                      </div>
                    </div>

                    <p className="mt-3.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                      {lang === "cn" ? item.highlights.cn : item.highlights.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: 玄宇医疗深度分析 ================= */}
        {activeTab === "company" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-50 via-white to-indigo-50 border border-teal-100 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-teal-600 text-white text-xs font-semibold shadow-xs">
                    {lang === "cn" ? "重点未上市标的专题研究" : "Key Private Target Deep-Dive"}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2">
                    {lang === "cn" ? "玄宇医疗 (XuanYu Medical)" : "XuanYu Medical Technology"}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === "cn" 
                      ? "新一代电生理多模消融系统与心血管介入整体平台" 
                      : "Next-generation multi-energy EP ablation platform & innovative cardiovascular intervention"}
                  </p>
                </div>
                <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200/80 text-left sm:text-right shadow-xs">
                  <div className="text-[11px] text-slate-400 font-medium">{lang === "cn" ? "核心技术标签" : "Key Focus"}</div>
                  <div className="text-xs font-bold text-teal-700">PFA + RF Hybrid / Multi-Energy</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  {lang === "cn" ? "核心差异化壁垒：双能量多模消融架构" : "Core Moat: Dual-Energy Multi-Modal Architecture"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === "cn"
                    ? "纯 PFA 系统在应对心室肌等深层增厚心肌时，易存在电穿孔深度不够的局限。玄宇自研的“高压脉冲 + 射频”双模发生器，可根据术中阻抗与组织厚度智能切换，实现“快速肺静脉隔离用脉冲，深层特殊解剖结构用射频”的高效互补。"
                    : "Standalone PFA systems face penetration depth challenges in thicker ventricular tissues. XuanYu's proprietary PFA+RF hybrid platform dynamically adapts to tissue impedance—leveraging PFA for rapid pulmonary vein isolation and RF for deep, non-standard anatomical sites."}
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  {lang === "cn" ? "底层硬件闭环与抗电弧专利" : "Proprietary Generator Hardware & Micro-Arc Prevention"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === "cn"
                    ? "具备全自主知识产权的高压纳秒/微秒级脉冲发生模块与电极抗电弧放电技术，有效避免了高压放电过程中的微气泡与骨骼肌颤动问题；在电极材料与绝缘涂层工艺上具备成熟量产能力。"
                    : "Equipped with proprietary nanosecond/microsecond pulse generators and patented arc-suppression algorithms to minimize micro-bubbles and skeletal muscle twitching during high-voltage delivery."}
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  {lang === "cn" ? "临床试验进展与上市预期" : "Clinical Milestones & Registration Timeline"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === "cn"
                    ? "核心房颤消融系统已在包括国家心血管病中心（阜外医院）、安贞医院等国内顶尖中心完成多中心注册临床试验，主要疗效与安全性终点达标，目前已进入国家药监局注册申报冲刺阶段。"
                    : "Multi-center clinical trials completed at top-tier centers (e.g., Fuwai Hospital, Anzhen Hospital). Met all primary non-inferiority and safety endpoints; currently advancing through NMPA final registration review."}
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  {lang === "cn" ? "行研投资观点与商业化前景" : "Equity Research View & Valuation Outlook"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === "cn"
                    ? "国内电生理市场兼具‘进口替代’与‘技术迭代’双重机遇。玄宇若顺利获批，将作为国产第一梯队与强生、波科同台竞技；其多模态管线若能与三维电生理标测系统形成协同，将显著提高入院门槛壁垒。"
                    : "The domestic EP market presents dual tailwinds of import substitution and technology iteration. Once approved, XuanYu will be well-positioned among first-tier domestic champions to challenge global MNCs."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: TAM 市场空间测算 ================= */}
        {activeTab === "tam" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-teal-600" />
                {lang === "cn" 
                  ? "中国房颤 PFA 耗材市场空间敏感性分析模型 (Interactive TAM Model)" 
                  : "China AF PFA Addressable Market (TAM) Sensitivity Analysis Model"}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {lang === "cn"
                  ? "可通过拖动下方参数滑块，实时观察中国房颤患者基数、手术渗透率及耗材价格对百亿级市场空间的动态影响。"
                  : "Adjust key macroeconomic and clinical assumption sliders to dynamically compute the total addressable market size."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 参数滑块面板 */}
              <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 space-y-6 shadow-sm">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-700 font-medium">
                      {lang === "cn" ? "中国房颤 (AF) 患病人数基数" : "China AF Patient Population"}
                    </span>
                    <span className="font-bold text-teal-700">{patientPool} {lang === "cn" ? "万人" : "Million"}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="3000"
                    step="50"
                    value={patientPool}
                    onChange={(e) => setPatientPool(Number(e.target.value))}
                    className="w-full accent-teal-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>1,000M</span>
                    <span>{lang === "cn" ? "当前基数 (~2,000万)" : "Base: ~20M Patients"}</span>
                    <span>3,000M</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-700 font-medium">
                      {lang === "cn" ? "导管消融手术整体渗透率" : "Catheter Ablation Surgical Penetration Rate"}
                    </span>
                    <span className="font-bold text-blue-700">{ablationPenetration}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="6.0"
                    step="0.1"
                    value={ablationPenetration}
                    onChange={(e) => setAblationPenetration(Number(e.target.value))}
                    className="w-full accent-blue-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>0.5% ({lang === "cn" ? "现状低水平" : "Current Baseline"})</span>
                    <span>{lang === "cn" ? "欧美当前水平 (~3-4%)" : "US/EU Benchmark (~3-4%)"}</span>
                    <span>6.0%</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-700 font-medium">
                      {lang === "cn" ? "PFA 在所有消融手术中的替代渗透率" : "PFA Adoption Rate in All AF Ablations"}
                    </span>
                    <span className="font-bold text-indigo-700">{pfaShareInAblation}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={pfaShareInAblation}
                    onChange={(e) => setPfaShareInAblation(Number(e.target.value))}
                    className="w-full accent-indigo-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>10% ({lang === "cn" ? "导入期" : "Early Stage"})</span>
                    <span>50% ({lang === "cn" ? "主流替代" : "Mainstream"})</span>
                    <span>90% ({lang === "cn" ? "全面普及" : "Mature"})</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-700 font-medium">
                      {lang === "cn" ? "单台 PFA 导管与耗材终端打包价格" : "Average PFA Catheter Kit Price per Case"}
                    </span>
                    <span className="font-bold text-amber-700">¥ {kitPrice.toLocaleString()} RMB</span>
                  </div>
                  <input
                    type="range"
                    min="15000"
                    max="45000"
                    step="1000"
                    value={kitPrice}
                    onChange={(e) => setKitPrice(Number(e.target.value))}
                    className="w-full accent-amber-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>¥15,000 ({lang === "cn" ? "集采后中枢" : "Post-VBP Price"})</span>
                    <span>¥28,000 ({lang === "cn" ? "均衡期" : "Baseline"})</span>
                    <span>¥45,000 ({lang === "cn" ? "上市初期" : "Launch Premium"})</span>
                  </div>
                </div>
              </div>

              {/* 测算结果输出卡片 */}
              <div className="bg-gradient-to-br from-teal-800 to-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between shadow-md">
                <div>
                  <div className="inline-block text-[11px] font-bold px-2.5 py-1 bg-white/10 rounded-md text-teal-200 uppercase tracking-wider">
                    {lang === "cn" ? "动态模型测算输出" : "Model Output Summary"}
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div>
                      <div className="text-xs text-slate-300">
                        {lang === "cn" ? "全国房颤年消融手术总台数:" : "Total Annual AF Ablations (China):"}
                      </div>
                      <div className="text-xl font-bold text-white mt-0.5">
                        {tamCalculations.totalSurgeryCount.toLocaleString()} {lang === "cn" ? "台 / 年" : "Procedures/yr"}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-300">
                        {lang === "cn" ? "其中 PFA 消融手术台数:" : "Annual PFA Case Volume:"}
                      </div>
                      <div className="text-xl font-bold text-teal-300 mt-0.5">
                        {tamCalculations.pfaSurgeryCount.toLocaleString()} {lang === "cn" ? "台 / 年" : "Procedures/yr"}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/15">
                      <div className="text-xs font-semibold text-teal-200">
                        {lang === "cn" ? "中国 PFA 耗材潜在市场空间 (TAM):" : "Projected China PFA Device TAM:"}
                      </div>
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-emerald-300 mt-1">
                        ¥ {tamCalculations.totalMarketValueRMB} {lang === "cn" ? "亿元" : "Billion RMB"}
                      </div>
                      <div className="text-xs text-slate-300 font-medium mt-1">
                        (~ ${tamCalculations.totalMarketValueUSD} Million USD)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-[11px] text-slate-300 bg-white/10 p-3 rounded-xl border border-white/10 leading-relaxed">
                  💡 {lang === "cn" 
                    ? "行研启示：得益于手术耗时减半和更低的并发症，当中国手术渗透率向欧美水平（3%）靠拢时，PFA 耗材将迅速迈入百亿级黄金市场。" 
                    : "Key Takeaway: With procedure times halved and superior safety profile, closing the surgical penetration gap toward 3% unlocks a multi-billion RMB blockbuster segment."}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}