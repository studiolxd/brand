'use client';
import './form.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { forwardRef as n } from "react";
//#region src/stories/molecules/Form/Form.tsx
var r = n(function({ errors: n, onSubmit: r, actions: i, children: a }, o) {
	return /* @__PURE__ */ t("form", {
		ref: o,
		className: "form",
		onSubmit: r,
		noValidate: !0,
		children: [
			a,
			n && n.length > 0 && /* @__PURE__ */ e("ul", {
				className: "form-errors",
				role: "alert",
				children: n.map((t) => /* @__PURE__ */ e("li", {
					className: "form-errors__item",
					children: t
				}, t))
			}),
			i
		]
	});
});
//#endregion
export { r as Form };
