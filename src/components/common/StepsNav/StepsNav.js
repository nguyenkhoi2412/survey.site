import "./StepsNav.less";
import { Steps } from "antd";
import React from "react";

const { Step } = Steps;

const StepsNav = ({ metadata }) => {
  const [steps, setSteps] = React.useState(metadata);
  // const [current, setCurrent] = React.useState(0);

  return (
    <>
      <Steps
        type="navigation"
        size="default"
        // current={current}
        className="site-navigation-steps"
      >
        {steps.map((step) => {
          return (
            <React.Fragment key={"steps" + step._id}>
              <Step
                id={step._id}
                title={step.title}
                subTitle={step.subTitle}
                status={step.status}
                description={step.description}
              />
            </React.Fragment>
          );
        })}
      </Steps>
    </>
  );
};

export default StepsNav;
