import React from "react";

import { useScreenStack } from "screenStack/useScreenStack";

import { useBpTestFlow } from "bpTest/useBpTestFlow";

export default function Dashboard() {
  const screenStack = useScreenStack();
  const { startBpTestFlow } = useBpTestFlow(screenStack);

  return (
    <>
      <div>I am the dashboard</div>
      <button onClick={startBpTestFlow}>Start bp test flow</button>
    </>
  );
}
