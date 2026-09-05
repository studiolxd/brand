'use client';
import './confirm-dialog.css';
import { Button as e } from "./button.js";
import { Modal as t } from "./modal.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
import { useEffect as a, useRef as o, useState as s } from "react";
//#region src/stories/molecules/ConfirmDialog/ConfirmDialog.tsx
function c({ open: c, title: l, description: u, children: d, onConfirm: f, onCancel: p, onConfirmError: m, destructive: h = !1, confirmLabel: g = "Confirmar", cancelLabel: _ = "Cancelar", pendingLabel: v = "Confirmando…", closeLabel: y = "Cerrar", container: b, className: x }) {
	let S = o(null), [C, w] = s(!1);
	a(() => {
		c || w(!1);
	}, [c]);
	let T = () => {
		C || p();
	}, E = async () => {
		if (C) return;
		let e = f();
		if (e instanceof Promise) {
			w(!0);
			try {
				await e;
			} catch (e) {
				m?.(e);
			} finally {
				w(!1);
			}
		}
	};
	return /* @__PURE__ */ r(t, {
		open: c,
		onClose: T,
		title: l,
		closeLabel: y,
		container: b,
		initialFocus: S,
		...u == null ? {} : { description: u },
		footerClassName: ["confirm-dialog__actions", x].filter(Boolean).join(" "),
		footer: /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ r(e, {
			ref: S,
			variant: "ghost",
			onClick: T,
			disabled: C,
			children: _
		}), /* @__PURE__ */ r(e, {
			variant: h ? "outline" : "primary",
			destructive: h,
			onClick: E,
			disabled: C,
			children: C ? v : g
		})] }),
		children: d
	});
}
//#endregion
export { c as ConfirmDialog };
