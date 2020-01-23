import React from "react";

type ScreenGetter = () => JSX.Element;

export default function ScreenCoordinator() {
  const [screenStack, setScreenStack] = React.useState<ScreenStack>([
    () => {
      const Dashboard = require("dashboard/index").default;

      return <Dashboard />;
    }
  ]);

  const [history, setStackHistory] = React.useState<Array<ScreenStack>>([
    screenStack
  ]);

  const goBack = React.useCallback(() => {
    if (history.length) {
      setScreenStack(history[history.length - 1]);
      setStackHistory(history.slice(0, history.length - 1));
    }
  }, [history]);

  const setScreenStackAndUpdateHistory = React.useCallback(
    (newStack: ScreenStack) => {
      setStackHistory([...history, screenStack]);
      setScreenStack(newStack);
    },
    [screenStack, history]
  );

  const pushScreenToStack = React.useCallback(
    (screenGetter: ScreenGetter) => {
      setScreenStackAndUpdateHistory([...screenStack, screenGetter]);
    },
    [setScreenStackAndUpdateHistory, screenStack]
  );

  const pushScreenGroupToStack = React.useCallback(
    (screenGroup: ScreenStack) => {
      setScreenStackAndUpdateHistory([
        ...screenStack,
        ...screenGroup.reverse()
      ]);
    },
    [setScreenStackAndUpdateHistory, screenStack]
  );

  const popScreenFromStack = React.useCallback(() => {
    setScreenStackAndUpdateHistory(
      screenStack.slice(0, screenStack.length - 1)
    );
  }, [setScreenStackAndUpdateHistory, screenStack]);

  const screenToDisplay = React.useMemo<JSX.Element | null>(() => {
    if (screenStack.length) {
      return screenStack[screenStack.length - 1]();
    }
    return null;
  }, [screenStack]);

  return (
    <ScreenStackContext.Provider
      value={{
        screenStack,
        pushScreenToStack,
        pushScreenGroupToStack,
        popScreenFromStack,
        goBack
      }}
    >
      {screenToDisplay}
    </ScreenStackContext.Provider>
  );
}

type ScreenStack = Array<ScreenGetter>;

export interface IScreenStackContext {
  screenStack: ScreenStack;
  pushScreenToStack: (screenGetter: ScreenGetter) => void;
  pushScreenGroupToStack: (screenGroup: ScreenStack) => void;
  popScreenFromStack: () => void;
  goBack: () => void;
}

export const ScreenStackContext = React.createContext<IScreenStackContext>({
  screenStack: [],
  pushScreenToStack: () => {},
  popScreenFromStack: () => {},
  pushScreenGroupToStack: () => {},
  goBack: () => {}
});
