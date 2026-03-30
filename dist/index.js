import { Fragment as e, jsx as t, jsxs as n } from "react/jsx-runtime";
import r from "embla-carousel-react";
import * as i from "@radix-ui/react-select";
import { getCountryCallingCode as a } from "libphonenumber-js";
import o from "react-phone-number-input";
import { useState as s } from "react";
import c from "embla-carousel-auto-scroll";
//#region src/stories/atoms/Arrow/Arrow.tsx
function l({ size: e = "md", className: n }) {
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
function u({ src: e, alt: n, className: r }) {
	return /* @__PURE__ */ t("img", {
		src: e,
		alt: n,
		className: ["avatar", r].filter(Boolean).join(" ")
	});
}
//#endregion
//#region src/stories/atoms/Button/Button.tsx
function d({ variant: e = "primary", size: n = "md", block: r = !1, children: i, type: a = "button", disabled: o, onClick: s }) {
	return /* @__PURE__ */ t("button", {
		className: [
			"btn",
			`btn-${e}`,
			n === "md" ? "" : `btn-${n}`,
			r ? "btn-block" : ""
		].filter(Boolean).join(" "),
		type: a,
		disabled: o,
		onClick: s,
		children: i
	});
}
//#endregion
//#region src/stories/atoms/Chevron/Chevron.tsx
function f({ size: e, className: n }) {
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
function p({ children: e, options: i, plugins: a, hideButtons: o, className: s, slideSize: c, gradientColor: l }) {
	let [u, d] = r({
		loop: !0,
		...i
	}, a), p = {
		...c ? { "--carousel-slide-size": c } : {},
		...l ? { "--carousel-gradient-color": l } : {}
	};
	return /* @__PURE__ */ n("div", {
		className: ["carousel", s].filter(Boolean).join(" "),
		style: p,
		children: [
			!o && /* @__PURE__ */ t("button", {
				className: "carousel__btn carousel__btn--prev",
				onClick: () => d?.scrollPrev(),
				"aria-label": "Anterior",
				type: "button",
				children: /* @__PURE__ */ t(f, {
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
				children: /* @__PURE__ */ t(f, {
					className: "carousel__chevron",
					size: "lg"
				})
			})
		]
	});
}
function m({ children: e, className: n }) {
	return /* @__PURE__ */ t("div", {
		className: ["carousel__slide", n].filter(Boolean).join(" "),
		children: e
	});
}
//#endregion
//#region src/stories/atoms/Checkbox/Checkbox.tsx
function h({ checked: e, defaultChecked: n, disabled: r, id: i, name: a, value: o, "aria-label": s, "aria-labelledby": c, onChange: l }) {
	return /* @__PURE__ */ t("input", {
		className: "checkbox",
		type: "checkbox",
		checked: e,
		defaultChecked: n,
		disabled: r,
		id: i,
		name: a,
		value: o,
		"aria-label": s,
		"aria-labelledby": c,
		onChange: l
	});
}
//#endregion
//#region src/stories/atoms/Hamburger/Hamburger.tsx
function g({ isOpen: e = !1, onClick: r, label: i = "Menu" }) {
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
function _({ level: e = 2, children: n }) {
	return /* @__PURE__ */ t(`h${e}`, {
		className: `heading heading--${e}`,
		children: n
	});
}
//#endregion
//#region src/stories/atoms/Input/Input.tsx
function v({ type: e = "text", placeholder: n, value: r, defaultValue: i, disabled: a, readOnly: o, size: s = "md", error: c = !1, id: l, name: u, describedBy: d, onChange: f, onBlur: p, onFocus: m }) {
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
function y({ value: e, onChange: r, options: o, disabled: s, dark: c }) {
	let l = "__intl__", u = (e) => e ?? l, d = (e) => e === l ? void 0 : e;
	return /* @__PURE__ */ n(i.Root, {
		value: u(e),
		onValueChange: (e) => r(d(e)),
		disabled: s,
		children: [/* @__PURE__ */ n(i.Trigger, {
			className: "input-phone__country",
			"aria-label": "País",
			children: [/* @__PURE__ */ t(i.Value, { children: e ? `+${a(e)}` : "🌐" }), /* @__PURE__ */ t(i.Icon, {
				asChild: !0,
				children: /* @__PURE__ */ t(f, {
					className: "input-phone__country-icon",
					size: "sm"
				})
			})]
		}), /* @__PURE__ */ t(i.Portal, { children: /* @__PURE__ */ t(i.Content, {
			className: ["input-phone__country-content", c ? "input-phone__country-content--dark" : ""].filter(Boolean).join(" "),
			position: "popper",
			children: /* @__PURE__ */ t(i.Viewport, { children: o.map(({ value: e, label: n }) => /* @__PURE__ */ t(i.Item, {
				value: u(e),
				className: "input-phone__country-item",
				children: /* @__PURE__ */ t(i.ItemText, { children: n })
			}, u(e))) })
		}) })]
	});
}
function b({ value: e, defaultCountry: n = "ES", placeholder: r, disabled: i, error: a = !1, dark: s, id: c, name: l, describedBy: u, onChange: d, onBlur: f }) {
	return /* @__PURE__ */ t(o, {
		className: [
			"input-phone",
			a ? "input-phone--error" : "",
			s ? "input-phone--dark" : ""
		].filter(Boolean).join(" "),
		value: e,
		defaultCountry: n,
		placeholder: r,
		disabled: i,
		id: c,
		name: l,
		inputComponent: x,
		countrySelectComponent: y,
		countrySelectProps: { dark: s },
		onChange: (e) => d?.(e),
		onBlur: f,
		numberInputProps: { "aria-describedby": u }
	});
}
var x = ({ className: e, ...n }) => /* @__PURE__ */ t("input", {
	className: "input-phone__number",
	...n
});
x.displayName = "InputPhoneField";
//#endregion
//#region src/stories/atoms/Label/Label.tsx
function S({ htmlFor: e, children: n, hidden: r = !1 }) {
	return /* @__PURE__ */ t("label", {
		htmlFor: e,
		className: ["label", r ? "visually-hidden" : ""].filter(Boolean).join(" "),
		children: n
	});
}
//#endregion
//#region src/stories/atoms/Link/Link.tsx
function C({ href: e, children: n, external: r = !1 }) {
	return /* @__PURE__ */ t("a", {
		href: e,
		className: "link",
		...r ? {
			target: "_blank",
			rel: "noopener noreferrer"
		} : {},
		children: n
	});
}
//#endregion
//#region src/stories/atoms/List/List.tsx
function w({ type: e = "unordered", children: n }) {
	return /* @__PURE__ */ t(e === "ordered" ? "ol" : "ul", {
		className: `list list--${e}`,
		children: n
	});
}
//#endregion
//#region src/stories/atoms/Logo/Logo.tsx
function T({ width: r, height: i, className: a }) {
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
		className: a ?? "logo",
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
function E({ size: e = "default", children: n }) {
	return /* @__PURE__ */ t("p", {
		className: ["paragraph", e === "default" ? "" : `paragraph--${e}`].filter(Boolean).join(" "),
		children: n
	});
}
//#endregion
//#region src/stories/atoms/Select/Select.tsx
function D({ options: e, value: r, defaultValue: a, placeholder: o = "Seleccionar…", disabled: s, dark: c, onValueChange: l, id: u }) {
	return /* @__PURE__ */ n(i.Root, {
		value: r,
		defaultValue: a,
		disabled: s,
		onValueChange: l,
		children: [/* @__PURE__ */ n(i.Trigger, {
			className: ["select", c ? "select--dark" : ""].filter(Boolean).join(" "),
			id: u,
			"aria-label": o,
			children: [/* @__PURE__ */ t(i.Value, { placeholder: o }), /* @__PURE__ */ t(i.Icon, {
				asChild: !0,
				children: /* @__PURE__ */ t(f, {
					className: "select__icon",
					size: "sm"
				})
			})]
		}), /* @__PURE__ */ t(i.Portal, { children: /* @__PURE__ */ t(i.Content, {
			className: ["select__content", c ? "select__content--dark" : ""].filter(Boolean).join(" "),
			position: "popper",
			children: /* @__PURE__ */ t(i.Viewport, { children: e.map(({ value: e, label: n }) => /* @__PURE__ */ t(i.Item, {
				value: e,
				className: "select__item",
				children: /* @__PURE__ */ t(i.ItemText, { children: n })
			}, e)) })
		}) })]
	});
}
//#endregion
//#region src/stories/atoms/Tag/Tag.tsx
function O({ variant: e = "default", children: n }) {
	return /* @__PURE__ */ t("span", {
		className: ["tag", `tag--${e}`].join(" "),
		children: n
	});
}
//#endregion
//#region src/stories/atoms/Textarea/Textarea.tsx
function k({ placeholder: e, value: n, defaultValue: r, rows: i, disabled: a, readOnly: o, error: s = !1, id: c, name: l, describedBy: u, onChange: d, onBlur: f, onFocus: p }) {
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
//#region src/stories/molecules/Card/Card.tsx
function A({ href: e, title: r, description: i, ctaLabel: a, color: o }) {
	return /* @__PURE__ */ n("a", {
		href: e,
		className: ["card", `card--${o}`].join(" "),
		children: [
			/* @__PURE__ */ t("h2", { children: r }),
			/* @__PURE__ */ t("p", { children: i }),
			/* @__PURE__ */ t("span", {
				className: "visually-hidden",
				children: a
			}),
			/* @__PURE__ */ t(l, { size: "lg" })
		]
	});
}
//#endregion
//#region src/stories/molecules/CardSplit/CardSplit.tsx
function j({ href: e, title: r, description: i, ctaLabel: a, color: o, image: s }) {
	return /* @__PURE__ */ n("a", {
		href: e,
		className: ["card-split", `card-split--${o}`].join(" "),
		children: [/* @__PURE__ */ n("div", {
			className: "card-split__primary",
			children: [
				/* @__PURE__ */ t("h2", {
					className: "card-split__title",
					children: r
				}),
				/* @__PURE__ */ t("p", {
					className: "card-split__description",
					children: i
				}),
				/* @__PURE__ */ t(l, {
					className: "card-split__arrow",
					size: "lg"
				}),
				/* @__PURE__ */ t("span", {
					className: "visually-hidden",
					children: a
				})
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
function M({ href: e, title: r, description: i, ctaLabel: a, color: o, image: s }) {
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
				/* @__PURE__ */ t("h2", {
					className: "card-square__title",
					children: r
				}),
				/* @__PURE__ */ t("p", {
					className: "card-square__description",
					children: i
				}),
				/* @__PURE__ */ t(l, {
					className: "card-square__arrow",
					size: "lg"
				}),
				/* @__PURE__ */ t("span", {
					className: "visually-hidden",
					children: a
				})
			]
		})]
	});
}
//#endregion
//#region src/stories/molecules/CheckboxField/CheckboxField.tsx
function N({ label: e, checked: r, defaultChecked: i, disabled: a, id: o, name: s, value: c, onChange: l }) {
	return /* @__PURE__ */ n("label", {
		className: ["checkbox-field", a ? "checkbox-field--disabled" : ""].filter(Boolean).join(" "),
		children: [/* @__PURE__ */ t(h, {
			checked: r,
			defaultChecked: i,
			disabled: a,
			id: o,
			name: s,
			value: c,
			onChange: l
		}), /* @__PURE__ */ t("span", {
			className: "checkbox-field__label",
			children: e
		})]
	});
}
//#endregion
//#region src/stories/molecules/Form/Form.tsx
function P({ errors: e, onSubmit: r, actions: i, children: a }) {
	return /* @__PURE__ */ n("form", {
		className: "form",
		onSubmit: r,
		noValidate: !0,
		children: [
			a,
			e && e.length > 0 && /* @__PURE__ */ t("ul", {
				className: "form-errors",
				children: e.map((e, n) => /* @__PURE__ */ t("li", {
					className: "form-errors__item",
					children: e
				}, n))
			}),
			i
		]
	});
}
//#endregion
//#region src/stories/molecules/InputField/InputField.tsx
function F({ id: e, label: r, labelHidden: i = !0, name: a, type: o, placeholder: s, value: c, defaultValue: l, disabled: u, readOnly: d, error: f = !1, errorMessage: p, helperText: m, onChange: h, onBlur: g, onFocus: _ }) {
	let y = p ? `${e}-error` : void 0, b = m ? `${e}-helper` : void 0, x = [y, b].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ n("div", {
		className: "input-field",
		children: [
			/* @__PURE__ */ t(S, {
				htmlFor: e,
				hidden: i,
				children: r
			}),
			/* @__PURE__ */ t(v, {
				id: e,
				name: a,
				type: o,
				placeholder: s,
				value: c,
				defaultValue: l,
				disabled: u,
				readOnly: d,
				error: f,
				describedBy: x,
				onChange: h,
				onBlur: g,
				onFocus: _
			}),
			p && /* @__PURE__ */ t("span", {
				id: y,
				className: "input-field__error",
				children: p
			}),
			m && /* @__PURE__ */ t("span", {
				id: b,
				className: "input-field__helper",
				children: m
			})
		]
	});
}
//#endregion
//#region src/stories/molecules/InputPhoneField/InputPhoneField.tsx
function I({ id: e, value: r, defaultCountry: i, placeholder: a, disabled: o, error: s = !1, errorMessage: c, helperText: l, dark: u, name: d, onChange: f, onBlur: p }) {
	let m = c ? `${e}-error` : void 0, h = l ? `${e}-helper` : void 0, g = [m, h].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ n("div", {
		className: ["input-phone-field", u ? "input-phone-field--dark" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ t(b, {
				id: e,
				name: d,
				value: r,
				defaultCountry: i,
				placeholder: a,
				disabled: o,
				error: s,
				dark: u,
				describedBy: g,
				onChange: f,
				onBlur: p
			}),
			c && /* @__PURE__ */ t("span", {
				id: m,
				className: "input-phone-field__error",
				children: c
			}),
			l && /* @__PURE__ */ t("span", {
				id: h,
				className: "input-phone-field__helper",
				children: l
			})
		]
	});
}
//#endregion
//#region src/stories/molecules/TextareaField/TextareaField.tsx
function L({ id: e, label: r, labelHidden: i = !0, name: a, placeholder: o, value: s, defaultValue: c, rows: l, disabled: u, readOnly: d, error: f = !1, errorMessage: p, helperText: m, onChange: h, onBlur: g, onFocus: _ }) {
	let v = p ? `${e}-error` : void 0, y = m ? `${e}-helper` : void 0, b = [v, y].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ n("div", {
		className: "textarea-field",
		children: [
			/* @__PURE__ */ t(S, {
				htmlFor: e,
				hidden: i,
				children: r
			}),
			/* @__PURE__ */ t(k, {
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
function R({ emailPlaceholder: e = "Escribe aquí tu correo electrónico", messagePlaceholder: r = "Escribe aquí tu mensaje", messageRows: i = 5, privacyLabel: a, buttonLabel: o = "Enviar mensaje", submitting: c = !1, submittingLabel: l = "Enviando…", errors: u, success: f = !1, successMessage: p = "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.", onSubmit: m }) {
	let [h, g] = s(!1);
	return f ? /* @__PURE__ */ t("p", {
		className: "form__success",
		children: p
	}) : /* @__PURE__ */ n(P, {
		errors: u,
		onSubmit: m,
		actions: /* @__PURE__ */ t(d, {
			variant: "form",
			disabled: c,
			children: c ? l : o
		}),
		children: [
			/* @__PURE__ */ t(F, {
				id: "contact-email",
				label: "Email",
				labelHidden: !0,
				type: "email",
				placeholder: e,
				disabled: c
			}),
			/* @__PURE__ */ t(L, {
				id: "contact-message",
				label: "Mensaje",
				labelHidden: !0,
				placeholder: r,
				rows: i,
				disabled: c
			}),
			/* @__PURE__ */ t(N, {
				id: "contact-phone",
				label: "Prefiero que me llaméis por teléfono",
				disabled: c,
				checked: h,
				onChange: (e) => g(e.target.checked)
			}),
			h && /* @__PURE__ */ t(I, {
				id: "contact-phone-number",
				placeholder: "Escribe aquí tu número de teléfono",
				helperText: "Solo utilizaremos tu número de teléfono para hablarte sobre este proyecto.",
				disabled: c
			}),
			/* @__PURE__ */ t(N, {
				id: "contact-privacy",
				label: a,
				disabled: c
			})
		]
	});
}
//#endregion
//#region src/stories/organisms/NewsletterForm/NewsletterForm.tsx
function z({ emailPlaceholder: e = "Escribe aquí tu correo electrónico", privacyLabel: r, buttonLabel: i = "Suscríbeme a la newsletter", submitting: a = !1, submittingLabel: o = "Suscribiéndote…", errors: s, success: c = !1, successMessage: l = "¡Gracias por suscribirte! Ya no te perderás ninguna de nuestras novedades.", onSubmit: u }) {
	return c ? /* @__PURE__ */ t("p", {
		className: "form__success",
		children: l
	}) : /* @__PURE__ */ t("div", {
		className: "newsletter-form",
		children: /* @__PURE__ */ n(P, {
			errors: s,
			onSubmit: u,
			actions: /* @__PURE__ */ t(d, {
				variant: "form",
				disabled: a,
				children: a ? o : i
			}),
			children: [/* @__PURE__ */ t(F, {
				id: "newsletter-email",
				label: "Email",
				labelHidden: !0,
				type: "email",
				placeholder: e,
				disabled: a
			}), /* @__PURE__ */ t(N, {
				id: "newsletter-privacy",
				label: r,
				disabled: a
			})]
		})
	});
}
//#endregion
//#region src/stories/sections/ClientsSection/ClientsSection.tsx
function B({ title: e = "Hemos trabajado junto a...", clients: r }) {
	return /* @__PURE__ */ n("section", {
		className: "clients-section",
		children: [/* @__PURE__ */ t("h2", { children: e }), /* @__PURE__ */ t(p, {
			options: { align: "start" },
			plugins: [c({
				speed: 1,
				stopOnInteraction: !1
			})],
			hideButtons: !0,
			children: r.map((e) => /* @__PURE__ */ t(m, {
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
function V({ title: e, form: r, whatsappTitle: i, whatsappLabel: a, whatsappHref: o }) {
	return /* @__PURE__ */ n("section", {
		className: "contact-section",
		children: [/* @__PURE__ */ n("div", {
			className: "contact-section__left",
			children: [/* @__PURE__ */ t("div", {
				className: "contact-section__intro",
				children: /* @__PURE__ */ t(_, {
					level: 2,
					children: e
				})
			}), /* @__PURE__ */ n("aside", {
				className: "contact-section__cta",
				children: [/* @__PURE__ */ t(_, {
					level: 3,
					children: i
				}), /* @__PURE__ */ t("a", {
					href: o,
					className: "btn btn-primary",
					target: "_blank",
					rel: "noopener noreferrer",
					children: a
				})]
			})]
		}), /* @__PURE__ */ t("div", {
			className: "contact-section__form",
			children: /* @__PURE__ */ t(R, { ...r })
		})]
	});
}
//#endregion
//#region src/stories/sections/Footer/Footer.tsx
function H() {
	return /* @__PURE__ */ n("footer", {
		className: "footer dark",
		children: [
			/* @__PURE__ */ n("div", {
				className: "footer__col footer__col--1",
				children: [/* @__PURE__ */ n("h2", {
					className: "footer__tagline",
					children: [
						/* @__PURE__ */ t("span", { children: "Learning" }),
						/* @__PURE__ */ t("span", { children: "experience" }),
						/* @__PURE__ */ t("span", { children: "design" })
					]
				}), /* @__PURE__ */ t("div", {
					className: "footer__logo",
					children: /* @__PURE__ */ t(T, { height: 50 })
				})]
			}),
			/* @__PURE__ */ n("div", {
				className: "footer__col footer__col--2",
				children: [/* @__PURE__ */ t(_, {
					level: 3,
					children: "Suscríbete a nuestra newsletter"
				}), /* @__PURE__ */ t(z, { privacyLabel: /* @__PURE__ */ n(e, { children: [
					"He leído la ",
					/* @__PURE__ */ t("a", {
						href: "#",
						children: "política de privacidad"
					}),
					" y consiento recibir la newsletter"
				] }) })]
			}),
			/* @__PURE__ */ n("div", {
				className: "footer__col footer__col--3",
				children: [/* @__PURE__ */ n("ul", { children: [
					/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", {
						href: "#",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "LinkedIn"
					}) }),
					/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", {
						href: "#",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Instagram"
					}) }),
					/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", {
						href: "#",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "GitHub"
					}) })
				] }), /* @__PURE__ */ n("address", {
					className: "footer__contact",
					children: [/* @__PURE__ */ t("a", {
						href: "mailto:hello@studiolxd.com",
						children: "hello@studiolxd.com"
					}), /* @__PURE__ */ t("a", {
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
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", {
							href: "#",
							children: "Aviso legal"
						}) }),
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", {
							href: "#",
							children: "Política de privacidad"
						}) }),
						/* @__PURE__ */ t("li", { children: /* @__PURE__ */ t("a", {
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
function U({ navItems: e, featuredLink: r, actions: i, logoHref: a = "/", logoLabel: o = "Studio LXD — ir al inicio", navLabel: c = "Main navigation", dark: l = !1 }) {
	let [u, d] = s(!1), f = () => {
		d(!1);
	};
	return /* @__PURE__ */ n("header", {
		className: [
			"header",
			l ? "header--dark" : "",
			l ? "dark" : ""
		].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ t("a", {
				href: a,
				className: "header__logo",
				"aria-label": o,
				children: /* @__PURE__ */ t(T, {})
			}),
			/* @__PURE__ */ t(g, {
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
function W({ text: e, align: n = "left", textAlign: r, className: i }) {
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
function G({ intro: e, ctaLabel: r, ctaHref: i, steps: a }) {
	return /* @__PURE__ */ n("section", {
		className: "methodology-section",
		children: [/* @__PURE__ */ n("div", {
			className: "methodology-section__intro",
			children: [/* @__PURE__ */ t("p", { children: e }), /* @__PURE__ */ t("a", {
				href: i,
				className: "btn btn-primary",
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
			}, r))
		})]
	});
}
//#endregion
//#region src/stories/sections/ProjectsSection/ProjectsSection.tsx
function K({ title: e = "Proyectos", projects: r }) {
	return /* @__PURE__ */ n("section", {
		className: "projects-section",
		children: [/* @__PURE__ */ t("h2", { children: e }), /* @__PURE__ */ t(p, {
			options: { align: "center" },
			children: r.map((e) => /* @__PURE__ */ t(m, { children: /* @__PURE__ */ n("a", {
				className: "project-card",
				href: e.href,
				children: [
					/* @__PURE__ */ t(O, {
						variant: e.tagVariant ?? "default",
						children: e.category
					}),
					/* @__PURE__ */ t("h3", {
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
						className: "project-card__cta btn btn-primary",
						children: "Leer más"
					})
				]
			}) }, e.id))
		})]
	});
}
//#endregion
//#region src/stories/sections/ReviewsSection/ReviewsSection.tsx
function q({ title: e = "Lo que dice nuestro alumnado", reviews: r }) {
	return /* @__PURE__ */ n("section", {
		className: "reviews-section dark",
		children: [/* @__PURE__ */ t("h2", { children: e }), /* @__PURE__ */ t(p, {
			options: {
				align: "center",
				loop: !0
			},
			gradientColor: "var(--color-background-dark)",
			children: r.map((e) => /* @__PURE__ */ t(m, { children: /* @__PURE__ */ n("article", {
				className: "review-card",
				children: [/* @__PURE__ */ n("footer", {
					className: "review-card__footer",
					children: [/* @__PURE__ */ t(u, {
						src: e.photo,
						alt: e.author,
						className: "review-card__avatar"
					}), /* @__PURE__ */ n("div", {
						className: "review-card__identity",
						children: [/* @__PURE__ */ t("h3", {
							className: "review-card__author",
							children: e.author
						}), /* @__PURE__ */ t("h4", {
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
function J({ items: e }) {
	return /* @__PURE__ */ t("section", {
		className: "solutions-section",
		children: e.map((e, n) => /* @__PURE__ */ t(A, { ...e }, n))
	});
}
//#endregion
//#region src/stories/sections/ReviewsSection/ReviewsSection.stories.tsx
var Y = [
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
], X = [
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
], Z = [
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
], Q = [
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
}, ee = [
	{ text: "Preguntamos para conocer vuestras necesidades." },
	{ text: "Colaboramos con vuestro equipo quienes tienen el know how de la organización." },
	{ text: "Asesoramos sobre las mejores soluciones." },
	{ text: "Acompañamos hasta implementar la solución." }
], te = {
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
}, ne = [{
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
}];
//#endregion
//#region src/stories/pages/Home/Home.tsx
function re() {
	return /* @__PURE__ */ n("div", {
		className: "home",
		children: [
			/* @__PURE__ */ t(U, {
				navItems: Q,
				featuredLink: $,
				actions: /* @__PURE__ */ n(e, { children: [/* @__PURE__ */ t(D, {
					options: [{
						value: "es",
						label: "ES"
					}, {
						value: "en",
						label: "EN"
					}],
					defaultValue: "es"
				}), /* @__PURE__ */ t("a", {
					href: "https://academy.studiolxd.com",
					className: "btn btn-primary",
					children: "Entra a la academia"
				})] })
			}),
			/* @__PURE__ */ n("main", {
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
					/* @__PURE__ */ t(J, { items: ne }),
					/* @__PURE__ */ t(G, {
						intro: "Te acompañamos durante todo el proceso",
						ctaLabel: "Descubre cómo trabajamos",
						ctaHref: "#",
						steps: ee
					}),
					/* @__PURE__ */ t(K, {
						title: "Nuestros trabajos",
						projects: X
					}),
					/* @__PURE__ */ t(W, {
						text: "Fórmate en la academia de Studio LXD. Aprende sobre diseño instruccional y herramientas para crear contenidos elearning con nuestros cursos.",
						align: "center"
					}),
					/* @__PURE__ */ n("section", {
						className: "home__courses",
						children: [
							/* @__PURE__ */ t(M, {
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
							/* @__PURE__ */ t(M, {
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
							/* @__PURE__ */ t(j, {
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
							/* @__PURE__ */ t(j, {
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
					}),
					/* @__PURE__ */ t(q, {
						title: "Lo que dice nuestro alumnado",
						reviews: Y
					}),
					/* @__PURE__ */ t(B, {
						title: "Clientes",
						clients: Z
					}),
					/* @__PURE__ */ t(V, { ...te })
				]
			}),
			/* @__PURE__ */ t(H, {})
		]
	});
}
//#endregion
//#region src/stories/pages/Legal/Legal.tsx
var ie = [
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
], ae = {
	label: "Cursos online",
	href: "#"
};
function oe({ section: e, index: r }) {
	let [i, a] = s(!1), o = `legal-section-${r}`;
	return /* @__PURE__ */ n("div", {
		className: `legal-accordion__item${i ? " legal-accordion__item--open" : ""}`,
		children: [/* @__PURE__ */ n("button", {
			className: "legal-accordion__header",
			onClick: () => a((e) => !e),
			"aria-expanded": i,
			"aria-controls": o,
			children: [
				/* @__PURE__ */ t("span", {
					className: "legal-accordion__counter",
					children: String(r + 1).padStart(2, "0")
				}),
				/* @__PURE__ */ t("h2", {
					className: "legal-accordion__title",
					children: e.title
				}),
				/* @__PURE__ */ t(f, {
					className: "legal-accordion__chevron",
					size: "lg"
				})
			]
		}), /* @__PURE__ */ t("div", {
			className: "legal-accordion__body",
			id: o,
			role: "region",
			children: /* @__PURE__ */ t("div", {
				className: "legal-accordion__body-inner",
				children: e.content
			})
		})]
	});
}
function se({ title: e, sections: r }) {
	return /* @__PURE__ */ n("div", {
		className: "legal-page",
		children: [
			/* @__PURE__ */ t(U, {
				navItems: ie,
				featuredLink: ae,
				actions: /* @__PURE__ */ t("a", {
					href: "https://academy.studiolxd.com",
					className: "btn btn-primary",
					children: "Entra a la academia"
				})
			}),
			/* @__PURE__ */ n("main", {
				className: "legal-page__main",
				children: [/* @__PURE__ */ t("div", {
					className: "legal-page__header",
					children: /* @__PURE__ */ t("h1", {
						className: "legal-page__title",
						children: e
					})
				}), /* @__PURE__ */ t("div", {
					className: "legal-accordion",
					children: r.map((e, n) => /* @__PURE__ */ t(oe, {
						section: e,
						index: n
					}, e.title))
				})]
			}),
			/* @__PURE__ */ t(H, {})
		]
	});
}
//#endregion
//#region src/stories/pages/Project/Project.tsx
var ce = [
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
], le = {
	label: "Cursos online",
	href: "#"
};
function ue({ category: e, tagVariant: r = "default", photo: i, photoAlt: a, title: o, description: s, sections: c }) {
	return /* @__PURE__ */ n("div", {
		className: "project-page",
		children: [
			/* @__PURE__ */ t(U, {
				navItems: ce,
				featuredLink: le,
				actions: /* @__PURE__ */ t("a", {
					href: "https://academy.studiolxd.com",
					className: "btn btn-primary",
					children: "Entra a la academia"
				})
			}),
			/* @__PURE__ */ t("main", {
				className: "project-page__main",
				children: /* @__PURE__ */ t("div", {
					className: "project-page__body",
					children: /* @__PURE__ */ n("article", {
						className: "project-detail",
						children: [
							/* @__PURE__ */ t(O, {
								variant: r,
								children: e
							}),
							/* @__PURE__ */ t("h1", {
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
								className: "project-detail__photo"
							}),
							/* @__PURE__ */ t("div", {
								className: "project-detail__content",
								children: c.map((e) => /* @__PURE__ */ n("section", {
									className: "project-detail__section",
									children: [/* @__PURE__ */ t("h2", {
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
			/* @__PURE__ */ t(H, {})
		]
	});
}
//#endregion
export { l as Arrow, u as Avatar, d as Button, A as Card, j as CardSplit, M as CardSquare, p as Carousel, h as Checkbox, N as CheckboxField, f as Chevron, B as ClientsSection, R as ContactForm, V as ContactSection, H as Footer, P as Form, g as Hamburger, U as Header, _ as Heading, W as HighlightSection, re as Home, v as Input, F as InputField, b as InputPhone, I as InputPhoneField, S as Label, se as Legal, C as Link, w as List, T as Logo, G as MethodologySection, z as NewsletterForm, E as Paragraph, ue as Project, K as ProjectsSection, q as ReviewsSection, D as Select, J as SolutionsSection, O as Tag, k as Textarea, L as TextareaField };
