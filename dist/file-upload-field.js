'use client';
import './file-upload-field.css';
import { Label as e } from "./label.js";
import { FileUpload as t } from "./file-upload.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/FileUploadField/FileUploadField.tsx
function i({ id: i, label: a, labelHidden: o = !1, errorMessage: s, helperText: c, error: l, ...u }) {
	let d = s ? `${i}-error` : void 0, f = c ? `${i}-helper` : void 0, p = [d, f].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ r("div", {
		className: "file-upload-field",
		children: [
			/* @__PURE__ */ n(e, {
				htmlFor: i,
				hidden: o,
				children: a
			}),
			/* @__PURE__ */ n(t, {
				id: i,
				error: l || !!s,
				describedBy: p,
				...u
			}),
			s && /* @__PURE__ */ n("span", {
				id: d,
				className: "file-upload-field__error",
				role: "alert",
				children: s
			}),
			c && /* @__PURE__ */ n("span", {
				id: f,
				className: "file-upload-field__helper",
				children: c
			})
		]
	});
}
//#endregion
export { i as FileUploadField };
