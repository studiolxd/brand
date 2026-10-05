'use client';
import './file-upload.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { Spinner as r } from "./spinner.js";
import { n as i } from "./_shared/form-size.js";
import { t as ee } from "./_shared/progressbar.js";
import { i as te, n as a, t as ne } from "./_shared/validate.js";
import { forwardRef as o, useCallback as s, useEffect as c, useId as re, useRef as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/stories/atoms/FileUpload/FileUpload.tsx
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
function ie(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var _ = o(function({ multiple: o = !1, accept: m, maxSize: _, maxFiles: v, value: y, defaultValue: b = [], onChange: x, progress: S, uploading: C = !1, uploadingLabel: ae, uploadingLabelVisible: oe = !1, disabled: w = !1, error: T = !1, id: se, name: ce, describedBy: le, ariaLabel: ue, "aria-describedby": de, "aria-label": fe, required: pe, onBlur: me, className: he, locale: E = ne, dropzoneLabel: ge, dropzoneActiveLabel: _e, dropzoneHintLabel: ve, maxSizeHint: ye, maxFilesHint: be, filesLabel: xe, progressLabel: D, removeFileLabel: O, tooLargeError: k, invalidTypeError: A, size: j }, M) {
	let N = e("fileUpload"), P = i(j), F = P === "sm" ? "sm" : P === "lg" ? "lg" : "md", I = y !== void 0, [L, R] = u(b), [z, B] = u(/* @__PURE__ */ new Map()), [V, H] = u(!1), U = l(/* @__PURE__ */ new Set()), W = l(null), Se = re(), G = se ?? `file-upload-${Se}`, K = I ? y : L;
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
			let t = te(e, m, _, N("tooLarge", k), N("invalidType", A), E);
			t && r.set(e, t), i.push(e);
		}
		B(r), I || R(i), x?.(i.filter((e) => !r.has(e)));
	}, [
		w,
		C,
		m,
		_,
		v,
		I,
		y,
		L,
		z,
		x,
		N,
		k,
		A,
		E
	]), Ce = s((e) => {
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
	]), we = (e) => {
		e.target.files && q(e.target.files);
	}, Te = (e) => {
		e.preventDefault(), !w && !C && H(!0);
	}, Ee = (e) => {
		e.preventDefault(), H(!1);
	}, De = (e) => {
		e.preventDefault(), H(!1), !w && !C && e.dataTransfer.files && q(e.dataTransfer.files);
	}, Oe = () => {
		!w && !C && W.current?.click();
	}, J = [
		"file-upload",
		P === "md" ? "" : `file-upload--${P}`,
		V ? "file-upload--dragging" : "",
		T ? "file-upload--error" : "",
		w ? "file-upload--disabled" : "",
		C ? "file-upload--uploading" : "",
		K.length > 0 ? "file-upload--has-files" : "",
		he ?? ""
	].filter(Boolean).join(" "), Y = `${G}-hint`, ke = [le ?? de, Y].filter(Boolean).join(" "), X = N("dropzone", ge), Z = N("dropzoneHint", ve), Q = C ? N("uploading", ae) : "", Ae = C && oe, $ = [];
	return m && $.push(m), _ && $.push(N("maxSize", ye)(a(_, E))), o && v && $.push(N("maxFiles", be)(v)), /* @__PURE__ */ p("div", {
		className: J,
		children: [
			/* @__PURE__ */ f(n, { children: /* @__PURE__ */ f("input", {
				ref: (e) => {
					W.current = e, ie(M, e);
				},
				type: "file",
				id: G,
				name: ce,
				multiple: o,
				accept: m,
				disabled: w,
				required: pe,
				"aria-label": ue ?? fe,
				"aria-describedby": ke,
				"aria-invalid": T || void 0,
				"aria-busy": C || void 0,
				"aria-disabled": C || void 0,
				onClick: C ? (e) => e.preventDefault() : void 0,
				onChange: we,
				onBlur: me
			}) }),
			/* @__PURE__ */ f("div", {
				className: "file-upload__dropzone",
				onClick: Oe,
				onDragOver: Te,
				onDragLeave: Ee,
				onDrop: De,
				"aria-hidden": "true",
				children: C ? /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f("span", {
					className: "file-upload__icon",
					children: /* @__PURE__ */ f(r, {
						size: F,
						"aria-hidden": !0
					})
				}), Ae && /* @__PURE__ */ f("span", {
					className: "file-upload__text",
					children: Q
				})] }) : /* @__PURE__ */ p(d, { children: [
					/* @__PURE__ */ f(t, {
						name: "upload",
						size: F,
						className: "file-upload__icon"
					}),
					/* @__PURE__ */ f("span", {
						className: "file-upload__text",
						children: V ? N("dropzoneActive", _e) : X
					}),
					/* @__PURE__ */ f("span", {
						className: "file-upload__text file-upload__text--secondary",
						children: Z
					}),
					$.length > 0 && /* @__PURE__ */ f("span", {
						className: "file-upload__subtext",
						children: $.join(" · ")
					})
				] })
			}),
			/* @__PURE__ */ f(n, {
				id: Y,
				children: [
					X,
					Z,
					...$
				].join(". ")
			}),
			C && /* @__PURE__ */ f(n, {
				role: "status",
				"aria-live": "polite",
				"aria-atomic": "false",
				children: Q
			}),
			K.length > 0 && /* @__PURE__ */ f("ul", {
				className: "file-upload__list",
				"aria-label": N("files", xe),
				children: K.map((e, n) => {
					let r = z.get(e), i = h(e);
					return /* @__PURE__ */ p("li", {
						className: `file-upload__item${r ? " file-upload__item--error" : ""}`,
						children: [
							/* @__PURE__ */ f("div", {
								className: "file-upload__item-thumb",
								"aria-hidden": "true",
								children: i ? /* @__PURE__ */ f("img", {
									src: i,
									alt: ""
								}) : /* @__PURE__ */ f(t, {
									name: "file-text",
									size: "sm"
								})
							}),
							/* @__PURE__ */ p("div", {
								className: "file-upload__item-info",
								children: [
									/* @__PURE__ */ f("span", {
										className: "file-upload__item-name",
										children: e.name
									}),
									/* @__PURE__ */ f("span", {
										className: "file-upload__item-size",
										children: a(e.size, E)
									}),
									r && /* @__PURE__ */ f("span", {
										className: "file-upload__item-error-msg",
										role: "alert",
										children: r
									})
								]
							}),
							/* @__PURE__ */ f("button", {
								className: "file-upload__item-remove",
								type: "button",
								onClick: () => Ce(e),
								"aria-disabled": C || void 0,
								"aria-label": N("removeFile", O)(e.name),
								children: /* @__PURE__ */ f(t, {
									name: "close",
									size: "sm"
								})
							})
						]
					}, `${e.name}-${e.size}-${n}`);
				})
			}),
			S !== void 0 && /* @__PURE__ */ f(ee, {
				value: S,
				label: N("progress", D),
				size: "sm",
				className: "file-upload__progress"
			})
		]
	});
});
//#endregion
export { _ as FileUpload };
