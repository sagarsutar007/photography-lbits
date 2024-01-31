import "./LineWithText.css";
const LineWithText = ({ text }) => {
  return (
    <div className="line-with-text my-4">
      <span>{text}</span>
    </div>
  );
};

export default LineWithText;
