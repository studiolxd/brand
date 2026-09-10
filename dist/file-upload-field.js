'use client';
import './file-upload-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { Label as n } from "./label.js";
import { FileUpload as r } from "./file-upload.js";
import { n as i } from "./_shared/field-labels.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { forwardRef as s, useId as c } from "react";
//#region src/stories/molecules/FileUploadField/FileUploadField.tsx
var l = s(function({ id: s, label: l, labelHidden: u, errorMessage: d, helperText: f, error: p = !1, size: m, className: h, ...g }, _) {
	let v = i(u), y = e(m), b = c(), x = s ?? b, S = d ? `${x}-error` : void 0, C = f ? `${x}-helper` : void 0, w = [S, C].filter(Boolean).join(" ") || void 0, T = p || !!d;
	return /* @__PURE__ */ o("div", {
		className: ["file-upload-field", h].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ a(n, {
				htmlFor: x,
				hidden: v,
				size: y,
				children: l
			}),
			/* @__PURE__ */ a(r, {
				ref: _,
				...g,
				id: x,
				size: y,
				error: T,
				"aria-describedby": w
			}),
			d && /* @__PURE__ */ a(t, {
				id: S,
				children: d
			}),
			f && /* @__PURE__ */ a("span", {
				id: C,
				className: "file-upload-field__helper",
				children: f
			})
		]
	});
});
//#endregion
export { l as FileUploadField };
