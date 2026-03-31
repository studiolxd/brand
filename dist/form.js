'use client';
import './form.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/molecules/Form/Form.tsx
function n({ errors: n, onSubmit: r, actions: i, children: a }) {
	return /* @__PURE__ */ t("form", {
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
}
//#endregion
export { n as Form };
