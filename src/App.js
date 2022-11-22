import { useEffect, useState, useRef } from 'react';
import './App.css';

const useCountDown = (onDone, initialTime) => {
	const [, render] = useState(0);
	const timeLeftRef = useRef(initialTime);
	const intervalRef = useRef();

	const start = () => {
		intervalRef.current = setInterval(() => {
			const newPrevTime = timeLeftRef.current - 1;
			if (newPrevTime <= 0) {
				onDone();
				clearInterval(intervalRef.current);
				timeLeftRef.current = 0;
			} else {
				timeLeftRef.current -= 1;
			}
			render(Symbol());
		}, 1000);
		render();
	};

	useEffect(() => {
		start();
		return () => {
			clearInterval(intervalRef.current);
		};
	}, []);

	return {
		secondsLeft: timeLeftRef.current,
		reset: () => {
			timeLeftRef.current = initialTime;
			start();
		},
	};
};

function App() {
	const { secondsLeft, reset } = useCountDown(() => console.log('done'), 5);

	return (
		<div className="App">
			{secondsLeft}
			<button onClick={reset}>Reset</button>
		</div>
	);
}

export default App;
