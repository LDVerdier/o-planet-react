import { connect } from 'react-redux';
import Dumps from 'src/components/Dumps/Dumps';

const mapStateToProps = (state) => ({
  allDumpElements: state.dumps.list,
  hideCleanedDumps: state.filters.hideCleanedDumps,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dumps);
