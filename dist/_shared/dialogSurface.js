import '../dialogSurface.css';
import { jsx as e } from "react/jsx-runtime";
import { Dialog as t } from "@base-ui/react/dialog";
//#region src/stories/molecules/_shared/dialogSurface.tsx
var n = (...e) => e.filter(Boolean).join(" ");
function r({ className: r }) {
	return /* @__PURE__ */ e(t.Backdrop, { className: n("dialog-overlay", r) });
}
function i({ layout: t, noTitle: r = !1, className: i, children: a }) {
	return /* @__PURE__ */ e("header", {
		className: n("dialog-header", `dialog-header--${t}`, r && "dialog-header--no-title", i),
		children: a
	});
}
function a({ className: t, children: r, ...i }) {
	return /* @__PURE__ */ e("div", {
		className: n("dialog-footer", t),
		...i,
		children: r
	});
}
//#endregion
export { i as n, r, a as t };
