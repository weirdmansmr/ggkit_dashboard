import React, { useEffect, useState } from "react";
import style from "./Punishment.module.scss";

const Punishment = () => {
	let slideEl = ["pun1", "pun2", "pun3", "pun4", "pun5"];

	const [people, setPeople] = useState(slideEl);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const lastIndex = people.length - 1;
		if (index < 0) {
			setIndex(lastIndex);
		}
		if (index > lastIndex) {
			setIndex(0);
		}
	}, [index, people]);

	// autoslide, clearInterval = een cleanup functie noodzakelijk bij interval
	useEffect(() => {
		let slider = setInterval(() => {
			setIndex(index + 1);
		}, 5000);
		return () => clearInterval(slider);
	}, [index]);

	return (
		<section className={style.page}>
			<div className={style.cont}>
				<h2>Дисциплинарные взыскания 2025</h2>
				{people.map((person, personIndex) => {
					const { id } = person;
					let position = "nextSlide";
					if (personIndex === index) {
						position = "activeSlide";
					}
					if (
						personIndex === index - 1 ||
						(index === 0 && personIndex === people.length - 1)
					) {
						position = "lastSlide";
					}
					return (
						<article key={id} className={style[position]}>
							<img src={`/assets/scans/${person}.jpg`} alt={person} />
							<span>
								Страница {personIndex + 1} из {people.length}
							</span>
						</article>
					);
				})}
			</div>
		</section>
	);
};

export default Punishment;
