import { connect } from 'react-redux';
import Item from '../components/Item.jsx';


class List extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="columns">
        {Object.keys(this.props.data).map(functionName =>
          <Item functionName={functionName} key={functionName}/>)}
      </div>

    )
  }
}
const mapStateToProps = (state) => ({
  data: state.functionList,
});

List = connect(mapStateToProps)(List);
 
export default List;
