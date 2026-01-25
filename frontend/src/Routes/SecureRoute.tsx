import { FC, ReactNode } from "react";
import useAuth from "../hooks/useAuth";

interface SecureRouteProps {
  children: ReactNode;
}

const SecureRoute: FC<SecureRouteProps> = ({ children }): JSX.Element => {
  const { loading, user } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <p>Unauthorized</p>;
  }

  return <>{children}</>;
};

export default SecureRoute;
