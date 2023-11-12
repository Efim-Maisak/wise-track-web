import React, {useState, useEffect, useContext, createContext} from "react";
//import { Session, User } from "@supabase/supabase-js";
import supabase from "../config/supabaseClient";


const AuthContext = createContext({
    session: null,
    user: null,
    signOut: () => {}
});

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const setData = async () => {
            const { data: session, error} = await supabase.auth.getSession();
            if(error) {
                throw new Error(error.message);
            };
            setSession(session);
            setUser(session?.user);
            setLoading(false);
        };

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user);
            setLoading(false);
        });

        setData();

        return () => {
            listener?.subscription.unsubscribe();
        };

    }, []);

    const value = {
        session,
        user,
        signOut: () => supabase.auth.signOut()
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};