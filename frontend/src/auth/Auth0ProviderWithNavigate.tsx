// code to connect to the auth0

// import { useCreateMyUser } from "@/api/MyUserApi";
import { AppState,Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode
}

const Auth0ProviderWithNavigate = ({children}:Props)=>{
    const navigate = useNavigate();
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    if(!domain || !clientId || !redirectUri || !audience){
        throw new Error('Unable to initialize auth');
    }

    const onRedirectCallback = (appState?:AppState) => {
        navigate(appState?.returnTo || "/auth-callback");//navigate to the returnTo path or /auth-callback returnTo is the path the user was trying to access before they were redirected to the login page
    };

    return(
        <Auth0Provider 
        domain={domain} 
        clientId={clientId} 
        authorizationParams={{
            redirect_uri : redirectUri,
            audience,
        }}
        onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithNavigate 