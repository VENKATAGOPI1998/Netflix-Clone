import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

// import getYouTubeID from "get-youtube-id";
import axios from "../axios";
import "./Row.css";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerURL, settrailerURL] = useState("");
	//   a snippet of code which run based on specific conditions
	useEffect(() => {
		//if [],runs once when the row loads then dont run again
		const fetchData = async () => {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			// console.log(request);
		};

		fetchData();
	}, [fetchUrl]);

	const opts = {
		height: "390",
		width: "100%",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	const handlePlay = (movie) => {
		console.log(movie);
		if (trailerURL) {
			settrailerURL("");
		} else {
			movieTrailer(`${movie.name ? movie.name : movie.original_title}`)
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					settrailerURL(urlParams.get("v"));
				})
				.catch((err) => {
					alert("url not found");
				});
			///https://www.youtube.com/watch?v=X4bF_quwNtw&t=2s
			// async function data() {
			// 	let res = await movieTrailer(movie.name);
			// }

			// data();
		}
	};

	return (
		<div className="row">
			{/* title */}
			<h2>{title}</h2>
			{/* container --> posters */}

			<div className="row_posters">
				{movies.length > 0
					? movies?.map((movie) => {
							return (
								<img
									className={
										isLargeRow ? "row_poster row_posterLarge" : "row_poster"
									}
									key={movie.id}
									onClick={() => {
										handlePlay(movie);
									}}
									src={
										movie
											? `${base_url}${
													isLargeRow ? movie.poster_path : movie?.backdrop_path
											  }`
											: ""
									}
									alt={movie.name}
									// onClick={() => handlePlay(movie.name)}
								/>
							);
					  })
					: ""}
			</div>
			{trailerURL ? <YouTube videoId={trailerURL} opts={opts} /> : ""}
		</div>
	);
}

export default Row;
