import '../select.css';
import { r as e } from "./brandmessagescontext.js";
import { Icon as t } from "../icon.js";
import { n } from "./portal-container.js";
import { Children as r, createContext as i, forwardRef as a, isValidElement as o, useContext as s, useMemo as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
import { Select as f } from "@base-ui/react/select";
//#region src/stories/messages/es/select.ts
var p = { placeholder: "Seleccionar…" };
//#endregion
//#region src/stories/atoms/Select/Select.tsx
function m(e) {
	return Array.isArray(e.options);
}
var h = i(null);
function g(e, t) {
	r.forEach(e, (e) => {
		if (!o(e)) return;
		let n = e.props ?? {};
		if (e.type === S || typeof n.value == "string" && e.type !== _) {
			typeof n.value == "string" && t.set(n.value, n.children);
			return;
		}
		n.children != null && g(n.children, t);
	});
}
function _({ children: e, onValueChange: t, ...n }) {
	let r = c(() => {
		let t = /* @__PURE__ */ new Map();
		return g(e, t), t;
	}, [e]);
	return /* @__PURE__ */ u(h.Provider, {
		value: r,
		children: /* @__PURE__ */ u(f.Root, {
			onValueChange: t ? (e) => t(e) : void 0,
			...n,
			children: e
		})
	});
}
var v = a(function({ placeholder: e, children: t, ...n }, r) {
	let i = s(h);
	return /* @__PURE__ */ u(f.Value, {
		ref: r,
		...n,
		children: (n) => typeof t == "function" ? t(n) : t ?? (n == null || n === "" ? e ?? null : i?.get(n) ?? n)
	});
}), y = a(function({ className: e, children: t, ...n }, r) {
	let i = ["select__group", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(f.Group, {
		ref: r,
		className: i,
		...n,
		children: t
	});
}), b = a(function({ size: e = "md", className: n, children: r, ...i }, a) {
	let o = [
		"select",
		e === "md" ? "" : `select--${e}`,
		n ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ d(f.Trigger, {
		ref: a,
		className: o,
		...i,
		children: [r, /* @__PURE__ */ u(t, {
			name: "chevron",
			className: "select__icon"
		})]
	});
}), x = a(function({ size: e = "md", container: t, className: r, children: i, side: a = "bottom", align: o = "start", sideOffset: s = -1, ...c }, l) {
	let d = n(t), p = [
		"select__content",
		e === "md" ? "" : `select__content--${e}`,
		r ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(f.Portal, {
		container: d,
		children: /* @__PURE__ */ u(f.Positioner, {
			className: "select__positioner",
			side: a,
			align: o,
			sideOffset: s,
			alignItemWithTrigger: !1,
			children: /* @__PURE__ */ u(f.Popup, {
				ref: l,
				className: p,
				...c,
				children: i
			})
		})
	});
}), S = a(function({ className: e, children: t, ...n }, r) {
	let i = ["select__item", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(f.Item, {
		ref: r,
		className: i,
		...n,
		children: /* @__PURE__ */ u(f.ItemText, { children: t })
	});
}), C = a(function({ className: e, children: t, ...n }, r) {
	let i = ["select__label", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(f.GroupLabel, {
		ref: r,
		className: i,
		...n,
		children: t
	});
}), w = a(function({ className: e, ...t }, n) {
	let r = ["select__separator", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(f.Separator, {
		ref: n,
		className: r,
		...t
	});
});
function T({ value: e, label: t, "aria-label": n }) {
	return /* @__PURE__ */ u(S, {
		value: e,
		"aria-label": n,
		children: t
	}, e);
}
function E({ override: t }) {
	return /* @__PURE__ */ u(l, { children: e("select", p)("placeholder", t) });
}
var D = a(function({ options: e, value: t, defaultValue: n, placeholder: r, disabled: i, readOnly: a, size: o = "md", onValueChange: s, id: c, name: l, required: f, onBlur: p, "aria-label": h, "aria-describedby": g, "aria-invalid": S, container: w, className: D }, O) {
	return /* @__PURE__ */ d(_, {
		value: t,
		defaultValue: n,
		disabled: i,
		readOnly: a,
		name: l,
		required: f,
		onValueChange: s,
		children: [/* @__PURE__ */ u(b, {
			ref: O,
			size: o,
			className: D,
			id: c,
			onBlur: p,
			"aria-label": h,
			"aria-describedby": g,
			"aria-invalid": S || void 0,
			children: /* @__PURE__ */ u(v, { placeholder: /* @__PURE__ */ u(E, { override: r }) })
		}), /* @__PURE__ */ u(x, {
			size: o,
			container: w,
			children: e.map((e, t) => m(e) ? /* @__PURE__ */ d(y, { children: [/* @__PURE__ */ u(C, { children: e.label }), e.options.map(T)] }, `group-${t}`) : T(e))
		})]
	});
}), O = Object.assign(D, {
	Root: _,
	Trigger: b,
	Value: v,
	Content: x,
	Group: y,
	Label: C,
	Item: S,
	Separator: w
});
//#endregion
export { C as a, b as c, S as i, v as l, x as n, _ as o, y as r, w as s, O as t, m as u };
