import { k as e } from "./popupStateMapping.js";
import { c as t } from "./useRenderElement.js";
import { R as n, b as r } from "./floating-ui.utils.dom.js";
import { T as i } from "./owner.js";
import * as a from "react";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useRole.js
var o = new Map([
	["select", "listbox"],
	["combobox", "listbox"],
	["label", !1]
]);
function s(n, s = {}) {
	let c = "rootStore" in n ? n.rootStore : n, l = c.useState("open"), u = c.useState("floatingId"), d = c.useState("domReferenceElement"), f = c.useState("floatingElement"), { enabled: p = !0, role: m = "dialog" } = s, h = r(), g = d?.id || h, _ = a.useMemo(() => i(f)?.id || u, [f, u]), v = o.get(m) ?? m, y = e() != null, b = a.useMemo(() => v === "tooltip" || m === "label" ? t : {
		"aria-haspopup": v === "alertdialog" ? "dialog" : v,
		"aria-expanded": "false",
		...v === "listbox" && { role: "combobox" },
		...v === "menu" && y && { role: "menuitem" },
		...m === "select" && { "aria-autocomplete": "none" },
		...m === "combobox" && { "aria-autocomplete": "list" }
	}, [
		v,
		y,
		m
	]), x = a.useMemo(() => v === "tooltip" || m === "label" ? { [`aria-${m === "label" ? "labelledby" : "describedby"}`]: l ? _ : void 0 } : {
		...b,
		"aria-expanded": l ? "true" : "false",
		"aria-controls": l ? _ : void 0,
		...v === "menu" && { id: g }
	}, [
		v,
		_,
		l,
		g,
		m,
		b
	]), S = a.useMemo(() => {
		let e = {
			id: _,
			...v && { role: v }
		};
		return v === "tooltip" || m === "label" ? e : {
			...e,
			...v === "menu" && { "aria-labelledby": g }
		};
	}, [
		v,
		_,
		g,
		m
	]), C = a.useCallback(({ active: e, selected: t }) => {
		let n = {
			role: "option",
			...e && { id: `${_}-fui-option` }
		};
		switch (m) {
			case "select":
			case "combobox": return {
				...n,
				"aria-selected": t
			};
			default:
		}
		return {};
	}, [_, m]);
	return a.useMemo(() => p ? {
		reference: x,
		floating: S,
		item: C,
		trigger: b
	} : {}, [
		p,
		x,
		S,
		b,
		C
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/useEnhancedClickHandler.js
function c(e) {
	let t = a.useRef(""), n = a.useCallback((n) => {
		n.defaultPrevented || (t.current = n.pointerType, e(n, n.pointerType));
	}, [e]);
	return {
		onClick: a.useCallback((n) => {
			if (n.detail === 0) {
				e(n, "keyboard");
				return;
			}
			"pointerType" in n && e(n, n.pointerType), e(n, t.current), t.current = "";
		}, [e]),
		onPointerDown: n
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/useOpenInteractionType.js
function l(e) {
	let [t, r] = a.useState(null), i = n((t, n) => {
		e || r(n);
	}), o = a.useCallback(() => {
		r(null);
	}, []), { onClick: s, onPointerDown: l } = c(i);
	return a.useMemo(() => ({
		openMethod: t,
		reset: o,
		triggerProps: {
			onClick: s,
			onPointerDown: l
		}
	}), [
		t,
		o,
		s,
		l
	]);
}
//#endregion
export { s as n, l as t };
