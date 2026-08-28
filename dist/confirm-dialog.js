'use client';
import './confirm-dialog.css';
import { Button as e } from "./button.js";
import { Inline as t } from "./inline.js";
import { Modal as n } from "./modal.js";
import { useEffect as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/ConfirmDialog/ConfirmDialog.tsx
function c({ open: c, title: l, description: u, children: d, onConfirm: f, onCancel: p, onConfirmError: m, destructive: h = !1, confirmLabel: g = "Confirmar", cancelLabel: _ = "Cancelar", pendingLabel: v = "Confirmando…", closeLabel: y = "Cerrar", container: b, className: x }) {
	let S = i(null), [C, w] = a(!1);
	r(() => {
		if (!c) return;
		let e = requestAnimationFrame(() => S.current?.focus());
		return () => cancelAnimationFrame(e);
	}, [c]), r(() => {
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
	return /* @__PURE__ */ s(n, {
		open: c,
		onClose: T,
		title: l,
		closeLabel: y,
		container: b,
		...u == null ? {} : { description: u },
		children: [d, /* @__PURE__ */ s(t, {
			gap: "sm",
			justify: "end",
			className: ["confirm-dialog__actions", x].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ o(e, {
				ref: S,
				variant: "ghost",
				onClick: T,
				disabled: C,
				children: _
			}), /* @__PURE__ */ o(e, {
				variant: h ? "outline" : "primary",
				destructive: h,
				onClick: E,
				disabled: C,
				children: C ? v : g
			})]
		})]
	});
}
//#endregion
export { c as ConfirmDialog };
