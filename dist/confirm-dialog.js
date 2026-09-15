'use client';
import './confirm-dialog.css';
import { Button as e } from "./button.js";
import { Modal as t } from "./modal.js";
import { InputField as n } from "./input-field.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { useEffect as o, useId as s, useRef as c, useState as l } from "react";
//#region src/stories/molecules/ConfirmDialog/ConfirmDialog.tsx
function u({ open: u, title: d, description: f, children: p, onConfirm: m, onCancel: h, onConfirmError: g, secondaryActionLabel: _, onSecondaryAction: v, destructive: y = !1, confirmLabel: b = "Confirmar", cancelLabel: x = "Cancelar", pendingLabel: S = "Confirmando…", closeLabel: C = "Cerrar", confirmPhrase: w, confirmPhraseLabel: T, confirmPhraseMismatch: E, container: D, className: O }) {
	let k = c(null), A = c(null), j = s(), [M, N] = l(!1), [P, F] = l(""), [I, L] = l(!1), R = w === void 0 || P.trim() === w, z = I && !R;
	o(() => {
		u || (N(!1), F(""), L(!1));
	}, [u]);
	let B = () => {
		M || h();
	}, V = async () => {
		if (M || !R) return;
		let e = m();
		if (e instanceof Promise) {
			N(!0);
			try {
				await e;
			} catch (e) {
				g?.(e);
			} finally {
				N(!1);
			}
		}
	};
	return /* @__PURE__ */ a(t, {
		open: u,
		onClose: B,
		title: d,
		closeLabel: C,
		container: D,
		initialFocus: w === void 0 ? k : A,
		...f == null ? {} : { description: f },
		footerClassName: ["confirm-dialog__actions", O].filter(Boolean).join(" "),
		footer: /* @__PURE__ */ a(r, { children: [
			/* @__PURE__ */ i(e, {
				ref: k,
				variant: "outline",
				onClick: B,
				disabled: M,
				children: x
			}),
			_ && v && /* @__PURE__ */ i(e, {
				variant: "outline",
				onClick: v,
				disabled: M,
				children: _
			}),
			/* @__PURE__ */ i(e, {
				variant: y ? "outline" : "primary",
				destructive: y,
				onClick: V,
				disabled: M || !R,
				children: M ? S : b
			})
		] }),
		children: [p, w !== void 0 && /* @__PURE__ */ i(n, {
			ref: A,
			id: `${j}-confirm-phrase`,
			className: "confirm-dialog__phrase",
			label: T ?? "",
			value: P,
			disabled: M,
			autoComplete: "off",
			autoCorrect: "off",
			autoCapitalize: "none",
			spellCheck: !1,
			error: z,
			...z ? { errorMessage: E } : {},
			onChange: (e) => {
				F(e.target.value), L(!1);
			},
			onBlur: () => {
				P !== "" && L(!0);
			},
			onKeyDown: (e) => {
				e.key === "Enter" && (e.preventDefault(), R ? V() : P !== "" && L(!0));
			}
		})]
	});
}
//#endregion
export { u as ConfirmDialog };
