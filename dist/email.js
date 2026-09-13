import { EMAIL_FONT_FILENAME as e, EMAIL_LOGO_FILENAME as t, emailLogoWidthFor as n } from "./brand-assets.js";
import { Body as r, Button as i, Container as a, Font as o, Head as s, Heading as c, Hr as l, Html as u, Img as d, Link as f, Preview as p, Section as m, Text as h } from "react-email";
import { Fragment as g, jsx as _, jsxs as v } from "react/jsx-runtime";
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
	"--email-logo-height": "32px",
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
var x = {
	canvas: b("--email-canvas-bg"),
	background: b("--email-bg"),
	text: b("--email-color"),
	muted: b("--email-muted-color"),
	border: b("--email-border-color")
}, S = b("--email-font-family"), C = b("--email-font-weight-range"), w = b("--email-max-width"), T = Number.parseFloat(b("--email-logo-height")), E = Number.parseFloat(b("--email-logo-padding")), D = {
	width: n(T) + E * 2,
	height: T + E * 2,
	filename: t
}, O = "https://slxd.app/brand/email", k = e, A = {
	color: x.muted,
	fontFamily: S,
	fontWeight: Number(b("--email-font-weight")),
	fontSize: b("--email-note-font-size"),
	lineHeight: b("--email-note-line-height"),
	margin: 0
}, j = {
	heading: {
		color: x.text,
		fontFamily: S,
		fontSize: b("--email-heading-font-size"),
		fontWeight: Number(b("--email-heading-font-weight")),
		lineHeight: b("--email-heading-line-height"),
		margin: `0 0 ${b("--email-heading-margin-block-end")}`
	},
	text: {
		color: x.text,
		fontFamily: S,
		fontWeight: Number(b("--email-font-weight")),
		fontSize: b("--email-font-size"),
		lineHeight: b("--email-line-height"),
		margin: `0 0 ${b("--email-text-margin-block-end")}`
	},
	textEmphasis: { fontWeight: Number(b("--email-text-emphasis-font-weight")) },
	muted: A,
	footnote: {
		color: x.text,
		fontFamily: S,
		fontWeight: Number(b("--email-font-weight")),
		fontSize: b("--email-note-font-size"),
		lineHeight: b("--email-note-line-height"),
		margin: 0
	},
	button: {
		backgroundColor: b("--email-button-bg"),
		color: b("--email-button-color"),
		display: "block",
		width: b("--email-button-width"),
		textAlign: "center",
		fontFamily: S,
		fontSize: b("--email-button-font-size"),
		fontWeight: Number(b("--email-button-font-weight")),
		padding: `${b("--email-button-padding-block")} 0`,
		textDecoration: "none",
		marginBottom: b("--email-button-margin-block-end")
	},
	buttonFallback: {
		...A,
		margin: `${b("--email-button-fallback-margin-block-start")} 0 ${b("--email-button-margin-block-end")}`
	},
	buttonFallbackUrl: {
		color: x.text,
		wordBreak: "break-all",
		wordWrap: "break-word"
	},
	link: {
		color: x.text,
		fontFamily: S,
		fontWeight: Number(b("--email-font-weight")),
		textDecoration: "underline"
	},
	heading2: {
		color: b("--email-heading-2-color"),
		fontFamily: S,
		fontSize: b("--email-heading-2-font-size"),
		fontWeight: Number(b("--email-heading-2-font-weight")),
		lineHeight: b("--email-heading-2-line-height"),
		margin: `${b("--email-heading-2-margin-block-start")} 0 ${b("--email-heading-2-margin-block-end")}`
	},
	list: {
		color: x.text,
		fontFamily: S,
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
		fontFamily: S,
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
}, M = {
	success: {
		backgroundColor: b("--email-tone-success-bg"),
		color: b("--email-tone-success-color")
	},
	warning: {
		backgroundColor: b("--email-tone-warning-bg"),
		color: b("--email-tone-warning-color")
	},
	error: {
		backgroundColor: b("--email-tone-error-bg"),
		color: b("--email-tone-error-color")
	}
}, N = "email-button", P = `
  a:hover { text-decoration: none !important; }
  a.${N}:hover {
    background-color: ${b("--email-button-hover-bg")} !important;
    color: ${b("--email-button-hover-color")} !important;
  }
`;
//#endregion
//#region src/stories/email/EmailLayout.tsx
function F(e) {
	if (e.reasonLabel !== void 0) return /* @__PURE__ */ v(h, {
		style: j.footnote,
		children: [
			e.reasonLabel,
			" ",
			/* @__PURE__ */ _(f, {
				href: e.unsubscribeUrl,
				style: j.link,
				children: e.unsubscribeLabel
			})
		]
	});
	let { unsubscribeUrl: t, preferencesUrl: n, manageLabel: r = "Para dejar de recibir estos avisos,", unsubscribeLabel: i = n ? "Darse de baja" : "date de baja", manageBeforeLabel: a = " o ", managePreferencesLabel: o = "gestiona tus preferencias", manageAfterLabel: s = "." } = e, c = /* @__PURE__ */ _(f, {
		href: t,
		style: j.link,
		children: i
	});
	return n ? /* @__PURE__ */ v(h, {
		style: j.footnote,
		children: [
			c,
			a,
			/* @__PURE__ */ _(f, {
				href: n,
				style: j.link,
				children: o
			}),
			s
		]
	}) : /* @__PURE__ */ v(h, {
		style: j.footnote,
		children: [
			r,
			" ",
			c
		]
	});
}
function I({ preview: e, appName: t, locale: n = "es", assetsBaseUrl: i = O, logoAlt: c, optOut: l, children: f }) {
	let h = i.replace(/\/$/, "");
	return /* @__PURE__ */ v(u, {
		lang: n,
		children: [
			/* @__PURE__ */ v(s, { children: [/* @__PURE__ */ _(o, {
				fontFamily: "Google Sans Flex",
				fallbackFontFamily: "sans-serif",
				webFont: {
					url: `${h}/${k}`,
					format: "woff2"
				},
				fontWeight: C,
				fontStyle: "normal"
			}), /* @__PURE__ */ _("style", { dangerouslySetInnerHTML: { __html: P } })] }),
			/* @__PURE__ */ _(p, { children: e }),
			/* @__PURE__ */ _(r, {
				style: {
					backgroundColor: x.canvas,
					color: x.text,
					fontFamily: j.text.fontFamily,
					fontSize: j.text.fontSize,
					fontWeight: j.text.fontWeight,
					lineHeight: j.text.lineHeight,
					margin: 0,
					padding: 0
				},
				children: /* @__PURE__ */ v(m, {
					style: {
						backgroundColor: x.canvas,
						padding: `${b("--email-canvas-padding-block")} ${b("--email-canvas-padding-inline")}`,
						width: "100%"
					},
					children: [
						/* @__PURE__ */ _(a, {
							style: {
								backgroundColor: x.background,
								margin: "0 auto",
								maxWidth: w,
								padding: `${b("--email-brand-padding-block")} ${b("--email-brand-padding-inline")}`
							},
							children: /* @__PURE__ */ _(d, {
								src: `${h}/${D.filename}`,
								alt: c ?? t,
								width: D.width,
								height: D.height,
								style: {
									border: 0,
									display: "block"
								}
							})
						}),
						/* @__PURE__ */ _(a, {
							style: {
								backgroundColor: x.background,
								border: `${b("--email-border-width")} solid ${x.border}`,
								borderRadius: 0,
								margin: "0 auto",
								maxWidth: w,
								padding: `${b("--email-padding-block")} ${b("--email-padding-inline")}`
							},
							children: /* @__PURE__ */ _(m, { children: f })
						}),
						l && /* @__PURE__ */ _(a, {
							style: {
								backgroundColor: x.canvas,
								margin: "0 auto",
								maxWidth: w,
								padding: `${b("--email-opt-out-margin-block-start")} 0 0`
							},
							children: /* @__PURE__ */ _(F, { ...l })
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/stories/email/EmailPrimitives.tsx
function L({ children: e, level: t = 1, style: n }) {
	let r = t === 1 ? j.heading : j.heading2;
	return /* @__PURE__ */ _(c, {
		as: `h${t}`,
		style: {
			...r,
			...n
		},
		children: e
	});
}
function R({ children: e, emphasis: t = !1, style: n }) {
	return /* @__PURE__ */ _(h, {
		style: {
			...j.text,
			...t && j.textEmphasis,
			...n
		},
		children: e
	});
}
function z({ children: e, ordered: t = !1, style: n }) {
	return /* @__PURE__ */ _(t ? "ol" : "ul", {
		style: {
			...j.list,
			...n
		},
		children: e
	});
}
function B({ children: e, style: t }) {
	return /* @__PURE__ */ _("li", {
		style: {
			...j.listItem,
			...t
		},
		children: e
	});
}
function V({ children: e, style: t }) {
	return /* @__PURE__ */ _(m, {
		style: {
			...j.quote,
			...t
		},
		children: e
	});
}
function H({ children: e, tone: t, style: n }) {
	return /* @__PURE__ */ _("span", {
		style: {
			...j.tag,
			...M[t],
			...n
		},
		children: e
	});
}
function U({ style: e }) {
	return /* @__PURE__ */ _(l, { style: {
		...j.divider,
		...e
	} });
}
function W({ children: e, tone: t = "muted", style: n }) {
	return /* @__PURE__ */ _(h, {
		style: {
			...t === "muted" ? j.muted : j.footnote,
			...n
		},
		children: e
	});
}
function G({ href: e, children: t, style: n }) {
	return /* @__PURE__ */ _(f, {
		href: e,
		style: {
			...j.link,
			...n
		},
		children: t
	});
}
function K({ href: e, children: t, fallbackLabel: n, style: r }) {
	return /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _(i, {
		href: e,
		className: N,
		style: {
			...j.button,
			marginBottom: 0,
			...r
		},
		children: t
	}), /* @__PURE__ */ v(h, {
		style: j.buttonFallback,
		children: [
			n,
			/* @__PURE__ */ _("br", {}),
			/* @__PURE__ */ _("span", {
				style: j.buttonFallbackUrl,
				children: e
			})
		]
	})] });
}
//#endregion
export { K as EmailButton, U as EmailDivider, L as EmailHeading, I as EmailLayout, G as EmailLink, z as EmailList, B as EmailListItem, W as EmailNote, V as EmailQuote, H as EmailTag, R as EmailText, O as emailAssetsBaseUrl, S as emailFontFamily, k as emailFontFilename, D as emailLogo, w as emailMaxWidth, x as emailPalette, P as emailStyleSheet, j as emailStyles, M as emailTones };
