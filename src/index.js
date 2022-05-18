import sum from "@utils/sum";
import '@styles/index.css';
import getRandomPerson from '@utils/api';


console.log(sum(5, 6));
( 
	async () => {
		console.log(await getRandomPerson());
	}
)()