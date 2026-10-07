'use client';
import './form.css';
import { t as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { t as n } from "./_shared/field-optional.js";
import { forwardRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/Form/Form.tsx
var o = r(function({ errors: r, actions: o, links: s, alternatives: c, alternativesLabel: l, captcha: u, size: d, markOptional: f = !1, blockActions: p = !1, success: m, className: h, children: g, ..._ }, v) {
	let y = [
		"form",
		d && d !== "md" ? `form--${d}` : "",
		p ? "form--block-actions" : "",
		h
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ i(e.Provider, {
		value: d,
		children: /* @__PURE__ */ i(n.Provider, {
			value: f,
			children: /* @__PURE__ */ a("form", {
				ref: v,
				className: y,
				noValidate: !0,
				..._,
				children: [
					m && /* @__PURE__ */ i("p", {
						className: "form__success",
						role: "status",
						children: m
					}),
					!m && g && /* @__PURE__ */ i("div", {
						className: "form__fields",
						children: g
					}),
					!m && u && /* @__PURE__ */ i("div", {
						className: "form__captcha",
						children: u
					}),
					!m && r && r.length > 0 && /* @__PURE__ */ i("ul", {
						className: "form__errors",
						children: r.map((e) => /* @__PURE__ */ i("li", { children: /* @__PURE__ */ i(t, {
							as: "span",
							children: e
						}) }, e))
					}),
					!m && o && /* @__PURE__ */ i("div", {
						className: ["form__actions", p ? "form__actions--block" : ""].filter(Boolean).join(" "),
						children: o
					}),
					s && /* @__PURE__ */ i("div", {
						className: "form__links",
						children: s
					}),
					!m && c && /* @__PURE__ */ a("div", {
						className: "form__alternatives",
						children: [l && /* @__PURE__ */ i("p", {
							className: "form__alternatives-label",
							children: l
						}), c]
					})
				]
			})
		})
	});
});
//#endregion
export { o as Form };
