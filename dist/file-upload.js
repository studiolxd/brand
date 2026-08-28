'use client';
import './file-upload.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { n as t } from "./_shared/form-size.js";
import { forwardRef as n, useCallback as r, useEffect as i, useId as a, useRef as o, useState as s } from "react";
import { jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/atoms/FileUpload/FileUpload.tsx
function u(e) {
	return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
}
function d(e, t, n, r, i) {
	return n !== void 0 && e.size > n ? r(u(n)) : t && !t.split(",").map((e) => e.trim()).some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t.toLowerCase()) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -2)) : e.type === t) ? i : null;
}
var f = /* @__PURE__ */ new WeakMap();
function p(e) {
	if (!e.type.startsWith("image/")) return;
	let t = f.get(e);
	return t || (t = URL.createObjectURL(e), f.set(e, t)), t;
}
function m(e) {
	let t = f.get(e);
	t && (URL.revokeObjectURL(t), f.delete(e));
}
function h(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var g = n(function({ multiple: n = !1, accept: f, maxSize: g, maxFiles: _, value: v, defaultValue: y = [], onChange: b, progress: x, disabled: S = !1, error: C = !1, id: w, name: T, describedBy: E, ariaLabel: D, "aria-describedby": O, "aria-label": k, required: A, onBlur: j, className: ee, dropzoneLabel: te = "Arrastra archivos aquí", dropzoneActiveLabel: ne = "Suelta los archivos aquí", dropzoneHintLabel: re = "o haz clic para seleccionar", maxSizeHint: ie = (e) => `máx. ${e}`, maxFilesHint: M = (e) => `hasta ${e} archivos`, filesLabel: N = "Archivos seleccionados", progressLabel: P = "Progreso de subida", removeFileLabel: F = (e) => `Eliminar ${e}`, tooLargeError: I = (e) => `Archivo demasiado grande (máx. ${e})`, invalidTypeError: L = "Tipo de archivo no permitido", size: R }, z) {
	let B = t(R), V = v !== void 0, [H, U] = s(y), [W, G] = s(/* @__PURE__ */ new Map()), [K, q] = s(!1), J = o(/* @__PURE__ */ new Set()), Y = o(null), ae = a(), oe = w ?? `file-upload-${ae}`, X = V ? v : H;
	i(() => {
		X.forEach((e) => J.current.add(e));
	}, [X]), i(() => {
		let e = J.current;
		return () => {
			e.forEach(m);
		};
	}, []);
	let Z = r((e) => {
		if (S) return;
		let t = Array.from(e), n = V ? v ?? [] : H, r = new Map(W), i = [...n];
		for (let e of t) {
			if (_ !== void 0 && i.filter((e) => !r.has(e)).length >= _) break;
			let t = d(e, f, g, I, L);
			t && r.set(e, t), i.push(e);
		}
		G(r), V || U(i), b?.(i.filter((e) => !r.has(e)));
	}, [
		S,
		f,
		g,
		_,
		V,
		v,
		H,
		W,
		b,
		I,
		L
	]), se = r((e) => {
		let t = (V ? v ?? [] : H).filter((t) => t !== e), n = new Map(W);
		n.delete(e), m(e), G(n), V || U(t), b?.(t.filter((e) => !n.has(e))), Y.current && (Y.current.value = "");
	}, [
		V,
		v,
		H,
		W,
		b
	]), Q = (e) => {
		e.target.files && Z(e.target.files);
	}, ce = (e) => {
		e.preventDefault(), S || q(!0);
	}, le = (e) => {
		e.preventDefault(), q(!1);
	}, ue = (e) => {
		e.preventDefault(), q(!1), !S && e.dataTransfer.files && Z(e.dataTransfer.files);
	}, de = () => {
		S || Y.current?.click();
	}, fe = (e) => {
		!S && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), Y.current?.click());
	}, pe = [
		"file-upload",
		B === "md" ? "" : `file-upload--${B}`,
		K ? "file-upload--dragging" : "",
		C ? "file-upload--error" : "",
		S ? "file-upload--disabled" : "",
		X.length > 0 ? "file-upload--has-files" : "",
		ee ?? ""
	].filter(Boolean).join(" "), $ = [];
	return f && $.push(f), g && $.push(ie(u(g))), n && _ && $.push(M(_)), /* @__PURE__ */ l("div", {
		className: pe,
		children: [
			/* @__PURE__ */ c(e, { children: /* @__PURE__ */ c("input", {
				ref: (e) => {
					Y.current = e, h(z, e);
				},
				type: "file",
				id: oe,
				name: T,
				multiple: n,
				accept: f,
				disabled: S,
				required: A,
				"aria-label": D ?? k,
				"aria-describedby": E ?? O,
				"aria-invalid": C || void 0,
				onChange: Q,
				onBlur: j,
				tabIndex: -1
			}) }),
			/* @__PURE__ */ l("div", {
				className: "file-upload__dropzone",
				onClick: de,
				onKeyDown: fe,
				onDragOver: ce,
				onDragLeave: le,
				onDrop: ue,
				role: "button",
				tabIndex: S ? -1 : 0,
				"aria-disabled": S || void 0,
				"aria-describedby": E ?? O,
				"aria-invalid": C || void 0,
				children: [
					/* @__PURE__ */ l("svg", {
						className: "file-upload__icon",
						xmlns: "http://www.w3.org/2000/svg",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ c("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
							/* @__PURE__ */ c("polyline", { points: "17 8 12 3 7 8" }),
							/* @__PURE__ */ c("line", {
								x1: "12",
								y1: "3",
								x2: "12",
								y2: "15"
							})
						]
					}),
					/* @__PURE__ */ c("span", {
						className: "file-upload__text",
						children: K ? ne : te
					}),
					/* @__PURE__ */ c("span", {
						className: "file-upload__text file-upload__text--secondary",
						children: re
					}),
					$.length > 0 && /* @__PURE__ */ c("span", {
						className: "file-upload__subtext",
						children: $.join(" · ")
					})
				]
			}),
			X.length > 0 && /* @__PURE__ */ c("ul", {
				className: "file-upload__list",
				"aria-label": N,
				children: X.map((e, t) => {
					let n = W.get(e), r = p(e);
					return /* @__PURE__ */ l("li", {
						className: `file-upload__item${n ? " file-upload__item--error" : ""}`,
						children: [
							/* @__PURE__ */ c("div", {
								className: "file-upload__item-thumb",
								"aria-hidden": "true",
								children: r ? /* @__PURE__ */ c("img", {
									src: r,
									alt: ""
								}) : /* @__PURE__ */ l("svg", {
									xmlns: "http://www.w3.org/2000/svg",
									width: "20",
									height: "20",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [/* @__PURE__ */ c("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ c("polyline", { points: "14 2 14 8 20 8" })]
								})
							}),
							/* @__PURE__ */ l("div", {
								className: "file-upload__item-info",
								children: [
									/* @__PURE__ */ c("span", {
										className: "file-upload__item-name",
										children: e.name
									}),
									/* @__PURE__ */ c("span", {
										className: "file-upload__item-size",
										children: u(e.size)
									}),
									n && /* @__PURE__ */ c("span", {
										className: "file-upload__item-error-msg",
										role: "alert",
										children: n
									})
								]
							}),
							/* @__PURE__ */ c("button", {
								className: "file-upload__item-remove",
								type: "button",
								onClick: () => se(e),
								"aria-label": F(e.name),
								children: /* @__PURE__ */ l("svg", {
									xmlns: "http://www.w3.org/2000/svg",
									width: "16",
									height: "16",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: [/* @__PURE__ */ c("line", {
										x1: "18",
										y1: "6",
										x2: "6",
										y2: "18"
									}), /* @__PURE__ */ c("line", {
										x1: "6",
										y1: "6",
										x2: "18",
										y2: "18"
									})]
								})
							})
						]
					}, `${e.name}-${e.size}-${t}`);
				})
			}),
			x !== void 0 && /* @__PURE__ */ c("div", {
				className: "file-upload__progress",
				role: "progressbar",
				"aria-valuenow": x,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-label": P,
				children: /* @__PURE__ */ c("div", {
					className: "file-upload__progress-bar",
					style: { "--file-upload-progress": `${x}%` }
				})
			})
		]
	});
});
//#endregion
export { g as FileUpload };
