import React from "react";

import { useScreenStack } from "screenStack/useScreenStack";

export default function GenderCollectionScreen() {
  const { popScreenFromStack, goBack } = useScreenStack();

  return (
    <>
      <div>Gender screen</div>
      <button onClick={popScreenFromStack}>complete</button>
      <button onClick={goBack}>go back</button>
    </>
  );
}
