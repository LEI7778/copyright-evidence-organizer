const CASE_STORAGE_KEY = "copyright-evidence-organizer-cases";
const RIGHTS_STORAGE_KEY = "rights-document-checklist-records";

const CLOSED_STATUS = "已下架/结案";
const ARCHIVED_STATUS = "审核通过并归档";
const UNKNOWN_VALUE = "待人工确认";

const extractionFieldLabels = {
  rightsOwner: "权利人/授权人",
  authorizedParty: "被授权人",
  workTitle: "作品名称",
  authorizationTerm: "授权期限",
  authorizationScope: "授权范围",
  includesInfoNetworkRight: "是否包含信息网络传播权",
  includesEnforcementRight: "是否包含维权/投诉/诉讼授权",
  allowsSublicense: "是否允许转授权",
  attachmentList: "附件清单"
};

const caseExtractionFieldLabels = {
  workTitle: "作品名称",
  rightsHolder: "权利人",
  infringingUrl: "侵权链接",
  platform: "平台",
  foundAt: "发现时间",
  screenshotStatus: "截图情况",
  ownershipStatus: "权属文件情况",
  status: "处理进度"
};

const sampleCases = [
  {
    id: "CE-20260608-001",
    workTitle: "《星河旅人》动画片段",
    rightsHolder: "上海星影文化传媒有限公司",
    infringingUrl: "https://www.example.com/video/av10001",
    platform: "哔哩哔哩",
    foundAt: "2026-06-08T09:35",
    status: "待补材料",
    screenshotStatus: "已截图待核验",
    ownershipStatus: "待补授权链",
    files: ["侵权页面截图.png", "作品登记证.pdf"],
    notes: "截图需补充系统时间；授权链缺少被授权主体盖章页。",
    createdAt: "2026-06-08T09:42:00.000Z"
  },
  {
    id: "CE-20260608-002",
    workTitle: "品牌宣传海报主视觉",
    rightsHolder: "杭州青石品牌管理有限公司",
    infringingUrl: "https://www.example.com/post/8832",
    platform: "小红书",
    foundAt: "2026-06-07T16:20",
    status: "已发函/投诉",
    screenshotStatus: "截图完整",
    ownershipStatus: "已收到待审核",
    files: ["侵权笔记截图.pdf", "投诉函.docx", "授权书扫描件.pdf"],
    notes: "已提交平台投诉，等待审核反馈。",
    createdAt: "2026-06-08T10:01:00.000Z"
  },
  {
    id: "CE-20260608-003",
    workTitle: "音乐 MV 花絮视频",
    rightsHolder: "北京云声娱乐有限公司",
    infringingUrl: "https://www.example.com/video/202606",
    platform: "抖音",
    foundAt: "2026-06-06T11:05",
    status: CLOSED_STATUS,
    screenshotStatus: "截图完整",
    ownershipStatus: ARCHIVED_STATUS,
    files: ["录屏取证.mp4", "版权登记证.pdf", "平台下架通知.pdf"],
    notes: "平台已下架，材料归入 2026 年 6 月版权维权档案。",
    createdAt: "2026-06-08T10:08:00.000Z"
  }
];

const checklistTemplates = {
  "授权书": [
    "主体名称是否一致",
    "授权期限是否覆盖侵权发现时间和投诉处理周期",
    "授权范围是否包含信息网络传播权",
    "是否明确维权、投诉、发函权限",
    "是否允许转授权或委托第三方维权",
    "签章/签字是否完整",
    "附件作品清单是否齐全"
  ],
  "版权登记证书": [
    "作品名称是否与案件作品一致",
    "权利人名称是否与投诉主体或授权链一致",
    "登记类别是否匹配作品类型",
    "登记日期是否早于侵权发现时间",
    "证书编号和扫描件是否清晰",
    "是否需要补充作品发表证明"
  ],
  "合作协议": [
    "合同主体名称是否与营业执照一致",
    "合同期限是否覆盖授权期限",
    "合作内容是否包含涉案作品或项目",
    "权利归属条款是否清楚",
    "是否约定维权、投诉或转授权权限",
    "附件、补充协议和盖章页是否齐全"
  ],
  "营业执照": [
    "主体名称是否与授权书/合同一致",
    "统一社会信用代码是否清晰",
    "营业执照是否在有效期或长期有效",
    "法定代表人信息是否可核对",
    "扫描件是否完整无遮挡",
    "是否需加盖主体公章"
  ],
  "身份证明": [
    "姓名是否与签署人一致",
    "身份证件是否在有效期内",
    "正反面或护照关键信息页是否齐全",
    "是否有授权代表身份证明",
    "是否需配套签字声明或委托书"
  ],
  "链路授权文件": [
    "原始权利人到当前投诉主体链条是否连续",
    "每一层授权主体名称是否一致",
    "每一层授权期限是否连续覆盖",
    "每一层授权范围是否包含信息网络传播权",
    "是否逐层允许转授权",
    "链路文件签章页和附件是否齐全"
  ]
};

const sampleRightsRecords = [
  {
    id: "RD-20260608-001",
    documentType: "授权书",
    documentName: "《星河旅人》信息网络传播权授权书.pdf",
    relatedMatter: "CE-20260608-001",
    reviewStatus: "需补正",
    checkedItems: ["主体名称是否一致", "授权范围是否包含信息网络传播权", "是否明确维权、投诉、发函权限"],
    missingItems: ["授权期限是否覆盖侵权发现时间和投诉处理周期", "是否允许转授权或委托第三方维权", "签章/签字是否完整", "附件作品清单是否齐全"],
    files: ["授权书扫描件.pdf"],
    reviewNotes: "授权范围写明信息网络传播权，但期限页和盖章页不完整，需补正。",
    createdAt: "2026-06-08T10:18:00.000Z"
  },
  {
    id: "RD-20260608-002",
    documentType: "版权登记证书",
    documentName: "品牌宣传海报作品登记证书.pdf",
    relatedMatter: "CE-20260608-002",
    reviewStatus: "审核通过",
    checkedItems: checklistTemplates["版权登记证书"],
    missingItems: [],
    files: ["版权登记证书.pdf", "作品样张.png"],
    reviewNotes: "作品名称、权利人和证书编号均可核对，可归档。",
    createdAt: "2026-06-08T10:22:00.000Z"
  }
];

