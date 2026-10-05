'use client';
import './file-upload.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Spinner as r } from "./spinner.js";
import { n as i } from "./_shared/form-size.js";
import { t as ee } from "./_shared/progressbar.js";
import { i as te, n as a, t as o } from "./_shared/validate.js";
import { forwardRef as s, useCallback as c, useEffect as l, useId as ne, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/stories/atoms/FileUpload/FileUpload.tsx
var h = /* @__PURE__ */ new WeakMap();
function g(e) {
	if (!e.type.startsWith("image/")) return;
	let t = h.get(e);
	return t || (t = URL.createObjectURL(e), h.set(e, t)), t;
}
function _(e) {
	let t = h.get(e);
	t && (URL.revokeObjectURL(t), h.delete(e));
}
function re(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var v = s(function({ multiple: s = !1, accept: h, maxSize: v, maxFiles: y, value: b, defaultValue: ie = [], onChange: x, progress: S, uploading: C = !1, uploadingLabel: w, uploadingLabelVisible: ae = !1, disabled: T = !1, error: E = !1, id: oe, name: se, describedBy: ce, ariaLabel: le, "aria-describedby": ue, "aria-label": de, required: fe, onBlur: pe, className: me, locale: D = o, dropzoneLabel: he, dropzoneActiveLabel: ge, dropzoneHintLabel: _e, maxSizeHint: ve, maxFilesHint: ye, filesLabel: be, progressLabel: xe, removeFileLabel: O, tooLargeError: k, invalidTypeError: A, size: j }, M) {
	let N = e("fileUpload"), Se = e("spinner"), P = i(j), F = P === "sm" ? "sm" : P === "lg" ? "lg" : "md", I = b !== void 0, [L, R] = d(ie), [z, B] = d(/* @__PURE__ */ new Map()), [V, H] = d(!1), U = u(/* @__PURE__ */ new Set()), W = u(null), Ce = ne(), G = oe ?? `file-upload-${Ce}`, K = I ? b : L;
	l(() => {
		K.forEach((e) => U.current.add(e));
	}, [K]), l(() => {
		let e = U.current;
		return () => {
			e.forEach(_);
		};
	}, []);
	let q = c((e) => {
		if (T || C) return;
		let t = Array.from(e), n = I ? b ?? [] : L, r = new Map(z), i = [...n];
		for (let e of t) {
			if (y !== void 0 && i.filter((e) => !r.has(e)).length >= y) break;
			let t = te(e, h, v, N("tooLarge", k), N("invalidType", A), D);
			t && r.set(e, t), i.push(e);
		}
		B(r), I || R(i), x?.(i.filter((e) => !r.has(e)));
	}, [
		T,
		C,
		h,
		v,
		y,
		I,
		b,
		L,
		z,
		x,
		N,
		k,
		A,
		D
	]), we = c((e) => {
		if (C) return;
		let t = (I ? b ?? [] : L).filter((t) => t !== e), n = new Map(z);
		n.delete(e), _(e), B(n), I || R(t), x?.(t.filter((e) => !n.has(e))), W.current && (W.current.value = "");
	}, [
		C,
		I,
		b,
		L,
		z,
		x
	]), Te = (e) => {
		e.target.files && q(e.target.files);
	}, Ee = (e) => {
		e.preventDefault(), !T && !C && H(!0);
	}, De = (e) => {
		e.preventDefault(), H(!1);
	}, Oe = (e) => {
		e.preventDefault(), H(!1), !T && !C && e.dataTransfer.files && q(e.dataTransfer.files);
	}, J = () => {
		!T && !C && W.current?.click();
	}, ke = [
		"file-upload",
		P === "md" ? "" : `file-upload--${P}`,
		V ? "file-upload--dragging" : "",
		E ? "file-upload--error" : "",
		T ? "file-upload--disabled" : "",
		C ? "file-upload--uploading" : "",
		K.length > 0 ? "file-upload--has-files" : "",
		me ?? ""
	].filter(Boolean).join(" "), Y = `${G}-hint`, Ae = [ce ?? ue, Y].filter(Boolean).join(" "), X = N("dropzone", he), Z = N("dropzoneHint", _e), Q = C ? Se("label", w) : "", je = C && ae && !!w, $ = [];
	return h && $.push(h), v && $.push(N("maxSize", ve)(a(v, D))), s && y && $.push(N("maxFiles", ye)(y)), /* @__PURE__ */ m("div", {
		className: ke,
		children: [
			/* @__PURE__ */ p(n, { children: /* @__PURE__ */ p("input", {
				ref: (e) => {
					W.current = e, re(M, e);
				},
				type: "file",
				id: G,
				name: se,
				multiple: s,
				accept: h,
				disabled: T,
				required: fe,
				"aria-label": le ?? de,
				"aria-describedby": Ae,
				"aria-invalid": E || void 0,
				"aria-busy": C || void 0,
				"aria-disabled": C || void 0,
				onClick: C ? (e) => e.preventDefault() : void 0,
				onChange: Te,
				onBlur: pe
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
						children: V ? N("dropzoneActive", ge) : X
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
				"aria-label": N("files", be),
				children: K.map((e, n) => {
					let r = z.get(e), i = g(e);
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
								onClick: () => we(e),
								"aria-disabled": C || void 0,
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
			S !== void 0 && /* @__PURE__ */ p(ee, {
				value: S,
				label: N("progress", xe),
				size: "sm",
				className: "file-upload__progress"
			})
		]
	});
});
//#endregion
export { v as FileUpload };
