/*-----------------------------------------------*/
//@ts-expect-error __PROPS__ is replaced with the configId in the build process
// in src/routes/[configId]/build/+server.ts
const { __CONFIG_ID__ } = __PROPS__;
/*-----------------------------------------------*/

// Configuration
interface AnimationConfig {
	FROM: 'top' | 'bottom' | 'left' | 'right';
	DURATION: string;
	TRANSITION: 'ease-in-out' | 'ease-in' | 'ease-out' | 'linear';
}

interface IframeConfig {
	WIDTH: string;
	HEIGHT: string;
	Z_INDEX: string;
	BORDER: string;
	BACKGROUND: string;
	ID: string;
	ALIGN: string;
	ANIMATION: AnimationConfig;
}

interface WrapperConfig {
	ID: string;
	POSITION: string;
	DISPLAY: string;
	WIDTH: string;
	HEIGHT: string;
	TOP: string;
	LEFT: string;
	BACKGROUND_COLOR: string;
	BLUR: string;
	Z_INDEX: string;
}

interface Config {
	CONFIG_ID: string;
	ROOT_ELEMENT_ID: string;
	SERVER_URL: string;
	IFRAME: IframeConfig;
	WRAPPER: WrapperConfig;
}

const CONFIG: Config = {
	CONFIG_ID: __CONFIG_ID__,
	ROOT_ELEMENT_ID: 'root',
	SERVER_URL: 'http://localhost:5173',
	IFRAME: {
		WIDTH: '100vw',
		HEIGHT: '50vh',
		Z_INDEX: '2147483646',
		BORDER: 'none',
		BACKGROUND: 'transparent',
		ID: 'pf-iframe',
		ALIGN: 'center', // top, bottom, left, right, center
		ANIMATION: {
			FROM: 'top',
			DURATION: '250ms',
			TRANSITION: 'ease-in'
		}
	},
	WRAPPER: {
		ID: 'pf-wrapper',
		POSITION: 'fixed',
		DISPLAY: 'flex',
		WIDTH: '100vw',
		HEIGHT: '100vh',
		TOP: '0',
		LEFT: '0',
		BACKGROUND_COLOR: 'rgba(0, 0, 0, 0.5)',
		BLUR: '5px',
		Z_INDEX: '2147483645'
	}
};

// Fonctions utilitaires
const calculateMargin = (align: string): string => {
	switch (align) {
		case 'top':
			return '0 auto auto auto';
		case 'bottom':
			return 'auto auto 0 auto';
		case 'left':
			return 'auto auto auto 0';
		case 'right':
			return 'auto 0 auto auto';
		case 'center':
			return 'auto';
		default:
			return 'auto';
	}
};

const calculateTransform = (from: 'top' | 'bottom' | 'left' | 'right'): string => {
	switch (from) {
		case 'top':
			return 'translateY(-100%)';
		case 'bottom':
			return 'translateY(100%)';
		case 'left':
			return 'translateX(-100%)';
		case 'right':
			return 'translateX(100%)';
		default:
			return 'translateX(0)';
	}
};

// Fonction pour basculer l'iframe
const toggleIframe = (create: boolean): void => {
	let wrapper = document.getElementById(CONFIG.WRAPPER.ID);
	if (!wrapper) {
		wrapper = document.createElement('div');
		wrapper.id = CONFIG.WRAPPER.ID;
		Object.assign(wrapper.style, {
			position: CONFIG.WRAPPER.POSITION,
			top: CONFIG.WRAPPER.TOP,
			left: CONFIG.WRAPPER.LEFT,
			width: CONFIG.WRAPPER.WIDTH,
			height: CONFIG.WRAPPER.HEIGHT,
			zIndex: CONFIG.WRAPPER.Z_INDEX,
			display: CONFIG.WRAPPER.DISPLAY
		});
		document.body.appendChild(wrapper);
	}

	if (create) {
		const iframe = document.createElement('iframe');
		iframe.src = `${CONFIG.SERVER_URL}/render/${CONFIG.CONFIG_ID}`;
		iframe.id = CONFIG.IFRAME.ID;

		Object.assign(iframe.style, {
			width: CONFIG.IFRAME.WIDTH,
			height: CONFIG.IFRAME.HEIGHT,
			zIndex: CONFIG.IFRAME.Z_INDEX,
			border: CONFIG.IFRAME.BORDER,
			background: CONFIG.IFRAME.BACKGROUND,
			margin: calculateMargin(CONFIG.IFRAME.ALIGN),
			transition: `transform ${CONFIG.IFRAME.ANIMATION.DURATION} ${CONFIG.IFRAME.ANIMATION.TRANSITION}`,
			transform: calculateTransform(CONFIG.IFRAME.ANIMATION.FROM)
		});

		iframe.onload = () => {
			iframe.style.transform = 'translateX(0)';
		};

		wrapper.style.backgroundColor = CONFIG.WRAPPER.BACKGROUND_COLOR;
		wrapper.style.backdropFilter = `blur(${CONFIG.WRAPPER.BLUR})`;
		wrapper.appendChild(iframe);
		storeDates(`${CONFIG.CONFIG_ID}_OPENED_AT`);
	} else {
		if (wrapper) {
			wrapper.remove();
			storeDates(`${CONFIG.CONFIG_ID}_CLOSED_AT`);
		}
	}
};

const storeDates = (key: string): void => {
	const currentTime = new Date().getTime().toString();
	localStorage.setItem(key, currentTime);
	document.cookie = `${key}=${currentTime}; expires=${currentTime + 1000 * 60 * 60 * 24 * 365}; path=/`;
};

// Écouteur d'événements pour les messages
window.addEventListener('message', (event: MessageEvent) => {
	if (event.data === 'close-modal') {
		toggleIframe(false);
	}
});

// Initialisation
toggleIframe(true);
