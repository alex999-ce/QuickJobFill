// 验收测试：驱动页面逐项检查
const out = {};
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const popup = () => document.getElementById('scenePopup');
const icon = () => document.getElementById('extIcon');
const toastText = () => document.getElementById('toast').textContent;

// ===== A. 弹窗场景 =====
out.a1_init = {
  popupOpen: popup().classList.contains('open'),
  iconActive: icon().classList.contains('active')
};
icon().click();
await sleep(400);
out.a2_open = {
  popupOpen: popup().classList.contains('open'),
  iconActive: icon().classList.contains('active')
};
icon().click();
await sleep(400);
out.a3_close = {
  popupOpen: popup().classList.contains('open'),
  iconActive: icon().classList.contains('active')
};
icon().click();
await sleep(400);
out.a4_reopen = {
  popupOpen: popup().classList.contains('open'),
  iconActive: icon().classList.contains('active')
};
// 弹窗打开时点“立即申请”
document.getElementById('sceneApply').click();
await sleep(250);
out.a5_applyPopupOpen = { toast: toastText() };
// 收起弹窗后点“立即申请”
icon().click();
await sleep(300);
document.getElementById('sceneApply').click();
await sleep(250);
out.a6_applyPopupClosed = { toast: toastText() };
// 点“开始填写”跳转演示
icon().click();
await sleep(300);
document.getElementById('popupFillBtn').click();
await sleep(350);
out.a7_fillJump = { activeView: document.querySelector('.view.active').id };

// ===== B. 资料档案 =====
document.querySelector('.tab[data-view="profile"]').click();
await sleep(250);
out.b1_initCat = {
  activeCat: document.querySelector('.cat.active').getAttribute('data-cat'),
  basicVisible: document.querySelector('[data-panel="basic"]').style.display !== 'none'
};
document.querySelector('.cat[data-cat="edu"]').click();
await sleep(200);
out.b2_catEdu = {
  activeCat: document.querySelector('.cat.active').getAttribute('data-cat'),
  eduVisible: document.querySelector('[data-panel="edu"]').style.display !== 'none',
  basicHidden: document.querySelector('[data-panel="basic"]').style.display === 'none'
};
document.querySelector('.cat[data-cat="intern"]').click();
await sleep(200);
out.b3_catIntern = { activeCat: document.querySelector('.cat.active').getAttribute('data-cat') };
document.querySelector('.cat[data-cat="project"]').click();
await sleep(200);
out.b4_catProject = { activeCat: document.querySelector('.cat.active').getAttribute('data-cat') };
document.querySelector('.cat[data-cat="basic"]').click();
await sleep(200);
out.b5_catBack = {
  activeCat: document.querySelector('.cat.active').getAttribute('data-cat'),
  basicVisible: document.querySelector('[data-panel="basic"]').style.display !== 'none'
};
// 输入可编辑
const nameInput = document.querySelector('[data-panel="basic"] input');
const beforeVal = nameInput.value;
nameInput.value = '测试·李同学';
out.b6_inputEditable = { before: beforeVal, after: nameInput.value };
// 保存 / 导出 / 导入
document.getElementById('saveBtn').click();
await sleep(250);
out.b7_save = {
  saveOkShown: document.getElementById('saveOk').classList.contains('show'),
  toast: toastText()
};
document.getElementById('exportBtn').click();
await sleep(200);
out.b8_export = { toast: toastText() };
document.getElementById('importBtn').click();
await sleep(200);
out.b9_import = { toast: toastText() };

// ===== C. 表单演示 =====
document.querySelector('.tab[data-view="demo"]').click();
await sleep(250);
const numOk = document.getElementById('numOk');
const numPend = document.getElementById('numPend');
out.c1_initDemo = { ok: numOk.textContent, pend: numPend.textContent };
// 未开始就点提交
document.getElementById('submitBtn').click();
await sleep(250);
out.c2_submitBeforeFill = { toast: toastText() };
// 开始填写
document.getElementById('fillBtn').click();
await sleep(3400);
out.c3_afterFill = {
  ok: numOk.textContent,
  pend: numPend.textContent,
  filledEls: document.querySelectorAll('.df.filled').length,
  pendEls: document.querySelectorAll('.df.pending').length,
  btnText: document.getElementById('fillBtn').textContent,
  banner: document.getElementById('fillBanner').classList.contains('show')
};
// 重复点击开始填写（已完成后再点）
document.getElementById('fillBtn').click();
await sleep(400);
out.c4_refillGuard = {
  ok: numOk.textContent,
  pend: numPend.textContent,
  filledEls: document.querySelectorAll('.df.filled').length
};
// 点第一个橙色标记
const firstTag = document.querySelector('.pend-tag');
firstTag.click();
await sleep(600);
out.c5_pendLocate = {
  pendingFlash: document.querySelector('.df.pending').classList.contains('flash'),
  toast: toastText()
};
// 有未确认时点提交
document.getElementById('submitBtn').click();
await sleep(250);
out.c6_submitWithPending = { toast: toastText() };
// 切走再切回，状态是否保留
document.querySelector('.tab[data-view="popup"]').click();
await sleep(200);
document.querySelector('.tab[data-view="demo"]').click();
await sleep(200);
out.c7_stateKept = { ok: numOk.textContent, pend: numPend.textContent };

return out;
