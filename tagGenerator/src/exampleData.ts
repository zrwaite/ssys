interface User {
	fname: string,
	lname: string,
	id: string,
	teacher: string|null,
	school: string
} 

const exampleData: readonly User[] = [
	{
		fname: "Zac",
		lname: "Waite",
		id: "1",
		teacher: null,
		school: "University of Waterloo"
	},
	{
		fname: "Elle",
		lname: "Waite",
		id: "2",
		teacher: "Mr. Lowery",
		school: "Twin Lakes"
	},
	{
		fname: "Abby",
		lname: "Austin",
		id: "3",
		teacher: "Dr. Hele",
		school: "Mount Allison"
	},
] as const

export {exampleData};
export type {User};