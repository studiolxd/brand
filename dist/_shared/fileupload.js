import '../fileupload.css';
import { n as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { VisuallyHidden as n } from "../visually-hidden.js";
import { Spinner as r } from "../spinner.js";
import { n as i } from "./form-size.js";
import { t as ee } from "./assign-ref.js";
import { t as te } from "./progressbar.js";
import { i as ne, n as a, t as re } from "./validate.js";
import { forwardRef as o, useCallback as s, useEffect as c, useId as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/stories/messages/es/fileUpload.ts
var ie = {
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
function ae(e) {
	if (!e.type.startsWith("image/")) return;
	let t = h.get(e);
	return t || (t = URL.createObjectURL(e), h.set(e, t)), t;
}
function g(e) {
	let t = h.get(e);
	t && (URL.revokeObjectURL(t), h.delete(e));
}
var _ = o(function({ multiple: o = !1, accept: h, maxSize: _, maxFiles: v, value: y, defaultValue: b = [], onChange: x, progress: S, uploading: C = !1, uploadingLabel: oe, uploadingLabelVisible: se = !1, disabled: w = !1, error: T = !1, id: ce, name: le, describedBy: ue, ariaLabel: de, "aria-describedby": fe, "aria-label": pe, required: me, onBlur: he, className: ge, locale: E = re, dropzoneLabel: _e, dropzoneActiveLabel: ve, dropzoneHintLabel: ye, maxSizeHint: be, maxFilesHint: xe, filesLabel: D, progressLabel: O, removeFileLabel: k, tooLargeError: A, invalidTypeError: j, size: M }, Se) {
	let N = e("fileUpload", ie), P = i(M), F = P === "sm" ? "sm" : P === "lg" ? "lg" : "md", I = y !== void 0, [L, R] = d(b), [z, B] = d(/* @__PURE__ */ new Map()), [V, H] = d(!1), U = u(/* @__PURE__ */ new Set()), W = u(null), Ce = l(), G = ce ?? `file-upload-${Ce}`, K = I ? y : L;
	c(() => {
		K.forEach((e) => U.current.add(e));
	}, [K]), c(() => {
		let e = U.current;
		return () => {
			e.forEach(g);
		};
	}, []);
	let q = s((e) => {
		if (w || C) return;
		let t = Array.from(e), n = I ? y ?? [] : L, r = new Map(z), i = [...n];
		for (let e of t) {
			if (v !== void 0 && i.filter((e) => !r.has(e)).length >= v) break;
			let t = ne(e, h, _, N("tooLarge", A), N("invalidType", j), E);
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
		A,
		j,
		E
	]), we = s((e) => {
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
	]), Te = (e) => {
		e.target.files && q(e.target.files);
	}, Ee = (e) => {
		e.preventDefault(), !w && !C && H(!0);
	}, De = (e) => {
		e.preventDefault(), H(!1);
	}, Oe = (e) => {
		e.preventDefault(), H(!1), !w && !C && e.dataTransfer.files && q(e.dataTransfer.files);
	}, J = () => {
		!w && !C && W.current?.click();
	}, ke = [
		"file-upload",
		P === "md" ? "" : `file-upload--${P}`,
		V ? "file-upload--dragging" : "",
		T ? "file-upload--error" : "",
		w ? "file-upload--disabled" : "",
		C ? "file-upload--uploading" : "",
		K.length > 0 ? "file-upload--has-files" : "",
		ge ?? ""
	].filter(Boolean).join(" "), Y = `${G}-hint`, Ae = [ue ?? fe, Y].filter(Boolean).join(" "), X = N("dropzone", _e), Z = N("dropzoneHint", ye), Q = C ? N("uploading", oe) : "", je = C && se, $ = [];
	return h && $.push(h), _ && $.push(N("maxSize", be)(a(_, E))), o && v && $.push(N("maxFiles", xe)(v)), /* @__PURE__ */ m("div", {
		className: ke,
		children: [
			/* @__PURE__ */ p(n, { children: /* @__PURE__ */ p("input", {
				ref: (e) => {
					W.current = e, ee(Se, e);
				},
				type: "file",
				id: G,
				name: le,
				multiple: o,
				accept: h,
				disabled: w,
				required: me,
				"aria-label": de ?? pe,
				"aria-describedby": Ae,
				"aria-invalid": T || void 0,
				"aria-busy": C || void 0,
				"aria-disabled": C || void 0,
				onClick: C ? (e) => e.preventDefault() : void 0,
				onChange: Te,
				onBlur: he
			}) }),
			/* @__PURE__ */ p("div", {
				className: "file-upload__dropzone",
				onClick: J,
				onDragOver: Ee,
				onDragLeave: De,
				onDrop: Oe,
				"aria-hidden": "true",
				children: C ? /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("span", {
					className: "file-upload__icon",
					children: /* @__PURE__ */ p(r, {
						size: F,
						"aria-hidden": !0
					})
				}), je && /* @__PURE__ */ p("span", {
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
			/* @__PURE__ */ p(n, {
				id: Y,
				children: [
					X,
					Z,
					...$
				].join(". ")
			}),
			C && /* @__PURE__ */ p(n, {
				role: "status",
				"aria-live": "polite",
				"aria-atomic": "false",
				children: Q
			}),
			K.length > 0 && /* @__PURE__ */ p("ul", {
				className: "file-upload__list",
				"aria-label": N("files", D),
				children: K.map((e, n) => {
					let r = z.get(e), i = ae(e);
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
										children: a(e.size, E)
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
								onClick: () => we(e),
								"aria-disabled": C || void 0,
								"aria-label": N("removeFile", k)(e.name),
								children: /* @__PURE__ */ p(t, {
									name: "close",
									size: "sm"
								})
							})
						]
					}, `${e.name}-${e.size}-${n}`);
				})
			}),
			S !== void 0 && /* @__PURE__ */ p(te, {
				value: S,
				label: N("progress", O),
				size: "sm",
				className: "file-upload__progress"
			})
		]
	});
});
//#endregion
export { _ as t };
