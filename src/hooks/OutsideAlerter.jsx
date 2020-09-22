import {useEffect, useRef, useState} from "react";

export const useOutsideAlerter = initialValue => {
	const ref = useRef(null);
	const [visible, setVisible] = useState(initialValue);

	const handleClickOutside = event => {
		event.preventDefault()
		if (ref.current && !ref.current.contains(event.target)) {
			event.stopPropagation();
			setVisible(false);
		}
	};

	const handleKeyPress = event => {
		if (event.key === "Escape") setVisible(false);
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		document.addEventListener("keydown", handleKeyPress, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
			document.removeEventListener("keydown", handleKeyPress, true);
		};
	}, [ref]);

	return {visible, setVisible, ref};
};
