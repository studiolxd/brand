import { m as e, t } from "./useRenderElement.js";
import { L as n } from "./floating-ui.utils.dom.js";
import { t as r } from "./useBaseUiId.js";
import { Icon as i } from "../icon.js";
import { a, c as o, i as s, n as c, o as l, r as u, s as d, t as f } from "./SelectItemText.js";
import { t as p } from "./Separator.js";
import * as m from "react";
import { Children as h, createContext as g, forwardRef as _, isValidElement as v, useContext as y, useMemo as b } from "react";
import { jsx as x, jsxs as S } from "react/jsx-runtime";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/group/SelectGroupContext.js
var C = /* @__PURE__ */ m.createContext(void 0);
process.env.NODE_ENV !== "production" && (C.displayName = "SelectGroupContext");
function w() {
	let t = m.useContext(C);
	if (t === void 0) throw Error(process.env.NODE_ENV === "production" ? e(56) : "Base UI: SelectGroupContext is missing. SelectGroup parts must be placed within <Select.Group>.");
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/group/SelectGroup.js
var T = /* @__PURE__ */ m.forwardRef(function(e, n) {
	let { className: r, render: i, ...a } = e, [o, s] = m.useState(), c = m.useMemo(() => ({
		labelId: o,
		setLabelId: s
	}), [o, s]), l = t("div", e, {
		ref: n,
		props: [{
			role: "group",
			"aria-labelledby": o
		}, a]
	});
	return /* @__PURE__ */ x(C.Provider, {
		value: c,
		children: l
	});
});
process.env.NODE_ENV !== "production" && (T.displayName = "SelectGroup");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/group-label/SelectGroupLabel.js
var E = /* @__PURE__ */ m.forwardRef(function(e, i) {
	let { className: a, render: o, id: s, ...c } = e, { setLabelId: l } = w(), u = r(s);
	return n(() => {
		l(u);
	}, [u, l]), t("div", e, {
		ref: i,
		props: [{ id: u }, c]
	});
});
process.env.NODE_ENV !== "production" && (E.displayName = "SelectGroupLabel");
//#endregion
//#region src/stories/atoms/Select/Select.tsx
var D = g(null);
function O(e, t) {
	h.forEach(e, (e) => {
		if (!v(e)) return;
		let n = e.props ?? {};
		if (e.type === P || typeof n.value == "string" && e.type !== k) {
			typeof n.value == "string" && t.set(n.value, n.children);
			return;
		}
		n.children != null && O(n.children, t);
	});
}
function k({ children: e, onValueChange: t, ...n }) {
	let r = b(() => {
		let t = /* @__PURE__ */ new Map();
		return O(e, t), t;
	}, [e]);
	return /* @__PURE__ */ x(D.Provider, {
		value: r,
		children: /* @__PURE__ */ x(o, {
			onValueChange: t ? (e) => t(e) : void 0,
			...n,
			children: e
		})
	});
}
var A = _(function({ placeholder: e, children: t, ...n }, r) {
	let i = y(D);
	return /* @__PURE__ */ x(l, {
		ref: r,
		...n,
		children: (n) => typeof t == "function" ? t(n) : t ?? (n == null || n === "" ? e ?? null : i?.get(n) ?? n)
	});
}), j = T, M = _(function({ size: e = "md", className: t, children: n, ...r }, a) {
	return /* @__PURE__ */ S(d, {
		ref: a,
		className: [
			"select",
			e === "md" ? "" : `select--${e}`,
			t ?? ""
		].filter(Boolean).join(" "),
		...r,
		children: [n, /* @__PURE__ */ x(i, {
			name: "chevron",
			className: "select__icon",
			size: e === "sm" ? "xs" : e === "lg" ? "md" : "sm"
		})]
	});
}), N = _(function({ size: e = "md", container: t, className: n, children: r, side: i = "bottom", align: o = "start", sideOffset: c = -1, ...l }, d) {
	return /* @__PURE__ */ x(a, {
		container: t,
		children: /* @__PURE__ */ x(s, {
			className: "select__positioner",
			side: i,
			align: o,
			sideOffset: c,
			alignItemWithTrigger: !1,
			children: /* @__PURE__ */ x(u, {
				ref: d,
				className: [
					"select__content",
					e === "md" ? "" : `select__content--${e}`,
					n ?? ""
				].filter(Boolean).join(" "),
				...l,
				children: r
			})
		})
	});
}), P = _(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ x(c, {
		ref: r,
		className: ["select__item", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: /* @__PURE__ */ x(f, { children: t })
	});
}), F = _(function({ className: e, children: t, ...n }, r) {
	return /* @__PURE__ */ x(E, {
		ref: r,
		className: ["select__label", e ?? ""].filter(Boolean).join(" "),
		...n,
		children: t
	});
}), I = _(function({ className: e, ...t }, n) {
	return /* @__PURE__ */ x(p, {
		ref: n,
		className: ["select__separator", e ?? ""].filter(Boolean).join(" "),
		...t
	});
});
function L({ options: e, value: t, defaultValue: n, placeholder: r = "Seleccionar…", disabled: i, readOnly: a, size: o = "md", onValueChange: s, id: c, "aria-label": l, "aria-describedby": u, "aria-invalid": d, container: f }) {
	return /* @__PURE__ */ S(k, {
		value: t,
		defaultValue: n,
		disabled: i,
		readOnly: a,
		onValueChange: s,
		children: [/* @__PURE__ */ x(M, {
			size: o,
			id: c,
			"aria-label": l,
			"aria-describedby": u,
			"aria-invalid": d || void 0,
			children: /* @__PURE__ */ x(A, { placeholder: r })
		}), /* @__PURE__ */ x(N, {
			size: o,
			container: f,
			children: e.map(({ value: e, label: t, "aria-label": n }) => /* @__PURE__ */ x(P, {
				value: e,
				"aria-label": n,
				children: t
			}, e))
		})]
	});
}
var R = Object.assign(L, {
	Root: k,
	Trigger: M,
	Value: A,
	Content: N,
	Group: j,
	Label: F,
	Item: P,
	Separator: I
});
//#endregion
export { F as a, M as c, P as i, A as l, N as n, k as o, j as r, I as s, R as t };
