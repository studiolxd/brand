'use client';
import './confirm-dialog.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Modal as n } from "./modal.js";
import { InputField as r } from "./input-field.js";
import { useId as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/stories/molecules/ConfirmDialog/ConfirmDialog.tsx
function u({ open: u, title: d, description: f, children: p, onConfirm: m, onCancel: h, onConfirmError: g, secondaryActionLabel: _, onSecondaryAction: v, destructive: y = !1, confirmLabel: b, cancelLabel: x, pendingLabel: S, closeLabel: C, confirmPhrase: w, confirmPhraseLabel: T, confirmPhraseMismatch: E, container: D, className: O }) {
	let k = e("confirmDialog"), A = a(null), j = a(null), M = i(), [N, P] = o(!1), [F, I] = o(""), [L, R] = o(!1), z = w === void 0 || F.trim() === w, B = L && !z, [V, H] = o(u);
	u !== V && (H(u), u && (P(!1), I(""), R(!1)));
	let U = () => {
		N || h();
	}, W = async () => {
		if (N || !z) return;
		let e = m();
		if (e instanceof Promise) {
			P(!0);
			try {
				await e;
			} catch (e) {
				g?.(e);
			} finally {
				P(!1);
			}
		}
	};
	return /* @__PURE__ */ l(n, {
		open: u,
		onClose: U,
		title: d,
		...C === void 0 ? {} : { closeLabel: C },
		container: D,
		initialFocus: w === void 0 ? A : j,
		...f == null ? {} : { description: f },
		footerClassName: "confirm-dialog__actions",
		className: O,
		footer: /* @__PURE__ */ l(s, { children: [
			/* @__PURE__ */ c(t, {
				ref: A,
				variant: "outline",
				onClick: U,
				disabled: N,
				children: k("cancel", x)
			}),
			_ && v && /* @__PURE__ */ c(t, {
				variant: "outline",
				onClick: v,
				disabled: N,
				children: _
			}),
			/* @__PURE__ */ c(t, {
				variant: y ? "outline" : "primary",
				destructive: y,
				onClick: W,
				disabled: N || !z,
				children: N ? k("pending", S) : b
			})
		] }),
		children: [p, w !== void 0 && /* @__PURE__ */ c(r, {
			ref: j,
			id: `${M}-confirm-phrase`,
			className: "confirm-dialog__phrase",
			label: T ?? "",
			value: F,
			disabled: N,
			autoComplete: "off",
			autoCorrect: "off",
			autoCapitalize: "none",
			spellCheck: !1,
			error: B,
			...B ? { errorMessage: E } : {},
			onChange: (e) => {
				I(e.target.value), R(!1);
			},
			onBlur: () => {
				F !== "" && R(!0);
			},
			onKeyDown: (e) => {
				e.key === "Enter" && (e.preventDefault(), z ? W() : F !== "" && R(!0));
			}
		})]
	});
}
//#endregion
export { u as ConfirmDialog };
