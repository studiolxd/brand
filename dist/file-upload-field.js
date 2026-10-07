'use client';
import './file-upload-field.css';
import { n as e } from "./_shared/form-size.js";
import { t } from "./_shared/fileupload.js";
import { n } from "./_shared/field-optional.js";
import { n as r } from "./_shared/field-labels.js";
import { a as i, n as a } from "./_shared/fieldshell.js";
import { forwardRef as o } from "react";
import { jsx as s } from "react/jsx-runtime";
//#region src/stories/molecules/FileUploadField/FileUploadField.tsx
var c = o(function({ id: o, label: c, optional: l, optionalLabel: u, labelHidden: d, errorMessage: f, helperText: p, error: m = !1, size: h, className: g, ..._ }, v) {
	let y = r(d), b = e(h), x = n(l, _.required), S = i({
		id: o,
		error: m,
		errorMessage: f,
		helperText: p
	}), { id: C } = S;
	return /* @__PURE__ */ s(a, {
		field: S,
		block: "file-upload-field",
		className: g,
		label: c,
		optional: x,
		optionalLabel: u,
		labelHidden: y,
		size: b,
		children: /* @__PURE__ */ s(t, {
			ref: v,
			..._,
			id: C,
			size: b,
			error: S.hasError,
			"aria-describedby": S.describedBy
		})
	});
});
//#endregion
export { c as FileUploadField };
