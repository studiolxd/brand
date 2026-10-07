'use client';
import './confirm-dialog.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { t as n } from "./_shared/modal.js";
import { t as r } from "./_shared/inputfield.js";
import { useId as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/messages/es/confirmDialog.ts
var u = {
	cancel: "Cancelar",
	pending: "Confirmando…"
};
//#endregion
//#region src/stories/molecules/ConfirmDialog/ConfirmDialog.tsx
function d({ open: d, title: f, description: p, children: m, onConfirm: h, onCancel: g, onConfirmError: _, secondaryActionLabel: v, onSecondaryAction: y, destructive: b = !1, confirmLabel: x, cancelLabel: S, pendingLabel: C, closeLabel: w, confirmPhrase: T, confirmPhraseLabel: E, confirmPhraseMismatch: D, container: O, className: k }) {
	let A = e("confirmDialog", u), j = a(null), M = a(null), N = i(), [P, F] = o(!1), [I, L] = o(""), [R, z] = o(!1), B = T === void 0 || I.trim() === T, V = R && !B, [H, U] = o(d);
	d !== H && (U(d), d && (F(!1), L(""), z(!1)));
	let W = () => {
		P || g();
	}, G = async () => {
		if (P || !B) return;
		let e = h();
		if (e instanceof Promise) {
			F(!0);
			try {
				await e;
			} catch (e) {
				_?.(e);
			} finally {
				F(!1);
			}
		}
	};
	return /* @__PURE__ */ l(n, {
		open: d,
		onClose: W,
		title: f,
		...w === void 0 ? {} : { closeLabel: w },
		container: O,
		initialFocus: T === void 0 ? j : M,
		...p == null ? {} : { description: p },
		footerClassName: ["confirm-dialog__actions", k].filter(Boolean).join(" "),
		footer: /* @__PURE__ */ l(s, { children: [
			/* @__PURE__ */ c(t, {
				ref: j,
				variant: "outline",
				onClick: W,
				disabled: P,
				children: A("cancel", S)
			}),
			v && y && /* @__PURE__ */ c(t, {
				variant: "outline",
				onClick: y,
				disabled: P,
				children: v
			}),
			/* @__PURE__ */ c(t, {
				variant: b ? "outline" : "primary",
				destructive: b,
				onClick: G,
				disabled: P || !B,
				children: P ? A("pending", C) : x
			})
		] }),
		children: [m, T !== void 0 && /* @__PURE__ */ c(r, {
			ref: M,
			id: `${N}-confirm-phrase`,
			className: "confirm-dialog__phrase",
			label: E ?? "",
			value: I,
			disabled: P,
			autoComplete: "off",
			autoCorrect: "off",
			autoCapitalize: "none",
			spellCheck: !1,
			error: V,
			...V ? { errorMessage: D } : {},
			onChange: (e) => {
				L(e.target.value), z(!1);
			},
			onBlur: () => {
				I !== "" && z(!0);
			},
			onKeyDown: (e) => {
				e.key === "Enter" && (e.preventDefault(), B ? G() : I !== "" && z(!0));
			}
		})]
	});
}
//#endregion
export { d as ConfirmDialog };