const form = document.querySelector("#caseForm");
const rightsForm = document.querySelector("#rightsForm");
const tableBody = document.querySelector("#caseTableBody");
const rightsTableBody = document.querySelector("#rightsTableBody");
const searchInput = document.querySelector("#searchInput");
const evidenceList = document.querySelector("#evidenceList");
const archiveList = document.querySelector("#archiveList");
const progressStats = document.querySelector("#progressStats");
const reminderList = document.querySelector("#reminderList");
const rightsChecklist = document.querySelector("#rightsChecklist");
const typeGuidance = document.querySelector("#typeGuidance");
const rightsReminderList = document.querySelector("#rightsReminderList");
const caseParseStatus = document.querySelector("#caseParseStatus");
const caseParsedFileMeta = document.querySelector("#caseParsedFileMeta");
const caseParsedText = document.querySelector("#caseParsedText");
const caseExtractedFields = document.querySelector("#caseExtractedFields");
const caseParsedChecklist = document.querySelector("#caseParsedChecklist");
const parseStatus = document.querySelector("#parseStatus");
const parsedFileMeta = document.querySelector("#parsedFileMeta");
const parsedText = document.querySelector("#parsedText");
const extractedFields = document.querySelector("#extractedFields");
const extractedChecklist = document.querySelector("#extractedChecklist");

let cases = loadFromStorage(CASE_STORAGE_KEY);
let rightsRecords = loadFromStorage(RIGHTS_STORAGE_KEY);
let currentCaseParsedDocument = createEmptyCaseParsedDocument();
let currentParsedDocument = createEmptyParsedDocument();

initTabs();
initCaseEvents();
initRightsEvents();
setDefaultFoundAt();
renderChecklistInputs();
renderCaseParsedDocument();
renderParsedDocument();
render();

function initTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".tab-page").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      document.querySelector(`#${tab.dataset.tab}Tab`).classList.add("active");
    });
  });
}

function initCaseEvents() {
  form.elements.files.addEventListener("change", handleCaseFileChange);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const record = {
      id: buildCaseId(),
      workTitle: formData.get("workTitle").trim(),
      rightsHolder: formData.get("rightsHolder").trim(),
      infringingUrl: formData.get("infringingUrl").trim(),
      platform: formData.get("platform"),
      foundAt: formData.get("foundAt"),
      status: formData.get("status"),
      screenshotStatus: formData.get("screenshotStatus"),
      ownershipStatus: formData.get("ownershipStatus"),
      files: Array.from(form.elements.files.files).map((file) => file.name),
      parsedDocument: currentCaseParsedDocument,
      notes: formData.get("notes").trim(),
      createdAt: new Date().toISOString()
    };

    cases = [record, ...cases];
    saveToStorage(CASE_STORAGE_KEY, cases);
    form.reset();
    currentCaseParsedDocument = createEmptyCaseParsedDocument();
    setDefaultFoundAt();
    renderCaseParsedDocument();
    render();
  });

  document.querySelector("#resetFormBtn").addEventListener("click", () => {
    form.reset();
    currentCaseParsedDocument = createEmptyCaseParsedDocument();
    setDefaultFoundAt();
    renderCaseParsedDocument();
  });

  document.querySelector("#loadSampleBtn").addEventListener("click", () => {
    cases = sampleCases;
    saveToStorage(CASE_STORAGE_KEY, cases);
    render();
  });

  document.querySelector("#exportCsvBtn").addEventListener("click", () => {
    exportCsv(cases, "版权案件登记表", toCaseCsv);
  });

  searchInput.addEventListener("input", renderCaseTable);

  tableBody.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const id = button.dataset.id;
    if (button.dataset.action === "delete") {
      cases = cases.filter((item) => item.id !== id);
    }

    if (button.dataset.action === "close") {
      cases = cases.map((item) => item.id === id ? { ...item, status: CLOSED_STATUS } : item);
    }

    saveToStorage(CASE_STORAGE_KEY, cases);
    render();
  });
}

function initRightsEvents() {
  document.querySelector("#documentType").addEventListener("change", renderChecklistInputs);
  rightsForm.elements.rightsFiles.addEventListener("change", handleRightsFileChange);
  rightsForm.elements.relatedMatter.addEventListener("input", () => {
    if (currentParsedDocument.text) {
      currentParsedDocument.reviewChecklist = buildParsedReviewChecklist(currentParsedDocument.fields);
      renderParsedDocument();
    }
  });

  rightsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(rightsForm);
    const documentType = formData.get("documentType");
    const expectedItems = checklistTemplates[documentType];
    const checkedItems = formData.getAll("checkedItems");
    const missingItems = expectedItems.filter((item) => !checkedItems.includes(item));

    const record = {
      id: buildRightsId(),
      documentType,
      documentName: formData.get("documentName").trim(),
      relatedMatter: formData.get("relatedMatter").trim(),
      reviewStatus: formData.get("reviewStatus"),
      checkedItems,
      missingItems,
      files: Array.from(rightsForm.elements.rightsFiles.files).map((file) => file.name),
      parsedDocument: currentParsedDocument,
      reviewNotes: formData.get("reviewNotes").trim(),
      createdAt: new Date().toISOString()
    };

    rightsRecords = [record, ...rightsRecords];
    saveToStorage(RIGHTS_STORAGE_KEY, rightsRecords);
    rightsForm.reset();
    currentParsedDocument = createEmptyParsedDocument();
    renderChecklistInputs();
    renderParsedDocument();
    render();
  });

  document.querySelector("#resetRightsFormBtn").addEventListener("click", () => {
    rightsForm.reset();
    currentParsedDocument = createEmptyParsedDocument();
    renderChecklistInputs();
    renderParsedDocument();
  });

  document.querySelector("#loadRightsSampleBtn").addEventListener("click", () => {
    rightsRecords = sampleRightsRecords;
    saveToStorage(RIGHTS_STORAGE_KEY, rightsRecords);
    render();
  });

  document.querySelector("#exportRightsCsvBtn").addEventListener("click", () => {
    exportCsv(rightsRecords, "版权授权文件审核台账", toRightsCsv);
  });

  rightsTableBody.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const id = button.dataset.id;
    if (button.dataset.action === "delete-rights") {
      rightsRecords = rightsRecords.filter((item) => item.id !== id);
    }

    if (button.dataset.action === "pass-rights") {
      rightsRecords = rightsRecords.map((item) => item.id === id
        ? { ...item, reviewStatus: "审核通过", missingItems: [] }
        : item);
    }

    saveToStorage(RIGHTS_STORAGE_KEY, rightsRecords);
    render();
  });
}

