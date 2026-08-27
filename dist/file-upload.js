'use client';
import './file-upload.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r, useCallback as i, useEffect as a, useId as o, useRef as s, useState as c } from "react";
//#region src/stories/atoms/FileUpload/FileUpload.tsx
function l(e) {
	return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
}
function u(e, t, n, r, i) {
	return n !== void 0 && e.size > n ? r(l(n)) : t && !t.split(",").map((e) => e.trim()).some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t.toLowerCase()) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -2)) : e.type === t) ? i : null;
}
var d = /* @__PURE__ */ new WeakMap();
function f(e) {
	if (!e.type.startsWith("image/")) return;
	let t = d.get(e);
	return t || (t = URL.createObjectURL(e), d.set(e, t)), t;
}
function p(e) {
	let t = d.get(e);
	t && (URL.revokeObjectURL(t), d.delete(e));
}
function m(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var h = r(function({ multiple: r = !1, accept: d, maxSize: h, maxFiles: g, value: _, defaultValue: v = [], onChange: y, progress: b, disabled: x = !1, error: S = !1, id: C, name: w, describedBy: T, ariaLabel: E, "aria-describedby": D, "aria-label": O, required: k, onBlur: A, className: ee, dropzoneLabel: te = "Arrastra archivos aquí", dropzoneActiveLabel: ne = "Suelta los archivos aquí", dropzoneHintLabel: re = "o haz clic para seleccionar", maxSizeHint: j = (e) => `máx. ${e}`, maxFilesHint: M = (e) => `hasta ${e} archivos`, filesLabel: N = "Archivos seleccionados", progressLabel: P = "Progreso de subida", removeFileLabel: F = (e) => `Eliminar ${e}`, tooLargeError: I = (e) => `Archivo demasiado grande (máx. ${e})`, invalidTypeError: L = "Tipo de archivo no permitido" }, R) {
	let z = _ !== void 0, [B, V] = c(v), [H, U] = c(/* @__PURE__ */ new Map()), [W, G] = c(!1), K = s(/* @__PURE__ */ new Set()), q = s(null), J = o(), Y = C ?? `file-upload-${J}`, X = z ? _ : B;
	a(() => {
		X.forEach((e) => K.current.add(e));
	}, [X]), a(() => {
		let e = K.current;
		return () => {
			e.forEach(p);
		};
	}, []);
	let Z = i((e) => {
		if (x) return;
		let t = Array.from(e), n = z ? _ ?? [] : B, r = new Map(H), i = [...n];
		for (let e of t) {
			if (g !== void 0 && i.filter((e) => !r.has(e)).length >= g) break;
			let t = u(e, d, h, I, L);
			t && r.set(e, t), i.push(e);
		}
		U(r), z || V(i), y?.(i.filter((e) => !r.has(e)));
	}, [
		x,
		d,
		h,
		g,
		z,
		_,
		B,
		H,
		y,
		I,
		L
	]), ie = i((e) => {
		let t = (z ? _ ?? [] : B).filter((t) => t !== e), n = new Map(H);
		n.delete(e), p(e), U(n), z || V(t), y?.(t.filter((e) => !n.has(e))), q.current && (q.current.value = "");
	}, [
		z,
		_,
		B,
		H,
		y
	]), ae = (e) => {
		e.target.files && Z(e.target.files);
	}, oe = (e) => {
		e.preventDefault(), x || G(!0);
	}, se = (e) => {
		e.preventDefault(), G(!1);
	}, Q = (e) => {
		e.preventDefault(), G(!1), !x && e.dataTransfer.files && Z(e.dataTransfer.files);
	}, ce = () => {
		x || q.current?.click();
	}, le = (e) => {
		!x && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), q.current?.click());
	}, ue = [
		"file-upload",
		W ? "file-upload--dragging" : "",
		S ? "file-upload--error" : "",
		x ? "file-upload--disabled" : "",
		X.length > 0 ? "file-upload--has-files" : "",
		ee ?? ""
	].filter(Boolean).join(" "), $ = [];
	return d && $.push(d), h && $.push(j(l(h))), r && g && $.push(M(g)), /* @__PURE__ */ n("div", {
		className: ue,
		children: [
			/* @__PURE__ */ t(e, { children: /* @__PURE__ */ t("input", {
				ref: (e) => {
					q.current = e, m(R, e);
				},
				type: "file",
				id: Y,
				name: w,
				multiple: r,
				accept: d,
				disabled: x,
				required: k,
				"aria-label": E ?? O,
				"aria-describedby": T ?? D,
				"aria-invalid": S || void 0,
				onChange: ae,
				onBlur: A,
				tabIndex: -1
			}) }),
			/* @__PURE__ */ n("div", {
				className: "file-upload__dropzone",
				onClick: ce,
				onKeyDown: le,
				onDragOver: oe,
				onDragLeave: se,
				onDrop: Q,
				role: "button",
				tabIndex: x ? -1 : 0,
				"aria-disabled": x || void 0,
				"aria-describedby": T ?? D,
				"aria-invalid": S || void 0,
				children: [
					/* @__PURE__ */ n("svg", {
						className: "file-upload__icon",
						xmlns: "http://www.w3.org/2000/svg",
						width: "24",
						height: "24",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ t("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
							/* @__PURE__ */ t("polyline", { points: "17 8 12 3 7 8" }),
							/* @__PURE__ */ t("line", {
								x1: "12",
								y1: "3",
								x2: "12",
								y2: "15"
							})
						]
					}),
					/* @__PURE__ */ t("span", {
						className: "file-upload__text",
						children: W ? ne : te
					}),
					/* @__PURE__ */ t("span", {
						className: "file-upload__text file-upload__text--secondary",
						children: re
					}),
					$.length > 0 && /* @__PURE__ */ t("span", {
						className: "file-upload__subtext",
						children: $.join(" · ")
					})
				]
			}),
			X.length > 0 && /* @__PURE__ */ t("ul", {
				className: "file-upload__list",
				"aria-label": N,
				children: X.map((e, r) => {
					let i = H.get(e), a = f(e);
					return /* @__PURE__ */ n("li", {
						className: `file-upload__item${i ? " file-upload__item--error" : ""}`,
						children: [
							/* @__PURE__ */ t("div", {
								className: "file-upload__item-thumb",
								"aria-hidden": "true",
								children: a ? /* @__PURE__ */ t("img", {
									src: a,
									alt: ""
								}) : /* @__PURE__ */ n("svg", {
									xmlns: "http://www.w3.org/2000/svg",
									width: "20",
									height: "20",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [/* @__PURE__ */ t("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ t("polyline", { points: "14 2 14 8 20 8" })]
								})
							}),
							/* @__PURE__ */ n("div", {
								className: "file-upload__item-info",
								children: [
									/* @__PURE__ */ t("span", {
										className: "file-upload__item-name",
										children: e.name
									}),
									/* @__PURE__ */ t("span", {
										className: "file-upload__item-size",
										children: l(e.size)
									}),
									i && /* @__PURE__ */ t("span", {
										className: "file-upload__item-error-msg",
										role: "alert",
										children: i
									})
								]
							}),
							/* @__PURE__ */ t("button", {
								className: "file-upload__item-remove",
								type: "button",
								onClick: () => ie(e),
								"aria-label": F(e.name),
								children: /* @__PURE__ */ n("svg", {
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
									children: [/* @__PURE__ */ t("line", {
										x1: "18",
										y1: "6",
										x2: "6",
										y2: "18"
									}), /* @__PURE__ */ t("line", {
										x1: "6",
										y1: "6",
										x2: "18",
										y2: "18"
									})]
								})
							})
						]
					}, `${e.name}-${e.size}-${r}`);
				})
			}),
			b !== void 0 && /* @__PURE__ */ t("div", {
				className: "file-upload__progress",
				role: "progressbar",
				"aria-valuenow": b,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-label": P,
				children: /* @__PURE__ */ t("div", {
					className: "file-upload__progress-bar",
					style: { "--file-upload-progress": `${b}%` }
				})
			})
		]
	});
});
//#endregion
export { h as FileUpload };
