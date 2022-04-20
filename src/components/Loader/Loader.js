import RingLoader from "react-spinners/RingLoader";
import PropTypes from 'prop-types';

export default function Loader({ loading }) { 

    return (<div className="spinner">
        <RingLoader color="red" loading={loading} size={120} />
        </div>
    )
}
Loader.propTypes = {
    loading: PropTypes.bool
}