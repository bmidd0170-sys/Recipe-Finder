import { Link } from "react-router-dom";
const projects = [
	{
		id: 1,
		title: "Portfolio Website",
		description: "A personal portfolio built with React.",
	},
	{
		id: 2,
		title: "Task Manager",
		description: "A full-stack productivity app.",
	},
	{
		id: 3,
		title: "Weather Dashboard",
		description: "Weather data fetched from an API.",
	},
	{
		id: 4,
		title: "E-Commerce Store",
		description: "Shopping cart with product filtering.",
	},
];
export default function ProjectList() {
	return (
		<div className="project-list">
			<h2 className="title">Projects</h2>
			<div className="cards">
				{projects.map((project) => (
					<Link key={project.id} to={`/project/${project.id}`} className="card">
						<h3>{project.title}</h3>
						<p>{project.description}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
