import {useCallback, useEffect} from "react";

export function useOnClickOutside(props) {
	const {ref, handler} = props
	// const handlerMemo = useCallback(() => handler, [handler])

	// function handleKeyPress() {
	// 	if (event.key === "Escape") setVisible(false);
	// };

	useEffect(() => {
		debugger
		const listener = event => {
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}

			handler(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handler])

}