import React from "react";

import { IScreenStackContext } from "screenStack/coordinator";

// hooks to start other flows will receive screen stack methods as one of their arguments
// to ensure that the "makeSafe" check implemented in "useScreenStack" is enforced
// for any attempt to navigate
//
// Example: if this hook directly called "useScreenStack" to get access to the screen stack methods
// it would be possible for the screen component that uses this hook to call it
// and then call another navigational method (like pushScreenToStack), causing strange behavior
export function useDemographicsCollectionFlow({
  pushScreenGroupToStack
}: IScreenStackContext) {
  const startDemographicsCollectionFlow = React.useCallback(() => {
    pushScreenGroupToStack(getDemographicsCollectionScreens());
  }, [pushScreenGroupToStack]);

  return { startDemographicsCollectionFlow };
}

// export a function to get the screens in this flow
// so that hooks that need to start this flow do not have to bypass one time call security to
// call "pushScreenGroupToStack" multiple times
export function getDemographicsCollectionScreens() {
  return [
    () => {
      const GenderCollection = require("./genderCollection").default;

      return <GenderCollection />;
    }
  ];
}
