'use client';
import './file-upload.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { n } from "./_shared/form-size.js";
import { t as r } from "./_shared/ProgressBar.js";
import { n as i, t as a } from "./_shared/validate.js";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
import { forwardRef as c, useCallback as l, useEffect as u, useId as ee, useRef as d, useState as f } from "react";
//#region src/stories/atoms/FileUpload/FileUpload.tsx
var p = /* @__PURE__ */ new WeakMap();
function te(e) {
	if (!e.type.startsWith("image/")) return;
	let t = p.get(e);
	return t || (t = URL.createObjectURL(e), p.set(e, t)), t;
}
function m(e) {
	let t = p.get(e);
	t && (URL.revokeObjectURL(t), p.delete(e));
}
function h(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var g = c(function({ multiple: c = !1, accept: p, maxSize: g, maxFiles: _, value: v, defaultValue: y = [], onChange: b, progress: x, disabled: S = !1, error: C = !1, id: w, name: T, describedBy: E, ariaLabel: D, "aria-describedby": O, "aria-label": k, required: ne, onBlur: re, className: ie, dropzoneLabel: A = "Arrastra archivos aquí", dropzoneActiveLabel: ae = "Suelta los archivos aquí", dropzoneHintLabel: j = "o haz clic para seleccionar", maxSizeHint: oe = (e) => `máx. ${e}`, maxFilesHint: se = (e) => `hasta ${e} archivos`, filesLabel: ce = "Archivos seleccionados", progressLabel: le = "Progreso de subida", removeFileLabel: M = (e) => `Eliminar ${e}`, tooLargeError: N = (e) => `Archivo demasiado grande (máx. ${e})`, invalidTypeError: P = "Tipo de archivo no permitido", size: F }, I) {
	let L = n(F), R = L === "sm" ? "sm" : L === "lg" ? "lg" : "md", z = v !== void 0, [B, V] = f(y), [H, U] = f(/* @__PURE__ */ new Map()), [W, G] = f(!1), K = d(/* @__PURE__ */ new Set()), q = d(null), ue = ee(), J = w ?? `file-upload-${ue}`, Y = z ? v : B;
	u(() => {
		Y.forEach((e) => K.current.add(e));
	}, [Y]), u(() => {
		let e = K.current;
		return () => {
			e.forEach(m);
		};
	}, []);
	let X = l((e) => {
		if (S) return;
		let t = Array.from(e), n = z ? v ?? [] : B, r = new Map(H), a = [...n];
		for (let e of t) {
			if (_ !== void 0 && a.filter((e) => !r.has(e)).length >= _) break;
			let t = i(e, p, g, N, P);
			t && r.set(e, t), a.push(e);
		}
		U(r), z || V(a), b?.(a.filter((e) => !r.has(e)));
	}, [
		S,
		p,
		g,
		_,
		z,
		v,
		B,
		H,
		b,
		N,
		P
	]), de = l((e) => {
		let t = (z ? v ?? [] : B).filter((t) => t !== e), n = new Map(H);
		n.delete(e), m(e), U(n), z || V(t), b?.(t.filter((e) => !n.has(e))), q.current && (q.current.value = "");
	}, [
		z,
		v,
		B,
		H,
		b
	]), fe = (e) => {
		e.target.files && X(e.target.files);
	}, pe = (e) => {
		e.preventDefault(), S || G(!0);
	}, me = (e) => {
		e.preventDefault(), G(!1);
	}, he = (e) => {
		e.preventDefault(), G(!1), !S && e.dataTransfer.files && X(e.dataTransfer.files);
	}, Z = () => {
		S || q.current?.click();
	}, ge = [
		"file-upload",
		L === "md" ? "" : `file-upload--${L}`,
		W ? "file-upload--dragging" : "",
		C ? "file-upload--error" : "",
		S ? "file-upload--disabled" : "",
		Y.length > 0 ? "file-upload--has-files" : "",
		ie ?? ""
	].filter(Boolean).join(" "), Q = `${J}-hint`, _e = [E ?? O, Q].filter(Boolean).join(" "), $ = [];
	return p && $.push(p), g && $.push(oe(a(g))), c && _ && $.push(se(_)), /* @__PURE__ */ s("div", {
		className: ge,
		children: [
			/* @__PURE__ */ o(t, { children: /* @__PURE__ */ o("input", {
				ref: (e) => {
					q.current = e, h(I, e);
				},
				type: "file",
				id: J,
				name: T,
				multiple: c,
				accept: p,
				disabled: S,
				required: ne,
				"aria-label": D ?? k,
				"aria-describedby": _e,
				"aria-invalid": C || void 0,
				onChange: fe,
				onBlur: re
			}) }),
			/* @__PURE__ */ s("div", {
				className: "file-upload__dropzone",
				onClick: Z,
				onDragOver: pe,
				onDragLeave: me,
				onDrop: he,
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ o(e, {
						name: "upload",
						size: R,
						className: "file-upload__icon"
					}),
					/* @__PURE__ */ o("span", {
						className: "file-upload__text",
						children: W ? ae : A
					}),
					/* @__PURE__ */ o("span", {
						className: "file-upload__text file-upload__text--secondary",
						children: j
					}),
					$.length > 0 && /* @__PURE__ */ o("span", {
						className: "file-upload__subtext",
						children: $.join(" · ")
					})
				]
			}),
			/* @__PURE__ */ o(t, {
				id: Q,
				children: [
					A,
					j,
					...$
				].join(". ")
			}),
			Y.length > 0 && /* @__PURE__ */ o("ul", {
				className: "file-upload__list",
				"aria-label": ce,
				children: Y.map((t, n) => {
					let r = H.get(t), i = te(t);
					return /* @__PURE__ */ s("li", {
						className: `file-upload__item${r ? " file-upload__item--error" : ""}`,
						children: [
							/* @__PURE__ */ o("div", {
								className: "file-upload__item-thumb",
								"aria-hidden": "true",
								children: i ? /* @__PURE__ */ o("img", {
									src: i,
									alt: ""
								}) : /* @__PURE__ */ o(e, {
									name: "file-text",
									size: "sm"
								})
							}),
							/* @__PURE__ */ s("div", {
								className: "file-upload__item-info",
								children: [
									/* @__PURE__ */ o("span", {
										className: "file-upload__item-name",
										children: t.name
									}),
									/* @__PURE__ */ o("span", {
										className: "file-upload__item-size",
										children: a(t.size)
									}),
									r && /* @__PURE__ */ o("span", {
										className: "file-upload__item-error-msg",
										role: "alert",
										children: r
									})
								]
							}),
							/* @__PURE__ */ o("button", {
								className: "file-upload__item-remove",
								type: "button",
								onClick: () => de(t),
								"aria-label": M(t.name),
								children: /* @__PURE__ */ o(e, {
									name: "close",
									size: "sm"
								})
							})
						]
					}, `${t.name}-${t.size}-${n}`);
				})
			}),
			x !== void 0 && /* @__PURE__ */ o(r, {
				value: x,
				label: le,
				size: "sm",
				className: "file-upload__progress"
			})
		]
	});
});
//#endregion
export { g as FileUpload };
