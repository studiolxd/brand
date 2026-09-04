'use client';
import './file-upload.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { n } from "./_shared/form-size.js";
import { t as r } from "./_shared/ProgressBar.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { forwardRef as o, useCallback as s, useEffect as c, useId as l, useRef as u, useState as d } from "react";
//#region src/stories/atoms/FileUpload/FileUpload.tsx
function f(e) {
	return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
}
function p(e, t, n, r, i) {
	return n !== void 0 && e.size > n ? r(f(n)) : t && !t.split(",").map((e) => e.trim()).some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t.toLowerCase()) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -2)) : e.type === t) ? i : null;
}
var m = /* @__PURE__ */ new WeakMap();
function h(e) {
	if (!e.type.startsWith("image/")) return;
	let t = m.get(e);
	return t || (t = URL.createObjectURL(e), m.set(e, t)), t;
}
function g(e) {
	let t = m.get(e);
	t && (URL.revokeObjectURL(t), m.delete(e));
}
function ee(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var _ = o(function({ multiple: o = !1, accept: m, maxSize: _, maxFiles: v, value: y, defaultValue: te = [], onChange: b, progress: x, disabled: S = !1, error: C = !1, id: w, name: T, describedBy: E, ariaLabel: D, "aria-describedby": O, "aria-label": ne, required: re, onBlur: ie, className: ae, dropzoneLabel: k = "Arrastra archivos aquí", dropzoneActiveLabel: oe = "Suelta los archivos aquí", dropzoneHintLabel: A = "o haz clic para seleccionar", maxSizeHint: se = (e) => `máx. ${e}`, maxFilesHint: ce = (e) => `hasta ${e} archivos`, filesLabel: le = "Archivos seleccionados", progressLabel: j = "Progreso de subida", removeFileLabel: M = (e) => `Eliminar ${e}`, tooLargeError: N = (e) => `Archivo demasiado grande (máx. ${e})`, invalidTypeError: P = "Tipo de archivo no permitido", size: F }, I) {
	let L = n(F), R = L === "sm" ? "sm" : L === "lg" ? "lg" : "md", z = y !== void 0, [B, V] = d(te), [H, U] = d(/* @__PURE__ */ new Map()), [W, G] = d(!1), K = u(/* @__PURE__ */ new Set()), q = u(null), ue = l(), J = w ?? `file-upload-${ue}`, Y = z ? y : B;
	c(() => {
		Y.forEach((e) => K.current.add(e));
	}, [Y]), c(() => {
		let e = K.current;
		return () => {
			e.forEach(g);
		};
	}, []);
	let X = s((e) => {
		if (S) return;
		let t = Array.from(e), n = z ? y ?? [] : B, r = new Map(H), i = [...n];
		for (let e of t) {
			if (v !== void 0 && i.filter((e) => !r.has(e)).length >= v) break;
			let t = p(e, m, _, N, P);
			t && r.set(e, t), i.push(e);
		}
		U(r), z || V(i), b?.(i.filter((e) => !r.has(e)));
	}, [
		S,
		m,
		_,
		v,
		z,
		y,
		B,
		H,
		b,
		N,
		P
	]), de = s((e) => {
		let t = (z ? y ?? [] : B).filter((t) => t !== e), n = new Map(H);
		n.delete(e), g(e), U(n), z || V(t), b?.(t.filter((e) => !n.has(e))), q.current && (q.current.value = "");
	}, [
		z,
		y,
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
		ae ?? ""
	].filter(Boolean).join(" "), Q = `${J}-hint`, _e = [E ?? O, Q].filter(Boolean).join(" "), $ = [];
	return m && $.push(m), _ && $.push(se(f(_))), o && v && $.push(ce(v)), /* @__PURE__ */ a("div", {
		className: ge,
		children: [
			/* @__PURE__ */ i(t, { children: /* @__PURE__ */ i("input", {
				ref: (e) => {
					q.current = e, ee(I, e);
				},
				type: "file",
				id: J,
				name: T,
				multiple: o,
				accept: m,
				disabled: S,
				required: re,
				"aria-label": D ?? ne,
				"aria-describedby": _e,
				"aria-invalid": C || void 0,
				onChange: fe,
				onBlur: ie
			}) }),
			/* @__PURE__ */ a("div", {
				className: "file-upload__dropzone",
				onClick: Z,
				onDragOver: pe,
				onDragLeave: me,
				onDrop: he,
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ i(e, {
						name: "upload",
						size: R,
						className: "file-upload__icon"
					}),
					/* @__PURE__ */ i("span", {
						className: "file-upload__text",
						children: W ? oe : k
					}),
					/* @__PURE__ */ i("span", {
						className: "file-upload__text file-upload__text--secondary",
						children: A
					}),
					$.length > 0 && /* @__PURE__ */ i("span", {
						className: "file-upload__subtext",
						children: $.join(" · ")
					})
				]
			}),
			/* @__PURE__ */ i(t, {
				id: Q,
				children: [
					k,
					A,
					...$
				].join(". ")
			}),
			Y.length > 0 && /* @__PURE__ */ i("ul", {
				className: "file-upload__list",
				"aria-label": le,
				children: Y.map((t, n) => {
					let r = H.get(t), o = h(t);
					return /* @__PURE__ */ a("li", {
						className: `file-upload__item${r ? " file-upload__item--error" : ""}`,
						children: [
							/* @__PURE__ */ i("div", {
								className: "file-upload__item-thumb",
								"aria-hidden": "true",
								children: o ? /* @__PURE__ */ i("img", {
									src: o,
									alt: ""
								}) : /* @__PURE__ */ i(e, {
									name: "file-text",
									size: "sm"
								})
							}),
							/* @__PURE__ */ a("div", {
								className: "file-upload__item-info",
								children: [
									/* @__PURE__ */ i("span", {
										className: "file-upload__item-name",
										children: t.name
									}),
									/* @__PURE__ */ i("span", {
										className: "file-upload__item-size",
										children: f(t.size)
									}),
									r && /* @__PURE__ */ i("span", {
										className: "file-upload__item-error-msg",
										role: "alert",
										children: r
									})
								]
							}),
							/* @__PURE__ */ i("button", {
								className: "file-upload__item-remove",
								type: "button",
								onClick: () => de(t),
								"aria-label": M(t.name),
								children: /* @__PURE__ */ i(e, {
									name: "close",
									size: "sm"
								})
							})
						]
					}, `${t.name}-${t.size}-${n}`);
				})
			}),
			x !== void 0 && /* @__PURE__ */ i(r, {
				value: x,
				label: j,
				size: "sm",
				className: "file-upload__progress"
			})
		]
	});
});
//#endregion
export { _ as FileUpload };
