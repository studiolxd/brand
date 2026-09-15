'use client';
import './avatar-upload.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { VisuallyHidden as n } from "./visually-hidden.js";
import { n as r } from "./_shared/form-size.js";
import { Button as i } from "./button.js";
import { Avatar as a } from "./avatar.js";
import { ErrorText as ee } from "./error-text.js";
import { i as te, n as ne, r as o, t as re } from "./_shared/validate.js";
import { t as ie } from "./_shared/env.js";
import { t as ae } from "./_shared/imagecropdialog.js";
import { useCallback as oe, useEffect as s, useId as se, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/molecules/AvatarUpload/AvatarUpload.tsx
var ce = {
	sm: "2xl",
	md: "3xl",
	lg: "4xl"
}, f = {
	sm: "md",
	md: "lg",
	lg: "xl"
};
function le(e, t) {
	return o(e.split(",").map((e) => e.trim()).filter(Boolean).map((e) => e.startsWith(".") ? e.slice(1) : e.split("/")[1] ?? e).map((e) => e.toUpperCase()), t);
}
function p({ src: o, name: p, alt: m, shape: h = "circle", size: ue, accept: g = "image/jpeg,image/png,image/webp", maxSize: _, outputMimeType: de = "image/jpeg", outputSize: v, disabled: fe = !1, busy: y = !1, errorMessage: b, onChange: pe, onSelect: x, onError: S, subject: me, buttonLabel: he, buttonAccessibleLabel: ge, hintLabel: _e, formatsLabel: ve, locale: C = re, maxSizeHint: ye, invalidTypeError: w, tooLargeError: T, dropActiveMessage: be, dropHintLabel: xe, cropTitle: Se, cropDescription: Ce, cropCancelLabel: E, cropConfirmLabel: D, cropCloseLabel: O, cropLoadingLabel: k, cropErrorMessage: A, className: we }) {
	let j = e("avatarUpload"), M = r(ue), N = c(null), P = c(null), [F, I] = l(null), [L, R] = l(!1), [z, B] = l(!1), [Te, V] = l(null), H = se(), U = `${H}-hint`, W = `${H}-error`, G = j("subject", me), K = ve ?? le(g, C), q = _e ?? [K, _ === void 0 ? null : j("maxSize", ye)(ne(_, C))].filter(Boolean).join(" · "), J = Te ?? b, Y = fe || y, X = j("button", he), Z = ge ?? j("buttonFor")(G);
	ie() && !Z.toLowerCase().includes(X.toLowerCase()) && console.warn(`[AvatarUpload] El nombre accesible del botón ("${Z}") no contiene su texto visible ("${X}"). WCAG 2.5.3 (Label in Name) lo exige: quien navega por voz dice lo que ve, y con estos textos no encontraría el control.`), s(() => {
		P.current = F;
	}, [F]), s(() => () => {
		P.current && URL.revokeObjectURL(P.current.url);
	}, []), s(() => {
		if (Y) return;
		let e = 0, t = (e) => Array.from(e.dataTransfer?.types ?? []).includes("Files"), n = (n) => {
			t(n) && (e += 1, R(!0));
		}, r = () => {
			e = Math.max(0, e - 1), e === 0 && R(!1);
		}, i = () => {
			e = 0, R(!1);
		};
		return window.addEventListener("dragenter", n), window.addEventListener("dragleave", r), window.addEventListener("drop", i), window.addEventListener("dragend", i), () => {
			window.removeEventListener("dragenter", n), window.removeEventListener("dragleave", r), window.removeEventListener("drop", i), window.removeEventListener("dragend", i), R(!1);
		};
	}, [Y]);
	let Q = oe((e) => {
		let t = te(e, g, _, j("tooLarge", T), j("invalidType", w)(K), C);
		if (t) {
			V(t), S?.(t);
			return;
		}
		V(null), x?.(e), I({
			url: URL.createObjectURL(e),
			file: e
		});
	}, [
		g,
		_,
		j,
		T,
		w,
		K,
		C,
		S,
		x
	]), Ee = () => {
		F && URL.revokeObjectURL(F.url), I(null);
	}, De = async (e) => {
		F && await pe(e, F.file);
	}, $ = xe ?? j("dropHint")(G);
	return /* @__PURE__ */ d("div", {
		className: [
			"avatar-upload",
			h === "square" ? "avatar-upload--square" : "",
			L ? "avatar-upload--armed" : "",
			z ? "avatar-upload--over" : "",
			Y ? "avatar-upload--inert" : "",
			we ?? ""
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ d("div", {
				className: "avatar-upload__target",
				onClick: () => {
					Y || N.current?.click();
				},
				onDragEnter: (e) => {
					e.preventDefault(), Y || B(!0);
				},
				onDragOver: (e) => {
					e.preventDefault(), !Y && (e.dataTransfer.dropEffect = "copy", B(!0));
				},
				onDragLeave: (e) => {
					e.currentTarget.contains(e.relatedTarget) || B(!1);
				},
				onDrop: (e) => {
					if (e.preventDefault(), B(!1), R(!1), Y) return;
					let t = e.dataTransfer.files?.[0];
					t && Q(t);
				},
				children: [/* @__PURE__ */ u(a, {
					src: o ?? void 0,
					name: p,
					...m === void 0 ? {} : { alt: m },
					shape: h,
					size: ce[M]
				}), /* @__PURE__ */ u("span", {
					className: "avatar-upload__overlay",
					"aria-hidden": "true",
					children: /* @__PURE__ */ u(t, {
						name: "upload",
						size: f[M]
					})
				})]
			}),
			/* @__PURE__ */ d("div", {
				className: "avatar-upload__body",
				children: [
					/* @__PURE__ */ u("input", {
						ref: N,
						type: "file",
						className: "avatar-upload__input",
						accept: g,
						tabIndex: -1,
						"aria-hidden": "true",
						disabled: Y,
						onChange: (e) => {
							let t = e.target.files?.[0];
							t && Q(t), e.target.value = "";
						}
					}),
					/* @__PURE__ */ u(i, {
						variant: "outline",
						size: M,
						disabled: Y,
						onClick: () => N.current?.click(),
						...Z === X ? {} : { "aria-label": Z },
						"aria-describedby": [q ? U : null, J ? W : null].filter(Boolean).join(" ") || void 0,
						children: X
					}),
					q && /* @__PURE__ */ u(n, {
						id: U,
						children: q
					}),
					$ && /* @__PURE__ */ u("span", {
						className: "avatar-upload__hint",
						children: $
					}),
					J && /* @__PURE__ */ u(ee, {
						id: W,
						children: J
					})
				]
			}),
			/* @__PURE__ */ u(n, {
				role: "status",
				children: L ? be ?? j("dropActive")(G) : ""
			}),
			/* @__PURE__ */ u(ae, {
				sourceUrl: F?.url ?? null,
				title: Se,
				description: Ce,
				circularCrop: h === "circle",
				outputMimeType: de,
				...v === void 0 ? {} : { outputSize: v },
				busy: y,
				cancelLabel: E ?? j("cropCancel"),
				confirmLabel: D ?? j("cropConfirm"),
				...O === void 0 ? {} : { closeLabel: O },
				...k === void 0 ? {} : { loadingLabel: k },
				...A === void 0 ? {} : { errorMessage: A },
				onConfirm: De,
				onClose: Ee
			})
		]
	});
}
//#endregion
export { p as AvatarUpload };
