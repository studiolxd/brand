'use client';
import './avatar-upload.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { n } from "./_shared/form-size.js";
import { Button as r } from "./button.js";
import { Avatar as i } from "./avatar.js";
import { ErrorText as ee } from "./error-text.js";
import { n as te, t as a } from "./_shared/validate.js";
import { t as o } from "./_shared/env.js";
import { t as ne } from "./_shared/imagecropdialog.js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { useCallback as l, useEffect as u, useId as re, useRef as d, useState as f } from "react";
//#region src/stories/molecules/AvatarUpload/AvatarUpload.tsx
var ie = {
	sm: "2xl",
	md: "3xl",
	lg: "4xl"
}, p = {
	sm: "md",
	md: "lg",
	lg: "xl"
};
function m(e) {
	return e.split(",").map((e) => e.trim()).filter(Boolean).map((e) => e.startsWith(".") ? e.slice(1) : e.split("/")[1] ?? e).map((e) => e.toUpperCase()).join(", ");
}
function h({ src: h, name: ae, alt: g, shape: _ = "circle", size: oe, accept: v = "image/jpeg,image/png,image/webp", maxSize: y, outputMimeType: b = "image/jpeg", outputSize: x, disabled: se = !1, busy: S = !1, errorMessage: ce, onChange: le, onSelect: C, onError: w, buttonLabel: T = "Subir", buttonAccessibleLabel: ue, hintLabel: de, formatsLabel: fe, maxSizeHint: pe = (e) => `máx. ${e}`, invalidTypeError: E = (e) => `Formato no admitido. Se aceptan ${e}.`, tooLargeError: D = (e) => `El archivo pesa demasiado. El máximo es ${e}.`, dropActiveMessage: me = "Suelta la imagen sobre el avatar para subirla", dropHintLabel: O = "…o arrastra la imagen hasta el avatar", cropTitle: he = "Recortar imagen", cropDescription: k, cropCancelLabel: A = "Cancelar", cropConfirmLabel: j = "Guardar", cropCloseLabel: M = "Cerrar", cropLoadingLabel: N, cropErrorMessage: P, className: F }) {
	let I = n(oe), L = d(null), R = d(null), [z, B] = f(null), [V, H] = f(!1), [ge, U] = f(!1), [_e, W] = f(null), G = re(), K = `${G}-hint`, q = `${G}-error`, J = fe ?? m(v), Y = de ?? [J, y === void 0 ? null : pe(a(y))].filter(Boolean).join(" · "), X = _e ?? ce, Z = se || S, Q = ue ?? T;
	o() && !Q.toLowerCase().includes(T.toLowerCase()) && console.warn(`[AvatarUpload] El nombre accesible del botón ("${Q}") no contiene su texto visible ("${T}"). WCAG 2.5.3 (Label in Name) lo exige: quien navega por voz dice lo que ve, y con estos textos no encontraría el control.`), u(() => {
		R.current = z;
	}, [z]), u(() => () => {
		R.current && URL.revokeObjectURL(R.current.url);
	}, []), u(() => {
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
	let $ = l((e) => {
		let t = te(e, v, y, D, E(J));
		if (t) {
			W(t), w?.(t);
			return;
		}
		W(null), C?.(e), B({
			url: URL.createObjectURL(e),
			file: e
		});
	}, [
		v,
		y,
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
	return /* @__PURE__ */ c("div", {
		className: [
			"avatar-upload",
			_ === "square" ? "avatar-upload--square" : "",
			V ? "avatar-upload--armed" : "",
			ge ? "avatar-upload--over" : "",
			Z ? "avatar-upload--inert" : "",
			F ?? ""
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ c("div", {
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
				children: [/* @__PURE__ */ s(i, {
					src: h ?? void 0,
					name: ae,
					...g === void 0 ? {} : { alt: g },
					shape: _,
					size: ie[I]
				}), /* @__PURE__ */ s("span", {
					className: "avatar-upload__overlay",
					"aria-hidden": "true",
					children: /* @__PURE__ */ s(e, {
						name: "upload",
						size: p[I]
					})
				})]
			}),
			/* @__PURE__ */ c("div", {
				className: "avatar-upload__body",
				children: [
					/* @__PURE__ */ s("input", {
						ref: L,
						type: "file",
						className: "avatar-upload__input",
						accept: v,
						tabIndex: -1,
						"aria-hidden": "true",
						disabled: Z,
						onChange: (e) => {
							let t = e.target.files?.[0];
							t && $(t), e.target.value = "";
						}
					}),
					/* @__PURE__ */ s(r, {
						variant: "outline",
						size: I,
						disabled: Z,
						onClick: () => L.current?.click(),
						...Q === T ? {} : { "aria-label": Q },
						"aria-describedby": [Y ? K : null, X ? q : null].filter(Boolean).join(" ") || void 0,
						children: T
					}),
					Y && /* @__PURE__ */ s(t, {
						id: K,
						children: Y
					}),
					O && /* @__PURE__ */ s("span", {
						className: "avatar-upload__hint",
						children: O
					}),
					X && /* @__PURE__ */ s(ee, {
						id: q,
						children: X
					})
				]
			}),
			/* @__PURE__ */ s(t, {
				role: "status",
				children: V ? me : ""
			}),
			/* @__PURE__ */ s(ne, {
				sourceUrl: z?.url ?? null,
				title: he,
				description: k,
				circularCrop: _ === "circle",
				outputMimeType: b,
				...x === void 0 ? {} : { outputSize: x },
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
export { h as AvatarUpload };
