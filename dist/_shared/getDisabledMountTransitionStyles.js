import { A as e, _ as t, b as n, g as r, h as i, k as a, m as o, o as s, p as c, s as l, v as u, y as d } from "./popupStateMapping.js";
import { c as f, h as p, r as m } from "./useRenderElement.js";
import { L as h, R as g, b as _, d as v, l as y } from "./floating-ui.utils.dom.js";
import { t as b } from "./DirectionContext.js";
import { n as x } from "./useOpenChangeComplete.js";
import { g as S, h as C, i as w, l as T, m as E, n as D, o as ee, s as O, t as k } from "./owner.js";
import * as A from "react";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useFloatingRootContext.js
function j(e) {
	let { open: t = !1, onOpenChange: n, elements: r = {} } = e, i = _(), o = a() != null;
	if (process.env.NODE_ENV !== "production") {
		let e = r.reference;
		e && !v(e) && console.error("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `context.setPositionReference()`", "instead.");
	}
	let c = p(() => new l({
		open: t,
		onOpenChange: n,
		referenceElement: r.reference ?? null,
		floatingElement: r.floating ?? null,
		triggerElements: r.triggers ?? new s(),
		floatingId: i,
		nested: o,
		noEmit: e.noEmit || !1
	})).current;
	return h(() => {
		let e = {
			open: t,
			floatingId: i
		};
		r.reference !== void 0 && (e.referenceElement = r.reference, e.domReferenceElement = v(r.reference) ? r.reference : null), r.floating !== void 0 && (e.floatingElement = r.floating), c.update(e);
	}, [
		t,
		i,
		r.reference,
		r.floating,
		c
	]), c.context.onOpenChange = n, c.context.nested = o, c.context.noEmit = e.noEmit || !1, c;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useFloating.js
function M(t = {}) {
	let { nodeId: n, externalTree: r } = t, i = j(t), a = t.rootContext || i, o = {
		reference: a.useState("referenceElement"),
		floating: a.useState("floatingElement"),
		domReference: a.useState("domReferenceElement")
	}, [s, c] = A.useState(null), l = A.useRef(null), u = e(r);
	h(() => {
		o.domReference && (l.current = o.domReference);
	}, [o.domReference]);
	let f = d({
		...t,
		elements: {
			...o,
			...s && { reference: s }
		}
	}), p = A.useCallback((e) => {
		let t = v(e) ? {
			getBoundingClientRect: () => e.getBoundingClientRect(),
			getClientRects: () => e.getClientRects(),
			contextElement: e
		} : e;
		c(t), f.refs.setReference(t);
	}, [f.refs]), [m, g] = A.useState(null), [_, y] = A.useState(null);
	a.useSyncedValue("referenceElement", m), a.useSyncedValue("domReferenceElement", v(m) ? m : null), a.useSyncedValue("floatingElement", _);
	let b = A.useCallback((e) => {
		(v(e) || e === null) && (l.current = e, g(e)), (v(f.refs.reference.current) || f.refs.reference.current === null || e !== null && !v(e)) && f.refs.setReference(e);
	}, [f.refs, g]), x = A.useCallback((e) => {
		y(e), f.refs.setFloating(e);
	}, [f.refs]), S = A.useMemo(() => ({
		...f.refs,
		setReference: b,
		setFloating: x,
		setPositionReference: p,
		domReference: l
	}), [
		f.refs,
		b,
		x,
		p
	]), C = A.useMemo(() => ({
		...f.elements,
		domReference: o.domReference
	}), [f.elements, o.domReference]), w = a.useState("open"), T = a.useState("floatingId"), E = A.useMemo(() => ({
		...f,
		dataRef: a.context.dataRef,
		open: w,
		onOpenChange: a.setOpen,
		events: a.context.events,
		floatingId: T,
		refs: S,
		elements: C,
		nodeId: n,
		rootStore: a
	}), [
		f,
		S,
		C,
		n,
		a,
		w,
		T
	]);
	return h(() => {
		a.context.dataRef.current.floatingContext = E;
		let e = u?.nodesRef.current.find((e) => e.id === n);
		e && (e.context = E);
	}), A.useMemo(() => ({
		...f,
		context: E,
		refs: S,
		elements: C,
		rootStore: a
	}), [
		f,
		S,
		C,
		E,
		a
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/middleware/arrow.js
var N = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0, offsetParent: d = "real" } = w(e, t) || {};
		if (l == null) return {};
		let f = E(u), p = {
			x: n,
			y: r
		}, m = O(i), h = T(m), g = await o.getDimensions(l), _ = m === "y", v = _ ? "top" : "left", y = _ ? "bottom" : "right", b = _ ? "clientHeight" : "clientWidth", x = a.reference[h] + a.reference[m] - p[m] - a.floating[h], S = p[m] - a.reference[m], C = d === "real" ? await o.getOffsetParent?.(l) : s.floating, k = s.floating[b] || a.floating[h];
		(!k || !await o.isElement?.(C)) && (k = s.floating[b] || a.floating[h]);
		let A = x / 2 - S / 2, j = k / 2 - g[h] / 2 - 1, M = Math.min(f[v], j), N = Math.min(f[y], j), P = M, te = k - g[h] - N, F = k / 2 - g[h] / 2 + A, I = D(P, F, te), L = !c.arrow && ee(i) != null && F !== I && a.reference[h] / 2 - (F < P ? M : N) - g[h] / 2 < 0, R = L ? F < P ? F - P : F - te : 0;
		return {
			[m]: p[m] + R,
			data: {
				[m]: I,
				centerOffset: F - I - R,
				...L && { alignmentOffset: R }
			},
			reset: L
		};
	}
}), P = (e, t) => ({
	...N(e),
	options: [e, t]
}), te = {
	name: "hide",
	async fn(e) {
		let { width: t, height: n, x: r, y: i } = e.rects.reference, a = t === 0 && n === 0 && r === 0 && i === 0;
		return { data: { referenceHidden: (await o().fn(e)).data?.referenceHidden || a } };
	}
}, F = {
	sideX: "left",
	sideY: "top"
}, I = {
	name: "adaptiveOrigin",
	async fn(e) {
		let { x: t, y: n, rects: { floating: r }, elements: { floating: i }, platform: a, strategy: o, placement: s } = e, c = y(i), l = c.getComputedStyle(i);
		if (!(l.transitionDuration !== "0s" && l.transitionDuration !== "")) return {
			x: t,
			y: n,
			data: F
		};
		let u = await a.getOffsetParent?.(i), d = {
			width: 0,
			height: 0
		};
		if (o === "fixed" && c?.visualViewport) d = {
			width: c.visualViewport.width,
			height: c.visualViewport.height
		};
		else if (u === c) {
			let e = k(i);
			d = {
				width: e.documentElement.clientWidth,
				height: e.documentElement.clientHeight
			};
		} else await a.isElement?.(u) && (d = await a.getDimensions(u));
		let f = C(s), p = t, m = n;
		f === "left" && (p = d.width - (t + r.width)), f === "top" && (m = d.height - (n + r.height));
		let h = f === "left" ? "right" : F.sideX, g = f === "top" ? "bottom" : F.sideY;
		return {
			x: p,
			y: m,
			data: {
				sideX: h,
				sideY: g
			}
		};
	}
};
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/useAnchorPositioning.js
function L(e, t, n) {
	let r = e === "inline-start" || e === "inline-end";
	return {
		top: "top",
		right: r ? n ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: r ? n ? "inline-end" : "inline-start" : "left"
	}[t];
}
function R(e, t, n) {
	let { rects: r, placement: i } = e;
	return {
		side: L(t, C(i), n),
		align: ee(i) || "center",
		anchor: {
			width: r.reference.width,
			height: r.reference.height
		},
		positioner: {
			width: r.floating.width,
			height: r.floating.height
		}
	};
}
function ne(e) {
	let { anchor: a, positionMethod: o = "absolute", side: s = "bottom", sideOffset: l = 0, align: d = "center", alignOffset: f = 0, collisionBoundary: p, collisionPadding: m = 5, sticky: _ = !1, arrowPadding: v = 5, disableAnchorTracking: y = !1, keepMounted: w = !1, floatingRootContext: T, mounted: E, collisionAvoidance: D, shiftCrossAxis: O = !1, nodeId: j, adaptiveOrigin: N, lazyFlip: I = !1, externalTree: ne } = e, [ie, ae] = A.useState(null);
	!E && ie !== null && ae(null);
	let z = D.side || "flip", B = D.align || "flip", oe = D.fallbackAxisSide || "end", se = typeof a == "function" ? a : void 0, ce = g(se), le = se ? ce : a, V = x(a), H = b() === "rtl", ue = ie || {
		top: "top",
		right: "right",
		bottom: "bottom",
		left: "left",
		"inline-end": H ? "left" : "right",
		"inline-start": H ? "right" : "left"
	}[s], de = d === "center" ? ue : `${ue}-${d}`, U = m, fe = s === "bottom" ? 1 : 0, pe = s === "top" ? 1 : 0, me = s === "right" ? 1 : 0, he = s === "left" ? 1 : 0;
	typeof U == "number" ? U = {
		top: U + fe,
		right: U + he,
		bottom: U + pe,
		left: U + me
	} : U &&= {
		top: (U.top || 0) + fe,
		right: (U.right || 0) + he,
		bottom: (U.bottom || 0) + pe,
		left: (U.left || 0) + me
	};
	let W = {
		boundary: p === "clipping-ancestors" ? "clippingAncestors" : p,
		padding: U
	}, G = A.useRef(null), ge = x(l), _e = x(f), K = [r((e) => {
		let t = R(e, s, H), n = typeof ge.current == "function" ? ge.current(t) : ge.current, r = typeof _e.current == "function" ? _e.current(t) : _e.current;
		return {
			mainAxis: n,
			crossAxis: r,
			alignmentAxis: r
		};
	}, [
		typeof l == "function" ? 0 : l,
		typeof f == "function" ? 0 : f,
		H,
		s
	])], ve = B === "none" && z !== "shift", ye = !ve && (_ || O || z === "shift"), be = z === "none" ? null : c({
		...W,
		padding: {
			top: U.top + 1,
			right: U.right + 1,
			bottom: U.bottom + 1,
			left: U.left + 1
		},
		mainAxis: !O && z === "flip",
		crossAxis: B === "flip" ? "alignment" : !1,
		fallbackAxisSideDirection: oe
	}), xe = ve ? null : t((e) => {
		let t = k(e.elements.floating).documentElement;
		return {
			...W,
			rootBoundary: O ? {
				x: 0,
				y: 0,
				width: t.clientWidth,
				height: t.clientHeight
			} : void 0,
			mainAxis: B !== "none",
			crossAxis: ye,
			limiter: _ || O ? void 0 : i((e) => {
				if (!G.current) return {};
				let { width: t, height: n } = G.current.getBoundingClientRect(), r = S(C(e.placement)), i = r === "y" ? t : n, a = r === "y" ? U.left + U.right : U.top + U.bottom;
				return { offset: i / 2 + a / 2 };
			})
		};
	}, [
		W,
		_,
		O,
		U,
		B
	]);
	z === "shift" || B === "shift" || d === "center" ? K.push(xe, be) : K.push(be, xe), K.push(u({
		...W,
		apply({ elements: { floating: e }, rects: { reference: t }, availableWidth: n, availableHeight: r }) {
			Object.entries({
				"--available-width": `${n}px`,
				"--available-height": `${r}px`,
				"--anchor-width": `${t.width}px`,
				"--anchor-height": `${t.height}px`
			}).forEach(([t, n]) => {
				e.style.setProperty(t, n);
			});
		}
	}), P(() => ({
		element: G.current || document.createElement("div"),
		padding: v,
		offsetParent: "floating"
	}), [v]), {
		name: "transformOrigin",
		fn(e) {
			let { elements: t, middlewareData: n, placement: r, rects: i, y: a } = e, o = C(r), c = S(o), u = G.current, d = n.arrow?.x || 0, f = n.arrow?.y || 0, p = u?.clientWidth || 0, m = u?.clientHeight || 0, h = d + p / 2, g = f + m / 2, _ = Math.abs(n.shift?.y || 0), v = i.reference.height / 2, y = typeof l == "function" ? l(R(e, s, H)) : l, b = _ > y, x = {
				top: `${h}px calc(100% + ${y}px)`,
				bottom: `${h}px ${-y}px`,
				left: `calc(100% + ${y}px) ${g}px`,
				right: `${-y}px ${g}px`
			}[o], w = `${h}px ${i.reference.y + v - a}px`;
			return t.floating.style.setProperty("--transform-origin", ye && c === "y" && b ? w : x), {};
		}
	}, te, N), h(() => {
		!E && T && T.update({
			referenceElement: null,
			floatingElement: null,
			domReferenceElement: null
		});
	}, [E, T]);
	let Se = A.useMemo(() => ({
		elementResize: !y && typeof ResizeObserver < "u",
		layoutShift: !y && typeof IntersectionObserver < "u"
	}), [y]), { refs: q, elements: J, x: Ce, y: we, middlewareData: Y, update: X, placement: Te, context: Ee, isPositioned: Z, floatingStyles: De } = M({
		rootContext: T,
		placement: de,
		middleware: K,
		strategy: o,
		whileElementsMounted: w ? void 0 : (...e) => n(...e, Se),
		nodeId: j,
		externalTree: ne
	}), { sideX: Oe, sideY: ke } = Y.adaptiveOrigin || F, Ae = Z ? o : "fixed", je = A.useMemo(() => N ? {
		position: Ae,
		[Oe]: Ce,
		[ke]: we
	} : {
		position: Ae,
		...De
	}, [
		N,
		Ae,
		Oe,
		Ce,
		ke,
		we,
		De
	]), Q = A.useRef(null);
	h(() => {
		if (!E) return;
		let e = V.current, t = typeof e == "function" ? e() : e, n = (re(t) ? t.current : t) || null;
		n !== Q.current && (q.setPositionReference(n), Q.current = n);
	}, [
		E,
		q,
		le,
		V
	]), A.useEffect(() => {
		if (!E) return;
		let e = V.current;
		typeof e != "function" && re(e) && e.current !== Q.current && (q.setPositionReference(e.current), Q.current = e.current);
	}, [
		E,
		q,
		le,
		V
	]), A.useEffect(() => {
		if (w && E && J.domReference && J.floating) return n(J.domReference, J.floating, X, Se);
	}, [
		w,
		E,
		J,
		X,
		Se
	]);
	let $ = C(Te), Me = L(s, $, H), Ne = ee(Te) || "center", Pe = !!Y.hide?.referenceHidden;
	h(() => {
		I && E && Z && ae($);
	}, [
		I,
		E,
		Z,
		$
	]);
	let Fe = A.useMemo(() => ({
		position: "absolute",
		top: Y.arrow?.y,
		left: Y.arrow?.x
	}), [Y.arrow]), Ie = Y.arrow?.centerOffset !== 0;
	return A.useMemo(() => ({
		positionerStyles: je,
		arrowStyles: Fe,
		arrowRef: G,
		arrowUncentered: Ie,
		side: Me,
		align: Ne,
		physicalSide: $,
		anchorHidden: Pe,
		refs: q,
		context: Ee,
		isPositioned: Z,
		update: X
	}), [
		je,
		Fe,
		G,
		Ie,
		Me,
		Ne,
		$,
		Pe,
		q,
		Ee,
		Z,
		X
	]);
}
function re(e) {
	return e != null && "current" in e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/getDisabledMountTransitionStyles.js
function ie(e) {
	return e === "starting" ? m : f;
}
//#endregion
export { j as i, ne as n, I as r, ie as t };
