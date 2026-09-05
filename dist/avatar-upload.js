'use client';
import './avatar-upload.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Avatar as n } from "./avatar.js";
import { n as r } from "./_shared/form-size.js";
import { Button as i } from "./button.js";
import { n as ee, t as te } from "./_shared/validate.js";
import { t as ne } from "./_shared/env.js";
import { t as re } from "./_shared/ImageCropDialog.js";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import { useCallback as ie, useEffect as s, useId as ae, useRef as c, useState as l } from "react";
//#region src/stories/molecules/AvatarUpload/AvatarUpload.tsx
var u = {
	sm: "2xl",
	md: "3xl",
	lg: "4xl"
}, oe = {
	sm: "md",
	md: "lg",
	lg: "xl"
};
function d(e) {
	return e.split(",").map((e) => e.trim()).filter(Boolean).map((e) => e.startsWith(".") ? e.slice(1) : e.split("/")[1] ?? e).map((e) => e.toUpperCase()).join(", ");
}
function f({ src: f, name: p, alt: m, shape: h = "circle", size: se, accept: g = "image/jpeg,image/png,image/webp", maxSize: _, outputMimeType: v = "image/jpeg", outputSize: y, disabled: b = !1, busy: x = !1, errorMessage: S, onChange: C, onSelect: w, onError: T, buttonLabel: E = "Subir", buttonAccessibleLabel: ce, hintLabel: le, formatsLabel: ue, maxSizeHint: de = (e) => `máx. ${e}`, invalidTypeError: D = (e) => `Formato no admitido. Se aceptan ${e}.`, tooLargeError: O = (e) => `El archivo pesa demasiado. El máximo es ${e}.`, dropActiveMessage: fe = "Suelta la imagen sobre el avatar para subirla", cropTitle: k = "Recortar imagen", cropDescription: A, cropCancelLabel: j = "Cancelar", cropConfirmLabel: M = "Guardar", cropCloseLabel: N = "Cerrar", className: P }) {
	let F = r(se), I = c(null), L = c(null), [R, z] = l(null), [B, V] = l(!1), [pe, H] = l(!1), [U, W] = l(null), G = ae(), K = `${G}-hint`, q = `${G}-error`, J = ue ?? d(g), Y = le ?? [J, _ === void 0 ? null : de(te(_))].filter(Boolean).join(" · "), X = U ?? S, Z = b || x, Q = ce ?? E;
	ne() && !Q.toLowerCase().includes(E.toLowerCase()) && console.warn(`[AvatarUpload] El nombre accesible del botón ("${Q}") no contiene su texto visible ("${E}"). WCAG 2.5.3 (Label in Name) lo exige: quien navega por voz dice lo que ve, y con estos textos no encontraría el control.`), s(() => {
		L.current = R;
	}, [R]), s(() => () => {
		L.current && URL.revokeObjectURL(L.current.url);
	}, []), s(() => {
		if (Z) return;
		let e = 0, t = (e) => Array.from(e.dataTransfer?.types ?? []).includes("Files"), n = (n) => {
			t(n) && (e += 1, V(!0));
		}, r = () => {
			e = Math.max(0, e - 1), e === 0 && V(!1);
		}, i = () => {
			e = 0, V(!1);
		};
		return window.addEventListener("dragenter", n), window.addEventListener("dragleave", r), window.addEventListener("drop", i), window.addEventListener("dragend", i), () => {
			window.removeEventListener("dragenter", n), window.removeEventListener("dragleave", r), window.removeEventListener("drop", i), window.removeEventListener("dragend", i), V(!1);
		};
	}, [Z]);
	let $ = ie((e) => {
		let t = ee(e, g, _, O, D(J));
		if (t) {
			W(t), T?.(t);
			return;
		}
		W(null), w?.(e), z({
			url: URL.createObjectURL(e),
			file: e
		});
	}, [
		g,
		_,
		O,
		D,
		J,
		T,
		w
	]), me = () => {
		R && URL.revokeObjectURL(R.url), z(null);
	}, he = async (e) => {
		R && await C(e, R.file);
	};
	return /* @__PURE__ */ o("div", {
		className: [
			"avatar-upload",
			h === "square" ? "avatar-upload--square" : "",
			B ? "avatar-upload--armed" : "",
			pe ? "avatar-upload--over" : "",
			Z ? "avatar-upload--inert" : "",
			P ?? ""
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ o("div", {
				className: "avatar-upload__target",
				onClick: () => {
					Z || I.current?.click();
				},
				onDragEnter: (e) => {
					e.preventDefault(), Z || H(!0);
				},
				onDragOver: (e) => {
					e.preventDefault(), !Z && (e.dataTransfer.dropEffect = "copy", H(!0));
				},
				onDragLeave: (e) => {
					e.currentTarget.contains(e.relatedTarget) || H(!1);
				},
				onDrop: (e) => {
					if (e.preventDefault(), H(!1), V(!1), Z) return;
					let t = e.dataTransfer.files?.[0];
					t && $(t);
				},
				children: [/* @__PURE__ */ a(n, {
					src: f ?? void 0,
					name: p,
					...m === void 0 ? {} : { alt: m },
					shape: h,
					size: u[F]
				}), /* @__PURE__ */ a("span", {
					className: "avatar-upload__overlay",
					"aria-hidden": "true",
					children: /* @__PURE__ */ a(e, {
						name: "upload",
						size: oe[F]
					})
				})]
			}),
			/* @__PURE__ */ o("div", {
				className: "avatar-upload__body",
				children: [
					/* @__PURE__ */ a("input", {
						ref: I,
						type: "file",
						className: "avatar-upload__input",
						accept: g,
						tabIndex: -1,
						"aria-hidden": "true",
						disabled: Z,
						onChange: (e) => {
							let t = e.target.files?.[0];
							t && $(t), e.target.value = "";
						}
					}),
					/* @__PURE__ */ a(i, {
						variant: "outline",
						size: F,
						disabled: Z,
						onClick: () => I.current?.click(),
						...Q === E ? {} : { "aria-label": Q },
						"aria-describedby": [Y ? K : null, X ? q : null].filter(Boolean).join(" ") || void 0,
						children: E
					}),
					Y && /* @__PURE__ */ a(t, {
						id: K,
						children: Y
					}),
					X && /* @__PURE__ */ a("span", {
						id: q,
						className: "avatar-upload__error",
						role: "alert",
						children: X
					})
				]
			}),
			/* @__PURE__ */ a(t, {
				role: "status",
				children: B ? fe : ""
			}),
			/* @__PURE__ */ a(re, {
				sourceUrl: R?.url ?? null,
				title: k,
				description: A,
				circularCrop: h === "circle",
				outputMimeType: v,
				...y === void 0 ? {} : { outputSize: y },
				busy: x,
				cancelLabel: j,
				confirmLabel: M,
				closeLabel: N,
				onConfirm: he,
				onClose: me
			})
		]
	});
}
//#endregion
export { f as AvatarUpload };
