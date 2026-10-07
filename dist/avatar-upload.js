'use client';
import './avatar-upload.css';
import { t as e } from "./_shared/env.js";
import { n as t } from "./_shared/brandmessagescontext.js";
import { Icon as n } from "./icon.js";
import { VisuallyHidden as r } from "./visually-hidden.js";
import { n as i } from "./_shared/form-size.js";
import { Button as ee } from "./button.js";
import { Avatar as te } from "./avatar.js";
import { ErrorText as ne } from "./error-text.js";
import { i as a, n as re, r as o, t as ie } from "./_shared/validate.js";
import { t as ae } from "./_shared/imagecropdialog.js";
import { useCallback as oe, useEffect as s, useId as se, useRef as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/messages/es/avatarUpload.ts
var ce = {
	button: "Subir",
	buttonFor: (e) => `Subir ${e}`,
	subject: "el avatar",
	dropHint: (e) => `…o arrastra la imagen hasta ${e}`,
	dropActive: (e) => `Suelta la imagen sobre ${e} para subirla`,
	maxSize: (e) => `máx. ${e}`,
	invalidType: (e) => `Formato no admitido. Se aceptan ${e}.`,
	tooLarge: (e) => `El archivo pesa demasiado. El máximo es ${e}.`,
	cropCancel: "Cancelar",
	cropConfirm: "Guardar"
}, le = {
	sm: "2xl",
	md: "3xl",
	lg: "4xl"
}, ue = {
	sm: "md",
	md: "lg",
	lg: "xl"
};
function de(e, t) {
	return o(e.split(",").map((e) => e.trim()).filter(Boolean).map((e) => e.startsWith(".") ? e.slice(1) : e.split("/")[1] ?? e).map((e) => e.toUpperCase()), t);
}
function f({ src: o, name: f, alt: p, shape: m = "circle", size: fe, accept: h = "image/jpeg,image/png,image/webp", maxSize: g, outputMimeType: _ = "image/jpeg", outputSize: v, disabled: pe = !1, busy: y = !1, errorMessage: me, onChange: he, onSelect: b, onError: x, subject: ge, buttonLabel: _e, buttonAccessibleLabel: ve, hintLabel: ye, formatsLabel: be, locale: S = ie, maxSizeHint: xe, invalidTypeError: C, tooLargeError: w, dropActiveMessage: Se, dropHintLabel: Ce, cropTitle: we, cropDescription: T, cropCancelLabel: E, cropConfirmLabel: D, cropCloseLabel: O, cropLoadingLabel: k, cropErrorMessage: A, className: Te }) {
	let j = t("avatarUpload", ce), M = i(fe), N = c(null), P = c(null), [F, I] = l(null), [L, R] = l(!1), [Ee, z] = l(!1), [De, B] = l(null), V = se(), H = `${V}-hint`, U = `${V}-error`, W = j("subject", ge), G = be ?? de(h, S), K = ye ?? [G, g === void 0 ? null : j("maxSize", xe)(re(g, S))].filter(Boolean).join(" · "), q = De ?? me, J = pe || y, Y = j("button", _e), X = ve ?? j("buttonFor")(W);
	e() && !X.toLowerCase().includes(Y.toLowerCase()) && console.warn(`[AvatarUpload] El nombre accesible del botón ("${X}") no contiene su texto visible ("${Y}"). WCAG 2.5.3 (Label in Name) lo exige: quien navega por voz dice lo que ve, y con estos textos no encontraría el control.`), s(() => {
		P.current = F;
	}, [F]), s(() => () => {
		P.current && URL.revokeObjectURL(P.current.url);
	}, []), s(() => {
		if (J) return;
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
	}, [J]);
	let Z = oe((e) => {
		let t = a(e, h, g, j("tooLarge", w), j("invalidType", C)(G), S);
		if (t) {
			B(t), x?.(t);
			return;
		}
		B(null), b?.(e), I({
			url: URL.createObjectURL(e),
			file: e
		});
	}, [
		h,
		g,
		j,
		w,
		C,
		G,
		S,
		x,
		b
	]), Oe = () => {
		F && URL.revokeObjectURL(F.url), I(null);
	}, Q = async (e) => {
		F && await he(e, F.file);
	}, $ = Ce ?? j("dropHint")(W);
	return /* @__PURE__ */ d("div", {
		className: [
			"avatar-upload",
			m === "square" ? "avatar-upload--square" : "",
			L ? "avatar-upload--armed" : "",
			Ee ? "avatar-upload--over" : "",
			J ? "avatar-upload--inert" : "",
			Te ?? ""
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ d("div", {
				className: "avatar-upload__target",
				onClick: () => {
					J || N.current?.click();
				},
				onDragEnter: (e) => {
					e.preventDefault(), J || z(!0);
				},
				onDragOver: (e) => {
					e.preventDefault(), !J && (e.dataTransfer.dropEffect = "copy", z(!0));
				},
				onDragLeave: (e) => {
					e.currentTarget.contains(e.relatedTarget) || z(!1);
				},
				onDrop: (e) => {
					if (e.preventDefault(), z(!1), R(!1), J) return;
					let t = e.dataTransfer.files?.[0];
					t && Z(t);
				},
				children: [/* @__PURE__ */ u(te, {
					src: o ?? void 0,
					name: f,
					...p === void 0 ? {} : { alt: p },
					shape: m,
					size: le[M]
				}), /* @__PURE__ */ u("span", {
					className: "avatar-upload__overlay",
					"aria-hidden": "true",
					children: /* @__PURE__ */ u(n, {
						name: "upload",
						size: ue[M]
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
						accept: h,
						tabIndex: -1,
						"aria-hidden": "true",
						disabled: J,
						onChange: (e) => {
							let t = e.target.files?.[0];
							t && Z(t), e.target.value = "";
						}
					}),
					/* @__PURE__ */ u(ee, {
						variant: "outline",
						size: M,
						disabled: J,
						onClick: () => N.current?.click(),
						...X === Y ? {} : { "aria-label": X },
						"aria-describedby": [K ? H : null, q ? U : null].filter(Boolean).join(" ") || void 0,
						children: Y
					}),
					K && /* @__PURE__ */ u(r, {
						id: H,
						children: K
					}),
					$ && /* @__PURE__ */ u("span", {
						className: "avatar-upload__hint",
						children: $
					}),
					q && /* @__PURE__ */ u(ne, {
						id: U,
						children: q
					})
				]
			}),
			/* @__PURE__ */ u(r, {
				role: "status",
				children: L ? Se ?? j("dropActive")(W) : ""
			}),
			/* @__PURE__ */ u(ae, {
				sourceUrl: F?.url ?? null,
				title: we,
				description: T,
				circularCrop: m === "circle",
				outputMimeType: _,
				...v === void 0 ? {} : { outputSize: v },
				busy: y,
				cancelLabel: E ?? j("cropCancel"),
				confirmLabel: D ?? j("cropConfirm"),
				...O === void 0 ? {} : { closeLabel: O },
				...k === void 0 ? {} : { loadingLabel: k },
				...A === void 0 ? {} : { errorMessage: A },
				onConfirm: Q,
				onOpenChange: (e) => {
					e || Oe();
				}
			})
		]
	});
}
//#endregion
export { f as AvatarUpload };
