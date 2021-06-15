export default function CustomInput(props) {
  const input_type = props.inputType;
  const inputTypesViews = {
    text: <input type="text" {...props} />,
    textarea: <textarea type="text" {...props} />,
  };

  const renderInputTypeView = () => {
    return inputTypesViews[input_type];
  };

  return renderInputTypeView();
}
