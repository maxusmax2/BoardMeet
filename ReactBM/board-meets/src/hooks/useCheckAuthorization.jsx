import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const useCheckAuthorization = (userId, writeUserId) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (userId != writeUserId) {
      navigate("/notFound");
    }

  }, [writeUserId]);
};
