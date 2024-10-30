import { forwardRef } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "@mui/material";

// function SelectionField({
//   reqBody,
//   placeholder,
//   renderSelectItems,
//   handleChange,
// }) {
//   return (
//     <Select
//       displayEmpty
//       onChange={handleChange}
//       sx={{ width: "100%" }}
//       size="small"
//       defaultValue=""
//       renderValue={() => {
//         if (reqBody.length === 0) {
//           return <em>{placeholder}</em>;
//         }
//         return reqBody;
//       }}
//     >
//       <MenuItem disabled value="">
//         <em>{placeholder}</em>
//       </MenuItem>
//       {renderSelectItems.map((item) => {
//         return (
//           <MenuItem key={item} value={item}>
//             {item}
//           </MenuItem>
//         );
//       })}
//     </Select>
//   );
// }

const SelectionField = forwardRef(function SelectionField(props, ref) {
  const { reqBody, placeholder, renderSelectItems, handleChange } = props;
  return (
    <Select
      displayEmpty
      onChange={handleChange}
      sx={{ width: "100%" }}
      size="small"
      defaultValue=""
      renderValue={() => {
        if (reqBody.length === 0) {
          return <em>{placeholder}</em>;
        }
        return reqBody;
      }}
    >
      <MenuItem disabled value="">
        <em>{placeholder}</em>
      </MenuItem>
      {renderSelectItems.map((item) => {
        return (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        );
      })}
    </Select>
  );
});
export default SelectionField;
SelectionField.propTypes = {
  reqBody: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  renderSelectItems: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};