function loadFromStorage(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function render() {
  renderCaseStats();
  renderCaseTable();
  renderEvidenceList();
  renderArchiveList();
  renderProgressStats();
  renderCaseReminders();
  renderRightsStats();
  renderTypeGuidance();
  renderRightsTable();
  renderRightsReminders();
  renderHeroCount();
}

function renderHeroCount() {
  const caseMissing = cases.filter(needsSupplement).length;
  const rightsMissing = rightsRecords.filter(needsRightsSupplement).length;
  setText("#heroMissingCount", caseMissing + rightsMissing);
}

function renderCaseStats() {
  setText("#totalCases", cases.length);
  setText("#missingCases", cases.filter(needsSupplement).length);
  setText("#archivedCases", cases.filter((item) => item.ownershipStatus === ARCHIVED_STATUS).length);
  setText("#closedCases", cases.filter((item) => item.status === CLOSED_STATUS).length);
}

function renderCaseTable() {
  const keyword = searchInput.value.trim().toLowerCase();
  const visibleCases = cases.filter((item) => {
    const text = `${item.id} ${item.workTitle} ${item.rightsHolder} ${item.platform} ${item.status}`.toLowerCase();
    return text.includes(keyword);
  });

  if (!visibleCases.length) {
    tableBody.innerHTML = `<tr><td colspan="7" class="empty">暂无案件。可以先点击“载入样例”，或在左侧录入一条侵权线索。</td></tr>`;
    return;
  }

  tableBody.innerHTML = visibleCases.map((item) => `
    <tr>
      <td><strong>${escapeHtml(item.id)}</strong></td>
      <td>
        <a class="case-link" href="${escapeAttribute(item.infringingUrl)}" target="_blank" rel="noreferrer">${escapeHtml(item.workTitle)}</a>
        <div class="hint">${escapeHtml(item.infringingUrl)}</div>
      </td>
      <td>${escapeHtml(item.rightsHolder)}</td>
      <td>${escapeHtml(item.platform)}</td>
      <td>${formatDateTime(item.foundAt)}</td>
      <td>${statusPill(item.status)}</td>
      <td class="case-actions">
        <button class="ghost" data-action="close" data-id="${escapeAttribute(item.id)}" type="button">结案</button>
        <button class="danger" data-action="delete" data-id="${escapeAttribute(item.id)}" type="button">删除</button>
      </td>
    </tr>
  `).join("");
}

function renderEvidenceList() {
  if (!cases.length) {
    evidenceList.innerHTML = emptyState("录入案件后，将自动生成每条线索的取证材料核对项。");
    return;
  }

  evidenceList.innerHTML = cases.map((item) => {
    const evidenceStatus = item.screenshotStatus === "截图完整" ? "ok" : "warn";
    const fileText = item.files.length ? item.files.join("、") : "暂无上传记录";
    return `
      <div class="list-item">
        <strong>${escapeHtml(item.id)} · ${escapeHtml(item.workTitle)}</strong>
        <span>侵权链接：${escapeHtml(item.infringingUrl)}</span>
        <span>截图情况：${pillText(item.screenshotStatus, evidenceStatus)}　材料文件：${escapeHtml(fileText)}</span>
      </div>
    `;
  }).join("");
}

function renderArchiveList() {
  if (!cases.length) {
    archiveList.innerHTML = emptyState("系统会按权属文件状态生成归档清单，方便核对授权书、登记证、作品说明等文件。");
    return;
  }

  archiveList.innerHTML = cases.map((item) => {
    const archiveStatus = item.ownershipStatus === ARCHIVED_STATUS ? "ok" : "warn";
    return `
      <div class="list-item">
        <strong>${escapeHtml(item.rightsHolder)} · ${escapeHtml(item.workTitle)}</strong>
        <span>权属文件情况：${pillText(item.ownershipStatus, archiveStatus)}</span>
        <span>归档建议：${escapeHtml(getArchiveAdvice(item))}</span>
      </div>
    `;
  }).join("");
}

function renderProgressStats() {
  if (!cases.length) {
    progressStats.innerHTML = emptyState("暂无进度数据。");
    return;
  }

  const statuses = ["待初审", "待补材料", "已发函/投诉", "平台处理中", CLOSED_STATUS];
  progressStats.innerHTML = statuses.map((status) => {
    const count = cases.filter((item) => item.status === status).length;
    const percent = Math.round((count / cases.length) * 100);
    return `
      <div class="progress-row">
        <strong>${escapeHtml(status)}</strong>
        <div class="bar" aria-label="${escapeAttribute(status)} ${percent}%"><span style="width:${percent}%"></span></div>
        <span>${count}</span>
      </div>
    `;
  }).join("");
}

function renderCaseReminders() {
  const reminders = cases.flatMap((item) => buildCaseReminders(item));
  if (!reminders.length) {
    reminderList.innerHTML = emptyState("当前没有待补材料，所有案件材料状态较完整。");
    return;
  }

  reminderList.innerHTML = reminders.map((reminder) => `
    <div class="reminder">
      <strong>${escapeHtml(reminder.title)}</strong>
      <span>${escapeHtml(reminder.body)}</span>
    </div>
  `).join("");
}

async function handleCaseFileChange(event) {
  const files = Array.from(event.target.files);
  if (!files.length) {
    currentCaseParsedDocument = createEmptyCaseParsedDocument();
    renderCaseParsedDocument();
    return;
  }

  const supportedFile = files.find((file) => /\.(docx|txt|csv)$/i.test(file.name));
  const pdfFiles = files.filter((file) => /\.pdf$/i.test(file.name));

  if (!supportedFile) {
    currentCaseParsedDocument = {
      ...createEmptyCaseParsedDocument(),
      fileName: files.map((file) => file.name).join("、"),
      status: pdfFiles.length ? "PDF 暂只记录文件名" : "暂不支持该格式",
      notes: pdfFiles.length
        ? "已记录 PDF 文件名。当前 Demo 暂不读取 PDF 正文。"
        : "请上传 .docx、.txt 或 .csv 文件进行案件线索解析。"
    };
    renderCaseParsedDocument();
    return;
  }

  caseParseStatus.textContent = "解析中";
  caseParseStatus.className = "pill warn";

  try {
    const text = await readSupportedFileText(supportedFile);
    const fields = extractCaseFields(text);
    const reviewChecklist = buildCaseParsedChecklist(fields);
    currentCaseParsedDocument = {
      fileName: supportedFile.name,
      status: "已解析",
      notes: pdfFiles.length ? "另有 PDF 文件已记录文件名，但未读取正文。" : "",
      text,
      fields,
      reviewChecklist
    };
    applyCaseFieldsToForm(fields);
  } catch (error) {
    currentCaseParsedDocument = {
      ...createEmptyCaseParsedDocument(),
      fileName: supportedFile.name,
      status: "解析失败",
      notes: error.message || "文件正文暂无法解析，请人工查看原件。"
    };
  }

  renderCaseParsedDocument();
}

function extractCaseFields(text) {
  const normalized = normalizeText(text);
  const url = extractFirstUrl(normalized);

  return {
    workTitle: extractFieldByLabels(normalized, ["作品名称", "作品", "涉案作品", "侵权作品", "视频名称", "标题"]),
    rightsHolder: extractFieldByLabels(normalized, ["权利人", "著作权人", "版权方", "授权人", "投诉主体"]),
    infringingUrl: url,
    platform: extractPlatform(normalized, url),
    foundAt: extractCaseFoundAt(normalized),
    screenshotStatus: extractScreenshotStatus(normalized),
    ownershipStatus: extractOwnershipStatus(normalized),
    status: extractCaseStatus(normalized)
  };
}

function extractFirstUrl(text) {
  const match = text.match(/https?:\/\/[^\s，,。；;）)]+/i);
  return match ? match[0] : UNKNOWN_VALUE;
}

