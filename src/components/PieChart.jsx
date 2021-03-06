import { PieChart, Pie, Cell } from 'recharts';
import { UserState } from '../UserContext';

const COLORS = ['#0d0f11', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline="central"
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};
export default function MyPieChart({ quantifier, title }) {
	const { people } = UserState();
	const truthy = +people?.filter((x) => x[quantifier]).length;
	const falsy = +people?.filter((x) => !x[quantifier]).length;
	const data = [
		{ name: 'Group A', value: truthy },
		{ name: 'Group B', value: falsy },
	];

	const decideFill = (index) => {
		if (index === 0) {
			console.log(truthy / falsy);
			return truthy / falsy >= 0.5
				? COLORS[1]
				: truthy / falsy >= 0.3
				? COLORS[2]
				: COLORS[3];
		} else return COLORS[0];
	};
	return (
		<>
			<h3>{`${title}: ${truthy}/${truthy + falsy}`}</h3>
			<PieChart width={200} height={200}>
				<Pie
					data={data}
					cx={100}
					cy={100}
					innerRadius={20}
					outerRadius={80}
					fill="#8884d8"
					paddingAngle={0}
					dataKey="value"
					labelLine={false}
					label={renderCustomizedLabel}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={decideFill(index)} />
					))}
				</Pie>
			</PieChart>
		</>
	);
}
