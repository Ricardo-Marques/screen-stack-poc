import React from "react";

import { IScreenStackContext } from "screenStack/coordinator";

import { getDemographicsCollectionScreens } from "demographicsCollection/useDemographicsCollectionFlow";

export function useBpTestFlow({ pushScreenGroupToStack }: IScreenStackContext) {
  const startBpTestFlow = React.useCallback(() => {
    pushScreenGroupToStack([
      ...getDemographicsCollectionScreens(),
      () => {
        const BpTest = require("./index").default;

        return <BpTest />;
      }
    ]);
  }, [pushScreenGroupToStack]);

  return { startBpTestFlow };
}
