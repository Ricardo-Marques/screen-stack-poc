import React from "react";

import { ScreenStackContext, IScreenStackContext } from "./coordinator";

/**
 * Proxies calls to ScreenStackContext
 * to ensure that a single screen cannot call these actions more than once
 */
export function useScreenStack() {
  const actionTaken = React.useRef<boolean>(false);
  const isUnmounted = React.useRef<boolean>(false);

  React.useEffect(() => {
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  const {
    screenStack,
    pushScreenToStack,
    pushScreenGroupToStack,
    popScreenFromStack,
    goBack
  } = React.useContext(ScreenStackContext);

  // ensures each screen can only navigate the user once, or until it unmounts (whichever comes first)
  // once it unmounts or has called one of the navigational methods, it gives up navigation control
  const makeSafe = React.useCallback(<CbType extends Function>(cb: CbType) => {
    return (...args: any) => {
      if (isUnmounted.current) {
        console.error(
          "component/hook tried to navigate user after it had been unmounted"
        );
      } else if (actionTaken.current) {
        console.error("component/hook tried to navigate user more than once");
      } else {
        cb(...args);
        actionTaken.current = true;
      }
    };
  }, []);

  const withSafeMethods: IScreenStackContext = {
    screenStack,
    pushScreenToStack: makeSafe(pushScreenToStack),
    pushScreenGroupToStack: makeSafe(pushScreenGroupToStack),
    popScreenFromStack: makeSafe(popScreenFromStack),
    goBack: makeSafe(goBack)
  };

  return withSafeMethods;
}
