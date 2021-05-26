import { connect } from 'react-redux';
import Banner from 'src/components/Header/Banner';

const mapStateToProps = (state) => ({
  isLogged: state.users.isLogged,
});

const mapDispatchToProps = () => ({
//   props: () => {
//     dispatch(props());
//   },
});

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
