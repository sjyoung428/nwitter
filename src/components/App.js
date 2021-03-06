import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: authService.currentUser.displayName
            ? authService.currentUser.displayName
            : "Anonymous",
          uid: authService.currentUser.uid,
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    setUserObj({
      displayName: authService.currentUser.displayName
        ? authService.currentUser.displayName
        : "Anonymous",
      uid: authService.currentUser.uid,
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Loading.."
      )}
    </>
  );
}
export default App;
