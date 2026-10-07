import { VisuallyHidden as e } from "../visually-hidden.js";
import { ErrorText as t } from "../error-text.js";
import { Label as n } from "../label.js";
import { useId as r } from "react";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/_shared/FieldShell.tsx
function s(...e) {
	return e.filter(Boolean).join(" ") || void 0;
}
function c({ id: e, error: t = !1, errorMessage: n, helperText: i, describedBy: a }) {
	let o = r(), c = e ?? o, l = n ? `${c}-error` : void 0, u = i ? `${c}-helper` : void 0;
	return {
		id: c,
		labelId: `${c}-label`,
		errorId: l,
		helperId: u,
		describedBy: s(l, u, a),
		hasError: t || !!n,
		errorMessage: n,
		helperText: i
	};
}
function l({ field: r, block: s, modifiers: c = [], className: l, size: u = "md", label: d, labelHidden: f = !1, layout: p = "stack", labelFor: m, labelIdentified: h = !1, rootProps: g, children: _, footer: v }) {
	let y = m ?? r.id, b = h ? r.labelId : void 0;
	return /* @__PURE__ */ o("div", {
		...g,
		className: [
			s,
			...c,
			l
		].filter(Boolean).join(" "),
		children: [
			p === "inline" ? /* @__PURE__ */ o("label", {
				className: `${s}__control`,
				htmlFor: y,
				children: [_, a(f ? e : "span", {
					id: b,
					className: `${s}__label`,
					children: d
				})]
			}) : /* @__PURE__ */ o(i, { children: [d ? /* @__PURE__ */ a(n, {
				id: b,
				htmlFor: y,
				hidden: f,
				size: u,
				children: d
			}) : null, _] }),
			r.errorMessage && /* @__PURE__ */ a(t, {
				id: r.errorId,
				children: r.errorMessage
			}),
			r.helperText && /* @__PURE__ */ a("span", {
				id: r.helperId,
				className: `${s}__helper`,
				children: r.helperText
			}),
			v
		]
	});
}
//#endregion
export { c as n, l as t };
