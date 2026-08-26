'use client';
import './form.css';
import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/Form/Form.tsx
var r = e(function({ errors: e, onSubmit: r, actions: i, children: a }, o) {
	return /* @__PURE__ */ n("form", {
		ref: o,
		className: "form",
		onSubmit: r,
		noValidate: !0,
		children: [/* @__PURE__ */ n("div", {
			className: "form__fields",
			children: [a, e && e.length > 0 && /* @__PURE__ */ t("div", {
				role: "alert",
				className: "form-errors",
				children: /* @__PURE__ */ t("ul", {
					className: "form-errors__list",
					children: e.map((e) => /* @__PURE__ */ t("li", {
						className: "form-errors__item",
						children: e
					}, e))
				})
			})]
		}), i && /* @__PURE__ */ t("div", {
			className: "form__actions",
			children: i
		})]
	});
});
//#endregion
export { r as Form };
