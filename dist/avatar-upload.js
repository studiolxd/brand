'use client';
import './avatar-upload.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Avatar as n } from "./avatar.js";
import { n as r } from "./_shared/form-size.js";
import { Button as i } from "./button.js";
import { n as ee, t as te } from "./_shared/validate.js";
import { t as a } from "./_shared/env.js";
import { t as o } from "./_shared/ImageCropDialog.js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { useCallback as l, useEffect as u, useId as d, useRef as f, useState as p } from "react";
//#region src/stories/molecules/AvatarUpload/AvatarUpload.tsx
var ne = {
	sm: "2xl",
	md: "3xl",
	lg: "4xl"
}, re = {
	sm: "md",
	md: "lg",
	lg: "xl"
};
function ie(e) {
	return e.split(",").map((e) => e.trim()).filter(Boolean).map((e) => e.startsWith(".") ? e.slice(1) : e.split("/")[1] ?? e).map((e) => e.toUpperCase()).join(", ");
}
function m({ src: m, name: ae, alt: h, shape: g = "circle", size: oe, accept: _ = "image/jpeg,image/png,image/webp", maxSize: v, outputMimeType: y = "image/jpeg", outputSize: b, disabled: se = !1, busy: x = !1, errorMessage: ce, onChange: le, onSelect: S, onError: C, buttonLabel: w = "Subir", buttonAccessibleLabel: T, hintLabel: ue, formatsLabel: de, maxSizeHint: fe = (e) => `máx. ${e}`, invalidTypeError: E = (e) => `Formato no admitido. Se aceptan ${e}.`, tooLargeError: D = (e) => `El archivo pesa demasiado. El máximo es ${e}.`, dropActiveMessage: pe = "Suelta la imagen sobre el avatar para subirla", dropHintLabel: O = "…o arrastra la imagen hasta el avatar", cropTitle: me = "Recortar imagen", cropDescription: k, cropCancelLabel: A = "Cancelar", cropConfirmLabel: j = "Guardar", cropCloseLabel: M = "Cerrar", cropLoadingLabel: N, cropErrorMessage: P, className: F }) {
	let I = r(oe), L = f(null), R = f(null), [z, B] = p(null), [V, H] = p(!1), [he, U] = p(!1), [ge, W] = p(null), G = d(), K = `${G}-hint`, q = `${G}-error`, J = de ?? ie(_), Y = ue ?? [J, v === void 0 ? null : fe(te(v))].filter(Boolean).join(" · "), X = ge ?? ce, Z = se || x, Q = T ?? w;
	a() && !Q.toLowerCase().includes(w.toLowerCase()) && console.warn(`[AvatarUpload] El nombre accesible del botón ("${Q}") no contiene su texto visible ("${w}"). WCAG 2.5.3 (Label in Name) lo exige: quien navega por voz dice lo que ve, y con estos textos no encontraría el control.`), u(() => {
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
		let t = ee(e, _, v, D, E(J));
		if (t) {
			W(t), C?.(t);
			return;
		}
		W(null), S?.(e), B({
			url: URL.createObjectURL(e),
			file: e
		});
	}, [
		_,
		v,
		D,
		E,
		J,
		C,
		S
	]), _e = () => {
		z && URL.revokeObjectURL(z.url), B(null);
	}, ve = async (e) => {
		z && await le(e, z.file);
	};
	return /* @__PURE__ */ c("div", {
		className: [
			"avatar-upload",
			g === "square" ? "avatar-upload--square" : "",
			V ? "avatar-upload--armed" : "",
			he ? "avatar-upload--over" : "",
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
				children: [/* @__PURE__ */ s(n, {
					src: m ?? void 0,
					name: ae,
					...h === void 0 ? {} : { alt: h },
					shape: g,
					size: ne[I]
				}), /* @__PURE__ */ s("span", {
					className: "avatar-upload__overlay",
					"aria-hidden": "true",
					children: /* @__PURE__ */ s(e, {
						name: "upload",
						size: re[I]
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
						accept: _,
						tabIndex: -1,
						"aria-hidden": "true",
						disabled: Z,
						onChange: (e) => {
							let t = e.target.files?.[0];
							t && $(t), e.target.value = "";
						}
					}),
					/* @__PURE__ */ s(i, {
						variant: "outline",
						size: I,
						disabled: Z,
						onClick: () => L.current?.click(),
						...Q === w ? {} : { "aria-label": Q },
						"aria-describedby": [Y ? K : null, X ? q : null].filter(Boolean).join(" ") || void 0,
						children: w
					}),
					Y && /* @__PURE__ */ s(t, {
						id: K,
						children: Y
					}),
					O && /* @__PURE__ */ s("span", {
						className: "avatar-upload__hint",
						children: O
					}),
					X && /* @__PURE__ */ s("span", {
						id: q,
						className: "avatar-upload__error",
						role: "alert",
						children: X
					})
				]
			}),
			/* @__PURE__ */ s(t, {
				role: "status",
				children: V ? pe : ""
			}),
			/* @__PURE__ */ s(o, {
				sourceUrl: z?.url ?? null,
				title: me,
				description: k,
				circularCrop: g === "circle",
				outputMimeType: y,
				...b === void 0 ? {} : { outputSize: b },
				busy: x,
				cancelLabel: A,
				confirmLabel: j,
				closeLabel: M,
				...N === void 0 ? {} : { loadingLabel: N },
				...P === void 0 ? {} : { errorMessage: P },
				onConfirm: ve,
				onClose: _e
			})
		]
	});
}
//#endregion
export { m as AvatarUpload };
