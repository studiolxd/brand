import { h as e } from "./useRenderElement.js";
import { L as t, R as n } from "./floating-ui.utils.dom.js";
import * as r from "react";
import { jsx as i } from "react/jsx-runtime";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/composite/list/CompositeListContext.js
var a = /* @__PURE__ */ r.createContext({
	register: () => {},
	unregister: () => {},
	subscribeMapChange: () => () => {},
	elementsRef: { current: [] },
	nextIndexRef: { current: 0 }
});
process.env.NODE_ENV !== "production" && (a.displayName = "CompositeListContext");
function o() {
	return r.useContext(a);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/composite/list/CompositeList.js
function s(o) {
	let { children: s, elementsRef: d, labelsRef: f, onMapChange: p } = o, m = n(p), h = r.useRef(0), g = e(l).current, _ = e(c).current, [v, y] = r.useState(0), b = r.useRef(v), x = n((e, t) => {
		_.set(e, t ?? null), b.current += 1, y(b.current);
	}), S = n((e) => {
		_.delete(e), b.current += 1, y(b.current);
	}), C = r.useMemo(() => {
		let e = /* @__PURE__ */ new Map();
		return Array.from(_.keys()).filter((e) => e.isConnected).sort(u).forEach((t, n) => {
			let r = _.get(t) ?? {};
			e.set(t, {
				...r,
				index: n
			});
		}), e;
	}, [_, v]);
	t(() => {
		if (typeof MutationObserver != "function" || C.size === 0) return;
		let e = new MutationObserver((e) => {
			let t = /* @__PURE__ */ new Set(), n = (e) => t.has(e) ? t.delete(e) : t.add(e);
			e.forEach((e) => {
				e.removedNodes.forEach(n), e.addedNodes.forEach(n);
			}), t.size === 0 && (b.current += 1, y(b.current));
		});
		return C.forEach((t, n) => {
			n.parentElement && e.observe(n.parentElement, { childList: !0 });
		}), () => {
			e.disconnect();
		};
	}, [C]), t(() => {
		b.current === v && (d.current.length !== C.size && (d.current.length = C.size), f && f.current.length !== C.size && (f.current.length = C.size), h.current = C.size), m(C);
	}, [
		m,
		C,
		d,
		f,
		v
	]), t(() => () => {
		d.current = [];
	}, [d]), t(() => () => {
		f && (f.current = []);
	}, [f]);
	let w = n((e) => (g.add(e), () => {
		g.delete(e);
	}));
	t(() => {
		g.forEach((e) => e(C));
	}, [g, C]);
	let T = r.useMemo(() => ({
		register: x,
		unregister: S,
		subscribeMapChange: w,
		elementsRef: d,
		labelsRef: f,
		nextIndexRef: h
	}), [
		x,
		S,
		w,
		d,
		f,
		h
	]);
	return /* @__PURE__ */ i(a.Provider, {
		value: T,
		children: s
	});
}
function c() {
	return /* @__PURE__ */ new Map();
}
function l() {
	return /* @__PURE__ */ new Set();
}
function u(e, t) {
	let n = e.compareDocumentPosition(t);
	return n & Node.DOCUMENT_POSITION_FOLLOWING || n & Node.DOCUMENT_POSITION_CONTAINED_BY ? -1 : n & Node.DOCUMENT_POSITION_PRECEDING || n & Node.DOCUMENT_POSITION_CONTAINS ? 1 : 0;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/composite/list/useCompositeListItem.js
var d = /* @__PURE__ */ function(e) {
	return e[e.None = 0] = "None", e[e.GuessFromOrder = 1] = "GuessFromOrder", e;
}({});
function f(e = {}) {
	let { label: n, metadata: i, textRef: a, indexGuessBehavior: s, index: c } = e, { register: l, unregister: u, subscribeMapChange: f, elementsRef: p, labelsRef: m, nextIndexRef: h } = o(), g = r.useRef(-1), [_, v] = r.useState(c ?? (s === d.GuessFromOrder ? () => {
		if (g.current === -1) {
			let e = h.current;
			h.current += 1, g.current = e;
		}
		return g.current;
	} : -1)), y = r.useRef(null), b = r.useCallback((e) => {
		if (y.current = e, _ !== -1 && e !== null && (p.current[_] = e, m)) {
			let t = n !== void 0;
			m.current[_] = t ? n : a?.current?.textContent ?? e.textContent;
		}
	}, [
		_,
		p,
		m,
		n,
		a
	]);
	return t(() => {
		if (c != null) return;
		let e = y.current;
		if (e) return l(e, i), () => {
			u(e);
		};
	}, [
		c,
		l,
		u,
		i
	]), t(() => {
		if (c == null) return f((e) => {
			let t = y.current ? e.get(y.current)?.index : null;
			t != null && v(t);
		});
	}, [
		c,
		f,
		v
	]), r.useMemo(() => ({
		ref: b,
		index: _
	}), [_, b]);
}
//#endregion
export { f as n, s as r, d as t };
