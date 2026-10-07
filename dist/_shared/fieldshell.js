import { t as e } from "./brandmessagescontext.js";
import { VisuallyHidden as t } from "../visually-hidden.js";
import { ErrorText as n } from "../error-text.js";
import { Label as r } from "../label.js";
import { useContext as i, useId as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/_shared/FieldShell.tsx
function l(...e) {
	return e.filter(Boolean).join(" ") || void 0;
}
function u({ id: e, error: t = !1, errorMessage: n, helperText: r, describedBy: i }) {
	let o = a(), s = e ?? o, c = n ? `${s}-error` : void 0, u = r ? `${s}-helper` : void 0;
	return {
		id: s,
		labelId: `${s}-label`,
		errorId: c,
		helperId: u,
		describedBy: l(c, u, i),
		hasError: t || !!n,
		errorMessage: n,
		helperText: r
	};
}
function d({ field: a, block: l, modifiers: u = [], className: d, size: f = "md", label: p, optional: m = !1, optionalLabel: h, labelHidden: g = !1, layout: _ = "stack", labelFor: v, labelIdentified: y = !1, rootProps: b, children: x, footer: S }) {
	let C = v ?? a.id, w = y ? a.labelId : void 0, T = i(e), E = m && p ? /* @__PURE__ */ c(o, { children: [
		p,
		" ",
		/* @__PURE__ */ s("span", {
			className: "label__optional",
			children: h ?? T?.field?.optional ?? "(opcional)"
		})
	] }) : p;
	return /* @__PURE__ */ c("div", {
		...b,
		className: [
			l,
			...u,
			d
		].filter(Boolean).join(" "),
		children: [
			_ === "inline" ? /* @__PURE__ */ c("label", {
				className: `${l}__control`,
				htmlFor: C,
				children: [x, s(g ? t : "span", {
					id: w,
					className: `${l}__label`,
					children: E
				})]
			}) : /* @__PURE__ */ c(o, { children: [p ? /* @__PURE__ */ s(r, {
				id: w,
				htmlFor: C,
				hidden: g,
				size: f,
				children: E
			}) : null, x] }),
			a.errorMessage && /* @__PURE__ */ s(n, {
				id: a.errorId,
				children: a.errorMessage
			}),
			a.helperText && /* @__PURE__ */ s("span", {
				id: a.helperId,
				className: `${l}__helper`,
				children: a.helperText
			}),
			S
		]
	});
}
//#endregion
export { u as n, d as t };
