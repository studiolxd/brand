import { EMAIL_FONT_FILENAME as e, EMAIL_LOGO_FILENAME as t, emailLogoWidthFor as n } from "./brand-assets.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { Body as o, Button as s, Container as c, Font as l, Head as u, Heading as d, Hr as f, Html as p, Img as m, Link as h, Preview as g, Section as _, Text as v } from "react-email";
//#region src/stories/email/emailTokens.ts
var y = {
	"--email-max-width": "600px",
	"--email-font-family": "\"Google Sans Flex\", system-ui, sans-serif",
	"--email-font-size": "20px",
	"--email-font-weight": "300",
	"--email-font-weight-range": "1 1000",
	"--email-line-height": "1.5",
	"--email-border-width": "1px",
	"--email-canvas-padding-block": "24px",
	"--email-canvas-padding-inline": "12px",
	"--email-padding-block": "24px",
	"--email-padding-inline": "24px",
	"--email-brand-padding-block": "16px",
	"--email-brand-padding-inline": "16px",
	"--email-opt-out-margin-block-start": "16px",
	"--email-heading-font-size": "32px",
	"--email-heading-font-weight": "500",
	"--email-heading-line-height": "1.1",
	"--email-heading-margin-block-end": "12px",
	"--email-text-margin-block-end": "16px",
	"--email-note-font-size": "16px",
	"--email-note-line-height": "1.65",
	"--email-text-emphasis-font-weight": "500",
	"--email-heading-2-font-size": "24px",
	"--email-heading-2-font-weight": "500",
	"--email-heading-2-line-height": "1.3",
	"--email-heading-2-margin-block-start": "24px",
	"--email-heading-2-margin-block-end": "12px",
	"--email-heading-2-color": "#111e30",
	"--email-list-margin-block-end": "16px",
	"--email-list-padding-inline-start": "24px",
	"--email-list-item-margin-block-end": "8px",
	"--email-quote-border-width": "2px",
	"--email-quote-border-color": "#4a4a4a",
	"--email-quote-padding-inline-start": "12px",
	"--email-quote-margin-block-end": "16px",
	"--email-divider-width": "1px",
	"--email-divider-color": "#d0d0d0",
	"--email-divider-margin-block": "24px",
	"--email-tag-font-size": "16px",
	"--email-tag-font-weight": "500",
	"--email-tag-border-radius": "9999px",
	"--email-tag-padding-block": "4px",
	"--email-tag-padding-inline": "12px",
	"--email-tag-margin-block-end": "16px",
	"--email-tone-success-bg": "#006616",
	"--email-tone-success-color": "#ffffff",
	"--email-tone-warning-bg": "#ffcd00",
	"--email-tone-warning-color": "#111e30",
	"--email-tone-error-bg": "#b30000",
	"--email-tone-error-color": "#ffffff",
	"--email-button-bg": "#baabff",
	"--email-button-color": "#111e30",
	"--email-button-hover-bg": "#ffcd00",
	"--email-button-hover-color": "#111e30",
	"--email-button-font-size": "20px",
	"--email-button-font-weight": "300",
	"--email-button-padding-block": "16px",
	"--email-button-width": "100%",
	"--email-button-fallback-margin-block-start": "12px",
	"--email-button-margin-block-end": "24px",
	"--email-logo-height": "85.33333333333333px",
	"--email-logo-padding": "8px",
	"--email-canvas-bg": "#ffffff",
	"--email-bg": "#ffffff",
	"--email-color": "#111e30",
	"--email-muted-color": "#4a4a4a",
	"--email-border-color": "#111e30"
};
//#endregion
//#region src/stories/email/emailTheme.ts
function b(e) {
	return y[e];
}
function x(e) {
	return `${-Number.parseFloat(b(e))}px`;
}
var S = {
	canvas: b("--email-canvas-bg"),
	background: b("--email-bg"),
	text: b("--email-color"),
	muted: b("--email-muted-color"),
	border: b("--email-border-color")
}, C = b("--email-font-family"), w = b("--email-font-weight-range"), T = b("--email-max-width"), E = Number.parseFloat(b("--email-logo-height")), D = Number.parseFloat(b("--email-logo-padding")), O = {
	width: n(E) + D * 2,
	height: Math.round(E + D * 2),
	filename: t,
	alt: "Studio LXD"
}, k = "https://slxd.app/brand/email", A = e;
function j(e) {
	return {
		backgroundColor: e,
		backgroundImage: `linear-gradient(${e}, ${e})`
	};
}
var M = {
	canvas: "email-canvas",
	surface: "email-surface",
	box: "email-box",
	text: "email-text",
	muted: "email-muted",
	heading2: "email-heading-2",
	link: "email-link",
	button: "email-button",
	quote: "email-quote",
	divider: "email-divider",
	tag: {
		success: "email-tag-success",
		warning: "email-tag-warning",
		error: "email-tag-error"
	}
}, N = {
	color: S.muted,
	fontFamily: C,
	fontWeight: Number(b("--email-font-weight")),
	fontSize: b("--email-note-font-size"),
	lineHeight: b("--email-note-line-height"),
	margin: 0
}, P = {
	heading: {
		color: S.text,
		fontFamily: C,
		fontSize: b("--email-heading-font-size"),
		fontWeight: Number(b("--email-heading-font-weight")),
		lineHeight: b("--email-heading-line-height"),
		margin: `0 0 ${b("--email-heading-margin-block-end")}`
	},
	text: {
		color: S.text,
		fontFamily: C,
		fontWeight: Number(b("--email-font-weight")),
		fontSize: b("--email-font-size"),
		lineHeight: b("--email-line-height"),
		margin: `0 0 ${b("--email-text-margin-block-end")}`
	},
	textEmphasis: { fontWeight: Number(b("--email-text-emphasis-font-weight")) },
	muted: N,
	footnote: {
		color: S.text,
		fontFamily: C,
		fontWeight: Number(b("--email-font-weight")),
		fontSize: b("--email-note-font-size"),
		lineHeight: b("--email-note-line-height"),
		margin: 0
	},
	button: {
		...j(b("--email-button-bg")),
		color: b("--email-button-color"),
		display: "block",
		width: b("--email-button-width"),
		textAlign: "center",
		fontFamily: C,
		fontSize: b("--email-button-font-size"),
		fontWeight: Number(b("--email-button-font-weight")),
		padding: `${b("--email-button-padding-block")} 0`,
		textDecoration: "none",
		marginBottom: b("--email-button-margin-block-end")
	},
	buttonFallback: {
		...N,
		margin: `${b("--email-button-fallback-margin-block-start")} 0 ${b("--email-button-margin-block-end")}`
	},
	buttonFallbackUrl: {
		color: S.text,
		wordBreak: "break-all",
		wordWrap: "break-word"
	},
	link: {
		color: S.text,
		fontFamily: C,
		fontWeight: Number(b("--email-font-weight")),
		textDecoration: "underline"
	},
	heading2: {
		color: b("--email-heading-2-color"),
		fontFamily: C,
		fontSize: b("--email-heading-2-font-size"),
		fontWeight: Number(b("--email-heading-2-font-weight")),
		lineHeight: b("--email-heading-2-line-height"),
		margin: `${b("--email-heading-2-margin-block-start")} 0 ${b("--email-heading-2-margin-block-end")}`
	},
	list: {
		color: S.text,
		fontFamily: C,
		fontSize: b("--email-font-size"),
		fontWeight: Number(b("--email-font-weight")),
		lineHeight: b("--email-line-height"),
		margin: `0 0 ${b("--email-list-margin-block-end")}`,
		paddingLeft: b("--email-list-padding-inline-start")
	},
	listItem: { margin: `0 0 ${b("--email-list-item-margin-block-end")}` },
	quote: {
		borderLeft: `${b("--email-quote-border-width")} solid ${b("--email-quote-border-color")}`,
		margin: `0 0 ${b("--email-quote-margin-block-end")}`,
		paddingLeft: b("--email-quote-padding-inline-start")
	},
	tag: {
		borderRadius: b("--email-tag-border-radius"),
		display: "inline-block",
		fontFamily: C,
		fontSize: b("--email-tag-font-size"),
		fontWeight: Number(b("--email-tag-font-weight")),
		padding: `${b("--email-tag-padding-block")} ${b("--email-tag-padding-inline")}`
	},
	divider: {
		border: 0,
		borderTop: `${b("--email-divider-width")} solid ${b("--email-divider-color")}`,
		margin: `${b("--email-divider-margin-block")} 0`,
		width: "100%"
	}
}, F = {
	success: {
		...j(b("--email-tone-success-bg")),
		color: b("--email-tone-success-color")
	},
	warning: {
		...j(b("--email-tone-warning-bg")),
		color: b("--email-tone-warning-color")
	},
	error: {
		...j(b("--email-tone-error-bg")),
		color: b("--email-tone-error-color")
	}
}, I = M.button, L = [
	{
		selector: M.canvas,
		background: S.canvas
	},
	{
		selector: M.surface,
		background: S.background
	},
	{
		selector: M.box,
		border: {
			side: "all",
			color: S.border
		}
	},
	{
		selector: M.text,
		color: S.text
	},
	{
		selector: M.muted,
		color: S.muted
	},
	{
		selector: M.heading2,
		color: b("--email-heading-2-color")
	},
	{
		selector: M.link,
		color: S.text
	},
	{
		selector: M.button,
		background: b("--email-button-bg"),
		color: b("--email-button-color")
	},
	{
		selector: M.quote,
		border: {
			side: "left",
			color: b("--email-quote-border-color")
		}
	},
	{
		selector: M.divider,
		border: {
			side: "top",
			color: b("--email-divider-color")
		}
	},
	{
		selector: M.tag.success,
		background: b("--email-tone-success-bg"),
		color: b("--email-tone-success-color")
	},
	{
		selector: M.tag.warning,
		background: b("--email-tone-warning-bg"),
		color: b("--email-tone-warning-color")
	},
	{
		selector: M.tag.error,
		background: b("--email-tone-error-bg"),
		color: b("--email-tone-error-color")
	}
], R = {
	all: "border-color",
	left: "border-left-color",
	top: "border-top-color"
};
function z(e, t) {
	let n = [];
	return e.background && t !== "color" && (n.push(`background-color: ${e.background} !important;`), n.push(`background-image: linear-gradient(${e.background}, ${e.background}) !important;`)), e.color && t !== "background" && n.push(`color: ${e.color} !important;`), e.border && t !== "background" && n.push(`${R[e.border.side]}: ${e.border.color} !important;`), n.join(" ");
}
function B(e, t, n = "  ") {
	return L.map((e) => ({
		entry: e,
		decl: z(e, t)
	})).filter(({ decl: e }) => e !== "").map(({ entry: t, decl: r }) => `${n}${e}.${t.selector} { ${r} }`).join("\n");
}
var V = b("--email-button-hover-bg"), H = `a.${I}:hover {
    background-color: ${V} !important;
    background-image: linear-gradient(${V}, ${V}) !important;
    color: ${b("--email-button-hover-color")} !important;
  }`, U = `
  :root { color-scheme: light only; supported-color-schemes: light only; }
  a:hover { text-decoration: none !important; }
  ${H}
  @media (prefers-color-scheme: dark) {
${B("", void 0, "    ")}
    ${H}
  }
${B("[data-ogsc] ", "color")}
${B("[data-ogsb] ", "background")}
`;
//#endregion
//#region src/stories/email/EmailLayout.tsx
function W(e) {
	if (e.reasonLabel !== void 0) return /* @__PURE__ */ a(v, {
		className: M.text,
		style: P.footnote,
		children: [
			e.reasonLabel,
			" ",
			/* @__PURE__ */ i(h, {
				href: e.unsubscribeUrl,
				className: M.link,
				style: P.link,
				children: e.unsubscribeLabel
			})
		]
	});
	let { unsubscribeUrl: t, preferencesUrl: n, unsubscribeLabel: r } = e, o = (e, t) => {
		if (t === void 0) throw Error(`@studiolxd/brand/email: falta «optOut.${e}». El pie de baja no trae textos puestos: los pasa quien manda el correo, en el idioma del destinatario.`);
		return t;
	}, s = /* @__PURE__ */ i(h, {
		href: t,
		className: M.link,
		style: P.link,
		children: o("unsubscribeLabel", r)
	});
	return n ? /* @__PURE__ */ a(v, {
		className: M.text,
		style: P.footnote,
		children: [
			s,
			o("manageBeforeLabel", e.manageBeforeLabel),
			/* @__PURE__ */ i(h, {
				href: n,
				className: M.link,
				style: P.link,
				children: o("managePreferencesLabel", e.managePreferencesLabel)
			}),
			o("manageAfterLabel", e.manageAfterLabel)
		]
	}) : /* @__PURE__ */ a(v, {
		className: M.text,
		style: P.footnote,
		children: [
			o("manageLabel", e.manageLabel),
			" ",
			s
		]
	});
}
function G({ preview: e, locale: t = "es", assetsBaseUrl: n = k, optOut: r, children: s }) {
	let d = n.replace(/\/$/, "");
	return /* @__PURE__ */ a(p, {
		lang: t,
		children: [
			/* @__PURE__ */ a(u, { children: [
				/* @__PURE__ */ i(l, {
					fontFamily: "Google Sans Flex",
					fallbackFontFamily: "sans-serif",
					webFont: {
						url: `${d}/${A}`,
						format: "woff2"
					},
					fontWeight: w,
					fontStyle: "normal"
				}),
				/* @__PURE__ */ i("meta", {
					name: "color-scheme",
					content: "light only"
				}),
				/* @__PURE__ */ i("meta", {
					name: "supported-color-schemes",
					content: "light only"
				}),
				/* @__PURE__ */ i("style", { dangerouslySetInnerHTML: { __html: U } })
			] }),
			/* @__PURE__ */ i(g, { children: e }),
			/* @__PURE__ */ i(o, {
				className: M.canvas,
				style: {
					...j(S.canvas),
					color: S.text,
					fontFamily: P.text.fontFamily,
					fontSize: P.text.fontSize,
					fontWeight: P.text.fontWeight,
					lineHeight: P.text.lineHeight,
					margin: 0,
					padding: 0
				},
				children: /* @__PURE__ */ a(_, {
					className: M.canvas,
					style: {
						...j(S.canvas),
						padding: `${b("--email-canvas-padding-block")} ${b("--email-canvas-padding-inline")}`,
						width: "100%"
					},
					children: [
						/* @__PURE__ */ i(c, {
							className: M.surface,
							style: {
								...j(S.background),
								margin: "0 auto",
								maxWidth: T,
								padding: 0
							},
							children: /* @__PURE__ */ i(m, {
								src: `${d}/${O.filename}`,
								alt: O.alt,
								width: O.width,
								height: O.height,
								style: {
									border: 0,
									display: "block",
									marginBottom: b("--email-brand-padding-block"),
									marginLeft: x("--email-brand-padding-inline")
								}
							})
						}),
						/* @__PURE__ */ i(c, {
							className: `${M.surface} ${M.box}`,
							style: {
								...j(S.background),
								border: `${b("--email-border-width")} solid ${S.border}`,
								borderRadius: 0,
								margin: "0 auto",
								maxWidth: T,
								padding: `${b("--email-padding-block")} ${b("--email-padding-inline")}`
							},
							children: /* @__PURE__ */ i(_, { children: s })
						}),
						r && /* @__PURE__ */ i(c, {
							className: M.canvas,
							style: {
								...j(S.canvas),
								margin: "0 auto",
								maxWidth: T,
								padding: `${b("--email-opt-out-margin-block-start")} 0 0`
							},
							children: /* @__PURE__ */ i(W, { ...r })
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/stories/email/EmailPrimitives.tsx
function K({ children: e, level: t = 1, style: n }) {
	let r = t === 1 ? P.heading : P.heading2;
	return /* @__PURE__ */ i(d, {
		as: `h${t}`,
		className: t === 1 ? M.text : M.heading2,
		style: {
			...r,
			...n
		},
		children: e
	});
}
function q({ children: e, emphasis: t = !1, style: n }) {
	return /* @__PURE__ */ i(v, {
		className: M.text,
		style: {
			...P.text,
			...t && P.textEmphasis,
			...n
		},
		children: e
	});
}
function J({ children: e, ordered: t = !1, style: n }) {
	return /* @__PURE__ */ i(t ? "ol" : "ul", {
		className: M.text,
		style: {
			...P.list,
			...n
		},
		children: e
	});
}
function Y({ children: e, style: t }) {
	return /* @__PURE__ */ i("li", {
		style: {
			...P.listItem,
			...t
		},
		children: e
	});
}
function X({ children: e, style: t }) {
	return /* @__PURE__ */ i(_, {
		className: M.quote,
		style: {
			...P.quote,
			...t
		},
		children: e
	});
}
function Z({ children: e, tone: t, style: n }) {
	return /* @__PURE__ */ i("span", {
		className: M.tag[t],
		style: {
			...P.tag,
			...F[t],
			...n
		},
		children: e
	});
}
function Q({ style: e }) {
	return /* @__PURE__ */ i(f, {
		className: M.divider,
		style: {
			...P.divider,
			...e
		}
	});
}
function $({ children: e, tone: t = "muted", style: n }) {
	let r = t === "muted" ? P.muted : P.footnote;
	return /* @__PURE__ */ i(v, {
		className: t === "muted" ? M.muted : M.text,
		style: {
			...r,
			...n
		},
		children: e
	});
}
function ee({ href: e, children: t, style: n }) {
	return /* @__PURE__ */ i(h, {
		href: e,
		className: M.link,
		style: {
			...P.link,
			...n
		},
		children: t
	});
}
function te({ href: e, children: t, fallbackLabel: n, style: o }) {
	return /* @__PURE__ */ a(r, { children: [/* @__PURE__ */ i(s, {
		href: e,
		className: I,
		style: {
			...P.button,
			marginBottom: 0,
			...o
		},
		children: t
	}), /* @__PURE__ */ a(v, {
		className: M.muted,
		style: P.buttonFallback,
		children: [
			n,
			/* @__PURE__ */ i("br", {}),
			/* @__PURE__ */ i("span", {
				className: M.text,
				style: P.buttonFallbackUrl,
				children: e
			})
		]
	})] });
}
//#endregion
export { te as EmailButton, Q as EmailDivider, K as EmailHeading, G as EmailLayout, ee as EmailLink, J as EmailList, Y as EmailListItem, $ as EmailNote, X as EmailQuote, Z as EmailTag, q as EmailText, k as emailAssetsBaseUrl, M as emailClassNames, C as emailFontFamily, A as emailFontFilename, O as emailLogo, T as emailMaxWidth, S as emailPalette, j as emailSolidBackground, U as emailStyleSheet, P as emailStyles, F as emailTones };
