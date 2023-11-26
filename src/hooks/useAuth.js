import React, {useState, useEffect, useContext, createContext} from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";



const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const path = window.location.pathname;

  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);

    const getUser = async () => {

        const { data } = await supabase.auth.getUser();
        const { user: currentUser } = data;
        setUser(currentUser ?? null);
        setAuth(currentUser ? true : false);
        setLoading(false);

        if(currentUser) {
          switch(path) {
            case "/history" :
              navigate("/history");
              break;
            case "/statistics" :
              navigate("/statistics");
              break;
            case "/change-pass" :
              navigate("/change-pass");
              break;
            default :
              navigate("/");
          }
        }
      };

    getUser();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setAuth(false);
      } else if (event === "SIGNED_IN") {
        setUser(session.user);
        setAuth(true);
      } else if (event === "SIGNED_OUT") {
        setAuth(false);
        setUser(null);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, user, login, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;