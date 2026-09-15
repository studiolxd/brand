'use client';
import './avatar-upload.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { n } from "./_shared/form-size.js";
import { Button as r } from "./button.js";
import { Avatar as i } from "./avatar.js";
import { ErrorText as ee } from "./error-text.js";
import { n as te, t as a } from "./_shared/validate.js";
import { t as ne } from "./_shared/env.js";
import { t as re } from "./_shared/imagecropdialog.js";
import { useCallback as ie, useEffect as o, useId as s, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/molecules/AvatarUpload/AvatarUpload.tsx
var ae = {
	sm: "2xl",
	md: "3xl",
	lg: "4xl"
}, f = {
	sm: "md",
	md: "lg",
	lg: "xl"
};
function p(e) {
	return e.split(",").map((e) => e.trim()).filter(Boolean).map((e) => e.startsWith(".") ? e.slice(1) : e.split("/")[1] ?? e).map((e) => e.toUpperCase()).join(", ");
}
function m({ src: m, name: oe, alt: h, shape: g = "circle", size: se, accept: _ = "image/jpeg,image/png,image/webp", maxSize: v, outputMimeType: y = "image/jpeg", outputSize: b, disabled: x = !1, busy: S = !1, errorMessage: ce, onChange: le, onSelect: C, onError: w, buttonLabel: T = "Subir", buttonAccessibleLabel: ue, hintLabel: de, formatsLabel: fe, maxSizeHint: pe = (e) => `máx. ${e}`, invalidTypeError: E = (e) => `Formato no admitido. Se aceptan ${e}.`, tooLargeError: D = (e) => `El archivo pesa demasiado. El máximo es ${e}.`, dropActiveMessage: me = "Suelta la imagen sobre el avatar para subirla", dropHintLabel: O = "…o arrastra la imagen hasta el avatar", cropTitle: he = "Recortar imagen", cropDescription: k, cropCancelLabel: A = "Cancelar", cropConfirmLabel: j = "Guardar", cropCloseLabel: M = "Cerrar", cropLoadingLabel: N, cropErrorMessage: P, className: F }) {
	let I = n(se), L = c(null), R = c(null), [z, B] = l(null), [V, H] = l(!1), [ge, U] = l(!1), [_e, W] = l(null), G = s(), K = `${G}-hint`, q = `${G}-error`, J = fe ?? p(_), Y = de ?? [J, v === void 0 ? null : pe(a(v))].filter(Boolean).join(" · "), X = _e ?? ce, Z = x || S, Q = ue ?? T;
	ne() && !Q.toLowerCase().includes(T.toLowerCase()) && console.warn(`[AvatarUpload] El nombre accesible del botón ("${Q}") no contiene su texto visible ("${T}"). WCAG 2.5.3 (Label in Name) lo exige: quien navega por voz dice lo que ve, y con estos textos no encontraría el control.`), o(() => {
		R.current = z;
	}, [z]), o(() => () => {
		R.current && URL.revokeObjectURL(R.current.url);
	}, []), o(() => {
		if (Z) return;
		let e = 0, t = (e) => Array.from(e.dataTransfer?.types ?? []).includes("Files"), n = (n) => {
			t(n) && (e += 1, H(!0));
		}, r = () => {
			e = Math.max(0, e - 1), e === 0 && H(!1);
		}, i = () => {
			e = 0, H(!1);
		};
		return window.addEventListener("dragenter", n), window.addEventListener("dragleave", r), window.addEventListener("drop", i), window.addEventListener("dragend", i), () => {
			window.removeEventListener("dragenter", n), window.removeEventListener("dragleave", r), window.removeEventListener("drop", i), window.removeEventListener("dragend", i), H(!1);
		};
	}, [Z]);
	let $ = ie((e) => {
		let t = te(e, _, v, D, E(J));
		if (t) {
			W(t), w?.(t);
			return;
		}
		W(null), C?.(e), B({
			url: URL.createObjectURL(e),
			file: e
		});
	}, [
		_,
		v,
		D,
		E,
		J,
		w,
		C
	]), ve = () => {
		z && URL.revokeObjectURL(z.url), B(null);
	}, ye = async (e) => {
		z && await le(e, z.file);
	};
	return /* @__PURE__ */ d("div", {
		className: [
			"avatar-upload",
			g === "square" ? "avatar-upload--square" : "",
			V ? "avatar-upload--armed" : "",
			ge ? "avatar-upload--over" : "",
			Z ? "avatar-upload--inert" : "",
			F ?? ""
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ d("div", {
				className: "avatar-upload__target",
				onClick: () => {
					Z || L.current?.click();
				},
				onDragEnter: (e) => {
					e.preventDefault(), Z || U(!0);
				},
				onDragOver: (e) => {
					e.preventDefault(), !Z && (e.dataTransfer.dropEffect = "copy", U(!0));
				},
				onDragLeave: (e) => {
					e.currentTarget.contains(e.relatedTarget) || U(!1);
				},
				onDrop: (e) => {
					if (e.preventDefault(), U(!1), H(!1), Z) return;
					let t = e.dataTransfer.files?.[0];
					t && $(t);
				},
				children: [/* @__PURE__ */ u(i, {
					src: m ?? void 0,
					name: oe,
					...h === void 0 ? {} : { alt: h },
					shape: g,
					size: ae[I]
				}), /* @__PURE__ */ u("span", {
					className: "avatar-upload__overlay",
					"aria-hidden": "true",
					children: /* @__PURE__ */ u(e, {
						name: "upload",
						size: f[I]
					})
				})]
			}),
			/* @__PURE__ */ d("div", {
				className: "avatar-upload__body",
				children: [
					/* @__PURE__ */ u("input", {
						ref: L,
						type: "file",
						className: "avatar-upload__input",
						accept: _,
						tabIndex: -1,
						"aria-hidden": "true",
						disabled: Z,
						onChange: (e) => {
							let t = e.target.files?.[0];
							t && $(t), e.target.value = "";
						}
					}),
					/* @__PURE__ */ u(r, {
						variant: "outline",
						size: I,
						disabled: Z,
						onClick: () => L.current?.click(),
						...Q === T ? {} : { "aria-label": Q },
						"aria-describedby": [Y ? K : null, X ? q : null].filter(Boolean).join(" ") || void 0,
						children: T
					}),
					Y && /* @__PURE__ */ u(t, {
						id: K,
						children: Y
					}),
					O && /* @__PURE__ */ u("span", {
						className: "avatar-upload__hint",
						children: O
					}),
					X && /* @__PURE__ */ u(ee, {
						id: q,
						children: X
					})
				]
			}),
			/* @__PURE__ */ u(t, {
				role: "status",
				children: V ? me : ""
			}),
			/* @__PURE__ */ u(re, {
				sourceUrl: z?.url ?? null,
				title: he,
				description: k,
				circularCrop: g === "circle",
				outputMimeType: y,
				...b === void 0 ? {} : { outputSize: b },
				busy: S,
				cancelLabel: A,
				confirmLabel: j,
				closeLabel: M,
				...N === void 0 ? {} : { loadingLabel: N },
				...P === void 0 ? {} : { errorMessage: P },
				onConfirm: ye,
				onClose: ve
			})
		]
	});
}
//#endregion
export { m as AvatarUpload };
