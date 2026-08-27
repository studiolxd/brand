'use client';
import './form.css';
import { t as e } from "./_shared/form-size.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r } from "react";
//#region src/stories/molecules/Form/Form.tsx
var i = r(function({ errors: r, actions: i, links: a, alternatives: o, alternativesLabel: s, captcha: c, size: l, blockActions: u = !1, success: d, className: f, children: p, ...m }, h) {
	let g = [
		"form",
		l && l !== "md" ? `form--${l}` : "",
		u ? "form--block-actions" : "",
		f
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(e.Provider, {
		value: l,
		children: /* @__PURE__ */ n("form", {
			ref: h,
			className: g,
			noValidate: !0,
			...m,
			children: [
				d && /* @__PURE__ */ t("p", {
					className: "form__success",
					role: "status",
					children: d
				}),
				!d && p && /* @__PURE__ */ t("div", {
					className: "form__fields",
					children: p
				}),
				!d && c && /* @__PURE__ */ t("div", {
					className: "form__captcha",
					children: c
				}),
				!d && r && r.length > 0 && /* @__PURE__ */ t("ul", {
					role: "alert",
					className: "form__errors",
					children: r.map((e) => /* @__PURE__ */ t("li", {
						className: "form__error",
						children: e
					}, e))
				}),
				!d && i && /* @__PURE__ */ t("div", {
					className: ["form__actions", u ? "form__actions--block" : ""].filter(Boolean).join(" "),
					children: i
				}),
				a && /* @__PURE__ */ t("div", {
					className: "form__links",
					children: a
				}),
				!d && o && /* @__PURE__ */ n("div", {
					className: "form__alternatives",
					children: [s && /* @__PURE__ */ t("p", {
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
