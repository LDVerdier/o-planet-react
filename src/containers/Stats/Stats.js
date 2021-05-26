import { connect } from 'react-redux';
import Stats from 'src/components/Stats/Stats';

const mapStateToProps = (state) => ({
  stats: state.dumps.stats,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
