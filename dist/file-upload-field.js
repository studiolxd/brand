'use client';
import './file-upload-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/fileupload.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/FileUploadField/FileUploadField.tsx
var s = a(function({ id: a, label: s, labelHidden: c, errorMessage: l, helperText: u, error: d = !1, size: f, className: p, ...m }, h) {
	let g = n(c), _ = e(f), v = r({
		id: a,
		error: d,
		errorMessage: l,
		helperText: u
	}), { id: y } = v;
	return /* @__PURE__ */ o(i, {
		field: v,
		block: "file-upload-field",
		className: p,
		label: s,
		labelHidden: g,
		size: _,
		children: /* @__PURE__ */ o(t, {
			ref: h,
			...m,
			id: y,
			size: _,
			error: v.hasError,
			"aria-describedby": v.describedBy
		})
	});
});
//#endregion
export { s as FileUploadField };
