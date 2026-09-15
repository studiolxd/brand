'use client';
import './file-upload-field.css';
import { n as e } from "./_shared/form-size.js";
import { ErrorText as t } from "./error-text.js";
import { Label as n } from "./label.js";
import { FileUpload as r } from "./file-upload.js";
import { n as i } from "./_shared/field-labels.js";
import { forwardRef as a, useId as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/FileUploadField/FileUploadField.tsx
var l = a(function({ id: a, label: l, labelHidden: u, errorMessage: d, helperText: f, error: p = !1, size: m, className: h, ...g }, _) {
	let v = i(u), y = e(m), b = o(), x = a ?? b, S = d ? `${x}-error` : void 0, C = f ? `${x}-helper` : void 0, w = [S, C].filter(Boolean).join(" ") || void 0, T = p || !!d;
	return /* @__PURE__ */ c("div", {
		className: ["file-upload-field", h].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ s(n, {
				htmlFor: x,
				hidden: v,
				size: y,
				children: l
			}),
			/* @__PURE__ */ s(r, {
				ref: _,
				...g,
				id: x,
				size: y,
				error: T,
				"aria-describedby": w
			}),
			d && /* @__PURE__ */ s(t, {
				id: S,
				children: d
			}),
			f && /* @__PURE__ */ s("span", {
				id: C,
				className: "file-upload-field__helper",
				children: f
			})
		]
	});
});
//#endregion
export { l as FileUploadField };
