import { FC, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";


interface SecureRouteProps {
  children: ReactNode;
}

const SecureRoute: FC<SecureRouteProps> = ({ children }): JSX.Element => {
  const { loading, user } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color"></div>
          <p className="text-primary-color mt-4 font-openSans">Loading...</p>
        </div>
      </div>
    );
  if (!user) {
    return <p>Unauthorized</p>;
  }

  return <>{children}</>;
};

export default SecureRoute;
