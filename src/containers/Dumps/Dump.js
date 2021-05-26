import { connect } from 'react-redux';
import Dump from 'src/components/Dumps/Dump';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  description: ownProps.description || '',
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Dump);
