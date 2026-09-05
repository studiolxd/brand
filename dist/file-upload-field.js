'use client';
import './file-upload-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { FileUpload as n } from "./file-upload.js";
import { n as r } from "./_shared/field-labels.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useId as s } from "react";
//#region src/stories/molecules/FileUploadField/FileUploadField.tsx
var c = o(function({ id: o, label: c, labelHidden: l, errorMessage: u, helperText: d, error: f = !1, size: p, className: m, ...h }, g) {
	let _ = r(l), v = e(p), y = s(), b = o ?? y, x = u ? `${b}-error` : void 0, S = d ? `${b}-helper` : void 0, C = [x, S].filter(Boolean).join(" ") || void 0, w = f || !!u;
	return /* @__PURE__ */ a("div", {
		className: ["file-upload-field", m].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ i(t, {
				htmlFor: b,
				hidden: _,
				size: v,
				children: c
			}),
			/* @__PURE__ */ i(n, {
				ref: g,
				...h,
				id: b,
				size: v,
				error: w,
				"aria-describedby": C
			}),
			u && /* @__PURE__ */ i("span", {
				id: x,
				className: "file-upload-field__error",
				role: "alert",
				children: u
			}),
			d && /* @__PURE__ */ i("span", {
				id: S,
				className: "file-upload-field__helper",
				children: d
			})
		]
	});
});
//#endregion
export { c as FileUploadField };
