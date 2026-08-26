import { d as e, m as t, u as n } from "./useRenderElement.js";
import { L as r, R as i, f as a } from "./floating-ui.utils.dom.js";
import * as o from "react";
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/error.js
var s;
process.env.NODE_ENV !== "production" && (s = /* @__PURE__ */ new Set());
function c(...e) {
	if (process.env.NODE_ENV !== "production") {
		let t = e.join(" ");
		s.has(t) || (s.add(t), console.error(`Base UI: ${t}`));
	}
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/composite/root/CompositeRootContext.js
var l = /* @__PURE__ */ o.createContext(void 0);
process.env.NODE_ENV !== "production" && (l.displayName = "CompositeRootContext");
function u(e = !1) {
	let n = o.useContext(l);
	if (n === void 0 && !e) throw Error(process.env.NODE_ENV === "production" ? t(16) : "Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>.");
	return n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/useFocusableWhenDisabled.js
function d(e) {
	let { focusableWhenDisabled: t, disabled: n, composite: r = !1, tabIndex: i = 0, isNativeButton: a } = e, s = r && t !== !1, c = r && t === !1;
	return { props: o.useMemo(() => {
		let e = { onKeyDown(e) {
			n && t && e.key !== "Tab" && e.preventDefault();
		} };
		return r || (e.tabIndex = i, !a && n && (e.tabIndex = t ? i : -1)), (a && (t || s) || !a && n) && (e["aria-disabled"] = n), a && (!t || c) && (e.disabled = n), e;
	}, [
		r,
		n,
		t,
		s,
		c,
		a,
		i
	]) };
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/use-button/useButton.js
function f(t = {}) {
	let { disabled: a = !1, focusableWhenDisabled: s, tabIndex: l = 0, native: f = !0 } = t, m = o.useRef(null), h = u(!0) !== void 0, g = i(() => {
		let e = m.current;
		return !!(e?.tagName === "A" && e?.href);
	}), { props: _ } = d({
		focusableWhenDisabled: s,
		disabled: a,
		composite: h,
		tabIndex: l,
		isNativeButton: f
	});
	process.env.NODE_ENV !== "production" && o.useEffect(() => {
		if (!m.current) return;
		let e = m.current.tagName === "BUTTON";
		f ? e || c("A component that acts as a button was not rendered as a native <button>, which does not match the default. Ensure that the element passed to the `render` prop of the component is a real <button>, or set the `nativeButton` prop on the component to `false`.") : e && c("A component that acts as a button was rendered as a native <button>, which does not match the default. Ensure that the element passed to the `render` prop of the component is not a real <button>, or set the `nativeButton` prop on the component to `true`.");
	}, [f]);
	let v = o.useCallback(() => {
		let e = m.current;
		p(e) && h && a && _.disabled === void 0 && e.disabled && (e.disabled = !1);
	}, [
		a,
		_.disabled,
		h
	]);
	return r(v, [v]), {
		getButtonProps: o.useCallback((t = {}) => {
			let { onClick: r, onMouseDown: i, onKeyUp: o, onKeyDown: s, onPointerDown: c, ...l } = t;
			return e({
				type: f ? "button" : void 0,
				onClick(e) {
					if (a) {
						e.preventDefault();
						return;
					}
					r?.(e);
				},
				onMouseDown(e) {
					a || i?.(e);
				},
				onKeyDown(e) {
					if (a || (n(e), s?.(e)), e.baseUIHandlerPrevented) return;
					let t = e.target === e.currentTarget && !f && !g() && !a, i = e.key === "Enter", o = e.key === " ";
					t && ((o || i) && e.preventDefault(), i && r?.(e));
				},
				onKeyUp(e) {
					a || (n(e), o?.(e)), !e.baseUIHandlerPrevented && e.target === e.currentTarget && !f && !a && e.key === " " && r?.(e);
				},
				onPointerDown(e) {
					if (a) {
						e.preventDefault();
						return;
					}
					c?.(e);
				}
			}, f ? void 0 : { role: "button" }, _, l);
		}, [
			a,
			_,
			f,
			g
		]),
		buttonRef: i((e) => {
			m.current = e, v();
		})
	};
}
function p(e) {
	return a(e) && e.tagName === "BUTTON";
}
//#endregion
export { l as n, u as r, f as t };
