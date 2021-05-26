import { connect } from 'react-redux';
import Removals from 'src/components/Removals/Removals';

const mapStateToProps = (state, ownProps) => ({
  userId: state.users.userData.id,
  removals: ownProps.removals,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Removals);
