'use client';
import './confirm-dialog.css';
import { Button as e } from "./button.js";
import { Modal as t } from "./modal.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
import { useEffect as a, useRef as o, useState as s } from "react";
//#region src/stories/molecules/ConfirmDialog/ConfirmDialog.tsx
function c({ open: c, title: l, description: u, children: d, onConfirm: f, onCancel: p, onConfirmError: m, secondaryActionLabel: h, onSecondaryAction: g, destructive: _ = !1, confirmLabel: v = "Confirmar", cancelLabel: y = "Cancelar", pendingLabel: b = "Confirmando…", closeLabel: x = "Cerrar", container: S, className: C }) {
	let w = o(null), [T, E] = s(!1);
	a(() => {
		c || E(!1);
	}, [c]);
	let D = () => {
		T || p();
	}, O = async () => {
		if (T) return;
		let e = f();
		if (e instanceof Promise) {
			E(!0);
			try {
				await e;
			} catch (e) {
				m?.(e);
			} finally {
				E(!1);
			}
		}
	};
	return /* @__PURE__ */ r(t, {
		open: c,
		onClose: D,
		title: l,
		closeLabel: x,
		container: S,
		initialFocus: w,
		...u == null ? {} : { description: u },
		footerClassName: ["confirm-dialog__actions", C].filter(Boolean).join(" "),
		footer: /* @__PURE__ */ i(n, { children: [
			/* @__PURE__ */ r(e, {
				ref: w,
				variant: "outline",
				onClick: D,
				disabled: T,
				children: y
			}),
			h && g && /* @__PURE__ */ r(e, {
				variant: "outline",
				onClick: g,
				disabled: T,
				children: h
			}),
			/* @__PURE__ */ r(e, {
				variant: _ ? "outline" : "primary",
				destructive: _,
				onClick: O,
				disabled: T,
				children: T ? b : v
			})
		] }),
		children: d
	});
}
//#endregion
export { c as ConfirmDialog };
