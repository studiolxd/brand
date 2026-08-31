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
function ee(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var h = n(function({ multiple: n = !1, accept: f, maxSize: h, maxFiles: g, value: _, defaultValue: te = [], onChange: v, progress: y, disabled: b = !1, error: x = !1, id: S, name: C, describedBy: w, ariaLabel: T, "aria-describedby": E, "aria-label": D, required: O, onBlur: k, className: ne, dropzoneLabel: A = "Arrastra archivos aquí", dropzoneActiveLabel: re = "Suelta los archivos aquí", dropzoneHintLabel: j = "o haz clic para seleccionar", maxSizeHint: ie = (e) => `máx. ${e}`, maxFilesHint: ae = (e) => `hasta ${e} archivos`, filesLabel: oe = "Archivos seleccionados", progressLabel: M = "Progreso de subida", removeFileLabel: N = (e) => `Eliminar ${e}`, tooLargeError: P = (e) => `Archivo demasiado grande (máx. ${e})`, invalidTypeError: F = "Tipo de archivo no permitido", size: I }, L) {
	let R = t(I), z = _ !== void 0, [B, V] = s(te), [H, U] = s(/* @__PURE__ */ new Map()), [W, G] = s(!1), K = o(/* @__PURE__ */ new Set()), q = o(null), se = a(), J = S ?? `file-upload-${se}`, Y = z ? _ : B;
	i(() => {
		Y.forEach((e) => K.current.add(e));
	}, [Y]), i(() => {
		let e = K.current;
		return () => {
			e.forEach(m);
		};
	}, []);
	let X = r((e) => {
		if (b) return;
		let t = Array.from(e), n = z ? _ ?? [] : B, r = new Map(H), i = [...n];
		for (let e of t) {
			if (g !== void 0 && i.filter((e) => !r.has(e)).length >= g) break;
			let t = d(e, f, h, P, F);
			t && r.set(e, t), i.push(e);
		}
		U(r), z || V(i), v?.(i.filter((e) => !r.has(e)));
	}, [
		b,
		f,
		h,
		g,
		z,
		_,
		B,
		H,
		v,
		P,
		F
	]), ce = r((e) => {
		let t = (z ? _ ?? [] : B).filter((t) => t !== e), n = new Map(H);
		n.delete(e), m(e), U(n), z || V(t), v?.(t.filter((e) => !n.has(e))), q.current && (q.current.value = "");
	}, [
		z,
		_,
		B,
		H,
		v
	]), le = (e) => {
		e.target.files && X(e.target.files);
	}, ue = (e) => {
		e.preventDefault(), b || G(!0);
	}, de = (e) => {
		e.preventDefault(), G(!1);
	}, Z = (e) => {
		e.preventDefault(), G(!1), !b && e.dataTransfer.files && X(e.dataTransfer.files);
	}, fe = () => {
		b || q.current?.click();
	}, pe = [
		"file-upload",
		R === "md" ? "" : `file-upload--${R}`,
		W ? "file-upload--dragging" : "",
		x ? "file-upload--error" : "",
		b ? "file-upload--disabled" : "",
		Y.length > 0 ? "file-upload--has-files" : "",
		ne ?? ""
	].filter(Boolean).join(" "), Q = `${J}-hint`, me = [w ?? E, Q].filter(Boolean).join(" "), $ = [];
	return f && $.push(f), h && $.push(ie(u(h))), n && g && $.push(ae(g)), /* @__PURE__ */ l("div", {
		className: pe,
		children: [
			/* @__PURE__ */ c(e, { children: /* @__PURE__ */ c("input", {
				ref: (e) => {
					q.current = e, ee(L, e);
				},
				type: "file",
				id: J,
				name: C,
				multiple: n,
				accept: f,
				disabled: b,
				required: O,
				"aria-label": T ?? D,
				"aria-describedby": me,
				"aria-invalid": x || void 0,
				onChange: le,
				onBlur: k
			}) }),
			/* @__PURE__ */ l("div", {
				className: "file-upload__dropzone",
				onClick: fe,
				onDragOver: ue,
				onDragLeave: de,
				onDrop: Z,
				"aria-hidden": "true",
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
						children: W ? re : A
					}),
					/* @__PURE__ */ c("span", {
						className: "file-upload__text file-upload__text--secondary",
						children: j
					}),
					$.length > 0 && /* @__PURE__ */ c("span", {
						className: "file-upload__subtext",
						children: $.join(" · ")
					})
				]
			}),
			/* @__PURE__ */ c(e, {
				id: Q,
				children: [
					A,
					j,
					...$
				].join(". ")
			}),
			Y.length > 0 && /* @__PURE__ */ c("ul", {
				className: "file-upload__list",
				"aria-label": oe,
				children: Y.map((e, t) => {
					let n = H.get(e), r = p(e);
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
								onClick: () => ce(e),
								"aria-label": N(e.name),
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
			y !== void 0 && /* @__PURE__ */ c("div", {
				className: "file-upload__progress",
				role: "progressbar",
				"aria-valuenow": y,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-label": M,
				children: /* @__PURE__ */ c("div", {
					className: "file-upload__progress-bar",
					style: { "--file-upload-progress": `${y}%` }
				})
			})
		]
	});
});
//#endregion
export { h as FileUpload };
