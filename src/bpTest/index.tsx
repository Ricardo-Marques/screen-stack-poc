import React from "react";

import { useScreenStack } from "screenStack/useScreenStack";

export default function BpTestScreen() {
  const { popScreenFromStack, goBack } = useScreenStack();

  return (
    <>
      <div>Bp test screen</div>
      <button onClick={popScreenFromStack}>complete</button>
      <button onClick={goBack}>go back</button>
    </>
  );
}
