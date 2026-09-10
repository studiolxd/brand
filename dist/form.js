'use client';
import './form.css';
import { t as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { forwardRef as i } from "react";
//#region src/stories/molecules/Form/Form.tsx
var a = i(function({ errors: i, actions: a, links: o, alternatives: s, alternativesLabel: c, captcha: l, size: u, blockActions: d = !1, success: f, className: p, children: m, ...h }, g) {
	let _ = [
		"form",
		u && u !== "md" ? `form--${u}` : "",
		d ? "form--block-actions" : "",
		p
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(e.Provider, {
		value: u,
		children: /* @__PURE__ */ r("form", {
			ref: g,
			className: _,
			noValidate: !0,
			...h,
			children: [
				f && /* @__PURE__ */ n("p", {
					className: "form__success",
					role: "status",
					children: f
				}),
				!f && m && /* @__PURE__ */ n("div", {
					className: "form__fields",
					children: m
				}),
				!f && l && /* @__PURE__ */ n("div", {
					className: "form__captcha",
					children: l
				}),
				!f && i && i.length > 0 && /* @__PURE__ */ n("ul", {
					className: "form__errors",
					children: i.map((e) => /* @__PURE__ */ n("li", { children: /* @__PURE__ */ n(t, {
						as: "span",
						children: e
					}) }, e))
				}),
				!f && a && /* @__PURE__ */ n("div", {
					className: ["form__actions", d ? "form__actions--block" : ""].filter(Boolean).join(" "),
					children: a
				}),
				o && /* @__PURE__ */ n("div", {
					className: "form__links",
					children: o
				}),
				!f && s && /* @__PURE__ */ r("div", {
					className: "form__alternatives",
					children: [c && /* @__PURE__ */ n("p", {
						className: "form__alternatives-label",
						children: c
					}), s]
				})
			]
		})
	});
});
//#endregion
export { a as Form };
