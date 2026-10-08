import '../fileupload.css';
import { n as e } from "./env.js";
import { r as t } from "./brandmessagescontext.js";
import { Icon as n } from "../icon.js";
import { VisuallyHidden as r } from "../visually-hidden.js";
import { Spinner as i } from "../spinner.js";
import { n as ee } from "./form-size.js";
import { t as te } from "./assign-ref.js";
import { ProgressBar as a } from "../progress-bar.js";
import { i as ne, n as o, t as re } from "./validate.js";
import { forwardRef as s, useCallback as c, useEffect as l, useId as ie, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/stories/messages/es/fileUpload.ts
var ae = {
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
}, h = /* @__PURE__ */ new WeakMap();
function oe(e) {
	if (!e.type.startsWith("image/")) return;
	let t = h.get(e);
	return t || (t = URL.createObjectURL(e), h.set(e, t)), t;
}
function g(e) {
	let t = h.get(e);
	t && (URL.revokeObjectURL(t), h.delete(e));
}
var _ = s(function({ multiple: s = !1, accept: h, maxSize: _, maxFiles: v, value: y, defaultValue: b = [], onChange: x, progress: S, uploading: C = !1, uploadingLabel: se, uploadingLabelVisible: ce = !1, disabled: w = !1, error: T = !1, id: le, name: ue, describedBy: de, ariaLabel: E, "aria-describedby": fe, "aria-label": pe, required: me, onBlur: he, className: ge, locale: D = re, dropzoneLabel: _e, dropzoneActiveLabel: ve, dropzoneHintLabel: ye, maxSizeHint: be, maxFilesHint: xe, filesLabel: O, progressLabel: k, removeFileLabel: A, tooLargeError: j, invalidTypeError: M, size: Se }, Ce) {
	E !== void 0 && e("FileUpload", "ariaLabel", "`aria-label`");
	let N = t("fileUpload", ae), P = ee(Se), F = P === "sm" ? "sm" : P === "lg" ? "lg" : "md", I = y !== void 0, [L, R] = d(b), [z, B] = d(/* @__PURE__ */ new Map()), [V, H] = d(!1), U = u(/* @__PURE__ */ new Set()), W = u(null), we = ie(), G = le ?? `file-upload-${we}`, K = I ? y : L;
	l(() => {
		K.forEach((e) => U.current.add(e));
	}, [K]), l(() => {
		let e = U.current;
		return () => {
			e.forEach(g);
		};
	}, []);
	let q = c((e) => {
		if (w || C) return;
		let t = Array.from(e), n = I ? y ?? [] : L, r = new Map(z), i = [...n];
		for (let e of t) {
			if (v !== void 0 && i.filter((e) => !r.has(e)).length >= v) break;
			let t = ne(e, h, _, N("tooLarge", j), N("invalidType", M), D);
			t && r.set(e, t), i.push(e);
		}
		B(r), I || R(i), x?.(i.filter((e) => !r.has(e)));
	}, [
		w,
		C,
		h,
		_,
		v,
		I,
		y,
		L,
		z,
		x,
		N,
		j,
		M,
		D
	]), Te = c((e) => {
		if (C) return;
		let t = (I ? y ?? [] : L).filter((t) => t !== e), n = new Map(z);
		n.delete(e), g(e), B(n), I || R(t), x?.(t.filter((e) => !n.has(e))), W.current && (W.current.value = "");
	}, [
		C,
		I,
		y,
		L,
		z,
		x
	]), Ee = (e) => {
		e.target.files && q(e.target.files);
	}, De = (e) => {
		e.preventDefault(), !w && !C && H(!0);
	}, Oe = (e) => {
		e.preventDefault(), H(!1);
	}, J = (e) => {
		e.preventDefault(), H(!1), !w && !C && e.dataTransfer.files && q(e.dataTransfer.files);
	}, ke = () => {
		!w && !C && W.current?.click();
	}, Ae = [
		"file-upload",
		P === "md" ? "" : `file-upload--${P}`,
		V ? "file-upload--dragging" : "",
		T ? "file-upload--error" : "",
		w ? "file-upload--disabled" : "",
		C ? "file-upload--uploading" : "",
		K.length > 0 ? "file-upload--has-files" : "",
		ge ?? ""
	].filter(Boolean).join(" "), Y = `${G}-hint`, je = [de ?? fe, Y].filter(Boolean).join(" "), X = N("dropzone", _e), Z = N("dropzoneHint", ye), Q = C ? N("uploading", se) : "", Me = C && ce, $ = [];
	return h && $.push(h), _ && $.push(N("maxSize", be)(o(_, D))), s && v && $.push(N("maxFiles", xe)(v)), /* @__PURE__ */ m("div", {
		className: Ae,
		children: [
			/* @__PURE__ */ p(r, { children: /* @__PURE__ */ p("input", {
				ref: (e) => {
					W.current = e, te(Ce, e);
				},
				type: "file",
				id: G,
				name: ue,
				multiple: s,
				accept: h,
				disabled: w,
				required: me,
				"aria-label": pe ?? E,
				"aria-describedby": je,
				"aria-invalid": T || void 0,
				"aria-busy": C || void 0,
				"aria-disabled": C || void 0,
				onClick: C ? (e) => e.preventDefault() : void 0,
				onChange: Ee,
				onBlur: he
			}) }),
			/* @__PURE__ */ p("div", {
				className: "file-upload__dropzone",
				onClick: ke,
				onDragOver: De,
				onDragLeave: Oe,
				onDrop: J,
				"aria-hidden": "true",
				children: C ? /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("span", {
					className: "file-upload__icon",
					children: /* @__PURE__ */ p(i, {
						size: F,
						"aria-hidden": !0
					})
				}), Me && /* @__PURE__ */ p("span", {
					className: "file-upload__text",
					children: Q
				})] }) : /* @__PURE__ */ m(f, { children: [
					/* @__PURE__ */ p(n, {
						name: "upload",
						size: F,
						className: "file-upload__icon"
					}),
					/* @__PURE__ */ p("span", {
						className: "file-upload__text",
						children: V ? N("dropzoneActive", ve) : X
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
			/* @__PURE__ */ p(r, {
				id: Y,
				children: [
					X,
					Z,
					...$
				].join(". ")
			}),
			C && /* @__PURE__ */ p(r, {
				role: "status",
				"aria-live": "polite",
				"aria-atomic": "false",
				children: Q
			}),
			K.length > 0 && /* @__PURE__ */ p("ul", {
				className: "file-upload__list",
				"aria-label": N("files", O),
				children: K.map((e, t) => {
					let r = z.get(e), i = oe(e);
					return /* @__PURE__ */ m("li", {
						className: `file-upload__item${r ? " file-upload__item--error" : ""}`,
						children: [
							/* @__PURE__ */ p("div", {
								className: "file-upload__item-thumb",
								"aria-hidden": "true",
								children: i ? /* @__PURE__ */ p("img", {
									src: i,
									alt: ""
								}) : /* @__PURE__ */ p(n, {
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
										children: o(e.size, D)
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
								onClick: () => Te(e),
								"aria-disabled": C || void 0,
								"aria-label": N("removeFile", A)(e.name),
								children: /* @__PURE__ */ p(n, {
									name: "close",
									size: "sm"
								})
							})
						]
					}, `${e.name}-${e.size}-${t}`);
				})
			}),
			S !== void 0 && /* @__PURE__ */ p(a, {
				value: S,
				label: N("progress", k),
				size: "sm",
				className: "file-upload__progress"
			})
		]
	});
});
//#endregion
export { _ as t };
