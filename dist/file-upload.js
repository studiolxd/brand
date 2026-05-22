'use client';
import './file-upload.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useCallback as r, useEffect as i, useId as a, useRef as o, useState as s } from "react";
//#region src/stories/atoms/FileUpload/FileUpload.tsx
function c(e) {
	return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
}
function l(e, t, n) {
	return n !== void 0 && e.size > n ? `Archivo demasiado grande (máx. ${c(n)})` : t && !t.split(",").map((e) => e.trim()).some((t) => t.startsWith(".") ? e.name.toLowerCase().endsWith(t.toLowerCase()) : t.endsWith("/*") ? e.type.startsWith(t.slice(0, -2)) : e.type === t) ? "Tipo de archivo no permitido" : null;
}
function u({ multiple: u = !1, accept: d, maxSize: f, maxFiles: p, value: m, defaultValue: h = [], onChange: g, progress: _, disabled: v = !1, error: y = !1, id: b, name: x, describedBy: S, ariaLabel: C }) {
	let w = m !== void 0, [T, E] = s(h), [D, O] = s(/* @__PURE__ */ new Map()), [k, A] = s(!1), j = o(/* @__PURE__ */ new Map()), [M, N] = s(/* @__PURE__ */ new Map()), P = o(null), F = a(), I = b ?? `file-upload-${F}`, L = w ? m : T;
	i(() => {
		let e = j.current, t = /* @__PURE__ */ new Map();
		L.forEach((n) => {
			n.type.startsWith("image/") && t.set(n, e.get(n) ?? URL.createObjectURL(n));
		}), e.forEach((e, n) => {
			t.has(n) || URL.revokeObjectURL(e);
		}), j.current = t, N(new Map(t));
	}, [L]), i(() => () => {
		j.current.forEach((e) => URL.revokeObjectURL(e));
	}, []);
	let R = r((e) => {
		if (v) return;
		let t = Array.from(e), n = w ? m ?? [] : T, r = new Map(D), i = [...n];
		for (let e of t) {
			if (p !== void 0 && i.filter((e) => !r.has(e)).length >= p) break;
			let t = l(e, d, f);
			t && r.set(e, t), i.push(e);
		}
		O(r), w || E(i), g?.(i.filter((e) => !r.has(e)));
	}, [
		v,
		d,
		f,
		p,
		w,
		m,
		T,
		D,
		g
	]), z = r((e) => {
		let t = (w ? m ?? [] : T).filter((t) => t !== e), n = new Map(D);
		n.delete(e), O(n), w || E(t), g?.(t.filter((e) => !n.has(e))), P.current && (P.current.value = "");
	}, [
		w,
		m,
		T,
		D,
		g
	]), B = (e) => {
		e.target.files && R(e.target.files);
	}, V = (e) => {
		e.preventDefault(), v || A(!0);
	}, H = (e) => {
		e.preventDefault(), A(!1);
	}, U = (e) => {
		e.preventDefault(), A(!1), !v && e.dataTransfer.files && R(e.dataTransfer.files);
	}, W = () => {
		v || P.current?.click();
	}, G = (e) => {
		!v && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), P.current?.click());
	}, K = [
		"file-upload",
		k ? "file-upload--dragging" : "",
		y ? "file-upload--error" : "",
		v ? "file-upload--disabled" : "",
		L.length > 0 ? "file-upload--has-files" : ""
	].filter(Boolean).join(" "), q = [];
	return d && q.push(d), f && q.push(`máx. ${c(f)}`), u && p && q.push(`hasta ${p} archivos`), /* @__PURE__ */ n("div", {
		className: K,
		children: [
			/* @__PURE__ */ t(e, { children: /* @__PURE__ */ t("input", {
				ref: P,
				type: "file",
				id: I,
				name: x,
				multiple: u,
				accept: d,
				disabled: v,
				"aria-label": C,
				"aria-describedby": S,
				onChange: B,
				tabIndex: -1
			}) }),
			/* @__PURE__ */ n("div", {
				className: "file-upload__dropzone",
				onClick: W,
				onKeyDown: G,
				onDragOver: V,
				onDragLeave: H,
				onDrop: U,
				role: "button",
				tabIndex: v ? -1 : 0,
				"aria-disabled": v || void 0,
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
						children: k ? "Suelta los archivos aquí" : "Arrastra archivos aquí"
					}),
					/* @__PURE__ */ t("span", {
						className: "file-upload__text file-upload__text--secondary",
						children: "o haz clic para seleccionar"
					}),
					q.length > 0 && /* @__PURE__ */ t("span", {
						className: "file-upload__subtext",
						children: q.join(" · ")
					})
				]
			}),
			L.length > 0 && /* @__PURE__ */ t("ul", {
				className: "file-upload__list",
				"aria-label": "Archivos seleccionados",
				children: L.map((e, r) => {
					let i = D.get(e), a = M.get(e);
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
										children: c(e.size)
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
								onClick: () => z(e),
								"aria-label": `Eliminar ${e.name}`,
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
			_ !== void 0 && /* @__PURE__ */ t("div", {
				className: "file-upload__progress",
				role: "progressbar",
				"aria-valuenow": _,
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-label": "Progreso de subida",
				children: /* @__PURE__ */ t("div", {
					className: "file-upload__progress-bar",
					style: { "--file-upload-progress": `${_}%` }
				})
			})
		]
	});
}
//#endregion
export { u as FileUpload };