function extractPlatform(text, url) {
  const labeled = extractFieldByLabels(text, ["平台", "发布平台", "侵权平台", "来源平台"]);
  if (labeled !== UNKNOWN_VALUE) return normalizePlatform(labeled);

  const source = `${text} ${url || ""}`.toLowerCase();
  if (source.includes("bilibili") || source.includes("哔哩哔哩") || source.includes("b站")) return "哔哩哔哩";
  if (source.includes("douyin") || source.includes("抖音")) return "抖音";
  if (source.includes("xiaohongshu") || source.includes("小红书")) return "小红书";
  if (source.includes("weibo") || source.includes("微博")) return "微博";
  if (source.includes("kuaishou") || source.includes("快手")) return "快手";
  return UNKNOWN_VALUE;
}

function extractCaseFoundAt(text) {
  const labeled = extractFieldByLabels(text, ["发现时间", "发现日期", "取证时间", "截图时间", "登记时间"]);
  if (labeled !== UNKNOWN_VALUE) {
    const date = normalizeDateTimeInput(labeled);
    return date || labeled;
  }

  const dateMatch = text.match(/\d{4}[年/-]\d{1,2}[月/-]\d{1,2}日?(?:\s+\d{1,2}[:：]\d{1,2})?/);
  if (!dateMatch) return UNKNOWN_VALUE;
  return normalizeDateTimeInput(dateMatch[0]) || dateMatch[0];
}

function extractScreenshotStatus(text) {
  if (includesKeyword(text, ["截图完整", "已截图", "已取证", "已录屏", "截图已保存"])) return "截图完整";
  if (includesKeyword(text, ["待核验", "截图待核验"])) return "已截图待核验";
  if (includesKeyword(text, ["未截图", "缺少截图", "未取证"])) return "未截图";
  return UNKNOWN_VALUE;
}

function extractOwnershipStatus(text) {
  if (includesKeyword(text, ["审核通过并归档", "权属已归档", "已归档"])) return "审核通过并归档";
  if (includesKeyword(text, ["已收到待审核", "待审核", "权属待审核"])) return "已收到待审核";
  if (includesKeyword(text, ["待补授权链", "授权链缺失", "补授权链"])) return "待补授权链";
  if (includesKeyword(text, ["权属缺失", "缺少权属", "缺少授权", "缺失"])) return "缺失";
  return UNKNOWN_VALUE;
}

function extractCaseStatus(text) {
  const statuses = ["待初审", "待补材料", "已发函/投诉", "平台处理中", CLOSED_STATUS];
  const matched = statuses.find((status) => text.includes(status));
  if (matched) return matched;
  if (includesKeyword(text, ["已结案", "已下架"])) return CLOSED_STATUS;
  if (includesKeyword(text, ["已投诉", "投诉中", "已发函"])) return "已发函/投诉";
  if (includesKeyword(text, ["平台处理中", "等待平台"])) return "平台处理中";
  return UNKNOWN_VALUE;
}

function buildCaseParsedChecklist(fields) {
  return [
    evaluateKnownField("是否识别侵权链接", fields.infringingUrl),
    evaluateKnownField("是否识别作品名称", fields.workTitle),
    evaluateKnownField("是否识别权利人", fields.rightsHolder),
    evaluateKnownField("是否识别平台", fields.platform),
    evaluateKnownField("是否识别发现时间", fields.foundAt),
    evaluateCaseMaterialStatus("截图材料状态", fields.screenshotStatus),
    evaluateCaseMaterialStatus("权属文件状态", fields.ownershipStatus)
  ];
}

function applyCaseFieldsToForm(fields) {
  setFormValueIfKnown(form.elements.workTitle, fields.workTitle);
  setFormValueIfKnown(form.elements.rightsHolder, fields.rightsHolder);
  setFormValueIfKnown(form.elements.infringingUrl, fields.infringingUrl);
  setFormValueIfKnown(form.elements.platform, fields.platform);
  setFormValueIfKnown(form.elements.foundAt, normalizeDateTimeInput(fields.foundAt));
  setFormValueIfKnown(form.elements.screenshotStatus, fields.screenshotStatus);
  setFormValueIfKnown(form.elements.ownershipStatus, fields.ownershipStatus);
  setFormValueIfKnown(form.elements.status, fields.status);
}

function setFormValueIfKnown(input, value) {
  if (!input || !value || value === UNKNOWN_VALUE) return;
  const validValues = input.tagName === "SELECT"
    ? Array.from(input.options).map((option) => option.value || option.textContent)
    : null;
  if (validValues && !validValues.includes(value)) return;
  input.value = value;
}

function normalizePlatform(value) {
  if (!value || value === UNKNOWN_VALUE) return UNKNOWN_VALUE;
  if (value.includes("哔") || value.toLowerCase().includes("bilibili") || value.includes("B站")) return "哔哩哔哩";
  if (value.includes("抖音")) return "抖音";
  if (value.includes("小红书")) return "小红书";
  if (value.includes("微博")) return "微博";
  if (value.includes("快手")) return "快手";
  return value.includes("平台") ? "其他平台" : value;
}

function normalizeDateTimeInput(value) {
  if (!value || value === UNKNOWN_VALUE) return "";
  const normalized = String(value)
    .replace(/[年月]/g, "-")
    .replace("日", "")
    .replaceAll("/", "-")
    .replace("：", ":")
    .trim();
  const dateMatch = normalized.match(/(\d{4}-\d{1,2}-\d{1,2})(?:\s+(\d{1,2}:\d{1,2}))?/);
  if (!dateMatch) return "";
  const [year, month, day] = dateMatch[1].split("-").map((item) => item.padStart(2, "0"));
  const time = dateMatch[2] || "09:00";
  return `${year}-${month}-${day}T${time.padStart(5, "0")}`;
}

