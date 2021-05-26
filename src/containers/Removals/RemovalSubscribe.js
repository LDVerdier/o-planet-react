import { connect } from 'react-redux';
import RemovalSubscribe from 'src/components/Removals/RemovalSubscribe';
import { subscribeToRemoval } from 'src/actions/dumps';

const mapStateToProps = (state, ownProps) => ({
  isSubscriber: ownProps.isSubscriber,
  removalId: ownProps.removalId,
  isLogged: state.users.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  subscribeToRemoval: (isSubscriber, removalId) => {
    dispatch(subscribeToRemoval(isSubscriber, removalId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RemovalSubscribe);
