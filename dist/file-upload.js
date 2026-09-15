'use client';
import './file-upload.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { n as r } from "./_shared/form-size.js";
import { t as i } from "./_shared/progressbar.js";
import { i as a, n as o, t as s } from "./_shared/validate.js";
import { forwardRef as c, useCallback as l, useEffect as u, useId as d, useRef as f, useState as p } from "react";
import { jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/stories/atoms/FileUpload/FileUpload.tsx
var g = /* @__PURE__ */ new WeakMap();
function ee(e) {
	if (!e.type.startsWith("image/")) return;
	let t = g.get(e);
	return t || (t = URL.createObjectURL(e), g.set(e, t)), t;
}
function _(e) {
	let t = g.get(e);
	t && (URL.revokeObjectURL(t), g.delete(e));
}
function v(e, t) {
	typeof e == "function" ? e(t) : e && (e.current = t);
}
var y = c(function({ multiple: c = !1, accept: g, maxSize: y, maxFiles: b, value: x, defaultValue: S = [], onChange: C, progress: w, disabled: T = !1, error: E = !1, id: D, name: te, describedBy: ne, ariaLabel: re, "aria-describedby": ie, "aria-label": ae, required: oe, onBlur: se, className: ce, locale: O = s, dropzoneLabel: le, dropzoneActiveLabel: ue, dropzoneHintLabel: de, maxSizeHint: fe, maxFilesHint: pe, filesLabel: me, progressLabel: he, removeFileLabel: k, tooLargeError: A, invalidTypeError: j, size: M }, N) {
	let P = e("fileUpload"), F = r(M), I = F === "sm" ? "sm" : F === "lg" ? "lg" : "md", L = x !== void 0, [R, z] = p(S), [B, V] = p(/* @__PURE__ */ new Map()), [H, U] = p(!1), W = f(/* @__PURE__ */ new Set()), G = f(null), ge = d(), K = D ?? `file-upload-${ge}`, q = L ? x : R;
	u(() => {
		q.forEach((e) => W.current.add(e));
	}, [q]), u(() => {
		let e = W.current;
		return () => {
			e.forEach(_);
		};
	}, []);
	let J = l((e) => {
		if (T) return;
		let t = Array.from(e), n = L ? x ?? [] : R, r = new Map(B), i = [...n];
		for (let e of t) {
			if (b !== void 0 && i.filter((e) => !r.has(e)).length >= b) break;
			let t = a(e, g, y, P("tooLarge", A), P("invalidType", j), O);
			t && r.set(e, t), i.push(e);
		}
		V(r), L || z(i), C?.(i.filter((e) => !r.has(e)));
	}, [
		T,
		g,
		y,
		b,
		L,
		x,
		R,
		B,
		C,
		P,
		A,
		j,
		O
	]), _e = l((e) => {
		let t = (L ? x ?? [] : R).filter((t) => t !== e), n = new Map(B);
		n.delete(e), _(e), V(n), L || z(t), C?.(t.filter((e) => !n.has(e))), G.current && (G.current.value = "");
	}, [
		L,
		x,
		R,
		B,
		C
	]), ve = (e) => {
		e.target.files && J(e.target.files);
	}, ye = (e) => {
		e.preventDefault(), T || U(!0);
	}, be = (e) => {
		e.preventDefault(), U(!1);
	}, Y = (e) => {
		e.preventDefault(), U(!1), !T && e.dataTransfer.files && J(e.dataTransfer.files);
	}, xe = () => {
		T || G.current?.click();
	}, Se = [
		"file-upload",
		F === "md" ? "" : `file-upload--${F}`,
		H ? "file-upload--dragging" : "",
		E ? "file-upload--error" : "",
		T ? "file-upload--disabled" : "",
		q.length > 0 ? "file-upload--has-files" : "",
		ce ?? ""
	].filter(Boolean).join(" "), X = `${K}-hint`, Ce = [ne ?? ie, X].filter(Boolean).join(" "), Z = P("dropzone", le), Q = P("dropzoneHint", de), $ = [];
	return g && $.push(g), y && $.push(P("maxSize", fe)(o(y, O))), c && b && $.push(P("maxFiles", pe)(b)), /* @__PURE__ */ h("div", {
		className: Se,
		children: [
			/* @__PURE__ */ m(n, { children: /* @__PURE__ */ m("input", {
				ref: (e) => {
					G.current = e, v(N, e);
				},
				type: "file",
				id: K,
				name: te,
				multiple: c,
				accept: g,
				disabled: T,
				required: oe,
				"aria-label": re ?? ae,
				"aria-describedby": Ce,
				"aria-invalid": E || void 0,
				onChange: ve,
				onBlur: se
			}) }),
			/* @__PURE__ */ h("div", {
				className: "file-upload__dropzone",
				onClick: xe,
				onDragOver: ye,
				onDragLeave: be,
				onDrop: Y,
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ m(t, {
						name: "upload",
						size: I,
						className: "file-upload__icon"
					}),
					/* @__PURE__ */ m("span", {
						className: "file-upload__text",
						children: H ? P("dropzoneActive", ue) : Z
					}),
					/* @__PURE__ */ m("span", {
						className: "file-upload__text file-upload__text--secondary",
						children: Q
					}),
					$.length > 0 && /* @__PURE__ */ m("span", {
						className: "file-upload__subtext",
						children: $.join(" · ")
					})
				]
			}),
			/* @__PURE__ */ m(n, {
				id: X,
				children: [
					Z,
					Q,
					...$
				].join(". ")
			}),
			q.length > 0 && /* @__PURE__ */ m("ul", {
				className: "file-upload__list",
				"aria-label": P("files", me),
				children: q.map((e, n) => {
					let r = B.get(e), i = ee(e);
					return /* @__PURE__ */ h("li", {
						className: `file-upload__item${r ? " file-upload__item--error" : ""}`,
						children: [
							/* @__PURE__ */ m("div", {
								className: "file-upload__item-thumb",
								"aria-hidden": "true",
								children: i ? /* @__PURE__ */ m("img", {
									src: i,
									alt: ""
								}) : /* @__PURE__ */ m(t, {
									name: "file-text",
									size: "sm"
								})
							}),
							/* @__PURE__ */ h("div", {
								className: "file-upload__item-info",
								children: [
									/* @__PURE__ */ m("span", {
										className: "file-upload__item-name",
										children: e.name
									}),
									/* @__PURE__ */ m("span", {
										className: "file-upload__item-size",
										children: o(e.size, O)
									}),
									r && /* @__PURE__ */ m("span", {
										className: "file-upload__item-error-msg",
										role: "alert",
										children: r
									})
								]
							}),
							/* @__PURE__ */ m("button", {
								className: "file-upload__item-remove",
								type: "button",
								onClick: () => _e(e),
								"aria-label": P("removeFile", k)(e.name),
								children: /* @__PURE__ */ m(t, {
									name: "close",
									size: "sm"
								})
							})
						]
					}, `${e.name}-${e.size}-${n}`);
				})
			}),
			w !== void 0 && /* @__PURE__ */ m(i, {
				value: w,
				label: P("progress", he),
				size: "sm",
				className: "file-upload__progress"
			})
		]
	});
});
//#endregion
export { y as FileUpload };
