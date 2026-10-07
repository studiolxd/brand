'use client';
import './file-upload-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/fileupload.js";
import { n } from "./_shared/field-labels.js";
import { n as r, t as i } from "./_shared/fieldshell.js";
import { forwardRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";
//#region src/stories/molecules/FileUploadField/FileUploadField.tsx
var s = a(function({ id: a, label: s, optional: c, optionalLabel: l, labelHidden: u, errorMessage: d, helperText: f, error: p = !1, size: m, className: h, ...g }, _) {
	let v = n(u), y = e(m), b = r({
		id: a,
		error: p,
		errorMessage: d,
		helperText: f
	}), { id: x } = b;
	return /* @__PURE__ */ o(i, {
		field: b,
		block: "file-upload-field",
		className: h,
		label: s,
		optional: c,
		optionalLabel: l,
		labelHidden: v,
		size: y,
		children: /* @__PURE__ */ o(t, {
			ref: _,
			...g,
			id: x,
			size: y,
			error: b.hasError,
			"aria-describedby": b.describedBy
		})
	});
});
//#endregion
export { s as FileUploadField };
