import { TailSpin } from "react-loader-spinner";
const Loader = () => {
	return (
		<TailSpin
			height="200"
			width="200"
			color="#4fa94d"
			ariaLabel="tail-spin-loading"
			radius="10"
			wrapperStyle={{"marginLeft": '600px', "marginTop":'200px'}}
			visible={true}
		/>
	);
}; 
export default Loader;
