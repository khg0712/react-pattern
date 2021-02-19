import axios from "axios";
import useMovie from "../hooks/useMovies";
import { Movie } from "../types/Movie";

interface Prop {
	movies: Movie[];
}

export default function StaticGeneration({ movies }: Prop) {
	const movieEls = movies.map((movie, i) => (
		<li key={i}>
			<span>
				{movie.name} | {movie.watch}회
			</span>
		</li>
	));

	return (
		<div>
			<h1>StaticGeneration</h1>
			<ul>{movieEls}</ul>
		</div>
	);
}

export async function getStaticProps() {
	// Call an external API endpoint to get posts
	const { data: movies } = await axios.get(
		"http://localhost:3000/api/movie/list"
	);

	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			movies,
		},
	};
}
