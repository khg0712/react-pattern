// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const movies = [
	{
		name: "살인의 추억",
		watch: 1,
	},
	{
		name: "살인의 추억",
		watch: 2,
	},
	{
		name: "살인의 추억",
		watch: 3,
	},
	{
		name: "살인의 추억",
		watch: 4,
	},
	{
		name: "살인의 추억",
		watch: 5,
	},
	{
		name: "살인의 추억",
		watch: 6,
	},
	{
		name: "살인의 추억",
		watch: 7,
	},
	{
		name: "살인의 추억",
		watch: 8,
	},
];

export default (req, res) => {
	console.log("1");
	res.status(200).json(movies);
};
