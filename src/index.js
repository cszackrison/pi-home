import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { format } from 'date-fns';
import { useSpring, a, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import './styles';

const App = () => {
	const height = window.innerHeight - 282;
	const [{ y }, set] = useSpring(() => ({ y: height }));

	const open = ({ canceled }) => set({ y: -173, immediate: false, config: config.stiff });
	const close = (velocity = 0) => set({ y: height, immediate: false, config: { ...config.stiff, velocity } });
	const bind = useDrag(({ last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
			if (last) {
				my > height * 0.5 || vy > 0.5 ? close(vy) : open({ canceled });
			} else {
				set({ y: my, immediate: true });
			}
		},
		{ initial: () => [0, y.get()], filterTaps: true, bounds: { top: -173, bottom: height }, rubberband: true }
	);

	return (
		<div className='app' >
			<header>
				<div>{format(new Date(), "h:mm E MMM d yyyy")}</div>
			</header>
			<div className='grid'>
				<button className='app-btn'>
					<img src='https://w1.pngwing.com/pngs/803/647/png-transparent-google-logo-brave-web-browser-ad-blocking-privacy-mode-computer-software-google-chrome-basic-attention-token.png' />
					<div>Brave</div>
				</button>
			</div>
			<a.footer {...bind()} style={{ y }}>
				<div className='shelf'>
					<button className='app-btn'>
						<img src='https://w1.pngwing.com/pngs/803/647/png-transparent-google-logo-brave-web-browser-ad-blocking-privacy-mode-computer-software-google-chrome-basic-attention-token.png' />
						<div>Brave</div>
					</button>
				</div>
				<div className='all-apps'>

				</div>
			</a.footer>
		</div>
	);
};

render(<App />, document.body);
