import { connect } from 'react-redux';
import Removal from 'src/components/Removals/Removal';
import { deleteRemoval, validateRemoval } from 'src/actions/dumps';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

const mapDispatchToProps = (dispatch) => ({
  deleteRemoval: (id) => {
    dispatch(deleteRemoval(id));
  },
  validateRemoval: (id) => {
    dispatch(validateRemoval(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Removal);
