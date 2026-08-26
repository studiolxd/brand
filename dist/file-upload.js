'use client';
import './file-upload.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { useCallback as t, useEffect as n, useId as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/atoms/FileUpload/FileUpload.tsx
function c(e) {
	return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
}
function l(e, t, n, r, i) {
	return n !== void 0 && e.size > n ? r(c(n)) : t && !t.split(",").map((e) => e.trim()).some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t.toLowerCase()) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -2)) : e.type === t) ? i : null;
}
var u = /* @__PURE__ */ new WeakMap();
function d(e) {
	if (!e.type.startsWith("image/")) return;
	let t = u.get(e);
	return t || (t = URL.createObjectURL(e), u.set(e, t)), t;
}
function f(e) {
	let t = u.get(e);
	t && (URL.revokeObjectURL(t), u.delete(e));
}
function p({ multiple: u = !1, accept: p, maxSize: m, maxFiles: h, value: g, defaultValue: _ = [], onChange: v, progress: y, disabled: b = !1, error: x = !1, id: S, name: C, describedBy: w, ariaLabel: T, dropzoneLabel: E = "Arrastra archivos aquí", dropzoneActiveLabel: D = "Suelta los archivos aquí", dropzoneHintLabel: O = "o haz clic para seleccionar", maxSizeHint: k = (e) => `máx. ${e}`, maxFilesHint: A = (e) => `hasta ${e} archivos`, filesLabel: j = "Archivos seleccionados", progressLabel: ee = "Progreso de subida", removeFileLabel: M = (e) => `Eliminar ${e}`, tooLargeError: N = (e) => `Archivo demasiado grande (máx. ${e})`, invalidTypeError: P = "Tipo de archivo no permitido" }) {
	let F = g !== void 0, [I, L] = a(_), [R, z] = a(/* @__PURE__ */ new Map()), [B, V] = a(!1), H = i(/* @__PURE__ */ new Set()), U = i(null), W = r(), G = S ?? `file-upload-${W}`, K = F ? g : I;
	n(() => {
		K.forEach((e) => H.current.add(e));
	}, [K]), n(() => {
		let e = H.current;
		return () => {
			e.forEach(f);
		};
	}, []);
	let q = t((e) => {
		if (b) return;
		let t = Array.from(e), n = F ? g ?? [] : I, r = new Map(R), i = [...n];
		for (let e of t) {
			if (h !== void 0 && i.filter((e) => !r.has(e)).length >= h) break;
			let t = l(e, p, m, N, P);
			t && r.set(e, t), i.push(e);
		}
		z(r), F || L(i), v?.(i.filter((e) => !r.has(e)));
	}, [
		b,
		p,
		m,
		h,
		F,
		g,
		I,
		R,
		v,
		N,
		P
	]), J = t((e) => {
		let t = (F ? g ?? [] : I).filter((t) => t !== e), n = new Map(R);
		n.delete(e), f(e), z(n), F || L(t), v?.(t.filter((e) => !n.has(e))), U.current && (U.current.value = "");
	}, [
		F,
		g,
		I,
		R,
		v
	]), Y = (e) => {
		e.target.files && q(e.target.files);
	}, X = (e) => {
		e.preventDefault(), b || V(!0);
	}, Z = (e) => {
		e.preventDefault(), V(!1);
	}, Q = (e) => {
		e.preventDefault(), V(!1), !b && e.dataTransfer.files && q(e.dataTransfer.files);
	}, te = () => {
		b || U.current?.click();
	}, ne = (e) => {
		!b && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), U.current?.click());
	}, re = [
		"file-upload",
		B ? "file-upload--dragging" : "",
		x ? "file-upload--error" : "",
		b ? "file-upload--disabled" : "",
		K.length > 0 ? "file-upload--has-files" : ""
	].filter(Boolean).join(" "), $ = [];
	return p && $.push(p), m && $.push(k(c(m))), u && h && $.push(A(h)), /* @__PURE__ */ s("div", {
		className: re,
		children: [
			/* @__PURE__ */ o(e, { children: /* @__PURE__ */ o("input", {
				ref: U,
				type: "file",
				id: G,
				name: C,
				multiple: u,
				accept: p,
				disabled: b,
				"aria-label": T,
				"aria-describedby": w,
				onChange: Y,
				tabIndex: -1
			}) }),
			/* @__PURE__ */ s("div", {
				className: "file-upload__dropzone",
				onClick: te,
				onKeyDown: ne,
				onDragOver: X,
				onDragLeave: Z,
				onDrop: Q,
				role: "button",
				tabIndex: b ? -1 : 0,
				"aria-disabled": b || void 0,
				children: [
					/* @__PURE__ */ s("svg", {
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
							/* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
							/* @__PURE__ */ o("polyline", { points: "17 8 12 3 7 8" }),
							/* @__PURE__ */ o("line", {
								x1: "12",
								y1: "3",
								x2: "12",
								y2: "15"
							})
						]
					}),
					/* @__PURE__ */ o("span", {
						className: "file-upload__text",
						children: B ? D : E
					}),
					/* @__PURE__ */ o("span", {
						className: "file-upload__text file-upload__text--secondary",
						children: O
					}),
					$.length > 0 && /* @__PURE__ */ o("span", {
						className: "file-upload__subtext",
						children: $.join(" · ")
					})
				]
			}),
			K.length > 0 && /* @__PURE__ */ o("ul", {
				className: "file-upload__list",
				"aria-label": j,
				children: K.map((e, t) => {
					let n = R.get(e), r = d(e);
					return /* @__PURE__ */ s("li", {
						className: `file-upload__item${n ? " file-upload__item--error" : ""}`,
						children: [
							/* @__PURE__ */ o("div", {
								className: "file-upload__item-thumb",
								"aria-hidden": "true",
								children: r ? /* @__PURE__ */ o("img", {
									src: r,
									alt: ""
								}) : /* @__PURE__ */ s("svg", {
									xmlns: "http://www.w3.org/2000/svg",
									width: "20",
									height: "20",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [/* @__PURE__ */ o("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), /* @__PURE__ */ o("polyline", { points: "14 2 14 8 20 8" })]
								})
							}),
							/* @__PURE__ */ s("div", {
								className: "file-upload__item-info",
								children: [
									/* @__PURE__ */ o("span", {
										className: "file-upload__item-name",
										children: e.name
									}),
									/* @__PURE__ */ o("span", {
										className: "file-upload__item-size",
										children: c(e.size)
									}),
									n && /* @__PURE__ */ o("span", {
										className: "file-upload__item-error-msg",
										role: "alert",
										children: n
									})
								]
							}),
							/* @__PURE__ */ o("button", {
								className: "file-upload__item-remove",
								type: "button",
								onClick: () => J(e),
								"aria-label": M(e.name),
								children: /* @__PURE__ */ s("svg", {
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
									children: [/* @__PURE__ */ o("line", {
										x1: "18",
										y1: "6",
										x2: "6",
										y2: "18"
									}), /* @__PURE__ */ o("line", {
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
			y !== void 0 && /* @__PURE__ */ o("div", {
				className: "file-upload__progress",
				role: "progressbar",
				"aria-valuenow": y,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-label": ee,
				children: /* @__PURE__ */ o("div", {
					className: "file-upload__progress-bar",
					style: { "--file-upload-progress": `${y}%` }
				})
			})
		]
	});
}
//#endregion
export { p as FileUpload };
