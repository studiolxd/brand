import '../fileupload.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { VisuallyHidden as n } from "../visually-hidden.js";
import { Spinner as r } from "../spinner.js";
import { n as i } from "./form-size.js";
import { t as ee } from "./assign-ref.js";
import { ProgressBar as te } from "../progress-bar.js";
import { i as ne, n as a, t as re } from "./validate.js";
import { forwardRef as o, useCallback as s, useEffect as c, useId as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/stories/messages/es/fileUpload.ts
var h = {
	dropzone: "Arrastra archivos aquí",
	dropzoneActive: "Suelta los archivos aquí",
	dropzoneHint: "o haz clic para seleccionar",
	maxSize: (e) => `máx. ${e}`,
	maxFiles: (e) => `hasta ${e} archivos`,
	files: "Archivos seleccionados",
	progress: "Progreso de subida",
	removeFile: (e) => `Eliminar ${e}`,
	tooLarge: (e) => `Archivo demasiado grande (máx. ${e})`,
	invalidType: "Tipo de archivo no permitido",
	uploading: "Subiendo…"
}, g = /* @__PURE__ */ new WeakMap();
function ie(e) {
	if (!e.type.startsWith("image/")) return;
	let t = g.get(e);
	return t || (t = URL.createObjectURL(e), g.set(e, t)), t;
}
function _(e) {
	let t = g.get(e);
	t && (URL.revokeObjectURL(t), g.delete(e));
}
var v = o(function({ multiple: o = !1, accept: g, maxSize: v, maxFiles: y, value: b, defaultValue: x = [], onChange: S, progress: C, uploading: w = !1, uploadingLabel: ae, uploadingLabelVisible: oe = !1, disabled: T = !1, error: E = !1, id: se, name: ce, "aria-describedby": le, "aria-label": ue, required: de, onBlur: fe, className: pe, locale: D = re, dropzoneLabel: me, dropzoneActiveLabel: he, dropzoneHintLabel: ge, maxSizeHint: _e, maxFilesHint: ve, filesLabel: ye, progressLabel: be, removeFileLabel: O, tooLargeError: k, invalidTypeError: A, size: j }, M) {
	let N = e("fileUpload", h), P = i(j), F = P === "sm" ? "sm" : P === "lg" ? "lg" : "md", I = b !== void 0, [L, R] = d(x), [z, B] = d(/* @__PURE__ */ new Map()), [V, H] = d(!1), U = u(/* @__PURE__ */ new Set()), W = u(null), xe = l(), G = se ?? `file-upload-${xe}`, K = I ? b : L;
	c(() => {
		K.forEach((e) => U.current.add(e));
	}, [K]), c(() => {
		let e = U.current;
		return () => {
			e.forEach(_);
		};
	}, []);
	let q = s((e) => {
		if (T || w) return;
		let t = Array.from(e), n = I ? b ?? [] : L, r = new Map(z), i = [...n];
		for (let e of t) {
			if (y !== void 0 && i.filter((e) => !r.has(e)).length >= y) break;
			let t = ne(e, g, v, N("tooLarge", k), N("invalidType", A), D);
			t && r.set(e, t), i.push(e);
		}
		B(r), I || R(i), S?.(i.filter((e) => !r.has(e)));
	}, [
		T,
		w,
		g,
		v,
		y,
		I,
		b,
		L,
		z,
		S,
		N,
		k,
		A,
		D
	]), Se = s((e) => {
		if (w) return;
		let t = (I ? b ?? [] : L).filter((t) => t !== e), n = new Map(z);
		n.delete(e), _(e), B(n), I || R(t), S?.(t.filter((e) => !n.has(e))), W.current && (W.current.value = "");
	}, [
		w,
		I,
		b,
		L,
		z,
		S
	]), Ce = (e) => {
		e.target.files && q(e.target.files);
	}, we = (e) => {
		e.preventDefault(), !T && !w && H(!0);
	}, Te = (e) => {
		e.preventDefault(), H(!1);
	}, J = (e) => {
		e.preventDefault(), H(!1), !T && !w && e.dataTransfer.files && q(e.dataTransfer.files);
	}, Ee = () => {
		!T && !w && W.current?.click();
	}, De = [
		"file-upload",
		P === "md" ? "" : `file-upload--${P}`,
		V ? "file-upload--dragging" : "",
		E ? "file-upload--error" : "",
		T ? "file-upload--disabled" : "",
		w ? "file-upload--uploading" : "",
		K.length > 0 ? "file-upload--has-files" : "",
		pe ?? ""
	].filter(Boolean).join(" "), Y = `${G}-hint`, Oe = [le, Y].filter(Boolean).join(" "), X = N("dropzone", me), Z = N("dropzoneHint", ge), Q = w ? N("uploading", ae) : "", ke = w && oe, $ = [];
	return g && $.push(g), v && $.push(N("maxSize", _e)(a(v, D))), o && y && $.push(N("maxFiles", ve)(y)), /* @__PURE__ */ m("div", {
		className: De,
		children: [
			/* @__PURE__ */ p(n, { children: /* @__PURE__ */ p("input", {
				ref: (e) => {
					W.current = e, ee(M, e);
				},
				type: "file",
				id: G,
				name: ce,
				multiple: o,
				accept: g,
				disabled: T,
				required: de,
				"aria-label": ue,
				"aria-describedby": Oe,
				"aria-invalid": E || void 0,
				"aria-busy": w || void 0,
				"aria-disabled": w || void 0,
				onClick: w ? (e) => e.preventDefault() : void 0,
				onChange: Ce,
				onBlur: fe
			}) }),
			/* @__PURE__ */ p("div", {
				className: "file-upload__dropzone",
				onClick: Ee,
				onDragOver: we,
				onDragLeave: Te,
				onDrop: J,
				"aria-hidden": "true",
				children: w ? /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("span", {
					className: "file-upload__icon",
					children: /* @__PURE__ */ p(r, {
						size: F,
						"aria-hidden": !0
					})
				}), ke && /* @__PURE__ */ p("span", {
					className: "file-upload__text",
					children: Q
				})] }) : /* @__PURE__ */ m(f, { children: [
					/* @__PURE__ */ p(t, {
						name: "upload",
						size: F,
						className: "file-upload__icon"
					}),
					/* @__PURE__ */ p("span", {
						className: "file-upload__text",
						children: V ? N("dropzoneActive", he) : X
					}),
					/* @__PURE__ */ p("span", {
						className: "file-upload__text file-upload__text--secondary",
						children: Z
					}),
					$.length > 0 && /* @__PURE__ */ p("span", {
						className: "file-upload__subtext",
						children: $.join(" · ")
					})
				] })
			}),
			/* @__PURE__ */ p(n, {
				id: Y,
				children: [
					X,
					Z,
					...$
				].join(". ")
			}),
			w && /* @__PURE__ */ p(n, {
				role: "status",
				"aria-live": "polite",
				"aria-atomic": "false",
				children: Q
			}),
			K.length > 0 && /* @__PURE__ */ p("ul", {
				className: "file-upload__list",
				"aria-label": N("files", ye),
				children: K.map((e, n) => {
					let r = z.get(e), i = ie(e);
					return /* @__PURE__ */ m("li", {
						className: `file-upload__item${r ? " file-upload__item--error" : ""}`,
						children: [
							/* @__PURE__ */ p("div", {
								className: "file-upload__item-thumb",
								"aria-hidden": "true",
								children: i ? /* @__PURE__ */ p("img", {
									src: i,
									alt: ""
								}) : /* @__PURE__ */ p(t, {
									name: "file-text",
									size: "sm"
								})
							}),
							/* @__PURE__ */ m("div", {
								className: "file-upload__item-info",
								children: [
									/* @__PURE__ */ p("span", {
										className: "file-upload__item-name",
										children: e.name
									}),
									/* @__PURE__ */ p("span", {
										className: "file-upload__item-size",
										children: a(e.size, D)
									}),
									r && /* @__PURE__ */ p("span", {
										className: "file-upload__item-error-msg",
										role: "alert",
										children: r
									})
								]
							}),
							/* @__PURE__ */ p("button", {
								className: "file-upload__item-remove",
								type: "button",
								onClick: () => Se(e),
								"aria-disabled": w || void 0,
								"aria-label": N("removeFile", O)(e.name),
								children: /* @__PURE__ */ p(t, {
									name: "close",
									size: "sm"
								})
							})
						]
					}, `${e.name}-${e.size}-${n}`);
				})
			}),
			C !== void 0 && /* @__PURE__ */ p(te, {
				value: C,
				label: N("progress", be),
				size: "sm",
				className: "file-upload__progress"
			})
		]
	});
});
//#endregion
export { v as t };
