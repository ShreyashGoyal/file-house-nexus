import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				'legal-litigation': {
					DEFAULT: 'hsl(var(--legal-litigation))',
					foreground: 'hsl(var(--legal-litigation-foreground))'
				},
				'land-property': {
					DEFAULT: 'hsl(var(--land-property))',
					foreground: 'hsl(var(--land-property-foreground))'
				},
				'accounting-tax': {
					DEFAULT: 'hsl(var(--accounting-tax))',
					foreground: 'hsl(var(--accounting-tax-foreground))'
				},
				'vendor-contracts': {
					DEFAULT: 'hsl(var(--vendor-contracts))',
					foreground: 'hsl(var(--vendor-contracts-foreground))'
				},
				'technical-construction': {
					DEFAULT: 'hsl(var(--technical-construction))',
					foreground: 'hsl(var(--technical-construction-foreground))'
				},
				'compliance': {
					DEFAULT: 'hsl(var(--compliance))',
					foreground: 'hsl(var(--compliance-foreground))'
				},
				'status-pending': {
					DEFAULT: 'hsl(var(--status-pending))',
					foreground: 'hsl(var(--status-pending-foreground))'
				},
				'status-approved': {
					DEFAULT: 'hsl(var(--status-approved))',
					foreground: 'hsl(var(--status-approved-foreground))'
				},
				'status-draft': {
					DEFAULT: 'hsl(var(--status-draft))',
					foreground: 'hsl(var(--status-draft-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
