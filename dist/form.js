'use client';
import './form.css';
import { t as e } from "./_shared/form-size.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r } from "react";
//#region src/stories/molecules/Form/Form.tsx
var i = r(function({ errors: r, actions: i, links: a, alternatives: o, alternativesLabel: s, captcha: c, size: l, blockActions: u = !1, className: d, children: f, ...p }, m) {
	let h = [
		"form",
		l && l !== "md" ? `form--${l}` : "",
		u ? "form--block-actions" : "",
		d
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(e.Provider, {
		value: l,
		children: /* @__PURE__ */ n("form", {
			ref: m,
			className: h,
			noValidate: !0,
			...p,
			children: [
				f && /* @__PURE__ */ t("div", {
					className: "form__fields",
					children: f
				}),
				c && /* @__PURE__ */ t("div", {
					className: "form__captcha",
					children: c
				}),
				r && r.length > 0 && /* @__PURE__ */ t("ul", {
					role: "alert",
					className: "form__errors",
					children: r.map((e) => /* @__PURE__ */ t("li", {
						className: "form__error",
						children: e
					}, e))
				}),
				i && /* @__PURE__ */ t("div", {
					className: ["form__actions", u ? "form__actions--block" : ""].filter(Boolean).join(" "),
					children: i
				}),
				a && /* @__PURE__ */ t("div", {
					className: "form__links",
					children: a
				}),
				o && /* @__PURE__ */ n("div", {
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
