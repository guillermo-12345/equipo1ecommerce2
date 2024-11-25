const ProtectedRoute = ({ userRole, requiredRole = "user", redirectPath = "/", children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole || userRole !== requiredRole) {
      navigate(redirectPath);
    }
  }, [userRole, requiredRole, redirectPath, navigate]);

  return children;
};
