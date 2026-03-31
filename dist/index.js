import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
import r from "embla-carousel-react";
import * as i from "react";
import { useState as a } from "react";
import "react-dom";
import * as o from "@radix-ui/react-select";
import { getCountryCallingCode as s } from "libphonenumber-js";
import c from "react-phone-number-input";
import l from "embla-carousel-auto-scroll";
//#region src/stories/atoms/Arrow/Arrow.tsx
function u({ size: e = "md", className: n }) {
	return /* @__PURE__ */ t("svg", {
		className: [
			"arrow",
			e ? `arrow--${e}` : "",
			n ?? ""
		].filter(Boolean).join(" "),
		"aria-hidden": "true",
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "-0.5 5.5 27 13",
		fill: "none",
		stroke: "currentColor",
		children: /* @__PURE__ */ t("path", {
			vectorEffect: "non-scaling-stroke",
			strokeWidth: "1",
			d: "M0 12 H26 M20 6 L26 12 L20 18"
		})
	});
}
//#endregion
//#region src/stories/atoms/Avatar/Avatar.tsx
function d({ src: e, alt: n, size: r = "md", className: i }) {
	return /* @__PURE__ */ t("img", {
		src: e,
		alt: n,
		className: [
			"avatar",
			`avatar--${r}`,
			i
		].filter(Boolean).join(" ")
	});
}
//#endregion
//#region src/stories/atoms/Button/Button.tsx
function f({ variant: e = "primary", size: n = "md", block: r = !1, children: i, type: a = "button", disabled: o, onClick: s, href: c, external: l = !1 }) {
	let u = [
		"button",
		`button--${e}`,
		n === "md" ? "" : `button--${n}`,
		r ? "button--block" : ""
	].filter(Boolean).join(" ");
	return c === void 0 ? /* @__PURE__ */ t("button", {
		className: u,
		type: a,
		disabled: o,
		onClick: s,
		children: i
	}) : /* @__PURE__ */ t("a", {
		className: u,
		href: o ? void 0 : c,
		"aria-disabled": o ? !0 : void 0,
		onClick: s,
		...l ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: i
	});
}
//#endregion
//#region src/stories/atoms/Chevron/Chevron.tsx
function p({ size: e, className: n }) {
	return /* @__PURE__ */ t("svg", {
		className: [
			"chevron",
			e ? `chevron--${e}` : "",
			n ?? ""
		].filter(Boolean).join(" "),
		"aria-hidden": "true",
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 4 12 16",
		fill: "none",
		stroke: "currentColor",
		children: /* @__PURE__ */ t("path", {
			vectorEffect: "non-scaling-stroke",
			strokeWidth: "1",
			d: "M2 6 L8 12 L2 18"
		})
	});
}
//#endregion
//#region src/stories/atoms/Carousel/Carousel.tsx
function m({ children: e, options: i, plugins: a, hideButtons: o, className: s, slideSize: c, gradientColor: l }) {
	let [u, d] = r({
		loop: !0,
		...i
	}, a), f = {
		...c ? { "--carousel-slide-size": c } : {},
		...l ? { "--carousel-gradient-color": l } : {}
	};
	return /* @__PURE__ */ n("div", {
		className: ["carousel", s].filter(Boolean).join(" "),
		style: f,
		children: [
			!o && /* @__PURE__ */ t("button", {
				className: "carousel__btn carousel__btn--prev",
				onClick: () => d?.scrollPrev(),
				"aria-label": "Anterior",
				type: "button",
				children: /* @__PURE__ */ t(p, {
					className: "carousel__chevron carousel__chevron--prev",
					size: "lg"
				})
			}),
			/* @__PURE__ */ t("div", {
				className: "carousel__viewport",
				ref: u,
				children: /* @__PURE__ */ t("div", {
					className: "carousel__track",
					children: e
				})
			}),
			!o && /* @__PURE__ */ t("button", {
				className: "carousel__btn carousel__btn--next",
				onClick: () => d?.scrollNext(),
				"aria-label": "Siguiente",
				type: "button",
				children: /* @__PURE__ */ t(p, {
					className: "carousel__chevron",
					size: "lg"
				})
			})
		]
	});
}
function h({ children: e, className: n }) {
	return /* @__PURE__ */ t("div", {
		className: ["carousel__slide", n].filter(Boolean).join(" "),
		children: e
	});
}
//#endregion
//#region node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function g(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function _(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = g(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : g(e[t], null);
			}
		};
	};
}
function v(...e) {
	return i.useCallback(_(...e), e);
}
//#endregion
//#region node_modules/@radix-ui/react-context/dist/index.mjs
function y(e, n = []) {
	let r = [];
	function a(n, a) {
		let o = i.createContext(a), s = r.length;
		r = [...r, a];
		let c = (n) => {
			let { scope: r, children: a, ...c } = n, l = r?.[e]?.[s] || o, u = i.useMemo(() => c, Object.values(c));
			return /* @__PURE__ */ t(l.Provider, {
				value: u,
				children: a
			});
		};
		c.displayName = n + "Provider";
		function l(t, r) {
			let c = r?.[e]?.[s] || o, l = i.useContext(c);
			if (l) return l;
			if (a !== void 0) return a;
			throw Error(`\`${t}\` must be used within \`${n}\``);
		}
		return [c, l];
	}
	let o = () => {
		let t = r.map((e) => i.createContext(e));
		return function(n) {
			let r = n?.[e] || t;
			return i.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		};
	};
	return o.scopeName = e, [a, b(o, ...n)];
}
function b(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = () => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return i.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		};
	};
	return n.scopeName = t.scopeName, n;
}
typeof window < "u" && window.document && window.document.createElement;
function x(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var S = globalThis?.document ? i.useLayoutEffect : () => {}, ee = i.useInsertionEffect || S;
function te({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
	let [a, o, s] = ne({
		defaultProp: t,
		onChange: n
	}), c = e !== void 0, l = c ? e : a;
	{
		let t = i.useRef(e !== void 0);
		i.useEffect(() => {
			let e = t.current;
			e !== c && console.warn(`${r} is changing from ${e ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`), t.current = c;
		}, [c, r]);
	}
	return [l, i.useCallback((t) => {
		if (c) {
			let n = re(t) ? t(e) : t;
			n !== e && s.current?.(n);
		} else o(t);
	}, [
		c,
		e,
		o,
		s
	])];
}
function ne({ defaultProp: e, onChange: t }) {
	let [n, r] = i.useState(e), a = i.useRef(n), o = i.useRef(t);
	return ee(() => {
		o.current = t;
	}, [t]), i.useEffect(() => {
		a.current !== n && (o.current?.(n), a.current = n);
	}, [n, a]), [
		n,
		r,
		o
	];
}
function re(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/@radix-ui/react-use-previous/dist/index.mjs
function ie(e) {
	let t = i.useRef({
		value: e,
		previous: e
	});
	return i.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
//#endregion
//#region node_modules/@radix-ui/react-use-size/dist/index.mjs
function ae(e) {
	let [t, n] = i.useState(void 0);
	return S(() => {
		if (e) {
			n({
				width: e.offsetWidth,
				height: e.offsetHeight
			});
			let t = new ResizeObserver((t) => {
				if (!Array.isArray(t) || !t.length) return;
				let r = t[0], i, a;
				if ("borderBoxSize" in r) {
					let e = r.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					i = t.inlineSize, a = t.blockSize;
				} else i = e.offsetWidth, a = e.offsetHeight;
				n({
					width: i,
					height: a
				});
			});
			return t.observe(e, { box: "border-box" }), () => t.unobserve(e);
		} else n(void 0);
	}, [e]), t;
}
//#endregion
//#region node_modules/@radix-ui/react-presence/dist/index.mjs
function oe(e, t) {
	return i.useReducer((e, n) => t[e][n] ?? e, e);
}
var se = (e) => {
	let { present: t, children: n } = e, r = ce(t), a = typeof n == "function" ? n({ present: r.isPresent }) : i.Children.only(n), o = v(r.ref, le(a));
	return typeof n == "function" || r.isPresent ? i.cloneElement(a, { ref: o }) : null;
};
se.displayName = "Presence";
function ce(e) {
	let [t, n] = i.useState(), r = i.useRef(null), a = i.useRef(e), o = i.useRef("none"), [s, c] = oe(e ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return i.useEffect(() => {
		let e = C(r.current);
		o.current = s === "mounted" ? e : "none";
	}, [s]), S(() => {
		let t = r.current, n = a.current;
		if (n !== e) {
			let r = o.current, i = C(t);
			e ? c("MOUNT") : i === "none" || t?.display === "none" ? c("UNMOUNT") : c(n && r !== i ? "ANIMATION_OUT" : "UNMOUNT"), a.current = e;
		}
	}, [e, c]), S(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, i = (i) => {
				let o = C(r.current).includes(CSS.escape(i.animationName));
				if (i.target === t && o && (c("ANIMATION_END"), !a.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, s = (e) => {
				e.target === t && (o.current = C(r.current));
			};
			return t.addEventListener("animationstart", s), t.addEventListener("animationcancel", i), t.addEventListener("animationend", i), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", s), t.removeEventListener("animationcancel", i), t.removeEventListener("animationend", i);
			};
		} else c("ANIMATION_END");
	}, [t, c]), {
		isPresent: ["mounted", "unmountSuspended"].includes(s),
		ref: i.useCallback((e) => {
			r.current = e ? getComputedStyle(e) : null, n(e);
		}, [])
	};
}
function C(e) {
	return e?.animationName || "none";
}
function le(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function ue(e) {
	let n = /* @__PURE__ */ de(e), r = i.forwardRef((e, r) => {
		let { children: a, ...o } = e, s = i.Children.toArray(a), c = s.find(pe);
		if (c) {
			let e = c.props.children, a = s.map((t) => t === c ? i.Children.count(e) > 1 ? i.Children.only(null) : i.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ t(n, {
				...o,
				ref: r,
				children: i.isValidElement(e) ? i.cloneElement(e, void 0, a) : null
			});
		}
		return /* @__PURE__ */ t(n, {
			...o,
			ref: r,
			children: a
		});
	});
	return r.displayName = `${e}.Slot`, r;
}
/* @__NO_SIDE_EFFECTS__ */
function de(e) {
	let t = i.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (i.isValidElement(n)) {
			let e = he(n), a = me(r, n.props);
			return n.type !== i.Fragment && (a.ref = t ? _(t, e) : e), i.cloneElement(n, a);
		}
		return i.Children.count(n) > 1 ? i.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var fe = Symbol("radix.slottable");
function pe(e) {
	return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === fe;
}
function me(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function he(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-primitive/dist/index.mjs
var w = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, n) => {
	let r = /* @__PURE__ */ ue(`Primitive.${n}`), a = i.forwardRef((e, i) => {
		let { asChild: a, ...o } = e, s = a ? r : n;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ t(s, {
			...o,
			ref: i
		});
	});
	return a.displayName = `Primitive.${n}`, {
		...e,
		[n]: a
	};
}, {}), T = "Checkbox", [ge, _e] = y(T), [ve, E] = ge(T);
function ye(e) {
	let { __scopeCheckbox: n, checked: r, children: a, defaultChecked: o, disabled: s, form: c, name: l, onCheckedChange: u, required: d, value: f = "on", internal_do_not_use_render: p } = e, [m, h] = te({
		prop: r,
		defaultProp: o ?? !1,
		onChange: u,
		caller: T
	}), [g, _] = i.useState(null), [v, y] = i.useState(null), b = i.useRef(!1), x = g ? !!c || !!g.closest("form") : !0, S = {
		checked: m,
		disabled: s,
		setChecked: h,
		control: g,
		setControl: _,
		name: l,
		form: c,
		value: f,
		hasConsumerStoppedPropagationRef: b,
		required: d,
		defaultChecked: P(o) ? !1 : o,
		isFormControl: x,
		bubbleInput: v,
		setBubbleInput: y
	};
	return /* @__PURE__ */ t(ve, {
		scope: n,
		...S,
		children: be(p) ? p(S) : a
	});
}
var D = "CheckboxTrigger", O = i.forwardRef(({ __scopeCheckbox: e, onKeyDown: n, onClick: r, ...a }, o) => {
	let { control: s, value: c, disabled: l, checked: u, required: d, setControl: f, setChecked: p, hasConsumerStoppedPropagationRef: m, isFormControl: h, bubbleInput: g } = E(D, e), _ = v(o, f), y = i.useRef(u);
	return i.useEffect(() => {
		let e = s?.form;
		if (e) {
			let t = () => p(y.current);
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [s, p]), /* @__PURE__ */ t(w.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": P(u) ? "mixed" : u,
		"aria-required": d,
		"data-state": F(u),
		"data-disabled": l ? "" : void 0,
		disabled: l,
		value: c,
		...a,
		ref: _,
		onKeyDown: x(n, (e) => {
			e.key === "Enter" && e.preventDefault();
		}),
		onClick: x(r, (e) => {
			p((e) => P(e) ? !0 : !e), g && h && (m.current = e.isPropagationStopped(), m.current || e.stopPropagation());
		})
	});
});
O.displayName = D;
var k = i.forwardRef((r, i) => {
	let { __scopeCheckbox: a, name: o, checked: s, defaultChecked: c, required: l, disabled: u, value: d, onCheckedChange: f, form: p, ...m } = r;
	return /* @__PURE__ */ t(ye, {
		__scopeCheckbox: a,
		checked: s,
		defaultChecked: c,
		disabled: u,
		required: l,
		onCheckedChange: f,
		name: o,
		form: p,
		value: d,
		internal_do_not_use_render: ({ isFormControl: r }) => /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ t(O, {
			...m,
			ref: i,
			__scopeCheckbox: a
		}), r && /* @__PURE__ */ t(N, { __scopeCheckbox: a })] })
	});
});
k.displayName = T;
var A = "CheckboxIndicator", j = i.forwardRef((e, n) => {
	let { __scopeCheckbox: r, forceMount: i, ...a } = e, o = E(A, r);
	return /* @__PURE__ */ t(se, {
		present: i || P(o.checked) || o.checked === !0,
		children: /* @__PURE__ */ t(w.span, {
			"data-state": F(o.checked),
			"data-disabled": o.disabled ? "" : void 0,
			...a,
			ref: n,
			style: {
				pointerEvents: "none",
				...e.style
			}
		})
	});
});
j.displayName = A;
var M = "CheckboxBubbleInput", N = i.forwardRef(({ __scopeCheckbox: e, ...n }, r) => {
	let { control: a, hasConsumerStoppedPropagationRef: o, checked: s, defaultChecked: c, required: l, disabled: u, name: d, value: f, form: p, bubbleInput: m, setBubbleInput: h } = E(M, e), g = v(r, h), _ = ie(s), y = ae(a);
	i.useEffect(() => {
		let e = m;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set, r = !o.current;
		if (_ !== s && n) {
			let t = new Event("click", { bubbles: r });
			e.indeterminate = P(s), n.call(e, P(s) ? !1 : s), e.dispatchEvent(t);
		}
	}, [
		m,
		_,
		s,
		o
	]);
	let b = i.useRef(P(s) ? !1 : s);
	return /* @__PURE__ */ t(w.input, {
		type: "checkbox",
		"aria-hidden": !0,
		defaultChecked: c ?? b.current,
		required: l,
		disabled: u,
		name: d,
		value: f,
		form: p,
		...n,
		tabIndex: -1,
		ref: g,
		style: {
			...n.style,
			...y,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
});
N.displayName = M;
function be(e) {
	return typeof e == "function";
}
function P(e) {
	return e === "indeterminate";
}
function F(e) {
	return P(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region src/stories/atoms/Checkbox/Checkbox.tsx
function I({ checked: e, defaultChecked: n, disabled: r, id: i, name: a, value: o, required: s, "aria-label": c, "aria-labelledby": l, onCheckedChange: u }) {
	return /* @__PURE__ */ t(k, {
		className: "checkbox",
		checked: e,
		defaultChecked: n,
		disabled: r,
		id: i,
		name: a,
		value: o,
		required: s,
		"aria-label": c,
		"aria-labelledby": l,
		onCheckedChange: u,
		children: /* @__PURE__ */ t(j, { className: "checkbox__indicator" })
	});
}
//#endregion
//#region src/stories/atoms/Hamburger/Hamburger.tsx
function L({ isOpen: e = !1, onClick: r, label: i = "Menu" }) {
	return /* @__PURE__ */ n("button", {
		type: "button",
		className: "hamburger",
		"aria-label": i,
		"aria-expanded": e,
		onClick: r,
		children: [
			/* @__PURE__ */ t("span", {
				className: "hamburger__bar",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ t("span", {
				className: "hamburger__bar",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ t("span", {
				className: "hamburger__bar",
				"aria-hidden": "true"
			})
		]
	});
}
//#endregion
//#region src/stories/atoms/Heading/Heading.tsx
function R({ level: e = 2, className: n, children: r }) {
	return /* @__PURE__ */ t(`h${e}`, {
		className: [
			"heading",
			`heading--${e}`,
			n
		].filter(Boolean).join(" "),
		children: r
	});
}
//#endregion
//#region src/stories/atoms/Input/Input.tsx
function xe({ type: e = "text", placeholder: n, value: r, defaultValue: i, disabled: a, readOnly: o, size: s = "md", error: c = !1, id: l, name: u, describedBy: d, onChange: f, onBlur: p, onFocus: m }) {
	return /* @__PURE__ */ t("input", {
		className: [
			"input",
			s === "md" ? "" : `input--${s}`,
			c ? "input--error" : ""
		].filter(Boolean).join(" "),
		type: e,
		placeholder: n,
		value: r,
		defaultValue: i,
		disabled: a,
		readOnly: o,
		id: l,
		name: u,
		"aria-invalid": c || void 0,
		"aria-describedby": d,
		onChange: f,
		onBlur: p,
		onFocus: m
	});
}
//#endregion
//#region src/stories/atoms/InputPhone/InputPhone.tsx
function Se({ value: e, onChange: r, options: i, disabled: a, dark: c }) {
	let l = "__intl__", u = (e) => e ?? l, d = (e) => e === l ? void 0 : e;
	return /* @__PURE__ */ n(o.Root, {
		value: u(e),
		onValueChange: (e) => r(d(e)),
		disabled: a,
		children: [/* @__PURE__ */ n(o.Trigger, {
			className: "input-phone__country",
			"aria-label": "País",
			children: [/* @__PURE__ */ t(o.Value, { children: e ? `+${s(e)}` : "🌐" }), /* @__PURE__ */ t(o.Icon, {
				asChild: !0,
				children: /* @__PURE__ */ t(p, {
					className: "input-phone__country-icon",
					size: "sm"
				})
			})]
		}), /* @__PURE__ */ t(o.Portal, { children: /* @__PURE__ */ t(o.Content, {
			className: ["input-phone__country-content", c ? "input-phone__country-content--dark" : ""].filter(Boolean).join(" "),
			position: "popper",
			children: /* @__PURE__ */ t(o.Viewport, { children: i.map(({ value: e, label: n }) => /* @__PURE__ */ t(o.Item, {
				value: u(e),
				className: "input-phone__country-item",
				children: /* @__PURE__ */ t(o.ItemText, { children: n })
			}, u(e))) })
		}) })]
	});
}
function Ce({ value: e, defaultCountry: n = "ES", placeholder: r, disabled: i, error: a = !1, dark: o, id: s, name: l, describedBy: u, onChange: d, onBlur: f }) {
	return /* @__PURE__ */ t(c, {
		className: ["input-phone", a ? "input-phone--error" : ""].filter(Boolean).join(" "),
		value: e,
		defaultCountry: n,
		placeholder: r,
		disabled: i,
		id: s,
		name: l,
		inputComponent: we,
		countrySelectComponent: Se,
		countrySelectProps: { dark: o },
		onChange: (e) => d?.(e),
		onBlur: f,
		numberInputProps: { "aria-describedby": u }
	});
}
var we = (e) => /* @__PURE__ */ t("input", {
	className: "input-phone__number",
	...e
});
we.displayName = "InputPhoneField";
//#endregion
//#region src/stories/atoms/Label/Label.tsx
function z({ htmlFor: e, children: n, hidden: r = !1 }) {
	return /* @__PURE__ */ t("label", {
		htmlFor: e,
		className: ["label", r ? "visually-hidden" : ""].filter(Boolean).join(" "),
		children: n
	});
}
//#endregion
//#region src/stories/atoms/Link/Link.tsx
function B({ href: e, children: n, external: r = !1, className: i, onClick: a }) {
	return /* @__PURE__ */ t("a", {
		href: e,
		className: i,
		onClick: a,
		...r ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: n
	});
}
//#endregion
//#region src/stories/atoms/List/List.tsx
function Te({ type: e = "unordered", children: n }) {
	return /* @__PURE__ */ t(e === "ordered" ? "ol" : "ul", {
		className: `list list--${e}`,
		children: n
	});
}
//#endregion
//#region src/stories/atoms/Logo/Logo.tsx
function V({ width: r, height: i, className: a, dark: o = !1 }) {
	return /* @__PURE__ */ t(e, { children: /* @__PURE__ */ t("svg", {
		version: "1.1",
		xmlns: "http://www.w3.org/2000/svg",
		xmlnsXlink: "http://www.w3.org/1999/xlink",
		x: "0px",
		y: "0px",
		viewBox: "0 0 925.5 265.5",
		xmlSpace: "preserve",
		width: r,
		height: i,
		fill: "currentColor",
		className: [
			"logo",
			o ? "logo--dark" : "",
			a
		].filter(Boolean).join(" "),
		"aria-hidden": "true",
		children: /* @__PURE__ */ n("g", { children: [/* @__PURE__ */ n("g", { children: [
			/* @__PURE__ */ t("path", { d: "M108.2,203.5c-7,0-13-1.1-18.1-3.4c-5.1-2.3-9.4-5.2-13-8.9l-10.5,9.9H62l8.3-39.2h4.6 c3.6,24.7,15.1,37,34.6,37c7.6,0,14-1.6,19.2-4.7c5.2-3.1,9.2-7.1,11.9-11.8c2.7-4.7,4-9.4,4-13.9c0-5.3-1.4-9.7-4.2-13.2 c-2.8-3.5-6.4-6.6-10.9-9.2c-4.4-2.6-9.1-5.2-14.1-7.6c-5-2.5-9.7-5.2-14.1-8.4c-4.4-3.1-8-7-10.9-11.7 c-2.8-4.7-4.2-10.4-4.2-17.3c0-7.1,1.5-13.7,4.6-19.9c3.1-6.1,7.7-11.1,13.9-14.9c6.2-3.8,14-5.7,23.5-5.7c6.6,0,12.2,1,16.7,2.9 c4.5,1.9,8.2,4.3,11,7.3l7.7-8.5h4.6L161,99h-4.6c0-6.7-1.1-12.6-3.4-17.7c-2.3-5-5.5-9-9.8-11.8c-4.2-2.8-9.4-4.2-15.5-4.2 c-4.4,0-8.9,0.9-13.5,2.6c-4.6,1.7-8.5,4.2-11.6,7.5c-3.1,3.3-4.7,7.4-4.7,12.1c0,4.7,1.4,8.6,4.3,11.8c2.9,3.2,6.6,6,11,8.5 c4.5,2.5,9.3,4.9,14.4,7.5c5.1,2.5,9.9,5.5,14.4,8.9c4.5,3.4,8.2,7.7,11,12.7c2.9,5,4.3,11.3,4.3,18.8c0,9.4-2.2,17.8-6.5,24.9 c-4.4,7.2-10.2,12.8-17.6,16.8C125.9,201.5,117.5,203.5,108.2,203.5z" }),
			/* @__PURE__ */ t("path", { d: "M171.7,203.5c-4.5,0-8-1.2-10.5-3.5c-2.5-2.3-3.7-5.4-3.7-9.2c0-1,0.1-2,0.3-2.9c0.2-1,0.3-1.9,0.5-2.8 l21.2-87.6h19.7l-21.5,85.7c-0.4,1.6-0.6,2.9-0.7,3.9c-0.1,1-0.2,1.8-0.2,2.4c0,3.1,1.3,4.6,4,4.6c2.9,0,6.1-1.8,9.6-5.3 c3.4-3.6,7.2-9.6,11.4-18.2l3.7,1.7c-2.3,5.2-5.1,10.1-8.4,14.9c-3.3,4.8-7,8.7-11.1,11.8C181.7,201.9,176.9,203.5,171.7,203.5z M161.2,122.9v-4.6h49.1v4.6H161.2z" }),
			/* @__PURE__ */ t("path", { d: "M225.4,203.3c-4.7,0-8.7-1.2-12.1-3.6c-3.4-2.4-5.2-6.2-5.2-11.5c0-2.3,0.4-5,1.1-8.1l15.1-61.8h19.1 l-15.8,66.1c-0.1,0.9-0.3,1.7-0.5,2.5c-0.2,0.8-0.3,1.6-0.3,2.3c0,2.1,0.6,3.6,1.9,4.6c1.3,1,2.9,1.5,4.9,1.5 c2.8,0,5.7-0.9,8.6-2.6c2.9-1.7,5.8-4.1,8.5-7.3c2.7-3.1,5.1-6.7,7.3-10.8c2.1-4,3.9-8.5,5.2-13.2l-4,22.1H258 c-3.8,5-8.4,9.6-13.9,13.7C238.6,201.2,232.4,203.3,225.4,203.3z M209.8,122.9v-4.6H239v4.6H209.8z M273.6,203.3 c-2.3,0-4.7-0.5-7-1.6c-2.3-1-4.2-2.8-5.7-5.3c-1.5-2.5-2.2-6-2.2-10.4c0-1.7,0.2-3.7,0.5-5.9c0.3-2.2,0.8-4.7,1.4-7.4l13.1-54.5 h18.8L278.6,174c-0.9,3.8-1.5,7-2,9.7c-0.5,2.6-0.7,4.8-0.7,6.3c0,3.7,1.2,5.5,3.7,5.5c2.6,0,5.4-1.9,8.6-5.8 c3.1-3.9,6.4-9.4,9.8-16.5l3.7,1.7c-2.5,5.9-5.1,10.9-7.9,15.2c-2.8,4.2-5.9,7.5-9.1,9.8C281.3,202.2,277.7,203.3,273.6,203.3z" }),
			/* @__PURE__ */ t("path", { d: "M322.7,203.5c-5.4,0-10.4-1.3-15.1-4c-4.7-2.6-8.4-6.4-11.2-11.4c-2.8-5-4.2-11-4.2-18.1 c0-7.1,1.4-13.9,4.3-20.4c2.9-6.5,6.7-12.3,11.4-17.3c4.7-5,9.9-9,15.6-11.9c5.7-2.9,11.4-4.3,17-4.3c5.4,0,9.6,1.3,12.5,3.8 c2.9,2.5,5.2,5.7,6.8,9.7h1.3l-4.2,16.7c0.2-1.2,0.4-2.4,0.5-3.5c0.1-1.1,0.1-2.1,0.1-2.9c0-5.2-1.5-9.5-4.4-13.1 c-2.9-3.6-6.6-5.3-10.9-5.3c-3.7,0-7.1,1.4-10.1,4c-3.1,2.7-5.8,6.2-8.1,10.6c-2.3,4.4-4.3,9.1-6,14.3c-1.7,5.2-2.9,10.2-3.7,15.3 c-0.8,5-1.2,9.5-1.2,13.4c0,6.6,1.1,11.4,3.4,14.3c2.3,2.9,5.5,4.3,9.7,4.3c2.3,0,4.9-0.6,7.7-1.9c2.8-1.3,5.7-3.9,8.7-7.9 c3-4,5.9-10,8.6-17.9l-2.2,18.4h-1.3c-2.3,4.3-5.6,7.9-9.8,10.9C333.8,202,328.7,203.5,322.7,203.5z M362.5,203.5 c-4.2,0-7.5-1.2-10.1-3.7c-2.6-2.5-3.9-6.6-3.9-12.3c0-1.8,0.2-4,0.5-6.4c0.3-2.5,0.8-5.2,1.6-8.1l26.3-110.6h19.7l-29.8,120.9 c-0.4,1.6-0.6,2.9-0.7,3.9c-0.1,1-0.2,1.8-0.2,2.4c0,3.1,1.4,4.6,4.2,4.6c3.1,0,6.3-1.8,9.8-5.3c3.5-3.6,7.5-9.6,11.9-18.2 l3.7,1.7c-2.7,5.4-5.6,10.5-8.7,15.3s-6.7,8.6-10.6,11.6C372.2,202,367.6,203.5,362.5,203.5z M358.4,66.9v-4.6h35.9v4.6H358.4z" }),
			/* @__PURE__ */ t("path", { d: "M393.2,122.9v-4.6h28.5v4.6H393.2z M401.7,203.5c-4.5,0-8-1.2-10.5-3.5c-2.5-2.3-3.7-5.4-3.7-9.2 c0-1,0.1-2,0.3-2.9c0.2-1,0.3-1.9,0.5-2.8l16-66.8h19.7l-16.4,65c-0.4,1.6-0.6,2.9-0.7,3.9c-0.1,1-0.2,1.8-0.2,2.4 c0,3.1,1.3,4.6,4,4.6c2.9,0,6.1-1.8,9.6-5.3c3.4-3.6,7.2-9.6,11.4-18.2l3.7,1.7c-2.3,5.2-5.1,10.1-8.4,14.9 c-3.3,4.8-7,8.7-11.1,11.8C411.7,201.9,406.9,203.5,401.7,203.5z M420.3,91.1c-3.4,0-6.3-1.2-8.7-3.6c-2.4-2.4-3.6-5.3-3.6-8.7 c0-3.6,1.2-6.5,3.6-8.9c2.4-2.4,5.3-3.6,8.7-3.6c3.6,0,6.5,1.2,8.9,3.6c2.4,2.4,3.6,5.4,3.6,8.9c0,3.4-1.2,6.3-3.6,8.7 C426.8,89.9,423.8,91.1,420.3,91.1z" }),
			/* @__PURE__ */ t("path", { d: "M458,203.5c-6.7,0-12.6-1.5-17.7-4.6c-5-3.1-9-7.2-11.8-12.4c-2.8-5.2-4.2-11-4.2-17.4 c0-6.5,1.4-12.9,4.3-19.2c2.9-6.3,6.8-12,11.7-17.1c4.9-5.1,10.5-9.1,16.7-12.1c6.3-3,12.8-4.5,19.7-4.5c6.7,0,12.6,1.5,17.7,4.4 c5,2.9,9,6.9,11.8,12c2.8,5,4.2,10.7,4.2,17.1c0,6.5-1.4,12.9-4.3,19.3c-2.9,6.4-6.8,12.2-11.7,17.4c-4.9,5.2-10.5,9.4-16.7,12.5 C471.4,201.9,464.8,203.5,458,203.5z M458.3,198.9c5,0,9.5-1.7,13.3-5.2s7.1-8,9.8-13.6c2.6-5.6,4.6-11.7,6-18.2 c1.3-6.6,2-12.9,2-19c0-6.5-1-11.8-2.9-15.9c-1.9-4.1-5.5-6.2-10.8-6.2c-4.9,0-9.3,1.8-13.1,5.3c-3.8,3.6-7,8.2-9.7,13.9 c-2.6,5.7-4.6,11.9-6,18.6c-1.4,6.7-2,13.1-2,19.2c0,6.9,1,12.1,2.9,15.7C450,197.1,453.4,198.9,458.3,198.9z" })
		] }), /* @__PURE__ */ n("g", { children: [
			/* @__PURE__ */ t("path", { d: "M547.6,201.4V69.7h20.2v113.1h60.4v18.7H547.6z" }),
			/* @__PURE__ */ t("path", { d: "M631.6,201.4l49.3-74.3l2.2-0.1l35.6-57.3h22.4l-45.4,69.9h-1.8l-39.7,61.8H631.6z M722.6,201.4l-40.8-62.2 l-1.4-0.1l-46.1-69.5h23.3l37.4,57.3h1.8l49.6,74.4H722.6z" }),
			/* @__PURE__ */ t("path", { d: "M751.6,201.4V69.7h45.1c20.2,0,36.3,6,48.5,18c12.1,12,18.2,27.9,18.2,47.8c0,19.8-6.1,35.8-18.4,47.8 c-12.2,12.1-28.4,18.1-48.3,18.1H751.6z M771.9,183.3h24.4c14.2,0,25.4-4.3,33.8-12.8c8.4-8.5,12.6-20.1,12.6-34.6v-0.1 c0-14.7-4.1-26.3-12.4-34.9c-8.2-8.6-19.6-12.9-34-12.9h-24.4V183.3z" })
		] })] })
	}) });
}
//#endregion
//#region src/stories/atoms/Paragraph/Paragraph.tsx
function Ee({ size: e = "default", children: n }) {
	return /* @__PURE__ */ t("p", {
		className: ["paragraph", e === "default" ? "" : `paragraph--${e}`].filter(Boolean).join(" "),
		children: n
	});
}
//#endregion
//#region src/stories/atoms/Select/Select.tsx
function De({ options: e, value: r, defaultValue: i, placeholder: a = "Seleccionar…", disabled: s, dark: c, onValueChange: l, id: u }) {
	return /* @__PURE__ */ n(o.Root, {
		value: r,
		defaultValue: i,
		disabled: s,
		onValueChange: l,
		children: [/* @__PURE__ */ n(o.Trigger, {
			className: "select",
			id: u,
			"aria-label": a,
			children: [/* @__PURE__ */ t(o.Value, { placeholder: a }), /* @__PURE__ */ t(o.Icon, {
				asChild: !0,
				children: /* @__PURE__ */ t(p, {
					className: "select__icon",
					size: "sm"
				})
			})]
		}), /* @__PURE__ */ t(o.Portal, { children: /* @__PURE__ */ t(o.Content, {
			className: ["select__content", c ? "select__content--dark" : ""].filter(Boolean).join(" "),
			position: "popper",
			children: /* @__PURE__ */ t(o.Viewport, { children: e.map(({ value: e, label: n }) => /* @__PURE__ */ t(o.Item, {
				value: e,
				className: "select__item",
				children: /* @__PURE__ */ t(o.ItemText, { children: n })
			}, e)) })
		}) })]
	});
}
//#endregion
//#region src/stories/atoms/Tag/Tag.tsx
function H({ variant: e = "default", children: n }) {
	return /* @__PURE__ */ t("span", {
		className: ["tag", `tag--${e}`].join(" "),
		children: n
	});
}
//#endregion
//#region src/stories/atoms/Textarea/Textarea.tsx
function Oe({ placeholder: e, value: n, defaultValue: r, rows: i, disabled: a, readOnly: o, error: s = !1, id: c, name: l, describedBy: u, onChange: d, onBlur: f, onFocus: p }) {
	return /* @__PURE__ */ t("textarea", {
		className: ["textarea", s ? "textarea--error" : ""].filter(Boolean).join(" "),
		placeholder: e,
		value: n,
		defaultValue: r,
		rows: i,
		disabled: a,
		readOnly: o,
		id: c,
		name: l,
		"aria-invalid": s || void 0,
		"aria-describedby": u,
		onChange: d,
		onBlur: f,
		onFocus: p
	});
}
//#endregion
//#region src/stories/atoms/VisuallyHidden/VisuallyHidden.tsx
function U({ children: e }) {
	return /* @__PURE__ */ t("span", {
		className: "visually-hidden",
		children: e
	});
}
//#endregion
//#region src/stories/molecules/Card/Card.tsx
function ke({ href: e, title: r, description: i, ctaLabel: a, color: o }) {
	return /* @__PURE__ */ n("a", {
		href: e,
		className: ["card", `card--${o}`].join(" "),
		children: [
			/* @__PURE__ */ t(R, {
				level: 2,
				children: r
			}),
			/* @__PURE__ */ t("p", { children: i }),
			/* @__PURE__ */ t(U, { children: a }),
			/* @__PURE__ */ t(u, { size: "lg" })
		]
	});
}
//#endregion
//#region src/stories/molecules/CardSplit/CardSplit.tsx
function W({ href: e, title: r, description: i, ctaLabel: a, color: o, image: s }) {
	return /* @__PURE__ */ n("a", {
		href: e,
		className: ["card-split", `card-split--${o}`].join(" "),
		children: [/* @__PURE__ */ n("div", {
			className: "card-split__primary",
			children: [
				/* @__PURE__ */ t(R, {
					level: 2,
					className: "card-split__title",
					children: r
				}),
				/* @__PURE__ */ t("p", {
					className: "card-split__description",
					children: i
				}),
				/* @__PURE__ */ t(u, {
					className: "card-split__arrow",
					size: "lg"
				}),
				/* @__PURE__ */ t(U, { children: a })
			]
		}), /* @__PURE__ */ t("div", {
			className: "card-split__photo",
			children: /* @__PURE__ */ t("img", {
				src: s.src,
				alt: s.alt
			})
		})]
	});
}
//#endregion
//#region src/stories/molecules/CardSquare/CardSquare.tsx
function G({ href: e, title: r, description: i, ctaLabel: a, color: o, image: s }) {
	return /* @__PURE__ */ n("a", {
		href: e,
		className: ["card-square", `card-square--${o}`].join(" "),
		children: [/* @__PURE__ */ t("img", {
			className: "card-square__image",
			src: s.src,
			alt: s.alt
		}), /* @__PURE__ */ n("div", {
			className: "card-square__body",
			children: [
				/* @__PURE__ */ t(R, {
					level: 2,
					className: "card-square__title",
					children: r
				}),
				/* @__PURE__ */ t("p", {
					className: "card-square__description",
					children: i
				}),
				/* @__PURE__ */ t(u, {
					className: "card-square__arrow",
					size: "lg"
				}),
				/* @__PURE__ */ t(U, { children: a })
			]
		})]
	});
}
//#endregion
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
function K({ label: e, checked: r, defaultChecked: i, disabled: a, id: o, name: s, value: c, onCheckedChange: l }) {
	return /* @__PURE__ */ n("label", {
		className: ["checkbox-field", a ? "checkbox-field--disabled" : ""].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ t(I, {
			checked: r,
			defaultChecked: i,
			disabled: a,
			id: o,
			name: s,
			value: c,
			onCheckedChange: l
		}), /* @__PURE__ */ t("span", {
			className: "checkbox-field__label",
			children: e
		})]
	});
}
//#endregion
//#region src/stories/molecules/Form/Form.tsx
function q({ errors: e, onSubmit: r, actions: i, children: a }) {
	return /* @__PURE__ */ n("form", {
		className: "form",
		onSubmit: r,
		noValidate: !0,
		children: [
			a,
			e && e.length > 0 && /* @__PURE__ */ t("ul", {
				className: "form-errors",
				role: "alert",
				children: e.map((e) => /* @__PURE__ */ t("li", {
					className: "form-errors__item",
					children: e
				}, e))
			}),
			i
		]
	});
}
//#endregion
//#region src/stories/molecules/InputField/InputField.tsx
function J({ id: e, label: r, labelHidden: i = !0, name: a, type: o, placeholder: s, value: c, defaultValue: l, disabled: u, readOnly: d, error: f = !1, errorMessage: p, helperText: m, onChange: h, onBlur: g, onFocus: _ }) {
	let v = p ? `${e}-error` : void 0, y = m ? `${e}-helper` : void 0, b = [v, y].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ n("div", {
		className: "input-field",
		children: [
			/* @__PURE__ */ t(z, {
				htmlFor: e,
				hidden: i,
				children: r
			}),
			/* @__PURE__ */ t(xe, {
				id: e,
				name: a,
				type: o,
				placeholder: s,
				value: c,
				defaultValue: l,
				disabled: u,
				readOnly: d,
				error: f,
				describedBy: b,
				onChange: h,
				onBlur: g,
				onFocus: _
			}),
			p && /* @__PURE__ */ t("span", {
				id: v,
				className: "input-field__error",
				role: "alert",
				children: p
			}),
			m && /* @__PURE__ */ t("span", {
				id: y,
				className: "input-field__helper",
				children: m
			})
		]
	});
}
//#endregion
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
function Ae({ id: e, label: r, labelHidden: i = !0, value: a, defaultCountry: o, placeholder: s, disabled: c, error: l = !1, errorMessage: u, helperText: d, dark: f, name: p, onChange: m, onBlur: h }) {
	let g = u ? `${e}-error` : void 0, _ = d ? `${e}-helper` : void 0, v = [g, _].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ n("div", {
		className: "input-phone-field",
		children: [
			/* @__PURE__ */ t(z, {
				htmlFor: e,
				hidden: i,
				children: r
			}),
			/* @__PURE__ */ t(Ce, {
				id: e,
				name: p,
				value: a,
				defaultCountry: o,
				placeholder: s,
				disabled: c,
				error: l,
				dark: f,
				describedBy: v,
				onChange: m,
				onBlur: h
			}),
			u && /* @__PURE__ */ t("span", {
				id: g,
				className: "input-phone-field__error",
				children: u
			}),
			d && /* @__PURE__ */ t("span", {
				id: _,
				className: "input-phone-field__helper",
				children: d
			})
		]
	});
}
//#endregion
//#region src/stories/molecules/TextareaField/TextareaField.tsx
function je({ id: e, label: r, labelHidden: i = !0, name: a, placeholder: o, value: s, defaultValue: c, rows: l, disabled: u, readOnly: d, error: f = !1, errorMessage: p, helperText: m, onChange: h, onBlur: g, onFocus: _ }) {
	let v = p ? `${e}-error` : void 0, y = m ? `${e}-helper` : void 0, b = [v, y].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ n("div", {
		className: "textarea-field",
		children: [
			/* @__PURE__ */ t(z, {
				htmlFor: e,
				hidden: i,
				children: r
			}),
			/* @__PURE__ */ t(Oe, {
				id: e,
				name: a,
				placeholder: o,
				value: s,
				defaultValue: c,
				rows: l,
				disabled: u,
				readOnly: d,
				error: f,
				describedBy: b,
				onChange: h,
				onBlur: g,
				onFocus: _
			}),
			p && /* @__PURE__ */ t("span", {
				id: v,
				className: "textarea-field__error",
				role: "alert",
				children: p
			}),
			m && /* @__PURE__ */ t("span", {
				id: y,
				className: "textarea-field__helper",
				children: m
			})
		]
	});
}
//#endregion
//#region src/stories/organisms/ContactForm/ContactForm.tsx
function Me({ emailPlaceholder: e = "Escribe aquí tu correo electrónico", messagePlaceholder: r = "Escribe aquí tu mensaje", messageRows: i = 5, privacyLabel: o, buttonLabel: s = "Enviar mensaje", submitting: c = !1, submittingLabel: l = "Enviando…", errors: u, success: d = !1, successMessage: p = "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.", onSubmit: m }) {
	let [h, g] = a(!1);
	return d ? /* @__PURE__ */ t("p", {
		className: "form__success",
		children: p
	}) : /* @__PURE__ */ n(q, {
		errors: u,
		onSubmit: m,
		actions: /* @__PURE__ */ t(f, {
			variant: "form",
			disabled: c,
			children: c ? l : s
		}),
		children: [
			/* @__PURE__ */ t(J, {
				id: "contact-email",
				label: "Email",
				labelHidden: !0,
				type: "email",
				placeholder: e,
				disabled: c
			}),
			/* @__PURE__ */ t(je, {
				id: "contact-message",
				label: "Mensaje",
				labelHidden: !0,
				placeholder: r,
				rows: i,
				disabled: c
			}),
			/* @__PURE__ */ t(K, {
				id: "contact-phone",
				label: "Prefiero que me llaméis por teléfono",
				disabled: c,
				checked: h,
				onCheckedChange: (e) => g(e === !0)
			}),
			h && /* @__PURE__ */ t(Ae, {
				id: "contact-phone-number",
				label: "Teléfono",
				labelHidden: !0,
				placeholder: "Escribe aquí tu número de teléfono",
				helperText: "Solo utilizaremos tu número de teléfono para hablarte sobre este proyecto.",
				disabled: c
			}),
			/* @__PURE__ */ t(K, {
				id: "contact-privacy",
				label: o,
				disabled: c
			})
		]
	});
}
//#endregion
//#region src/stories/organisms/NewsletterForm/NewsletterForm.tsx
function Ne({ emailPlaceholder: e = "Escribe aquí tu correo electrónico", privacyLabel: r, buttonLabel: i = "Suscríbeme a la newsletter", submitting: a = !1, submittingLabel: o = "Suscribiéndote…", errors: s, success: c = !1, successMessage: l = "¡Gracias por suscribirte! Ya no te perderás ninguna de nuestras novedades.", onSubmit: u }) {
	return c ? /* @__PURE__ */ t("p", {
		className: "form__success",
		children: l
	}) : /* @__PURE__ */ t("div", {
		className: "newsletter-form",
		children: /* @__PURE__ */ n(q, {
			errors: s,
			onSubmit: u,
			actions: /* @__PURE__ */ t(f, {
				variant: "form",
				disabled: a,
				children: a ? o : i
			}),
			children: [/* @__PURE__ */ t(J, {
				id: "newsletter-email",
				label: "Email",
				labelHidden: !0,
				type: "email",
				placeholder: e,
				disabled: a
			}), /* @__PURE__ */ t(K, {
				id: "newsletter-privacy",
				label: r,
				disabled: a
			})]
		})
	});
}
//#endregion
//#region src/stories/sections/ClientsSection/ClientsSection.tsx
function Pe({ title: e = "Hemos trabajado junto a...", clients: r }) {
	return /* @__PURE__ */ n("section", {
		className: "clients-section",
		children: [/* @__PURE__ */ t(R, {
			level: 2,
			children: e
		}), /* @__PURE__ */ t(m, {
			options: { align: "start" },
			plugins: [l({
				speed: 1,
				stopOnInteraction: !1
			})],
			hideButtons: !0,
			children: r.map((e) => /* @__PURE__ */ t(h, {
				className: "clients-section__slide",
				children: /* @__PURE__ */ t("img", {
					src: e.logo,
					alt: e.name,
					className: "clients-section__logo"
				})
			}, e.id))
		})]
	});
}
//#endregion
//#region src/stories/sections/ContactSection/ContactSection.tsx
function Fe({ title: e, form: r, whatsappTitle: i, whatsappLabel: a, whatsappHref: o }) {
	return /* @__PURE__ */ n("section", {
		className: "contact-section",
		children: [/* @__PURE__ */ n("div", {
			className: "contact-section__left",
			children: [/* @__PURE__ */ t("div", {
				className: "contact-section__intro",
				children: /* @__PURE__ */ t(R, {
					level: 2,
					children: e
				})
			}), /* @__PURE__ */ n("aside", {
				className: "contact-section__cta",
				children: [/* @__PURE__ */ t(R, {
					level: 3,
					children: i
				}), /* @__PURE__ */ t(f, {
					href: o,
					variant: "primary",
					external: !0,
					children: a
				})]
			})]
		}), /* @__PURE__ */ t("div", {
			className: "contact-section__form",
			children: /* @__PURE__ */ t(Me, { ...r })
		})]
	});
}
//#endregion
//#region src/stories/sections/Footer/Footer.tsx
function Y() {
	return /* @__PURE__ */ n("footer", {
		className: "footer surface-dark",
		children: [
			/* @__PURE__ */ n("div", {
				className: "footer__col footer__col--1",
				children: [/* @__PURE__ */ n(R, {
					level: 2,
					className: "footer__tagline",
					children: [
						/* @__PURE__ */ t("span", { children: "Learning" }),
						/* @__PURE__ */ t("span", { children: "experience" }),
						/* @__PURE__ */ t("span", { children: "design" })
					]
				}), /* @__PURE__ */ t("div", {
					className: "footer__logo",
					children: /* @__PURE__ */ t(V, { height: 50 })
				})]
			}),
			/* @__PURE__ */ n("div", {
				className: "footer__col footer__col--2",
				children: [/* @__PURE__ */ t(R, {
					level: 3,
					children: "Suscríbete a nuestra newsletter"
				}), /* @__PURE__ */ t(Ne, { privacyLabel: /* @__PURE__ */ n(e, { children: [
					"He leído la ",
					/* @__PURE__ */ t(B, {
						href: "#",
						children: "política de privacidad"
					}),
					" y consiento recibir la newsletter"
				] }) })]
			}),
			/* @__PURE__ */ n("div", {
				className: "footer__col footer__col--3",
				children: [/* @__PURE__ */ n("ul", {
					className: "footer__social",
					children: [
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(B, {
							href: "#",
							external: !0,
							className: "footer__social-link",
							children: "LinkedIn"
						}) }),
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(B, {
							href: "#",
							external: !0,
							className: "footer__social-link",
							children: "Instagram"
						}) }),
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(B, {
							href: "#",
							external: !0,
							className: "footer__social-link",
							children: "GitHub"
						}) })
					]
				}), /* @__PURE__ */ n("address", {
					className: "footer__contact",
					children: [/* @__PURE__ */ t(B, {
						href: "mailto:hello@studiolxd.com",
						children: "hello@studiolxd.com"
					}), /* @__PURE__ */ t(B, {
						href: "tel:+34623752862",
						children: "+34 623 752 862"
					})]
				})]
			}),
			/* @__PURE__ */ t("div", {
				className: "footer__bottom",
				children: /* @__PURE__ */ n("ul", {
					className: "footer__legal",
					children: [
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(B, {
							href: "#",
							children: "Aviso legal"
						}) }),
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(B, {
							href: "#",
							children: "Política de privacidad"
						}) }),
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(B, {
							href: "#",
							children: "Política de cookies"
						}) })
					]
				})
			})
		]
	});
}
//#endregion
//#region src/stories/sections/Header/Header.tsx
function X({ navItems: e, featuredLink: r, actions: i, logoHref: o = "/", logoLabel: s = "Studio LXD — ir al inicio", navLabel: c = "Main navigation", dark: l = !1 }) {
	let [u, d] = a(!1), f = () => {
		d(!1);
	};
	return /* @__PURE__ */ n("header", {
		className: ["header", l ? "header--dark" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ t("a", {
				href: "#main-content",
				className: "header__skip-link",
				children: "Saltar al contenido principal"
			}),
			/* @__PURE__ */ t("a", {
				href: o,
				className: "header__logo",
				"aria-label": s,
				children: /* @__PURE__ */ t(V, {})
			}),
			/* @__PURE__ */ t(L, {
				isOpen: u,
				onClick: () => d(!u),
				label: u ? "Cerrar menu" : "Abrir menu"
			}),
			/* @__PURE__ */ n("div", {
				className: "header__navbar",
				"aria-hidden": !u,
				children: [
					r && /* @__PURE__ */ t("a", {
						href: r.href,
						className: "header__featured",
						onClick: f,
						children: r.label
					}),
					/* @__PURE__ */ t("nav", {
						"aria-label": c,
						children: e.map((e) => /* @__PURE__ */ t("a", {
							href: e.href,
							className: "header__nav-link",
							onClick: f,
							children: e.label
						}, e.href))
					}),
					i && /* @__PURE__ */ t("div", {
						className: "header__actions",
						children: i
					})
				]
			})
		]
	});
}
//#endregion
//#region src/stories/sections/HighlightSection/HighlightSection.tsx
function Ie({ text: e, align: n = "left", textAlign: r, className: i }) {
	return /* @__PURE__ */ t("section", {
		className: "highlight-section",
		children: /* @__PURE__ */ t("div", {
			className: [
				"highlight-section__container",
				n === "left" ? "" : `highlight-section__container--${n}`,
				r ? `highlight-section__container--text-${r}` : "",
				i
			].filter(Boolean).join(" "),
			children: /* @__PURE__ */ t("p", { children: e })
		})
	});
}
//#endregion
//#region src/stories/sections/MethodologySection/MethodologySection.tsx
function Le({ intro: e, ctaLabel: r, ctaHref: i, steps: a, "aria-label": o }) {
	return /* @__PURE__ */ n("section", {
		className: "methodology-section",
		"aria-label": o,
		children: [/* @__PURE__ */ n("div", {
			className: "methodology-section__intro",
			children: [/* @__PURE__ */ t("p", { children: e }), /* @__PURE__ */ t(f, {
				href: i,
				variant: "primary",
				children: r
			})]
		}), /* @__PURE__ */ t("div", {
			className: "methodology-section__steps",
			children: a.map((e, r) => /* @__PURE__ */ n("div", {
				className: "methodology-section__step",
				children: [/* @__PURE__ */ t("div", {
					className: "methodology-section__number",
					children: String(r + 1).padStart(2, "0")
				}), /* @__PURE__ */ t("div", {
					className: "methodology-section__text",
					children: e.text
				})]
			}, e.text))
		})]
	});
}
//#endregion
//#region src/stories/sections/ProjectsSection/ProjectsSection.tsx
function Re({ title: e = "Proyectos", projects: r }) {
	return /* @__PURE__ */ n("section", {
		className: "projects-section",
		children: [/* @__PURE__ */ t(R, {
			level: 2,
			children: e
		}), /* @__PURE__ */ t(m, {
			options: { align: "center" },
			children: r.map((e) => /* @__PURE__ */ t(h, { children: /* @__PURE__ */ n("a", {
				className: "project-card",
				href: e.href,
				"aria-label": e.title,
				children: [
					/* @__PURE__ */ t(H, {
						variant: e.tagVariant ?? "default",
						children: e.category
					}),
					/* @__PURE__ */ t(R, {
						level: 3,
						className: "project-card__title",
						children: e.title
					}),
					/* @__PURE__ */ t("div", {
						className: "project-card__image-wrap",
						children: /* @__PURE__ */ t("img", {
							src: e.photo,
							alt: e.photoAlt ?? e.title,
							className: "project-card__image"
						})
					}),
					/* @__PURE__ */ t("p", {
						className: "project-card__description",
						children: e.description
					}),
					/* @__PURE__ */ t("span", {
						className: "project-card__cta button button--primary",
						"aria-hidden": "true",
						children: "Leer más"
					})
				]
			}) }, e.id))
		})]
	});
}
//#endregion
//#region src/stories/sections/ReviewsSection/ReviewsSection.tsx
function ze({ title: e = "Lo que dice nuestro alumnado", reviews: r }) {
	return /* @__PURE__ */ n("section", {
		className: "reviews-section surface-dark",
		children: [/* @__PURE__ */ t(R, {
			level: 2,
			children: e
		}), /* @__PURE__ */ t(m, {
			options: {
				align: "center",
				loop: !0
			},
			gradientColor: "var(--color-background-dark)",
			children: r.map((e) => /* @__PURE__ */ t(h, { children: /* @__PURE__ */ n("article", {
				className: "review-card",
				children: [/* @__PURE__ */ n("div", {
					className: "review-card__author",
					children: [/* @__PURE__ */ t(d, {
						src: e.photo,
						alt: e.author,
						size: "xl",
						className: "review-card__avatar"
					}), /* @__PURE__ */ n("div", {
						className: "review-card__identity",
						children: [/* @__PURE__ */ t(R, {
							level: 3,
							className: "review-card__name",
							children: e.author
						}), /* @__PURE__ */ t(R, {
							level: 4,
							className: "review-card__role",
							children: e.role
						})]
					})]
				}), /* @__PURE__ */ t("blockquote", {
					className: "review-card__quote",
					children: e.quote
				})]
			}) }, e.id))
		})]
	});
}
//#endregion
//#region src/stories/sections/SolutionsSection/SolutionsSection.tsx
function Z({ items: e, "aria-label": n }) {
	return /* @__PURE__ */ t("section", {
		className: "solutions-section",
		"aria-label": n,
		children: e.map((e) => /* @__PURE__ */ t(ke, { ...e }, e.title))
	});
}
//#endregion
//#region src/stories/constants/navigation.ts
var Q = [
	{
		label: "Inicio",
		href: "#"
	},
	{
		label: "Soluciones",
		href: "#"
	},
	{
		label: "Proyectos",
		href: "#"
	},
	{
		label: "Academia",
		href: "#"
	},
	{
		label: "Contacto",
		href: "#"
	}
], $ = {
	label: "Cursos online",
	href: "#"
}, Be = [
	{
		id: "ana-garcia",
		photo: "https://i.pravatar.cc/120?img=47",
		author: "Ana García",
		role: "Diseñadora instruccional",
		quote: "El curso cambió completamente mi forma de diseñar formaciones. Ahora entiendo la pedagogía detrás de cada decisión."
	},
	{
		id: "carlos-martinez",
		photo: "https://i.pravatar.cc/120?img=12",
		author: "Carlos Martínez",
		role: "Responsable de formación",
		quote: "Muy práctico y directo al grano. Aprendí más en unas semanas que en años de prueba y error por mi cuenta."
	},
	{
		id: "laura-sanchez",
		photo: "https://i.pravatar.cc/120?img=32",
		author: "Laura Sánchez",
		role: "Técnica de RRHH",
		quote: "El acompañamiento del equipo de Studio LXD durante todo el proceso fue clave. No me sentí sola en ningún momento."
	},
	{
		id: "miguel-torres",
		photo: "https://i.pravatar.cc/120?img=68",
		author: "Miguel Torres",
		role: "Consultor de e-learning",
		quote: "Herramientas reales, casos reales. Exactamente lo que necesitaba para dar el salto profesional que buscaba."
	},
	{
		id: "sofia-ruiz",
		photo: "https://i.pravatar.cc/120?img=5",
		author: "Sofía Ruiz",
		role: "Coordinadora de formación",
		quote: "El enfoque centrado en el aprendizaje me ayudó a replantear todos mis proyectos. Una visión totalmente nueva."
	},
	{
		id: "pablo-jimenez",
		photo: "https://i.pravatar.cc/120?img=15",
		author: "Pablo Jiménez",
		role: "Desarrollador instruccional",
		quote: "Muy buena relación entre teoría y práctica. Pude aplicar lo aprendido desde el primer módulo en mi trabajo diario."
	},
	{
		id: "elena-moreno",
		photo: "https://i.pravatar.cc/120?img=9",
		author: "Elena Moreno",
		role: "Formadora corporativa",
		quote: "El programa me dio el marco conceptual que me faltaba. Ahora diseño con mucha más seguridad y criterio."
	},
	{
		id: "david-lopez",
		photo: "https://i.pravatar.cc/120?img=53",
		author: "David López",
		role: "Técnico de formación",
		quote: "Superó mis expectativas. El contenido está muy bien estructurado y el equipo resuelve dudas con rapidez y claridad."
	}
], Ve = [
	{
		id: "onboarding-randstad",
		category: "E-learning",
		tagVariant: "secondary",
		photo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&fit=crop",
		title: "Onboarding digital para Randstad",
		description: "Diseñamos un itinerario de incorporación 100% online para 1.200 nuevos empleados al año."
	},
	{
		id: "liderazgo-retail",
		category: "Formación presencial",
		tagVariant: "tertiary",
		photo: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80&fit=crop",
		title: "Taller de liderazgo para mandos intermedios",
		description: "Programa presencial de tres módulos para 80 responsables de equipo de una empresa del sector retail."
	},
	{
		id: "catalogo-grupo-mayo",
		category: "Diseño instruccional",
		tagVariant: "quaternary",
		photo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&fit=crop",
		title: "Rediseño del catálogo formativo de Grupo Mayo",
		description: "Auditamos y rediseñamos desde cero un catálogo de 40 cursos desactualizados."
	},
	{
		id: "moodle-junta-andalucia",
		category: "Plataformas LMS",
		tagVariant: "quinary",
		photo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&fit=crop",
		title: "Implantación de Moodle para la Junta de Andalucía",
		description: "Configuramos y personalizamos una instancia de Moodle para 15.000 usuarios."
	},
	{
		id: "estrategia-linkup",
		category: "Consultoría",
		tagVariant: "primary",
		photo: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&fit=crop",
		title: "Estrategia L&D para Linkup Coaching",
		description: "Acompañamos a su equipo en la definición de una estrategia de aprendizaje alineada con el plan de negocio."
	},
	{
		id: "compliance-elearning",
		category: "E-learning",
		tagVariant: "secondary",
		photo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&fit=crop",
		title: "Curso de compliance y prevención de riesgos",
		description: "Módulo e-learning con escenarios de decisión ramificados para garantizar la comprensión real de la normativa."
	},
	{
		id: "guia-formadores-sawy",
		category: "Diseño instruccional",
		tagVariant: "quaternary",
		photo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&fit=crop",
		title: "Guía didáctica para formadores internos de Sawy",
		description: "Creamos una guía metodológica para que el equipo interno pudiera replicar y actualizar los contenidos."
	},
	{
		id: "migracion-lms",
		category: "Plataformas LMS",
		tagVariant: "quinary",
		photo: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80&fit=crop",
		title: "Migración de TalentLMS a Canvas",
		description: "Gestionamos la migración completa de contenidos, usuarios y datos históricos."
	}
], He = [
	{
		id: "junta-de-andalucia",
		name: "Junta de Andalucía",
		logo: "/clients/logo-junta-de-andalucia.png"
	},
	{
		id: "grupo-mayo",
		name: "Grupo Mayo",
		logo: "/clients/logo-grupo-mayo.png"
	},
	{
		id: "randstad",
		name: "Randstad",
		logo: "/clients/logo-randstad.png"
	},
	{
		id: "meridianos",
		name: "Meridianos",
		logo: "/clients/logo-meridianos.png"
	},
	{
		id: "linkup-coaching",
		name: "Linkup Coaching",
		logo: "/clients/logo-linkup-coaching.png"
	},
	{
		id: "design-training",
		name: "Design Training",
		logo: "/clients/logo-design-training.png"
	},
	{
		id: "sawy",
		name: "Sawy",
		logo: "/clients/logo-sawy.png"
	}
], Ue = [
	{ text: "Preguntamos para conocer vuestras necesidades." },
	{ text: "Colaboramos con vuestro equipo quienes tienen el know how de la organización." },
	{ text: "Asesoramos sobre las mejores soluciones." },
	{ text: "Acompañamos hasta implementar la solución." }
], We = [{
	href: "#",
	color: "secondary",
	title: "Contenidos elearning",
	description: "Diseñamos contenidos multimedia interactivos para formación online, utilizando estándares como SCORM y xAPI.",
	ctaLabel: "Ver más sobre contenidos elearning"
}, {
	href: "#",
	color: "tertiary",
	title: "Plataformas elearning",
	description: "Desarrollamos plataformas elearning adaptadas a tu identidad visual y centradas en las personas usuarias para lograr una experiencia de aprendizaje gratificante.",
	ctaLabel: "Ver más sobre plataformas elearning"
}], Ge = {
	title: "¿Hablamos?",
	form: {
		privacyLabel: /* @__PURE__ */ n(e, { children: [
			"He leído la",
			" ",
			/* @__PURE__ */ t("a", {
				href: "#",
				children: "política de privacidad"
			})
		] }),
		emailPlaceholder: "Escribe aquí tu correo electrónico",
		messagePlaceholder: "Cuéntanos brevemente qué necesitas",
		buttonLabel: "Envía el mensaje",
		submittingLabel: "Enviando mensaje...",
		successMessage: "¡Gracias por tu mensaje! Nos pondremos en contacto contigo lo antes posible."
	},
	whatsappTitle: "¿Mejor por WhatsApp?",
	whatsappLabel: "Escríbenos",
	whatsappHref: "https://wa.me/34600000000"
};
//#endregion
//#region src/stories/pages/Home/Home.tsx
function Ke() {
	return /* @__PURE__ */ n("div", {
		className: "home",
		children: [
			/* @__PURE__ */ t(X, {
				navItems: Q,
				featuredLink: $,
				actions: /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ t(De, {
					options: [{
						value: "es",
						label: "ES"
					}, {
						value: "en",
						label: "EN"
					}],
					defaultValue: "es"
				}), /* @__PURE__ */ t(f, {
					href: "https://academy.studiolxd.com",
					variant: "primary",
					external: !0,
					children: "Entra a la academia"
				})] })
			}),
			/* @__PURE__ */ n("main", {
				id: "main-content",
				className: "home__main",
				children: [
					/* @__PURE__ */ n("section", {
						className: "home__video-section",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ t("div", {
							className: "home__video-landscape",
							children: /* @__PURE__ */ n("video", {
								autoPlay: !0,
								loop: !0,
								muted: !0,
								playsInline: !0,
								children: [/* @__PURE__ */ t("source", {
									src: "/videos/hero-landscape.webm",
									type: "video/webm"
								}), /* @__PURE__ */ t("source", {
									src: "/videos/hero-landscape.mp4",
									type: "video/mp4"
								})]
							})
						}), /* @__PURE__ */ t("div", {
							className: "home__video-portrait",
							children: /* @__PURE__ */ n("video", {
								autoPlay: !0,
								loop: !0,
								muted: !0,
								playsInline: !0,
								children: [/* @__PURE__ */ t("source", {
									src: "/videos/hero-portrait.webm",
									type: "video/webm"
								}), /* @__PURE__ */ t("source", {
									src: "/videos/hero-portrait.mp4",
									type: "video/mp4"
								})]
							})
						})]
					}),
					/* @__PURE__ */ t(Z, {
						"aria-label": "Soluciones",
						items: We
					}),
					/* @__PURE__ */ t(Le, {
						"aria-label": "Metodología",
						intro: "Te acompañamos durante todo el proceso",
						ctaLabel: "Descubre cómo trabajamos",
						ctaHref: "#",
						steps: Ue
					}),
					/* @__PURE__ */ t(Re, {
						title: "Nuestros trabajos",
						projects: Ve
					}),
					/* @__PURE__ */ n("section", {
						className: "home__academy",
						"aria-label": "Academia",
						children: [/* @__PURE__ */ t(Ie, {
							text: "Fórmate en la academia de Studio LXD. Aprende sobre diseño instruccional y herramientas para crear contenidos elearning con nuestros cursos.",
							align: "center"
						}), /* @__PURE__ */ n("div", {
							className: "home__courses",
							children: [
								/* @__PURE__ */ t(G, {
									href: "#",
									color: "secondary",
									title: "Diseño instruccional",
									description: "Aprende a diseñar experiencias de aprendizaje efectivas combinando pedagogía, diseño y tecnología.",
									ctaLabel: "Ver más sobre diseño instruccional",
									image: {
										src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80&fit=crop",
										alt: "Personas trabajando en equipo"
									}
								}),
								/* @__PURE__ */ t(G, {
									href: "#",
									color: "tertiary",
									title: "Herramientas elearning",
									description: "Domina las principales herramientas de autoría para crear contenidos interactivos y atractivos.",
									ctaLabel: "Ver más sobre herramientas elearning",
									image: {
										src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80&fit=crop",
										alt: "Persona trabajando con ordenador"
									}
								}),
								/* @__PURE__ */ t(W, {
									href: "#",
									color: "quaternary",
									title: "Formación de formadores",
									description: "Desarrolla las competencias clave para facilitar sesiones formativas presenciales y online con impacto real.",
									ctaLabel: "Ver más sobre formación de formadores",
									image: {
										src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&fit=crop",
										alt: "Sesión de formación en grupo"
									}
								}),
								/* @__PURE__ */ t(W, {
									href: "#",
									color: "quinary",
									title: "Moodle y plataformas LMS",
									description: "Configura y personaliza tu plataforma de formación online para ofrecer la mejor experiencia a tus estudiantes.",
									ctaLabel: "Ver más sobre Moodle y plataformas LMS",
									image: {
										src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80&fit=crop",
										alt: "Pantalla con interfaz digital"
									}
								})
							]
						})]
					}),
					/* @__PURE__ */ t(ze, {
						title: "Lo que dice nuestro alumnado",
						reviews: Be
					}),
					/* @__PURE__ */ t(Pe, {
						title: "Clientes",
						clients: He
					}),
					/* @__PURE__ */ t(Fe, { ...Ge })
				]
			}),
			/* @__PURE__ */ t(Y, {})
		]
	});
}
//#endregion
//#region src/stories/pages/Legal/Legal.tsx
function qe({ section: e, index: r }) {
	let [i, o] = a(!1), s = `legal-section-${r}`;
	return /* @__PURE__ */ n("div", {
		className: `legal-accordion__item${i ? " legal-accordion__item--open" : ""}`,
		children: [/* @__PURE__ */ t(R, {
			level: 2,
			className: "legal-accordion__heading",
			children: /* @__PURE__ */ n("button", {
				className: "legal-accordion__header",
				onClick: () => o((e) => !e),
				"aria-expanded": i,
				"aria-controls": s,
				children: [
					/* @__PURE__ */ t("span", {
						className: "legal-accordion__counter",
						children: String(r + 1).padStart(2, "0")
					}),
					/* @__PURE__ */ t("span", {
						className: "legal-accordion__title",
						children: e.title
					}),
					/* @__PURE__ */ t(p, {
						className: "legal-accordion__chevron",
						size: "lg"
					})
				]
			})
		}), /* @__PURE__ */ t("div", {
			className: "legal-accordion__body",
			id: s,
			role: "region",
			children: /* @__PURE__ */ t("div", {
				className: "legal-accordion__body-inner",
				children: e.content
			})
		})]
	});
}
function Je({ title: e, sections: r, navItems: i = Q, featuredLink: a = $ }) {
	return /* @__PURE__ */ n("div", {
		className: "legal-page",
		children: [
			/* @__PURE__ */ t(X, {
				navItems: i,
				featuredLink: a,
				actions: /* @__PURE__ */ t(f, {
					href: "https://academy.studiolxd.com",
					variant: "primary",
					external: !0,
					children: "Entra a la academia"
				})
			}),
			/* @__PURE__ */ n("main", {
				id: "main-content",
				className: "legal-page__main",
				children: [/* @__PURE__ */ t("div", {
					className: "legal-page__header",
					children: /* @__PURE__ */ t(R, {
						level: 1,
						className: "legal-page__title",
						children: e
					})
				}), /* @__PURE__ */ t("div", {
					className: "legal-accordion",
					children: r.map((e, n) => /* @__PURE__ */ t(qe, {
						section: e,
						index: n
					}, e.title))
				})]
			}),
			/* @__PURE__ */ t(Y, {})
		]
	});
}
//#endregion
//#region src/stories/pages/Project/Project.tsx
function Ye({ category: e, tagVariant: r = "default", photo: i, photoAlt: a, title: o, description: s, sections: c, navItems: l = Q, featuredLink: u = $ }) {
	return /* @__PURE__ */ n("div", {
		className: "project-page",
		children: [
			/* @__PURE__ */ t(X, {
				navItems: l,
				featuredLink: u,
				actions: /* @__PURE__ */ t(f, {
					href: "https://academy.studiolxd.com",
					variant: "primary",
					external: !0,
					children: "Entra a la academia"
				})
			}),
			/* @__PURE__ */ t("main", {
				id: "main-content",
				className: "project-page__main",
				children: /* @__PURE__ */ t("div", {
					className: "project-page__body",
					children: /* @__PURE__ */ n("article", {
						className: "project-detail",
						children: [
							/* @__PURE__ */ t(H, {
								variant: r,
								children: e
							}),
							/* @__PURE__ */ t(R, {
								level: 1,
								className: "project-detail__title",
								children: o
							}),
							/* @__PURE__ */ t("p", {
								className: "project-detail__intro",
								children: s
							}),
							/* @__PURE__ */ t("img", {
								src: i,
								alt: a ?? o,
								className: "project-detail__photo",
								width: 1200,
								height: 800
							}),
							/* @__PURE__ */ t("div", {
								className: "project-detail__content",
								children: c.map((e) => /* @__PURE__ */ n("section", {
									className: "project-detail__section",
									children: [/* @__PURE__ */ t(R, {
										level: 2,
										className: "project-detail__section-title",
										children: e.title
									}), /* @__PURE__ */ t("p", {
										className: "project-detail__section-body",
										children: e.body
									})]
								}, e.title))
							})
						]
					})
				})
			}),
			/* @__PURE__ */ t(Y, {})
		]
	});
}
//#endregion
export { u as Arrow, d as Avatar, f as Button, ke as Card, W as CardSplit, G as CardSquare, m as Carousel, I as Checkbox, K as CheckboxField, p as Chevron, Pe as ClientsSection, Me as ContactForm, Fe as ContactSection, Y as Footer, q as Form, L as Hamburger, X as Header, R as Heading, Ie as HighlightSection, Ke as Home, xe as Input, J as InputField, Ce as InputPhone, Ae as InputPhoneField, z as Label, Je as Legal, B as Link, Te as List, V as Logo, Le as MethodologySection, Ne as NewsletterForm, Ee as Paragraph, Ye as Project, Re as ProjectsSection, ze as ReviewsSection, De as Select, Z as SolutionsSection, H as Tag, Oe as Textarea, je as TextareaField, U as VisuallyHidden };
