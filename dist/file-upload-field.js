'use client';
import './file-upload-field.css';
import { n as e } from "./_shared/form-size.js";
import { Label as t } from "./label.js";
import { FileUpload as n } from "./file-upload.js";
import { forwardRef as r, useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/FileUploadField/FileUploadField.tsx
var s = r(function({ id: r, label: s, labelHidden: c = !1, errorMessage: l, helperText: u, error: d = !1, size: f, className: p, ...m }, h) {
	let g = e(f), _ = i(), v = r ?? _, y = l ? `${v}-error` : void 0, b = u ? `${v}-helper` : void 0, x = [y, b].filter(Boolean).join(" ") || void 0, S = d || !!l;
	return /* @__PURE__ */ o("div", {
		className: ["file-upload-field", p].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(t, {
				htmlFor: v,
				hidden: c,
				size: g,
				children: s
			}),
			/* @__PURE__ */ a(n, {
				ref: h,
				...m,
				id: v,
				size: g,
				error: S,
				"aria-describedby": x
			}),
			l && /* @__PURE__ */ a("span", {
				id: y,
				className: "file-upload-field__error",
				role: "alert",
				children: l
			}),
			u && /* @__PURE__ */ a("span", {
				id: b,
				className: "file-upload-field__helper",
				children: u
			})
		]
	});
});
//#endregion
export { s as FileUploadField };
