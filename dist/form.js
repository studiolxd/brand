'use client';
import './form.css';
import { t as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { forwardRef as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/Form/Form.tsx
var a = n(function({ errors: n, actions: a, links: o, alternatives: s, alternativesLabel: c, captcha: l, size: u, blockActions: d = !1, success: f, className: p, children: m, ...h }, g) {
	let _ = [
		"form",
		u && u !== "md" ? `form--${u}` : "",
		d ? "form--block-actions" : "",
		p
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(e.Provider, {
		value: u,
		children: /* @__PURE__ */ i("form", {
			ref: g,
			className: _,
			noValidate: !0,
			...h,
			children: [
				f && /* @__PURE__ */ r("p", {
					className: "form__success",
					role: "status",
					children: f
				}),
				!f && m && /* @__PURE__ */ r("div", {
					className: "form__fields",
					children: m
				}),
				!f && l && /* @__PURE__ */ r("div", {
					className: "form__captcha",
					children: l
				}),
				!f && n && n.length > 0 && /* @__PURE__ */ r("ul", {
					className: "form__errors",
					children: n.map((e) => /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r(t, {
						as: "span",
						children: e
					}) }, e))
				}),
				!f && a && /* @__PURE__ */ r("div", {
					className: ["form__actions", d ? "form__actions--block" : ""].filter(Boolean).join(" "),
					children: a
				}),
				o && /* @__PURE__ */ r("div", {
					className: "form__links",
					children: o
				}),
				!f && s && /* @__PURE__ */ i("div", {
					className: "form__alternatives",
					children: [c && /* @__PURE__ */ r("p", {
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
