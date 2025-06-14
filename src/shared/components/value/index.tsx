import ExpandableValue from './ExpandableValue';
import ListValue from './ListValue';
import TruncateTextValue from './TruncateTextValue';

function Value() {
  return null;
}

Value.TruncateText = TruncateTextValue;
Value.Expandable = ExpandableValue;
Value.List = ListValue;

export { Value };
