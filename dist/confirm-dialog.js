'use client';
import './confirm-dialog.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Button as t } from "./button.js";
import { Modal as n } from "./modal.js";
import { InputField as r } from "./input-field.js";
import { useEffect as i, useId as a, useRef as o, useState as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/molecules/ConfirmDialog/ConfirmDialog.tsx
function d({ open: d, title: f, description: p, children: m, onConfirm: h, onCancel: g, onConfirmError: _, secondaryActionLabel: v, onSecondaryAction: y, destructive: b = !1, confirmLabel: x, cancelLabel: S, pendingLabel: C, closeLabel: w, confirmPhrase: T, confirmPhraseLabel: E, confirmPhraseMismatch: D, container: O, className: k }) {
	let A = e("confirmDialog"), j = o(null), M = o(null), N = a(), [P, F] = s(!1), [I, L] = s(""), [R, z] = s(!1), B = T === void 0 || I.trim() === T, V = R && !B;
	i(() => {
		d || (F(!1), L(""), z(!1));
	}, [d]);
	let H = () => {
		P || g();
	}, U = async () => {
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
	return /* @__PURE__ */ u(n, {
		open: d,
		onClose: H,
		title: f,
		...w === void 0 ? {} : { closeLabel: w },
		container: O,
		initialFocus: T === void 0 ? j : M,
		...p == null ? {} : { description: p },
		footerClassName: ["confirm-dialog__actions", k].filter(Boolean).join(" "),
		footer: /* @__PURE__ */ u(c, { children: [
			/* @__PURE__ */ l(t, {
				ref: j,
				variant: "outline",
				onClick: H,
				disabled: P,
				children: A("cancel", S)
			}),
			v && y && /* @__PURE__ */ l(t, {
				variant: "outline",
				onClick: y,
				disabled: P,
				children: v
			}),
			/* @__PURE__ */ l(t, {
				variant: b ? "outline" : "primary",
				destructive: b,
				onClick: U,
				disabled: P || !B,
				children: P ? A("pending", C) : x
			})
		] }),
		children: [m, T !== void 0 && /* @__PURE__ */ l(r, {
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
				e.key === "Enter" && (e.preventDefault(), B ? U() : I !== "" && z(!0));
			}
		})]
	});
}
//#endregion
export { d as ConfirmDialog };
