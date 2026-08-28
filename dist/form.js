'use client';
import './form.css';
import { t as e } from "./_shared/form-size.js";
import { forwardRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/Form/Form.tsx
var i = t(function({ errors: t, actions: i, links: a, alternatives: o, alternativesLabel: s, captcha: c, size: l, blockActions: u = !1, success: d, className: f, children: p, ...m }, h) {
	let g = [
		"form",
		l && l !== "md" ? `form--${l}` : "",
		u ? "form--block-actions" : "",
		f
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(e.Provider, {
		value: l,
		children: /* @__PURE__ */ r("form", {
			ref: h,
			className: g,
			noValidate: !0,
			...m,
			children: [
				d && /* @__PURE__ */ n("p", {
					className: "form__success",
					role: "status",
					children: d
				}),
				!d && p && /* @__PURE__ */ n("div", {
					className: "form__fields",
					children: p
				}),
				!d && c && /* @__PURE__ */ n("div", {
					className: "form__captcha",
					children: c
				}),
				!d && t && t.length > 0 && /* @__PURE__ */ n("ul", {
					role: "alert",
					className: "form__errors",
					children: t.map((e) => /* @__PURE__ */ n("li", {
						className: "form__error",
						children: e
					}, e))
				}),
				!d && i && /* @__PURE__ */ n("div", {
					className: ["form__actions", u ? "form__actions--block" : ""].filter(Boolean).join(" "),
					children: i
				}),
				a && /* @__PURE__ */ n("div", {
					className: "form__links",
					children: a
				}),
				!d && o && /* @__PURE__ */ r("div", {
					className: "form__alternatives",
					children: [s && /* @__PURE__ */ n("p", {
						className: "form__alternatives-label",
						children: s
					}), o]
				})
			]
		})
	});
});
//#endregion
export { i as Form };
