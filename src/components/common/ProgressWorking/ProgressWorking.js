import "./ProgressWorking.less";
import { Progress } from "antd";
import { useSelector } from "react-redux";
import { progressWorkingState } from "@redux/utils/shared.reducer";

const ProgressWorking = () => {
  const progressWorking = useSelector(progressWorkingState);
  const [percent, setPercent] = React.useState(0);

  React.useEffect(() => {
    setPercent((progressWorking.complete * 100) / progressWorking.total);
  }, [progressWorking]);

  return (
    <Progress
      strokeColor={{
        "0%": "#108ee9",
        "100%": "#87d068",
      }}
      percent={percent}
    />
  );
};

export default ProgressWorking;