function evaluateCaseMaterialStatus(title, value) {
  if (value === UNKNOWN_VALUE) {
    return parsedChecklistItem(title, "pending", "待人工确认：正文中未稳定识别到该材料状态。");
  }
  const isComplete = value === "截图完整" || value === "审核通过并归档";
  return parsedChecklistItem(title, isComplete ? "pass" : "attention", `识别结果：${value}`);
}

function renderCaseParsedDocument() {
  caseParseStatus.textContent = currentCaseParsedDocument.status;
  caseParseStatus.className = `pill ${currentCaseParsedDocument.status === "已解析" ? "ok" : currentCaseParsedDocument.status === "等待上传" ? "" : "warn"}`;
  caseParsedFileMeta.textContent = currentCaseParsedDocument.fileName
    ? `文件：${currentCaseParsedDocument.fileName}${currentCaseParsedDocument.notes ? `；${currentCaseParsedDocument.notes}` : ""}`
    : "上传线索表、取证记录或 CSV 台账后，将在这里展示正文和提取字段。";
  caseParsedText.textContent = currentCaseParsedDocument.text || "暂无解析文本。";
  caseExtractedFields.innerHTML = renderCaseExtractedFields(currentCaseParsedDocument.fields);
  caseParsedChecklist.innerHTML = renderParsedChecklist(currentCaseParsedDocument.reviewChecklist);
}

function renderCaseExtractedFields(fields) {
  return Object.entries(caseExtractionFieldLabels).map(([key, label]) => {
    const value = fields[key] || UNKNOWN_VALUE;
    const tone = value === UNKNOWN_VALUE ? "warn" : "ok";
    return `
      <div class="field-card">
        <strong>${escapeHtml(label)}</strong>
        <span class="pill ${tone}">${escapeHtml(value)}</span>
      </div>
    `;
  }).join("");
}

function createEmptyCaseParsedDocument() {
  return {
    fileName: "",
    status: "等待上传",
    notes: "",
    text: "",
    fields: Object.fromEntries(Object.keys(caseExtractionFieldLabels).map((key) => [key, UNKNOWN_VALUE])),
    reviewChecklist: []
  };
}

async function handleRightsFileChange(event) {
  const files = Array.from(event.target.files);
  if (!files.length) {
    currentParsedDocument = createEmptyParsedDocument();
    renderParsedDocument();
    return;
  }

  const supportedFile = files.find((file) => /\.(docx|txt|csv)$/i.test(file.name));
  const pdfFiles = files.filter((file) => /\.pdf$/i.test(file.name));

  if (!supportedFile) {
    currentParsedDocument = {
      ...createEmptyParsedDocument(),
      fileName: files.map((file) => file.name).join("、"),
      status: pdfFiles.length ? "PDF 暂只记录文件名" : "暂不支持该格式",
      notes: pdfFiles.length
        ? "已记录 PDF 文件名。当前 Demo 暂不读取 PDF 正文。"
        : "请上传 .docx、.txt 或 .csv 文件进行正文解析。"
    };
    renderParsedDocument();
    return;
  }

  parseStatus.textContent = "解析中";
  parseStatus.className = "pill warn";

  try {
    const text = await readSupportedFileText(supportedFile);
    const fields = extractRightsFields(text);
    const reviewChecklist = buildParsedReviewChecklist(fields);
    currentParsedDocument = {
      fileName: supportedFile.name,
      status: "已解析",
      notes: pdfFiles.length ? "另有 PDF 文件已记录文件名，但未读取正文。" : "",
      text,
      fields,
      reviewChecklist
    };
  } catch (error) {
    currentParsedDocument = {
      ...createEmptyParsedDocument(),
      fileName: supportedFile.name,
      status: "解析失败",
      notes: error.message || "文件正文暂无法解析，请人工查看原件。"
    };
  }

  renderParsedDocument();
}

async function readSupportedFileText(file) {
  if (/\.txt$/i.test(file.name) || /\.csv$/i.test(file.name)) {
    return normalizeText(await file.text());
  }

  if (/\.docx$/i.test(file.name)) {
    return normalizeText(await readDocxText(file));
  }

  throw new Error("暂不支持该文件格式。");
}

async function readDocxText(file) {
  const buffer = await file.arrayBuffer();
  const xmlBuffer = await extractZipEntry(buffer, "word/document.xml");
  const xml = new TextDecoder("utf-8").decode(xmlBuffer);
  return docxXmlToText(xml);
}

async function extractZipEntry(buffer, targetName) {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  const eocdOffset = findEndOfCentralDirectory(view);
  if (eocdOffset < 0) {
    throw new Error("无法识别 docx 压缩结构。");
  }

  const centralDirectorySize = view.getUint32(eocdOffset + 12, true);
  const centralDirectoryOffset = view.getUint32(eocdOffset + 16, true);
  let offset = centralDirectoryOffset;
  const end = centralDirectoryOffset + centralDirectorySize;

  while (offset < end) {
    if (view.getUint32(offset, true) !== 0x02014b50) break;

    const method = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const fileNameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localHeaderOffset = view.getUint32(offset + 42, true);
    const fileName = new TextDecoder("utf-8").decode(bytes.slice(offset + 46, offset + 46 + fileNameLength));

    if (fileName === targetName) {
      return decompressZipEntry(buffer, localHeaderOffset, compressedSize, method);
    }

    offset += 46 + fileNameLength + extraLength + commentLength;
  }

  throw new Error("未找到 Word 正文文件。");
}

function findEndOfCentralDirectory(view) {
  const minOffset = Math.max(0, view.byteLength - 65557);
  for (let offset = view.byteLength - 22; offset >= minOffset; offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) {
      return offset;
    }
  }
  return -1;
}

async function decompressZipEntry(buffer, localHeaderOffset, compressedSize, method) {
  const view = new DataView(buffer);
  if (view.getUint32(localHeaderOffset, true) !== 0x04034b50) {
    throw new Error("docx 文件头异常。");
  }

  const fileNameLength = view.getUint16(localHeaderOffset + 26, true);
  const extraLength = view.getUint16(localHeaderOffset + 28, true);
  const dataStart = localHeaderOffset + 30 + fileNameLength + extraLength;
  const compressedData = buffer.slice(dataStart, dataStart + compressedSize);

  if (method === 0) {
    return compressedData;
  }

  if (method === 8 && "DecompressionStream" in window) {
    try {
      const stream = new Blob([compressedData]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
      return await new Response(stream).arrayBuffer();
    } catch {
      const stream = new Blob([compressedData]).stream().pipeThrough(new DecompressionStream("deflate"));
      return new Response(stream).arrayBuffer();
    }
  }

  throw new Error("当前浏览器暂不支持本地解压该 docx，请改用 txt/csv 或人工查看原件。");
}

function docxXmlToText(xml) {
  return xml
    .replace(/<w:tab\/>/g, "\t")
    .replace(/<\/w:p>/g, "\n")
    .replace(/<\/w:tr>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function extractRightsFields(text) {
  const normalized = normalizeText(text);
  const scope = extractFieldByLabels(normalized, ["授权范围", "许可范围", "权利范围", "授权内容"]);

  return {
    rightsOwner: extractFieldByLabels(normalized, ["权利人", "授权人", "甲方", "许可方"]),
    authorizedParty: extractFieldByLabels(normalized, ["被授权人", "被许可方", "乙方", "受托方"]),
    workTitle: extractFieldByLabels(normalized, ["作品名称", "作品", "授权作品", "涉案作品"]),
    authorizationTerm: extractAuthorizationTerm(normalized),
    authorizationScope: scope,
    includesInfoNetworkRight: includesKeyword(normalized, ["信息网络传播权"]) ? "是" : UNKNOWN_VALUE,
    includesEnforcementRight: includesKeyword(normalized, ["维权", "投诉", "诉讼", "起诉", "发函", "举报"]) ? "是" : UNKNOWN_VALUE,
    allowsSublicense: extractSublicense(normalized),
    attachmentList: extractAttachmentList(normalized)
  };
}

function extractFieldByLabels(text, labels) {
  for (const label of labels) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = text.match(new RegExp(`${escaped}\\s*[:：]?\\s*([^\\n；;。]{2,80})`));
    if (match) return cleanExtractedValue(match[1]);
  }
  return UNKNOWN_VALUE;
}

function extractAuthorizationTerm(text) {
  const labeled = extractFieldByLabels(text, ["授权期限", "许可期限", "有效期限", "合作期限"]);
  if (labeled !== UNKNOWN_VALUE) return labeled;

  const dateRange = text.match(/(\d{4}[年/-]\d{1,2}[月/-]\d{1,2}日?)\s*(?:至|到|-|—|~)\s*(\d{4}[年/-]\d{1,2}[月/-]\d{1,2}日?)/);
  if (dateRange) return `${dateRange[1]} 至 ${dateRange[2]}`;
  return UNKNOWN_VALUE;
}

function extractSublicense(text) {
  if (includesKeyword(text, ["不得转授权", "不可转授权", "不允许转授权", "不得再授权", "不可再授权"])) {
    return "否";
  }
  if (includesKeyword(text, ["转授权", "再授权", "分授权"])) {
    return "是/有约定";
  }
  return UNKNOWN_VALUE;
}

function extractAttachmentList(text) {
  const labeled = extractFieldByLabels(text, ["附件", "附件清单", "材料清单", "作品清单"]);
  if (labeled !== UNKNOWN_VALUE) return labeled;

  const attachmentMatches = text.match(/附件[一二三四五六七八九十\d]+[:：、]?[^\n。；;]{2,80}/g);
  if (attachmentMatches?.length) return attachmentMatches.slice(0, 5).join("；");
  return UNKNOWN_VALUE;
}

function buildParsedReviewChecklist(fields) {
  const relatedCase = findRelatedCase();
  return [
    evaluateSubjectConsistency(fields, relatedCase),
    evaluateTermCoverage(fields, relatedCase),
    evaluateBooleanItem("是否包含信息网络传播权", fields.includesInfoNetworkRight),
    evaluateBooleanItem("是否包含维权/投诉/诉讼授权", fields.includesEnforcementRight),
    evaluateSublicenseItem(fields.allowsSublicense),
    evaluateKnownField("是否列明附件", fields.attachmentList)
  ];
}

function findRelatedCase() {
  const matter = rightsForm.elements.relatedMatter.value.trim();
  if (!matter) return null;
  return cases.find((item) => item.id === matter || item.workTitle.includes(matter) || matter.includes(item.id));
}

function evaluateSubjectConsistency(fields, relatedCase) {
  if (!relatedCase || fields.rightsOwner === UNKNOWN_VALUE) {
    return parsedChecklistItem("主体名称是否一致", "pending", "待人工确认：未找到可比对的关联案件权利人或授权人。");
  }

  const owner = fields.rightsOwner;
  const caseOwner = relatedCase.rightsHolder;
  const matched = owner.includes(caseOwner) || caseOwner.includes(owner);
  return parsedChecklistItem(
    "主体名称是否一致",
    matched ? "pass" : "attention",
    matched
      ? `已识别授权人与关联案件权利人相近：${caseOwner}`
      : `需关注：授权人“${owner}”与案件权利人“${caseOwner}”不完全一致。`
  );
}

function evaluateTermCoverage(fields, relatedCase) {
  if (!relatedCase || fields.authorizationTerm === UNKNOWN_VALUE) {
    return parsedChecklistItem("授权期限是否覆盖发现时间", "pending", "待人工确认：未识别授权期限或未关联案件发现时间。");
  }

  const range = parseDateRange(fields.authorizationTerm);
  if (!range) {
    return parsedChecklistItem("授权期限是否覆盖发现时间", "pending", "待人工确认：已识别期限文字，但无法自动换算日期。");
  }

  const foundAt = new Date(relatedCase.foundAt);
  const covered = foundAt >= range.start && foundAt <= range.end;
  return parsedChecklistItem(
    "授权期限是否覆盖发现时间",
    covered ? "pass" : "attention",
    covered ? "已覆盖关联案件发现时间。" : "需关注：授权期限可能未覆盖关联案件发现时间。"
  );
}

function evaluateBooleanItem(title, value) {
  if (value === UNKNOWN_VALUE) {
    return parsedChecklistItem(title, "pending", "待人工确认：正文中未稳定识别到相关表述。");
  }
  return parsedChecklistItem(title, value.startsWith("是") ? "pass" : "attention", `识别结果：${value}`);
}

function evaluateSublicenseItem(value) {
  if (value === UNKNOWN_VALUE) {
    return parsedChecklistItem("是否说明是否可转授权", "pending", "待人工确认：未识别到转授权约定。");
  }
  return parsedChecklistItem("是否说明是否可转授权", "pass", `识别结果：${value}`);
}

function evaluateKnownField(title, value) {
  if (value === UNKNOWN_VALUE) {
    return parsedChecklistItem(title, "pending", "待人工确认：未稳定识别到附件清单。");
  }
  return parsedChecklistItem(title, "pass", `识别结果：${value}`);
}

function parsedChecklistItem(title, status, detail) {
  return { title, status, detail };
}

function parseDateRange(value) {
  const matches = value.match(/\d{4}[年/-]\d{1,2}[月/-]\d{1,2}日?/g);
  if (!matches || matches.length < 2) return null;
  const start = parseChineseDate(matches[0]);
  const end = parseChineseDate(matches[1]);
  if (!start || !end) return null;
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function parseChineseDate(value) {
  const normalized = value.replace(/[年月]/g, "-").replace("日", "").replaceAll("/", "-");
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

function renderParsedDocument() {
  parseStatus.textContent = currentParsedDocument.status;
  parseStatus.className = `pill ${currentParsedDocument.status === "已解析" ? "ok" : currentParsedDocument.status === "等待上传" ? "" : "warn"}`;
  parsedFileMeta.textContent = currentParsedDocument.fileName
    ? `文件：${currentParsedDocument.fileName}${currentParsedDocument.notes ? `；${currentParsedDocument.notes}` : ""}`
    : "上传 .docx、.txt 或 .csv 后，将在这里展示正文和提取字段。";
  parsedText.textContent = currentParsedDocument.text || "暂无解析文本。";
  extractedFields.innerHTML = renderExtractedFields(currentParsedDocument.fields);
  extractedChecklist.innerHTML = renderParsedChecklist(currentParsedDocument.reviewChecklist);
}

function renderExtractedFields(fields) {
  return Object.entries(extractionFieldLabels).map(([key, label]) => {
    const value = fields[key] || UNKNOWN_VALUE;
    const tone = value === UNKNOWN_VALUE ? "warn" : "ok";
    return `
      <div class="field-card">
        <strong>${escapeHtml(label)}</strong>
        <span class="pill ${tone}">${escapeHtml(value)}</span>
      </div>
    `;
  }).join("");
}

function renderParsedChecklist(items) {
  if (!items.length) {
    return emptyState("上传并解析文件后，将基于正文提取结果生成审核提示。");
  }

  return items.map((item) => `
    <div class="parsed-check ${escapeAttribute(item.status)}">
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.detail)}</span>
    </div>
  `).join("");
}

function createEmptyParsedDocument() {
  return {
    fileName: "",
    status: "等待上传",
    notes: "",
    text: "",
    fields: Object.fromEntries(Object.keys(extractionFieldLabels).map((key) => [key, UNKNOWN_VALUE])),
    reviewChecklist: []
  };
}

function cleanExtractedValue(value) {
  return value
    .replace(/[，,。；;]+$/, "")
    .replace(/\s+/g, " ")
    .trim() || UNKNOWN_VALUE;
}

function includesKeyword(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function normalizeText(text) {
  return String(text ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/\u0000/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function renderChecklistInputs() {
  const documentType = document.querySelector("#documentType").value;
  const items = checklistTemplates[documentType] ?? [];
  rightsChecklist.innerHTML = items.map((item, index) => `
    <label class="check-row">
      <input type="checkbox" name="checkedItems" value="${escapeAttribute(item)}" ${index < 2 ? "checked" : ""}>
      <span>${escapeHtml(item)}</span>
    </label>
  `).join("");
  setText("#rightsChecklistCount", items.length);
}

function renderRightsStats() {
  const needsFix = rightsRecords.filter(needsRightsSupplement).length;
  const passed = rightsRecords.filter((item) => item.reviewStatus === "审核通过" && !item.missingItems.length).length;
  setText("#totalRightsDocs", rightsRecords.length);
  setText("#rightsNeedsFix", needsFix);
  setText("#rightsPassed", passed);
  setText("#rightsChecklistCount", (checklistTemplates[document.querySelector("#documentType").value] ?? []).length);
}

function renderTypeGuidance() {
  typeGuidance.innerHTML = Object.entries(checklistTemplates).map(([type, items]) => `
    <div class="guidance-card">
      <strong>${escapeHtml(type)}</strong>
      <span>${escapeHtml(items.slice(0, 4).join("；"))}</span>
    </div>
  `).join("");
}

function renderRightsTable() {
  if (!rightsRecords.length) {
    rightsTableBody.innerHTML = `<tr><td colspan="7" class="empty">暂无审核记录。可以先点击“载入样例”，或在左侧录入一份授权/权属文件。</td></tr>`;
    return;
  }

  rightsTableBody.innerHTML = rightsRecords.map((item) => {
    const missingText = item.missingItems.length ? item.missingItems.join("；") : "无";
    return `
      <tr>
        <td><strong>${escapeHtml(item.id)}</strong></td>
        <td>${escapeHtml(item.documentType)}</td>
        <td>
          ${escapeHtml(item.documentName)}
          <div class="hint">文件：${escapeHtml(item.files.length ? item.files.join("、") : "暂无上传记录")}</div>
        </td>
        <td>${escapeHtml(item.relatedMatter || "-")}</td>
        <td>${rightsStatusPill(item)}</td>
        <td>${escapeHtml(missingText)}</td>
        <td class="case-actions">
          <button class="ghost" data-action="pass-rights" data-id="${escapeAttribute(item.id)}" type="button">通过</button>
          <button class="danger" data-action="delete-rights" data-id="${escapeAttribute(item.id)}" type="button">删除</button>
        </td>
      </tr>
    `;
  }).join("");
}

function renderRightsReminders() {
  const reminders = rightsRecords.filter(needsRightsSupplement);
  if (!reminders.length) {
    rightsReminderList.innerHTML = emptyState("当前没有文件补正提醒，审核记录状态较完整。");
    return;
  }

  rightsReminderList.innerHTML = reminders.map((item) => {
    const missingText = item.missingItems.length ? item.missingItems.join("；") : "请补充文件或复核审核结论。";
    return `
      <div class="reminder">
        <strong>${escapeHtml(item.id)} · ${escapeHtml(item.documentType)}需补正</strong>
        <span>${escapeHtml(item.documentName)}：${escapeHtml(missingText)}</span>
      </div>
    `;
  }).join("");
}

function buildCaseReminders(item) {
  const reminders = [];
  if (item.screenshotStatus !== "截图完整") {
    reminders.push({
      title: `${item.id} 需补充截图/录屏取证`,
      body: `作品《${item.workTitle}》在${item.platform}的截图状态为“${item.screenshotStatus}”，建议补充页面全屏截图、链接、发布时间、账号信息和系统时间。`
    });
  }

  if (item.ownershipStatus !== ARCHIVED_STATUS) {
    reminders.push({
      title: `${item.id} 需核对权属文件`,
      body: `权属文件状态为“${item.ownershipStatus}”，建议核对版权登记证、授权链、权利人主体证明及盖章页。`
    });
  }

  if (!item.files.length) {
    reminders.push({
      title: `${item.id} 缺少材料文件记录`,
      body: "当前没有上传/记录任何材料文件，建议补录截图、授权文件、投诉函或平台回执文件名。"
    });
  }

  if (item.status === "待初审") {
    reminders.push({
      title: `${item.id} 待完成初步审核`,
      body: "建议先核对链接有效性、作品匹配度、发布时间和疑似侵权使用方式，再进入投诉或发函流程。"
    });
  }

  return reminders;
}

function needsSupplement(item) {
  return item.screenshotStatus !== "截图完整" ||
    item.ownershipStatus !== ARCHIVED_STATUS ||
    !item.files.length ||
    item.status === "待初审" ||
    item.status === "待补材料";
}

function needsRightsSupplement(item) {
  return item.reviewStatus === "需补正" ||
    item.reviewStatus === "待审核" ||
    item.missingItems.length > 0 ||
    !item.files.length;
}

function getArchiveAdvice(item) {
  if (item.ownershipStatus === ARCHIVED_STATUS) {
    return "可归入对应月份版权维权档案，并与案件编号保持一致。";
  }
  if (item.ownershipStatus === "已收到待审核") {
    return "需核对文件主体、授权范围、期限、作品名称和盖章/签字页。";
  }
  if (item.ownershipStatus === "待补授权链") {
    return "需补齐从原始权利人到投诉主体的连续授权链。";
  }
  return "需向业务或权利人补充版权登记证、授权书、作品首发证明等材料。";
}

function buildCaseId() {
  const date = formatDateOnly(new Date()).replaceAll("-", "");
  const maxTodayNumber = cases
    .filter((item) => item.id.includes(date))
    .map((item) => Number(item.id.split("-").at(-1)))
    .filter(Number.isFinite)
    .reduce((max, value) => Math.max(max, value), 0);
  return `CE-${date}-${String(maxTodayNumber + 1).padStart(3, "0")}`;
}

function buildRightsId() {
  const date = formatDateOnly(new Date()).replaceAll("-", "");
  const maxTodayNumber = rightsRecords
    .filter((item) => item.id.includes(date))
    .map((item) => Number(item.id.split("-").at(-1)))
    .filter(Number.isFinite)
    .reduce((max, value) => Math.max(max, value), 0);
  return `RD-${date}-${String(maxTodayNumber + 1).padStart(3, "0")}`;
}

function exportCsv(rows, name, mapper) {
  if (!rows.length) {
    alert("暂无可导出的记录。");
    return;
  }

  const csv = mapper(rows);
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}_${formatDateOnly(new Date())}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function toCaseCsv(rows) {
  const headers = [
    "案件编号",
    "作品名称",
    "权利人",
    "侵权链接",
    "平台",
    "发现时间",
    "截图情况",
    "权属文件情况",
    "处理进度",
    "材料文件",
    "解析字段",
    "解析审核提示",
    "备注"
  ];
  const lines = rows.map((item) => [
    item.id,
    item.workTitle,
    item.rightsHolder,
    item.infringingUrl,
    item.platform,
    formatDateTime(item.foundAt),
    item.screenshotStatus,
    item.ownershipStatus,
    item.status,
    item.files.join("；"),
    formatCaseExtractedFieldsForCsv(item.parsedDocument?.fields),
    formatParsedChecklistForCsv(item.parsedDocument?.reviewChecklist),
    item.notes
  ]);
  return rowsToCsv([headers, ...lines]);
}

function formatCaseExtractedFieldsForCsv(fields = {}) {
  return Object.entries(caseExtractionFieldLabels)
    .map(([key, label]) => `${label}：${fields[key] || UNKNOWN_VALUE}`)
    .join("；");
}

function toRightsCsv(rows) {
  const headers = [
    "记录编号",
    "文件类型",
    "文件名称",
    "关联案件/项目",
    "审核结论",
    "已核查项",
    "缺项/待补正",
    "文件记录",
    "提取字段",
    "解析审核提示",
    "审核备注"
  ];
  const lines = rows.map((item) => [
    item.id,
    item.documentType,
    item.documentName,
    item.relatedMatter,
    item.reviewStatus,
    item.checkedItems.join("；"),
    item.missingItems.join("；"),
    item.files.join("；"),
    formatExtractedFieldsForCsv(item.parsedDocument?.fields),
    formatParsedChecklistForCsv(item.parsedDocument?.reviewChecklist),
    item.reviewNotes
  ]);
  return rowsToCsv([headers, ...lines]);
}

function formatExtractedFieldsForCsv(fields = {}) {
  return Object.entries(extractionFieldLabels)
    .map(([key, label]) => `${label}：${fields[key] || UNKNOWN_VALUE}`)
    .join("；");
}

function formatParsedChecklistForCsv(items = []) {
  return items
    .map((item) => `${item.title}：${item.detail}`)
    .join("；");
}

function rowsToCsv(rows) {
  return rows
    .map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(","))
    .join("\n");
}

function setDefaultFoundAt() {
  const input = form.elements.foundAt;
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  input.value = now.toISOString().slice(0, 16);
}

function statusPill(status) {
  const className = status === CLOSED_STATUS ? "ok" : needsStatusAttention(status) ? "warn" : "";
  return `<span class="pill ${className}">${escapeHtml(status)}</span>`;
}

function rightsStatusPill(item) {
  const isOk = item.reviewStatus === "审核通过" && !item.missingItems.length;
  const className = isOk ? "ok" : "warn";
  const text = isOk ? "审核通过" : item.reviewStatus;
  return `<span class="pill ${className}">${escapeHtml(text)}</span>`;
}

function pillText(text, tone) {
  return `<span class="pill ${tone}">${escapeHtml(text)}</span>`;
}

function needsStatusAttention(status) {
  return status === "待初审" || status === "待补材料";
}

function formatDateTime(value) {
  if (!value) return "-";
  return value.replace("T", " ");
}

function formatDateOnly(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function setText(selector, value) {
  document.querySelector(selector).textContent = value;
}

function emptyState(text) {
  return `<div class="empty">${escapeHtml(text)}</div>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
